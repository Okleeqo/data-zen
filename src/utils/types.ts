// Types for Financial Metrics

export interface FinancialMetrics {
  revenue: number;
  cogs: number;
  operatingExpenses: number;
  otherExpenses: number;
  taxes: number;
}

export interface MarketingMetrics {
  marketingExpenses: number;
  salesExpenses: number;
  newCustomers: number;
  totalCustomers: number;
  customersLost: number;
  adSpend: number;
  conversions: number;
  totalVisitors: number;
}

export interface UnitMetrics {
  revenuePerUnit: number;
  cogsPerUnit: number;
  operatingExpensesPerUnit: number;
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
}

export interface ProductMetrics {
  productRevenue: number;
  productCosts: number;
  salesVolume: number;
  marketShare: number;
}

export interface ScenarioParams {
  growthRate: number;
  marketExpansion: number;
  riskFactor: number;
  seasonality: number;
}

export interface KPITarget {
  metric: string;
  target: number;
  threshold: number;
  currentValue: number;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';