"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "mark" | "stacked";
  showSubtitle?: boolean;
  href?: string;
  className?: string;
}

export function LogoMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(124,58,237,0.35)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <linearGradient id="logoBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="facetPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="60%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <linearGradient id="facetSecondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="60%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>

          <linearGradient id="sparkGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="accentCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Base Rounded Geometric Shield */}
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="18"
          fill="url(#logoBgGrad)"
          stroke="url(#logoBorderGrad)"
          strokeWidth="1.8"
        />

        {/* Ambient Soft Glow Behind Facets */}
        <circle cx="32" cy="32" r="18" fill="#7C3AED" opacity="0.3" />

        {/* Left Facet: Strategic Planning Node */}
        <path
          d="M 32 14 L 17 25 L 22 42 L 32 50 L 32 32 Z"
          fill="url(#facetPrimary)"
          opacity="0.95"
        />

        {/* Right Facet: Celebration Prism */}
        <path
          d="M 32 14 L 47 25 L 42 42 L 32 50 L 32 32 Z"
          fill="url(#facetSecondary)"
          opacity="0.95"
        />

        {/* Top Highlight Facet */}
        <path d="M 32 14 L 25 20 L 32 25 L 39 20 Z" fill="#C084FC" opacity="0.9" />

        {/* Micro Celebration Particles */}
        <circle cx="15" cy="18" r="1.6" fill="#FBBF24" />
        <circle cx="49" cy="18" r="1.6" fill="#38BDF8" />
        <circle cx="17" cy="48" r="1.3" fill="#34D399" />
        <circle cx="47" cy="48" r="1.3" fill="#F59E0B" />

        {/* Celebration Streamers */}
        <path
          d="M 18 48 Q 14 53 17 58"
          stroke="url(#accentCyan)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M 46 48 Q 50 53 47 58"
          stroke="url(#sparkGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Central Autonomous AI Core Spark */}
        <path
          d="M 32 20 Q 32 32 44 32 Q 32 32 32 44 Q 32 32 20 32 Q 32 32 32 20 Z"
          fill="url(#sparkGold)"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <polygon points="32,26 37,32 32,38 27,32" fill="#FFFFFF" opacity="0.92" />
        <circle cx="32" cy="32" r="1.8" fill="#FEF08A" />
      </svg>
    </div>
  );
}

export default function Logo({
  size = "md",
  variant = "full",
  showSubtitle = true,
  href = "/",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: {
      mark: "w-8 h-8",
      text: "text-lg",
      badge: "px-1.5 py-0.2 text-[9px]",
      sub: "text-[9px]",
      gap: "gap-2",
    },
    md: {
      mark: "w-10 h-10",
      text: "text-xl",
      badge: "px-2 py-0.5 text-[10px]",
      sub: "text-[10px]",
      gap: "gap-3",
    },
    lg: {
      mark: "w-14 h-14",
      text: "text-2xl sm:text-3xl",
      badge: "px-2.5 py-0.5 text-xs",
      sub: "text-xs",
      gap: "gap-4",
    },
    xl: {
      mark: "w-20 h-20",
      text: "text-4xl sm:text-5xl",
      badge: "px-3 py-1 text-sm",
      sub: "text-sm",
      gap: "gap-5",
    },
  };

  const currentSize = sizeMap[size];

  if (variant === "mark") {
    const markContent = <LogoMark className={currentSize.mark} />;
    return href ? (
      <Link href={href} aria-label="EventCraft AI Home" className={`inline-block group ${className}`}>
        {markContent}
      </Link>
    ) : (
      <div className={`inline-block group ${className}`}>{markContent}</div>
    );
  }

  if (variant === "stacked") {
    const stackedContent = (
      <div className={`flex flex-col items-center text-center ${currentSize.gap} group ${className}`}>
        <LogoMark className={currentSize.mark} />
        <div>
          <div className="flex items-center justify-center space-x-2">
            <span className={`${currentSize.text} font-black tracking-tight text-white`}>
              Event<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">Craft</span>
            </span>
            <span className={`inline-flex items-center space-x-1 font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-amber-300 border border-amber-400/40 shadow-sm ${currentSize.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>AI</span>
            </span>
          </div>
          {showSubtitle && (
            <p className={`${currentSize.sub} text-slate-400 font-semibold tracking-wider uppercase mt-1`}>
              Celebration &amp; Event Planner
            </p>
          )}
        </div>
      </div>
    );

    return href ? (
      <Link href={href} aria-label="EventCraft AI Home" className="inline-block group">
        {stackedContent}
      </Link>
    ) : (
      stackedContent
    );
  }

  // Default: "full" variant (horizontal lockup)
  const content = (
    <div className={`flex items-center ${currentSize.gap} group ${className}`}>
      <LogoMark className={currentSize.mark} />
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className={`${currentSize.text} font-black tracking-tight text-white group-hover:text-slate-100 transition-colors`}>
            Event<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">Craft</span>
          </span>
          <span className={`inline-flex items-center space-x-1 font-extrabold uppercase tracking-wider rounded-full bg-indigo-950/70 text-amber-300 border border-amber-400/40 shadow-sm ${currentSize.badge}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>AI</span>
          </span>
        </div>
        {showSubtitle && (
          <p className={`hidden md:block ${currentSize.sub} text-slate-400 font-medium tracking-wide`}>
            Celebration &amp; Event Planner
          </p>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} aria-label="EventCraft AI Home" className="inline-block">
      {content}
    </Link>
  ) : (
    content
  );
}

