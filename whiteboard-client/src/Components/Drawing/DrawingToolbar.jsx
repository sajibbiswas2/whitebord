import { FaPencilAlt } from "react-icons/fa";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineColorLens,
} from "react-icons/md";
import { FaTextHeight } from "react-icons/fa";
import { useState } from "react";
import { ChromePicker } from "react-color";

const DrawingToolbar = ({ setActiveTool, setColor }) => {
  // local state for active tool
  const [activeTool, setActiveToolState] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default black color

  const handleSetActiveTool = (tool) => {
    setActiveTool(tool);
    setActiveToolState(tool);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const applyColorToCanvas = (color) => {
    setColor(color.hex);
    setSelectedColor(color.hex);
  };

  return (
    <div className="top-0 left-0 p-4 bg-stone-100 shadow-md w-full">
      <div className="flex justify-around">
        <button
          className={`mr-2 p-2 border rounded flex items-center gap-2 ${
            activeTool === "pencil" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleSetActiveTool("pencil")}
        >
          <FaPencilAlt />
        </button>
        <button
          className={`mr-2 p-2 border rounded flex items-center gap-2 ${
            activeTool === "rectangle" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleSetActiveTool("rectangle")}
        >
          <MdOutlineCheckBoxOutlineBlank />
        </button>
        <button
          className={`mr-2 p-2 border rounded flex items-center gap-2 ${
            activeTool === "text" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleSetActiveTool("text")}
        >
          <FaTextHeight />
        </button>

        {/* Color Picker Button */}
        <button
          style={{ border: `2px solid ${selectedColor}` }}
          className={`mr-2 p-2 border rounded flex items-center gap-2 ${
            showColorPicker ? "bg-blue-200" : ""
          }`}
          onClick={toggleColorPicker}
        >
          <MdOutlineColorLens />
        </button>

        {showColorPicker && (
          <div className="absolute  z-10">
            <button
              onClick={() => setShowColorPicker(false)}
              className="w-full bg-orange-300"
            >
              Close
            </button>
            <ChromePicker color={selectedColor} onChange={applyColorToCanvas} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingToolbar;
