'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import CoupleInfo from './CoupleInfo';
import InvitationDetails from './InvitationDetails';
import DateTimeDisplay from './DateTimeDisplay';
import LocationInfo from './LocationInfo';

export interface InvitationCardProps {
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  date: Date;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    mapUrl?: string;
  };
  eventDetails: {
    title: string;
    description: string;
    dresscode?: string;
  };
  backgroundImage?: string;
  invitationMessage?: string;
}

const InvitationCard: React.FC<InvitationCardProps> = ({
  coupleNames,
  date,
  location,
  eventDetails,
  backgroundImage = '/images/wedding-bg.jpg',
  invitationMessage = 'Together with their families',
}) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl bg-white rounded-lg relative">
      <div className="relative h-64 md:h-96 overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Wedding Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
          <div className="mb-2 text-lg opacity-90">{invitationMessage}</div>
          <CoupleInfo partner1={coupleNames.partner1} partner2={coupleNames.partner2} />
        </div>
      </div>

      <div className="p-6 md:p-8 bg-white">
        <DateTimeDisplay date={date} />
        <div className="my-6 border-t border-b border-gray-200 py-6">
          <InvitationDetails
            title={eventDetails.title}
            description={eventDetails.description}
            dresscode={eventDetails.dresscode}
          />
        </div>
        <LocationInfo
          name={location.name}
          address={location.address}
          city={location.city}
          country={location.country}
          mapUrl={location.mapUrl}
        />
      </div>
    </Card>
  );
};

export default InvitationCard; 