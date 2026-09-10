import React from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { photos } from "@/config/site-data";
import { Reveal } from "./Reveal";

interface HostWordProps {
  locale?: Locale;
}

/**
 * Double page de magazine : le texte à gauche, l'image décalée vers le bas
 * à droite, avec un léger chevauchement pour casser la grille.
 */
export function HostWord({ locale = "fr" }: HostWordProps) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-provence-50 py-section">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Texte */}
          <Reveal className="lg:col-span-6 lg:pt-16">
            <p className="eyebrow">{dict.hostWord.label}</p>

            <h2 className="mt-6 max-w-md text-balance font-serif text-display-md text-ink">
              {dict.hostWord.title}
            </h2>

            <blockquote className="relative mt-9 max-w-md border-l border-terracotta-300 pl-6">
              <p className="font-serif text-[1.375rem] italic leading-[1.5] text-ink sm:text-2xl">
                {dict.hostWord.quote}
              </p>
            </blockquote>

            <p className="mt-8 max-w-md text-[0.9375rem] leading-[1.85] text-ink-soft">
              {dict.hostWord.content}
            </p>

            <footer className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-ink/25" aria-hidden />
              <div>
                <span className="block font-serif text-lg text-ink">
                  {dict.hostWord.hostName}
                </span>
                <span className="mt-0.5 block font-sans text-[0.625rem] font-medium uppercase tracking-wideish text-ink-faint">
                  {dict.hostWord.hostRole}
                </span>
              </div>
            </footer>
          </Reveal>

          {/* Image décalée */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <figure className="relative">
              <div className="photo photo-zoom relative aspect-[4/5] w-full sm:aspect-[5/6]">
                <Image
                  src={photos.tableBouquet}
                  alt="Bouquet cueilli au jardin posé sur la table, portes-fenêtres ouvertes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-[58%_50%]"
                />
              </div>
              {/* Cartouche en chevauchement, sans ombre ni verre flouté */}
              <figcaption className="relative -mt-px ml-0 max-w-xs bg-provence-100 px-6 py-5 sm:-mt-10 sm:ml-8">
                <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-ink-faint">
                  Les Restanques
                </span>
                <span className="mt-2 block font-serif text-base leading-snug text-ink">
                  {locale === "fr"
                    ? "Le bouquet du matin, cueilli au jardin"
                    : "The morning bunch, picked from the garden"}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
