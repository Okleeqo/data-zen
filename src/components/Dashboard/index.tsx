import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';
import DataInputModal from '../DataInput/DataInputModal';
import ResetButton from '../ResetButton';

export default function Dashboard() {
  const { state } = useData();
  const [isAddingData, setIsAddingData] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Dashboard</h1>
          <p className="text-emerald-600 mt-1">Welcome back</p>
        </div>
        <div className="flex gap-3">
          <ResetButton module="dashboard" />
          <button
            onClick={() => setIsAddingData(true)}
            className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Add Data
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-lg font-semibold text-emerald-900 mb-2">No Data Available</h2>
        <p className="text-emerald-600 mb-4">Add data to see your metrics here</p>
        <button
          onClick={() => setIsAddingData(true)}
          className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all mx-auto"
        >
          <Plus className="w-4 h-4" />
          Add Data
        </button>
      </div>

      {/* Data Input Modal */}
      {isAddingData && (
        <DataInputModal
          module="dashboard"
          onClose={() => setIsAddingData(false)}
          onSuccess={() => setIsAddingData(false)}
        />
      )}
    </div>
  );
}