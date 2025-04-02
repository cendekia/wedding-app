import { prisma } from '@/lib/db';
import { Event, Guest, RSVP, EventWithLocation, AttendanceStatus, EventType, Location } from '@/types/db';

// Define the Invitation interface
interface Invitation {
  id: string;
  title: string;
  message: string;
  guestIds: string[];
  eventIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Guest Management
export async function getAllGuests(): Promise<Guest[]> {
  // In production, this would fetch from the database
  return getMockGuests();
}

export async function getGuestById(id: string): Promise<Guest | null> {
  const guests = await getAllGuests();
  return guests.find(guest => guest.id === id) || null;
}

export async function createGuest(guestData: Omit<Guest, 'id'>): Promise<Guest> {
  // In production, this would create a guest in the database
  return {
    id: `guest-${Date.now()}`,
    ...guestData
  };
}

export async function updateGuest(id: string, guestData: Partial<Guest>): Promise<Guest | null> {
  // In production, this would update a guest in the database
  const guest = await getGuestById(id);
  if (!guest) return null;
  
  return {
    ...guest,
    ...guestData,
  };
}

export async function deleteGuest(id: string): Promise<boolean> {
  // In production, this would delete a guest from the database
  return true;
}

// Event Management
export async function getAllEventsForAdmin(): Promise<EventWithLocation[]> {
  // In production, this would fetch from the database with more details
  return getMockEvents();
}

export async function getEventByIdForAdmin(id: string): Promise<Event | null> {
  const events = await getAllEventsForAdmin();
  return events.find(event => event.id === id) || null;
}

export async function createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
  // In production, this would create an event in the database
  return {
    id: `event-${Date.now()}`,
    ...eventData
  };
}

export async function updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
  // In production, this would update an event in the database
  const event = await getEventByIdForAdmin(id);
  if (!event) return null;
  
  return {
    ...event,
    ...eventData,
  };
}

export async function deleteEvent(id: string): Promise<boolean> {
  // In production, this would delete an event from the database
  return true;
}

// Invitation Management
export async function getAllInvitations(): Promise<Invitation[]> {
  // In production, this would fetch from the database
  return getMockInvitations();
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
  const invitations = await getAllInvitations();
  return invitations.find(invitation => invitation.id === id) || null;
}

export async function createInvitation(invitationData: Omit<Invitation, 'id'>): Promise<Invitation> {
  // In production, this would create an invitation in the database
  return {
    id: `invitation-${Date.now()}`,
    ...invitationData
  };
}

export async function updateInvitation(id: string, invitationData: Partial<Invitation>): Promise<Invitation | null> {
  // In production, this would update an invitation in the database
  const invitation = await getInvitationById(id);
  if (!invitation) return null;
  
  return {
    ...invitation,
    ...invitationData,
  };
}

export async function deleteInvitation(id: string): Promise<boolean> {
  // In production, this would delete an invitation from the database
  return true;
}

// RSVP Statistics
export async function getRsvpStats(): Promise<{
  totalInvited: number;
  totalResponded: number;
  totalAttending: number;
  totalDeclined: number;
  byEvent: { eventId: string; title: string; attending: number; declined: number; }[];
}> {
  const guests = await getAllGuests();
  const events = await getAllEventsForAdmin();
  const rsvps = getMockRsvps();
  
  const totalInvited = guests.length;
  const totalResponded = new Set(rsvps.map(rsvp => rsvp.guestId)).size;
  const totalAttending = rsvps.filter(rsvp => rsvp.status === AttendanceStatus.ATTENDING).length;
  const totalDeclined = rsvps.filter(rsvp => rsvp.status === AttendanceStatus.NOT_ATTENDING).length;
  
  const byEvent = events.map(event => {
    const eventRsvps = rsvps.filter(rsvp => rsvp.eventId === event.id);
    return {
      eventId: event.id,
      title: event.title,
      attending: eventRsvps.filter(rsvp => rsvp.status === AttendanceStatus.ATTENDING).length,
      declined: eventRsvps.filter(rsvp => rsvp.status === AttendanceStatus.NOT_ATTENDING).length,
    };
  });
  
  return {
    totalInvited,
    totalResponded,
    totalAttending,
    totalDeclined,
    byEvent,
  };
}

