"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale, BlockedDate, Booking, PricingRule } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CalendarWidget } from "./CalendarWidget";
import { PriceSimulator } from "./PriceSimulator";
import { calculateStayPrice } from "@/lib/pricing";
import { formatPrice, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BookingWizardProps {
  locale?: Locale;
  blockedDates?: BlockedDate[];
  pendingBookings?: Booking[];
  pricingRules?: PricingRule[];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function BookingWizard({
  locale = "fr",
  blockedDates = [],
  pendingBookings = [],
  pricingRules,
}: BookingWizardProps) {
  const dict = getDictionary(locale);
  const t = dict.bookingPage.form;
  const nightsLabel = locale === "fr" ? "nuits" : "nights";
  const guestsLabel = locale === "fr" ? "voyageurs" : "guests";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [includeCleaning, setIncludeCleaning] = useState<boolean>(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const priceBreakdown =
    checkIn && checkOut
      ? calculateStayPrice(checkIn, checkOut, includeCleaning, pricingRules, locale)
      : null;

  const handleDatesSelected = (newCheckIn: string | null, newCheckOut: string | null) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!priceBreakdown || !priceBreakdown.isValid) return;
      setStep(2);
    } else if (step === 2) {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
        setErrorMessage(t.errorRequiredFields);
        return;
      }
      setErrorMessage(null);
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceBreakdown || !priceBreakdown.isValid) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        guest_first_name: firstName.trim(),
        guest_last_name: lastName.trim(),
        guest_email: email.trim(),
        guest_phone: phone.trim(),
        guest_message: message.trim() || null,
        guest_locale: locale,
        check_in: priceBreakdown.checkIn,
        check_out: priceBreakdown.checkOut,
        guests_count: guestsCount,
        include_cleaning: includeCleaning,
        total_price: priceBreakdown.totalPrice,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || t.errorGeneric);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Booking submission error:", err);
      setErrorMessage(err.message || t.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------------------------------------- Succès */
  if (isSuccess) {
    return (
      <div className="mx-auto max-w-xl animate-fade-in text-center">
        <span className="mx-auto block h-px w-16 bg-terracotta-400/70" aria-hidden />
        <h2 className="mt-10 font-serif text-display-sm text-ink">{t.successTitle}</h2>
        <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-[1.85] text-ink-soft">
          {t.successMessage}
        </p>

        <dl className="mt-12 border-t border-provence-200 text-left">
          {[
            { label: t.recapLead, value: `${firstName} ${lastName}` },
            {
              label: t.recapDates,
              value: checkIn && checkOut ? formatDateRange(checkIn, checkOut, locale) : "—",
            },
            { label: t.recapGuests, value: `${guestsCount} ${guestsLabel}` },
            {
              label: t.recapTotal,
              value: priceBreakdown ? formatPrice(priceBreakdown.totalPrice) : "—",
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-6 border-b border-provence-200 py-3.5"
            >
              <dt className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
                {row.label}
              </dt>
              <dd className="text-sm text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Button asChild variant="outline" className="mt-10">
          <Link href={`/?lang=${locale}`}>{t.backHome}</Link>
        </Button>
      </div>
    );
  }

  const steps = [t.step1Title, t.step2Title, t.step3Title];

  return (
    <div>
      {/* Fil d'étapes */}
      <ol className="mx-auto grid max-w-2xl grid-cols-3 gap-x-3 border-t border-provence-200">
        {steps.map((label, index) => {
          const number = (index + 1) as 1 | 2 | 3;
          const isCurrent = step === number;
          const isDone = step > number;
          return (
            <li key={label} className="relative pt-4">
              <span
                className={cn(
                  "absolute inset-x-0 -top-px block h-px transition-colors duration-500",
                  isCurrent || isDone ? "bg-olive-700" : "bg-transparent"
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "block font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                  isCurrent ? "text-olive-700" : isDone ? "text-ink-faint" : "text-provence-400"
                )}
              >
                {t.stepLabel} {number}
              </span>
              <span
                className={cn(
                  "mt-1.5 hidden font-serif text-sm transition-colors duration-300 sm:block sm:text-base",
                  isCurrent ? "text-ink" : "text-ink-faint"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Sur mobile, seul le nom de l'étape en cours est affiché */}
      <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-ink sm:hidden">
        {steps[step - 1]}
      </p>

      {errorMessage && (
        <p className="mx-auto mt-10 max-w-2xl border-l-2 border-terracotta-600 bg-terracotta-50 px-5 py-4 text-sm text-terracotta-800">
          {errorMessage}
        </p>
      )}

      {/* Étape 1 — dates */}
      {step === 1 && (
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <CalendarWidget
              locale={locale}
              blockedDates={blockedDates}
              pendingBookings={pendingBookings}
              selectedCheckIn={checkIn}
              selectedCheckOut={checkOut}
              onSelectDates={handleDatesSelected}
            />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <PriceSimulator
              locale={locale}
              checkIn={checkIn}
              checkOut={checkOut}
              includeCleaning={includeCleaning}
              pricingRules={pricingRules}
              onToggleCleaning={setIncludeCleaning}
            />

            <div>
              <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
                {t.guests}
              </span>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestsCount(num)}
                    className={cn(
                      "h-11 flex-1 rounded-sm border font-sans text-sm tabular-nums transition-colors duration-300",
                      guestsCount === num
                        ? "border-olive-700 bg-olive-700 text-provence-50"
                        : "border-provence-300 text-ink-soft hover:border-ink/50 hover:text-ink"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNextStep}
              disabled={!priceBreakdown || !priceBreakdown.isValid}
              size="lg"
              className="w-full"
            >
              {t.continueToDetails}
            </Button>
          </div>
        </div>
      )}

      {/* Étape 2 — coordonnées */}
      {step === 2 && (
        <div className="mx-auto mt-14 max-w-2xl animate-fade-in">
          <h2 className="border-b border-provence-200 pb-5 font-serif text-display-sm text-ink">
            {t.step2Title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-faint">
            {t.detailsIntro}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Field label={`${t.firstName} *`}>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </Field>
            <Field label={`${t.lastName} *`}>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </Field>
            <Field label={`${t.email} *`}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </Field>
            <Field label={`${t.phone} *`}>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
              />
            </Field>
          </div>

          <div className="mt-12 flex flex-col-reverse gap-4 border-t border-provence-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              {t.backToCalendar}
            </Button>
            <Button type="button" onClick={handleNextStep}>
              {t.reviewAndConfirm}
            </Button>
          </div>
        </div>
      )}

      {/* Étape 3 — récapitulatif */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="mx-auto mt-14 max-w-2xl animate-fade-in">
          <h2 className="border-b border-provence-200 pb-5 font-serif text-display-sm text-ink">
            {t.step3Title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-faint">
            {t.recapIntro}
          </p>

          <dl className="mt-10 border-t border-provence-200">
            {[
              {
                label: t.recapDates,
                value:
                  checkIn && checkOut
                    ? `${formatDateRange(checkIn, checkOut, locale)} · ${priceBreakdown?.numberOfNights} ${nightsLabel}`
                    : "—",
              },
              { label: t.recapGuests, value: `${guestsCount} ${guestsLabel}` },
              { label: t.recapLead, value: `${firstName} ${lastName}` },
              { label: t.recapContact, value: `${email} · ${phone}` },
              {
                label: t.recapCleaning,
                value: includeCleaning ? `${t.yes} · 50 €` : t.no,
              },
              {
                label: t.recapTotal,
                value: priceBreakdown ? formatPrice(priceBreakdown.totalPrice) : "—",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 border-b border-provence-200 py-4 sm:grid-cols-12 sm:gap-6"
              >
                <dt className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint sm:col-span-4 sm:pt-1">
                  {row.label}
                </dt>
                <dd className="break-words text-[0.9375rem] text-ink sm:col-span-8">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Field label={t.message}>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                rows={5}
              />
            </Field>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-ink-faint">
            {t.cgvNotice}{" "}
            <Link
              href={`/cgv?lang=${locale}`}
              target="_blank"
              className="border-b border-ink/25 pb-0.5 transition-colors duration-300 hover:border-ink/70 hover:text-ink"
            >
              {t.cgvLink}
            </Link>
            .
          </p>

          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-provence-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              disabled={isSubmitting}
            >
              {t.backToDetails}
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submitButton}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
