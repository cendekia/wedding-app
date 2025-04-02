'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface AttendanceOptionsProps {
  status: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING';
  onStatusChange: (status: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING') => void;
  numberOfGuests: number;
  onNumberOfGuestsChange: (value: number) => void;
  maxGuests: number;
  errors?: {
    status?: string;
    numberOfGuests?: string;
  };
  disabled?: boolean;
}

const AttendanceOptions: React.FC<AttendanceOptionsProps> = ({
  status,
  onStatusChange,
  numberOfGuests,
  onNumberOfGuestsChange,
  maxGuests,
  errors = {},
  disabled = false,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Will you be attending? <span className="text-red-500">*</span>
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer p-4 transition-all ${
              status === 'ATTENDING' 
                ? 'border-primary bg-primary/5' 
                : 'hover:bg-gray-50'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onStatusChange('ATTENDING')}
          >
            <div className="flex items-center">
              <div 
                className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                  status === 'ATTENDING' ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {status === 'ATTENDING' && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Yes, I will attend</h3>
                <p className="text-sm text-gray-500">I'm excited to celebrate with you</p>
              </div>
            </div>
          </Card>
          
          <Card 
            className={`cursor-pointer p-4 transition-all ${
              status === 'NOT_ATTENDING' 
                ? 'border-primary bg-primary/5' 
                : 'hover:bg-gray-50'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onStatusChange('NOT_ATTENDING')}
          >
            <div className="flex items-center">
              <div 
                className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                  status === 'NOT_ATTENDING' ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {status === 'NOT_ATTENDING' && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">No, I can't attend</h3>
                <p className="text-sm text-gray-500">I'll be there in spirit</p>
              </div>
            </div>
          </Card>
        </div>
        
        {errors.status && (
          <p className="mt-2 text-sm text-red-500">{errors.status}</p>
        )}
      </div>

      {status === 'ATTENDING' && (
        <div>
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => !disabled && numberOfGuests > 1 && onNumberOfGuestsChange(numberOfGuests - 1)}
              disabled={disabled || numberOfGuests <= 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md 
                bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              id="numberOfGuests"
              name="numberOfGuests"
              value={numberOfGuests}
              onChange={(e) => onNumberOfGuestsChange(parseInt(e.target.value) || 1)}
              min="1"
              max={maxGuests}
              disabled={disabled}
              className={`w-16 text-center h-10 border-y border-gray-300 focus:outline-none 
                ${errors.numberOfGuests ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100' : ''}`}
            />
            <button
              type="button"
              onClick={() => !disabled && numberOfGuests < maxGuests && onNumberOfGuestsChange(numberOfGuests + 1)}
              disabled={disabled || numberOfGuests >= maxGuests}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md 
                bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {maxGuests > 1 
              ? `You may bring up to ${maxGuests} guests total (including yourself)` 
              : 'This invitation is for you only'}
          </p>
          
          {errors.numberOfGuests && (
            <p className="mt-1 text-sm text-red-500">{errors.numberOfGuests}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceOptions; 