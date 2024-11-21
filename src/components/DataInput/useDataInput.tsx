import { useState } from 'react';
import DataInputModal from './DataInputModal';

export function useDataInputModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<
    'dashboard' | 'cashflow' | 'kpi' | 'uniteconomics' | 'marketing' | 'product' | null
  >(null);

  const openModal = (module: typeof currentModule) => {
    setCurrentModule(module);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentModule(null);
  };

  const DataInputModalComponent = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    if (!isOpen || !currentModule) return null;

    return (
      <DataInputModal
        module={currentModule}
        onClose={closeModal}
        onSubmit={onSubmit}
      />
    );
  };

  return {
    openModal,
    closeModal,
    DataInputModal: DataInputModalComponent
  };
}