import React from 'react'
import { useProvider } from "@components/Context/AppContext";
 
const AddNewTask = () => {
    const {addInput, setAddInput, handleAddNewTask} = useProvider();
  return (
    <form className='form items-center' onSubmit={handleAddNewTask}>
        <input className='p-1.5 rounded-l-md outline-0 border-0' type="text" placeholder='Add New Task' onChange={(e) => setAddInput(e.target.value)} value={addInput} />
        <button className='bg-teal-600 text-white text-2xl rounded-r-md p-1.5'>+</button>
    </form>
  )
}

export default AddNewTask