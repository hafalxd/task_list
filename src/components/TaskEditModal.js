import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const TaskEditModal = ({ showModal, toggleModal, editedTask, onEdit }) => {
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');

    useEffect(() => {
        if (editedTask) {
            setEditedDescription(editedTask.description);
            setEditedDueDate(editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 10) : '');
        }
    }, [editedTask]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editedTask) {
            if (editedDescription.trim() === "") {
                alert("Don't leave an empty task!");
            } else {
                onEdit(editedTask.id, editedDescription, editedDueDate ? new Date(editedDueDate) : null);
                toggleModal();
            }
        }
    };

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group className="mb-3" controlId="editedDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            placeholder="Edit task"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editedDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={editedDueDate}
                            onChange={(e) => setEditedDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskEditModal;