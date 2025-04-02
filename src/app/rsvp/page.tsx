import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllEvents } from '@/lib/events';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MainLayout } from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'RSVP - Amel & Firzal Wedding',
  description: 'RSVP for Amel and Firzal\'s wedding events and celebrations',
};

export default async function RsvpPage() {
  // Get all events
  const events = await getAllEvents();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">RSVP to Our Events</h1>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're excited to celebrate our special day with you! Please select an event below to RSVP.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Important Information</h2>
            <div className="prose max-w-none">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Each guest needs to RSVP separately for each event they plan to attend.</li>
                <li>You'll need your invitation code to complete the RSVP process.</li>
                <li>Please let us know of any dietary restrictions or special needs.</li>
                <li>The deadline to RSVP is 2 weeks before each event.</li>
                <li>If you have any questions, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.</li>
              </ul>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  {/* Placeholder image for events */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/events/${event.type.toLowerCase()}.jpg`}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description.slice(0, 100)}...</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <Button className="w-full">
                    <Link href={`/rsvp/${event.id}`} className="w-full flex justify-center">
                      RSVP for this Event
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 