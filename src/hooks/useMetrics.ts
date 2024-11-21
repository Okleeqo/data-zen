import { useData } from '../context/DataContext';
import {
  calculateFinancialMetrics,
  calculateMarketingMetrics,
  calculateUnitMetrics,
  calculateProductMetrics
} from '../utils/financialMetrics';

export function useMetrics() {
  const { state, dispatch } = useData();

  const updateFinancialMetrics = (data: any) => {
    const calculatedMetrics = calculateFinancialMetrics(data);
    dispatch({ type: 'UPDATE_FINANCIAL', payload: calculatedMetrics });
  };

  const updateMarketingMetrics = (data: any) => {
    const calculatedMetrics = calculateMarketingMetrics(data);
    dispatch({ type: 'UPDATE_MARKETING', payload: calculatedMetrics });
  };

  const updateUnitMetrics = (data: any) => {
    const calculatedMetrics = calculateUnitMetrics(data);
    dispatch({ type: 'UPDATE_UNIT', payload: calculatedMetrics });
  };

  const updateProductMetrics = (data: any) => {
    const calculatedMetrics = calculateProductMetrics(data);
    dispatch({ type: 'UPDATE_PRODUCT', payload: calculatedMetrics });
  };

  const bulkUpdate = (data: any) => {
    dispatch({ type: 'BULK_UPDATE', payload: data });
  };

  return {
    metrics: state,
    updateFinancialMetrics,
    updateMarketingMetrics,
    updateUnitMetrics,
    updateProductMetrics,
    bulkUpdate
  };
}