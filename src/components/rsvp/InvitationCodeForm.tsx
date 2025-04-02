'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { validateInvitationCode } from '@/lib/validation';
import { getGuestByInvitationCode } from '@/lib/rsvp';

interface InvitationCodeFormProps {
  eventId: string;
  onSuccess?: (invitationCode: string) => void;
}

const InvitationCodeForm: React.FC<InvitationCodeFormProps> = ({
  eventId,
  onSuccess,
}) => {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate the invitation code format
      const isValidFormat = validateInvitationCode(invitationCode);
      if (!isValidFormat) {
        setError('Invitation code should be 3-10 characters and contain only letters and numbers.');
        setLoading(false);
        return;
      }

      // Check if the invitation code exists
      const guest = await getGuestByInvitationCode(invitationCode);
      
      if (!guest) {
        setError('Invalid invitation code. Please check and try again.');
        setLoading(false);
        return;
      }

      // If there's an onSuccess callback, use it
      if (onSuccess) {
        onSuccess(invitationCode);
      } else {
        // Otherwise, redirect to the RSVP form with the code
        router.push(`/rsvp/${eventId}?code=${invitationCode}`);
      }
    } catch (error) {
      console.error('Error validating invitation code:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Your Invitation Code</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-700 mb-1">
            Invitation Code <span className="text-red-500">*</span>
          </label>
          <input
            id="invitationCode"
            type="text"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
            placeholder="Enter your invitation code (e.g., ABC123)"
            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          <p className="mt-1 text-xs text-gray-500">
            You can find your invitation code on your physical invitation card or in the email we sent you.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loading || !invitationCode.trim()}
            className="w-full sm:w-auto px-8 py-3"
          >
            {loading ? 'Verifying...' : 'Continue to RSVP'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvitationCodeForm; 