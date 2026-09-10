import { NextRequest, NextResponse } from "next/server";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";
import { PricingRule } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ rules: mockDb.getPricingRules() });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("pricing_rules").select("*").order("start_date", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ rules: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { rules } = body;

    if (!Array.isArray(rules)) {
      return NextResponse.json({ error: "Format invalide" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      mockDb.updatePricingRules(rules);
    } else {
      const supabase = createAdminClient();
      // Upsert rules
      for (const rule of rules) {
        if (rule.id) {
          await supabase.from("pricing_rules").upsert(rule);
        } else {
          await supabase.from("pricing_rules").insert(rule);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
