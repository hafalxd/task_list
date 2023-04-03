import React from 'react';

const TaskFilters = ({ sortOrder, setSortOrder, filter, setFilter }) => {
  return (
    <div>
      <div>
        <label>Sort by:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Order of addition</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="dateAsc">Date Ascending</option>
          <option value="dateDesc">Date Descending</option>
        </select>
      </div>

      <div>
        <label>Filter by: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;