import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { photos } from "@/config/site-data";

interface HeroProps {
  locale?: Locale;
}

/**
 * Ouverture plein cadre. La photographie porte tout ;
 * la typographie s'y pose sans caisson ni verre flouté.
 */
export function Hero({ locale = "fr" }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative isolate flex min-h-[92vh] supports-[height:100svh]:min-h-[92svh] flex-col justify-end overflow-hidden bg-olive-950">
      {/* Photographie */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={photos.panorama}
          alt="La table du jardin dressée face à la vallée du Luberon, aux Restanques"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="animate-hero-zoom object-cover object-[50%_58%]"
          style={{ filter: "saturate(0.95) contrast(1.03)" }}
        />
        <div className="absolute inset-0 bg-scrim-hero" />
        <div className="absolute inset-0 bg-scrim-hero-side" />
      </div>

      {/* Contenu */}
      <div className="shell pb-16 pt-32 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow-light animate-fade-in">{dict.hero.eyebrow}</p>

          <h1
            className="mt-7 text-balance font-serif text-display-xl text-provence-50 text-shadow-photo opacity-0 animate-fade-in [animation-delay:120ms]"
          >
            {dict.hero.title}
          </h1>

          <p
            className="mt-7 max-w-xl text-pretty text-lede text-provence-50/95 text-shadow-photo opacity-0 animate-fade-in [animation-delay:260ms]"
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="mt-10 flex flex-col gap-3 opacity-0 animate-fade-in sm:flex-row sm:items-center sm:gap-4 [animation-delay:400ms]"
          >
            <Link
              href={`/reservation?lang=${locale}`}
              className="inline-flex h-[3.25rem] items-center justify-center rounded-sm bg-provence-50 px-9 font-sans text-xs font-semibold uppercase tracking-wideish text-ink transition-colors duration-300 hover:bg-white"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/le-gite?lang=${locale}`}
              className="inline-flex h-[3.25rem] items-center justify-center rounded-sm border border-provence-50/45 px-9 font-sans text-xs font-semibold uppercase tracking-wideish text-provence-50 transition-all duration-300 hover:border-provence-50 hover:bg-provence-50/10"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Repères chiffrés, filets fins */}
        <dl
          className="mt-14 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border-t border-provence-50/25 opacity-0 animate-fade-in [animation-delay:540ms]"
        >
          {dict.hero.facts.map((fact) => (
            <div key={fact.label} className="pt-5">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block font-serif text-2xl text-provence-50 sm:text-3xl">
                  {fact.value}
                </span>
                <span className="mt-1.5 block font-sans text-[0.625rem] font-medium uppercase tracking-wideish text-provence-100/85">
                  {fact.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Invitation à descendre */}
      <div className="pointer-events-none absolute bottom-7 right-5 hidden items-center gap-3 sm:right-8 lg:right-16 lg:flex">
        <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-provence-100/70">
          {dict.hero.scrollCue}
        </span>
        <span className="block h-10 w-px animate-scroll-cue bg-provence-50/60" aria-hidden />
      </div>
    </section>
  );
}
