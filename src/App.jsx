import { useState } from 'react'

import './App.css';
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import useLocalStorage from './components/Hooks/useLocalStorage';
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [tasks, setTasks] =useLocalStorage('react-todo.tasks',[]);
  const[PreviousFocusEl,setPreviousFocusEl]=useState(null)
  const[editedTask,setEditedTask]=useState(null);
  const[isEditing,setIsEditing]=useState(false)
  const addTask=(task)=>{
       setTasks(prevState=>[...prevState,task])
  }

  const deleteTask=(id)=>{
    setTasks(prevState => prevState.filter(t=>t.id!==id));
  }

  const updateTask=(id)=>{
    setTasks(prevState =>prevState.map(t=>(t.id==id
      ?{...t,checked:!t.checked} : t
    )))
  }

  const editTasked=(task)=>{
    setTasks(prevState =>prevState.map(t=>(t.id==task.id
      ?{...t,name:task.name} : t
    )))

    closeEditMode();
  }

  const closeEditMode=()=>{
    setIsEditing(false);
    PreviousFocusEl.focus();
  }

  const enterEditMode=(task)=>{
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement)
  }

  return (
   
   

    <div className='container'>
      <header>
       <h1>My task list</h1>
      </header>
      {
        isEditing &&(
          <EditForm 
          editedTask={editedTask}
          editTasked={editTasked}
          closeEditMode={closeEditMode}/>
        )
      }
      
      
      <CustomForm addTask={addTask} />
      {tasks && (<TaskList
      tasks={tasks}
      deleteTask={deleteTask}
      updateTask={updateTask}
      enterEditMode={enterEditMode}/>)}

      <ThemeSwitcher />
    </div>
  )
}

export default App
