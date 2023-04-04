import React, { useState, useEffect } from 'react';

const TaskEditModal = ({ showModal, toggleModal, editedTask, onEdit, task }) => {
    const [editedDescription, setEditedDescription] = useState('');

    useEffect(() => {
        if (editedTask) {
            setEditedDescription(editedTask.description);
        }
    }, [editedTask]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editedTask) {
            if (editedDescription.trim() === "") {
                alert("Don't leave an empty task!");
            } else {
                onEdit(editedTask.id, editedDescription);
                toggleModal();
            }
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content onTop">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="editedDescription" className="form-label">Task Description</label>
                                        <input
                                            type="text"
                                            id="editedDescription"
                                            value={editedDescription}
                                            onChange={(e) => setEditedDescription(e.target.value)}
                                            placeholder="Edit task"
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
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

export default TaskEditModal;