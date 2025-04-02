import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amel & Firzal Wedding',
  description: 'Welcome to our wedding website. Join us to celebrate our special day.',
};

export default function Home() {
  return (
    <MainLayout>
      <div className="py-12">
        <Container>
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary" style={{ fontFamily: 'var(--font-dancing)' }}>
              Amel &amp; Firzal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl">
              With Allah's grace and blessings, we invite you to share in our joy as we unite in marriage
            </p>
            <p className="text-lg text-muted-foreground">
              Join us on <span className="font-medium">September 15, 2024</span>
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/rsvp">
                <Button
                  size="lg"
                  className="rounded-full"
                >
                  RSVP Now
                </Button>
              </Link>
              <Link href="/invitation">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  View Invitation
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
              <div className="p-6 bg-secondary rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Akad Nikah</h2>
                <p className="text-muted-foreground">
                  Masjid Al-Hikmah<br />
                  10:00 AM - 11:30 AM
                </p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Walimatul Urs</h2>
                <p className="text-muted-foreground">
                  Grand Ballroom, Islamic Center<br />
                  1:00 PM - 5:00 PM
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-8 border border-gray-200 rounded-lg max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">Digital Invitation</h2>
              <p className="text-muted-foreground mb-6">
                View our beautiful digital invitation and share it with your loved ones.
              </p>
              <Link href="/invitation">
                <Button>
                  View Digital Invitation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
