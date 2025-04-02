import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Attempt login
    const result = await login(email, password);

    if ('error' in result) {
      return NextResponse.json(
        { message: result.error },
        { status: 401 }
      );
    }

    // Set the token cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 