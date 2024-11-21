import { Plus } from 'lucide-react';

interface DataInputButtonProps {
  onClick: () => void;
  label?: string;
}

export default function DataInputButton({ onClick, label = 'Add Data' }: DataInputButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}