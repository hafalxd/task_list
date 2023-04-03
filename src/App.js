import React, { useEffect, useState, useCallback } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { DndProvider } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  const checkForDueTasks = useCallback(() => {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.dueDate && !task.completed) {
        const dueDate = new Date(task.dueDate);
        if (dueDate <= now) {
          new Notification("Task reminder", {
            body: `The task "${task.description}" is due now!`
          });
        }
      }
    });
  }, [tasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkForDueTasks();
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [checkForDueTasks]);

  const addTask = (description, dueDate) => {
    const newTask = { id: uuidv4(), description, completed: false, dueDate: dueDate ? new Date(dueDate) : null };
    setTasks([...tasks, newTask]);

  };

  const handleReorder = (newTasks) => {
    setTasks(newTasks);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const editTask = (id, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };

  return (
    <div className='App'>
      <h1>Task List</h1>
      <TaskInput onAdd={addTask}></TaskInput>
      <DndProvider backend={HTML5Backend}>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} onReorder={handleReorder}></TaskList>
      </DndProvider>
    </div>
  );
};

export default App;
