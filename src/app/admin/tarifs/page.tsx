"use client";

import React, { useState, useEffect } from "react";
import { PricingRule } from "@/types";
import { defaultPricingRules } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminTarifsPage() {
  const [rules, setRules] = useState<PricingRule[]>(defaultPricingRules);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/pricing-rules");
      const data = await res.json();
      if (data.rules && data.rules.length > 0) {
        setRules(data.rules);
      }
    } catch (err) {
      console.error("Error loading pricing rules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleUpdateRule = (index: number, field: keyof PricingRule, value: any) => {
    const updated = [...rules];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setRules(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch("/api/admin/pricing-rules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules }),
      });

      if (!res.ok) throw new Error("Erreur de sauvegarde");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde des tarifs.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-olive-950">
            Tarifs & Règles de Séjour
          </h1>
          <p className="text-sm text-olive-600">
            Ajustez facilement les prix par nuit, séjours minimums et conditions d&apos;arrivée par saison.
          </p>
        </div>

        <Button onClick={fetchRules} variant="outline" size="sm" disabled={loading || isSaving}>
          Réinitialiser
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-olive-100 border border-olive-300 text-olive-900 text-sm flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-olive-700 shrink-0" />
          <span>Vos modifications de tarifs et de règles de séjour ont été enregistrées avec succès !</span>
        </div>
      )}

      {/* Pricing Form */}
      {loading ? (
        <div className="py-16 text-center text-olive-600">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-olive-700 mb-2" />
          <p className="text-sm">Chargement des grilles tarifaires...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div
                key={rule.id || idx}
                className="rounded-2xl border border-provence-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-provence-100">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-olive-700">
                      Saison {idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-olive-950">
                      {rule.name}
                    </h3>
                  </div>
                  <span className="font-serif text-2xl font-bold text-olive-950">
                    {formatPrice(rule.price_per_night)} <span className="text-xs font-normal text-olive-600">/ nuit</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-olive-800 uppercase">
                      Date de début
                    </label>
                    <Input
                      type="date"
                      value={rule.start_date}
                      onChange={(e) => handleUpdateRule(idx, "start_date", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-olive-800 uppercase">
                      Date de fin
                    </label>
                    <Input
                      type="date"
                      value={rule.end_date}
                      onChange={(e) => handleUpdateRule(idx, "end_date", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-olive-800 uppercase">
                      Prix par nuit (€)
                    </label>
                    <Input
                      type="number"
                      min="50"
                      max="2000"
                      value={rule.price_per_night}
                      onChange={(e) => handleUpdateRule(idx, "price_per_night", Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-olive-800 uppercase">
                      Séjour minimum (nuits)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={rule.min_stay_nights}
                      onChange={(e) => handleUpdateRule(idx, "min_stay_nights", Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                {/* Checkin restriction */}
                <div className="pt-2 text-xs text-olive-700 flex items-center space-x-3">
                  <span className="font-semibold text-olive-900">Arrivées autorisées :</span>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`checkin-mode-${idx}`}
                      checked={rule.allowed_checkin_days.length === 7}
                      onChange={() => handleUpdateRule(idx, "allowed_checkin_days", [0, 1, 2, 3, 4, 5, 6])}
                      className="text-olive-700"
                    />
                    <span>Tous les jours</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`checkin-mode-${idx}`}
                      checked={rule.allowed_checkin_days.length === 1 && rule.allowed_checkin_days[0] === 6}
                      onChange={() => handleUpdateRule(idx, "allowed_checkin_days", [6])}
                      className="text-olive-700"
                    />
                    <span>Samedi uniquement (Haute saison)</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving} size="lg" className="h-12 px-8 shadow-md">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement en cours...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications de tarifs
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
