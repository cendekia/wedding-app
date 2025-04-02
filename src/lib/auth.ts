import { cookies } from 'next/headers';
import { prisma } from './db';

export async function auth() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    return null;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        token: token.value,
        tokenExpiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user ? { user } : null;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { error: 'Invalid credentials' };
    }

    // Generate a secure token
    const token = crypto.randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        token,
        tokenExpiresAt,
      },
    });

    return { token };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }
}

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');

  if (token) {
    try {
      await prisma.user.updateMany({
        where: {
          token: token.value,
        },
        data: {
          token: null,
          tokenExpiresAt: null,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(password, hashedPassword);
} 