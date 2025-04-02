import React from 'react';
import InvitationCard from '@/components/invitation/InvitationCard';
import { getDefaultInvitationData } from '@/lib/invitation';
import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Wedding Invitation | Amel & Saputra',
  description: 'Join us in celebrating our special day',
};

export default async function InvitationPage() {
  // In a real app, this would fetch from the database
  // Here we're using the default data
  const invitationData = getDefaultInvitationData();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <InvitationCard
          coupleNames={invitationData.coupleNames}
          date={invitationData.date}
          location={invitationData.location}
          eventDetails={invitationData.eventDetails}
          backgroundImage={invitationData.backgroundImage}
          invitationMessage={invitationData.invitationMessage}
        />
        
        <div className="mt-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif mb-4">We look forward to celebrating with you!</h2>
            <p className="text-gray-600 mb-6">
              Please RSVP by October 15, 2024 to help us plan for our special day.
            </p>
            <Link href="/rsvp">
              <span className="inline-block px-6 py-3 bg-gold text-white rounded-md shadow-md hover:bg-gold/90 transition-colors">
                RSVP Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 