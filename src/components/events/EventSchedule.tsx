'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Clock } from 'lucide-react';
import EventTimeline from './EventTimeline';
import { EventScheduleItem } from '@/lib/events';

interface EventScheduleProps {
  title?: string;
  scheduleItems: EventScheduleItem[];
}

const EventSchedule: React.FC<EventScheduleProps> = ({
  title = 'Event Schedule',
  scheduleItems
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Clock className="h-5 w-5 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {scheduleItems && scheduleItems.length > 0 ? (
          <EventTimeline scheduleItems={scheduleItems} />
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500">No schedule available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventSchedule; 