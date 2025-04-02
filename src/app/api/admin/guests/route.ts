import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
} from "@/lib/admin";

// GET handler for retrieving all guests or a specific guest
export async function GET(
  request: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const guestId = url.searchParams.get("id");

    if (guestId) {
      // Get specific guest
      const guest = await getGuestById(guestId);
      if (!guest) {
        return NextResponse.json(
          { error: "Guest not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(guest);
    } else {
      // Get all guests
      const guests = await getAllGuests();
      return NextResponse.json(guests);
    }
  } catch (error) {
    console.error("Error in guest GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

// POST handler for creating a new guest
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.invitationCode) {
      return NextResponse.json(
        { error: "Name and invitation code are required" },
        { status: 400 }
      );
    }
    
    const guest = await createGuest(body);
    return NextResponse.json(guest, { status: 201 });
  } catch (error) {
    console.error("Error in guest POST handler:", error);
    return NextResponse.json(
      { error: "Failed to create guest" },
      { status: 500 }
    );
  }
}

// PUT handler for updating a guest
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }
    
    const guest = await updateGuest(body.id, body);
    if (!guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(guest);
  } catch (error) {
    console.error("Error in guest PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to update guest" },
      { status: 500 }
    );
  }
}

// DELETE handler for deleting a guest
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const guestId = url.searchParams.get("id");
    
    if (!guestId) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }
    
    const success = await deleteGuest(guestId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete guest" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in guest DELETE handler:", error);
    return NextResponse.json(
      { error: "Failed to delete guest" },
      { status: 500 }
    );
  }
} 