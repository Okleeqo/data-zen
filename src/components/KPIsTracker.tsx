import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, ShoppingCart, UserPlus, Repeat, AlertCircle, Filter, RefreshCcw } from 'lucide-react';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import DataSourceButton from './DataIntegration/DataSourceButton';
import GoogleSheetsConfig from './DataIntegration/GoogleSheetsConfig';
import KPICard from './KPIs/KPICard';

export default function KPIsTracker() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const { fetchData, isLoading, error } = useGoogleSheets('kpis');
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchData();
    if (data) {
      setMetrics(data);
      setLastUpdate(new Date().toLocaleString());
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-emerald-600">Loading KPIs...</div>
      </div>
    );
  }

  const kpis = metrics ? [
    {
      title: 'Customer Acquisition Cost',
      value: metrics.cac?.current || 0,
      target: metrics.cac?.target || 0,
      trend: metrics.cac?.trend || 0,
      icon: UserPlus,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Customer Lifetime Value',
      value: metrics.ltv?.current || 0,
      target: metrics.ltv?.target || 0,
      trend: metrics.ltv?.trend || 0,
      icon: Users,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Return on Ad Spend',
      value: metrics.roas?.current || 0,
      target: metrics.roas?.target || 0,
      trend: metrics.roas?.trend || 0,
      icon: Target,
      color: 'mint',
      suffix: 'x'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: metrics.mrr?.current ? `${(metrics.mrr.current / 1000).toFixed(1)}K` : '0',
      target: metrics.mrr?.target ? `${(metrics.mrr.target / 1000).toFixed(1)}K` : '0',
      trend: metrics.mrr?.trend || 0,
      icon: DollarSign,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Churn Rate',
      value: metrics.churn?.current?.toFixed(1) || '0',
      target: metrics.churn?.target || 0,
      trend: -metrics.churn?.trend || 0,
      icon: Repeat,
      color: 'mint',
      suffix: '%'
    },
    {
      title: 'Conversion Rate',
      value: metrics.conversion?.current?.toFixed(1) || '0',
      target: metrics.conversion?.target || 0,
      trend: metrics.conversion?.trend || 0,
      icon: ShoppingCart,
      color: 'azure',
      suffix: '%'
    }
  ] : [];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">KPIs Tracker</h1>
          <p className="text-emerald-600 mt-1">Monitor business performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <RefreshCcw className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-600">Last Updated</p>
            <p className="text-emerald-900 font-medium">{lastUpdate || 'Never'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={loadData}
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Refresh Data
          </button>
          <DataSourceButton
            onClick={() => setIsConfiguring(true)}
            label="Configure Data Source"
          />
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Google Sheets Configuration Modal */}
      {isConfiguring && (
        <GoogleSheetsConfig
          module="kpis"
          onClose={() => setIsConfiguring(false)}
          onSuccess={() => {
            setIsConfiguring(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}