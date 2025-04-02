'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Edit, Trash, Copy } from 'lucide-react';
import { getAllGuests, deleteGuest } from '@/lib/admin';
import { Guest } from '@/types/db';

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true);
        const data = await getAllGuests();
        setGuests(data);
        setFilteredGuests(data);
        setError(null);
      } catch (err) {
        setError('Failed to load guest data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = guests.filter(
        guest =>
          guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (guest.email && guest.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (guest.phone && guest.phone.includes(searchTerm)) ||
          guest.invitationCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests(guests);
    }
  }, [searchTerm, guests]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (guestId: string) => {
    setDeleteConfirm(guestId);
  };

  const handleDeleteConfirm = async (guestId: string) => {
    try {
      const success = await deleteGuest(guestId);
      if (success) {
        setGuests(guests.filter(guest => guest.id !== guestId));
        setDeleteConfirm(null);
      } else {
        setError('Failed to delete guest');
      }
    } catch (err) {
      setError('Failed to delete guest');
      console.error(err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const copyInvitationCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Guest Management</h1>
        <Link href="/admin/guests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Guest
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or invitation code..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {loading && <p className="text-center py-8">Loading guests...</p>}
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}

          {!loading && filteredGuests.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No guests match your search criteria."
                : "No guests found. Create a new guest to get started."}
            </p>
          )}

          {!loading && filteredGuests.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Invitation Code
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
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {guest.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {guest.email && (
                            <div>{guest.email}</div>
                          )}
                          {guest.phone && (
                            <div>{guest.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">
                            {guest.invitationCode}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyInvitationCode(guest.invitationCode)}
                            className="h-6 w-6 p-0"
                            title="Copy invitation code"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {deleteConfirm === guest.id ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteConfirm(guest.id)}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleDeleteCancel}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/guests/${guest.id}`}>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Edit guest">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteClick(guest.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              title="Delete guest"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
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
  );
} 