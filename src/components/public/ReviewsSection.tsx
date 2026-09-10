import React from "react";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { reviews } from "@/config/site-data";
import { Reveal } from "./Reveal";

interface ReviewsSectionProps {
  locale?: Locale;
}

/**
 * Témoignages traités comme des colonnes de magazine :
 * un filet, un titre en serif, le texte, la signature. Aucune carte.
 */
export function ReviewsSection({ locale = "fr" }: ReviewsSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section className="border-y border-provence-200 bg-provence-100">
      <div className="shell py-section">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{dict.reviews.label}</p>
            <h2 className="mt-6 font-serif text-display-md text-ink">
              {dict.reviews.title}
            </h2>
          </div>
          <p className="font-sans text-[0.625rem] font-medium uppercase tracking-wideish text-ink-faint sm:text-right">
            {dict.reviews.ratingSummary}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              key={review.id}
              as="article"
              delay={index * 100}
              className="border-t border-provence-300/70 pt-8 md:pr-10 md:last:pr-0 [&:not(:first-child)]:md:pl-10 [&:not(:last-child)]:md:border-r [&:not(:last-child)]:md:border-r-provence-300/70"
            >
              <p className="font-serif text-lg leading-snug text-ink">
                « {review.title} »
              </p>

              <p className="mt-5 text-[0.9375rem] leading-[1.85] text-ink-soft">
                {locale === "fr" ? review.content.fr : review.content.en}
              </p>

              <footer className="mt-7 flex items-baseline gap-3">
                <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink">
                  {review.author}
                </span>
                <span className="h-px flex-1 bg-provence-300/70" aria-hidden />
                <span className="font-sans text-[0.625rem] uppercase tracking-wideish text-ink-faint">
                  {review.date}
                </span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
