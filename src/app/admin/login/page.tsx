"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("les-restanques@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple single-host authentication for Judith
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 400);
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-provence-200 bg-white p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-olive-100 text-olive-800 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-olive-950">
            Espace Hôte — Judith
          </h1>
          <p className="text-xs text-olive-600">
            Gestion du gîte Les Restanques (Saint-Saturnin-lès-Apt)
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-olive-800 uppercase tracking-wider">
              Identifiant / E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-olive-500" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-olive-800 uppercase tracking-wider">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-olive-500" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-semibold shadow-xs">
            {loading ? "Connexion..." : "Accéder à mon espace hôte"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="pt-4 border-t border-provence-100 text-center text-xs text-olive-600 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="h-4 w-4 text-olive-700" />
          <span>Accès direct & sécurisé</span>
        </div>
      </div>
    </div>
  );
}
