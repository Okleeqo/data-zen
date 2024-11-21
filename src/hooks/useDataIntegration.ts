import { useState, useCallback } from 'react';
import DataIntegration from '../services/DataIntegration';
import type { IntegrationConfig, DataMapping } from '../types/integration';

export function useDataIntegration() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectSource = useCallback(async (config: IntegrationConfig) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const integration = DataIntegration.getInstance();
      const success = await integration.connectDataSource(config);
      
      if (!success) {
        throw new Error('Failed to connect data source');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect data source');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const syncData = useCallback(async (sourceId: string, mapping: DataMapping) => {
    setIsSyncing(true);
    setError(null);
    
    try {
      const integration = DataIntegration.getInstance();
      const success = await integration.syncData(sourceId, mapping);
      
      if (!success) {
        throw new Error('Failed to sync data');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync data');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    connectSource,
    syncData,
    isConnecting,
    isSyncing,
    error
  };
}