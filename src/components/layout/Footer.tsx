import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('w-full border-t bg-background py-6', className)}>
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-xl font-bold">
              Amel & Firzal
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them." (Quran 30:21)
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              &copy; {currentYear} Amel & Firzal. Alhamdulillah.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
} 