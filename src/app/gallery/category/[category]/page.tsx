import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPhotosByCategory, getAllPhotoCategories } from '@/lib/images';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const categorySlug = params.category;
  const categories = await getAllPhotoCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found - Wedding Gallery',
    };
  }
  
  return {
    title: `${category.name} Photos - Wedding Gallery - Amel & Firza Wedding`,
    description: category.description || `Browse ${category.name.toLowerCase()} photos from Amel and Firza's wedding celebration`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllPhotoCategories();
  
  return categories.map(category => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  
  // Get all categories to find the current one
  const categories = await getAllPhotoCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  // If category doesn't exist, show 404
  if (!category) {
    notFound();
  }
  
  // Get photos for this category
  const photos = await getPhotosByCategory(category.id);

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
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{category.name} Photos</h1>
            {category.description && (
              <p className="text-gray-600 mb-2 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
            <p className="text-sm text-gray-500">
              {photos.length} photos
            </p>
          </div>

          {/* Category photos grid */}
          {photos.length > 0 ? (
            <PhotoGrid 
              photos={photos} 
              columns={3} 
              gap={4}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              No photos available in this category yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 