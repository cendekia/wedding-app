import React from "react";
import { Metadata } from "next";
import { Dashboard } from "@/components/admin/Dashboard";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin Dashboard | Amel & Firzal Wedding",
  description: "Admin dashboard for Amel & Firzal wedding website",
};

export default function AdminDashboardPage() {
  return (
    <MainLayout>
      <Container className="py-12">
        <Dashboard />
      </Container>
    </MainLayout>
  );
} 