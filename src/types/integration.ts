export interface DataSourceConfig {
  url: string;
  apiKey?: string;
  mapping: Record<string, string>;
  sheetId?: string;
  range?: string;
}

export interface KPIData {
  current: number;
  target: number;
  trend: number;
}

export interface KPIMetrics {
  cac: KPIData;
  ltv: KPIData;
  roas: KPIData;
  mrr: KPIData;
  churn: KPIData;
  conversion: KPIData;
}