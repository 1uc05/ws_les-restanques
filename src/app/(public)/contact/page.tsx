import React from "react";
import { Locale } from "@/types";
import { ContactForm } from "@/components/public/ContactForm";

interface PageProps {
  searchParams: { lang?: string };
}

export default function ContactPage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";

  return <ContactForm locale={locale} />;
}
