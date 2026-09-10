"use client";

import React, { useState, useEffect } from "react";
import { BlockedDate, Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Lock,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Clock,
  Shield,
  ExternalLink,
} from "lucide-react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  startOfToday,
  isBefore,
} from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminPlanningPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfToday());
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // New Block Form
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmittingBlock, setIsSubmittingBlock] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [blockRes, bookRes] = await Promise.all([
        fetch("/api/admin/blocked-dates"),
        fetch("/api/bookings"),
      ]);
      const blockData = await blockRes.json();
      const bookData = await bookRes.json();
      if (blockData.blockedDates) setBlockedDates(blockData.blockedDates);
      if (bookData.bookings) setBookings(bookData.bookings);
    } catch (err) {
      console.error("Error loading planning data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    try {
      setIsSubmittingBlock(true);
      const res = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start_date: startDate, end_date: endDate, reason }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du blocage");

      setStartDate("");
      setEndDate("");
      setReason("");
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Impossible de créer ce blocage.");
    } finally {
      setIsSubmittingBlock(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    if (!confirm("Voulez-vous supprimer ce blocage de date ?")) return;

    try {
      const res = await fetch(`/api/admin/blocked-dates?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  // Calendar rendering calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = (getDay(monthStart) + 6) % 7;

  const getDateStatus = (dateStr: string) => {
    // 1. Confirmed booking
    const confirmed = bookings.find(
      (b) => b.status === "confirmed" && dateStr >= b.check_in && dateStr < b.check_out
    );
    if (confirmed) return { type: "confirmed", label: `${confirmed.guest_first_name} ${confirmed.guest_last_name}`, color: "bg-olive-700 text-white" };

    // 2. Pending booking
    const pending = bookings.find(
      (b) => b.status === "pending" && dateStr >= b.check_in && dateStr < b.check_out
    );
    if (pending) return { type: "pending", label: `Option: ${pending.guest_first_name}`, color: "bg-amber-100 text-amber-900 border border-amber-300" };

    // 3. Blocked date (Airbnb or manual)
    const block = blockedDates.find(
      (b) => dateStr >= b.start_date && dateStr < b.end_date
    );
    if (block) {
      const isAirbnb = block.source === "airbnb_ical";
      return {
        type: "block",
        label: isAirbnb ? "Airbnb" : (block.reason || "Bloqué"),
        color: isAirbnb ? "bg-red-100 text-red-900 border border-red-300" : "bg-provence-200 text-olive-900 border border-provence-300",
        id: block.id,
      };
    }

    return null;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-olive-950">
            Planning & Disponibilités
          </h1>
          <p className="text-sm text-olive-600">
            Visualisez toutes vos réservations et bloquez manuellement des périodes (travaux, vacances privées...).
          </p>
        </div>

        <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Actualiser le planning"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Calendar View */}
        <div className="lg:col-span-8 rounded-2xl border border-provence-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-olive-950 capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: fr })}
            </h2>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                Mois précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                Mois suivant
              </Button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-olive-600 uppercase pb-2 border-b border-provence-100">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {[...Array(startDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[64px] bg-provence-50/40 rounded-lg" />
            ))}

            {daysInMonth.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const status = getDateStatus(dateStr);

              return (
                <div
                  key={dateStr}
                  className={`min-h-[64px] sm:min-h-[72px] p-1.5 rounded-lg border text-xs flex flex-col justify-between transition-all ${
                    status
                      ? status.color
                      : "bg-white border-provence-200 hover:border-olive-300"
                  }`}
                >
                  <span className="font-bold text-xs">{format(day, "d")}</span>
                  {status && (
                    <span className="text-[10px] line-clamp-2 leading-tight font-medium">
                      {status.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-provence-100 flex flex-wrap items-center gap-4 text-xs text-olive-700">
            <div className="flex items-center space-x-2">
              <div className="h-3.5 w-3.5 rounded bg-olive-700" />
              <span>Réservation Directe Confirmée</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3.5 w-3.5 rounded bg-red-200 border border-red-400" />
              <span>Airbnb (Synchro iCal)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3.5 w-3.5 rounded bg-amber-100 border border-amber-300" />
              <span>Option en attente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3.5 w-3.5 rounded bg-provence-200 border border-provence-300" />
              <span>Blocage manuel</span>
            </div>
          </div>
        </div>

        {/* Sidebar: Add Block & Blocks List */}
        <div className="lg:col-span-4 space-y-6">
          {/* Add block form */}
          <form
            onSubmit={handleAddBlock}
            className="rounded-2xl border border-provence-200 bg-white p-6 shadow-xs space-y-4"
          >
            <h3 className="font-serif text-lg font-bold text-olive-950 flex items-center">
              <Lock className="mr-2 h-4 w-4 text-olive-700" />
              Bloquer des dates
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-olive-800 uppercase">
                Date de début
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-olive-800 uppercase">
                Date de fin (exclue)
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-olive-800 uppercase">
                Motif (optionnel)
              </label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Entretien piscine, séjour personnel..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmittingBlock || !startDate || !endDate}
              className="w-full shadow-xs"
            >
              {isSubmittingBlock ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Bloquer cette période
                </>
              )}
            </Button>
          </form>

          {/* List of active manual blocks */}
          <div className="rounded-2xl border border-provence-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-olive-950">
              Blocages manuels actifs
            </h3>

            {blockedDates.filter((b) => b.source === "manual").length === 0 ? (
              <p className="text-xs text-olive-600">Aucun blocage manuel enregistré.</p>
            ) : (
              <div className="space-y-2">
                {blockedDates
                  .filter((b) => b.source === "manual")
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-lg bg-provence-50 border border-provence-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-olive-950 block">
                          {b.start_date} → {b.end_date}
                        </span>
                        <span className="text-olive-600">{b.reason || "Indisponible"}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteBlock(b.id)}
                        className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Débloquer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
