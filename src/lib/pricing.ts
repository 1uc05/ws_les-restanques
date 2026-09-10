import { PricingRule } from "@/types";
import { siteConfig } from "@/config/site-data";
import { addDays, differenceInCalendarDays, format, getDay, parseISO } from "date-fns";

export interface PriceBreakdown {
  checkIn: string;
  checkOut: string;
  numberOfNights: number;
  averageRatePerNight: number;
  nightsTotal: number;
  cleaningFee: number;
  totalPrice: number;
  isValid: boolean;
  minStayRequired: number;
  validationError?: string;
}

export const defaultPricingRules: PricingRule[] = [
  {
    id: "default-low",
    name: "Basse Saison",
    start_date: "2026-01-01",
    end_date: "2026-04-30",
    price_per_night: 140,
    min_stay_nights: 3,
    allowed_checkin_days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "default-mid-spring",
    name: "Moyenne Saison Printemps",
    start_date: "2026-05-01",
    end_date: "2026-06-30",
    price_per_night: 190,
    min_stay_nights: 4,
    allowed_checkin_days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "default-high",
    name: "Haute Saison Été",
    start_date: "2026-07-01",
    end_date: "2026-08-31",
    price_per_night: 260,
    min_stay_nights: 7,
    allowed_checkin_days: [6], // Samedi uniquement
  },
  {
    id: "default-mid-autumn",
    name: "Moyenne Saison Automne",
    start_date: "2026-09-01",
    end_date: "2026-09-30",
    price_per_night: 190,
    min_stay_nights: 4,
    allowed_checkin_days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "default-low-winter",
    name: "Basse Saison Hiver",
    start_date: "2026-10-01",
    end_date: "2026-12-31",
    price_per_night: 140,
    min_stay_nights: 3,
    allowed_checkin_days: [0, 1, 2, 3, 4, 5, 6],
  },
];

/**
 * Find matching pricing rule for a specific date
 */
export function getRuleForDate(dateStr: string, rules: PricingRule[] = defaultPricingRules): PricingRule {
  const matching = rules.find(
    (rule) => dateStr >= rule.start_date && dateStr <= rule.end_date
  );

  if (matching) return matching;

  // Fallback default rule
  return {
    id: "fallback",
    name: "Tarif Standard",
    start_date: "2026-01-01",
    end_date: "2029-12-31",
    price_per_night: 190,
    min_stay_nights: 4,
    allowed_checkin_days: [0, 1, 2, 3, 4, 5, 6],
  };
}

/**
 * Calculate full price breakdown and validate stay rules
 */
export function calculateStayPrice(
  checkInDate: string | Date,
  checkOutDate: string | Date,
  includeCleaning: boolean = false,
  rules: PricingRule[] = defaultPricingRules,
  locale: "fr" | "en" = "fr"
): PriceBreakdown {
  const checkIn = typeof checkInDate === "string" ? parseISO(checkInDate) : checkInDate;
  const checkOut = typeof checkOutDate === "string" ? parseISO(checkOutDate) : checkOutDate;

  const checkInStr = format(checkIn, "yyyy-MM-dd");
  const checkOutStr = format(checkOut, "yyyy-MM-dd");

  const nights = differenceInCalendarDays(checkOut, checkIn);

  if (nights <= 0) {
    return {
      checkIn: checkInStr,
      checkOut: checkOutStr,
      numberOfNights: 0,
      averageRatePerNight: 0,
      nightsTotal: 0,
      cleaningFee: 0,
      totalPrice: 0,
      isValid: false,
      minStayRequired: 1,
      validationError:
        locale === "fr"
          ? "La date de départ doit être postérieure à la date d'arrivée."
          : "Check-out date must be after check-in date.",
    };
  }

  // Check-in day rule
  const checkInRule = getRuleForDate(checkInStr, rules);
  const checkInDayOfWeek = getDay(checkIn); // 0 = Sunday, 6 = Saturday

  if (!checkInRule.allowed_checkin_days.includes(checkInDayOfWeek)) {
    return {
      checkIn: checkInStr,
      checkOut: checkOutStr,
      numberOfNights: nights,
      averageRatePerNight: checkInRule.price_per_night,
      nightsTotal: 0,
      cleaningFee: 0,
      totalPrice: 0,
      isValid: false,
      minStayRequired: checkInRule.min_stay_nights,
      validationError:
        locale === "fr"
          ? "Sur cette période, les arrivées s'effectuent uniquement le samedi."
          : "During this period, check-ins are allowed on Saturdays only.",
    };
  }

  // Min stay rule
  if (nights < checkInRule.min_stay_nights) {
    return {
      checkIn: checkInStr,
      checkOut: checkOutStr,
      numberOfNights: nights,
      averageRatePerNight: checkInRule.price_per_night,
      nightsTotal: 0,
      cleaningFee: 0,
      totalPrice: 0,
      isValid: false,
      minStayRequired: checkInRule.min_stay_nights,
      validationError:
        locale === "fr"
          ? `Séjour minimum de ${checkInRule.min_stay_nights} nuits requis sur cette période.`
          : `A minimum stay of ${checkInRule.min_stay_nights} nights is required for this period.`,
    };
  }

  // Calculate day-by-day price
  let nightsTotal = 0;
  for (let i = 0; i < nights; i++) {
    const currentNight = addDays(checkIn, i);
    const currentNightStr = format(currentNight, "yyyy-MM-dd");
    const rule = getRuleForDate(currentNightStr, rules);
    nightsTotal += Number(rule.price_per_night);
  }

  const cleaningFee = includeCleaning ? siteConfig.stayRules.cleaningFee : 0;
  const totalPrice = nightsTotal + cleaningFee;
  const averageRate = Math.round(nightsTotal / nights);

  return {
    checkIn: checkInStr,
    checkOut: checkOutStr,
    numberOfNights: nights,
    averageRatePerNight: averageRate,
    nightsTotal,
    cleaningFee,
    totalPrice,
    isValid: true,
    minStayRequired: checkInRule.min_stay_nights,
  };
}
