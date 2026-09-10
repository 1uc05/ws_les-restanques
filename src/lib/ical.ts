import ical, { ICalCalendarMethod } from "ical-generator";
import { BlockedDate, Booking } from "@/types";
import { parseISO } from "date-fns";

/**
 * Generate standard RFC 5545 iCal feed string for export to Airbnb
 */
export function generateIcalFeed(
  bookings: Booking[],
  blockedDates: BlockedDate[]
): string {
  const calendar = ical({
    name: "Les Restanques - Calendrier de Réservation",
    description: "Flux de réservations et blocages pour le gîte Les Restanques (Saint-Saturnin-lès-Apt)",
    timezone: "Europe/Paris",
    method: ICalCalendarMethod.PUBLISH,
  });

  // 1. Add active bookings (confirmed and pending)
  bookings.forEach((booking) => {
    if (booking.status === "confirmed" || booking.status === "pending") {
      const isConfirmed = booking.status === "confirmed";
      calendar.createEvent({
        id: `booking-${booking.id}@les-restanques-gite.fr`,
        start: parseISO(booking.check_in),
        end: parseISO(booking.check_out),
        summary: isConfirmed
          ? `Réservé - ${booking.guest_first_name} ${booking.guest_last_name}`
          : `Option / Demande en cours - ${booking.guest_first_name} ${booking.guest_last_name}`,
        description: `Réservation directe Les Restanques - ${booking.guests_count} personnes. Statut: ${booking.status}`,
        allDay: true,
      });
    }
  });

  // 2. Add manual blocks
  blockedDates.forEach((block) => {
    if (block.source !== "airbnb_ical") {
      calendar.createEvent({
        id: `block-${block.id}@les-restanques-gite.fr`,
        start: parseISO(block.start_date),
        end: parseISO(block.end_date),
        summary: block.reason || "Période indisponible / Maintenance",
        description: "Période bloquée manuellement par l'hôte",
        allDay: true,
      });
    }
  });

  return calendar.toString();
}

/**
 * Lightweight parser for Airbnb iCal feeds.
 * Parses VEVENT blocks from raw ICS text without any external dependency.
 */
export async function parseAirbnbIcalFeed(icsContent: string): Promise<Omit<BlockedDate, "id">[]> {
  const blocks: Omit<BlockedDate, "id">[] = [];

  // Split into VEVENT blocks
  const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match: RegExpExecArray | null;

  while ((match = eventRegex.exec(icsContent)) !== null) {
    const eventBody = match[1];

    const dtstart = extractIcsField(eventBody, "DTSTART");
    const dtend = extractIcsField(eventBody, "DTEND");
    const summary = extractIcsField(eventBody, "SUMMARY");

    if (dtstart && dtend) {
      const startDate = parseIcsDate(dtstart);
      const endDate = parseIcsDate(dtend);

      if (startDate && endDate) {
        blocks.push({
          start_date: startDate,
          end_date: endDate,
          reason: summary || "Airbnb Reservation",
          source: "airbnb_ical",
        });
      }
    }
  }

  return blocks;
}

/**
 * Extract a field value from an iCal event body.
 * Handles fields with parameters like DTSTART;VALUE=DATE:20250701
 */
function extractIcsField(eventBody: string, fieldName: string): string | null {
  // Match FIELDNAME:value or FIELDNAME;PARAM=X:value
  const regex = new RegExp(`^${fieldName}(?:;[^:]*)?:(.+)$`, "m");
  const match = regex.exec(eventBody);
  return match ? match[1].trim() : null;
}

/**
 * Parse an iCal date string (YYYYMMDD or YYYYMMDDTHHMMSSZ) into ISO date string YYYY-MM-DD
 */
function parseIcsDate(icsDate: string): string | null {
  // Strip any trailing whitespace / carriage return
  const clean = icsDate.replace(/\r/g, "").trim();

  // Format: 20250701 or 20250701T160000Z or 20250701T160000
  const dateMatch = /^(\d{4})(\d{2})(\d{2})/.exec(clean);
  if (!dateMatch) return null;

  return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
}
