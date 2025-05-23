import { useState, useCallback } from 'react';

interface UseEditorProps {
  initialValue?: any[];
  onSave?: (content: any[]) => void;
}

export function useEditor({ initialValue = [], onSave }: UseEditorProps = {}) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((newValue: any[]) => {
    setValue(newValue);
    setIsDirty(true);
  }, []);

  const handleSave = useCallback(() => {
    if (onSave && isDirty) {
      onSave(value);
      setIsDirty(false);
    }
  }, [value, isDirty, onSave]);

  const reset = useCallback((newValue: any[] = []) => {
    setValue(newValue);
    setIsDirty(false);
  }, []);

  return {
    value,
    isDirty,
    handleChange,
    handleSave,
    reset,
  };
} 