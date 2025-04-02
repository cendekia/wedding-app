import React from "react";
import { Metadata } from "next";
import { GuestList } from "@/components/admin/GuestList";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Guest Management | Amel & Firzal Wedding",
  description: "Manage guest list for Amel & Firzal wedding",
};

export default function GuestManagementPage() {
  return (
    <MainLayout>
      <Container className="py-12">
        <GuestList />
      </Container>
    </MainLayout>
  );
} 