import { RsvpData, GuestData } from './rsvp';

export interface ValidationError {
  field: string;
  message: string;
}

// Validate RSVP data
export function validateRsvp(data: Partial<RsvpData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.guestId) {
    errors.push({ field: 'guestId', message: 'Guest ID is required' });
  }

  if (!data.eventId) {
    errors.push({ field: 'eventId', message: 'Event ID is required' });
  }

  if (!data.status) {
    errors.push({ field: 'status', message: 'Status is required' });
  } else if (!['ATTENDING', 'NOT_ATTENDING', 'PENDING'].includes(data.status)) {
    errors.push({ field: 'status', message: 'Invalid status value' });
  }

  if (data.status === 'ATTENDING' && 
      (data.numberOfGuests === undefined || data.numberOfGuests < 1)) {
    errors.push({ 
      field: 'numberOfGuests', 
      message: 'Number of guests must be at least 1 when attending' 
    });
  }

  if (data.dietaryRestrictions && data.dietaryRestrictions.length > 500) {
    errors.push({ 
      field: 'dietaryRestrictions', 
      message: 'Dietary restrictions should be less than 500 characters' 
    });
  }

  if (data.notes && data.notes.length > 1000) {
    errors.push({ 
      field: 'notes', 
      message: 'Notes should be less than 1000 characters' 
    });
  }

  return errors;
}

// Validate guest data
export function validateGuest(data: Partial<GuestData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email is not valid' });
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is not valid' });
  }

  if (!data.invitationCode) {
    errors.push({ field: 'invitationCode', message: 'Invitation code is required' });
  }

  return errors;
}

// Validate invitation code format
export function validateInvitationCode(code: string): boolean {
  // Basic validation for now - alphanumeric code of 3-10 characters
  return /^[A-Z0-9]{3,10}$/.test(code);
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone format
function validatePhone(phone: string): boolean {
  // Basic validation - allows for international format with + prefix
  // and various common formats (e.g., 123-456-7890, +1 234 567 8901)
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
} 