import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: string[] | { label: string; value: string }[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, error, options, placeholder, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <select
        className={`w-full rounded-lg border ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
        } bg-white px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-200 appearance-none`}
        {...props}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((opt) => {
          const isString = typeof opt === 'string';
          const value = isString ? opt : opt.value;
          const labelText = isString ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};