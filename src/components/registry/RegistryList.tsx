'use client';

import React, { useState } from 'react';
import { RegistryItem } from '@/lib/registry';
import RegistryCard from './RegistryCard';

interface RegistryListProps {
  items: RegistryItem[];
  showPurchased?: boolean;
  className?: string;
}

const RegistryList: React.FC<RegistryListProps> = ({ 
  items, 
  showPurchased = true,
  className = '' 
}) => {
  const [filter, setFilter] = useState<'ALL' | 'AVAILABLE' | 'PURCHASED'>('ALL');
  
  // Filter items based on user selection
  const filteredItems = items.filter(item => {
    if (filter === 'AVAILABLE') return !item.isPurchased;
    if (filter === 'PURCHASED') return item.isPurchased;
    return true; // ALL
  });

  // Sort items by priority (HIGH -> MEDIUM -> LOW)
  const sortedItems = [...filteredItems].sort((a, b) => {
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    const aPriority = priorityOrder[a.priority || 'LOW'] || 1;
    const bPriority = priorityOrder[b.priority || 'LOW'] || 1;
    
    // Sort by priority first, then by purchase status (available first)
    if (aPriority !== bPriority) return bPriority - aPriority;
    if (a.isPurchased !== b.isPurchased) return a.isPurchased ? 1 : -1;
    
    // Finally sort alphabetically
    return a.title.localeCompare(b.title);
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Filter controls */}
      {showPurchased && (
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm bg-white">
            <button
              type="button"
              className={`rounded-l-md px-4 py-2 text-sm font-medium ${
                filter === 'ALL'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-r-0 border-gray-300`}
              onClick={() => setFilter('ALL')}
            >
              All
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'AVAILABLE'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-r-0 border-gray-300`}
              onClick={() => setFilter('AVAILABLE')}
            >
              Available
            </button>
            <button
              type="button"
              className={`rounded-r-md px-4 py-2 text-sm font-medium ${
                filter === 'PURCHASED'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
              onClick={() => setFilter('PURCHASED')}
            >
              Purchased
            </button>
          </div>
        </div>
      )}

      {/* Registry items grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedItems.map((item) => (
            <RegistryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">
            {filter === 'AVAILABLE'
              ? 'All items have been purchased. Thank you for your generosity!'
              : filter === 'PURCHASED'
              ? 'No items have been purchased yet.'
              : 'No registry items available.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RegistryList; 