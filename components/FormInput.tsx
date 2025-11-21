import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, prefix, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-500 text-sm font-medium bg-slate-100 px-1 rounded">
            {prefix}
          </span>
        )}
        <input
          className={`w-full rounded-lg border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
          } bg-white px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-200 ${
            prefix ? 'pl-14' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-medium text-red-500 animate-pulse">{error}</span>}
    </div>
  );
};