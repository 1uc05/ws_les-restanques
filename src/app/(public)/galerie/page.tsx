import React from "react";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/public/PageHeader";
import { GalleryView } from "@/components/public/GalleryView";
import { CtaFinal } from "@/components/public/CtaFinal";

interface PageProps {
  searchParams: { lang?: string };
}

export default function GalleryPage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.galleryPage.eyebrow}
        title={dict.galleryPage.heroTitle}
        lede={dict.galleryPage.heroSubtitle}
      />

      <div className="shell pb-section">
        <GalleryView locale={locale} />
      </div>

      <CtaFinal locale={locale} />
    </>
  );
}
