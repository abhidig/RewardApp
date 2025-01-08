const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += amount - 50;
  }
  return Math.round(points);
};

const calculateRewardPoints = (transactions) => {
  const rewardPoints = {};
  const monthlyRewards = [];

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  transactions.forEach(({ id, customerId, name, date, product, amount }) => {
    const transactionDate = new Date(date);
    const month = transactionDate.toLocaleString("default", { month: "long" });
    const year = transactionDate.getFullYear();
    const points = calculatePoints(amount);

    if (!rewardPoints[customerId]) {
      rewardPoints[customerId] = {
        total: 0,
        monthly: {},
        yearly: {},
        currentYear: 0,
        currentMonth: 0,
      };
    }
    rewardPoints[customerId].total += points;
    rewardPoints[customerId].name = name;

    if (!rewardPoints[customerId].monthly[year]) {
      rewardPoints[customerId].monthly[year] = {};
    }
    if (!rewardPoints[customerId].monthly[year][month]) {
      rewardPoints[customerId].monthly[year][month] = 0;
    }
    rewardPoints[customerId].monthly[year][month] += points;

    if (!rewardPoints[customerId].yearly[year]) {
      rewardPoints[customerId].yearly[year] = 0;
    }
    rewardPoints[customerId].yearly[year] += points;

    if (year === currentYear) {
      rewardPoints[customerId].currentYear += points;
    }
    if (month === currentMonth && year === currentYear) {
      rewardPoints[customerId].currentMonth += points;
    }

    monthlyRewards.push({ customerId, name, month, year, points });
  });

  // Calculate last three same months' rewards based on different years for the same month
  Object.keys(rewardPoints).forEach((customerId) => {
    const customerRewards = rewardPoints[customerId];
    let lastThreeMonthsPoints = 0;
    const months = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setFullYear(currentDate.getFullYear() - i);
      const month = currentDate.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      months.push({ month, year });
    }
    months.forEach(({ month, year }) => {
      if (
        customerRewards.monthly[year] &&
        customerRewards.monthly[year][month]
      ) {
        lastThreeMonthsPoints += customerRewards.monthly[year][month];
      }
    });
    customerRewards.lastThreeMonths = lastThreeMonthsPoints;
  });

  return { rewardPoints, monthlyRewards };
};

export { calculatePoints, calculateRewardPoints };
