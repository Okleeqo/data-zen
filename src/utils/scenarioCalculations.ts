import { calculateGrowthRate } from './financialMetrics';

export interface ScenarioParams {
  salesGrowth: number;
  expenseGrowth: number;
  marketExpansion: number;
  headcount: number;
  baseRevenue: number;
  baseExpenses: number;
}

export interface ProjectedMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  roi: number;
}

export const calculateScenarioProjections = (
  params: ScenarioParams,
  months: number = 12
): ProjectedMetrics[] => {
  const projections: ProjectedMetrics[] = [];
  
  for (let i = 0; i < months; i++) {
    const growthFactor = 1 + (params.salesGrowth / 100) * (i / 12);
    const expenseFactor = 1 + (params.expenseGrowth / 100) * (i / 12);
    const expansionFactor = 1 + (params.marketExpansion / 100) * (i / 12);
    
    const revenue = params.baseRevenue * growthFactor * expansionFactor;
    const expenses = params.baseExpenses * expenseFactor + (params.headcount * 5000);
    const profit = revenue - expenses;
    const cashFlow = profit * 0.85; // Assuming 85% of profit converts to cash
    const roi = ((revenue - expenses) / expenses) * 100;
    
    projections.push({
      revenue,
      expenses,
      profit,
      cashFlow,
      roi
    });
  }
  
  return projections;
};

export const calculateScenarioImpact = (
  baseScenario: ProjectedMetrics[],
  newScenario: ProjectedMetrics[]
): number[] => {
  return baseScenario.map((base, index) => {
    const new_ = newScenario[index];
    return calculateGrowthRate(new_.profit, base.profit);
  });
};

export const calculateRiskAdjustedMetrics = (
  projections: ProjectedMetrics[],
  riskFactor: number // 0-1 scale
): ProjectedMetrics[] => {
  return projections.map(projection => ({
    ...projection,
    revenue: projection.revenue * (1 - riskFactor),
    profit: projection.profit * (1 - riskFactor),
    cashFlow: projection.cashFlow * (1 - riskFactor),
    roi: projection.roi * (1 - riskFactor)
  }));
};

export const calculateBreakEvenPoint = (
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number
): number => {
  return fixedCosts / (pricePerUnit - variableCostPerUnit);
};

export const analyzeSensitivity = (
  baseParams: ScenarioParams,
  variationPercentage: number = 10
): Record<keyof ScenarioParams, ProjectedMetrics[]> => {
  const results: Record<string, ProjectedMetrics[]> = {};
  
  (Object.keys(baseParams) as Array<keyof ScenarioParams>).forEach(param => {
    const upParams = { ...baseParams };
    upParams[param] = Number(baseParams[param]) * (1 + variationPercentage / 100);
    results[param] = calculateScenarioProjections(upParams);
  });
  
  return results as Record<keyof ScenarioParams, ProjectedMetrics[]>;
};