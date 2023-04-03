import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskInput = ({ onAdd, showModal, toggleModal }) => {
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (description.trim() === "") {
            alert("Please enter a task!")
        } else {
            onAdd(description, dueDate);
            setDescription("");
            setDueDate("");
            toggleModal();
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content onTop">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Task</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                                        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Task Description</label>
                                        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add task" className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add task</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show" style={{ pointerEvents: 'none' }}></div>
                </div>
            )}
        </>
    );
};

export default TaskInput;