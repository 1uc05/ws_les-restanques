"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Locale, GalleryCategory } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { galleryImages } from "@/config/site-data";
import { cn } from "@/lib/utils";

interface GalleryViewProps {
  locale?: Locale;
}

type FilterKey = "all" | GalleryCategory;

const FILTERS: FilterKey[] = ["all", "piscine", "exterieur", "interieur", "panorama"];

export function GalleryView({ locale = "fr" }: GalleryViewProps) {
  const dict = getDictionary(locale);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter]
  );

  const active = activeIndex === null ? null : images[activeIndex] ?? null;

  const close = useCallback(() => setActiveIndex(null), []);
  const go = useCallback(
    (step: number) =>
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + step + images.length) % images.length;
      }),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  const countFor = (key: FilterKey) =>
    key === "all"
      ? galleryImages.length
      : galleryImages.filter((image) => image.category === key).length;

  return (
    <div>
      {/* Filtres — liens de lecture, pas de pastilles */}
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3 border-y border-provence-200 py-5">
        {FILTERS.map((key) => {
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setFilter(key);
                setActiveIndex(null);
              }}
              className={cn(
                "group relative font-sans text-[0.625rem] font-semibold uppercase tracking-wideish transition-colors duration-300",
                isActive ? "text-ink" : "text-ink-faint hover:text-ink-soft"
              )}
            >
              {dict.galleryPage.filters[key]}
              <sup className="ml-1.5 font-normal tabular-nums opacity-60">
                {countFor(key)}
              </sup>
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px w-full bg-ink transition-transform duration-500 ease-editorial",
                  isActive ? "scale-x-100" : "scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Grille — un panorama toutes les sept images pour le rythme */}
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {images.map((image, index) => {
          const isWide = index % 7 === 3;
          return (
            <li
              key={image.id}
              className={cn(isWide && "sm:col-span-2 lg:col-span-3")}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block w-full text-left"
              >
                <figure>
                  <div
                    className={cn(
                      "photo photo-zoom relative w-full",
                      isWide ? "aspect-[16/7]" : "aspect-[4/3]"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={locale === "fr" ? image.alt.fr : image.alt.en}
                      fill
                      sizes={
                        isWide
                          ? "(max-width: 640px) 100vw, 92vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 text-[0.8125rem] text-ink-faint transition-colors duration-300 group-hover:text-ink-soft">
                    <span className="tabular-nums opacity-60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {locale === "fr" ? image.caption.fr : image.caption.en}
                  </figcaption>
                </figure>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Visionneuse */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-olive-950/95 animate-fade-in-slow"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "fr" ? "Visionneuse photo" : "Photo viewer"}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-provence-200/70 tabular-nums">
              {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-provence-100 transition-opacity duration-300 hover:opacity-70"
            >
              {dict.galleryPage.close}
            </button>
          </div>

          <div
            className="relative flex-1 cursor-zoom-out"
            onClick={close}
          >
            <Image
              src={active.url}
              alt={locale === "fr" ? active.alt.fr : active.alt.en}
              fill
              priority
              quality={92}
              sizes="100vw"
              className="object-contain p-3 sm:p-8"
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6 px-5 py-5 sm:px-8">
            <p className="max-w-md font-serif text-base text-provence-50 sm:text-lg">
              {locale === "fr" ? active.caption.fr : active.caption.en}
            </p>
            <div className="flex shrink-0 items-center gap-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-provence-100 transition-opacity duration-300 hover:opacity-70"
              >
                ← {dict.galleryPage.previous}
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-provence-100 transition-opacity duration-300 hover:opacity-70"
              >
                {dict.galleryPage.next} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
