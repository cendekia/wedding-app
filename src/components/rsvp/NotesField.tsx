'use client';

import React from 'react';

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const NotesField: React.FC<NotesFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
        Additional Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Is there anything else you'd like us to know? Special requests, questions, etc."
        rows={4}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-xs text-gray-500">
          Optional - Feel free to share any messages, wishes, or special considerations
        </p>
      )}
    </div>
  );
};

export default NotesField; 