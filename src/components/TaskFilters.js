import React from 'react';
import { Dropdown } from "react-bootstrap";
import './../App.css';

const TaskFilters = ({ filter, setFilter }) => {

    return (
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter("all")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("completed")}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("notCompleted")}>
                Not Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
};

export default TaskFilters;