import { prisma } from './db';

export interface RsvpData {
  id?: string;
  guestId: string;
  eventId: string;
  status: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING';
  numberOfGuests: number;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface GuestData {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  invitationCode: string;
  plusOneAllowed: boolean;
  dietaryRestrictions?: string;
}

// Submit an RSVP
export async function submitRsvp(rsvpData: RsvpData): Promise<RsvpData | null> {
  try {
    // For now, just return the data
    // In a real implementation, we would save to the database
    return {
      ...rsvpData,
      id: rsvpData.id || `rsvp-${Date.now()}`,
    };
    
    // Example of how to save to the database in the future:
    /*
    const rsvp = await prisma.rSVP.upsert({
      where: {
        guestId_eventId: {
          guestId: rsvpData.guestId,
          eventId: rsvpData.eventId,
        },
      },
      update: {
        status: rsvpData.status,
        numberOfGuests: rsvpData.numberOfGuests,
        dietaryRestrictions: rsvpData.dietaryRestrictions,
        notes: rsvpData.notes,
      },
      create: {
        guestId: rsvpData.guestId,
        eventId: rsvpData.eventId,
        status: rsvpData.status,
        numberOfGuests: rsvpData.numberOfGuests,
        dietaryRestrictions: rsvpData.dietaryRestrictions,
        notes: rsvpData.notes,
      },
    });
    
    return rsvp;
    */
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return null;
  }
}

// Get guest by invitation code
export async function getGuestByInvitationCode(code: string): Promise<GuestData | null> {
  try {
    // For now, return mock data if code matches
    const mockGuests = getMockGuests();
    const guest = mockGuests.find(g => g.invitationCode === code);
    return guest || null;
    
    // Example of how to fetch from database in the future:
    /*
    const guest = await prisma.guest.findUnique({
      where: { invitationCode: code },
    });
    
    if (!guest) return null;
    
    return guest;
    */
  } catch (error) {
    console.error(`Error fetching guest with invitation code ${code}:`, error);
    return null;
  }
}

// Check if a guest has already RSVPed for an event
export async function hasRsvpedForEvent(guestId: string, eventId: string): Promise<boolean> {
  try {
    // For now, return mock data
    const mockRsvps = getMockRsvps();
    return mockRsvps.some(r => r.guestId === guestId && r.eventId === eventId);
    
    // Example of how to fetch from database in the future:
    /*
    const rsvp = await prisma.rSVP.findUnique({
      where: {
        guestId_eventId: {
          guestId,
          eventId,
        },
      },
    });
    
    return !!rsvp;
    */
  } catch (error) {
    console.error(`Error checking RSVP status for guest ${guestId} and event ${eventId}:`, error);
    return false;
  }
}

// Get an RSVP
export async function getRsvp(guestId: string, eventId: string): Promise<RsvpData | null> {
  try {
    // For now, return mock data
    const mockRsvps = getMockRsvps();
    const rsvp = mockRsvps.find(r => r.guestId === guestId && r.eventId === eventId);
    return rsvp || null;
    
    // Example of how to fetch from database in the future:
    /*
    const rsvp = await prisma.rSVP.findUnique({
      where: {
        guestId_eventId: {
          guestId,
          eventId,
        },
      },
    });
    
    if (!rsvp) return null;
    
    return rsvp;
    */
  } catch (error) {
    console.error(`Error fetching RSVP for guest ${guestId} and event ${eventId}:`, error);
    return null;
  }
}

// Generate an invitation code
export function generateInvitationCode(length = 6): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return code;
}

// Mock data for development
function getMockGuests(): GuestData[] {
  return [
    {
      id: 'guest-1',
      name: 'Ahmad Firza',
      email: 'ahmad@example.com',
      phone: '+62812345678',
      invitationCode: 'ABC123',
      plusOneAllowed: true,
      dietaryRestrictions: 'Vegetarian',
    },
    {
      id: 'guest-2',
      name: 'Siti Rahma',
      email: 'siti@example.com',
      phone: '+62823456789',
      invitationCode: 'DEF456',
      plusOneAllowed: true,
    },
    {
      id: 'guest-3',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '+62834567890',
      invitationCode: 'GHI789',
      plusOneAllowed: false,
    },
  ];
}

function getMockRsvps(): RsvpData[] {
  return [
    {
      id: 'rsvp-1',
      guestId: 'guest-1',
      eventId: 'event-1',
      status: 'ATTENDING',
      numberOfGuests: 2,
      dietaryRestrictions: 'Vegetarian',
      notes: 'Looking forward to it!',
    },
    {
      id: 'rsvp-2',
      guestId: 'guest-1',
      eventId: 'event-2',
      status: 'ATTENDING',
      numberOfGuests: 2,
    },
    {
      id: 'rsvp-3',
      guestId: 'guest-2',
      eventId: 'event-1',
      status: 'NOT_ATTENDING',
      numberOfGuests: 0,
      notes: 'Sorry, I cannot make it to the ceremony.',
    },
  ];
} 