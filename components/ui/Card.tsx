import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "subtle" | "dark";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  glass: "glass-panel border-white/10 shadow-lg",
  subtle: "bg-slate-950/40 border-white/5",
  dark: "bg-slate-950 border-white/10 shadow-inner",
};

/**
 * Reusable Card primitive applying consistent glassmorphism and border radius.
 */
export default function Card({
  variant = "glass",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border transition-all ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
