import { FaDownload } from "react-icons/fa";
import Modal from "../common/Modal/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";

const DrawingView = ({
  singleDrawing,
  isOpen,
  setIsOpen,
  closeModal,
  openModal,
}) => {
  const [loading, setLoading] = useState(false);
  const { type, date, drawing } = singleDrawing;
  // Function to handle image download
  const handleDownload = () => {
    setLoading(true);
    fetch(drawing)
      .then((response) => response.blob())
      .then((blob) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image onto canvas
          ctx.drawImage(img, 0, 0);

          // Fill the entire canvas with white if the image has transparency
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Convert canvas to data URL and download
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;
          link.setAttribute("download", `${type}.png`);
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up
          URL.revokeObjectURL(link.href);
          setLoading(false);
          toast.success("Drawing Download Successfull!");
        };
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error downloading the image:", error);
      });
  };

  return (
    <Modal
      openModal={openModal}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeModal={closeModal}
      title={type}
      className="max-w-2xl"
    >
      {/* close icon */}
      <button onClick={closeModal} className={"absolute right-3 top-2 "}>
        <IoCloseCircleOutline style={{ fontSize: "28px" }} />
      </button>
      <div>
        <img className="border" src={drawing} alt="" />
      </div>
      <button
        disabled={loading}
        onClick={handleDownload}
        className="mt-4 flex items-center gap-2 bg-purple-400 p-2 rounded-lg text-white"
      >
        {loading ? "Please Wait..." : "Download"}
        <span>
          <FaDownload />
        </span>
      </button>
    </Modal>
  );
};

export default DrawingView;
