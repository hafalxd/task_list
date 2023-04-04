import React, { useState } from "react";
import Task from "./Task";
import { Container, Button } from "react-bootstrap";
import TaskEditModal from './TaskEditModal';
import './../App.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit, onDeleteChecked, onMoveUp, onMoveDown }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleEditButtonClick = (taskId) => {
        if (editingTaskId === taskId) {
            setEditingTaskId(null);
        } else {
            setEditingTaskId(taskId);
        }
    };

    const taskToEdit = tasks.find((task) => task.id === editingTaskId);

    return (
        <Container>
          <div className="tasklist">
            {tasks
              .filter((task) => task.id !== undefined)
              .map((task) => (
                <div className="onetask">
                  <Task
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    isEditing={editingTaskId === task.id}
                    onEditButtonClick={handleEditButtonClick}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                  />
                </div>
              ))}
          </div>
          <div className="">
            <Button variant="danger" onClick={onDeleteChecked}>Delete Checked Tasks</Button>
          </div>
          {editingTaskId && (
            <TaskEditModal
              showModal={!!editingTaskId}
              toggleModal={() => setEditingTaskId(null)}
              editedTask={taskToEdit}
              onEdit={onEdit}
            />
          )}
        </Container>
      );
};

export default TaskList;