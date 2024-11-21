import { DataSourceConfig } from '../types/integration';

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private apiEndpoints: Map<string, DataSourceConfig> = new Map();

  private constructor() {}

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  async fetchData(module: string): Promise<any> {
    const config = this.apiEndpoints.get(module);
    if (!config) {
      throw new Error(`No API endpoint configured for module: ${module}`);
    }

    try {
      const response = await fetch(config.url, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Sheets');
      }

      const data = await response.json();
      return this.transformData(data, config.mapping);
    } catch (error) {
      console.error(`Error fetching data for module ${module}:`, error);
      throw error;
    }
  }

  setConfig(module: string, config: DataSourceConfig): void {
    this.apiEndpoints.set(module, config);
  }

  getConfig(module: string): DataSourceConfig | undefined {
    return this.apiEndpoints.get(module);
  }

  private transformData(data: any[], mapping: Record<string, string>): any {
    if (!Array.isArray(data)) return data;

    return data.reduce((transformed: any, row: any) => {
      Object.entries(mapping).forEach(([key, sourceField]) => {
        if (!transformed[key]) transformed[key] = {};
        transformed[key].current = Number(row[sourceField]) || 0;
      });
      return transformed;
    }, {});
  }
}