import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { baseURL } from "../../constant/util";
import { IoIosSave } from "react-icons/io";
import { imageUpload } from "../../../util/imageUpload";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
const DrawingCanvas = ({ activeTool, color, onSaveDrawing }) => {
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("drawingCanvas", {
      isDrawingMode: activeTool === "pencil" ? true : false,
    });

    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = 5;

    let isDragging = false;

    canvas.on("mouse:down", (options) => {
      const pointer = canvas.getPointer(options.e);
      const target = canvas.findTarget(options.e);
      if (target) {
        return;
      }

      switch (activeTool) {
        case "line":
          const points = [pointer.x, pointer.y, pointer.x, pointer.y];
          const line = new fabric.Line(points, {
            strokeWidth: 5,
            stroke: color,
          });
          canvas.add(line);
          break;

        case "rectangle":
          const rect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 50,
            height: 50,
            fill: color,
            strokeWidth: 2,
            stroke: color,
          });
          canvas.add(rect);
          break;

        case "text":
          const text = new fabric.IText("Enter text", {
            left: pointer.x,
            top: pointer.y,
            fill: color,
            fontSize: 20,
          });
          canvas.add(text);
          text.enterEditing();
          text.hiddenTextarea.focus();
          break;

        default:
          break;
      }

      isDragging = true;
    });

    canvas.on("mouse:move", () => {
      if (isDragging) {
        // Handle drawing or resizing if necessary
      }
    });

    canvas.on("mouse:up", () => {
      isDragging = false;
    });

    canvasRef.current = canvas;
    setIsCanvasInitialized(true);

    return () => {
      canvas.dispose();
    };
  }, [activeTool, color]);

  // action area -----------------

  // Convert Base64 string to a Blob
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/png" });
  };

  // handle save drawing in database
  const handleSaveDrawing = async () => {
    setLoading(true);
    if (!isCanvasInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const blob = base64ToBlob(dataURL);

    // upload image in image bb hosting
    imageUpload(blob).then((imageUrl) => {
      const formData = {
        drawing: imageUrl,
        type: activeTool,
        date: new Date(),
      };

      // save drawing in database
      fetch(
        fetch(`${baseURL}/drawing`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        })
      )
        .then((response) => {
          setLoading(false);
          toast.success("Drawing saved");
          // refefatch daraing
          setTimeout(() => {
            onSaveDrawing();
          }, 300);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("something worng");
        });
    });
  };

  // clear canvas handler

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.clear();
    }
  };

  return (
    <div className="relative border border-gray-300 h-screen ">
      <div className="absolute end-3  flex top-3 gap-4">
        <button
          disabled={loading}
          className="bg-slate-500 p-2  text-white rounded flex items-center gap-2 "
          onClick={() => handleSaveDrawing()}
        >
          {loading ? "Loading..." : "Save"}
          <span>
            <IoIosSave />
          </span>
        </button>
        <button
          className="p-2 rounded bg-red-500 text-white flex items-center gap-2"
          onClick={handleClearCanvas}
        >
          Clear{" "}
          <span>
            <IoTrash />
          </span>
        </button>
      </div>
      <canvas id="drawingCanvas" width="800" height="600"></canvas>
    </div>
  );
};

export default DrawingCanvas;
