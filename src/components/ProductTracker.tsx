import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, DollarSign, Activity, Download, Filter, RefreshCcw, AlertCircle, BarChart3, Clock } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Enterprise Suite',
    category: 'Software',
    sales: 850000,
    costs: 320000,
    volume: 120,
    lifecycle: 'Growth',
    trend: 15.5,
    margin: 62.35,
    roi: 165.63
  },
  {
    id: 2,
    name: 'Analytics Pro',
    category: 'Software',
    sales: 620000,
    costs: 180000,
    volume: 450,
    lifecycle: 'Maturity',
    trend: 8.2,
    margin: 70.97,
    roi: 244.44
  },
  {
    id: 3,
    name: 'Data Insights',
    category: 'Service',
    sales: 450000,
    costs: 220000,
    volume: 85,
    lifecycle: 'Introduction',
    trend: 25.8,
    margin: 51.11,
    roi: 104.55
  },
  {
    id: 4,
    name: 'Cloud Storage',
    category: 'Infrastructure',
    sales: 380000,
    costs: 150000,
    volume: 950,
    lifecycle: 'Growth',
    trend: 18.4,
    margin: 60.53,
    roi: 153.33
  }
];

// Monthly performance data
const monthlyData = [
  { month: 'Jan', revenue: 180000, costs: 75000, roi: 140 },
  { month: 'Feb', revenue: 195000, costs: 78000, roi: 150 },
  { month: 'Mar', revenue: 215000, costs: 82000, roi: 162 },
  { month: 'Apr', revenue: 225000, costs: 85000, roi: 165 },
  { month: 'May', revenue: 240000, costs: 88000, roi: 173 },
  { month: 'Jun', revenue: 260000, costs: 92000, roi: 183 }
];

// Lifecycle stages and their characteristics
const lifecycleStages = {
  Introduction: { color: '#00df8f', description: 'New product, growing awareness' },
  Growth: { color: '#059669', description: 'Rapid market acceptance' },
  Maturity: { color: '#0891b2', description: 'Stable market position' },
  Decline: { color: '#dc2626', description: 'Decreasing market share' }
};

const COLORS = ['#059669', '#00df8f', '#0891b2', '#6ee7b7'];

export default function ProductTracker() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdate] = useState(new Date().toLocaleString());

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-emerald-600 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-emerald-900 mt-1">{value}</h3>
          {subtitle && <p className="text-sm text-emerald-500 mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${trend >= 0 ? 'text-mint-500' : 'text-rose-500'}`}>
          {trend >= 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-emerald-600 ml-1">vs last month</span>
      </div>
    </div>
  );

  const LifecycleIndicator = ({ stage }: { stage: keyof typeof lifecycleStages }) => (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: lifecycleStages[stage].color }}
      />
      <span className="text-sm font-medium text-emerald-900">{stage}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Product & Service Tracker</h1>
          <p className="text-emerald-600 mt-1">Monitor performance and lifecycle stages</p>
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
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <option value="all">All Categories</option>
            <option value="software">Software</option>
            <option value="service">Services</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Products"
          value={products.length}
          change={12.5}
          icon={Package}
          trend={12.5}
          subtitle="Active products"
        />
        <MetricCard
          title="Average ROI"
          value="167%"
          change={8.2}
          icon={TrendingUp}
          trend={8.2}
          subtitle="Across all products"
        />
        <MetricCard
          title="Total Revenue"
          value="$2.3M"
          change={15.8}
          icon={DollarSign}
          trend={15.8}
          subtitle="This month"
        />
        <MetricCard
          title="Profit Margin"
          value="61.2%"
          change={5.2}
          icon={Activity}
          trend={5.2}
          subtitle="Portfolio average"
        />
      </div>

      {/* Product Performance Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-emerald-100">
          <h2 className="text-lg font-semibold text-emerald-900">Product Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Product</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Category</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Sales</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Costs</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Margin</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">ROI</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Lifecycle</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Package className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium text-emerald-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-600">{product.category}</td>
                  <td className="py-4 px-4 text-right font-medium text-emerald-900">
                    ${(product.sales / 1000).toFixed(1)}K
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-emerald-900">
                    ${(product.costs / 1000).toFixed(1)}K
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-emerald-900">{product.margin.toFixed(1)}%</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-emerald-900">{product.roi.toFixed(1)}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <LifecycleIndicator stage={product.lifecycle as keyof typeof lifecycleStages} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.trend >= 0
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {product.trend >= 0 ? '+' : ''}{product.trend}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Trends */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">ROI Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
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

        {/* Revenue vs Costs */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Revenue vs Costs</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
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
                <Bar dataKey="revenue" name="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" name="Costs" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lifecycle Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Lifecycle Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(lifecycleStages).map(([stage, { color }]) => ({
                    name: stage,
                    value: products.filter(p => p.lifecycle === stage).length
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.values(lifecycleStages).map((stage, index) => (
                    <Cell key={`cell-${index}`} fill={stage.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lifecycle Stages Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Lifecycle Stage Characteristics</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(lifecycleStages).map(([stage, { color, description }]) => (
              <div key={stage} className="p-4 rounded-lg bg-emerald-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color }}>
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-emerald-900">{stage}</h3>
                </div>
                <p className="text-sm text-emerald-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}