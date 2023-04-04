import React from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

const Task = ({ task, onToggle, onDelete, onEditButtonClick, onMoveUp, onMoveDown }) => {

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this task?")) {
            onDelete(task.id);
        }
    }

    return (
        <div>
            <div className="container taskoutline">
                <Row>
                    <Col xs={6}>
                        <Form.Check
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                            label={
                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.description}
                                </span>
                            }
                        />
                    </Col>
                    <Col xs={3}>
                        {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                    </Col>
                    <Col xs={3} md="auto">
                        <Button variant="warning" onClick={() => onEditButtonClick(task.id)}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        <Button variant="primary" onClick={() => onMoveUp(task.id)}>Up</Button>
                        <Button variant="primary" onClick={() => onMoveDown(task.id)}>Down</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Task;