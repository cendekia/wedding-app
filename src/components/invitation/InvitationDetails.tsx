'use client';

import React from 'react';

interface InvitationDetailsProps {
  title: string;
  description: string;
  dresscode?: string;
}

const InvitationDetails: React.FC<InvitationDetailsProps> = ({
  title,
  description,
  dresscode,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-serif mb-4">{title}</h2>
      <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
        {description}
      </p>
      
      {dresscode && (
        <div className="mt-4">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">Dress Code</p>
          <p className="font-medium text-gray-800">{dresscode}</p>
        </div>
      )}
    </div>
  );
};

export default InvitationDetails; 