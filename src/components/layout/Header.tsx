'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ui/ThemeToggle';
import { useAppState } from '@/hooks/useAppState';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, userRole } = useAppState();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-card shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-dancing font-bold text-primary dark:text-primary">
              Amel & Firzal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-primary dark:text-primary' 
                  : 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              href="/rsvp"
              className={`text-sm font-medium transition-colors ${
                pathname === '/rsvp' 
                  ? 'text-primary dark:text-primary' 
                  : 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary'
              }`}
            >
              RSVP
            </Link>
            <Link
              href="/gallery"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/gallery') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary'
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/registry"
              className={`text-sm font-medium transition-colors ${
                pathname === '/registry' 
                  ? 'text-primary dark:text-primary' 
                  : 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary'
              }`}
            >
              Registry
            </Link>
            {isAuthenticated && userRole === 'ADMIN' && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/admin') 
                    ? 'text-primary dark:text-primary' 
                    : 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary'
                }`}
              >
                Admin
              </Link>
            )}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={closeMenu}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  pathname === '/' 
                    ? 'bg-accent dark:bg-accent text-primary dark:text-primary' 
                    : 'text-foreground hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent hover:text-primary dark:hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                href="/rsvp"
                onClick={closeMenu}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  pathname === '/rsvp' 
                    ? 'bg-accent dark:bg-accent text-primary dark:text-primary' 
                    : 'text-foreground hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent hover:text-primary dark:hover:text-primary'
                }`}
              >
                RSVP
              </Link>
              <Link
                href="/gallery"
                onClick={closeMenu}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  pathname.startsWith('/gallery') 
                    ? 'bg-accent dark:bg-accent text-primary dark:text-primary' 
                    : 'text-foreground hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent hover:text-primary dark:hover:text-primary'
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/registry"
                onClick={closeMenu}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  pathname === '/registry' 
                    ? 'bg-accent dark:bg-accent text-primary dark:text-primary' 
                    : 'text-foreground hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent hover:text-primary dark:hover:text-primary'
                }`}
              >
                Registry
              </Link>
              {isAuthenticated && userRole === 'ADMIN' && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith('/admin') 
                      ? 'bg-accent dark:bg-accent text-primary dark:text-primary' 
                      : 'text-foreground hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 