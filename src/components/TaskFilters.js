import React, { useState } from 'react';
import './../App.css';

const TaskFilters = ({ filter, setFilter }) => {
    const [showSelect, setShowSelect] = useState(false);

    const toggleSelect = () => {
        setShowSelect(!showSelect);
    };

    return (

        <div>
            <button className='btn btn-primary' onClick={toggleSelect}>
                Filter
            </button>
            {showSelect && (
                <div class="form-floating">
                    <select className='form-select' id='floatingSelect' aria-label="Floating label select example" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="notCompleted">Not Completed</option>
                    </select>
                    <label for="floatingSelect">Choose filter option</label>
                </div>
            )}
        </div>
    );
};

export default TaskFilters;