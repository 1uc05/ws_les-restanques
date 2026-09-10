import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/types";
import { mockDb, isSupabaseConfigured, createAdminClient } from "@/lib/supabase/admin";
import { sendGuestConfirmationEmail, sendGuestRejectionEmail } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, rejection_reason } = body;

    if (!["confirmed", "rejected", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    let updatedBooking: Booking | null = null;

    if (!isSupabaseConfigured()) {
      updatedBooking = mockDb.updateBookingStatus(id, status, rejection_reason);
    } else {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("bookings")
        .update({
          status,
          rejection_reason: rejection_reason || null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      updatedBooking = data as Booking;
    }

    if (!updatedBooking) {
      return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    }

    // Trigger confirmation or rejection email
    try {
      if (status === "confirmed") {
        await sendGuestConfirmationEmail(updatedBooking);
      } else if (status === "rejected") {
        await sendGuestRejectionEmail(updatedBooking, rejection_reason);
      }
    } catch (mailErr) {
      console.error("Email delivery warning on status change:", mailErr);
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: any) {
    console.error("Error updating booking status:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
