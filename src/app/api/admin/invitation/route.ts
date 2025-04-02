import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAllInvitations,
  getInvitationById,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} from "@/lib/admin";

// GET handler for retrieving all invitations or a specific invitation
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
    const invitationId = url.searchParams.get("id");

    if (invitationId) {
      // Get specific invitation
      const invitation = await getInvitationById(invitationId);
      if (!invitation) {
        return NextResponse.json(
          { error: "Invitation not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(invitation);
    } else {
      // Get all invitations
      const invitations = await getAllInvitations();
      return NextResponse.json(invitations);
    }
  } catch (error) {
    console.error("Error in invitation GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitations" },
      { status: 500 }
    );
  }
}

// POST handler for creating a new invitation
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
    if (!body.title || !body.guestIds || !body.eventIds) {
      return NextResponse.json(
        { error: "Title, guest IDs, and event IDs are required" },
        { status: 400 }
      );
    }
    
    const invitation = await createInvitation(body);
    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Error in invitation POST handler:", error);
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 }
    );
  }
}

// PUT handler for updating an invitation
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
        { error: "Invitation ID is required" },
        { status: 400 }
      );
    }
    
    const invitation = await updateInvitation(body.id, body);
    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(invitation);
  } catch (error) {
    console.error("Error in invitation PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to update invitation" },
      { status: 500 }
    );
  }
}

// DELETE handler for deleting an invitation
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
    const invitationId = url.searchParams.get("id");
    
    if (!invitationId) {
      return NextResponse.json(
        { error: "Invitation ID is required" },
        { status: 400 }
      );
    }
    
    const success = await deleteInvitation(invitationId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete invitation" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in invitation DELETE handler:", error);
    return NextResponse.json(
      { error: "Failed to delete invitation" },
      { status: 500 }
    );
  }
} 