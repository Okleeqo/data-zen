import { useState, useCallback } from 'react';
import { GoogleSheetsService } from '../services/GoogleSheetsService';
import type { DataSourceConfig } from '../types/integration';

export function useGoogleSheets(module: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const service = GoogleSheetsService.getInstance();
      const data = await service.fetchData(module);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [module]);

  const setConfig = useCallback((config: DataSourceConfig) => {
    const service = GoogleSheetsService.getInstance();
    service.setConfig(module, config);
  }, [module]);

  return {
    fetchData,
    setConfig,
    isLoading,
    error
  };
}