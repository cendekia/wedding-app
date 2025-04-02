import React from "react";
import { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getAllInvitations } from "@/lib/admin";
import { Edit, Trash, Plus, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Invitation Management | Amel & Firzal Wedding",
  description: "Manage invitations for Amel & Firzal wedding",
};

export default async function InvitationManagementPage() {
  const invitations = await getAllInvitations();

  return (
    <MainLayout>
      <Container className="py-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Invitation Management</h1>
            <Link href="/admin/invitation/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Invitation
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              {invitations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p>No invitations found. Create your first invitation to get started.</p>
                  <Link href="/admin/invitation/new" className="mt-4 inline-block">
                    <Button size="sm" className="mt-4">
                      Create Invitation
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
                          Invitation
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Guests
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Events
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
                      {invitations.map((invitation) => (
                        <tr key={invitation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {invitation.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Created: {new Date(invitation.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {invitation.guestIds.length} {invitation.guestIds.length === 1 ? 'guest' : 'guests'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {invitation.eventIds.length} {invitation.eventIds.length === 1 ? 'event' : 'events'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/invitation/${invitation.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/invitation/${invitation.id}/delete`}>
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