import React from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { amenities, photos, spaces } from "@/config/site-data";
import { PageHeader } from "@/components/public/PageHeader";
import { Reveal } from "@/components/public/Reveal";
import { CtaFinal } from "@/components/public/CtaFinal";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: { lang?: string };
}

export default function GitePage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";
  const dict = getDictionary(locale);

  const practical = [
    { label: locale === "fr" ? "Linge" : "Linen", value: dict.gitePage.inclusions.linen },
    { label: locale === "fr" ? "Ménage" : "Cleaning", value: dict.gitePage.inclusions.cleaning },
    { label: locale === "fr" ? "Parking" : "Parking", value: dict.gitePage.inclusions.parking },
    { label: "Wi-Fi", value: dict.gitePage.inclusions.wifi },
    { label: locale === "fr" ? "Arrivée" : "Check-in", value: dict.gitePage.inclusions.checkInTime },
    { label: locale === "fr" ? "Départ" : "Check-out", value: dict.gitePage.inclusions.checkOutTime },
    { label: locale === "fr" ? "Taxe de séjour" : "Tourist tax", value: dict.gitePage.inclusions.touristTax },
    { label: locale === "fr" ? "Caution" : "Deposit", value: dict.gitePage.inclusions.deposit },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.gitePage.eyebrow}
        title={dict.gitePage.heroTitle}
        lede={dict.gitePage.heroSubtitle}
      />

      {/* Ouverture pleine largeur */}
      <Reveal className="shell">
        <div className="photo relative aspect-[16/9] w-full lg:aspect-[21/9]">
          <Image
            src={photos.jardinPiscine}
            alt="Le jardin d'oliviers descendant vers la piscine des Restanques"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            quality={90}
            className="object-cover object-[50%_60%]"
          />
        </div>
      </Reveal>

      {/* Les espaces, un à un */}
      <section className="py-section">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{dict.gitePage.layoutTitle}</p>
          </Reveal>

          <div className="mt-14 space-y-24 lg:space-y-32">
            {spaces.map((space, index) => {
              const reversed = index % 2 === 1;
              const [lead, second, third] = space.images;

              return (
                <article
                  key={space.id}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10"
                >
                  {/* Bloc texte */}
                  <Reveal
                    className={cn(
                      "lg:col-span-4",
                      reversed ? "lg:order-2 lg:col-start-9" : "lg:order-1"
                    )}
                  >
                    <p className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-terracotta-500">
                      {locale === "fr" ? space.level.fr : space.level.en}
                    </p>
                    <h2 className="mt-5 text-balance font-serif text-display-sm text-ink">
                      {locale === "fr" ? space.title.fr : space.title.en}
                    </h2>
                    <p className="mt-6 text-[0.9375rem] leading-[1.85] text-ink-soft">
                      {locale === "fr" ? space.description.fr : space.description.en}
                    </p>
                    <ul className="mt-8 border-t border-provence-200">
                      {(locale === "fr" ? space.facts.fr : space.facts.en).map((fact) => (
                        <li
                          key={fact}
                          className="border-b border-provence-200 py-3 text-sm text-ink"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* Composition photographique */}
                  <div
                    className={cn(
                      "grid grid-cols-12 gap-4 sm:gap-5 lg:col-span-7",
                      reversed ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-6"
                    )}
                  >
                    <Reveal className="col-span-12" delay={80}>
                      <div className="photo photo-zoom relative aspect-[3/2]">
                        <Image
                          src={lead}
                          alt={locale === "fr" ? space.title.fr : space.title.en}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>

                    <Reveal className="col-span-7" delay={140}>
                      <div className="photo photo-zoom relative aspect-[4/3]">
                        <Image
                          src={second}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 58vw, 32vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>

                    <Reveal className="col-span-5" delay={200}>
                      <div className="photo photo-zoom relative aspect-[3/4] sm:aspect-[4/5]">
                        <Image
                          src={third}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 42vw, 23vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Équipements */}
      <section className="border-y border-provence-200 bg-provence-100">
        <div className="shell py-section">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{dict.gitePage.amenitiesTitle}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((category, index) => (
              <Reveal key={index} delay={index * 80}>
                <h3 className="border-b border-provence-300/70 pb-3 font-serif text-lg text-ink">
                  {locale === "fr" ? category.category.fr : category.category.en}
                </h3>
                <ul className="mt-5 space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-olive-400"
                        aria-hidden
                      />
                      {locale === "fr" ? item.fr : item.en}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bon à savoir */}
      <section className="py-section">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{dict.gitePage.practicalTitle}</p>
              <h2 className="mt-6 font-serif text-display-sm text-ink">
                {dict.gitePage.inclusionsTitle}
              </h2>
              <span className="mt-8 block h-px w-16 bg-terracotta-400/70" aria-hidden />
            </Reveal>

            <Reveal className="lg:col-span-7 lg:col-start-6" delay={100}>
              <dl className="border-t border-provence-200">
                {practical.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-b border-provence-200 py-5 sm:grid-cols-12 sm:gap-6"
                  >
                    <dt className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint sm:col-span-4 sm:pt-1">
                      {row.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink sm:col-span-8">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaFinal locale={locale} />
    </>
  );
}
