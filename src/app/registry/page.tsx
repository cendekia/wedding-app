import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { getAllRegistryItems, getAllRegistryCategories } from '@/lib/registry';
import RegistryList from '@/components/registry/RegistryList';
import RegistryLinks from '@/components/registry/RegistryLinks';

export const metadata: Metadata = {
  title: 'Gift Registry - Amel & Fauzi Wedding',
  description: 'View and purchase wedding gifts for Amel and Fauzi',
};

// Sample external registries
const externalRegistries = [
  {
    id: 'tokopedia',
    name: 'Tokopedia',
    url: 'https://www.tokopedia.com',
    logoUrl: '/images/registry/tokopedia-logo.png',
    description: 'Check out our Tokopedia WishList',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    url: 'https://www.amazon.com',
    description: 'View our Amazon Wedding Registry',
  },
];

export default async function RegistryPage() {
  // Get registry items and categories
  const [items, categories] = await Promise.all([
    getAllRegistryItems(),
    getAllRegistryCategories(),
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Gift Registry</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
              we've created this registry to make it easier for you to choose something we'll love.
            </p>
          </div>

          {/* Category navigation */}
          {categories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-center mb-6">Browse by Category</h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Link 
                  href="/registry" 
                  className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  All Items
                </Link>
                
                {categories.map((category) => (
                  <Link 
                    key={category.id}
                    href={`/registry?category=${category.slug}`}
                    className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    {category.name} ({category.count})
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Registry items */}
          <RegistryList items={items} className="mb-16" />

          {/* External registries */}
          <RegistryLinks externalRegistries={externalRegistries} />

          {/* Information section */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Gift Information</h2>
            <div className="prose max-w-none">
              <p>
                If you prefer to give a gift not listed in our registry, we would be 
                equally grateful. For those who wish to send gifts directly to our home,
                our address is:
              </p>
              <p className="font-semibold text-center my-4">
                Amel & Fauzi<br />
                123 Wedding Street<br />
                Lovely City, 12345<br />
                Indonesia
              </p>
              <p>
                For cash gifts or bank transfers, you may use the following account:
              </p>
              <p className="font-semibold text-center my-4">
                Bank: Bank Central Asia (BCA)<br />
                Account Name: Amel Wedding<br />
                Account Number: 1234567890
              </p>
              <p className="text-center text-gray-600 mt-8">
                Thank you for your love and support as we begin our journey together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 