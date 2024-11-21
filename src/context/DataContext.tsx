import { createContext, useContext, useReducer, ReactNode } from 'react';

interface ModuleData {
  revenue?: number;
  profit?: number;
  activeUsers?: number;
  conversionRate?: number;
  revenueGrowth?: number;
  profitGrowth?: number;
  userGrowth?: number;
  conversionGrowth?: number;
  chartData?: any[];
  userData?: any[];
}

interface DataState {
  [module: string]: ModuleData;
}

type DataAction = {
  type: string;
  payload?: ModuleData;
  source?: string;
};

const initialState: DataState = {
  dashboard: {
    revenue: 0,
    profit: 0,
    activeUsers: 0,
    conversionRate: 0,
    revenueGrowth: 0,
    profitGrowth: 0,
    userGrowth: 0,
    conversionGrowth: 0,
    chartData: [],
    userData: []
  },
  cashflow: {
    inflow: 0,
    outflow: 0,
    netCashFlow: 0,
    balance: 0,
    chartData: []
  },
  kpi: {
    cac: 0,
    ltv: 0,
    roas: 0,
    mrr: 0,
    churn: 0,
    conversion: 0,
    chartData: []
  },
  scenario: {
    projections: [],
    scenarios: []
  },
  marketing: {
    spend: 0,
    revenue: 0,
    roi: 0,
    campaigns: []
  },
  uniteconomics: {
    revenuePerUnit: 0,
    costPerUnit: 0,
    marginPerUnit: 0,
    breakeven: 0
  },
  product: {
    products: [],
    metrics: {}
  }
};

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
} | undefined>(undefined);

function dataReducer(state: DataState, action: DataAction): DataState {
  const [module, actionType] = action.type.split('_');
  
  switch (actionType) {
    case 'UPDATE':
      return {
        ...state,
        [module.toLowerCase()]: {
          ...(state[module.toLowerCase()] || {}),
          ...action.payload,
          lastUpdated: new Date().toISOString(),
          source: action.source
        }
      };
    case 'RESET':
      return {
        ...state,
        [module.toLowerCase()]: initialState[module.toLowerCase()] || {}
      };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}