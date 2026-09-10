import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Booking, BlockedDate, PricingRule } from "@/types";
import { defaultPricingRules } from "@/lib/pricing";

// In-memory mock storage for development if Supabase credentials are placeholders
class MockStorage {
  private bookings: Booking[] = [];
  private blockedDates: BlockedDate[] = [
    {
      id: "mock-block-1",
      start_date: "2026-06-06",
      end_date: "2026-06-13",
      reason: "Airbnb Reservation",
      source: "airbnb_ical",
    },
  ];
  private pricingRules: PricingRule[] = [...defaultPricingRules];

  getBookings(): Booking[] {
    return this.bookings;
  }

  addBooking(booking: Omit<Booking, "id" | "created_at">): Booking {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking["status"], rejectionReason?: string): Booking | null {
    const b = this.bookings.find((item) => item.id === id);
    if (!b) return null;
    b.status = status;
    if (rejectionReason) b.rejection_reason = rejectionReason;
    return b;
  }

  getBlockedDates(): BlockedDate[] {
    return this.blockedDates;
  }

  addBlockedDate(block: Omit<BlockedDate, "id">): BlockedDate {
    const newBlock: BlockedDate = {
      ...block,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    this.blockedDates.push(newBlock);
    return newBlock;
  }

  removeBlockedDate(id: string): boolean {
    const index = this.blockedDates.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.blockedDates.splice(index, 1);
      return true;
    }
    return false;
  }

  getPricingRules(): PricingRule[] {
    return this.pricingRules;
  }

  updatePricingRules(rules: PricingRule[]) {
    this.pricingRules = rules;
  }
}

export const mockDb = new MockStorage();

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("placeholder") && !key.includes("placeholder"));
}

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createSupabaseClient(supabaseUrl, supabaseServiceKey);
}
