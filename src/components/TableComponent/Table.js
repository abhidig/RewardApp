import React from 'react';

const Table = ({ columns, data }) => (
  <table className="table">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.field}>{col.headerName}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((col) => (
            <td key={col.field} className={col.cellClass || ''}>
              {['points', 'amount', 'lastThreeMonthsRewards'].includes(col.field) ? `$${row[col.field]}` : row[col.field]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);


export default Table;