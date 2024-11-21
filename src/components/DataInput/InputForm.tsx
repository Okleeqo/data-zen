import { useState } from 'react';
import { useDataInput } from '../../hooks/useDataInput';
import { Save, X } from 'lucide-react';

interface InputFormProps {
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date';
    required?: boolean;
    placeholder?: string;
  }[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
  title: string;
}

export default function InputForm({ fields, onSubmit, onCancel, title }: InputFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { inputErrors } = useDataInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-emerald-900">{title}</h2>
          <button
            onClick={onCancel}
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  {field.label}
                  {!field.required && (
                    <span className="text-emerald-400 text-xs ml-1">(optional)</span>
                  )}
                </label>
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder={field.placeholder}
                />
                {inputErrors[field.name] && (
                  <p className="text-rose-500 text-sm mt-1">{inputErrors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}