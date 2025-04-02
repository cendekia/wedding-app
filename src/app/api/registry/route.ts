import { NextRequest, NextResponse } from 'next/server';
import { getAllRegistryItems, markItemAsPurchased } from '@/lib/registry';

// GET /api/registry
// Returns all registry items or filtered by query params
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters if needed
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    // Get all registry items
    let items = await getAllRegistryItems();
    
    // Filter by category if specified
    if (category) {
      items = items.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by purchase status if specified
    if (status === 'purchased') {
      items = items.filter(item => item.isPurchased);
    } else if (status === 'available') {
      items = items.filter(item => !item.isPurchased);
    }
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching registry items:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching registry items' },
      { status: 500 }
    );
  }
}

// POST /api/registry
// Marks a registry item as purchased
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.itemId || !body.purchasedBy) {
      return NextResponse.json(
        { error: 'itemId and purchasedBy are required' },
        { status: 400 }
      );
    }
    
    // Try to mark the item as purchased
    const result = await markItemAsPurchased(body.itemId, body.purchasedBy);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to mark item as purchased. Item may not exist.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error marking item as purchased:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
} 