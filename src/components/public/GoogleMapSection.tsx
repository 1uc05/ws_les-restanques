import React from "react";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface GoogleMapSectionProps {
  locale?: Locale;
}

export function GoogleMapSection({ locale = "fr" }: GoogleMapSectionProps) {
  const dict = getDictionary(locale);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapEmbedSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=8+cours+de+la+Liberté,+84490+Saint-Saturnin-lès-Apt,+France`
    : `https://maps.google.com/maps?q=8%20cours%20de%20la%20Libert%C3%A9%2C%2084490%20Saint-Saturnin-l%C3%A8s-Apt&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-provence-200 py-5 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-ink-faint">
            {dict.locationPage.addressLabel}
          </span>
          <span className="mt-2 block font-serif text-lg text-ink">
            {dict.locationPage.addressValue}
          </span>
        </div>

        <a
          href="https://maps.google.com/?q=8+cours+de+la+Libert%C3%A9,+84490+Saint-Saturnin-l%C3%A8s-Apt"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline shrink-0 text-olive-700 hover:text-ink"
        >
          {dict.locationPage.openInMaps}
          <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="relative mt-6 h-[380px] w-full bg-provence-200 sm:h-[460px] lg:h-[520px]">
        <iframe
          src={mapEmbedSrc}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "saturate(0.82) contrast(1.02)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Les Restanques — Saint-Saturnin-lès-Apt"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
