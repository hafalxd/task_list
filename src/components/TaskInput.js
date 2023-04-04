import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

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
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="dueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add task"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add task
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskInput;