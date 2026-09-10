import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * "Editorial chips" : petites capitales espacées, angles vifs.
 * Utilisées pour les équipements et les mentions de catégorie.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-1 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-olive-700 text-provence-50",
        secondary: "border-provence-300 bg-provence-100 text-ink-soft",
        terracotta: "border-terracotta-200 bg-terracotta-50 text-terracotta-700",
        lavender: "border-lavender-200 bg-lavender-50 text-lavender-700",
        sand: "border-sand-200 bg-sand-50 text-sand-800",
        olive: "border-olive-200 bg-olive-50 text-olive-800",
        outline: "border-ink/20 bg-transparent text-ink-soft",
        light: "border-provence-50/35 bg-provence-50/10 text-provence-50 backdrop-blur-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
