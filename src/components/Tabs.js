import React, { useEffect, useState, useCallback } from "react";
import "../CSS/Tabs.css";
import { calculatePoints, calculateRewardPoints } from "../utils/utils";
const Tabs = React.memo(() => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ month: "All", year: "All" });

  const handleTabChange = useCallback((event) => {
    setActiveTab(event.target.id);
  }, []);

  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  }, []);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const itemMonth = new Date(item.date).toLocaleString("default", {
        month: "long",
      });
      const itemYear = new Date(item.date).getFullYear().toString();
      return (
        (filter.month === "All" || itemMonth === filter.month) &&
        (filter.year === "All" || itemYear === filter.year)
      );
    });
    setFilteredData(filtered);
  }, [data, filter]);

  const { rewardPoints, monthlyRewards } = calculateRewardPoints(filteredData);
  console.log(rewardPoints);
  return (
    <div className="tabs-block">
      <div className="tabs">
        <input
          type="radio"
          name="tabs"
          id="tab1"
          checked={activeTab === "tab1"}
          onChange={handleTabChange}
        />
        <label htmlFor="tab1">Monthly Rewards</label>

        <input
          type="radio"
          name="tabs"
          id="tab2"
          checked={activeTab === "tab2"}
          onChange={handleTabChange}
        />
        <label htmlFor="tab2">Total Rewards(last Three Months)</label>

        <input
          type="radio"
          name="tabs"
          id="tab3"
          checked={activeTab === "tab3"}
          onChange={handleTabChange}
        />
        <label htmlFor="tab3">All Transactions</label>
      </div>
      <div className="filters">
        <label>
          Month:
          <select
            name="month"
            value={filter.month}
            onChange={handleFilterChange}
          >
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
      </div>

      <div className="tab-content">
        <div className={`tab ${activeTab === "tab1" ? "active" : ""}`}>
          <table className="table">
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Month</th>
                <th>Year</th>
                <th>Reward Points</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRewards.map((item) => (
                <tr key={`${item.customerId}-${item.month}-${item.year}`}>
                  <td>{item.customerId}</td>
                  <td>{item.name}</td>
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`tab ${activeTab === "tab2" ? "active" : ""}`}>
          <table className="table">
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Last Three Months Reward</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rewardPoints).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.name}</td>
                  <td>{value.lastThreeMonths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`tab ${activeTab === "tab3" ? "active" : ""}`}>
          <table className="table">
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Purchase Date</th>
                <th>Product Purchased</th>
                <th>Price</th>
                <th>Reward Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.transactionId}>
                  <td>{item.transactionId}</td>
                  <td>{item.customerId}</td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.product}</td>
                  <td>{item.amount}</td>
                  <td>{calculatePoints(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default Tabs;
