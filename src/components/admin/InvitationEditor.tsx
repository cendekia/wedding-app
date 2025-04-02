'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getAllGuests, getAllEventsForAdmin, getInvitationById, createInvitation, updateInvitation } from '@/lib/admin';
import { Guest, Event } from '@/types/db';

interface InvitationEditorProps {
  invitationId?: string;
}

interface Invitation {
  id: string;
  title: string;
  message: string;
  guestIds: string[];
  eventIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function InvitationEditor({ invitationId }: InvitationEditorProps) {
  const router = useRouter();
  const isEditMode = !!invitationId;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  
  const [guests, setGuests] = useState<Guest[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch guests and events in parallel
        const [guestsData, eventsData] = await Promise.all([
          getAllGuests(),
          getAllEventsForAdmin()
        ]);
        
        setGuests(guestsData);
        setEvents(eventsData);
        
        if (isEditMode) {
          // Fetch invitation data if in edit mode
          const invitation = await getInvitationById(invitationId);
          
          if (invitation) {
            setTitle(invitation.title);
            setMessage(invitation.message);
            setSelectedGuestIds(invitation.guestIds);
            setSelectedEventIds(invitation.eventIds);
          } else {
            setError('Invitation not found');
          }
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [invitationId, isEditMode]);
  
  const handleGuestToggle = (guestId: string) => {
    setSelectedGuestIds((prevSelected) => 
      prevSelected.includes(guestId)
        ? prevSelected.filter(id => id !== guestId)
        : [...prevSelected, guestId]
    );
  };
  
  const handleEventToggle = (eventId: string) => {
    setSelectedEventIds((prevSelected) => 
      prevSelected.includes(eventId)
        ? prevSelected.filter(id => id !== eventId)
        : [...prevSelected, eventId]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validate required fields
      if (!title || selectedGuestIds.length === 0 || selectedEventIds.length === 0) {
        setError('Please fill in all required fields and select at least one guest and event');
        setSubmitting(false);
        return;
      }
      
      const now = new Date();
      
      const invitationData = {
        title,
        message,
        guestIds: selectedGuestIds,
        eventIds: selectedEventIds,
        createdAt: now,
        updatedAt: now,
      };
      
      if (isEditMode) {
        // Update existing invitation
        await updateInvitation(invitationId, invitationData);
      } else {
        // Create new invitation
        await createInvitation(invitationData);
      }
      
      // Redirect to invitations list
      router.push('/admin/invitation');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} invitation`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Invitation' : 'Create New Invitation'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8">Loading...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Invitation' : 'Create New Invitation'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Invitation Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invitation Title*
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Amel & Firzal Wedding"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a personalized message for your invitation"
              />
            </div>
          </div>
          
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-medium">Select Guests*</h3>
            
            {guests.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No guests available. <a href="/admin/guests/new" className="text-primary underline">Create guests</a> first.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {guests.map((guest) => (
                  <div
                    key={guest.id}
                    className={`
                      p-3 rounded-md cursor-pointer border
                      ${selectedGuestIds.includes(guest.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => handleGuestToggle(guest.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedGuestIds.includes(guest.id)}
                        onChange={() => {}} // Handled by onClick on parent div
                      />
                      <div>
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {guest.email || guest.phone || 'No contact information'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-medium">Select Events*</h3>
            
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No events available. <a href="/admin/events/new" className="text-primary underline">Create events</a> first.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`
                      p-3 rounded-md cursor-pointer border
                      ${selectedEventIds.includes(event.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => handleEventToggle(event.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedEventIds.includes(event.id)}
                        onChange={() => {}} // Handled by onClick on parent div
                      />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-8 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/invitation')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || guests.length === 0 || events.length === 0}>
              {submitting
                ? `${isEditMode ? 'Updating' : 'Creating'}...`
                : isEditMode
                ? 'Update Invitation'
                : 'Create Invitation'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 