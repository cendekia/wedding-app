'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationInfoProps {
  name: string;
  address: string;
  city: string;
  country: string;
  mapUrl?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
  name,
  address,
  city,
  country,
  mapUrl,
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-3">
        <MapPin className="text-gray-400 mr-2" size={18} />
        <h3 className="text-xl font-medium">Location</h3>
      </div>
      
      <div className="space-y-1 mb-4">
        <p className="text-lg font-serif">{name}</p>
        <p className="text-gray-600">{address}</p>
        <p className="text-gray-600">
          {city}, {country}
        </p>
      </div>
      
      {mapUrl && (
        <div className="mt-4">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 
            text-gray-800 rounded-md transition-colors duration-200"
          >
            <MapPin className="mr-2" size={16} />
            View Map
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationInfo; 