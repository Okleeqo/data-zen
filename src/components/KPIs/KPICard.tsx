import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  target: string | number;
  trend: number;
  icon: LucideIcon;
  color: string;
  prefix?: string;
  suffix?: string;
}

const KPICard = ({ title, value, target, trend, icon: Icon, color, prefix = '', suffix = '' }: KPICardProps) => {
  const isPositive = trend > 0;
  const trendColor = isPositive ? 'text-mint-500' : 'text-rose-500';
  const bgGradient = `bg-gradient-to-br from-${color}-50 to-${color}-100`;
  const iconBg = `bg-${color}-100`;
  const iconColor = `text-${color}-600`;

  return (
    <div className={`p-6 rounded-xl shadow-lg ${bgGradient}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-emerald-600">{title}</p>
          <h3 className="text-2xl font-bold text-emerald-900 mt-1">
            {prefix}{value}{suffix}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${trendColor}`}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          {isPositive ? 
            <TrendingUp className="w-4 h-4 text-mint-500" /> : 
            <TrendingDown className="w-4 h-4 text-rose-500" />
          }
        </div>
        <div className="text-sm text-emerald-600">
          Target: {prefix}{target}{suffix}
        </div>
      </div>
    </div>
  );
};

export default KPICard;