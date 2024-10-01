import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';

function App() {
  const [ taskState, setTaskState ] = useState({
    tasks: [
      { id: "28fcc217-5ad5-4e48-b98d-25071b879a59", title:"Dishes", description: "Empty dishwasher", deadline: "Today", priority: "Low", done: false },
      { id: "01e2c5cf-718d-44ca-96a3-0ed671a1dc23", title: "Laundry", description: "Fold clothes and put away", deadline: "Tomorrow", priority: "Medium", done: false },
      { id: "92b6b2f3-c068-4c37-9994-341a3cb23831", title: "Tidy up", description: "", deadline: "Today", priority: "High", done: false}
    ]
  });

  const [ formState, setFormState ] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    priority: "Low",
    done: false
  });

  const formChangeHandler = (event) => {
    let form = {...formState};

    console.log(event)

    switch(event.target.name) {
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
      case "priority":
          form.priority = event.target.value;
          break;
      default:
          form = formState;
    }
    setFormState(form);
    console.log(formState);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const tasks = [...taskState.tasks];
    const form = {...formState};

    form.id = uuidv4();
    
    tasks.push(form);
    setTaskState({tasks});
  }

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTaskState({tasks});
    console.log(`${taskIndex} ${tasks[taskIndex].done}`);
  }

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks.splice(taskIndex, 1);
    setTaskState({tasks});
  }
  
  return (
    <div className="container">
      <h1>Tasky</h1>
      {taskState.tasks.map((task, index) => (              
        <Task 
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          priority={task.priority}
          key={task.id}
          done={task.done}
          markDone={() => doneHandler(index)}
          deleteTask = {() => deleteHandler(index)}
        />
      ))}
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
    </div>
  );
}

export default App;