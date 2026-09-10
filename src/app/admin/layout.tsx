import React from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-provence-50 flex flex-col text-olive-950">
      <AdminNavbar />
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}
