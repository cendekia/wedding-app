import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await logout();

    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.delete('admin_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
} 