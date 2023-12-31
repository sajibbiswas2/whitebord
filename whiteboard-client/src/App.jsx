import React, { useState } from "react";
import DrawingToolbar from "./Components/Drawing/DrawingToolbar";
import DrawingCanvas from "./Components/Drawing/DrawingCanvas";
import DrawingList from "./Components/Drawing_List/DrawingItem";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [activeTool, setActiveTool] = useState("");
  const [color, setColor] = useState("black");
  // for refetch drawing list
  const [shouldRefetchList, setShouldRefetchList] = useState(false);

  const refetchDrawingList = () => {
    setShouldRefetchList(prev => !prev);
  };


  return (
    <div className="grid grid-cols-8">
      {/* react hot toast component */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" col-span-2  h-screen bg-gray-100 overflow-auto">
        <DrawingToolbar setActiveTool={setActiveTool} setColor={setColor} />
        {/* drawing list items */}
        <DrawingList  reFetch={refetchDrawingList} />
      </div>
      <div className="col-span-6">
        <DrawingCanvas activeTool={activeTool} color={color} onSaveDrawing={refetchDrawingList} />
      </div>
    </div>
  );
};

export default App;
