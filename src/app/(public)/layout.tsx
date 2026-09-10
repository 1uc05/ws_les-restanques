import React, { Suspense } from "react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-[4.5rem] lg:h-20" />}>
        <Navbar />
      </Suspense>

      <main className="flex-1">{children}</main>

      <Suspense fallback={<div className="h-64 border-t border-provence-200 bg-provence-100" />}>
        <Footer />
      </Suspense>
    </>
  );
}
