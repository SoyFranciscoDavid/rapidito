"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "featured" | "recommended" | "primary";
  className?: string;
}

const variantStyles = {
  featured: "bg-accent text-white",
  recommended: "bg-emerald-500 text-white",
  primary: "bg-primary/10 text-primary",
};

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-wide rounded-md",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
