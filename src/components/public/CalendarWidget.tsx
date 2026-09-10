"use client";

import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  startOfToday,
  getDay,
  parseISO,
} from "date-fns";
import { fr, enGB } from "date-fns/locale";
import { Locale, BlockedDate, Booking } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface CalendarWidgetProps {
  locale?: Locale;
  blockedDates?: BlockedDate[];
  pendingBookings?: Booking[];
  selectedCheckIn: string | null; // YYYY-MM-DD
  selectedCheckOut: string | null; // YYYY-MM-DD
  onSelectDates: (checkIn: string | null, checkOut: string | null) => void;
}

export function CalendarWidget({
  locale = "fr",
  blockedDates = [],
  pendingBookings = [],
  selectedCheckIn,
  selectedCheckOut,
  onSelectDates,
}: CalendarWidgetProps) {
  const dict = getDictionary(locale);
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfToday());
  const today = startOfToday();
  const dateLocale = locale === "fr" ? fr : enGB;

  const canGoBack = !isBefore(
    startOfMonth(subMonths(currentMonth, 1)),
    startOfMonth(today)
  );

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    if (canGoBack) setCurrentMonth(subMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Décalage pour une semaine commençant le lundi
  const startDayOfWeek = (getDay(monthStart) + 6) % 7;

  const weekDayNames =
    locale === "fr"
      ? ["L", "M", "M", "J", "V", "S", "D"]
      : ["M", "T", "W", "T", "F", "S", "S"];

  const isDateBlocked = (date: Date): { blocked: boolean; isPending?: boolean } => {
    const dateStr = format(date, "yyyy-MM-dd");

    if (isBefore(date, today)) {
      return { blocked: true };
    }

    const isManualOrAirbnb = blockedDates.some(
      (b) => dateStr >= b.start_date && dateStr < b.end_date
    );
    if (isManualOrAirbnb) return { blocked: true };

    const isPending = pendingBookings.some(
      (p) => dateStr >= p.check_in && dateStr < p.check_out
    );
    if (isPending) return { blocked: true, isPending: true };

    return { blocked: false };
  };

  const handleDateClick = (date: Date) => {
    const { blocked } = isDateBlocked(date);
    if (blocked) return;

    const dateStr = format(date, "yyyy-MM-dd");

    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      onSelectDates(dateStr, null);
    } else if (selectedCheckIn && !selectedCheckOut) {
      if (dateStr <= selectedCheckIn) {
        onSelectDates(dateStr, null);
      } else {
        const checkInDate = parseISO(selectedCheckIn);
        const daysBetween = eachDayOfInterval({ start: checkInDate, end: date });
        const hasBlockedInRange = daysBetween
          .slice(0, -1)
          .some((d) => isDateBlocked(d).blocked);

        if (hasBlockedInRange) {
          onSelectDates(dateStr, null);
        } else {
          onSelectDates(selectedCheckIn, dateStr);
        }
      }
    }
  };

  const legend = [
    { label: dict.bookingPage.calendar.available, className: "border border-provence-300 bg-provence-50" },
    { label: dict.bookingPage.calendar.selected, className: "bg-olive-700" },
    { label: dict.bookingPage.calendar.unavailable, className: "bg-provence-200" },
    { label: dict.bookingPage.calendar.held, className: "bg-sand-300" },
  ];

  return (
    <div>
      {/* En-tête du mois */}
      <div className="flex items-baseline justify-between border-b border-provence-200 pb-5">
        <h3 className="font-serif text-2xl capitalize text-ink">
          {format(currentMonth, "MMMM yyyy", { locale: dateLocale })}
        </h3>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoBack}
            className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-soft transition-colors duration-300 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
            aria-label={dict.bookingPage.calendar.previousMonth}
          >
            ←
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-soft transition-colors duration-300 hover:text-ink"
            aria-label={dict.bookingPage.calendar.nextMonth}
          >
            →
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="mt-6 grid grid-cols-7 text-center font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
        {weekDayNames.map((day, i) => (
          <div key={i} className="pb-3">
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-y-1">
        {[...Array(startDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} className="h-11" />
        ))}

        {daysInMonth.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const { blocked, isPending } = isDateBlocked(day);
          const isStart = selectedCheckIn === dateStr;
          const isEnd = selectedCheckOut === dateStr;
          const isInRange =
            selectedCheckIn &&
            selectedCheckOut &&
            dateStr > selectedCheckIn &&
            dateStr < selectedCheckOut;

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => handleDateClick(day)}
              disabled={blocked}
              className={cn(
                "relative flex h-11 items-center justify-center font-sans text-sm tabular-nums transition-colors duration-200",
                !blocked && "cursor-pointer text-ink hover:bg-olive-100",
                blocked && !isPending && "cursor-not-allowed text-provence-400 line-through",
                isPending && "cursor-not-allowed bg-sand-100 text-sand-700 line-through",
                isInRange && "bg-olive-100 text-ink",
                (isStart || isEnd) && "bg-olive-700 font-semibold text-provence-50 hover:bg-olive-800"
              )}
            >
              {format(day, "d")}
              {(isStart || isEnd) && (
                <span className="absolute -bottom-0 left-0 right-0 text-center font-sans text-[0.4375rem] font-medium uppercase tracking-[0.1em] text-provence-100/85">
                  {isStart
                    ? dict.bookingPage.calendar.arrival
                    : dict.bookingPage.calendar.departure}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-provence-200 pt-5">
        {legend.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 font-sans text-[0.5625rem] font-medium uppercase tracking-wideish text-ink-faint"
          >
            <span className={cn("block h-2.5 w-2.5", item.className)} aria-hidden />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
