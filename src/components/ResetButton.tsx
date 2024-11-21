import { RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ResetButtonProps {
  module?: string;
  onReset?: () => void;
}

export default function ResetButton({ module, onReset }: ResetButtonProps) {
  const { dispatch } = useData();

  const handleReset = () => {
    if (module) {
      dispatch({ type: `${module.toUpperCase()}_RESET` });
    } else {
      dispatch({ type: 'RESET_ALL' });
    }
    onReset?.();
  };

  return (
    <button
      onClick={handleReset}
      className="px-4 py-2 flex items-center gap-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Reset {module ? 'Data' : 'All Data'}
    </button>
  );
}