"use client";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface taskItemTypes {
  id: number;
  item: string;
  checked: boolean;
}

interface AppContextTypes {
  taskItems: taskItemTypes[];
  setTaskItems: React.Dispatch<SetStateAction<taskItemTypes[]>>;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
  handleAddNewTask: (e: React.FormEvent<HTMLFormElement>) => void;
  addInput: string;
  setAddInput: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredTaskItems: taskItemTypes[];
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

const ProviderFunction = (props: { children: React.ReactNode }) => {
  const [taskItems, setTaskItems] = useState<taskItemTypes[]>(() => {
    const savedTasks = localStorage.getItem("myNewTaskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [addInput, setAddInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTaskItems = taskItems
    .filter((item) =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const isAInSearch = a.item
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isBInSearch = b.item
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return isAInSearch === isBInSearch ? 0 : isAInSearch ? -1 : 1;
    });

  const saveToLocalStorage = (newList: taskItemTypes[]) => {
    setTaskItems(newList);
    localStorage.setItem("myNewTaskList", JSON.stringify(newList));
  };

  const handleAddNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addInput.trim() === "") return;
    const newTask = {
      id: taskItems.length + 1,
      item: addInput,
      checked: false,
    };
    const updatedTaskList = [...taskItems, newTask];
    saveToLocalStorage(updatedTaskList);
    setAddInput("");
  };

  const handleCheck = (id: number) => {
    const updatedTasks = taskItems.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    saveToLocalStorage(updatedTasks);
  };

  const handleDelete = (id: number) => {
    const updatedTasks = taskItems.filter((task) => task.id !== id);
    saveToLocalStorage(updatedTasks);
  };

  return (
    <AppContext.Provider
      value={{
        taskItems,
        setTaskItems,
        handleAddNewTask,
        handleCheck,
        handleDelete,
        addInput,
        setAddInput,
        searchQuery,
        setSearchQuery,
        filteredTaskItems,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};

export default ProviderFunction;
