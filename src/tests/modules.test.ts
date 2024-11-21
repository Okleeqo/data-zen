import { describe, test, expect } from 'vitest';
import {
  calculateDashboardMetrics,
  calculateCashFlowMetrics,
  calculateKPIMetrics,
  calculateScenarioProjections,
  calculateUnitEconomics,
  calculateProductROI
} from '../utils/financialMetrics';

describe('Dashboard Module', () => {
  test('calculates revenue growth correctly', () => {
    const data = {
      revenue: { current: 91000, previous: 82000, historical: [65000, 72000, 68000, 78000, 82000, 91000] },
      costs: { current: 59000, previous: 53000, historical: [42000, 47000, 46000, 51000, 53000, 59000] },
      users: { current: 1950, previous: 1790, historical: [1200, 1350, 1480, 1620, 1790, 1950] },
      marketing: {
        spend: 15000,
        revenue: 91000,
        newCustomers: 380,
        averageRevenue: 250,
        grossMargin: 0.65,
        churnRate: 0.08
      }
    };
    
    const metrics = calculateDashboardMetrics(data);
    expect(metrics.revenue.growth).toBeCloseTo(11.0, 1);
  });
});

describe('Cash Flow Module', () => {
  test('calculates net cash flow correctly', () => {
    const data = {
      inflows: [85000, 92000, 88000, 95000, 98000, 102000],
      outflows: [65000, 72000, 70000, 68000, 75000, 78000],
      cashReserves: 250000,
      monthlyBurnRate: 15000
    };
    
    const metrics = calculateCashFlowMetrics(data);
    expect(metrics.netCashFlow.current).toBe(24000);
  });
});

describe('KPI Module', () => {
  test('calculates CAC and LTV correctly', () => {
    const data = {
      marketingSpend: 50000,
      newCustomers: 500,
      revenue: 145000,
      customerLifetime: 24,
      churnedCustomers: 75,
      totalCustomers: 5000,
      conversions: 190,
      visitors: 5000,
      historicalData: [
        { cac: 110, ltv: 950, roas: 3.6, mrr: 135000, churn: 1.8, conversion: 3.6 },
        { cac: 105, ltv: 980, roas: 3.8, mrr: 140000, churn: 1.7, conversion: 3.7 },
        { cac: 100, ltv: 1020, roas: 4.0, mrr: 145000, churn: 1.5, conversion: 3.8 }
      ]
    };
    
    const metrics = calculateKPIMetrics(data);
    expect(metrics.cac.current).toBeGreaterThan(0);
    expect(metrics.ltv.current).toBeGreaterThan(metrics.cac.current);
  });
});

describe('Scenario Planning Module', () => {
  test('generates valid projections', () => {
    const params = {
      salesGrowth: 10,
      expenseGrowth: 5,
      marketExpansion: 15,
      headcount: 50,
      baseRevenue: 1000000,
      baseExpenses: 750000
    };
    
    const projections = calculateScenarioProjections(params);
    expect(projections.length).toBe(12); // 12 months
    expect(projections[0].revenue).toBeGreaterThan(params.baseRevenue);
  });
});

describe('Unit Economics Module', () => {
  test('calculates unit metrics correctly', () => {
    const data = {
      revenuePerUnit: 170,
      cogsPerUnit: 65,
      operatingExpensesPerUnit: 34
    };
    
    const metrics = calculateUnitEconomics(data);
    expect(metrics.grossProfitPerUnit).toBe(105);
    expect(metrics.operatingIncomePerUnit).toBe(71);
  });
});

describe('Product Module', () => {
  test('calculates product ROI correctly', () => {
    const revenue = 577500;
    const costs = 220000;
    
    const roi = calculateProductROI(revenue, costs);
    expect(roi).toBeGreaterThan(0);
  });
});