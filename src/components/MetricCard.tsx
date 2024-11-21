import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  accentColor: 'emerald' | 'mint' | 'azure';
}

const MetricCard = ({ title, value, change, icon: Icon, trend, accentColor }: MetricCardProps) => {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-100',
      icon: 'text-emerald-600',
      trend: trend === 'up' ? 'text-mint-600' : 'text-rose-500'
    },
    mint: {
      bg: 'bg-mint-400/10',
      icon: 'text-mint-600',
      trend: trend === 'up' ? 'text-mint-600' : 'text-rose-500'
    },
    azure: {
      bg: 'bg-azure-400/10',
      icon: 'text-azure-500',
      trend: trend === 'up' ? 'text-mint-600' : 'text-rose-500'
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/80 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-emerald-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-emerald-900">{value}</h3>
        </div>
        <div className={clsx(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          colorClasses[accentColor].bg
        )}>
          <Icon className={clsx('w-6 h-6', colorClasses[accentColor].icon)} />
        </div>
      </div>
      <div className="mt-4">
        <span className={clsx(
          'text-sm font-medium',
          colorClasses[accentColor].trend
        )}>
          {change}
        </span>
        <span className="text-sm text-emerald-400 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default MetricCard;