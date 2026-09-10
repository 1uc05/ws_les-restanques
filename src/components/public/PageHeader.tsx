import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * En-tête des pages intérieures.
 * Réserve la hauteur de la barre fixe et pose le titre dans du blanc généreux,
 * comme l'ouverture d'un chapitre.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "shell pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-44",
        className
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1
          className={cn(
            "text-balance font-serif text-display-lg text-ink",
            eyebrow ? "mt-6" : ""
          )}
        >
          {title}
        </h1>
        {lede && (
          <p className={cn("lede mt-7", centered && "mx-auto")}>{lede}</p>
        )}
        <span
          className={cn("mt-10 block h-px w-16 bg-terracotta-400/70", centered && "mx-auto")}
          aria-hidden
        />
      </div>
    </header>
  );
}
