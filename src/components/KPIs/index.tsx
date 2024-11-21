import { useState, useEffect } from 'react';
import { UserPlus, Users, Target, DollarSign, Repeat, ShoppingCart } from 'lucide-react';
import KPICard from './KPICard';
import { calculateKPIMetrics, type KPIMetrics } from '../../utils/kpiCalculations';

// Sample data - In a real app, this would come from an API
const sampleData = {
  marketingSpend: 50000,
  newCustomers: 500,
  revenue: 145000,
  customerLifetime: 24,
  churnedCustomers: 75,
  totalCustomers: 5000,
  conversions: 190,
  visitors: 5000,
  historicalData: [
    // Previous months' data
    { cac: 110, ltv: 950, roas: 3.6, mrr: 135000, churn: 1.8, conversion: 3.6 },
    { cac: 105, ltv: 980, roas: 3.8, mrr: 140000, churn: 1.7, conversion: 3.7 },
    { cac: 100, ltv: 1020, roas: 4.0, mrr: 145000, churn: 1.5, conversion: 3.8 }
  ]
};

export default function KPIsTracker() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);

  useEffect(() => {
    const calculatedMetrics = calculateKPIMetrics(sampleData);
    setMetrics(calculatedMetrics);
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  const kpis = [
    {
      title: 'Customer Acquisition Cost',
      value: metrics.cac.current,
      target: metrics.cac.target,
      trend: metrics.cac.trend,
      icon: UserPlus,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Customer Lifetime Value',
      value: metrics.ltv.current,
      target: metrics.ltv.target,
      trend: metrics.ltv.trend,
      icon: Users,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Return on Ad Spend',
      value: metrics.roas.current,
      target: metrics.roas.target,
      trend: metrics.roas.trend,
      icon: Target,
      color: 'mint',
      suffix: 'x'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: (metrics.mrr.current / 1000).toFixed(1) + 'K',
      target: (metrics.mrr.target / 1000).toFixed(1) + 'K',
      trend: metrics.mrr.trend,
      icon: DollarSign,
      color: 'emerald',
      prefix: '$'
    },
    {
      title: 'Churn Rate',
      value: metrics.churn.current.toFixed(1),
      target: metrics.churn.target,
      trend: -metrics.churn.trend, // Negative because lower is better
      icon: Repeat,
      color: 'mint',
      suffix: '%'
    },
    {
      title: 'Conversion Rate',
      value: metrics.conversion.current.toFixed(1),
      target: metrics.conversion.target,
      trend: metrics.conversion.trend,
      icon: ShoppingCart,
      color: 'azure',
      suffix: '%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}