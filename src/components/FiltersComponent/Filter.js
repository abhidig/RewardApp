import React from 'react';
import "../../CSS/Tabs.css";

const Filter = ({ filter, searchQuery, handleFilterChange, handleSearchChange }) => (
  <div className="filters">
    <label>
      Month:
      <select name="month" value={filter.month} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </label>
    <label>
      Year:
      <select name="year" value={filter.year} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>
    </label>
    <label className="search-label">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or ID"
        className="search-input"
      />
    </label>
  </div>
);

export default Filter;