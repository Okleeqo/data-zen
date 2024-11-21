import { useState } from 'react';
import { X, Save, Database, Globe, FileText } from 'lucide-react';
import { useDataIntegration } from '../../hooks/useDataIntegration';
import type { DataSourceType, IntegrationConfig } from '../../types/integration';

interface IntegrationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function IntegrationModal({ onClose, onSuccess }: IntegrationModalProps) {
  const { connectSource, isConnecting, error } = useDataIntegration();
  const [sourceType, setSourceType] = useState<DataSourceType>('api');
  const [config, setConfig] = useState<Partial<IntegrationConfig>>({
    type: 'api',
    connectionConfig: {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config.id || !config.name) {
      return;
    }

    const success = await connectSource(config as IntegrationConfig);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  const updateConfig = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateConnectionConfig = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      connectionConfig: {
        ...prev.connectionConfig,
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-emerald-900">Connect Data Source</h2>
          <button
            onClick={onClose}
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source Type Selection */}
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSourceType('api')}
              className={`p-4 rounded-lg border ${
                sourceType === 'api'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-emerald-200 hover:bg-emerald-50'
              } transition-colors`}
            >
              <Globe className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-emerald-900">API</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('database')}
              className={`p-4 rounded-lg border ${
                sourceType === 'database'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-emerald-200 hover:bg-emerald-50'
              } transition-colors`}
            >
              <Database className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-emerald-900">Database</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('file')}
              className={`p-4 rounded-lg border ${
                sourceType === 'file'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-emerald-200 hover:bg-emerald-50'
              } transition-colors`}
            >
              <FileText className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-sm font-medium text-emerald-900">File</span>
            </button>
          </div>

          {/* Configuration Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Source Name
              </label>
              <input
                type="text"
                value={config.name || ''}
                onChange={(e) => updateConfig('name', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter source name"
              />
            </div>

            {sourceType === 'api' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    API URL
                  </label>
                  <input
                    type="url"
                    value={config.connectionConfig?.url || ''}
                    onChange={(e) => updateConnectionConfig('url', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter API URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={config.connectionConfig?.apiKey || ''}
                    onChange={(e) => updateConnectionConfig('apiKey', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter API key"
                  />
                </div>
              </>
            )}

            {sourceType === 'database' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Connection String
                  </label>
                  <input
                    type="text"
                    value={config.connectionConfig?.connectionString || ''}
                    onChange={(e) => updateConnectionConfig('connectionString', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter connection string"
                  />
                </div>
              </>
            )}

            {sourceType === 'file' && (
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  File Upload
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateConnectionConfig('file', file);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  accept=".csv,.xlsx,.json"
                />
              </div>
            )}
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
              disabled={isConnecting}
              className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isConnecting ? 'Connecting...' : 'Connect Source'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}