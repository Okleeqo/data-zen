import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, Megaphone, Download, Filter, RefreshCcw, Zap, AlertCircle, ArrowRight } from 'lucide-react';

const channelData = [
  { name: 'Paid Search', spend: 45000, revenue: 180000, conversions: 1200, cpa: 37.5 },
  { name: 'Social Media', spend: 35000, revenue: 140000, conversions: 950, cpa: 36.8 },
  { name: 'Email', spend: 15000, revenue: 75000, conversions: 600, cpa: 25.0 },
  { name: 'Display', spend: 25000, revenue: 87500, conversions: 450, cpa: 55.6 },
  { name: 'Content', spend: 20000, revenue: 95000, conversions: 800, cpa: 25.0 },
];

const monthlyTrends = [
  { month: 'Jan', spend: 125000, revenue: 437500, roi: 250 },
  { month: 'Feb', spend: 135000, revenue: 472500, roi: 250 },
  { month: 'Mar', spend: 140000, revenue: 518000, roi: 270 },
  { month: 'Apr', spend: 132000, revenue: 475200, roi: 260 },
  { month: 'May', spend: 145000, revenue: 551000, roi: 280 },
  { month: 'Jun', spend: 140000, revenue: 577500, roi: 312 },
];

const COLORS = ['#059669', '#00df8f', '#0891b2', '#6ee7b7', '#34d399'];

const MarketingInsights = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [lastUpdate] = useState(new Date().toLocaleString());

  const totalSpend = channelData.reduce((sum, channel) => sum + channel.spend, 0);
  const totalRevenue = channelData.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalConversions = channelData.reduce((sum, channel) => sum + channel.conversions, 0);
  const averageROI = ((totalRevenue - totalSpend) / totalSpend) * 100;

  const MetricCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-emerald-600 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-emerald-900 mt-1">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${trend >= 0 ? 'text-mint-500' : 'text-rose-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        {trend >= 0 ? 
          <TrendingUp className="w-4 h-4 text-mint-500" /> : 
          <TrendingDown className="w-4 h-4 text-rose-500" />
        }
        <span className="text-sm text-emerald-600 ml-1">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Marketing Insights</h1>
          <p className="text-emerald-600 mt-1">Track and optimize marketing performance</p>
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
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl">
            <Download className="w-4 h-4" />
            Export Report
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
            <p className="text-emerald-900 font-medium">{lastUpdate}</p>
          </div>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
          Refresh Data
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Marketing Spend"
          value={`$${(totalSpend / 1000).toFixed(1)}K`}
          change={8.5}
          icon={DollarSign}
          trend={8.5}
        />
        <MetricCard
          title="Marketing Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}K`}
          change={12.3}
          icon={Target}
          trend={12.3}
        />
        <MetricCard
          title="Total Conversions"
          value={totalConversions.toLocaleString()}
          change={15.8}
          icon={Users}
          trend={15.8}
        />
        <MetricCard
          title="Marketing ROI"
          value={`${averageROI.toFixed(1)}%`}
          change={5.2}
          icon={TrendingUp}
          trend={5.2}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Channel Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="name" stroke="#064e3b" />
                <YAxis stroke="#064e3b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="spend" name="Spend" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill="#00df8f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Budget Allocation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="spend"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROI Trends */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-emerald-900 mb-6">ROI Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="month" stroke="#064e3b" />
              <YAxis stroke="#064e3b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="roi"
                name="ROI %"
                stroke="#059669"
                strokeWidth={2}
                dot={{ fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-emerald-900">Key Insights</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-emerald-900 font-medium">Email Marketing Performance</p>
                  <p className="text-emerald-600 text-sm">Highest ROI among all channels at 400%</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-mint-400/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-mint-400/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-mint-600" />
                </div>
                <div>
                  <p className="text-emerald-900 font-medium">Social Media Growth</p>
                  <p className="text-emerald-600 text-sm">15.8% increase in conversion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-emerald-900">Recommendations</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
              <ArrowRight className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-emerald-900">Increase email marketing budget by 20% based on superior ROI</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
              <ArrowRight className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-emerald-900">Optimize display ad campaigns to reduce CPA by 15%</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
              <ArrowRight className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-emerald-900">Scale up content marketing efforts based on growing conversion rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingInsights;