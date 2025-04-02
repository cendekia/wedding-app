import { NextRequest, NextResponse } from 'next/server';
import { getAllPhotos, uploadPhoto } from '@/lib/images';

// GET /api/gallery
// Returns all photos or filtered by query params
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters if needed
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    // Get all photos
    let photos = await getAllPhotos();
    
    // Filter by category if specified
    if (category) {
      photos = photos.filter(photo => 
        photo.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter for featured photos if specified
    if (featured === 'true') {
      photos = photos.filter(photo => photo.featured);
    }
    
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching photos' },
      { status: 500 }
    );
  }
}

// POST /api/gallery
// Adds a new photo
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would handle file upload separately
    // and save the URL to the database
    
    // Try to upload the photo
    const result = await uploadPhoto({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      thumbnailUrl: body.thumbnailUrl,
      category: body.category,
      featured: body.featured || false,
      uploadedBy: body.uploadedBy,
      metadata: body.metadata,
    });
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to upload photo' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'An error occurred while uploading the photo' },
      { status: 500 }
    );
  }
} 