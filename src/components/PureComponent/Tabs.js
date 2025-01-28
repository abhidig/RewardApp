import React, { PureComponent } from "react";
import "../../CSS/Tabs.css";
import { calculatePoints, calculateRewardPoints } from "../../utils/utils.js";
import { fetchData } from "../../service/dataService.js";
import Filter from "../FiltersComponent/Filter.js";
import Tab from "../TabComponent/Tab.js";
import Table from "../TableComponent/Table.js";

class Tabs extends PureComponent {
  state = {
    activeTab: "tab1",
    data: [],
    filteredData: [],
    filter: { month: "All", year: "All" },
    searchQuery: "",
  };

  componentDidMount() {
    fetchData()
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.data !== this.state.data ||
      prevState.filter !== this.state.filter ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.filterData();
    }
  }

  filterData = () => {
    const { data, filter, searchQuery } = this.state;
    const filtered = data.filter((item) => {
      const itemMonth = new Date(item.date).toLocaleString("default", {
        month: "long",
      });
      const itemYear = new Date(item.date).getFullYear().toString();
      const matchesFilter =
        (filter.month === "All" || itemMonth === filter.month) &&
        (filter.year === "All" || itemYear === filter.year);
      const matchesSearchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearchQuery;
    });
    this.setState({ filteredData: filtered });
  };

  handleTabChange = (event) => {
    this.setState({ activeTab: event.target.id });
  };

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      filter: { ...prevState.filter, [name]: value },
    }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { activeTab, filteredData, filter, searchQuery } = this.state;
    const { rewardPoints, monthlyRewards } =
      calculateRewardPoints(filteredData);

    const columns = {
      tab1: [
        { headerName: "Customer Id", field: "customerId" },
        { headerName: "Customer Name", field: "name" },
        { headerName: "Month", field: "month" },
        { headerName: "Year", field: "year" },
        { headerName: "Reward Points", field: "points", cellClass: "align-right" },
      ],
      tab2: [
        { headerName: "Customer Id", field: "customerId" },
        { headerName: "Customer Name", field: "name" },
        {
          headerName: "Last Three Months Reward",
          field: "lastThreeMonthsRewards",
          cellClass: "align-right"
        },
      ],
      tab3: [
        { headerName: "Transaction Id", field: "transactionId" },
        { headerName: "Customer Id", field: "customerId" },
        { headerName: "Customer Name", field: "name" },
        { headerName: "Purchase Date", field: "date" },
        { headerName: "Product Purchased", field: "product" },
        { headerName: "Price ($)", field: "amount",cellClass: "align-right" },
        { headerName: "Reward Points", field: "points",cellClass: "align-right" },
      ],
    };
    const data = {
      tab1: monthlyRewards,
      tab2: Object.entries(rewardPoints)
        .map(([key, value]) => ({
          customerId: key,
          name: value.name,
          lastThreeMonthsRewards: value.lastThreeMonthsPoints,
        }))
        .filter((item) => item.lastThreeMonthsRewards > 0),
      tab3: filteredData.map((item) => ({
        ...item,
        amount: parseFloat(item.amount).toFixed(2),
        points: calculatePoints(item.amount),
      })),
    };

    return (
      <div className="tabs-block">
        <div className="tabs">
          <Tab
            id="tab1"
            label="User Monthly Rewards"
            activeTab={activeTab}
            handleTabChange={this.handleTabChange}
          />
          <Tab
            id="tab2"
            label="Total Rewards"
            activeTab={activeTab}
            handleTabChange={this.handleTabChange}
          />
          <Tab
            id="tab3"
            label="Transactions"
            activeTab={activeTab}
            handleTabChange={this.handleTabChange}
          />
        </div>
        <Filter
          filter={filter}
          searchQuery={searchQuery}
          handleFilterChange={this.handleFilterChange}
          handleSearchChange={this.handleSearchChange}
        />
        <div className="tab-content">
          <div className={`tab ${activeTab === "tab1" ? "active" : ""}`}>
            <Table columns={columns.tab1} data={data.tab1} />
          </div>
          <div className={`tab ${activeTab === "tab2" ? "active" : ""}`}>
            <Table columns={columns.tab2} data={data.tab2} />
          </div>
          <div className={`tab ${activeTab === "tab3" ? "active" : ""}`}>
            <Table columns={columns.tab3} data={data.tab3} />
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
