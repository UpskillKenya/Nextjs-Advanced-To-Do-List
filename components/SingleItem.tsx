"use client";
import { useEffect, useState } from "react";
import { useProvider } from "./Context/AppContext";
import { FaTrashAlt, FaPen, FaSave } from "react-icons/fa";

interface Item {
  id: number;
  item: string;
  checked: boolean;
}

interface SingleItemType {
  item: Item;
}

const SingleItem = ({ item }: SingleItemType) => {
  const { setTaskItems, taskItems, handleCheck, handleDelete } = useProvider();
  const [editOn, setEditOn] = useState(false);
  const [inputValue, setInputValue] = useState(item.item);

  const handleSave = (id: number) => {
    const savedTask = taskItems.map((item) =>
      item.id === id ? { ...item, item: inputValue } : item
    );
    setTaskItems(savedTask);
    setEditOn(false);
    localStorage.setItem('myNewTaskList', JSON.stringify(savedTask))
  };

  return (
    <>
      <li className="bg-white text-gray-700 px-2 p-1 mb-3 flex items-center justify-between rounded-md shadow-xl group">
        <input
          type="checkbox"
          id={`check-${item.id}`}
          checked={item.checked}
          className="appearance-none relative size-5 cursor-pointer border-2 border-teal-600 rounded-md checked:bg-teal-300 hover:bg-teal-200 checked:border-red-500 checked:border-2.5"
          onChange={() => handleCheck(item.id)}
          onClick={() => setEditOn(false)}
        />
        {editOn ? (
          <form onSubmit={() => handleSave(item.id)} className="flex-1 ml-4 ">
            <input
              type="text"
              className="w-full p-2 border-[1.5px] border-gray-600 rounded-md"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </form>
        ) : (
          <label
            htmlFor={`check-${item.id}`}
            className="flex-1 pl-4 cursor-pointer p-2 group-hover:text-black group-hover:font-medium "
          >
            {item.item}
          </label>
        )}

        {item.checked && (
          <div className="bg-slate-600 flex p-2.5 rounded-md gap-3 items-center justify-between ml-3">
            <FaTrashAlt
              className="cursor-pointer text-red-500 hover:opacity-80 size-3.5"
              onClick={() => handleDelete(item.id)}
            />
            <hr className="border-[1px] border-white h-[14px] w" />
            {editOn ? (
              <FaSave
                className="cursor-pointer text-white hover:opacity-80 size-3.5"
                onClick={() => handleSave(item.id)}
              />
            ) : (
              <FaPen
                className="cursor-pointer text-green-500 hover:opacity-80 size-3.5"
                onClick={() => setEditOn(!editOn)}
              />
            )}
          </div>
        )}
      </li>
    </>
  );
};

export default SingleItem;
