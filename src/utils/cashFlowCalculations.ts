import { calculateGrowthRate } from './financialMetrics';

export interface CashFlowMetrics {
  inflow: {
    current: number;
    previous: number;
    growth: number;
    trend: number[];
  };
  outflow: {
    current: number;
    previous: number;
    growth: number;
    trend: number[];
  };
  netCashFlow: {
    current: number;
    previous: number;
    growth: number;
    trend: number[];
  };
  runway: number;
  burnRate: number;
  workingCapital: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  recurring: boolean;
}

export const calculateCashFlowMetrics = (data: {
  inflows: number[];
  outflows: number[];
  cashReserves: number;
  monthlyBurnRate: number;
}): CashFlowMetrics => {
  const currentInflow = data.inflows[data.inflows.length - 1];
  const previousInflow = data.inflows[data.inflows.length - 2];
  const currentOutflow = data.outflows[data.outflows.length - 1];
  const previousOutflow = data.outflows[data.outflows.length - 2];

  // Calculate net cash flows
  const netCashFlows = data.inflows.map((inflow, index) => 
    inflow - data.outflows[index]
  );

  const currentNetCashFlow = netCashFlows[netCashFlows.length - 1];
  const previousNetCashFlow = netCashFlows[netCashFlows.length - 2];

  // Calculate growth rates
  const inflowGrowth = calculateGrowthRate(currentInflow, previousInflow);
  const outflowGrowth = calculateGrowthRate(currentOutflow, previousOutflow);
  const netCashFlowGrowth = calculateGrowthRate(currentNetCashFlow, previousNetCashFlow);

  // Calculate working capital
  const workingCapital = data.cashReserves - currentOutflow;

  // Calculate runway in months
  const runway = data.cashReserves / data.monthlyBurnRate;

  return {
    inflow: {
      current: currentInflow,
      previous: previousInflow,
      growth: inflowGrowth,
      trend: data.inflows
    },
    outflow: {
      current: currentOutflow,
      previous: previousOutflow,
      growth: outflowGrowth,
      trend: data.outflows
    },
    netCashFlow: {
      current: currentNetCashFlow,
      previous: previousNetCashFlow,
      growth: netCashFlowGrowth,
      trend: netCashFlows
    },
    runway,
    burnRate: data.monthlyBurnRate,
    workingCapital
  };
};

export const calculateExpenseProjections = (
  expenses: ExpenseBreakdown[],
  months: number
): number[] => {
  const projections = new Array(months).fill(0);
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const monthIndex = expenseDate.getMonth();
    
    if (expense.recurring) {
      // Add recurring expense to all future months
      for (let i = monthIndex; i < months; i++) {
        projections[i] += expense.amount;
      }
    } else {
      // Add one-time expense to specific month
      projections[monthIndex] += expense.amount;
    }
  });

  return projections;
};

export const calculateCashFlowRatios = (data: {
  inflows: number[];
  outflows: number[];
  operatingExpenses: number;
}) => {
  const totalInflow = data.inflows.reduce((sum, val) => sum + val, 0);
  const totalOutflow = data.outflows.reduce((sum, val) => sum + val, 0);
  
  return {
    // Operating Cash Flow Ratio
    operatingCashFlowRatio: totalInflow / data.operatingExpenses,
    
    // Cash Flow Coverage Ratio
    cashFlowCoverageRatio: totalInflow / totalOutflow,
    
    // Cash Flow to Income Ratio
    cashFlowToIncomeRatio: (totalInflow - totalOutflow) / totalInflow
  };
};

export const analyzeCashFlowTrend = (
  cashFlows: number[],
  periods: number = 3
): 'improving' | 'stable' | 'declining' => {
  const recentFlows = cashFlows.slice(-periods);
  const growthRates = recentFlows.map((flow, index) => 
    index === 0 ? 0 : calculateGrowthRate(flow, recentFlows[index - 1])
  ).slice(1);

  const averageGrowth = growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;

  if (averageGrowth > 5) return 'improving';
  if (averageGrowth < -5) return 'declining';
  return 'stable';
};