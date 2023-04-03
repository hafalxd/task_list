import React, { useState } from "react";
import Task from "./Task";

const TaskList = ({ tasks, onToggle, onDelete, onEdit, onDeleteChecked, onMoveUp, onMoveDown }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleEditButtonClick = (taskId) => {
        if (editingTaskId === taskId) {
            setEditingTaskId(null);
        } else {
            setEditingTaskId(taskId);
        }
    };

    return (
            <div>
                {tasks
                .filter((task) => task.id !== undefined)
                .map((task) => (
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
                        
                        ></Task>
                ))}
                <button onClick={onDeleteChecked}>Delete Checked Tasks</button>
            </div>
    );
};

export default TaskList;