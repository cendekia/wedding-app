'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import GuestFields from '@/components/rsvp/GuestFields';
import AttendanceOptions from '@/components/rsvp/AttendanceOptions';
import DietaryRestrictions from '@/components/rsvp/DietaryRestrictions';
import NotesField from '@/components/rsvp/NotesField';
import { validateRsvp, validateGuest, ValidationError } from '@/lib/validation';
import { submitRsvp, getGuestByInvitationCode, hasRsvpedForEvent } from '@/lib/rsvp';
import { RsvpData, GuestData } from '@/lib/rsvp';

interface RsvpFormProps {
  eventId: string;
  invitationCode?: string;
  isCheckingInvitation?: boolean;
}

const RsvpForm: React.FC<RsvpFormProps> = ({
  eventId,
  invitationCode = '',
  isCheckingInvitation = false,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    guest?: { [key: string]: string };
    rsvp?: { [key: string]: string };
    general?: string;
  }>({});

  // Guest data state
  const [guestData, setGuestData] = useState<GuestData>({
    name: '',
    email: '',
    phone: '',
    invitationCode: invitationCode,
    plusOneAllowed: false,
  });

  // RSVP data state
  const [rsvpData, setRsvpData] = useState<RsvpData>({
    eventId,
    guestId: '',
    status: 'PENDING',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    notes: '',
  });

  // Max guests allowed
  const [maxGuests, setMaxGuests] = useState(4); // Default max guests

  // Check if this invitation code has been used before
  useEffect(() => {
    if (invitationCode && !isCheckingInvitation) {
      const checkInvitation = async () => {
        try {
          const guest = await getGuestByInvitationCode(invitationCode);
          if (guest) {
            // Pre-fill the form with guest data
            setGuestData({
              name: guest.name,
              email: guest.email || '',
              phone: guest.phone || '',
              invitationCode,
              plusOneAllowed: guest.plusOneAllowed,
              dietaryRestrictions: guest.dietaryRestrictions
            });
            
            // Check if they've already RSVPed for this event
            const hasRsvped = await hasRsvpedForEvent(guest.id || '', eventId);
            if (hasRsvped) {
              // You might want to handle this case differently, like redirecting or showing a message
              setErrors({
                general: "You've already RSVPed for this event. Please contact us if you need to make changes."
              });
            }
            
            // Set the guest ID in the RSVP data
            setRsvpData(prev => ({ 
              ...prev, 
              guestId: guest.id || ''
            }));
            
            // Set max guests based on what's allowed for this invitation
            setMaxGuests(guest.plusOneAllowed ? 2 : 1);
          }
        } catch (error) {
          console.error("Error checking invitation:", error);
        }
      };
      
      checkInvitation();
    }
  }, [invitationCode, eventId, isCheckingInvitation]);

  // Handle submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      // Validate guest data
      const guestValidationErrors = validateGuest(guestData);
      
      // Validate RSVP data
      const rsvpValidationErrors = validateRsvp(rsvpData);
      
      // If there are validation errors, display them and stop
      if (guestValidationErrors.length > 0 || rsvpValidationErrors.length > 0) {
        const formattedErrors: {
          guest?: { [key: string]: string };
          rsvp?: { [key: string]: string };
        } = {};
        
        if (guestValidationErrors.length > 0) {
          formattedErrors.guest = guestValidationErrors.reduce<{ [key: string]: string }>(
            (acc, error: ValidationError) => ({
              ...acc,
              [error.field]: error.message,
            }),
            {}
          );
        }
        
        if (rsvpValidationErrors.length > 0) {
          formattedErrors.rsvp = rsvpValidationErrors.reduce<{ [key: string]: string }>(
            (acc, error: ValidationError) => ({
              ...acc,
              [error.field]: error.message,
            }),
            {}
          );
        }
        
        setErrors(formattedErrors);
        setLoading(false);
        return;
      }
      
      // Submit the RSVP
      const result = await submitRsvp(rsvpData);
      
      // If successful, set submitted state
      if (result) {
        setSubmitted(true);
        // Clear form (optional) or redirect
        // router.push('/thank-you');
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setErrors({
        general: "There was a problem submitting your RSVP. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle field changes
  const handleGuestChange = (field: keyof GuestData, value: string) => {
    setGuestData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors.guest && errors.guest[field]) {
      const newGuestErrors = { ...errors.guest };
      delete newGuestErrors[field];
      setErrors(prev => ({
        ...prev,
        guest: Object.keys(newGuestErrors).length > 0 ? newGuestErrors : undefined
      }));
    }
  };

  const handleRsvpChange = (field: keyof RsvpData, value: any) => {
    setRsvpData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors.rsvp && errors.rsvp[field]) {
      const newRsvpErrors = { ...errors.rsvp };
      delete newRsvpErrors[field];
      setErrors(prev => ({
        ...prev,
        rsvp: Object.keys(newRsvpErrors).length > 0 ? newRsvpErrors : undefined
      }));
    }
  };

  // If the form has been submitted successfully, show a thank you message
  if (submitted) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Thank You!</h2>
        <p className="text-gray-700 mb-6">
          Your RSVP has been submitted successfully. We're looking forward to celebrating with you!
        </p>
        <Button onClick={() => router.push('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {errors.general}
        </div>
      )}
      
      {/* Guest Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Information</h3>
        <GuestFields
          name={guestData.name}
          email={guestData.email || ''}
          phone={guestData.phone || ''}
          onNameChange={(value) => handleGuestChange('name', value)}
          onEmailChange={(value) => handleGuestChange('email', value)}
          onPhoneChange={(value) => handleGuestChange('phone', value)}
          errors={{
            name: errors.guest?.name,
            email: errors.guest?.email,
            phone: errors.guest?.phone,
          }}
          disabled={loading}
        />
      </div>
      
      {/* RSVP Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">RSVP Details</h3>
        <div className="space-y-6">
          <AttendanceOptions
            status={rsvpData.status}
            onStatusChange={(value) => handleRsvpChange('status', value)}
            numberOfGuests={rsvpData.numberOfGuests}
            onNumberOfGuestsChange={(value) => handleRsvpChange('numberOfGuests', value)}
            maxGuests={maxGuests}
            errors={{
              status: errors.rsvp?.status,
              numberOfGuests: errors.rsvp?.numberOfGuests,
            }}
            disabled={loading}
          />
          
          {rsvpData.status === 'ATTENDING' && (
            <>
              <DietaryRestrictions
                value={rsvpData.dietaryRestrictions || ''}
                onChange={(value) => handleRsvpChange('dietaryRestrictions', value)}
                error={errors.rsvp?.dietaryRestrictions}
                disabled={loading}
              />
              
              <NotesField
                value={rsvpData.notes || ''}
                onChange={(value) => handleRsvpChange('notes', value)}
                error={errors.rsvp?.notes}
                disabled={loading}
              />
            </>
          )}
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3"
        >
          {loading ? 'Submitting...' : 'Submit RSVP'}
        </Button>
      </div>
    </form>
  );
};

export default RsvpForm; 