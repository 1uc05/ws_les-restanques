"use client";

import React, { useState, useEffect } from "react";
import { Booking } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "rejected" | "all">("pending");

  // Rejection modal state
  const [rejectingBooking, setRejectingBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleValidate = async (booking: Booking) => {
    if (!confirm(`Confirmer la réservation de ${booking.guest_first_name} ${booking.guest_last_name} du ${booking.check_in} au ${booking.check_out} ?`)) {
      return;
    }

    try {
      setProcessingId(booking.id);
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });

      if (!res.ok) throw new Error("Failed to validate booking");

      await fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la validation.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingBooking) return;

    try {
      setProcessingId(rejectingBooking.id);
      const res = await fetch(`/api/bookings/${rejectingBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "rejected",
          rejection_reason: rejectionReason.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to reject booking");

      setRejectingBooking(null);
      setRejectionReason("");
      await fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors du refus de la demande.");
    } finally {
      setProcessingId(null);
    }
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length;

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-olive-950">
            Tableau de Bord des Demandes
          </h1>
          <p className="text-sm text-olive-600">
            Validez ou refusez les demandes de réservation directe en un clic.
          </p>
        </div>

        <Button onClick={fetchBookings} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Actualiser la liste"}
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab("pending")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "pending"
              ? "border-amber-400 bg-amber-50/80 shadow-xs"
              : "border-provence-200 bg-white hover:border-provence-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              En attente d&apos;action
            </span>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-amber-950 mt-2">
            {pendingCount}
          </p>
          <span className="text-[11px] text-amber-800/80">Dates bloquées temporairement</span>
        </div>

        <div
          onClick={() => setActiveTab("confirmed")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "confirmed"
              ? "border-olive-400 bg-olive-50/80 shadow-xs"
              : "border-provence-200 bg-white hover:border-provence-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-olive-800">
              Réservations validées
            </span>
            <CheckCircle2 className="h-5 w-5 text-olive-700" />
          </div>
          <p className="font-serif text-3xl font-bold text-olive-950 mt-2">
            {confirmedCount}
          </p>
          <span className="text-[11px] text-olive-700">Synchronisées sur Airbnb (iCal)</span>
        </div>

        <div
          onClick={() => setActiveTab("rejected")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "rejected"
              ? "border-provence-400 bg-provence-100 shadow-xs"
              : "border-provence-200 bg-white hover:border-provence-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-olive-700">
              Demandes refusées
            </span>
            <XCircle className="h-5 w-5 text-olive-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-olive-950 mt-2">
            {rejectedCount}
          </p>
          <span className="text-[11px] text-olive-600">Dates libérées sur le site</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-provence-200 pb-2">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "pending"
              ? "bg-olive-700 text-white shadow-xs"
              : "text-olive-700 hover:bg-provence-100"
          }`}
        >
          En attente ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("confirmed")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "confirmed"
              ? "bg-olive-700 text-white shadow-xs"
              : "text-olive-700 hover:bg-provence-100"
          }`}
        >
          Validées ({confirmedCount})
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "rejected"
              ? "bg-olive-700 text-white shadow-xs"
              : "text-olive-700 hover:bg-provence-100"
          }`}
        >
          Refusées ({rejectedCount})
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "all"
              ? "bg-olive-700 text-white shadow-xs"
              : "text-olive-700 hover:bg-provence-100"
          }`}
        >
          Toutes ({bookings.length})
        </button>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-16 text-center text-olive-600 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-olive-700" />
          <p className="text-sm">Chargement des demandes...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-provence-300 bg-white/60 p-8 space-y-2">
          <CheckCircle2 className="h-8 w-8 text-olive-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-olive-950">
            Aucune demande dans cet onglet
          </h3>
          <p className="text-xs text-olive-600">
            Toutes les demandes ont été traitées ou aucune réservation n&apos;a été enregistrée avec ce statut.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-provence-200 bg-white p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-provence-300 transition-all"
            >
              {/* Left Column: Guest & Stay Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-serif text-xl font-bold text-olive-950">
                    {b.guest_first_name} {b.guest_last_name}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      b.status === "pending"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : b.status === "confirmed"
                        ? "bg-olive-100 text-olive-800 border-olive-300"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {b.status === "pending"
                      ? "En attente"
                      : b.status === "confirmed"
                      ? "Validée"
                      : "Refusée"}
                  </span>
                  <span className="text-xs text-olive-500">
                    Reçue le {new Date(b.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-olive-800">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-olive-600 shrink-0" />
                    <span>Du <strong>{b.check_in}</strong> au <strong>{b.check_out}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-olive-600 shrink-0" />
                    <span>{b.guests_count} personnes • {b.include_cleaning ? "Ménage inclus" : "Sans ménage"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-olive-600 shrink-0" />
                    <a href={`mailto:${b.guest_email}`} className="hover:underline">{b.guest_email}</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-olive-600 shrink-0" />
                    <a href={`tel:${b.guest_phone}`} className="hover:underline">{b.guest_phone}</a>
                  </div>
                </div>

                {b.guest_message && (
                  <div className="rounded-lg bg-provence-50 p-3 text-xs text-olive-800 border border-provence-200/70">
                    <p className="font-semibold text-olive-950 mb-0.5">Message du voyageur :</p>
                    <p className="italic">« {b.guest_message} »</p>
                  </div>
                )}

                {b.rejection_reason && (
                  <div className="rounded-lg bg-red-50 p-3 text-xs text-red-800 border border-red-200">
                    <p className="font-semibold mb-0.5">Motif du refus transmis :</p>
                    <p className="italic">« {b.rejection_reason} »</p>
                  </div>
                )}
              </div>

              {/* Right Column: Price & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-provence-100">
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-olive-950 block">
                    {formatPrice(b.total_price)}
                  </span>
                  <span className="text-[11px] text-olive-600">Linge & taxe sur place</span>
                </div>

                {b.status === "pending" && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleValidate(b)}
                      disabled={processingId === b.id}
                      className="bg-olive-700 hover:bg-olive-800 shadow-xs"
                    >
                      {processingId === b.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="mr-1.5 h-4 w-4" />
                          Valider
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectingBooking(b)}
                      disabled={processingId === b.id}
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                    >
                      <XCircle className="mr-1.5 h-4 w-4" />
                      Refuser
                    </Button>
                  </div>
                )}

                {b.status === "confirmed" && (
                  <span className="inline-flex items-center text-xs font-semibold text-olive-700">
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-olive-700" />
                    Confirmée & Bloquée iCal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection Modal with custom reason */}
      {rejectingBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-olive-950">
                Refuser la demande de séjour
              </h3>
              <button
                onClick={() => setRejectingBooking(null)}
                className="p-1 rounded-md text-olive-500 hover:text-olive-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-olive-700 leading-relaxed">
              En confirmant le refus pour <strong>{rejectingBooking.guest_first_name} {rejectingBooking.guest_last_name}</strong> (du {rejectingBooking.check_in} au {rejectingBooking.check_out}), les dates seront <strong>immédiatement libérées</strong> sur le calendrier public.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-olive-800 uppercase tracking-wider">
                Message explicatif pour le voyageur (optionnel)
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Ex: Le gîte est exceptionnellement indisponible pour des travaux de rénovation sur cette semaine..."
                rows={4}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setRejectingBooking(null)}
                disabled={Boolean(processingId)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmReject}
                disabled={Boolean(processingId)}
              >
                {processingId ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Confirmer le refus et avertir le client
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
