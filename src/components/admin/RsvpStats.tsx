'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getRsvpStats } from '@/lib/admin';

interface RsvpStatsDataProps {
  totalInvited: number;
  totalResponded: number;
  totalAttending: number;
  totalDeclined: number;
  byEvent: { eventId: string; title: string; attending: number; declined: number; }[];
}

export function RsvpStats() {
  const [stats, setStats] = useState<RsvpStatsDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getRsvpStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to load RSVP statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RSVP Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8">Loading statistics...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RSVP Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RSVP Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8">No statistics available.</p>
        </CardContent>
      </Card>
    );
  }

  const respondRate = Math.round((stats.totalResponded / stats.totalInvited) * 100) || 0;
  const attendingRate = Math.round((stats.totalAttending / stats.totalResponded) * 100) || 0;
  const declinedRate = Math.round((stats.totalDeclined / stats.totalResponded) * 100) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>RSVP Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-md text-center">
            <div className="text-3xl font-bold">{stats.totalInvited}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Invited</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-md text-center">
            <div className="text-3xl font-bold">{stats.totalResponded}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Responded</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-md text-center">
            <div className="text-3xl font-bold text-green-600">{stats.totalAttending}</div>
            <div className="text-xs text-muted-foreground mt-1">Attending</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-md text-center">
            <div className="text-3xl font-bold text-red-600">{stats.totalDeclined}</div>
            <div className="text-xs text-muted-foreground mt-1">Declined</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Response Rate</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${respondRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{respondRate}% responded</span>
            <span>{stats.totalResponded} of {stats.totalInvited} guests</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Attendance Breakdown</h3>
          <div className="w-full flex h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-4"
              style={{ width: `${attendingRate}%` }}
            ></div>
            <div
              className="bg-red-600 h-4"
              style={{ width: `${declinedRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-600">{attendingRate}% attending</span>
            <span className="text-red-600">{declinedRate}% declined</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Event Breakdown</h3>
          <div className="space-y-4">
            {stats.byEvent.map((event) => (
              <div key={event.eventId} className="border-b pb-3">
                <h4 className="font-medium">{event.title}</h4>
                <div className="mt-2">
                  <div className="w-full flex h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-3"
                      style={{
                        width: `${Math.round(
                          (event.attending / (event.attending + event.declined || 1)) * 100
                        )}%`,
                      }}
                    ></div>
                    <div
                      className="bg-red-600 h-3"
                      style={{
                        width: `${Math.round(
                          (event.declined / (event.attending + event.declined || 1)) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-green-600">
                      {event.attending} attending
                    </span>
                    <span className="text-red-600">
                      {event.declined} declined
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 