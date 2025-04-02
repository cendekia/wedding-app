'use client';

import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface EventMapProps {
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
  };
}

const EventMap: React.FC<EventMapProps> = ({ location }) => {
  // Create a Google Maps URL for the location
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name}, ${location.address}, ${location.city}, ${location.country}`
  )}`;

  // Create embedded map URL if latitude and longitude are available
  const hasCoordinates = typeof location.latitude === 'number' && typeof location.longitude === 'number';
  const embeddedMapUrl = hasCoordinates
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.latitude},${location.longitude}&zoom=16`
    : null;

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white">
      {/* Map Container */}
      <div className="relative h-64 bg-gray-100">
        {embeddedMapUrl ? (
          <iframe
            src={embeddedMapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event location map"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Map preview not available</p>
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-primary hover:underline text-sm"
              >
                Open in Google Maps
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Location Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
        <address className="not-italic text-gray-600 text-sm">
          <p>{location.address}</p>
          <p>{location.city}{location.zipCode ? `, ${location.zipCode}` : ''}</p>
          <p>{location.country}</p>
        </address>
        
        <div className="mt-3">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Get Directions
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventMap; 