"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/config/site-data";

interface FooterProps {
  locale?: Locale;
}

export function Footer({ locale: initialLocale = "fr" }: FooterProps) {
  const searchParams = useSearchParams();
  const locale = (searchParams.get("lang") as Locale) || initialLocale;
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: dict.footer.navigation,
      links: [
        { href: `/?lang=${locale}`, label: dict.nav.home },
        { href: `/le-gite?lang=${locale}`, label: dict.nav.theGite },
        { href: `/galerie?lang=${locale}`, label: dict.nav.gallery },
        { href: `/localisation?lang=${locale}`, label: dict.nav.location },
      ],
    },
    {
      title: dict.footer.practical,
      links: [
        { href: `/reservation?lang=${locale}`, label: dict.nav.booking },
        { href: `/contact?lang=${locale}`, label: dict.nav.contact },
        { href: `/cgv?lang=${locale}`, label: dict.footer.cgv },
        { href: `/mentions-legales?lang=${locale}`, label: dict.footer.legalNotice },
      ],
    },
  ];

  return (
    <footer className="border-t border-provence-200 bg-provence-100">
      <div className="shell py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Marque & adresse */}
          <div className="md:col-span-5 lg:col-span-6">
            <span className="block font-serif text-xl uppercase tracking-[0.2em] text-ink">
              Les Restanques
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-faint">
              {dict.footer.tagline}
            </p>

            <address className="mt-8 space-y-1 text-sm not-italic leading-relaxed text-ink-soft">
              <span className="block">{siteConfig.address.street}</span>
              <span className="block">
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-block border-b border-ink/25 pb-0.5 transition-colors duration-300 hover:border-ink/70 hover:text-ink"
              >
                {siteConfig.email}
              </a>
            </address>
          </div>

          {/* Colonnes de liens */}
          {columns.map((column) => (
            <nav key={column.title} className="md:col-span-3 lg:col-span-3">
              <h2 className="font-sans text-eyebrow font-semibold uppercase text-ink-faint">
                {column.title}
              </h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bandeau bas */}
        <div className="mt-16 flex flex-col gap-4 border-t border-provence-300/60 pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Les Restanques. {dict.footer.allRightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{dict.footer.classification}</span>
            <Link
              href="/admin/dashboard"
              className="transition-colors duration-300 hover:text-ink"
            >
              {dict.footer.hostArea}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
