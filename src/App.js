import React, { useEffect, useState, useCallback } from 'react';
import TaskList from './components/TaskList';
import TaskInput from "./components/TaskInput";
import TaskFilters from './components/TaskFilters';
import TaskEditModal from './components/TaskEditModal';
import TaskSorters from './components/TaskSorters';

import { v4 as uuidv4 } from 'uuid';
import './App.css';



const App = () => {
  const [sortOrder, setSortOrder] = useState('default');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

  const deleteCheckedTasks = () => {
    if (window.confirm("Are you sure to delete all tasks?")) {
      setTasks(tasks.filter((task) => !task.completed));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newDescription, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription, dueDate: newDueDate } : task));
  };

  const moveTaskUp = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > 0) {
      const newTasks = [...tasks];
      [newTasks[taskIndex - 1], newTasks[taskIndex]] = [newTasks[taskIndex], newTasks[taskIndex - 1]];
      setTasks(newTasks);
    }
  }

  const moveTaskDown = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[taskIndex + 1], newTasks[taskIndex]] = [newTasks[taskIndex], newTasks[taskIndex + 1]];
      setTasks(newTasks);
    }
  };

  const getSortedAndFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "notCompleted") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    let sortedTasks = [...filteredTasks];

    if (sortOrder === "desc") {
      sortedTasks.sort((a, b) => b.description.localeCompare(a.description));
    } else if (sortOrder === "asc") {
      sortedTasks.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortOrder === "dateAsc") {
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOrder === "dateDesc") {
      sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    return sortedTasks;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditButtonClick = (taskId) => {
    setEditingTaskId(editingTaskId === taskId ? null : taskId);
  }


  return (
    <div className={`App container${darkMode ? " dark-mode" : ""}`}>
      <h1>Taskie</h1>
      <div className='navbar1'>
        <button className='btn btn-primary' onClick={toggleModal}>New Task</button>
        {showModal && <TaskInput onAdd={addTask} showModal={showModal} toggleModal={toggleModal}></TaskInput>}

        <TaskFilters filter={filter} setFilter={setFilter}></TaskFilters>

        <TaskSorters sortOrder={sortOrder} setSortOrder={setSortOrder}></TaskSorters>

        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

      </div>
      <div className='tasklist'>
        <TaskList
          tasks={getSortedAndFilteredTasks()}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onDeleteChecked={deleteCheckedTasks}
          onMoveUp={moveTaskUp}
          onMoveDown={moveTaskDown}
          handleEditButtonClick={handleEditButtonClick}
        ></TaskList>
        <TaskEditModal
          showModal={showEditModal}
          toggleModal={() => setShowEditModal(false)}
          editedTask={editedTask}
          onEdit={editTask}
        ></TaskEditModal>
      </div>
    </div>
  );
};

export default App;
