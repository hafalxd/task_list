import React from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from "react-bootstrap";

const TaskSorters = ({ sortOrder, setSortOrder }) => {

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSortOrder("default")}>
                        Order of addition
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder("asc")}>A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder("desc")}>
                        Z-A
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder("dateAsc")}>Date Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder("dateDesc")}>Date Descending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default TaskSorters;