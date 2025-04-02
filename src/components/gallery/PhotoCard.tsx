'use client';

import React from 'react';
import { PhotoData } from '@/lib/images';
import Image from 'next/image';

interface PhotoCardProps {
  photo: PhotoData;
  onClick?: () => void;
  className?: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        {/* Image (fallback to standard img tag if using external URLs) */}
        {photo.imageUrl.startsWith('/') ? (
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Photo metadata */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold leading-tight line-clamp-1">{photo.title}</h3>
          {photo.description && (
            <p className="text-sm text-white/80 mt-1 line-clamp-2">{photo.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard; 