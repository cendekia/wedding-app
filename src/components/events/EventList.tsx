'use client';

import React from 'react';
import EventCard from './EventCard';
import { EventData } from '@/lib/events';

interface EventListProps {
  events: EventData[];
  compact?: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, compact = false }) => {
  if (events.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          compact={compact}
        />
      ))}
    </div>
  );
};

export default EventList; 