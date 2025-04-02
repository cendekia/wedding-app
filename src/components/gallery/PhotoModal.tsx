'use client';

import React, { useEffect } from 'react';
import { PhotoData } from '@/lib/images';
import Image from 'next/image';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: PhotoData;
  onNavigate?: (direction: 'next' | 'prev') => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  photo,
  onNavigate,
  hasNext = false,
  hasPrevious = false,
}) => {
  // Close modal when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNavigate) {
        onNavigate('next');
      } else if (e.key === 'ArrowLeft' && hasPrevious && onNavigate) {
        onNavigate('prev');
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNavigate, hasNext, hasPrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary transition-colors p-2"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="relative">
            {/* Main image */}
            <div className="max-h-[80vh] flex items-center justify-center">
              {photo.imageUrl.startsWith('/') ? (
                <div className="relative w-full" style={{ maxHeight: '80vh' }}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    width={1200}
                    height={800}
                    className="max-h-[80vh] w-auto mx-auto object-contain"
                    priority
                  />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="max-h-[80vh] w-auto mx-auto object-contain"
                />
              )}
            </div>
            
            {/* Navigation buttons */}
            {onNavigate && (
              <>
                {hasPrevious && (
                  <button
                    onClick={() => onNavigate('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-colors"
                    aria-label="Previous photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                
                {hasNext && (
                  <button
                    onClick={() => onNavigate('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-colors"
                    aria-label="Next photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
          
          {/* Photo details */}
          <div className="p-4 bg-black/90 text-white">
            <h2 className="text-xl font-semibold">{photo.title}</h2>
            {photo.description && (
              <p className="mt-1 text-white/80">{photo.description}</p>
            )}
            <div className="flex justify-between items-center mt-2 text-sm text-white/60">
              <span>{photo.category ? photo.category.charAt(0) + photo.category.slice(1).toLowerCase() : 'Other'}</span>
              <span>{new Date(photo.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal; 