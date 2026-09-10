"use client";

import React from "react";
import { Locale, PricingRule } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { calculateStayPrice, PriceBreakdown } from "@/lib/pricing";
import { formatPrice, formatDateRange } from "@/lib/utils";

interface PriceSimulatorProps {
  locale?: Locale;
  checkIn: string | null;
  checkOut: string | null;
  includeCleaning: boolean;
  pricingRules?: PricingRule[];
  onToggleCleaning?: (value: boolean) => void;
}

export function PriceSimulator({
  locale = "fr",
  checkIn,
  checkOut,
  includeCleaning,
  pricingRules,
  onToggleCleaning,
}: PriceSimulatorProps) {
  const dict = getDictionary(locale);
  const t = dict.bookingPage.simulator;
  const nightsLabel = locale === "fr" ? "nuits" : "nights";

  let breakdown: PriceBreakdown | null = null;
  if (checkIn && checkOut) {
    breakdown = calculateStayPrice(checkIn, checkOut, includeCleaning, pricingRules, locale);
  }

  return (
    <div className="bg-provence-100 p-7 lg:p-8">
      <div className="flex items-baseline justify-between border-b border-provence-300/70 pb-4">
        <h3 className="font-serif text-xl text-ink">{t.title}</h3>
        <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-wideish text-olive-700">
          {t.noCommission}
        </span>
      </div>

      {!breakdown ? (
        <p className="py-10 text-center text-sm leading-relaxed text-ink-faint">
          {t.selectDatesPrompt}
        </p>
      ) : (
        <div className="pt-6">
          {!breakdown.isValid && (
            <p className="mb-6 border-l-2 border-terracotta-500 bg-terracotta-50 px-4 py-3 text-xs leading-relaxed text-terracotta-800">
              {breakdown.validationError}
            </p>
          )}

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">{t.datesSelected}</dt>
              <dd className="text-right text-ink">
                {formatDateRange(breakdown.checkIn, breakdown.checkOut, locale)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">{t.nightsCount}</dt>
              <dd className="text-ink tabular-nums">
                {breakdown.numberOfNights} {nightsLabel}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">{t.ratePerNight}</dt>
              <dd className="text-ink tabular-nums">
                {formatPrice(breakdown.averageRatePerNight)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3 border-t border-provence-300/70 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-ink-soft">
                {t.accommodation} · {breakdown.numberOfNights} {nightsLabel}
              </span>
              <span className="text-ink tabular-nums">
                {formatPrice(breakdown.nightsTotal)}
              </span>
            </div>

            <label className="flex cursor-pointer select-none items-center justify-between gap-4">
              <span className="flex items-center gap-3 text-ink-soft">
                <input
                  type="checkbox"
                  checked={includeCleaning}
                  onChange={(e) => onToggleCleaning && onToggleCleaning(e.target.checked)}
                  className="h-4 w-4 accent-olive-700"
                />
                {t.cleaningOption}
              </span>
              <span className="text-ink tabular-nums">{t.cleaningPrice}</span>
            </label>
          </div>

          <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-5">
            <div>
              <span className="block font-serif text-lg text-ink">{t.totalEstimate}</span>
              <span className="mt-1 block font-sans text-[0.5625rem] font-medium uppercase tracking-wideish text-ink-faint">
                {t.linenIncluded}
              </span>
            </div>
            <span className="font-serif text-3xl text-ink tabular-nums">
              {formatPrice(breakdown.totalPrice)}
            </span>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-ink-faint">
            {t.touristTaxNotice}
          </p>
        </div>
      )}
    </div>
  );
}
