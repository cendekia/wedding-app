import { prisma } from './db';

export interface InvitationData {
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  date: Date;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    mapUrl?: string;
  };
  eventDetails: {
    title: string;
    description: string;
    dresscode?: string;
  };
  backgroundImage?: string;
  invitationMessage?: string;
}

// Default invitation data for demonstration
export const getDefaultInvitationData = (): InvitationData => {
  return {
    coupleNames: {
      partner1: 'Amel',
      partner2: 'Firza'
    },
    date: new Date('2024-11-12T15:00:00'),
    location: {
      name: 'Grand Ballroom',
      address: 'Jl. Kebon Sirih No. 17',
      city: 'Jakarta',
      country: 'Indonesia',
      mapUrl: 'https://maps.google.com/?q=Grand+Ballroom+Jakarta'
    },
    eventDetails: {
      title: 'Wedding Ceremony & Reception',
      description: 'We invite you to join us in celebrating our special day. The ceremony will be followed by dinner and dancing.',
      dresscode: 'Formal Attire'
    },
    backgroundImage: '/images/wedding-bg.jpg',
    invitationMessage: 'Together with their families'
  };
};

// Get invitation by ID from database
export async function getInvitationById(invitationId: string): Promise<InvitationData | null> {
  try {
    // For now, returning default data
    // In a real implementation, we would fetch from the database
    return getDefaultInvitationData();
    
    // Example of how to fetch from database in the future:
    /*
    const event = await prisma.event.findUnique({
      where: { id: invitationId },
      include: { location: true }
    });
    
    if (!event) return null;
    
    return {
      coupleNames: {
        partner1: 'Amel',
        partner2: 'Saputra',
      },
      date: event.date,
      location: {
        name: event.location.name,
        address: event.location.address,
        city: event.location.city, 
        country: event.location.country,
        mapUrl: `https://maps.google.com/?q=${encodeURIComponent(
          `${event.location.name} ${event.location.address} ${event.location.city}`
        )}`,
      },
      eventDetails: {
        title: event.title,
        description: event.description,
        dresscode: 'Formal Attire', // This would come from event metadata
      },
      backgroundImage: '/images/wedding-bg.jpg',
      invitationMessage: 'Together with their families',
    };
    */
  } catch (error) {
    console.error('Error fetching invitation:', error);
    return null;
  }
}

// Generate a unique invitation code
export function generateInvitationCode(length = 8): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return code;
} 