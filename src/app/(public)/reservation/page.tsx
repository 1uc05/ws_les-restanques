import React from "react";
import { Locale, BlockedDate, Booking, PricingRule } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BookingWizard } from "@/components/public/BookingWizard";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";
import { defaultPricingRules } from "@/lib/pricing";
import { PageHeader } from "@/components/public/PageHeader";
import { Reveal } from "@/components/public/Reveal";

interface PageProps {
  searchParams: { lang?: string };
}

export const dynamic = "force-dynamic";

async function getBookingData() {
  if (!isSupabaseConfigured()) {
    return {
      blockedDates: mockDb.getBlockedDates(),
      pendingBookings: mockDb.getBookings().filter((b) => b.status === "pending" || b.status === "confirmed"),
      pricingRules: mockDb.getPricingRules(),
    };
  }

  try {
    const supabase = createAdminClient();

    const [blockedRes, bookingsRes, pricingRes] = await Promise.all([
      supabase.from("blocked_dates").select("*"),
      supabase.from("bookings").select("*").in("status", ["pending", "confirmed"]),
      supabase.from("pricing_rules").select("*"),
    ]);

    return {
      blockedDates: (blockedRes.data as BlockedDate[]) || [],
      pendingBookings: (bookingsRes.data as Booking[]) || [],
      pricingRules: (pricingRes.data as PricingRule[]) || defaultPricingRules,
    };
  } catch (error) {
    console.error("Error fetching booking data from Supabase:", error);
    return {
      blockedDates: mockDb.getBlockedDates(),
      pendingBookings: mockDb.getBookings().filter((b) => b.status === "pending" || b.status === "confirmed"),
      pricingRules: defaultPricingRules,
    };
  }
}

export default async function ReservationPage({ searchParams }: PageProps) {
  const locale: Locale = searchParams.lang === "en" ? "en" : "fr";
  const dict = getDictionary(locale);

  const { blockedDates, pendingBookings, pricingRules } = await getBookingData();


  const steps = [
    dict.bookingPage.howItWorks.step1,
    dict.bookingPage.howItWorks.step2,
    dict.bookingPage.howItWorks.step3,
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.bookingPage.eyebrow}
        title={dict.bookingPage.heroTitle}
        lede={dict.bookingPage.heroSubtitle}
      />

      <div className="shell pb-section">
        {/* Comment ça se passe */}
        <Reveal className="border-y border-provence-200 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <p className="eyebrow lg:col-span-3 lg:pt-1">
              {dict.bookingPage.howItWorks.title}
            </p>
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-9">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="shrink-0 font-serif text-sm text-terracotta-500"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Parcours de réservation */}
        <div className="mt-16 lg:mt-20">
          <BookingWizard
            locale={locale}
            blockedDates={blockedDates}
            pendingBookings={pendingBookings}
            pricingRules={pricingRules}
          />
        </div>
      </div>
    </>
  );
}
