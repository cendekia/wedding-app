import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAllEventsForAdmin,
  getEventByIdForAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/admin";

// GET handler for retrieving all events or a specific event
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
    const eventId = url.searchParams.get("id");

    if (eventId) {
      // Get specific event
      const event = await getEventByIdForAdmin(eventId);
      if (!event) {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(event);
    } else {
      // Get all events
      const events = await getAllEventsForAdmin();
      return NextResponse.json(events);
    }
  } catch (error) {
    console.error("Error in event GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST handler for creating a new event
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
    if (!body.title || !body.date || !body.location) {
      return NextResponse.json(
        { error: "Title, date, and location are required" },
        { status: 400 }
      );
    }
    
    const event = await createEvent(body);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error in event POST handler:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT handler for updating an event
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
        { error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const event = await updateEvent(body.id, body);
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error in event PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE handler for deleting an event
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
    const eventId = url.searchParams.get("id");
    
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const success = await deleteEvent(eventId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in event DELETE handler:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
} 