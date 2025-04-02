import React from "react";
import { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/Container";
import { EventEditor } from "@/components/admin/EventEditor";

export const metadata: Metadata = {
  title: "Create Event | Amel & Firzal Wedding",
  description: "Create a new event for Amel & Firzal wedding",
};

export default function CreateEventPage() {
  return (
    <MainLayout>
      <Container className="py-12">
        <EventEditor />
      </Container>
    </MainLayout>
  );
} 