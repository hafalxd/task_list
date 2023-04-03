import React, { useState } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskSorters = ({ sortOrder, setSortOrder }) => {
    const [showSelect, setShowSelect] = useState(false);

    const toggleSelect = () => {
        setShowSelect(!showSelect);
    };

    return (
        <div>
            <button className='btn btn-primary' onClick={toggleSelect}>
                Sort
            </button>
            {showSelect && (
                <div class="form-floating">
                    <select className='form-select' id='floatingSelect' aria-label="Floating label select example" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="default">Order of addition</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                        <option value="dateAsc">Date Ascending</option>
                        <option value="dateDesc">Date Descending</option>
                    </select>
                    <label for="floatingSelect">Choose sort option</label>
                </div>
            )}
        </div>
    );
};

export default TaskSorters;