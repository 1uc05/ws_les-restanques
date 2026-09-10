import React from "react";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "./Reveal";

interface HighlightsProps {
  locale?: Locale;
}

/**
 * L'essentiel du lieu, en quatre repères séparés par des filets.
 * Pas de carte, pas d'icône vectorielle froide : un numéro et une phrase.
 */
export function Highlights({ locale = "fr" }: HighlightsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="border-y border-provence-200 bg-provence-100">
      <div className="shell py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{dict.essence.label}</p>
          <h2 className="mt-5 font-serif text-display-sm text-ink">
            {dict.essence.title}
          </h2>
        </Reveal>

        <dl className="mt-14 grid grid-cols-1 gap-px border-t border-provence-300/70 sm:grid-cols-2 lg:grid-cols-4">
          {dict.essence.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 90}
              className="border-b border-provence-300/70 py-8 lg:border-b-0 lg:border-r lg:border-provence-300/70 lg:pb-0 lg:pr-8 lg:pt-8 lg:last:border-r-0 [&:not(:first-child)]:lg:pl-8"
            >
              <span
                className="block font-serif text-sm text-terracotta-500"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <dt className="mt-4 font-serif text-xl text-ink">{item.title}</dt>
              <dd className="mt-2.5 max-w-[22ch] text-sm leading-relaxed text-ink-faint">
                {item.desc}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
