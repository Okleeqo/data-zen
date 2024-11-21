import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Download, Filter, TrendingUp, AlertTriangle, FileText, Settings } from 'lucide-react';

// Historical data for the past 12 months
const historicalData = [
  { month: 'Jan 23', revenue: 850000, expenses: 650000 },
  { month: 'Feb 23', revenue: 920000, expenses: 720000 },
  { month: 'Mar 23', revenue: 880000, expenses: 700000 },
  { month: 'Apr 23', revenue: 950000, expenses: 680000 },
  { month: 'May 23', revenue: 980000, expenses: 750000 },
  { month: 'Jun 23', revenue: 1020000, expenses: 780000 },
  { month: 'Jul 23', revenue: 1050000, expenses: 800000 },
  { month: 'Aug 23', revenue: 1100000, expenses: 820000 },
  { month: 'Sep 23', revenue: 1150000, expenses: 850000 },
  { month: 'Oct 23', revenue: 1200000, expenses: 880000 },
  { month: 'Nov 23', revenue: 1250000, expenses: 900000 },
  { month: 'Dec 23', revenue: 1300000, expenses: 950000 },
];

// Function to generate forecast data based on parameters
const generateForecast = (
  historicalData: any[],
  months: number,
  growthRate: number,
  seasonality: number,
  marketCondition: number
) => {
  const lastMonth = historicalData[historicalData.length - 1];
  const forecast = [];

  for (let i = 1; i <= months; i++) {
    const monthNumber = i % 12 || 12;
    const seasonalFactor = 1 + Math.sin((monthNumber / 12) * Math.PI * 2) * (seasonality / 100);
    const marketFactor = 1 + (marketCondition / 100);
    const growthFactor = 1 + (growthRate / 100) * (i / 12);

    const revenue = lastMonth.revenue * growthFactor * seasonalFactor * marketFactor;
    const expenses = lastMonth.expenses * (1 + (growthRate * 0.7) / 100) * (i / 12);

    forecast.push({
      month: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthNumber - 1]} 24`,
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(revenue - expenses),
      forecast: true,
    });
  }

  return [...historicalData.map(d => ({ ...d, profit: d.revenue - d.expenses })), ...forecast];
};

export default function Forecasting() {
  const [forecastParams, setForecastParams] = useState({
    growthRate: 12,
    seasonality: 5,
    marketCondition: 3,
    months: 12,
  });

  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const [selectedMetric, setSelectedMetric] = useState('all');

  const forecastData = generateForecast(
    historicalData,
    forecastParams.months,
    forecastParams.growthRate,
    forecastParams.seasonality,
    forecastParams.marketCondition
  );

  const lastHistoricalMonth = historicalData[historicalData.length - 1];
  const lastForecastMonth = forecastData[forecastData.length - 1];
  const growthPercentage = ((lastForecastMonth.revenue - lastHistoricalMonth.revenue) / lastHistoricalMonth.revenue) * 100;

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Forecasting</h1>
          <p className="text-emerald-600 mt-1">Predict future financial performance</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl">
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-emerald-900">Revenue Forecast</h2>
            <div className="flex gap-4">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Metrics</option>
                <option value="revenue">Revenue Only</option>
                <option value="expenses">Expenses Only</option>
                <option value="profit">Profit Only</option>
              </select>
              <button className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
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
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                />
                <Legend />
                {(selectedMetric === 'all' || selectedMetric === 'revenue') && (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#059669"
                    fill="url(#colorRevenue)"
                    name="Revenue"
                    strokeWidth={2}
                  />
                )}
                {(selectedMetric === 'all' || selectedMetric === 'expenses') && (
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#dc2626"
                    fill="url(#colorExpenses)"
                    name="Expenses"
                    strokeWidth={2}
                  />
                )}
                {(selectedMetric === 'all' || selectedMetric === 'profit') && (
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#00df8f"
                    fill="url(#colorProfit)"
                    name="Profit"
                    strokeWidth={2}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Parameters Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">Forecast Parameters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Growth Rate (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={forecastParams.growthRate}
                  onChange={(e) => setForecastParams({ ...forecastParams, growthRate: Number(e.target.value) })}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>0%</span>
                  <span>{forecastParams.growthRate}%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Seasonality Impact (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={forecastParams.seasonality}
                  onChange={(e) => setForecastParams({ ...forecastParams, seasonality: Number(e.target.value) })}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>0%</span>
                  <span>{forecastParams.seasonality}%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Market Condition Impact (%)
                </label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={forecastParams.marketCondition}
                  onChange={(e) => setForecastParams({ ...forecastParams, marketCondition: Number(e.target.value) })}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>-10%</span>
                  <span>{forecastParams.marketCondition}%</span>
                  <span>10%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Confidence Level (%)
                </label>
                <input
                  type="range"
                  min="70"
                  max="95"
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>70%</span>
                  <span>{confidenceLevel}%</span>
                  <span>95%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">Projected Growth</h3>
              </div>
              <p className="text-3xl font-bold">{growthPercentage.toFixed(1)}%</p>
              <p className="text-emerald-100 text-sm mt-1">Year-over-Year</p>
            </div>

            <div className="bg-gradient-to-br from-mint-400 to-mint-600 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">Forecast Accuracy</h3>
              </div>
              <p className="text-3xl font-bold">{confidenceLevel}%</p>
              <p className="text-mint-100 text-sm mt-1">Confidence Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Details */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-emerald-900">Forecast Details</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
              <Calendar className="w-4 h-4" />
              View Calendar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-100">
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Month</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Revenue</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Expenses</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Profit</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.slice(-6).map((month, index) => {
                const prevMonth = forecastData[forecastData.length - 7 + index];
                const growth = ((month.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
                
                return (
                  <tr
                    key={month.month}
                    className={`border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors ${
                      month.forecast ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-emerald-900">
                      <div className="flex items-center gap-2">
                        {month.forecast && (
                          <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                            Forecast
                          </span>
                        )}
                        {month.month}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-900">
                      ${(month.revenue / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-900">
                      ${(month.expenses / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-900">
                      ${(month.profit / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        growth >= 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}