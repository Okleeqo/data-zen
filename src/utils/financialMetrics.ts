// Financial Metrics Calculation Utilities

// General Financial Metrics
export const calculateGrowthRate = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};

export const calculatePercentage = (part: number, total: number): number => {
  return (part / total) * 100;
};

// Revenue & Profitability Metrics
export const calculateGrossProfit = (revenue: number, cogs: number): number => {
  return revenue - cogs;
};

export const calculateGrossMargin = (revenue: number, cogs: number): number => {
  return ((revenue - cogs) / revenue) * 100;
};

export const calculateOperatingIncome = (
  revenue: number,
  cogs: number,
  operatingExpenses: number
): number => {
  return revenue - cogs - operatingExpenses;
};

export const calculateNetIncome = (
  revenue: number,
  cogs: number,
  operatingExpenses: number,
  otherExpenses: number,
  taxes: number
): number => {
  return revenue - cogs - operatingExpenses - otherExpenses - taxes;
};

export const calculateProfitMargin = (netIncome: number, revenue: number): number => {
  return (netIncome / revenue) * 100;
};

// Cash Flow Metrics
export const calculateFreeCashFlow = (
  operatingCashFlow: number,
  capitalExpenditures: number
): number => {
  return operatingCashFlow - capitalExpenditures;
};

export const calculateCashBurnRate = (
  startingCash: number,
  endingCash: number,
  months: number
): number => {
  return (startingCash - endingCash) / months;
};

export const calculateRunway = (cashBalance: number, monthlyBurnRate: number): number => {
  return cashBalance / monthlyBurnRate;
};

// Marketing & Sales Metrics
export const calculateCAC = (
  marketingExpenses: number,
  salesExpenses: number,
  newCustomers: number
): number => {
  return (marketingExpenses + salesExpenses) / newCustomers;
};

export const calculateLTV = (
  averageRevenue: number,
  grossMargin: number,
  churnRate: number
): number => {
  return (averageRevenue * grossMargin) / churnRate;
};

export const calculateROAS = (revenue: number, adSpend: number): number => {
  return revenue / adSpend;
};

export const calculateConversionRate = (
  conversions: number,
  totalVisitors: number
): number => {
  return (conversions / totalVisitors) * 100;
};

export const calculateChurnRate = (
  customersLost: number,
  totalCustomers: number
): number => {
  return (customersLost / totalCustomers) * 100;
};

// Unit Economics Metrics
export const calculateUnitEconomics = (
  revenuePerUnit: number,
  cogsPerUnit: number,
  operatingExpensesPerUnit: number
) => {
  const grossProfitPerUnit = revenuePerUnit - cogsPerUnit;
  const operatingIncomePerUnit = grossProfitPerUnit - operatingExpensesPerUnit;
  const grossMarginPerUnit = (grossProfitPerUnit / revenuePerUnit) * 100;
  
  return {
    grossProfitPerUnit,
    operatingIncomePerUnit,
    grossMarginPerUnit
  };
};

export const calculateBreakEvenPoint = (
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): number => {
  return fixedCosts / (pricePerUnit - variableCostPerUnit);
};

// Product Performance Metrics
export const calculateProductROI = (
  productRevenue: number,
  productCosts: number
): number => {
  return ((productRevenue - productCosts) / productCosts) * 100;
};

export const calculateProductMargin = (
  productRevenue: number,
  productCosts: number
): number => {
  return ((productRevenue - productCosts) / productRevenue) * 100;
};

// Forecasting Utilities
export const calculateLinearProjection = (
  historicalData: number[],
  periodsToProject: number
): number[] => {
  const avgGrowth = historicalData.reduce((acc, curr, i, arr) => {
    if (i === 0) return acc;
    return acc + ((curr - arr[i - 1]) / arr[i - 1]);
  }, 0) / (historicalData.length - 1);

  const projections = [];
  let lastValue = historicalData[historicalData.length - 1];

  for (let i = 0; i < periodsToProject; i++) {
    lastValue = lastValue * (1 + avgGrowth);
    projections.push(lastValue);
  }

  return projections;
};

export const calculateSeasonalProjection = (
  historicalData: number[],
  periodsToProject: number,
  seasonalityFactor: number
): number[] => {
  const baseProjection = calculateLinearProjection(historicalData, periodsToProject);
  
  return baseProjection.map((value, index) => {
    const seasonalAdjustment = Math.sin((index / 12) * Math.PI * 2) * seasonalityFactor;
    return value * (1 + seasonalAdjustment);
  });
};

// KPI Tracking Utilities
export const calculateKPIStatus = (
  currentValue: number,
  target: number,
  threshold: number
): 'success' | 'warning' | 'danger' => {
  const percentage = (currentValue / target) * 100;
  
  if (percentage >= 100) return 'success';
  if (percentage >= threshold) return 'warning';
  return 'danger';
};

export const calculateMovingAverage = (
  data: number[],
  periods: number
): number[] => {
  const result = [];
  for (let i = periods - 1; i < data.length; i++) {
    const sum = data.slice(i - periods + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / periods);
  }
  return result;
};

// Scenario Planning Utilities
export const calculateScenarioImpact = (
  baseValue: number,
  growthRate: number,
  marketExpansion: number,
  riskFactor: number
): number => {
  const growthImpact = baseValue * (1 + growthRate / 100);
  const expansionImpact = growthImpact * (1 + marketExpansion / 100);
  const riskAdjusted = expansionImpact * (1 - riskFactor / 100);
  
  return riskAdjusted;
};