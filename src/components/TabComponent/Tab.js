import React from 'react';

const Tab = ({ id, label, activeTab, handleTabChange }) => (
  <>
    <input
      type="radio"
      name="tabs"
      id={id}
      checked={activeTab === id}
      onChange={handleTabChange}
    />
    <label htmlFor={id}>{label}</label>
  </>
);


export default Tab;