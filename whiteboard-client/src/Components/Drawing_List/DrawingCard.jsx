import React, { useState } from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import { baseURL } from "../../constant/util";
import DrawingView from "../DrawingView/DrawingView";
import ListSkeleton from "../common/Skeleton/List_skeleton";

const DrawingCard = ({ drawing, handleDelete, loading, handleUpdateModal }) => {
  const [singleDrawing, setSingleDrawing] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  // get single drawing data after click the drawing list
  const handleList = (id) => {
    setLoadingModal(true);
    fetch(`${baseURL}/drawing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleDrawing(data);
        setLoadingModal(false);
        openModal();
      })
      .catch((err) => {
        setLoadingModal(false);
      });
  };

  //   modal open and close handler
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {loading ? (
        <ListSkeleton />
      ) : (
        <div className="bg-slate-200 shadow my-3 p-1 flex justify-between items-center cursor-pointer">
          <div
            className="flex gap-3 items-center"
            onClick={() => {
              handleList(drawing?._id);
            }}
          >
            <img src={drawing.drawing} className="h-12, w-12 border-1" />
            <div>
              <h4 className="text-lg">{drawing?.type.slice(0, 8)}...</h4>
              <h6 className="text-sm text-gray-400">
                {new Date(drawing?.date)
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </h6>
            </div>
          </div>
          <h1>
            {loadingModal && (
              <span className="text-gray-400">Please Wait..</span>
            )}
          </h1>

          {/* delete and update action button  */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                handleUpdateModal(drawing?._id);
              }}
            >
              <MdEdit
                style={{
                  fontSize: "20px",
                  background: "green",
                  borderRadius: "50%",
                  padding: "3px",
                  color: "white",
                }}
              />
            </button>
            <button
              onClick={() => {
                handleDelete(drawing?._id);
              }}
            >
              <MdDelete
                style={{
                  fontSize: "20px",
                  background: "red",
                  borderRadius: "50%",
                  padding: "3px",
                  color: "white",
                }}
              />
            </button>
          </div>
        </div>
      )}
      {/* drawing details view */}
      <DrawingView
        singleDrawing={singleDrawing}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default DrawingCard;
