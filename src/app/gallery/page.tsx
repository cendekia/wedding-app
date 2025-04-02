import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { getAllPhotoCategories, getFeaturedPhotos } from '@/lib/images';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wedding Photo Gallery - Amel & Firza Wedding',
  description: 'Browse beautiful photos from Amel and Firza\'s wedding celebration',
};

export default async function GalleryPage() {
  // Get featured photos and all categories
  const [featuredPhotos, categories] = await Promise.all([
    getFeaturedPhotos(6),
    getAllPhotoCategories(),
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Wedding Photo Gallery</h1>
            <p className="text-gray-600 mb-2 max-w-2xl mx-auto">
              Explore beautiful moments from our special day. Browse through different categories or view all photos.
            </p>
          </div>

          {/* Featured photos section */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Featured Photos</h2>
              <Link href="/gallery/all">
                <Button variant="outline" size="sm">
                  View All Photos
                </Button>
              </Link>
            </div>
            
            {featuredPhotos.length > 0 ? (
              <PhotoGrid photos={featuredPhotos} columns={3} />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                No featured photos yet. Check back soon!
              </div>
            )}
          </div>

          {/* Photo categories section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse by Category</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/gallery/category/${category.slug}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer">
                    <div className="aspect-video bg-gray-100 relative">
                      {category.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={category.coverImage}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Category info */}
                      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <div className="flex items-center text-sm">
                          <span>{category.count} photos</span>
                        </div>
                      </div>
                    </div>
                    
                    {category.description && (
                      <div className="p-4">
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 