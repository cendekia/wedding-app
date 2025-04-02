import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPhotos } from '@/lib/images';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { MainLayout } from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'All Photos - Wedding Gallery - Amel & Firza Wedding',
  description: 'View all photos from Amel and Firza\'s wedding celebration',
};

export default async function AllPhotosPage() {
  // Get all photos
  const photos = await getAllPhotos();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/gallery" className="text-primary hover:underline inline-flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gallery
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">All Wedding Photos</h1>
            <p className="text-gray-600 mb-2 max-w-2xl mx-auto">
              Browse through all the beautiful moments captured during our special celebration.
            </p>
            <p className="text-sm text-gray-500">
              {photos.length} photos
            </p>
          </div>

          {/* All photos grid */}
          {photos.length > 0 ? (
            <PhotoGrid 
              photos={photos} 
              columns={3} 
              gap={4}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              No photos available yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 