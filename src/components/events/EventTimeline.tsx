'use client';

import React from 'react';
import { EventScheduleItem } from '@/lib/events';

interface EventTimelineProps {
  scheduleItems: EventScheduleItem[];
}

const EventTimeline: React.FC<EventTimelineProps> = ({ scheduleItems }) => {
  if (!scheduleItems || scheduleItems.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No schedule available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 ml-6"></div>
      
      {/* Timeline Items */}
      <div className="space-y-8">
        {scheduleItems.map((item, index) => (
          <div key={index} className="relative flex items-start ml-2 pl-10">
            {/* Timeline Dot */}
            <div className="absolute left-0 rounded-full w-4 h-4 bg-primary flex items-center justify-center mt-1">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full mb-1 sm:mb-0">
                  {item.time}
                </span>
                <h4 className="text-lg font-medium sm:ml-4">{item.activity}</h4>
              </div>
              
              {item.description && (
                <p className="text-gray-600 mt-1 max-w-2xl">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline; 