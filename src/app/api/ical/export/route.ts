import { NextResponse } from "next/server";
import { generateIcalFeed } from "@/lib/ical";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";
import { Booking, BlockedDate } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let bookings: Booking[] = [];
    let blockedDates: BlockedDate[] = [];

    if (!isSupabaseConfigured()) {
      bookings = mockDb.getBookings();
      blockedDates = mockDb.getBlockedDates();
    } else {
      const supabase = createAdminClient();
      const [bRes, blRes] = await Promise.all([
        supabase.from("bookings").select("*").in("status", ["confirmed", "pending"]),
        supabase.from("blocked_dates").select("*"),
      ]);

      bookings = (bRes.data as Booking[]) || [];
      blockedDates = (blRes.data as BlockedDate[]) || [];
    }

    const icsContent = generateIcalFeed(bookings, blockedDates);

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="les-restanques.ics"',
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Error generating iCal feed:", error);
    return new NextResponse("Error generating calendar feed", { status: 500 });
  }
}
