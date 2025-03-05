"use client";

import AddNewTask from "./AddNewTask";
import { useProvider } from "./Context/AppContext";
import Search from "./Search";
import SingleItem from "./SingleItem";

const TaskItems = () => {
  const { filteredTaskItems } = useProvider();
  return (
    <>
   <AddNewTask />
   <Search />
    <div className="bg-teal-600 p-3 mt-10 rounded-md shadow shadow-slate-900">
      <h1 className="text-center mb-2 text-2xl text-white">My Tasks for Today</h1>
      <hr className="border-2 rounded-full w-[10%] mx-auto mb-5" />
      <ul className="text-white pb-4">
        {filteredTaskItems.length && filteredTaskItems ? (
          filteredTaskItems.map((item) => <SingleItem key={item.id} item={item} />)
        ) : (
          <p className="text-center">Task List empty</p>
        )}
      </ul>

      <div className="flex justify-between items-center">
        <hr className="w-[40%] border-gray-700" />
        <p className="uppercase whitespace-nowrap text-gray-700">the end</p>
        <hr className="w-[40%] border-gray-700"/>
      </div>
    </div> 
    </>
  );
};

export default TaskItems;
