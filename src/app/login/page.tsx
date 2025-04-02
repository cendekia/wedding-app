import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Amel & Firzal Wedding',
  description: 'Login to access the admin dashboard for Amel & Firzal wedding website',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <p className="text-gray-600 text-center mb-8">Access your account</p>
        <LoginForm />
      </div>
    </div>
  );
} 