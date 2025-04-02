'use client';

import React, { useState } from 'react';
import { PhotoData } from '@/lib/images';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

interface PhotoGridProps {
  photos: PhotoData[];
  columns?: number;
  gap?: number;
  className?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  columns = 3,
  gap = 4,
  className = '',
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (photo: PhotoData) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Delay resetting the selected photo to allow for transition animation
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[prevIndex]);
    }
  };

  // No photos to display
  if (photos.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">No photos available in this category.</p>
      </div>
    );
  }

  // Create column arrays for the masonry-like layout
  const photoColumns: PhotoData[][] = Array.from({ length: columns }, () => []);
  
  // Distribute photos across columns
  photos.forEach((photo, index) => {
    const columnIndex = index % columns;
    photoColumns[columnIndex].push(photo);
  });

  return (
    <>
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-${gap} ${className}`}
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`
        }}
      >
        {photoColumns.map((column, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col space-y-4">
            {column.map((photo) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                onClick={() => openModal(photo)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Modal for displaying full-size photos */}
      {selectedPhoto && (
        <PhotoModal
          isOpen={modalOpen}
          onClose={closeModal}
          photo={selectedPhoto}
          onNavigate={navigatePhoto}
          hasNext={photos.length > 1}
          hasPrevious={photos.length > 1}
        />
      )}
    </>
  );
};

export default PhotoGrid; 