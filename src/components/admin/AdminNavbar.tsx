"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, DollarSign, ExternalLink, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Demandes & Réservations", icon: LayoutDashboard },
    { href: "/admin/planning", label: "Planning & Blocages", icon: Calendar },
    { href: "/admin/tarifs", label: "Tarifs & Saisons", icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-provence-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold text-olive-950">
              Les Restanques
            </span>
            <span className="rounded-full bg-olive-100 px-2 py-0.5 text-[10px] font-bold text-olive-800 uppercase tracking-wider">
              Espace Hôte
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-olive-700 text-white font-semibold"
                      : "text-olive-700 hover:bg-provence-100 hover:text-olive-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/" target="_blank">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Voir le site public
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="text-olive-700 hover:text-red-700">
            <Link href="/admin/login">
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
