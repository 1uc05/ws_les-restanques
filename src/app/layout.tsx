import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.les-restanques-gite.fr"),
  title: {
    default: "Les Restanques • Gîte de charme avec piscine dans le Luberon",
    template: "%s • Les Restanques",
  },
  description:
    "Maison de vacances 3 étoiles avec piscine privée et vue panoramique à Saint-Saturnin-lès-Apt (Luberon, Provence). Capacité 6 personnes. Réservation directe sans commission.",
  keywords: [
    "gite luberon",
    "location vacances saint-saturnin-les-apt",
    "gite avec piscine luberon",
    "villa provence",
    "location 6 personnes luberon",
    "les restanques",
  ],
  authors: [{ name: "Judith — Les Restanques" }],
  openGraph: {
    title: "Les Restanques • Gîte de charme dans le Luberon",
    description:
      "Maison de vacances 3 étoiles avec piscine privée et vue imprenable sur le Luberon à Saint-Saturnin-lès-Apt.",
    url: "https://www.les-restanques-gite.fr",
    siteName: "Les Restanques",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/gite/panorama-table.jpg", width: 1200, height: 651 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col bg-provence-50 font-sans text-ink-soft antialiased">
        {children}
      </body>
    </html>
  );
}
