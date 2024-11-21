import { useState } from 'react';
import { useData } from '../context/DataContext';

interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

interface ValidationSchema {
  [key: string]: ValidationRules;
}

export function useDataInput() {
  const { dispatch } = useData();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateData = (data: any, schema: ValidationSchema) => {
    const newErrors: Record<string, string> = {};

    Object.entries(schema).forEach(([field, rules]) => {
      const value = data[field];

      if (rules.required && !value && value !== 0) {
        newErrors[field] = 'This field is required';
      }
      if (value && rules.min !== undefined && Number(value) < rules.min) {
        newErrors[field] = `Value must be at least ${rules.min}`;
      }
      if (value && rules.max !== undefined && Number(value) > rules.max) {
        newErrors[field] = `Value must not exceed ${rules.max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDataInput = (data: any, module: string) => {
    // Convert string values to numbers where appropriate
    const processedData = Object.entries(data).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value
    }), {});

    // Dispatch to context based on module
    dispatch({
      type: `UPDATE_${module.toUpperCase()}`,
      payload: processedData
    });

    return true;
  };

  return {
    errors,
    handleDataInput,
    clearErrors: () => setErrors({})
  };
}