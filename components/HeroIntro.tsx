"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

/**
 * Hero introduction section showcasing EventCraft AI brand lockup,
 * challenge badge, value proposition, and dual-model badges.
 */
export default function HeroIntro() {
  return (
    <section
      aria-label="Hero Introduction"
      className="text-center space-y-5 max-w-3xl mx-auto no-print flex flex-col items-center"
    >
      <div className="pt-2">
        <Logo size="lg" variant="stacked" showSubtitle={false} />
      </div>

      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
        <span>Hack2skill &bull; PromptWars Challenge 5 Autonomous Event Agent</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
        Plan Unforgettable Celebrations in{" "}
        <span className="text-gradient-brand">Seconds</span>
      </h1>

      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
        From rustic meadow weddings and cyberpunk bashes to cultural sangeets and anniversary galas.
        Powered by <strong className="text-fuchsia-400">Gemini 3.8 Flash</strong> for deep mathematical budgeting and vendor playbooks, with <strong className="text-amber-400">Gemini 3.1 Flash-Lite</strong> for instant co-pilot refinements.
      </p>
    </section>
  );
}
