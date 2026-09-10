import { NextRequest, NextResponse } from "next/server";
import { parseAirbnbIcalFeed } from "@/lib/ical";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const airbnbIcalUrl = process.env.AIRBNB_ICAL_URL;

    if (!airbnbIcalUrl) {
      return NextResponse.json(
        { message: "AIRBNB_ICAL_URL is not configured yet." },
        { status: 200 }
      );
    }

    // Fetch Airbnb calendar
    const res = await fetch(airbnbIcalUrl, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch Airbnb iCal feed: ${res.statusText}`);
    }

    const icsText = await res.text();
    const airbnbBlocks = await parseAirbnbIcalFeed(icsText);

    if (!isSupabaseConfigured()) {
      // Update mock storage
      airbnbBlocks.forEach((block) => {
        mockDb.addBlockedDate(block);
      });
      return NextResponse.json({
        success: true,
        source: "mock",
        syncedBlocksCount: airbnbBlocks.length,
      });
    }

    const supabase = createAdminClient();

    // 1. Clear previous airbnb_ical blocks
    await supabase.from("blocked_dates").delete().eq("source", "airbnb_ical");

    // 2. Insert fresh airbnb blocks
    if (airbnbBlocks.length > 0) {
      const { error } = await supabase.from("blocked_dates").insert(airbnbBlocks);
      if (error) throw error;
    }

    return NextResponse.json({
      success: true,
      syncedBlocksCount: airbnbBlocks.length,
    });
  } catch (error: any) {
    console.error("Error syncing Airbnb iCal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
