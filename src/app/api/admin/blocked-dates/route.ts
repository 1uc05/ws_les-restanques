import { NextRequest, NextResponse } from "next/server";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ blockedDates: mockDb.getBlockedDates() });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("blocked_dates").select("*").order("start_date", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ blockedDates: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { start_date, end_date, reason } = body;

    if (!start_date || !end_date) {
      return NextResponse.json({ error: "Dates de début et de fin requises" }, { status: 400 });
    }

    let newBlock;
    if (!isSupabaseConfigured()) {
      newBlock = mockDb.addBlockedDate({
        start_date,
        end_date,
        reason: reason || "Blocage manuel hôte",
        source: "manual",
      });
    } else {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("blocked_dates")
        .insert([
          {
            start_date,
            end_date,
            reason: reason || "Blocage manuel hôte",
            source: "manual",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      newBlock = data;
    }

    return NextResponse.json({ success: true, block: newBlock }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      mockDb.removeBlockedDate(id);
    } else {
      const supabase = createAdminClient();
      const { error } = await supabase.from("blocked_dates").delete().eq("id", id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
