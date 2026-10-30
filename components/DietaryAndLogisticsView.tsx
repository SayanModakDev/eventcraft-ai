"use client";

import React from "react";
import {
  UtensilsCrossed,
  ShieldCheck,
  CloudSun,
  Layout,
  BriefcaseMedical,
  CheckCircle,
} from "lucide-react";
import { DietaryRequirement, LogisticsAndContingency } from "@/types/event";

interface DietaryAndLogisticsViewProps {
  dietary?: DietaryRequirement[];
  logistics?: LogisticsAndContingency;
  totalGuests?: number;
}

/**
 * Detailed dietary breakdown and physical logistics/contingency planner.
 * Ensures health accommodations, floorplan layouts, and weather resilience.
 */
export default function DietaryAndLogisticsView({
  dietary = [],
  logistics,
  totalGuests = 100,
}: DietaryAndLogisticsViewProps) {
  return (
    <section aria-label="Dietary and Logistics Planning" className="space-y-8">
      {/* 1. Dietary Accommodations Matrix */}
      <div className="space-y-4">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center space-x-2.5">
            <UtensilsCrossed className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h3 className="text-base font-bold text-white">
              Dietary Restrictions & Catering Allocation
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scientifically estimated guest dietary breakdowns, chef kitchen cross-contamination notes, and gourmet substitute pairings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dietary.map((item, index) => {
            const guestCountEst = Math.round((totalGuests * item.estimated_percentage) / 100);
            return (
              <article
                key={index}
                className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.category}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.estimated_percentage}% (~{guestCountEst} guests)
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Recommended Dishes & Substitutes
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {item.recommended_substitutions}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1 text-xs bg-slate-950/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />
                    Chef Preparation Note
                  </span>
                  <p className="text-slate-300 leading-relaxed">{item.chef_note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 2. Logistics & Weather Contingency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Floorplan & Seating Strategy */}
        <article className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center space-x-2">
            <Layout className="w-5 h-5 text-indigo-400" aria-hidden="true" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              Seating & Floorplan Strategy
            </h4>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/50 p-4 rounded-xl border border-white/5">
            {logistics?.seating_and_floorplan_advice ||
              "Arrange central dining tables with a dedicated 20ft dancefloor radius and uninhibited sightlines to the main dais or presentation stage."}
          </p>
        </article>

        {/* Weather Contingency Plan */}
        <article className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-400" aria-hidden="true" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              Weather Contingency & Backup Plan
            </h4>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/50 p-4 rounded-xl border border-white/5">
            {logistics?.weather_contingency_plan ||
              "Reserve a clear sailcloth marquee on a 48-hour tentative hold with perimeter heaters staged for sudden evening temperature drops."}
          </p>
        </article>
      </div>

      {/* 3. Emergency Kit Essentials */}
      {logistics?.emergency_kit_essentials && logistics.emergency_kit_essentials.length > 0 && (
        <article className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center space-x-2">
            <BriefcaseMedical className="w-5 h-5 text-fuchsia-400" aria-hidden="true" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              Day-of Emergency Kit Essentials
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {logistics.emergency_kit_essentials.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 p-3 rounded-xl bg-slate-950/50 border border-white/5 text-xs text-slate-200"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

