import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

const Task = ({ task, onToggle, onDelete, onEdit, isEditing, onEditButtonClick, onMoveUp, onMoveDown }) => {

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this task?")) {
            onDelete(task.id);
        }
    }

    return (
        <div>
            <div className="container taskoutline">
                <div className="row">
                    <div className="col-6">

                        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)}></input>
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.description}
                        </span>
                    </div>
                    <div className="col-3">
                        {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                    </div>
                    <div className="col-3 d-md-block">

                        <button className="btn btn-warning" onClick={() => onEditButtonClick(task.id)}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-primary" onClick={() => onMoveUp(task.id)}>Up</button>
                        <button className="btn btn-primary" onClick={() => onMoveDown(task.id)}>Down</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;