'use client';

import React from 'react';
import { RegistryItem } from '@/lib/registry';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface RegistryCardProps {
  item: RegistryItem;
  className?: string;
}

const RegistryCard: React.FC<RegistryCardProps> = ({ 
  item, 
  className = '' 
}) => {
  // Format price as currency
  const formattedPrice = item.price 
    ? new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(item.price) 
    : null;
  
  // Handle purchase click
  const handlePurchaseClick = () => {
    if (item.purchaseUrl) {
      window.open(item.purchaseUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        {item.imageUrl ? (
          item.imageUrl.startsWith('/') ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
        )}
        
        {/* Purchase status badge */}
        {item.isPurchased && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Purchased
          </div>
        )}
        
        {/* Priority indicator */}
        {!item.isPurchased && item.priority === 'HIGH' && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Priority
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
        
        {formattedPrice && (
          <p className="text-primary font-medium mb-2">{formattedPrice}</p>
        )}
        
        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}
        
        {/* Purchase information */}
        {item.isPurchased ? (
          <div className="text-gray-500 text-sm">
            <p>Purchased by: {item.purchasedBy || 'Anonymous'}</p>
            {item.purchasedAt && (
              <p>Date: {new Date(item.purchasedAt).toLocaleDateString()}</p>
            )}
          </div>
        ) : (
          item.purchaseUrl && (
            <Button 
              onClick={handlePurchaseClick} 
              className="w-full mt-2"
            >
              Purchase Gift
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default RegistryCard; 