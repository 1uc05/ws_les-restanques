import React from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { photos } from "@/config/site-data";
import { Reveal } from "./Reveal";

interface PanoramaBandProps {
  locale?: Locale;
}

/**
 * Respiration plein cadre au milieu de la page :
 * une image large, une phrase, et l'origine du nom de la maison.
 */
export function PanoramaBand({ locale = "fr" }: PanoramaBandProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative isolate flex min-h-[70vh] supports-[height:100svh]:min-h-[70svh] items-end overflow-hidden bg-olive-950 lg:min-h-[80vh] lg:supports-[height:100svh]:min-h-[80svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={photos.piscineVillage}
          alt="La piscine privée des Restanques au pied du village perché de Saint-Saturnin-lès-Apt"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-[50%_45%]"
          style={{ filter: "saturate(0.92) contrast(1.03)" }}
        />
        <div className="absolute inset-0 bg-scrim-band" />
      </div>

      <div className="shell py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="font-serif text-[1.375rem] leading-[1.55] text-provence-50 text-shadow-photo sm:text-[1.625rem] lg:text-[1.875rem]">
            {dict.panorama.quote}
          </p>
          <p className="mt-6 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-provence-100/75">
            {dict.panorama.attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
