// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: Location;
  type: 'ceremony' | 'reception' | 'other';
}

export interface Location {
  name: string;
  address: string;
  city: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// RSVP types
export interface RSVP {
  id: string;
  guestId: string;
  eventId: string;
  status: 'attending' | 'not_attending' | 'pending';
  numberOfGuests: number;
  dietaryRestrictions?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery types
export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
  description?: string;
  uploadedAt: Date;
  uploadedBy: string;
} 