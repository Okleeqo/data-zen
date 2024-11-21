import { useState } from 'react';
import { Save, Copy, Trash2, PlusCircle, ArrowRight, Download, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Scenario {
  id: string;
  name: string;
  salesGrowth: number;
  expenseGrowth: number;
  marketExpansion: number;
  headcount: number;
  baseRevenue: number;
  baseExpenses: number;
}

const defaultScenario: Scenario = {
  id: 'default',
  name: 'Base Scenario',
  salesGrowth: 10,
  expenseGrowth: 5,
  marketExpansion: 15,
  headcount: 50,
  baseRevenue: 1000000,
  baseExpenses: 750000,
};

const generateProjections = (scenario: Scenario) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const growthFactor = 1 + (scenario.salesGrowth / 100) * (index / 12);
    const expenseFactor = 1 + (scenario.expenseGrowth / 100) * (index / 12);
    const expansionFactor = 1 + (scenario.marketExpansion / 100) * (index / 12);
    
    const revenue = scenario.baseRevenue * growthFactor * expansionFactor;
    const expenses = scenario.baseExpenses * expenseFactor + (scenario.headcount * 5000);
    const profit = revenue - expenses;
    
    return {
      month,
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(profit),
    };
  });
};

export default function ScenarioPlanning() {
  const [scenarios, setScenarios] = useState<Scenario[]>([defaultScenario]);
  const [activeScenario, setActiveScenario] = useState<Scenario>(defaultScenario);
  const [projections, setProjections] = useState(generateProjections(defaultScenario));

  const handleInputChange = (field: keyof Scenario, value: number) => {
    const updated = { ...activeScenario, [field]: value };
    setActiveScenario(updated);
    setProjections(generateProjections(updated));
  };

  const saveScenario = () => {
    const newId = Date.now().toString();
    const newScenario = { ...activeScenario, id: newId };
    setScenarios([...scenarios, newScenario]);
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const duplicateScenario = (scenario: Scenario) => {
    const newScenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copy)`,
    };
    setScenarios([...scenarios, newScenario]);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Scenario Planning</h1>
          <p className="text-emerald-600 mt-1">Model and compare different business scenarios</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveScenario}
            className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Scenario
          </button>
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl">
            <Download className="w-4 h-4" />
            Export Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">Scenario Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Sales Growth Rate (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={activeScenario.salesGrowth}
                  onChange={(e) => handleInputChange('salesGrowth', Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>0%</span>
                  <span>{activeScenario.salesGrowth}%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Expense Growth Rate (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={activeScenario.expenseGrowth}
                  onChange={(e) => handleInputChange('expenseGrowth', Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>0%</span>
                  <span>{activeScenario.expenseGrowth}%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Market Expansion Rate (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={activeScenario.marketExpansion}
                  onChange={(e) => handleInputChange('marketExpansion', Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-emerald-600 mt-1">
                  <span>0%</span>
                  <span>{activeScenario.marketExpansion}%</span>
                  <span>40%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Headcount
                </label>
                <input
                  type="number"
                  value={activeScenario.headcount}
                  onChange={(e) => handleInputChange('headcount', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Saved Scenarios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">Saved Scenarios</h2>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <button
                    onClick={() => setActiveScenario(scenario)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="font-medium text-emerald-800">{scenario.name}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateScenario(scenario)}
                      className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {scenario.id !== 'default' && (
                      <button
                        onClick={() => deleteScenario(scenario.id)}
                        className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projections Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-6">Financial Projections</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projections}>
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
                    stroke="#059669"
                    strokeWidth={2}
                    dot={{ fill: '#059669' }}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={{ fill: '#dc2626' }}
                    name="Expenses"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#00df8f"
                    strokeWidth={2}
                    dot={{ fill: '#00df8f' }}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Projected Revenue</h3>
              <p className="text-3xl font-bold">
                ${(projections[11].revenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-emerald-100 mt-1">End of Year</p>
            </div>

            <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Projected Expenses</h3>
              <p className="text-3xl font-bold">
                ${(projections[11].expenses / 1000000).toFixed(1)}M
              </p>
              <p className="text-rose-100 mt-1">End of Year</p>
            </div>

            <div className="bg-gradient-to-br from-mint-400 to-mint-600 p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Projected Profit</h3>
              <p className="text-3xl font-bold">
                ${(projections[11].profit / 1000000).toFixed(1)}M
              </p>
              <p className="text-mint-100 mt-1">End of Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}