import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function AuthLayout({ 
  children, 
  title, 
  description, 
  className 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b py-4">
        <Container>
          <div className="flex justify-center items-center">
            <Link href="/" className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-dancing)' }}>
              Amel & Firzal
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <Container size="sm">
          <div className={cn('w-full max-w-md mx-auto', className)}>
            {children}
          </div>
        </Container>
      </main>

      <footer className="w-full border-t py-4 text-center">
        <Container>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Amel & Firzal
          </p>
        </Container>
      </footer>
    </div>
  );
} 