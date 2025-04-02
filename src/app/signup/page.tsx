import { SignupForm } from '@/components/auth/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Admin Account | Amel & Firzal Wedding',
  description: 'Register an admin account for the Amel & Firzal wedding website',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Admin Account</h1>
        <p className="text-gray-600 text-center mb-8">Register a new admin account</p>
        <SignupForm />
      </div>
    </div>
  );
} 