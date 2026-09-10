import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { photos } from "@/config/site-data";
import { Reveal } from "./Reveal";

interface TeaserGiteProps {
  locale?: Locale;
}

/**
 * Composition asymétrique en trois images de formats différents,
 * décalées verticalement pour donner le rythme des restanques.
 */
export function TeaserGite({ locale = "fr" }: TeaserGiteProps) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-provence-50 py-section">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Colonne de texte */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start lg:pt-6">
            <p className="eyebrow">{dict.teaserGite.label}</p>

            <h2 className="mt-6 text-balance font-serif text-display-md text-ink">
              {dict.teaserGite.title}
            </h2>

            <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.85] text-ink-soft">
              {dict.teaserGite.desc}
            </p>

            <dl className="mt-10 max-w-md border-t border-provence-200">
              {dict.teaserGite.rooms.map((room) => (
                <div
                  key={room.label}
                  className="flex items-baseline justify-between gap-6 border-b border-provence-200 py-4"
                >
                  <dt className="shrink-0 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
                    {room.label}
                  </dt>
                  <dd className="text-right text-sm text-ink">{room.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/le-gite?lang=${locale}`}
              className="link-underline mt-10 text-olive-700 hover:text-ink"
            >
              {dict.teaserGite.cta}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>

          {/* Composition photographique */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <Reveal className="col-span-8">
                <div className="photo photo-zoom relative aspect-[4/5]">
                  <Image
                    src={photos.sejourMezzanine}
                    alt="La grande pièce de vie et l'escalier de la mezzanine"
                    fill
                    sizes="(max-width: 1024px) 66vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal className="col-span-4 self-end" delay={100}>
                <div className="photo photo-zoom relative aspect-[3/4]">
                  <Image
                    src={photos.chambre1}
                    alt="Chambre du rez-de-chaussée, lit double et tomettes anciennes"
                    fill
                    sizes="(max-width: 1024px) 33vw, 15vw"
                    className="object-cover object-[40%_50%]"
                  />
                </div>
              </Reveal>

              <Reveal className="col-span-12" delay={180}>
                <figure>
                  <div className="photo photo-zoom relative aspect-[16/9]">
                    <Image
                      src={photos.terrassePergola}
                      alt="La terrasse ombragée sous la treille, ouverte sur le jardin"
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover object-[45%_60%]"
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[0.625rem] font-medium uppercase tracking-wideish text-ink-faint">
                    {locale === "fr"
                      ? "La terrasse, de plain-pied avec le séjour"
                      : "The terrace, level with the living room"}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
