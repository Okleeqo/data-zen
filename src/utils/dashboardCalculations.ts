import {
  calculateGrowthRate,
  calculateProfitMargin,
  calculateMovingAverage,
  calculateGrossMargin,
  calculateOperatingIncome,
  calculateNetIncome,
  calculateROAS,
  calculateCAC,
  calculateLTV
} from './financialMetrics';

export interface DashboardMetrics {
  revenue: {
    current: number;
    growth: number;
    trend: number[];
  };
  profit: {
    current: number;
    growth: number;
    margin: number;
    trend: number[];
  };
  users: {
    active: number;
    growth: number;
    acquisition: number;
    trend: number[];
  };
  marketing: {
    cac: number;
    ltv: number;
    roas: number;
  };
}

export const calculateDashboardMetrics = (data: {
  revenue: { current: number; previous: number; historical: number[] };
  costs: { current: number; previous: number; historical: number[] };
  users: { current: number; previous: number; historical: number[] };
  marketing: {
    spend: number;
    revenue: number;
    newCustomers: number;
    averageRevenue: number;
    grossMargin: number;
    churnRate: number;
  };
}): DashboardMetrics => {
  // Revenue Metrics
  const revenueGrowth = calculateGrowthRate(data.revenue.current, data.revenue.previous);
  const revenueTrend = calculateMovingAverage(data.revenue.historical, 3);

  // Profit Metrics
  const currentProfit = data.revenue.current - data.costs.current;
  const previousProfit = data.revenue.previous - data.costs.previous;
  const profitGrowth = calculateGrowthRate(currentProfit, previousProfit);
  const profitMargin = calculateProfitMargin(currentProfit, data.revenue.current);
  const profitTrend = calculateMovingAverage(
    data.revenue.historical.map((rev, i) => rev - data.costs.historical[i]),
    3
  );

  // User Metrics
  const userGrowth = calculateGrowthRate(data.users.current, data.users.previous);
  const userTrend = calculateMovingAverage(data.users.historical, 3);
  const userAcquisition = (data.users.current - data.users.previous) / data.users.previous * 100;

  // Marketing Metrics
  const cac = calculateCAC(
    data.marketing.spend,
    0, // Assuming sales expenses are included in marketing spend
    data.marketing.newCustomers
  );
  
  const ltv = calculateLTV(
    data.marketing.averageRevenue,
    data.marketing.grossMargin,
    data.marketing.churnRate
  );
  
  const roas = calculateROAS(data.marketing.revenue, data.marketing.spend);

  return {
    revenue: {
      current: data.revenue.current,
      growth: revenueGrowth,
      trend: revenueTrend
    },
    profit: {
      current: currentProfit,
      growth: profitGrowth,
      margin: profitMargin,
      trend: profitTrend
    },
    users: {
      active: data.users.current,
      growth: userGrowth,
      acquisition: userAcquisition,
      trend: userTrend
    },
    marketing: {
      cac,
      ltv,
      roas
    }
  };
};