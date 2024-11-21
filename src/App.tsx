import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CashFlow from './components/CashFlow';
import ScenarioPlanning from './components/ScenarioPlanning';
import Forecasting from './components/Forecasting';
import KPIsTracker from './components/KPIsTracker';
import MarketingInsights from './components/MarketingInsights';
import UnitEconomics from './components/UnitEconomics';
import Clients from './components/Clients';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cash-flow" element={<CashFlow />} />
              <Route path="/scenario-planning" element={<ScenarioPlanning />} />
              <Route path="/forecasting" element={<Forecasting />} />
              <Route path="/kpis" element={<KPIsTracker />} />
              <Route path="/marketing" element={<MarketingInsights />} />
              <Route path="/unit-economics" element={<UnitEconomics />} />
              <Route path="/clients" element={<Clients />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
}