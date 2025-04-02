import { prisma } from './db';
import { formatISO, parseISO } from 'date-fns';

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
  };
  type: 'CEREMONY' | 'RECEPTION' | 'OTHER';
  schedule?: EventScheduleItem[];
}

export interface EventScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

// Get all events from the database
export async function getAllEvents(): Promise<EventData[]> {
  try {
    // For now, return mock data
    // In a real implementation, we would fetch from the database
    return getMockEvents();
    
    // Example of how to fetch from database in the future:
    /*
    const events = await prisma.event.findMany({
      include: { location: true },
      orderBy: { date: 'asc' },
    });
    
    return events.map(event => formatEventData(event, event.location));
    */
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Get a specific event by ID
export async function getEventById(eventId: string): Promise<EventData | null> {
  try {
    // For now, return mock data if ID matches
    const events = getMockEvents();
    const event = events.find(e => e.id === eventId);
    return event || null;
    
    // Example of how to fetch from database in the future:
    /*
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { location: true },
    });
    
    if (!event) return null;
    
    return formatEventData(event, event.location);
    */
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    return null;
  }
}

// Mock data for development
function getMockEvents(): EventData[] {
  return [
    {
      id: 'event-1',
      title: 'Akad Nikah',
      description: 'Islamic wedding ceremony where the marriage contract is signed.',
      date: new Date('2024-09-15T10:00:00'),
      location: {
        name: 'Masjid Al-Hikmah',
        address: 'Jl. Kebon Sirih No. 23',
        city: 'Jakarta',
        country: 'Indonesia',
        zipCode: '10340',
        latitude: -6.1856,
        longitude: 106.8269,
      },
      type: 'CEREMONY',
      schedule: [
        { time: '09:30', activity: 'Guest Arrival', description: 'Registration and seating' },
        { time: '10:00', activity: 'Ceremony Begins' },
        { time: '10:45', activity: 'Signing of Marriage Contract' },
        { time: '11:15', activity: 'Prayer' },
        { time: '11:30', activity: 'Conclusion' },
      ],
    },
    {
      id: 'event-2',
      title: 'Walimatul Urs',
      description: 'Wedding reception celebrating the marriage with family and friends.',
      date: new Date('2024-09-15T13:00:00'),
      location: {
        name: 'Grand Ballroom, Islamic Center',
        address: 'Jl. Perjuangan No. 15',
        city: 'Jakarta',
        country: 'Indonesia',
        zipCode: '10280',
        latitude: -6.1882,
        longitude: 106.8301,
      },
      type: 'RECEPTION',
      schedule: [
        { time: '13:00', activity: 'Guest Arrival', description: 'Welcome drinks and appetizers' },
        { time: '13:30', activity: 'Opening and Quran Recitation' },
        { time: '14:00', activity: 'Couple Entrance' },
        { time: '14:30', activity: 'Lunch Buffet' },
        { time: '15:30', activity: 'Speeches' },
        { time: '16:00', activity: 'Cake Cutting' },
        { time: '16:30', activity: 'Photo Session' },
        { time: '17:00', activity: 'Conclusion' },
      ],
    },
  ];
}

// Format database event as event data (helper function for future database integration)
function formatEventData(event: any, location: any): EventData {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: {
      name: location.name,
      address: location.address,
      city: location.city,
      country: location.country,
      zipCode: location.zipCode || undefined,
      latitude: location.latitude || undefined,
      longitude: location.longitude || undefined,
    },
    type: event.type,
    // In a real implementation, we would fetch schedule from a separate table or metadata
    schedule: [],
  };
} 