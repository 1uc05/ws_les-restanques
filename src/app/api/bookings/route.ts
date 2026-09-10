import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/types";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";
import { sendHostNewBookingAlert, sendGuestBookingReceipt } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ bookings: mockDb.getBookings() });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ bookings: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      guest_first_name,
      guest_last_name,
      guest_email,
      guest_phone,
      guest_message,
      guest_locale = "fr",
      check_in,
      check_out,
      guests_count,
      include_cleaning = false,
      total_price,
    } = body;

    // Validate inputs
    if (!guest_first_name || !guest_last_name || !guest_email || !guest_phone || !check_in || !check_out) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être renseignés." },
        { status: 400 }
      );
    }

    let createdBooking: Booking;

    if (!isSupabaseConfigured()) {
      createdBooking = mockDb.addBooking({
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        guest_message,
        guest_locale,
        check_in,
        check_out,
        guests_count: Number(guests_count),
        include_cleaning: Boolean(include_cleaning),
        total_price: Number(total_price),
        status: "pending",
      });
    } else {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            guest_first_name,
            guest_last_name,
            guest_email,
            guest_phone,
            guest_message,
            guest_locale,
            check_in,
            check_out,
            guests_count: Number(guests_count),
            include_cleaning: Boolean(include_cleaning),
            total_price: Number(total_price),
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      createdBooking = data as Booking;
    }

    // Trigger asynchronous emails
    try {
      await Promise.all([
        sendHostNewBookingAlert(createdBooking),
        sendGuestBookingReceipt(createdBooking),
      ]);
    } catch (mailError) {
      console.error("Email delivery warning:", mailError);
    }

    return NextResponse.json({ success: true, booking: createdBooking }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating booking:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
