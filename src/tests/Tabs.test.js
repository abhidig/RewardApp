import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tabs from '../components/PureComponent/Tabs.js';
import { calculateRewardPoints } from '../utils/utils';

// Mock the calculateRewardPoints function
jest.mock('../utils/utils', () => ({
  calculateRewardPoints: jest.fn(),
  calculatePoints: jest.fn((amount) => Math.round(amount)),
}));

const mockData = [
  {
    transactionId: '01',
    customerId: '123',
    customer: 'John Doe',
    date: '2021-01-01',
    product: 'Product 1',
    amount: 120,
  }
];

describe('Tabs Component', () => {
  beforeEach(() => {
    calculateRewardPoints.mockReturnValue({
      rewardPoints: {
        'C001': { total: 90, currentMonth: 0, currentYear: 90, lastThreeMonthsRewards: 90 },
        'C002': { total: 30, currentMonth: 0, currentYear: 30, lastThreeMonthsRewards: 30 },
      },
      monthlyRewards: [
        {
          customerId: '123',
          name: 'John Doe',
          month: 'January',
          year: 2025,
          points: 90,
        },
        {
          customerId: '124',
          name: 'Jane Doe',
          month: 'February',
          year: 2025,
          points: 30,
        },
      ],
    });
  });

  test('renders User Monthly Rewards tab by default', () => {
    render(<Tabs transactions={mockData} />);
    expect(screen.getByLabelText('User Monthly Rewards')).toBeChecked();
    expect(screen.getAllByText('Customer Id')[0]).toBeVisible();
    expect(screen.getByText('123')).toBeVisible();
  });

  test('switches to Total Rewards tab', () => {
    render(<Tabs transactions={mockData} />);
    fireEvent.click(screen.getByLabelText('Total Rewards'));
    expect(screen.getByLabelText('Total Rewards')).toBeChecked();
    expect(screen.getAllByText('Customer Id')[0]).toBeVisible();
    expect(screen.getByText('123')).toBeVisible();
  });

  test('switches to Transactions tab', () => {
    render(<Tabs transactions={mockData} />);
    fireEvent.click(screen.getByLabelText('Transactions'));
    expect(screen.getByLabelText('Transactions')).toBeChecked();
    expect(screen.getAllByText('Transaction Id')[0]).toBeVisible();
    expect(mockData[0].transactionId).toBe('01');
  });

});