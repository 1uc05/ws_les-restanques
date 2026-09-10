import React from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { attractions } from "@/config/site-data";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface AttractionsGridProps {
  locale?: Locale;
}

/**
 * Les environs, en pleine page.
 * La première entrée — le village, à trois cents mètres — occupe deux colonnes :
 * c'est le vrai argument du lieu.
 */
export function AttractionsGrid({ locale = "fr" }: AttractionsGridProps) {
  const dict = getDictionary(locale);

  return (
    <section>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Luberon</p>
        <h2 className="mt-6 text-balance font-serif text-display-md text-ink">
          {dict.locationPage.attractionsTitle}
        </h2>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.85] text-ink-soft">
          {dict.locationPage.attractionsIntro}
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {attractions.map((attraction, index) => {
          const isFeature = index === 0;
          return (
            <Reveal
              key={attraction.id}
              as="article"
              delay={(index % 3) * 90}
              className={cn("group", isFeature && "sm:col-span-2")}
            >
              <div
                className={cn(
                  "photo photo-zoom relative w-full",
                  isFeature ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={attraction.imageUrl}
                  alt={attraction.name}
                  fill
                  sizes={
                    isFeature
                      ? "(max-width: 640px) 100vw, 62vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 31vw"
                  }
                  className="object-cover"
                />
              </div>

              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-terracotta-500">
                  {attraction.kicker
                    ? locale === "fr"
                      ? attraction.kicker.fr
                      : attraction.kicker.en
                    : null}
                </span>
                <span className="h-px flex-1 bg-provence-300/70" aria-hidden />
                <span className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
                  {locale === "fr" ? attraction.distance.fr : attraction.distance.en}
                </span>
              </div>

              <h3
                className={cn(
                  "mt-3 font-serif text-ink",
                  isFeature ? "text-2xl" : "text-xl"
                )}
              >
                {attraction.name}
              </h3>

              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed text-ink-faint",
                  isFeature ? "max-w-xl" : "max-w-[42ch]"
                )}
              >
                {locale === "fr" ? attraction.description.fr : attraction.description.en}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
