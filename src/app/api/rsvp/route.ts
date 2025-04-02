import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateRsvp, validateGuest } from '@/lib/validation';
import { getGuestByInvitationCode } from '@/lib/rsvp';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { eventId, guestId, status, numberOfGuests, dietaryRestrictions, notes, guestData } = body;

    // Prepare RSVP data
    const rsvpData = {
      eventId,
      guestId,
      status,
      numberOfGuests,
      dietaryRestrictions,
      notes
    };

    // Validate RSVP data
    const rsvpValidationErrors = validateRsvp(rsvpData);
    if (rsvpValidationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: rsvpValidationErrors },
        { status: 400 }
      );
    }

    // If guestId is not provided, we need to handle guest data
    let finalGuestId = guestId;
    
    if (!finalGuestId && guestData) {
      // Validate guest data
      const guestValidationErrors = validateGuest(guestData);
      if (guestValidationErrors.length > 0) {
        return NextResponse.json(
          { error: 'Guest validation failed', details: guestValidationErrors },
          { status: 400 }
        );
      }

      // Check if a guest with this invitation code already exists
      const existingGuest = await getGuestByInvitationCode(guestData.invitationCode);

      if (existingGuest) {
        // Use existing guest
        finalGuestId = existingGuest.id || '';
      } else {
        // Create a new guest
        try {
          const newGuest = await prisma.guest.create({
            data: {
              name: guestData.name,
              email: guestData.email,
              phone: guestData.phone,
              invitationCode: guestData.invitationCode,
              plusOneAllowed: guestData.plusOneAllowed || false,
              dietaryRestrictions: guestData.dietaryRestrictions,
            },
          });
          finalGuestId = newGuest.id;
        } catch (error) {
          console.error('Error creating guest:', error);
          return NextResponse.json(
            { error: 'Failed to create guest' },
            { status: 500 }
          );
        }
      }
    }

    // Make sure we have a guest ID
    if (!finalGuestId) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      );
    }

    // Create or update the RSVP
    try {
      const rsvp = await prisma.rSVP.upsert({
        where: {
          guestId_eventId: {
            guestId: finalGuestId,
            eventId: eventId,
          },
        },
        update: {
          status,
          numberOfGuests,
          dietaryRestrictions,
          notes,
        },
        create: {
          guestId: finalGuestId,
          eventId,
          status,
          numberOfGuests,
          dietaryRestrictions,
          notes,
        },
      });

      return NextResponse.json(rsvp, { status: 200 });
    } catch (error) {
      console.error('Error creating/updating RSVP:', error);
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const guestId = searchParams.get('guestId');
    const invitationCode = searchParams.get('invitationCode');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // If invitation code is provided, get the guest first
    let finalGuestId = guestId;
    if (!finalGuestId && invitationCode) {
      const guest = await getGuestByInvitationCode(invitationCode);
      if (guest && guest.id) {
        finalGuestId = guest.id;
      }
    }

    if (!finalGuestId) {
      return NextResponse.json(
        { error: 'Guest ID or invitation code is required' },
        { status: 400 }
      );
    }

    // Fetch the RSVP
    const rsvp = await prisma.rSVP.findUnique({
      where: {
        guestId_eventId: {
          guestId: finalGuestId,
          eventId: eventId,
        },
      },
      include: {
        guest: {
          select: {
            name: true,
            email: true,
            phone: true,
            invitationCode: true,
            plusOneAllowed: true,
            dietaryRestrictions: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
      },
    });

    if (!rsvp) {
      return NextResponse.json(
        { error: 'RSVP not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rsvp, { status: 200 });
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 