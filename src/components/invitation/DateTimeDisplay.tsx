'use client';

import React from 'react';

interface DateTimeDisplayProps {
  date: Date;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ date }) => {
  // Format the date elements
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  
  // Get day of week
  const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });

  return (
    <div className="text-center mb-6">
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-2 uppercase tracking-wider text-sm">{dayOfWeek}</p>
        <div className="flex items-center justify-center space-x-1 md:space-x-2">
          <div className="text-3xl md:text-4xl font-light">{day}</div>
          <div className="text-xl md:text-2xl mx-1 md:mx-2 text-gray-400">|</div>
          <div className="text-3xl md:text-4xl font-light">{month}</div>
          <div className="text-xl md:text-2xl mx-1 md:mx-2 text-gray-400">|</div>
          <div className="text-3xl md:text-4xl font-light">{year}</div>
        </div>
        <p className="mt-3 text-lg text-gray-600">{time}</p>
        
        {/* Optional countdown if wedding date is in the future */}
        {date > new Date() && (
          <div className="mt-5 text-sm text-gray-500">
            {getCountdownText(date)}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate countdown text
function getCountdownText(targetDate: Date): string {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return '';
  if (diffDays === 1) return 'Tomorrow is the big day!';
  if (diffDays < 7) return `Only ${diffDays} days to go!`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks to go!`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months to go!`;
  
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} to go!`;
}

export default DateTimeDisplay; 