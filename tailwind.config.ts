import type { Config } from "tailwindcss";

/**
 * Les Restanques — Design System "Provence Minérale"
 * ------------------------------------------------------------------
 * Editorial / Soft-Provence / Intimate.
 * Palette végétale et minérale : calcaire, olivier, terre cuite, sable,
 * touche de lavande grisée. Aucun blanc pur, aucun gris froid.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "4rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        /* Encre — vert-anthracite profond, jamais de noir pur */
        ink: {
          DEFAULT: "#22251F",
          soft: "#4A4E42",
          faint: "#77786B",
        },

        /* Calcaire / lin / papier — fonds et respirations */
        provence: {
          50: "#FBF9F5",
          100: "#F5F1E8",
          200: "#EBE5D8",
          300: "#DCD4C2",
          400: "#C3B9A2",
          500: "#A69B82",
          600: "#877D66",
          700: "#6A614E",
          800: "#4C4639",
          900: "#332F26",
        },

        /* Olivier — couleur primaire, CTA, accents structurels */
        olive: {
          50: "#F6F7F0",
          100: "#EAECDC",
          200: "#D5DABB",
          300: "#BCC494",
          400: "#A0AB6E",
          500: "#848F51",
          600: "#68723E",
          700: "#586033",
          800: "#454B2A",
          900: "#2F3323",
          950: "#1C1F14",
        },

        /* Terre cuite — accent rare, détails patrimoniaux */
        terracotta: {
          50: "#FBF3EE",
          100: "#F5E4D9",
          200: "#EBC9B5",
          300: "#DCA88C",
          400: "#C98A6A",
          500: "#B17A5E",
          600: "#9C684D",
          700: "#805037",
          800: "#663F2C",
          900: "#4A2E20",
        },

        /* Sable solaire — fonds secondaires, surlignages doux */
        sand: {
          50: "#FCF8F1",
          100: "#F8F0E1",
          200: "#F0E1C6",
          300: "#E5CDA3",
          400: "#D9B382",
          500: "#C79A63",
          600: "#AC7F4C",
          700: "#8A653D",
          800: "#684C2E",
          900: "#4A3722",
        },

        /* Lavande grisée — très pâle, jamais saturée */
        lavender: {
          50: "#FAF9FB",
          100: "#F2F0F5",
          200: "#E6E2EC",
          300: "#D3CCDD",
          400: "#B9AECB",
          500: "#9E90B4",
          600: "#82739A",
          700: "#685C7B",
          800: "#4E4559",
          900: "#352F3C",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Montserrat", "Helvetica Neue", "sans-serif"],
      },

      fontSize: {
        /* Échelle éditoriale — titres fins et généreux */
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(1.875rem, 3.4vw, 2.75rem)", { lineHeight: "1.14", letterSpacing: "-0.012em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.22", letterSpacing: "-0.008em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.22em" }],
        lede: ["clamp(1.0625rem, 1.4vw, 1.25rem)", { lineHeight: "1.75" }],
      },

      letterSpacing: {
        eyebrow: "0.22em",
        wideish: "0.12em",
      },

      /* Angles à peine adoucis — pierre taillée, pas de pilules */
      borderRadius: {
        none: "0",
        sm: "1px",
        DEFAULT: "2px",
        md: "3px",
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
        "3xl": "10px",
      },

      spacing: {
        section: "clamp(4.5rem, 10vw, 9rem)",
        "section-lg": "clamp(6rem, 14vw, 12rem)",
      },

      maxWidth: {
        prose: "62ch",
        editorial: "1360px",
      },

      boxShadow: {
        /* Ombres ambiantes très diffuses, teintées d'encre */
        soft: "0 1px 2px rgba(34,37,31,0.04), 0 8px 24px -12px rgba(34,37,31,0.10)",
        lift: "0 2px 4px rgba(34,37,31,0.05), 0 18px 44px -20px rgba(34,37,31,0.18)",
        float: "0 -1px 0 rgba(34,37,31,0.05), 0 -12px 40px -16px rgba(34,37,31,0.16)",
      },

      backgroundImage: {
        "scrim-hero":
          "linear-gradient(180deg, rgba(28,31,20,0.52) 0%, rgba(28,31,20,0.18) 32%, rgba(28,31,20,0.30) 62%, rgba(28,31,20,0.72) 100%)",
        /* Voile latéral : assombrit le côté du texte, laisse la vue respirer à droite */
        "scrim-hero-side":
          "linear-gradient(100deg, rgba(28,31,20,0.58) 0%, rgba(28,31,20,0.34) 38%, rgba(28,31,20,0.05) 68%, rgba(28,31,20,0) 88%)",
        "scrim-band":
          "linear-gradient(180deg, rgba(28,31,20,0.15) 0%, rgba(28,31,20,0.55) 100%)",
        "scrim-card":
          "linear-gradient(180deg, rgba(28,31,20,0) 40%, rgba(28,31,20,0.68) 100%)",
      },

      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-zoom": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(7px)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in-slow": "fade-in-slow 1.2s ease-out forwards",
        rise: "rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "hero-zoom": "hero-zoom 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
