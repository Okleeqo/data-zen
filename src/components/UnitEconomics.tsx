import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Package, ShoppingCart, Filter, Download, RefreshCcw, ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';

// Sample data following income statement structure
const productData = [
  { 
    name: 'Product A',
    revenue: 150,
    cogs: 60,
    grossProfit: 90,
    operatingExpenses: 30,
    operatingIncome: 60,
    otherExpenses: 10,
    netIncome: 50,
    volume: 1200
  },
  { 
    name: 'Product B',
    revenue: 200,
    cogs: 85,
    grossProfit: 115,
    operatingExpenses: 45,
    operatingIncome: 70,
    otherExpenses: 15,
    netIncome: 55,
    volume: 800
  },
  { 
    name: 'Product C',
    revenue: 120,
    cogs: 45,
    grossProfit: 75,
    operatingExpenses: 25,
    operatingIncome: 50,
    otherExpenses: 8,
    netIncome: 42,
    volume: 1500
  }
];

const monthlyTrends = [
  { month: 'Jan', revenue: 150, cogs: 60, grossProfit: 90, operatingExpenses: 30, netIncome: 50 },
  { month: 'Feb', revenue: 155, cogs: 62, grossProfit: 93, operatingExpenses: 31, netIncome: 52 },
  { month: 'Mar', revenue: 160, cogs: 63, grossProfit: 97, operatingExpenses: 32, netIncome: 55 },
  { month: 'Apr', revenue: 158, cogs: 61, grossProfit: 97, operatingExpenses: 31, netIncome: 56 },
  { month: 'May', revenue: 165, cogs: 64, grossProfit: 101, operatingExpenses: 33, netIncome: 58 },
  { month: 'Jun', revenue: 170, cogs: 65, grossProfit: 105, operatingExpenses: 34, netIncome: 61 }
];

const costBreakdown = {
  cogs: [
    { category: 'Raw Materials', amount: 25, percentage: 38.5 },
    { category: 'Direct Labor', amount: 15, percentage: 23.1 },
    { category: 'Manufacturing Overhead', amount: 12, percentage: 18.5 }
  ],
  operatingExpenses: [
    { category: 'Sales & Marketing', amount: 8, percentage: 12.3 },
    { category: 'Admin & General', amount: 5, percentage: 7.6 },
    { category: 'R&D', amount: 4, percentage: 6.2 }
  ]
};

const UnitEconomics = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [lastUpdate] = useState(new Date().toLocaleString());

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle, percentage }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-emerald-600 font-medium">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-emerald-900 mt-1">{value}</h3>
            {percentage && (
              <span className="text-sm font-medium text-emerald-600">({percentage}%)</span>
            )}
          </div>
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
          <h1 className="text-3xl font-bold text-emerald-900">Unit Economics</h1>
          <p className="text-emerald-600 mt-1">Per-unit income statement analysis</p>
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

      {/* Product Selector */}
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
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <option value="all">All Products</option>
            <option value="product-a">Product A</option>
            <option value="product-b">Product B</option>
            <option value="product-c">Product C</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Grid - Following Income Statement Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Per Unit"
          value="$170"
          change={8.5}
          icon={DollarSign}
          trend={8.5}
          percentage="100"
        />
        <MetricCard
          title="Gross Profit Per Unit"
          value="$105"
          change={12.4}
          icon={TrendingUp}
          trend={12.4}
          percentage="61.8"
        />
        <MetricCard
          title="Operating Income Per Unit"
          value="$75"
          change={9.2}
          icon={Percent}
          trend={9.2}
          percentage="44.1"
        />
        <MetricCard
          title="Net Income Per Unit"
          value="$61"
          change={7.8}
          icon={ShoppingCart}
          trend={7.8}
          percentage="35.9"
        />
      </div>

      {/* Income Statement Waterfall Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-emerald-900 mb-6">Unit Economics Waterfall</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
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
              <Bar dataKey="revenue" name="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cogs" name="COGS" fill="#dc2626" radius={[4, 4, 0, 0]} />
              <Bar dataKey="grossProfit" name="Gross Profit" fill="#00df8f" radius={[4, 4, 0, 0]} />
              <Bar dataKey="operatingIncome" name="Operating Income" fill="#0891b2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netIncome" name="Net Income" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COGS Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Cost of Goods Sold Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-100">
                  <th className="text-left py-3 px-4 text-emerald-600 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-emerald-600 font-medium">Amount</th>
                  <th className="text-right py-3 px-4 text-emerald-600 font-medium">% of COGS</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.cogs.map((item) => (
                  <tr key={item.category} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <td className="py-4 px-4 text-emerald-900">{item.category}</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-900">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right text-emerald-600">
                      {item.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operating Expenses Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-6">Operating Expenses Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-100">
                  <th className="text-left py-3 px-4 text-emerald-600 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-emerald-600 font-medium">Amount</th>
                  <th className="text-right py-3 px-4 text-emerald-600 font-medium">% of OpEx</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.operatingExpenses.map((item) => (
                  <tr key={item.category} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <td className="py-4 px-4 text-emerald-900">{item.category}</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-900">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right text-emerald-600">
                      {item.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trends Over Time */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-emerald-900 mb-6">Profitability Trends</h2>
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
                dataKey="revenue"
                name="Revenue"
                stroke="#059669"
                strokeWidth={2}
                dot={{ fill: '#059669' }}
              />
              <Line
                type="monotone"
                dataKey="grossProfit"
                name="Gross Profit"
                stroke="#00df8f"
                strokeWidth={2}
                dot={{ fill: '#00df8f' }}
              />
              <Line
                type="monotone"
                dataKey="netIncome"
                name="Net Income"
                stroke="#0891b2"
                strokeWidth={2}
                dot={{ fill: '#0891b2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl text-white">
          <h3 className="text-lg font-semibold mb-4">Revenue Optimization</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Implement value-based pricing strategy</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Develop premium product variants</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Explore cross-selling opportunities</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-mint-400 to-mint-600 p-6 rounded-xl text-white">
          <h3 className="text-lg font-semibold mb-4">COGS Reduction</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Optimize raw material sourcing</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Improve production efficiency</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Reduce manufacturing overhead</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-azure-400 to-azure-600 p-6 rounded-xl text-white">
          <h3 className="text-lg font-semibold mb-4">Operating Expense Management</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Streamline administrative processes</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Optimize marketing spend</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Automate routine operations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnitEconomics;