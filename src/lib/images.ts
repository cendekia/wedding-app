import { prisma } from './db';

export interface PhotoData {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  uploadedBy?: string;
  uploadedAt: Date;
  category?: 'COUPLE' | 'CEREMONY' | 'RECEPTION' | 'ENGAGEMENT' | 'FAMILY' | 'GUESTS' | 'OTHER';
  featured?: boolean;
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
    format?: string;
  };
}

export interface PhotoCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
  coverImage?: string;
}

// Get all photos from the database
export async function getAllPhotos(): Promise<PhotoData[]> {
  try {
    // For now, return mock data
    // In a real implementation, we would fetch from the database
    return getMockPhotos();
    
    // Example of how to fetch from database in the future:
    /*
    const photos = await prisma.photo.findMany({
      orderBy: { uploadedAt: 'desc' },
    });
    
    return photos.map(formatPhotoData);
    */
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

// Get featured photos
export async function getFeaturedPhotos(limit = 8): Promise<PhotoData[]> {
  try {
    // For now, return mock data filtered to featured photos
    const photos = getMockPhotos();
    return photos
      .filter(photo => photo.featured)
      .slice(0, limit);
    
    // Example of how to fetch from database in the future:
    /*
    const photos = await prisma.photo.findMany({
      where: { featured: true },
      orderBy: { uploadedAt: 'desc' },
      take: limit,
    });
    
    return photos.map(formatPhotoData);
    */
  } catch (error) {
    console.error('Error fetching featured photos:', error);
    return [];
  }
}

// Get photos by category
export async function getPhotosByCategory(category: string): Promise<PhotoData[]> {
  try {
    // For now, return mock data filtered by category
    const photos = getMockPhotos();
    return photos.filter(
      photo => photo.category === category.toUpperCase()
    );
    
    // Example of how to fetch from database in the future:
    /*
    const photos = await prisma.photo.findMany({
      where: { category: category.toUpperCase() },
      orderBy: { uploadedAt: 'desc' },
    });
    
    return photos.map(formatPhotoData);
    */
  } catch (error) {
    console.error(`Error fetching photos for category ${category}:`, error);
    return [];
  }
}

// Get all photo categories
export async function getAllPhotoCategories(): Promise<PhotoCategory[]> {
  try {
    // For now, return mock categories
    return getMockCategories();
    
    // Example of how to fetch from database in the future:
    /*
    // Get all unique categories and count photos in each
    const categories = await prisma.photo.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });
    
    // Format the response
    return categories.map(category => ({
      id: category.category,
      name: formatCategoryName(category.category),
      slug: category.category.toLowerCase(),
      count: category._count.category,
    }));
    */
  } catch (error) {
    console.error('Error fetching photo categories:', error);
    return [];
  }
}

// Upload a photo (mock implementation)
export async function uploadPhoto(photoData: Omit<PhotoData, 'id' | 'uploadedAt'>): Promise<PhotoData | null> {
  try {
    // In a real implementation, we would handle the upload to Cloudinary or similar
    // and then save the metadata to the database
    
    const newPhoto: PhotoData = {
      id: `photo-${Date.now()}`,
      ...photoData,
      uploadedAt: new Date(),
    };
    
    // Example of how to save to database in the future:
    /*
    const photo = await prisma.photo.create({
      data: {
        title: photoData.title,
        description: photoData.description,
        imageUrl: photoData.imageUrl,
        thumbnailUrl: photoData.thumbnailUrl,
        uploadedBy: photoData.uploadedBy,
        category: photoData.category,
        featured: photoData.featured || false,
        metadata: photoData.metadata,
      },
    });
    
    return formatPhotoData(photo);
    */
    
    return newPhoto;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
}

// Format category name (e.g., ENGAGEMENT -> Engagement)
function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

// Mock data for development
function getMockPhotos(): PhotoData[] {
  return [
    {
      id: 'photo-1',
      title: 'Couple Portrait',
      description: 'Amel and Firza at the botanical garden',
      imageUrl: '/images/gallery/couple1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/couple1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-02-15'),
      category: 'COUPLE',
      featured: true,
      metadata: {
        width: 1200,
        height: 800,
        size: 2500000,
        format: 'jpg',
      },
    },
    {
      id: 'photo-2',
      title: 'Engagement Day',
      description: 'The beautiful engagement ceremony',
      imageUrl: '/images/gallery/engagement1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/engagement1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-01-10'),
      category: 'ENGAGEMENT',
      featured: true,
    },
    {
      id: 'photo-3',
      title: 'Family Photo',
      description: 'Both families together',
      imageUrl: '/images/gallery/family1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/family1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-02-20'),
      category: 'FAMILY',
      featured: false,
    },
    {
      id: 'photo-4',
      title: 'Prewedding Session',
      description: 'Sunset session at the beach',
      imageUrl: '/images/gallery/couple2.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/couple2.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-01-25'),
      category: 'COUPLE',
      featured: true,
    },
    {
      id: 'photo-5',
      title: 'Wedding Ceremony',
      description: 'The sacred moment',
      imageUrl: '/images/gallery/ceremony1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/ceremony1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'CEREMONY',
      featured: true,
    },
    {
      id: 'photo-6',
      title: 'Wedding Reception',
      description: 'The joyous celebration',
      imageUrl: '/images/gallery/reception1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/reception1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'RECEPTION',
      featured: true,
    },
    {
      id: 'photo-7',
      title: 'Wedding Guests',
      description: 'Our dear friends and family',
      imageUrl: '/images/gallery/guests1.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/guests1.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'GUESTS',
      featured: false,
    },
    {
      id: 'photo-8',
      title: 'Bride Preparation',
      description: 'Amel getting ready',
      imageUrl: '/images/gallery/ceremony2.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/ceremony2.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'CEREMONY',
      featured: false,
    },
    {
      id: 'photo-9',
      title: 'Groom Preparation',
      description: 'Firza getting ready',
      imageUrl: '/images/gallery/ceremony3.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/ceremony3.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'CEREMONY',
      featured: false,
    },
    {
      id: 'photo-10',
      title: 'First Dance',
      description: 'Our first dance as a married couple',
      imageUrl: '/images/gallery/reception2.jpg',
      thumbnailUrl: '/images/gallery/thumbnails/reception2.jpg',
      uploadedBy: 'Photographer',
      uploadedAt: new Date('2024-03-15'),
      category: 'RECEPTION',
      featured: true,
    },
  ];
}

