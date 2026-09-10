import React from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "./Reveal";

interface CtaFinalProps {
  locale?: Locale;
}

/**
 * Appel final sur aplat olive profond.
 * Le contraste de valeur suffit : ni dégradé, ni ombre, ni motif.
 */
export function CtaFinal({ locale = "fr" }: CtaFinalProps) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-olive-900 text-provence-100">
      <div className="shell py-section">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="font-sans text-eyebrow font-semibold uppercase text-olive-300">
              {dict.ctaFinal.eyebrow}
            </p>
            <h2 className="mt-6 max-w-xl text-balance font-serif text-display-lg text-provence-50">
              {dict.ctaFinal.title}
            </h2>
            <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.85] text-provence-200/80">
              {dict.ctaFinal.desc}
            </p>

            <Link
              href={`/reservation?lang=${locale}`}
              className="mt-10 inline-flex h-[3.25rem] items-center justify-center rounded-sm bg-provence-50 px-9 font-sans text-xs font-semibold uppercase tracking-wideish text-ink transition-colors duration-300 hover:bg-white"
            >
              {dict.ctaFinal.button}
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-4" delay={120}>
            <ul className="border-t border-olive-700/70">
              {dict.ctaFinal.reassurance.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-olive-700/70 py-4 text-sm text-provence-200/85"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
