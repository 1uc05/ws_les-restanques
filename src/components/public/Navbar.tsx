"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface NavbarProps {
  initialLocale?: Locale;
}

export function Navbar({ initialLocale = "fr" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = (searchParams.get("lang") as Locale) || initialLocale;
  const dict = getDictionary(locale);

  /* L'accueil ouvre sur une photographie plein cadre : la barre s'y pose sans fond. */
  const isOverHero = pathname === "/";
  const isInverted = isOverHero && !isScrolled && !isOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const navLinks = [
    { href: `/le-gite?lang=${locale}`, label: dict.nav.theGite, path: "/le-gite" },
    { href: `/galerie?lang=${locale}`, label: dict.nav.gallery, path: "/galerie" },
    { href: `/localisation?lang=${locale}`, label: dict.nav.location, path: "/localisation" },
    { href: `/contact?lang=${locale}`, label: dict.nav.contact, path: "/contact" },
  ];

  const localeHref = (newLang: Locale) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial",
          isInverted
            ? "border-b border-transparent bg-transparent"
            : "border-b border-provence-200/80 bg-provence-50/92 backdrop-blur-md"
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          {/* Marque */}
          <Link
            href={`/?lang=${locale}`}
            className="group flex shrink-0 flex-col leading-none"
            aria-label="Les Restanques — accueil"
          >
            <span
              className={cn(
                "font-serif text-[1.0625rem] uppercase tracking-[0.2em] transition-colors duration-500 sm:text-lg",
                isInverted ? "text-provence-50" : "text-ink"
              )}
            >
              Les Restanques
            </span>
            <span
              className={cn(
                "mt-1 hidden font-sans text-[0.5625rem] font-medium uppercase tracking-[0.26em] transition-colors duration-500 sm:block",
                isInverted ? "text-provence-100/70" : "text-ink-faint"
              )}
            >
              Luberon · Provence
            </span>
          </Link>

          {/* Navigation — bureau */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.href}
                  className={cn(
                    "relative py-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-wideish transition-colors duration-300",
                    isInverted
                      ? "text-provence-100/85 hover:text-provence-50"
                      : "text-ink-soft hover:text-ink",
                    isActive && (isInverted ? "text-provence-50" : "text-ink")
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-editorial",
                      isInverted ? "bg-provence-50" : "bg-ink",
                      isActive && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-6">
            {/* Langue */}
            <div
              className={cn(
                "hidden items-center gap-2 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish sm:flex",
                isInverted ? "text-provence-100/60" : "text-ink-faint"
              )}
            >
              <Link
                href={localeHref("fr")}
                className={cn(
                  "transition-colors duration-300",
                  locale === "fr"
                    ? isInverted
                      ? "text-provence-50"
                      : "text-ink"
                    : "hover:opacity-80"
                )}
              >
                FR
              </Link>
              <span aria-hidden className={isInverted ? "opacity-40" : "opacity-50"}>
                /
              </span>
              <Link
                href={localeHref("en")}
                className={cn(
                  "transition-colors duration-300",
                  locale === "en"
                    ? isInverted
                      ? "text-provence-50"
                      : "text-ink"
                    : "hover:opacity-80"
                )}
              >
                EN
              </Link>
            </div>

            <Link
              href={`/reservation?lang=${locale}`}
              className={cn(
                "inline-flex h-9 items-center rounded-sm px-4 font-sans text-[0.5625rem] font-semibold uppercase tracking-wideish transition-all duration-300 ease-editorial sm:h-10 sm:px-6 sm:text-[0.625rem]",
                isInverted
                  ? "border border-provence-50/50 text-provence-50 hover:border-provence-50 hover:bg-provence-50/10"
                  : "bg-olive-700 text-provence-50 hover:bg-olive-800"
              )}
            >
              {dict.nav.checkAvailability}
            </Link>

            {/* Bouton menu — mobile */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={cn(
                "-mr-2 flex h-10 w-10 items-center justify-center lg:hidden",
                isInverted ? "text-provence-50" : "text-ink"
              )}
              aria-label={isOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={isOpen}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-6 bg-current transition-all duration-400 ease-editorial",
                    isOpen ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-6 bg-current transition-all duration-400 ease-editorial",
                    isOpen ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Panneau mobile plein écran */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-provence-50 transition-opacity duration-400 ease-editorial lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex flex-1 flex-col justify-center px-8 pb-16 pt-24">
          <nav className="flex flex-col">
            {[{ href: `/?lang=${locale}`, label: dict.nav.home, path: "/" }, ...navLinks].map(
              (link, index) => (
                <Link
                  key={link.path}
                  href={link.href}
                  className="border-b border-provence-200 py-5 font-serif text-[1.75rem] text-ink transition-colors duration-300 hover:text-olive-700"
                  style={{
                    transitionDelay: isOpen ? `${80 + index * 45}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "none" : "translateY(12px)",
                    transitionProperty: "opacity, transform, color",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-10 space-y-6">
            <Link
              href={`/reservation?lang=${locale}`}
              className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-olive-700 font-sans text-[0.6875rem] font-semibold uppercase tracking-wideish text-provence-50"
            >
              {dict.nav.bookStay}
            </Link>

            <div className="flex items-center gap-3 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
              <Link href={localeHref("fr")} className={locale === "fr" ? "text-ink" : undefined}>
                Français
              </Link>
              <span aria-hidden className="opacity-50">
                /
              </span>
              <Link href={localeHref("en")} className={locale === "en" ? "text-ink" : undefined}>
                English
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
