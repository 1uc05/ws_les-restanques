import React from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { photos } from "@/config/site-data";
import { PageHeader } from "@/components/public/PageHeader";
import { GoogleMapSection } from "@/components/public/GoogleMapSection";
import { AttractionsGrid } from "@/components/public/AttractionsGrid";
import { Reveal } from "@/components/public/Reveal";
import { CtaFinal } from "@/components/public/CtaFinal";

interface PageProps {
  searchParams: { lang?: string };
}

export default function LocationPage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.locationPage.eyebrow}
        title={dict.locationPage.heroTitle}
        lede={dict.locationPage.heroSubtitle}
      />

      {/* Carte */}
      <section className="shell">
        <GoogleMapSection locale={locale} />
      </section>

      {/* Les environs */}
      <div className="shell py-section">
        <AttractionsGrid locale={locale} />
      </div>

      {/* Bande photographique du village */}
      <Reveal className="relative isolate flex min-h-[50vh] supports-[height:100svh]:min-h-[50svh] items-end overflow-hidden bg-olive-950 lg:min-h-[60vh] lg:supports-[height:100svh]:min-h-[60svh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.saintSaturnin}
            alt="Le village perché de Saint-Saturnin-lès-Apt vu depuis les ruines du château"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-[50%_55%]"
            style={{ filter: "saturate(0.92) contrast(1.03)" }}
          />
          <div className="absolute inset-0 bg-scrim-band" />
        </div>
        <div className="shell py-12">
          <p className="max-w-lg font-serif text-xl leading-snug text-provence-50 text-shadow-photo sm:text-2xl">
            {locale === "fr"
              ? "Saint-Saturnin-lès-Apt, son château en ruine et ses moulins, à trois cents mètres du jardin."
              : "Saint-Saturnin-lès-Apt, its ruined castle and its windmills, three hundred metres from the garden."}
          </p>
        </div>
      </Reveal>

      {/* Accès */}
      <section className="py-section">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{locale === "fr" ? "Pratique" : "Practical"}</p>
              <h2 className="mt-6 font-serif text-display-sm text-ink">
                {dict.locationPage.accessTitle}
              </h2>
              <span className="mt-8 block h-px w-16 bg-terracotta-400/70" aria-hidden />
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-provence-200">
                {dict.locationPage.accessPoints.map((point, index) => (
                  <Reveal
                    key={point.title}
                    delay={index * 80}
                    className="grid grid-cols-1 gap-1 border-b border-provence-200 py-6 sm:grid-cols-12 sm:gap-6"
                  >
                    <dt className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint sm:col-span-4 sm:pt-1">
                      {point.title}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink sm:col-span-8">
                      {point.desc}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal locale={locale} />
    </>
  );
}
