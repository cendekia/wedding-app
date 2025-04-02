'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getRsvpStats } from '@/lib/admin';
import { ChevronRight, Users, Calendar, Mail, BarChart } from 'lucide-react';

interface RsvpStats {
  totalInvited: number;
  totalResponded: number;
  totalAttending: number;
  totalDeclined: number;
  byEvent: { eventId: string; title: string; attending: number; declined: number; }[];
}

export function Dashboard() {
  const [stats, setStats] = useState<RsvpStats | null>(null);
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
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const respondRate = stats ? Math.round((stats.totalResponded / stats.totalInvited) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/guests">
            <Button variant="outline" size="sm">
              Manage Guests
            </Button>
          </Link>
          <Link href="/admin/events">
            <Button variant="outline" size="sm">
              Manage Events
            </Button>
          </Link>
          <Link href="/admin/invitation">
            <Button variant="outline" size="sm">
              Manage Invitations
            </Button>
          </Link>
        </div>
      </div>

      {loading && <p className="text-center py-8">Loading dashboard data...</p>}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {stats && !loading && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Invited
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-3xl font-bold">{stats.totalInvited}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Response Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-3xl font-bold">{respondRate}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.totalResponded} of {stats.totalInvited} responded
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Attending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-3xl font-bold">{stats.totalAttending}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Declined
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-3xl font-bold">{stats.totalDeclined}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Event RSVP Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.byEvent.map((event) => (
                  <div key={event.eventId} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {event.attending + event.declined} responses
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Attending</p>
                        <p className="font-medium text-green-600">{event.attending}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Declined</p>
                        <p className="font-medium text-red-600">{event.declined}</p>
                      </div>
                      <Link href={`/admin/events?id=${event.eventId}`}>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/guests/new">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Guest
                  </Button>
                </Link>
                <Link href="/admin/events/new">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Create New Event
                  </Button>
                </Link>
                <Link href="/admin/invitation/new">
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send New Invitation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
} 