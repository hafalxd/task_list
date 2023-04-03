import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
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
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add task"></input>
            <button type="submit">Add task</button>
        </form>
    );
};

export default TaskInput;