// Mock Data
function getMockGuests(): Guest[] {
  return [
    {
      id: 'guest-1',
      name: 'Ahmad Firdaus',
      email: 'ahmad@example.com',
      phone: '+60123456789',
      invitationCode: 'ABC123',
      plusOneAllowed: true,
      dietaryRestrictions: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 'guest-2',
      name: 'Nurul Hidayah',
      email: 'nurul@example.com',
      phone: '+60187654321',
      invitationCode: 'DEF456',
      plusOneAllowed: true,
      dietaryRestrictions: null,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 'guest-3',
      name: 'Mohammed Ismail',
      email: 'ismail@example.com',
      phone: '+60193334444',
      invitationCode: 'GHI789',
      plusOneAllowed: false,
      dietaryRestrictions: 'Vegetarian',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ];
}

function getMockEvents(): EventWithLocation[] {
  const locations: Location[] = [
    {
      id: 'location-1',
      name: 'Masjid Al-Hikmah',
      address: '123 Jalan Masjid, Kuala Lumpur',
      city: 'Kuala Lumpur',
      zipCode: '50000',
      country: 'Malaysia',
      latitude: 3.1390,
      longitude: 101.6869,
    },
    {
      id: 'location-2',
      name: 'Grand Ballroom, Islamic Center',
      address: '456 Jalan Sultan, Kuala Lumpur',
      city: 'Kuala Lumpur',
      zipCode: '50100',
      country: 'Malaysia',
      latitude: 3.1421,
      longitude: 101.6932,
    }
  ];

  return [
    {
      id: 'event-1',
      title: 'Akad Nikah',
      description: 'Islamic marriage ceremony',
      date: new Date('2024-09-15T10:00:00Z'),
      locationId: 'location-1',
      location: locations[0],
      type: EventType.CEREMONY,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 'event-2',
      title: 'Walimatul Urs',
      description: 'Wedding reception',
      date: new Date('2024-09-15T13:00:00Z'),
      locationId: 'location-2',
      location: locations[1],
      type: EventType.RECEPTION,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];
}

function getMockInvitations(): Invitation[] {
  return [
    {
      id: 'invitation-1',
      title: 'Amel & Firzal Wedding',
      message: 'We are pleased to invite you to our wedding ceremony',
      guestIds: ['guest-1', 'guest-2'],
      eventIds: ['event-1', 'event-2'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 'invitation-2',
      title: 'Amel & Firzal Wedding - Family',
      message: 'Dear family, we are honored to invite you to our wedding ceremony',
      guestIds: ['guest-3'],
      eventIds: ['event-1', 'event-2'],
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
  ];
}

function getMockRsvps(): RSVP[] {
  return [
    {
      id: 'rsvp-1',
      guestId: 'guest-1',
      eventId: 'event-1',
      status: AttendanceStatus.ATTENDING,
      numberOfGuests: 2,
      dietaryRestrictions: null,
      notes: 'Looking forward to it!',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: 'rsvp-2',
      guestId: 'guest-1',
      eventId: 'event-2',
      status: AttendanceStatus.ATTENDING,
      numberOfGuests: 2,
      dietaryRestrictions: null,
      notes: null,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: 'rsvp-3',
      guestId: 'guest-2',
      eventId: 'event-1',
      status: AttendanceStatus.NOT_ATTENDING,
      numberOfGuests: 1,
      dietaryRestrictions: null,
      notes: 'Sorry, I can\'t make it to the ceremony.',
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
    {
      id: 'rsvp-4',
      guestId: 'guest-2',
      eventId: 'event-2',
      status: AttendanceStatus.ATTENDING,
      numberOfGuests: 1,
      dietaryRestrictions: 'No seafood',
      notes: null,
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
  ];
} 