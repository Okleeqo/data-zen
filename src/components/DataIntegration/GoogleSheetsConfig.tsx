import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useGoogleSheets } from '../../hooks/useGoogleSheets';
import type { DataSourceConfig } from '../../types/integration';

const DEFAULT_MAPPINGS: Record<string, Record<string, string>> = {
  kpis: {
    cac: 'Customer Acquisition Cost',
    ltv: 'Customer Lifetime Value',
    roas: 'Return on Ad Spend',
    mrr: 'Monthly Recurring Revenue',
    churn: 'Churn Rate',
    conversion: 'Conversion Rate'
  }
};

interface GoogleSheetsConfigProps {
  module: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GoogleSheetsConfig({ module, onClose, onSuccess }: GoogleSheetsConfigProps) {
  const [config, setConfig] = useState<Partial<DataSourceConfig>>({
    mapping: DEFAULT_MAPPINGS[module] || {}
  });
  const { setConfig: saveConfig, error } = useGoogleSheets(module);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.url) return;

    saveConfig(config as DataSourceConfig);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-emerald-900">Configure Google Sheets Integration</h2>
          <button
            onClick={onClose}
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Google Sheets URL
            </label>
            <input
              type="url"
              value={config.url || ''}
              onChange={(e) => setConfig({ ...config, url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your published Google Sheet URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              API Key (Optional)
            </label>
            <input
              type="password"
              value={config.apiKey || ''}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter API key if required"
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}