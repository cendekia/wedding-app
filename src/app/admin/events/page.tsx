import React from "react";
import { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getAllEventsForAdmin } from "@/lib/admin";
import { Edit, Trash, Plus, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Event Management | Amel & Firzal Wedding",
  description: "Manage events for Amel & Firzal wedding",
};

export default async function EventsManagementPage() {
  const events = await getAllEventsForAdmin();

  return (
    <MainLayout>
      <Container className="py-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Event Management</h1>
            <Link href="/admin/events/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Event
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p>No events found. Create your first event to get started.</p>
                  <Link href="/admin/events/new" className="mt-4 inline-block">
                    <Button size="sm" className="mt-4">
                      Create Event
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {event.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {event.location.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {event.location.address}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/events/${event.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/events/${event.id}/delete`}>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </MainLayout>
  );
} 