// Mock categories for development
function getMockCategories(): PhotoCategory[] {
  return [
    {
      id: 'COUPLE',
      name: 'Couple',
      slug: 'couple',
      description: 'Photos of Amel and Firza',
      count: 2,
      coverImage: '/images/gallery/couple1.jpg',
    },
    {
      id: 'CEREMONY',
      name: 'Ceremony',
      slug: 'ceremony',
      description: 'Wedding ceremony photos',
      count: 3,
      coverImage: '/images/gallery/ceremony1.jpg',
    },
    {
      id: 'RECEPTION',
      name: 'Reception',
      slug: 'reception',
      description: 'Wedding reception photos',
      count: 2,
      coverImage: '/images/gallery/reception1.jpg',
    },
    {
      id: 'ENGAGEMENT',
      name: 'Engagement',
      slug: 'engagement',
      description: 'Engagement photos',
      count: 1,
      coverImage: '/images/gallery/engagement1.jpg',
    },
    {
      id: 'FAMILY',
      name: 'Family',
      slug: 'family',
      description: 'Family photos',
      count: 1,
      coverImage: '/images/gallery/family1.jpg',
    },
    {
      id: 'GUESTS',
      name: 'Guests',
      slug: 'guests',
      description: 'Photos of our guests',
      count: 1,
      coverImage: '/images/gallery/guests1.jpg',
    },
  ];
}

// Format photo data (helper function for future database integration)
function formatPhotoData(photo: any): PhotoData {
  return {
    id: photo.id,
    title: photo.title,
    description: photo.description || undefined,
    imageUrl: photo.imageUrl,
    thumbnailUrl: photo.thumbnailUrl || undefined,
    uploadedBy: photo.uploadedBy || undefined,
    uploadedAt: photo.uploadedAt,
    category: photo.category || 'OTHER',
    featured: photo.featured || false,
    metadata: photo.metadata || undefined,
  };
} 