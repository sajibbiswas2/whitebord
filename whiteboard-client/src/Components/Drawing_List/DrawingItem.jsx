import React, { useEffect, useState } from "react";
import { baseURL } from "../../constant/util";
import DrawingCard from "./DrawingCard";
import toast from "react-hot-toast";
import DrawingUpdateModal from "./DrawingUpdateModal";
const DrawingList = ({ reFetch }) => {
  // local state
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [drawingId, setDrawingId] = useState("");

  // fetch all list items
  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/drawing`)
      .then((res) => res.json())
      .then((data) => {
        setDrawings(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("there was a server side error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reFetch]);

  // delete drawing list
  const handleDelete = (id) => {
    // confirmation alert
    const isConfirm = confirm("Want to delete?");
    if (isConfirm) {
      fetch(`${baseURL}/drawing/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success("delete successfull");
            reFetch();
          }
        })
        .catch((err) => {
          toast.error("something worng");
        });
    }
  };

  // hendel update
  const handleUpdate = (data) => {
    if (data === "") {
      return toast.error("input field should be not empty!");
    }
    fetch(`${baseURL}/drawing/${drawingId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: data }),
    })
      .then((res) => {
        toast.success("update successfull");
        reFetch();
        closeModal();
      })
      .catch((error) => {
        toast.error("something worng");
      });
  };

  // modal action handler
  const handleUpdateModal = (id) => {
    setIsOpen(true);
    setDrawingId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
    setDrawingId("");
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <h3 className="mt-4">Loading...</h3>
        </div>
      ) : (
        <div>
          {drawings?.map((drawing, key) => (
            <DrawingCard
              loading={loading}
              drawing={drawing}
              handleDelete={handleDelete}
              handleUpdateModal={handleUpdateModal}
              key={key}
            />
          ))}
          {/* drawing update modal */}
          <DrawingUpdateModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            handleUpdate={handleUpdate}
            handleUpdateModal={handleUpdateModal}
          />
        </div>
      )}
    </>
  );
};

export default DrawingList;
