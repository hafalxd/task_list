import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const taskType = "task";

const Task = ({ task, onToggle, onDelete, onEdit, isEditing, onEditButtonClick, moveTask, index }) => {
    const [editedDescription, setEditedDescription] = useState(task.description);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: taskType,
        item: { id: task.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, dropRef] = useDrop(() => ({
        accept: taskType,
        hover: (item, monitor) => {
            const draggedIndex = item.index;
            const targetIndex = index;

            if (draggedIndex === targetIndex) {
                return;
            }
            if (!element) {
                return;
            }

            if (!combinedRef) {
                return;
            }
            console.log("XD1")
            const hoverBoundingRect = element.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            console.log("XD2")
            if (draggedIndex < targetIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (draggedIndex > targetIndex && hoverClientY > hoverMiddleY) {
                return;
            }
        },
        drop: (item, monitor) => {
            moveTask(item.index, index);
        },
    }));

    const combinedRef = (element) => {
        dragRef(element);
        dropRef(element);
        setElement(element);
    };

    const [element, setElement] = useState(null);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editedDescription.trim() === "") {
            alert("Don't leave an empty task!");
        } else {
            onEdit(task.id, editedDescription);
            onEditButtonClick(task.id);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this task?")) {
            onDelete(task.id);
        }
    }

    return (
        <div ref={combinedRef} style={{ opacity: isDragging ? 0.5 : 1 }}>

            <div>
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)}></input>
                {isEditing ? (
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></input>
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.description}
                    </span>
                )}
                {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                <button onClick={() => onEditButtonClick(task.id)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>

        </div>
    );
};

export default Task;