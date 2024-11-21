import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Calendar, Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { 
  calculateCashFlowMetrics,
  calculateExpenseProjections,
  calculateCashFlowRatios,
  analyzeCashFlowTrend,
  type CashFlowMetrics
} from '../../utils/cashFlowCalculations';

// Sample data - In a real app, this would come from an API
const historicalData = {
  inflows: [85000, 92000, 88000, 95000, 98000, 102000],
  outflows: [65000, 72000, 70000, 68000, 75000, 78000],
  cashReserves: 250000,
  monthlyBurnRate: 15000,
  operatingExpenses: 45000
};

const upcomingExpenses = [
  { id: 1, description: 'Software Licenses', amount: 12500, date: '2024-01-15', category: 'Technology' },
  { id: 2, description: 'Office Rent', amount: 8500, date: '2024-01-01', category: 'Facilities' },
  { id: 3, description: 'Marketing Campaign', amount: 15000, date: '2024-01-20', category: 'Marketing' },
  { id: 4, description: 'Payroll', amount: 45000, date: '2024-01-25', category: 'HR' },
];

export default function CashFlow() {
  const [metrics, setMetrics] = useState<CashFlowMetrics | null>(null);
  const [cashFlowRatios, setCashFlowRatios] = useState<any>(null);
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable');

  useEffect(() => {
    // Calculate all cash flow metrics
    const calculatedMetrics = calculateCashFlowMetrics(historicalData);
    const ratios = calculateCashFlowRatios({
      inflows: historicalData.inflows,
      outflows: historicalData.outflows,
      operatingExpenses: historicalData.operatingExpenses
    });
    const trendAnalysis = analyzeCashFlowTrend(calculatedMetrics.netCashFlow.trend);

    setMetrics(calculatedMetrics);
    setCashFlowRatios(ratios);
    setTrend(trendAnalysis);
  }, []);

  if (!metrics || !cashFlowRatios) {
    return <div>Loading...</div>;
  }

  // Transform data for the chart
  const chartData = metrics.inflow.trend.map((inflow, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index],
    inflow,
    outflow: metrics.outflow.trend[index],
    balance: metrics.netCashFlow.trend[index]
  }));

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Cash Flow Control</h1>
          <p className="text-emerald-600 mt-1">Monitor your financial pulse</p>
        </div>
        <div className="flex gap-3">
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Total Inflow</p>
              <h3 className="text-2xl font-bold text-emerald-900 mt-1">
                ${metrics.inflow.current.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-mint-600 text-sm font-medium">
              {metrics.inflow.growth > 0 ? '+' : ''}{metrics.inflow.growth.toFixed(1)}%
            </span>
            <span className="text-emerald-600 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Total Outflow</p>
              <h3 className="text-2xl font-bold text-emerald-900 mt-1">
                ${metrics.outflow.current.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-rose-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rose-600 text-sm font-medium">
              {metrics.outflow.growth > 0 ? '+' : ''}{metrics.outflow.growth.toFixed(1)}%
            </span>
            <span className="text-emerald-600 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Net Cash Flow</p>
              <h3 className="text-2xl font-bold text-emerald-900 mt-1">
                ${metrics.netCashFlow.current.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-mint-400/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-mint-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-mint-600 text-sm font-medium">
              {metrics.netCashFlow.growth > 0 ? '+' : ''}{metrics.netCashFlow.growth.toFixed(1)}%
            </span>
            <span className="text-emerald-600 text-sm">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-6 text-emerald-900">Cash Flow Analysis</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
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
                <Bar dataKey="inflow" fill="#059669" radius={[4, 4, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="#dc2626" radius={[4, 4, 0, 0]} name="Outflow" />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#00df8f"
                  strokeWidth={2}
                  dot={{ fill: '#00df8f' }}
                  name="Net Balance"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Expenses */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-emerald-900">Upcoming Expenses</h2>
          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            <Calendar className="w-4 h-4" />
            View Calendar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-100">
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Due Date</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {upcomingExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                  <td className="py-4 px-4 text-emerald-900">{expense.description}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-emerald-600">{expense.date}</td>
                  <td className="py-4 px-4 text-right font-medium text-emerald-900">
                    ${expense.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Cash Flow Coverage</h3>
          <p className="text-3xl font-bold text-emerald-900">
            {cashFlowRatios.cashFlowCoverageRatio.toFixed(2)}x
          </p>
          <p className="text-sm text-emerald-600 mt-2">
            Ratio of inflows to outflows
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Cash Runway</h3>
          <p className="text-3xl font-bold text-emerald-900">
            {metrics.runway.toFixed(1)} months
          </p>
          <p className="text-sm text-emerald-600 mt-2">
            At current burn rate
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Working Capital</h3>
          <p className="text-3xl font-bold text-emerald-900">
            ${metrics.workingCapital.toLocaleString()}
          </p>
          <p className="text-sm text-emerald-600 mt-2">
            Available operating capital
          </p>
        </div>
      </div>
    </div>
  );
}