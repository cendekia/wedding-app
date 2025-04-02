// Temporarily disabled for debugging
// import { handlers } from '@/lib/auth';
// export const { GET, POST } = handlers;

export async function GET() {
  return new Response('Auth is temporarily disabled for debugging', { status: 200 });
}

export async function POST() {
  return new Response('Auth is temporarily disabled for debugging', { status: 200 });
} 