import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import EventMap from '@/components/events/EventMap';
import EventSchedule from '@/components/events/EventSchedule';
import { getEventById } from '@/lib/events';

interface EventPageProps {
  params: {
    eventId: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }
  
  return {
    title: `${event.title} | Wedding Events`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    notFound();
  }
  
  const formattedDate = format(event.date, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(event.date, 'h:mm a');
  
  return (
    <MainLayout>
      <Container className="py-12">
        <Link 
          href="/events" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to All Events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Event Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    event.type === 'CEREMONY' 
                      ? 'bg-blue-100 text-blue-800' 
                      : event.type === 'RECEPTION'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {event.type}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{event.description}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>
            
            {/* Event Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="mb-8">
                <EventSchedule 
                  title={`${event.title} Schedule`}
                  scheduleItems={event.schedule} 
                />
              </div>
            )}
            
            {/* Additional Info or RSVP Section */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">RSVP for this Event</h2>
                  <p className="text-gray-600 mb-4">
                    Please let us know if you'll be joining us for this special occasion.
                  </p>
                  <Link
                    href={`/rsvp?event=${event.id}`}
                    className="inline-block px-6 py-3 bg-primary text-white 
                    rounded-md shadow-md hover:bg-primary/90 transition-colors"
                  >
                    RSVP Now
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Sidebar - Location Map */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Event Location</h2>
            <EventMap location={event.location} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
} 