import { prisma } from './db';

export interface RegistryItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  purchaseUrl?: string;
  category: 'HOUSEHOLD' | 'EXPERIENCE' | 'CHARITY' | 'HONEYMOON' | 'OTHER';
  isPurchased?: boolean;
  purchasedBy?: string;
  purchasedAt?: Date;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RegistryCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

// Get all registry items
export async function getAllRegistryItems(): Promise<RegistryItem[]> {
  try {
    // For now, return mock data
    // In a real implementation, we would fetch from the database
    return getMockRegistryItems();
    
    // Example of how to fetch from database in the future:
    /*
    const items = await prisma.registryItem.findMany({
      orderBy: [
        { priority: 'desc' },
        { title: 'asc' }
      ],
    });
    
    return items.map(formatRegistryItem);
    */
  } catch (error) {
    console.error('Error fetching registry items:', error);
    return [];
  }
}

// Get registry items by category
export async function getRegistryItemsByCategory(category: string): Promise<RegistryItem[]> {
  try {
    // For now, return mock data filtered by category
    const items = getMockRegistryItems();
    return items.filter(
      item => item.category === category.toUpperCase()
    );
    
    // Example of how to fetch from database in the future:
    /*
    const items = await prisma.registryItem.findMany({
      where: { category: category.toUpperCase() },
      orderBy: [
        { priority: 'desc' },
        { title: 'asc' }
      ],
    });
    
    return items.map(formatRegistryItem);
    */
  } catch (error) {
    console.error(`Error fetching registry items for category ${category}:`, error);
    return [];
  }
}

// Get all registry categories
export async function getAllRegistryCategories(): Promise<RegistryCategory[]> {
  try {
    // For now, return mock categories
    return getMockCategories();
    
    // Example of how to fetch from database in the future:
    /*
    // Get all unique categories and count items in each
    const categories = await prisma.registryItem.groupBy({
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
    console.error('Error fetching registry categories:', error);
    return [];
  }
}

// Mark a registry item as purchased
export async function markItemAsPurchased(itemId: string, purchasedBy: string): Promise<RegistryItem | null> {
  try {
    // For now, return updated mock data
    const items = getMockRegistryItems();
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return null;
    }
    
    const updatedItem = {
      ...items[itemIndex],
      isPurchased: true,
      purchasedBy,
      purchasedAt: new Date(),
    };
    
    // In a real implementation, we would update the database
    /*
    const updatedItem = await prisma.registryItem.update({
      where: { id: itemId },
      data: {
        isPurchased: true,
        purchasedBy,
        purchasedAt: new Date(),
      },
    });
    
    return formatRegistryItem(updatedItem);
    */
    
    return updatedItem;
  } catch (error) {
    console.error(`Error marking item ${itemId} as purchased:`, error);
    return null;
  }
}

// Format category name (e.g., HOUSEHOLD -> Household)
function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

// Mock data for development
function getMockRegistryItems(): RegistryItem[] {
  return [
    {
      id: 'registry-1',
      title: 'Dining Table Set',
      description: 'A beautiful wooden dining table with 6 chairs',
      price: 1200,
      imageUrl: '/images/registry/dining-table.jpg',
      purchaseUrl: 'https://example.com/dining-table',
      category: 'HOUSEHOLD',
      isPurchased: false,
      priority: 'HIGH',
    },
    {
      id: 'registry-2',
      title: 'Blender',
      description: 'High-powered blender for smoothies and cooking',
      price: 150,
      imageUrl: '/images/registry/blender.jpg',
      purchaseUrl: 'https://example.com/blender',
      category: 'HOUSEHOLD',
      isPurchased: true,
      purchasedBy: 'John Smith',
      purchasedAt: new Date('2024-03-10'),
      priority: 'MEDIUM',
    },
    {
      id: 'registry-3',
      title: 'Honeymoon Fund',
      description: 'Contribute to our dream honeymoon in Bali',
      price: 100, // Per contribution
      imageUrl: '/images/registry/honeymoon.jpg',
      purchaseUrl: 'https://example.com/honeymoon-fund',
      category: 'HONEYMOON',
      isPurchased: false,
      priority: 'HIGH',
    },
    {
      id: 'registry-4',
      title: 'Cooking Class Experience',
      description: 'A fun cooking class for the couple to enjoy together',
      price: 200,
      imageUrl: '/images/registry/cooking-class.jpg',
      purchaseUrl: 'https://example.com/cooking-class',
      category: 'EXPERIENCE',
      isPurchased: false,
      priority: 'MEDIUM',
    },
    {
      id: 'registry-5',
      title: 'Charity Donation - Animal Shelter',
      description: 'A donation to our favorite local animal shelter',
      price: 50, // Per donation
      imageUrl: '/images/registry/charity.jpg',
      purchaseUrl: 'https://example.com/animal-shelter',
      category: 'CHARITY',
      isPurchased: false,
      priority: 'MEDIUM',
    },
    {
      id: 'registry-6',
      title: 'Bed Linens',
      description: 'Luxury cotton bed sheets and pillowcases',
      price: 180,
      imageUrl: '/images/registry/bed-linens.jpg',
      purchaseUrl: 'https://example.com/bed-linens',
      category: 'HOUSEHOLD',
      isPurchased: false,
      priority: 'HIGH',
    },
    {
      id: 'registry-7',
      title: 'Coffee Maker',
      description: 'Programmable coffee maker for our morning routine',
      price: 120,
      imageUrl: '/images/registry/coffee-maker.jpg',
      purchaseUrl: 'https://example.com/coffee-maker',
      category: 'HOUSEHOLD',
      isPurchased: false,
      priority: 'LOW',
    },
    {
      id: 'registry-8',
      title: 'Spa Day for Two',
      description: 'Relaxing spa day experience for the couple',
      price: 250,
      imageUrl: '/images/registry/spa-day.jpg',
      purchaseUrl: 'https://example.com/spa-day',
      category: 'EXPERIENCE',
      isPurchased: false,
      priority: 'LOW',
    },
  ];
}

// Mock categories for development
function getMockCategories(): RegistryCategory[] {
  return [
    {
      id: 'HOUSEHOLD',
      name: 'Household',
      slug: 'household',
      description: 'Items for our new home',
      count: 4,
    },
    {
      id: 'HONEYMOON',
      name: 'Honeymoon',
      slug: 'honeymoon',
      description: 'Help us create unforgettable honeymoon memories',
      count: 1,
    },
    {
      id: 'EXPERIENCE',
      name: 'Experience',
      slug: 'experience',
      description: 'Gift us with memorable experiences',
      count: 2,
    },
    {
      id: 'CHARITY',
      name: 'Charity',
      slug: 'charity',
      description: 'Support causes we care about',
      count: 1,
    },
  ];
}

// Format registry item (helper function for future database integration)
function formatRegistryItem(item: any): RegistryItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description || undefined,
    price: item.price || undefined,
    imageUrl: item.imageUrl || undefined,
    purchaseUrl: item.purchaseUrl || undefined,
    category: item.category || 'OTHER',
    isPurchased: item.isPurchased || false,
    purchasedBy: item.purchasedBy || undefined,
    purchasedAt: item.purchasedAt || undefined,
    priority: item.priority || 'LOW',
  };
} 