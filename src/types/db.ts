import {
  User,
  Event,
  Location,
  Guest,
  RSVP,
  Photo,
  RegistryItem,
  Role as PrismaRole,
  EventType as PrismaEventType,
  AttendanceStatus as PrismaAttendanceStatus,
} from '@prisma/client';

// Re-export types from Prisma
export type {
  User,
  Event,
  Location,
  Guest,
  RSVP,
  Photo,
  RegistryItem,
};

// Export enums as values
export const Role = PrismaRole;
export type Role = PrismaRole;

export const EventType = PrismaEventType;
export type EventType = PrismaEventType;

export const AttendanceStatus = PrismaAttendanceStatus;
export type AttendanceStatus = PrismaAttendanceStatus;

// Extended types with relations
export interface EventWithLocation extends Event {
  location: Location;
}

export interface RsvpWithGuestAndEvent extends RSVP {
  guest: Guest;
  event: Event;
}

export interface PhotoWithUploader extends Photo {
  uploadedBy: User;
}

export interface GuestWithRsvps extends Guest {
  rsvps: RSVP[];
}

// Input types for creating/updating records
export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role?: Role;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: Date;
  locationId: string;
  type: EventType;
}

export interface CreateLocationInput {
  name: string;
  address: string;
  city: string;
  zipCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateGuestInput {
  name: string;
  email?: string;
  phone?: string;
  invitationCode: string;
  plusOneAllowed?: boolean;
  dietaryRestrictions?: string;
}

export interface CreateRsvpInput {
  guestId: string;
  eventId: string;
  status: AttendanceStatus;
  numberOfGuests?: number;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface CreatePhotoInput {
  url: string;
  thumbnail: string;
  title?: string;
  description?: string;
  uploadedById: string;
}

export interface CreateRegistryItemInput {
  name: string;
  description?: string;
  price?: number;
  url?: string;
  imageUrl?: string;
  purchased?: boolean;
} 