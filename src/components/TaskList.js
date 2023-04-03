import React, { useState, useEffect } from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";

const taskType = "task";

const TaskList = ({ tasks, onToggle, onDelete, onEdit, onReorder }) => {
    const [localTasks, setLocalTasks] = useState(tasks);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const moveTask = (draggedIndex, targetIndex) => {
        const updatedTasks = [...localTasks];
        const draggedTask = updatedTasks[draggedIndex];
        updatedTasks.splice(draggedIndex, 1);
        updatedTasks.splice(targetIndex, 0, draggedTask);
        setLocalTasks(updatedTasks);
        onReorder(updatedTasks);
    };

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: taskType,
        drop: (item, monitor) => {
            const draggedIndex = item.index;
            const targetIndex = localTasks.length - 1;
            moveTask(draggedIndex, targetIndex);
        },

        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleEditButtonClick = (taskId) => {
        if (editingTaskId === taskId) {
            setEditingTaskId(null);
        } else {
            setEditingTaskId(taskId);
        }
    };

    return (
        <div ref={dropRef} style={{ backgroundColor: isOver ? "#e0e0e0" : "white" }}>
            <div>
                {localTasks
                .filter((task) => task.id !== undefined)
                .map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        isEditing={editingTaskId === task.id}
                        onEditButtonClick={handleEditButtonClick}
                        moveTask={moveTask}
                        index={index}></Task>
                ))}
            </div>
        </div>

    );
};

export default TaskList;