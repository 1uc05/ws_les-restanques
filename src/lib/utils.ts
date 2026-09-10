import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge ne connaît que l'échelle de tailles par défaut : sans cet
 * enregistrement, il prend `text-display-lg` pour une couleur et l'écrase
 * silencieusement avec le `text-ink` qui suit. On lui déclare donc nos tailles
 * personnalisées (voir `fontSize` dans tailwind.config.ts).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display-xl", "display-lg", "display-md", "display-sm", "eyebrow", "lede"],
        },
      ],
      tracking: [{ tracking: ["eyebrow", "wideish"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
  locale: "fr" | "en" = "fr"
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const loc = locale === "fr" ? "fr-FR" : "en-GB";
  return `${start.toLocaleDateString(loc, options)} — ${end.toLocaleDateString(loc, options)}`;
}
