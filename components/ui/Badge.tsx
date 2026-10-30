import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "fuchsia" | "amber" | "cyan" | "emerald" | "outline";
  size?: "sm" | "md";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-white/10 text-slate-300 border-white/10",
  fuchsia: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  outline: "bg-transparent text-slate-300 border-white/20",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

/**
 * Reusable accessible Badge primitive for status chips and tags.
 */
export default function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
