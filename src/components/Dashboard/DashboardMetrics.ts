import {
  calculateGrowthRate,
  calculateProfitMargin,
  calculateConversionRate,
  calculateMovingAverage
} from '../../utils/financialMetrics';
import type { FinancialMetrics } from '../../utils/types';

export interface DashboardData {
  currentRevenue: number;
  previousRevenue: number;
  currentProfit: number;
  previousProfit: number;
  activeUsers: number;
  previousActiveUsers: number;
  conversions: number;
  totalVisitors: number;
}

export const calculateDashboardMetrics = (data: DashboardData) => {
  // Revenue Growth
  const revenueGrowth = calculateGrowthRate(
    data.currentRevenue,
    data.previousRevenue
  );

  // Profit Growth
  const profitGrowth = calculateGrowthRate(
    data.currentProfit,
    data.previousProfit
  );

  // User Growth
  const userGrowth = calculateGrowthRate(
    data.activeUsers,
    data.previousActiveUsers
  );

  // Conversion Rate
  const conversionRate = calculateConversionRate(
    data.conversions,
    data.totalVisitors
  );

  return {
    revenueGrowth,
    profitGrowth,
    userGrowth,
    conversionRate
  };
};

export const calculateRevenueMetrics = (monthlyData: { revenue: number; profit: number }[]) => {
  const revenues = monthlyData.map(d => d.revenue);
  const profits = monthlyData.map(d => d.profit);

  // Calculate moving averages for trend analysis
  const revenueMA = calculateMovingAverage(revenues, 3);
  const profitMA = calculateMovingAverage(profits, 3);

  // Calculate month-over-month growth rates
  const revenueGrowthRates = revenues.map((rev, i) => 
    i === 0 ? 0 : calculateGrowthRate(rev, revenues[i - 1])
  );

  // Calculate profit margins
  const profitMargins = monthlyData.map(d => 
    calculateProfitMargin(d.profit, d.revenue)
  );

  return {
    revenueMA,
    profitMA,
    revenueGrowthRates,
    profitMargins
  };
};

export const calculateCustomerMetrics = (monthlyData: { active: number; new: number }[]) => {
  const activeUsers = monthlyData.map(d => d.active);
  const newUsers = monthlyData.map(d => d.new);

  // Calculate growth rates
  const activeGrowthRates = activeUsers.map((active, i) =>
    i === 0 ? 0 : calculateGrowthRate(active, activeUsers[i - 1])
  );

  // Calculate new user acquisition rate
  const acquisitionRates = monthlyData.map(d => 
    (d.new / d.active) * 100
  );

  return {
    activeGrowthRates,
    acquisitionRates
  };
};