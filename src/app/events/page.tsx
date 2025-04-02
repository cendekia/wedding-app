import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout/MainLayout"
import { Container } from "@/components/ui/Container"
import EventCard from "@/components/events/EventCard"
import { getAllEvents } from "@/lib/events"

export const metadata: Metadata = {
  title: "Wedding Ceremonies - Amel & Firzal Wedding",
  description: "Details about the wedding ceremonies of Amel and Firzal",
}

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <MainLayout>
      <Container className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Wedding Ceremonies</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about the different ceremonies that will be part of our wedding celebration.
            We invite you to join us for these special moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative">
              <Link href={`/events/${event.id}`} className="block h-full">
                <EventCard event={event} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </MainLayout>
  )
}
