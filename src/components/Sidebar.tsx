import { Home, Wallet, Users, DollarSign, TrendingUp, LineChart, Target, Megaphone, Package, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: DollarSign, label: 'Cash Flow', path: '/cash-flow' },
    { icon: TrendingUp, label: 'Scenario Planning', path: '/scenario-planning' },
    { icon: LineChart, label: 'Forecasting', path: '/forecasting' },
    { icon: Target, label: 'KPIs', path: '/kpis' },
    { icon: Megaphone, label: 'Marketing', path: '/marketing' },
    { icon: Package, label: 'Unit Economics', path: '/unit-economics' },
    { icon: Users, label: 'Clients', path: '/clients' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col w-80 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white">
      {/* Logo Section */}
      <div className="flex items-center gap-4 h-24 px-8 border-b border-emerald-700/20">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-400 via-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-400/20 ring-2 ring-mint-400/20">
          <span className="text-emerald-900 text-2xl font-bold">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">
            Data<span className="bg-gradient-to-r from-mint-400 to-mint-500 text-transparent bg-clip-text">Zen</span>
          </span>
          <span className="text-xs text-emerald-400">Financial Analytics</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col h-[calc(100vh-6rem)] overflow-hidden">
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                  active
                    ? 'bg-gradient-to-r from-emerald-700/80 to-transparent shadow-lg'
                    : 'hover:bg-emerald-800/40'
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-mint-400 rounded-r-full shadow-lg shadow-mint-400/50" />
                )}
                <div className={`w-10 h-10 rounded-xl ${
                  active 
                    ? 'bg-gradient-to-br from-mint-400/20 to-mint-400/10'
                    : 'bg-emerald-800/40 group-hover:bg-emerald-700/40'
                } flex items-center justify-center mr-3 transition-all duration-300`}>
                  <item.icon className={`w-5 h-5 transition-colors ${
                    active ? 'text-mint-400' : 'text-emerald-400 group-hover:text-mint-400'
                  }`} />
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium transition-colors ${
                    active ? 'text-white' : 'text-emerald-300 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  {active && (
                    <span className="text-xs text-emerald-400">View {item.label.toLowerCase()} details</span>
                  )}
                </div>
                {active && (
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-mint-400 shadow-lg shadow-mint-400/50" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Support Section - Fixed at bottom */}
        <div className="mt-auto p-4">
          <Link
            to="/support"
            className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-mint-400/10 bg-gradient-to-br from-mint-400/10 to-mint-400/5"
          >
            <div className="w-10 h-10 rounded-xl bg-mint-400/10 group-hover:bg-mint-400/20 flex items-center justify-center mr-3">
              <HelpCircle className="w-5 h-5 text-mint-400/80 group-hover:text-mint-400" />
            </div>
            <span className="font-medium text-emerald-300 group-hover:text-white">Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;