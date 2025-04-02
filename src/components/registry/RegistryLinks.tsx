'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface ExternalRegistry {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
  description?: string;
}

interface RegistryLinksProps {
  externalRegistries: ExternalRegistry[];
  className?: string;
}

const RegistryLinks: React.FC<RegistryLinksProps> = ({ 
  externalRegistries, 
  className = '' 
}) => {
  if (externalRegistries.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-2xl font-semibold text-center mb-8">Our External Registries</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {externalRegistries.map((registry) => (
          <a 
            key={registry.id}
            href={registry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Logo */}
              <div className="p-6 flex justify-center items-center border-b">
                {registry.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={registry.logoUrl} 
                    alt={registry.name} 
                    className="h-12 object-contain" 
                  />
                ) : (
                  <div className="text-xl font-semibold text-primary">{registry.name}</div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{registry.name}</h3>
                
                {registry.description && (
                  <p className="text-gray-600 text-sm mb-4">{registry.description}</p>
                )}
                
                <Button className="w-full">
                  View Registry
                </Button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RegistryLinks; 