'use client';

import React from 'react';

interface DietaryRestrictionsProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const DietaryRestrictions: React.FC<DietaryRestrictionsProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const commonRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'halal', label: 'Halal' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-allergy', label: 'Nut Allergy' },
  ];

  const handleCommonRestrictionClick = (restriction: string) => {
    if (disabled) return;
    
    // If the value is empty, just set it to the restriction
    if (!value.trim()) {
      onChange(restriction);
      return;
    }
    
    // If the restriction is already in the value, do nothing
    if (value.toLowerCase().includes(restriction.toLowerCase())) {
      return;
    }
    
    // Otherwise, append the restriction to the existing value
    onChange(`${value}, ${restriction}`);
  };

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
          Dietary Restrictions or Preferences
        </label>
        <textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'bg-gray-100' : ''}`}
          placeholder="Please specify any dietary restrictions or food allergies"
          rows={3}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Common dietary restrictions:</p>
        <div className="flex flex-wrap gap-2">
          {commonRestrictions.map((restriction) => (
            <button
              key={restriction.id}
              type="button"
              onClick={() => handleCommonRestrictionClick(restriction.label)}
              disabled={disabled}
              className={`px-3 py-1 text-sm rounded-full 
                ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {restriction.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Click on any common restriction to add it to your response
        </p>
      </div>
    </div>
  );
};

export default DietaryRestrictions; 