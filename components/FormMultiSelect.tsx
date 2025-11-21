import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FormMultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({ label, options, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label className="text-sm font-medium text-slate-700">{label} <span className="text-red-500">*</span></label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left rounded-lg border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-teal-200'
          } bg-white px-4 py-2.5 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-200 flex justify-between items-center`}
        >
          <span className={`block truncate ${value.length === 0 ? 'text-slate-400' : ''}`}>
            {value.length > 0 ? `${value.length} selected` : 'Select skills...'}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-teal-50 ${
                    isSelected ? 'bg-teal-50 text-teal-900' : 'text-slate-900'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`mr-3 flex h-4 w-4 items-center justify-center rounded border ${isSelected ? 'border-teal-500 bg-teal-500' : 'border-slate-300'}`}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
                      {option}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {value.map((v) => (
            <span key={v} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800">
                {v}
            </span>
        ))}
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};