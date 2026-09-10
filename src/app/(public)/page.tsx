import React from "react";
import { Locale } from "@/types";
import { Hero } from "@/components/public/Hero";
import { HostWord } from "@/components/public/HostWord";
import { Highlights } from "@/components/public/Highlights";
import { TeaserGite } from "@/components/public/TeaserGite";
import { PanoramaBand } from "@/components/public/PanoramaBand";
import { RegionTeaser } from "@/components/public/RegionTeaser";
import { ReviewsSection } from "@/components/public/ReviewsSection";
import { CtaFinal } from "@/components/public/CtaFinal";

interface PageProps {
  searchParams: { lang?: string };
}

export default function HomePage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";

  return (
    <>
      <Hero locale={locale} />
      <HostWord locale={locale} />
      <Highlights locale={locale} />
      <TeaserGite locale={locale} />
      <PanoramaBand locale={locale} />
      <RegionTeaser locale={locale} />
      <ReviewsSection locale={locale} />
      <CtaFinal locale={locale} />
    </>
  );
}
