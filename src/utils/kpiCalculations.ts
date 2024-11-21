import { calculateGrowthRate, calculateCAC, calculateLTV, calculateROAS } from './financialMetrics';

export interface KPIMetrics {
  cac: {
    current: number;
    target: number;
    trend: number;
  };
  ltv: {
    current: number;
    target: number;
    trend: number;
  };
  roas: {
    current: number;
    target: number;
    trend: number;
  };
  mrr: {
    current: number;
    target: number;
    trend: number;
  };
  churn: {
    current: number;
    target: number;
    trend: number;
  };
  conversion: {
    current: number;
    target: number;
    trend: number;
  };
}

export const calculateKPIMetrics = (data: {
  marketingSpend: number;
  newCustomers: number;
  revenue: number;
  customerLifetime: number;
  churnedCustomers: number;
  totalCustomers: number;
  conversions: number;
  visitors: number;
  historicalData: any[];
}): KPIMetrics => {
  // Calculate Customer Acquisition Cost (CAC)
  const cac = calculateCAC(data.marketingSpend, 0, data.newCustomers);
  
  // Calculate Customer Lifetime Value (LTV)
  const averageRevenue = data.revenue / data.totalCustomers;
  const ltv = calculateLTV(averageRevenue, 0.65, data.churnedCustomers / data.totalCustomers);
  
  // Calculate Return on Ad Spend (ROAS)
  const roas = calculateROAS(data.revenue, data.marketingSpend);
  
  // Calculate Monthly Recurring Revenue (MRR)
  const mrr = data.revenue;
  
  // Calculate Churn Rate
  const churn = (data.churnedCustomers / data.totalCustomers) * 100;
  
  // Calculate Conversion Rate
  const conversion = (data.conversions / data.visitors) * 100;

  // Calculate trends based on historical data
  const calculateTrend = (metric: string) => {
    const history = data.historicalData.map(d => d[metric]);
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    return calculateGrowthRate(current, previous);
  };

  return {
    cac: {
      current: cac,
      target: 95,
      trend: calculateTrend('cac')
    },
    ltv: {
      current: ltv,
      target: 1000,
      trend: calculateTrend('ltv')
    },
    roas: {
      current: roas,
      target: 3.5,
      trend: calculateTrend('roas')
    },
    mrr: {
      current: mrr,
      target: 150000,
      trend: calculateTrend('mrr')
    },
    churn: {
      current: churn,
      target: 2.0,
      trend: calculateTrend('churn')
    },
    conversion: {
      current: conversion,
      target: 4.0,
      trend: calculateTrend('conversion')
    }
  };
};