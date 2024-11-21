import { DataSource, DataField, DataMapping, IntegrationConfig } from '../types/integration';

class DataIntegration {
  private static instance: DataIntegration;
  private dataSources: Map<string, DataSource> = new Map();
  private dataCache: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): DataIntegration {
    if (!DataIntegration.instance) {
      DataIntegration.instance = new DataIntegration();
    }
    return DataIntegration.instance;
  }

  async connectDataSource(config: IntegrationConfig): Promise<boolean> {
    try {
      const source: DataSource = {
        id: config.id,
        name: config.name,
        type: config.type,
        config: config.connectionConfig,
        lastSync: null,
        status: 'connecting'
      };

      // Validate connection
      await this.testConnection(source);
      
      source.status = 'connected';
      this.dataSources.set(source.id, source);
      
      return true;
    } catch (error) {
      console.error('Failed to connect data source:', error);
      return false;
    }
  }

  async syncData(sourceId: string, mapping: DataMapping): Promise<boolean> {
    try {
      const source = this.dataSources.get(sourceId);
      if (!source) throw new Error('Data source not found');

      // Fetch data from source
      const rawData = await this.fetchDataFromSource(source);
      
      // Transform data according to mapping
      const transformedData = this.transformData(rawData, mapping);
      
      // Cache the transformed data
      this.dataCache.set(sourceId, transformedData);
      
      // Update last sync timestamp
      source.lastSync = new Date();
      this.dataSources.set(sourceId, source);

      return true;
    } catch (error) {
      console.error('Failed to sync data:', error);
      return false;
    }
  }

  private async testConnection(source: DataSource): Promise<void> {
    switch (source.type) {
      case 'api':
        await this.testApiConnection(source.config);
        break;
      case 'database':
        await this.testDatabaseConnection(source.config);
        break;
      default:
        throw new Error('Unsupported data source type');
    }
  }

  private async fetchDataFromSource(source: DataSource): Promise<any> {
    switch (source.type) {
      case 'api':
        return await this.fetchFromApi(source.config);
      case 'database':
        return await this.fetchFromDatabase(source.config);
      default:
        throw new Error('Unsupported data source type');
    }
  }

  private transformData(data: any, mapping: DataMapping): any {
    return Object.entries(mapping).reduce((transformed, [targetField, sourceField]) => {
      transformed[targetField] = this.extractValue(data, sourceField);
      return transformed;
    }, {} as any);
  }

  private extractValue(data: any, field: DataField): any {
    if (typeof field === 'string') {
      return data[field];
    }
    if (field.transform) {
      const value = this.extractValue(data, field.source);
      return field.transform(value);
    }
    return null;
  }

  private async testApiConnection(config: any): Promise<void> {
    try {
      const response = await fetch(config.url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('API connection failed');
      }
    } catch (error) {
      throw new Error('Failed to connect to API');
    }
  }

  private async testDatabaseConnection(config: any): Promise<void> {
    throw new Error('Database connection not implemented');
  }

  private async fetchFromApi(config: any): Promise<any> {
    try {
      const response = await fetch(config.url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch data from API');
    }
  }

  private async fetchFromDatabase(config: any): Promise<any> {
    throw new Error('Database fetching not implemented');
  }
}

export default DataIntegration;