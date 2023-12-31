import React, { useState } from "react";
import Modal from "../common/Modal/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";

const DrawingUpdateModal = ({
  isOpen,
  setIsOpen,
  closeModal,
  openModal,
  handleUpdate,
}) => {
  const [data, setData] = useState("");
  return (
    <Modal
      openModal={openModal}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeModal={closeModal}
      title={"update title"}
      className="max-w-2xl h-full"
    >
      {/* close icon */}
      <button onClick={closeModal} className={"absolute right-3 top-2 "}>
        <IoCloseCircleOutline style={{ fontSize: "28px" }} />
      </button>
      <div>
        <input
          required
          className="border  w-full p-2 rounded"
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => setData(e.target.value)}
        />
        <button
          onClick={() => handleUpdate(data)}
          className="w-full mt-5 bg-slate-500 rounded p-2 text-white"
        >
          Update
        </button>
      </div>
    </Modal>
  );
};

export default DrawingUpdateModal;
