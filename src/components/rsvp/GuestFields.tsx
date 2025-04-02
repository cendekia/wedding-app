'use client';

import React from 'react';

interface GuestFieldsProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  disabled?: boolean;
}

const GuestFields: React.FC<GuestFieldsProps> = ({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  errors = {},
  disabled = false,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'bg-gray-100' : ''}`}
          placeholder="Enter your full name"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'bg-gray-100' : ''}`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          We'll send you a confirmation email with event details
        </p>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'bg-gray-100' : ''}`}
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default GuestFields; 