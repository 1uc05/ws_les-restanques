import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { attractions } from "@/config/site-data";
import { Reveal } from "./Reveal";

interface RegionTeaserProps {
  locale?: Locale;
}

/**
 * Les alentours, en défilement horizontal.
 * Sur mobile le doigt fait glisser les vignettes : pas de grille à dérouler
 * qui repousserait la réservation trop bas.
 */
export function RegionTeaser({ locale = "fr" }: RegionTeaserProps) {
  const dict = getDictionary(locale);
  const selection = attractions.slice(0, 5);

  return (
    <section className="overflow-hidden bg-provence-50 py-section">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">{dict.region.label}</p>
            <h2 className="mt-6 text-balance font-serif text-display-md text-ink">
              {dict.region.title}
            </h2>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.85] text-ink-soft">
              {dict.region.desc}
            </p>
          </div>

          <Link
            href={`/localisation?lang=${locale}`}
            className="link-underline shrink-0 text-olive-700 hover:text-ink"
          >
            {dict.region.cta}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>

      {/* Rail horizontal : déborde volontairement à droite pour signaler le défilement */}
      <Reveal className="mt-14" delay={80}>
        <div className="mx-auto w-full max-w-editorial">
          <div className="swipe-row gap-5 px-5 pb-2 sm:gap-6 sm:px-8 lg:px-16">
          {selection.map((attraction) => (
            <article
              key={attraction.id}
              className="swipe-item group w-[76vw] max-w-[22rem] sm:w-[20rem] lg:w-[22rem]"
            >
              <div className="photo photo-zoom relative aspect-[4/5]">
                <Image
                  src={attraction.imageUrl}
                  alt={attraction.name}
                  fill
                  sizes="(max-width: 640px) 76vw, 22rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 z-10 bg-scrim-card" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-provence-100/80">
                    {locale === "fr" ? attraction.distance.fr : attraction.distance.en}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-tight text-provence-50">
                    {attraction.name}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                {locale === "fr" ? attraction.description.fr : attraction.description.en}
              </p>
            </article>
          ))}

            {/* Marge de fin pour que la dernière vignette ne colle pas au bord */}
            <div className="swipe-item w-1 sm:w-8 lg:w-16" aria-hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
