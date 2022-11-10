import React from 'react';
import { CheckIcon} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useEffect } from 'react';

const EditForm = ({editedTask,editTasked,closeEditMode}) => {
 
  const[updatedTask,setUpdatedTask]=useState(editedTask.name);

  useEffect(()=>{
    const closeModalIfEscaped=(e)=>{
      e.key=="Escape" && closeEditMode();
    }

    window.addEventListener('keydown',closeModalIfEscaped)

    return()=>{
      window.removeEventListener('keydown',closeModalIfEscaped)
    }
  },[closeEditMode])

  const handleSubmit=(e)=>{
     e.preventDefault();
     editTasked({...editedTask,name:updatedTask});
     
    
  }
  
    return (
   
   <div role="dialog" 
   aria-labelledby='editTask'
   onClick={(e)=>{e.target==e.currentTarget && closeEditMode()}}
   >
    <form
    className="todo"
    onSubmit={handleSubmit}
    >
      <div className='wrapper'>
        <input
        className="input"
        type='text'
        id='editTask'
        value={updatedTask}
        onInput={(e)=>setUpdatedTask(e.target.value)}
        required
        autoFocus
        maxLength={60}
        placeholder="update task"
        />
      
        <label 
        htmlFor="editTask"
        className="label"
        >Update Task</label>
      </div>
      <button
      className="btn"
      type='submit'
      aria-label={`updated task by now ${updatedTask}`}
      >
      <CheckIcon  strokeWidth={2} height={24} width={24}/>

      </button>
    


    </form>
  </div>  
  )
}

export default EditForm
