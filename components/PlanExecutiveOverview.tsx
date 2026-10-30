"use client";

import React from "react";
import {
  Layers,
  Coins,
  Calendar,
  Users,
  Sparkles,
  Clock,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";
import { EventPlan } from "@/types/event";
import { formatCurrency } from "@/lib/utils";

export type NavigableTab =
  | "budget"
  | "timeline"
  | "vendors"
  | "aesthetics"
  | "schedule"
  | "dietary";

interface PlanExecutiveOverviewProps {
  plan: EventPlan;
  onNavigateTab: (tab: NavigableTab) => void;
}

/**
 * Executive Summary view presenting high-level vision, strategic pillars,
 * and quick-jump preview cards into each detailed module.
 */
export default function PlanExecutiveOverview({
  plan,
  onNavigateTab,
}: PlanExecutiveOverviewProps) {
  return (
    <section aria-label="Executive Summary" className="space-y-6">
      {/* Event Vision Card */}
      <article className="glass-panel rounded-2xl p-6 space-y-4 border border-white/10">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Layers className="w-4 h-4 text-fuchsia-400" aria-hidden="true" />
          <span>Event Vision & Strategic Overview</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Audience Profile
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {plan.audience_profile}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Venue Concept & Location
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {plan.location || "Curated Celebration Venue"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Multi-Model Engine
            </span>
            <p className="text-slate-200 leading-relaxed">
              Synthesized by <strong className="text-fuchsia-400">Gemini 3.8 Flash</strong> with sub-second <strong className="text-amber-400">Gemini 3.1 Flash-Lite</strong> co-pilot refinements.
            </p>
          </div>
        </div>
      </article>

      {/* Snapshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Snapshot */}
        <article className="glass-panel rounded-2xl p-5 space-y-3 border border-white/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <Coins className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Budget Breakdown</span>
            </h4>
            <button
              type="button"
              onClick={() => onNavigateTab("budget")}
              aria-label="Explore detailed budget breakdown"
              className="text-xs text-amber-400 hover:underline flex items-center font-medium focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2">
            {plan.budget_breakdown?.slice(0, 3).map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 text-xs"
              >
                <span className="text-slate-300 font-medium">{item.category}</span>
                <span className="text-amber-400 font-bold">
                  {formatCurrency(item.estimated_cost, plan.currency)} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Timeline Snapshot */}
        <article className="glass-panel rounded-2xl p-5 space-y-3 border border-white/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-fuchsia-400" aria-hidden="true" />
              <span>Phased Roadmap</span>
            </h4>
            <button
              type="button"
              onClick={() => onNavigateTab("timeline")}
              aria-label="View interactive phased timeline"
              className="text-xs text-fuchsia-400 hover:underline flex items-center font-medium focus-visible:outline-2 focus-visible:outline-fuchsia-400"
            >
              <span>View checklist</span>
              <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2">
            {plan.timeline_milestones?.slice(0, 3).map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950/40 text-xs flex items-center justify-between"
              >
                <span className="text-slate-200 font-medium truncate mr-2">
                  {m.phase}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 shrink-0 font-semibold">
                  {m.tasks?.length || 0} Tasks
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Day-of Schedule Snapshot */}
        <article className="glass-panel rounded-2xl p-5 space-y-3 border border-white/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>Day-of Run of Sheet</span>
            </h4>
            <button
              type="button"
              onClick={() => onNavigateTab("schedule")}
              aria-label="View hour-by-hour day of schedule"
              className="text-xs text-cyan-400 hover:underline flex items-center font-medium focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <span>View schedule</span>
              <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2">
            {(plan.day_of_schedule?.slice(0, 3) || []).map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950/40 text-xs flex items-center justify-between"
              >
                <span className="text-slate-200 font-medium truncate mr-2">
                  {item.activity}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0 font-mono">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Dietary & Logistics Snapshot */}
        <article className="glass-panel rounded-2xl p-5 space-y-3 border border-white/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <UtensilsCrossed className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Dietary & Contingency</span>
            </h4>
            <button
              type="button"
              onClick={() => onNavigateTab("dietary")}
              aria-label="Inspect dietary breakdown and weather contingency"
              className="text-xs text-emerald-400 hover:underline flex items-center font-medium focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <span>Inspect details</span>
              <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(plan.dietary_breakdown || []).map((diet) => (
              <span
                key={diet.category}
                className="px-2.5 py-1 rounded-lg text-xs bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-medium"
              >
                {diet.category} ({diet.estimated_percentage}%)
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
