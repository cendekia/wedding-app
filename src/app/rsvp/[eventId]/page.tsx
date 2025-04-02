import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getEventById } from '@/lib/events';
import InvitationCodeForm from '@/components/rsvp/InvitationCodeForm';
import RsvpForm from '@/components/rsvp/RsvpForm';
import { Button } from '@/components/ui/Button';
import { notFound } from 'next/navigation';

interface RsvpEventPageProps {
  params: {
    eventId: string;
  };
  searchParams: {
    code?: string;
  };
}

export async function generateMetadata(
  { params }: RsvpEventPageProps
): Promise<Metadata> {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    return {
      title: 'Event Not Found - Amel & Firza Wedding',
    };
  }
  
  return {
    title: `RSVP for ${event.title} - Amel & Firza Wedding`,
    description: `Respond to your invitation for ${event.title} - part of Amel and Firza's wedding celebrations.`,
  };
}

export default async function RsvpEventPage({ params, searchParams }: RsvpEventPageProps) {
  const { eventId } = params;
  const invitationCode = searchParams.code;
  
  // Get the event details
  const event = await getEventById(eventId);
  
  // If the event doesn't exist, show a 404 page
  if (!event) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/rsvp" className="text-primary hover:underline inline-flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Events
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">RSVP for {event.title}</h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {event.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(event.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location.name}, {event.location.city}
            </div>
          </div>
        </div>
        
        {/* Either show the invitation code form or the RSVP form */}
        {invitationCode ? (
          <RsvpForm eventId={eventId} invitationCode={invitationCode} />
        ) : (
          <InvitationCodeForm eventId={eventId} />
        )}
        
        {/* Event details section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Event Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Location</h3>
              <p className="text-gray-600">{event.location.name}</p>
              <p className="text-gray-600">{event.location.address}</p>
              <p className="text-gray-600">{event.location.city}, {event.location.country} {event.location.zipCode}</p>
            </div>
            
            {event.schedule && event.schedule.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700">Schedule</h3>
                <ul className="space-y-2 mt-2">
                  {event.schedule.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="text-primary font-medium w-16">{item.time}</span>
                      <div>
                        <span className="text-gray-800">{item.activity}</span>
                        {item.description && (
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4">
              <Link href={`/events/${eventId}`}>
                <Button variant="outline" className="mt-2">
                  View More Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 