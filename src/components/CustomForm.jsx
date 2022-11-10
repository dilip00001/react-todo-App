import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const CustomForm = ({addTask}) => {
 
  const[task,setTask]=useState("");



  const handleSubmit=(e)=>{
     e.preventDefault();
     addTask({
      name:task,
      checked:false,
      id:Date.now()
     })
    setTask(""); 
    
  }
  
    return (
   <form
   className="todo"
   onSubmit={handleSubmit}
   >
    <div className='wrapper'>
      <input
      className="input"
      type='text'
      id='task'
      value={task}
      onInput={(e)=>setTask(e.target.value)}
      required
      autoFocus
      maxLength={60}
      placeholder="Enter task"
      />
    
      <label 
      htmlFor="task"
      className="label"
      >Enter Task</label>
    </div>
    <button
    className="btn"
    type='submit'
    aria-label="Add Task"
    >
    <PlusIcon />

    </button>
   


   </form>
  )
}

export default CustomForm
