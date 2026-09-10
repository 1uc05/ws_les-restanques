import { calculateStayPrice, defaultPricingRules } from "../src/lib/pricing";
import { generateIcalFeed } from "../src/lib/ical";
import { Booking, BlockedDate } from "../src/types";

function runTests() {
  console.log("--- TEST 1: Calcul tarifaire Basse Saison (3 nuits) ---");
  const p1 = calculateStayPrice("2026-03-10", "2026-03-13", false, defaultPricingRules, "fr");
  console.log(`Nuits: ${p1.numberOfNights}, Total: ${p1.totalPrice}€, Valide: ${p1.isValid}`);
  if (p1.numberOfNights !== 3 || p1.totalPrice !== 420 || !p1.isValid) {
    throw new Error("Test 1 échoué !");
  }

  console.log("\n--- TEST 2: Haute Saison avec option ménage (7 nuits, arrivée samedi) ---");
  // 2026-07-04 is a Saturday
  const p2 = calculateStayPrice("2026-07-04", "2026-07-11", true, defaultPricingRules, "fr");
  console.log(`Nuits: ${p2.numberOfNights}, Total: ${p2.totalPrice}€ (dont 50€ ménage), Valide: ${p2.isValid}`);
  if (p2.numberOfNights !== 7 || p2.totalPrice !== 1820 + 50 || !p2.isValid) {
    throw new Error("Test 2 échoué !");
  }

  console.log("\n--- TEST 3: Haute Saison refus arrivée hors samedi ---");
  // 2026-07-05 is a Sunday
  const p3 = calculateStayPrice("2026-07-05", "2026-07-12", false, defaultPricingRules, "fr");
  console.log(`Valide: ${p3.isValid}, Erreur: ${p3.validationError}`);
  if (p3.isValid) {
    throw new Error("Test 3 aurait dû échouer pour arrivée hors samedi !");
  }

  console.log("\n--- TEST 4: Génération flux iCal ---");
  const testBookings: Booking[] = [
    {
      id: "test-1",
      created_at: new Date().toISOString(),
      guest_first_name: "Jean",
      guest_last_name: "Dupont",
      guest_email: "jean@example.com",
      guest_phone: "0600000000",
      guest_locale: "fr",
      check_in: "2026-07-11",
      check_out: "2026-07-18",
      guests_count: 4,
      include_cleaning: true,
      total_price: 1870,
      status: "confirmed",
    },
  ];
  const testBlocks: BlockedDate[] = [
    {
      id: "block-1",
      start_date: "2026-09-15",
      end_date: "2026-09-20",
      reason: "Maintenance",
      source: "manual",
    },
  ];

  const ics = generateIcalFeed(testBookings, testBlocks);
  console.log("ICS Preview (first 250 chars):\n" + ics.substring(0, 250));
  if (!ics.includes("BEGIN:VCALENDAR") || !ics.includes("Jean Dupont") || !ics.includes("Maintenance")) {
    throw new Error("Test 4 échoué sur la génération iCal !");
  }

  console.log("\n✅ TOUS LES TESTS UNITAIRES SONT PASSÉS AVEC SUCCÈS !");
}

runTests();
