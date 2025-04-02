'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  getEventByIdForAdmin, 
  createEvent, 
  updateEvent 
} from '@/lib/admin';
import { Event, EventType, Location, EventWithLocation } from '@/types/db';

interface EventEditorProps {
  eventId?: string;
}

export function EventEditor({ eventId }: EventEditorProps) {
  const router = useRouter();
  const isEditMode = !!eventId;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<EventType>(EventType.CEREMONY);
  
  // Location
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationZipCode, setLocationZipCode] = useState('');
  const [locationCountry, setLocationCountry] = useState('Malaysia');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          setLoading(true);
          const event = await getEventByIdForAdmin(eventId) as EventWithLocation;
          
          if (event) {
            setTitle(event.title);
            setDescription(event.description);
            
            const eventDate = new Date(event.date);
            setDate(eventDate.toISOString().split('T')[0]);
            setTime(eventDate.toTimeString().split(' ')[0].substring(0, 5));
            
            setType(event.type);
            setLocationId(event.locationId);
            
            if (event.location) {
              setLocationName(event.location.name);
              setLocationAddress(event.location.address);
              setLocationCity(event.location.city);
              setLocationZipCode(event.location.zipCode || '');
              setLocationCountry(event.location.country);
              setLocationLatitude(event.location.latitude?.toString() || '');
              setLocationLongitude(event.location.longitude?.toString() || '');
            }
          } else {
            setError('Event not found');
          }
        } catch (err) {
          setError('Failed to load event');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [eventId, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validate required fields
      if (!title || !date || !time || !locationName || !locationAddress) {
        setError('Please fill in all required fields');
        setSubmitting(false);
        return;
      }
      
      // Create combined date and time for the event
      const eventDateTime = new Date(`${date}T${time}`);
      
      // Create or get the location first
      const locationData: Partial<Location> = {
        name: locationName,
        address: locationAddress,
        city: locationCity,
        zipCode: locationZipCode || null,
        country: locationCountry,
        latitude: locationLatitude ? parseFloat(locationLatitude) : null,
        longitude: locationLongitude ? parseFloat(locationLongitude) : null,
      };
      
      // In a real app, we would first save the location and get its ID
      // For now, we'll use a mock ID
      const newLocationId = locationId || `location-${Date.now()}`;
      
      const eventData: Partial<Event> = {
        title,
        description,
        date: eventDateTime,
        locationId: newLocationId,
        type,
      };
      
      if (isEditMode && eventId) {
        // Update existing event
        await updateEvent(eventId, eventData);
      } else {
        // Create new event
        await createEvent(eventData as any);
      }
      
      // Redirect to events list
      router.push('/admin/events');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} event`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Event' : 'Create New Event'}</CardTitle>
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
        <CardTitle>{isEditMode ? 'Edit Event' : 'Create New Event'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Event Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title*
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Akad Nikah"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type*
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value as EventType)}
                  required
                >
                  <option value={EventType.CEREMONY}>Ceremony</option>
                  <option value={EventType.RECEPTION}>Reception</option>
                  <option value={EventType.OTHER}>Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the event"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time*
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Location</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name*
                </label>
                <Input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g., Masjid Al-Hidayah"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <Input
                  type="text"
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <Input
                  type="text"
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <Input
                  type="text"
                  value={locationZipCode}
                  onChange={(e) => setLocationZipCode(e.target.value)}
                  placeholder="Postal/Zip code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country*
                </label>
                <Input
                  type="text"
                  value={locationCountry}
                  onChange={(e) => setLocationCountry(e.target.value)}
                  placeholder="Country"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <Input
                  type="text"
                  value={locationLatitude}
                  onChange={(e) => setLocationLatitude(e.target.value)}
                  placeholder="e.g., 3.1390"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <Input
                  type="text"
                  value={locationLongitude}
                  onChange={(e) => setLocationLongitude(e.target.value)}
                  placeholder="e.g., 101.6869"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push('/admin/events')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 