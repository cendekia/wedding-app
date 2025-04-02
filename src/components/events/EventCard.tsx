'use client';

import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { EventData } from '@/lib/events';

interface EventCardProps {
  event: EventData;
  compact?: boolean;
  showLink?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  compact = false,
  showLink = false
}) => {
  const formattedDate = format(event.date, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(event.date, 'h:mm a');
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className={compact ? 'p-4' : 'p-6'}>
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
        
        <h3 className={`font-semibold ${compact ? 'text-lg' : 'text-xl'} mb-1`}>
          {event.title}
        </h3>
        
        {!compact && (
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        )}
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div>{event.location.name}</div>
              {!compact && (
                <div className="text-gray-500">
                  {event.location.address}, {event.location.city}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {!compact && showLink && (
          <div className="mt-4">
            <span className="text-sm font-medium text-primary">
              View Details
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard; 