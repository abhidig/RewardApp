import React, { PureComponent } from "react";
import "../../CSS/Tabs.css";
import { calculatePoints, calculateRewardPoints } from "../../utils/utils.js";
import { fetchData } from "../../service/dataService.js";
class Tabs extends PureComponent {
  state = {
    activeTab: "tab1",
    data: [],
    filteredData: [],
    filter: { month: "All", year: "All" },
  };

  componentDidMount() {
    fetchData()
      .then((data) => this.setState({ data }))
      .catch((error) => console.error("Error fetching data:", error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.data !== this.state.data ||
      prevState.filter !== this.state.filter
    ) {
      const filtered = this.state.data.filter((item) => {
        const itemMonth = new Date(item.date).toLocaleString("default", {
          month: "long",
        });
        const itemYear = new Date(item.date).getFullYear().toString();
        return (
          (this.state.filter.month === "All" ||
            itemMonth === this.state.filter.month) &&
          (this.state.filter.year === "All" ||
            itemYear === this.state.filter.year)
        );
      });
      this.setState({ filteredData: filtered });
    }
  }

  handleTabChange = (event) => {
    this.setState({ activeTab: event.target.id });
  };

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      filter: { ...prevState.filter, [name]: value },
    }));
  };

  render() {
    const { activeTab, filteredData, filter } = this.state;
    const { rewardPoints, monthlyRewards } =
      calculateRewardPoints(filteredData);

    return (
      <div className="tabs-block">
        <div className="tabs">
          <input
            type="radio"
            name="tabs"
            id="tab1"
            checked={activeTab === "tab1"}
            onChange={this.handleTabChange}
          />
          <label htmlFor="tab1">User Monthly Rewards</label>

          <input
            type="radio"
            name="tabs"
            id="tab2"
            checked={activeTab === "tab2"}
            onChange={this.handleTabChange}
          />
          <label htmlFor="tab2">Total Rewards</label>

          <input
            type="radio"
            name="tabs"
            id="tab3"
            checked={activeTab === "tab3"}
            onChange={this.handleTabChange}
          />
          <label htmlFor="tab3">Transactions</label>
        </div>
        <div className="filters">
          <label>
            Month:
            <select
              name="month"
              value={filter.month}
              onChange={this.handleFilterChange}
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
            <select
              name="year"
              value={filter.year}
              onChange={this.handleFilterChange}
            >
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
            <div className="table-container">
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
          </div>

          <div className={`tab ${activeTab === "tab2" ? "active" : ""}`}>
            <div className="table-container">
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
          </div>

          <div className={`tab ${activeTab === "tab3" ? "active" : ""}`}>
            <div className="table-container">
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
                  {this.state.data.map((item) => (
                    <tr key={item.transactionId+item.customerId}>
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
      </div>
    );
  }
}

export default Tabs;
