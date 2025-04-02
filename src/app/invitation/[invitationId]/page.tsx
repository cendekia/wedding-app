import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import InvitationCard from '@/components/invitation/InvitationCard';
import { getInvitationById } from '@/lib/invitation';

interface InvitationPageProps {
  params: {
    invitationId: string;
  };
}

export async function generateMetadata({ params }: InvitationPageProps): Promise<Metadata> {
  const invitationData = await getInvitationById(params.invitationId);
  
  if (!invitationData) {
    return {
      title: 'Invitation Not Found',
      description: 'The requested invitation could not be found.',
    };
  }
  
  return {
    title: `Wedding Invitation | ${invitationData.coupleNames.partner1} & ${invitationData.coupleNames.partner2}`,
    description: `Join ${invitationData.coupleNames.partner1} & ${invitationData.coupleNames.partner2} in celebrating their special day.`,
  };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const invitationData = await getInvitationById(params.invitationId);
  
  if (!invitationData) {
    notFound();
  }
  
  return (
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
          <Link href={`/rsvp/${params.invitationId}`}>
            <span className="inline-block px-6 py-3 bg-gold text-white rounded-md shadow-md hover:bg-gold/90 transition-colors">
              RSVP Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 