import { DollarSign, TrendingUp, Users, Activity, ArrowUpRight, ArrowDownRight, BarChart3, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MetricCard from './MetricCard';

const revenueData = [
  { month: 'Jan', revenue: 65000, profit: 23000 },
  { month: 'Feb', revenue: 72000, profit: 25000 },
  { month: 'Mar', revenue: 68000, profit: 22000 },
  { month: 'Apr', revenue: 78000, profit: 27000 },
  { month: 'May', revenue: 82000, profit: 29000 },
  { month: 'Jun', revenue: 91000, profit: 32000 },
];

const customerData = [
  { month: 'Jan', active: 1200, new: 240 },
  { month: 'Feb', active: 1350, new: 280 },
  { month: 'Mar', active: 1480, new: 320 },
  { month: 'Apr', active: 1620, new: 290 },
  { month: 'May', active: 1790, new: 350 },
  { month: 'Jun', active: 1950, new: 380 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Dashboard</h1>
          <p className="text-emerald-600 mt-1">Welcome back, Alex</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
            Last 30 Days
          </button>
          <button className="px-4 py-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl">
            Download Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$91,000"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
          accentColor="emerald"
        />
        <MetricCard
          title="Net Profit"
          value="$32,000"
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
          accentColor="mint"
        />
        <MetricCard
          title="Active Users"
          value="1,950"
          change="+15.3%"
          icon={Users}
          trend="up"
          accentColor="azure"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="-2.1%"
          icon={Activity}
          trend="down"
          accentColor="emerald"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold text-emerald-900">Revenue Overview</h2>
              <p className="text-sm text-emerald-600">Monthly revenue and profit</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-emerald-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mint-500" />
                <span className="text-sm text-emerald-600">Profit</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00df8f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00df8f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#059669"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#00df8f"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Acquisition Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold text-emerald-900">Customer Growth</h2>
              <p className="text-sm text-emerald-600">Active and new customers</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-azure-400" />
                <span className="text-sm text-emerald-600">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mint-500" />
                <span className="text-sm text-emerald-600">New</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData}>
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
                <Bar dataKey="active" fill="#0891b2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#00df8f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Financial Report</h3>
              <p className="text-emerald-200 text-sm">June 2024</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            View Report
          </button>
        </div>

        <div className="bg-gradient-to-br from-mint-400 to-mint-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Team Meeting</h3>
              <p className="text-mint-100 text-sm">Today at 2:00 PM</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            Join Meeting
          </button>
        </div>

        <div className="bg-gradient-to-br from-azure-400 to-azure-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-blue-100 text-sm">View Insights</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            Open Analytics
          </button>
        </div>
      </div>
    </div>
  );
}