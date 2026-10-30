"use client";

import React from "react";
import { Users, Cpu, Printer, Code2, Check } from "lucide-react";
import { EventPlan } from "@/types/event";
import { formatCurrency } from "@/lib/utils";

interface PlanResultsHeaderProps {
  plan: EventPlan;
  modelUsed: string;
  onPrintPdf: () => void;
  onCopyJson: () => void;
  isCopiedJson: boolean;
}

/**
 * Header summary bar for generated event plans, featuring key metadata,
 * AI model badge, and instant export/print triggers.
 */
export default function PlanResultsHeader({
  plan,
  modelUsed,
  onPrintPdf,
  onCopyJson,
  isCopiedJson,
}: PlanResultsHeaderProps) {
  return (
    <header className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 shadow-lg">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
            {plan.eventType || "Celebration"}
          </span>
          <span className="text-slate-500" aria-hidden="true">
            &bull;
          </span>
          <span className="text-xs text-slate-300 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-cyan-400 inline mr-1" aria-hidden="true" />
            <span>{plan.guest_count || 100} Guests</span>
          </span>
          <span className="text-slate-500" aria-hidden="true">
            &bull;
          </span>
          <span className="text-xs text-amber-400 font-bold">
            {formatCurrency(plan.total_budget, plan.currency)} Budget
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {plan.event_title}
        </h2>
        <p className="text-xs sm:text-sm text-fuchsia-300/90 italic mt-0.5">
          &ldquo;{plan.theme_tagline}&rdquo;
        </p>
      </div>

      {/* Model & Export Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 no-print">
        <div
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]"
          title="Engine used to generate this plan"
        >
          <Cpu className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
          <span className="text-slate-300 font-medium">{modelUsed}</span>
        </div>

        <button
          type="button"
          onClick={onPrintPdf}
          aria-label="Save or print event dossier as PDF"
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center space-x-1.5 transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-fuchsia-400"
        >
          <Printer className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
          <span>Save as PDF / Print</span>
        </button>

        <button
          type="button"
          onClick={onCopyJson}
          aria-label="Copy complete JSON blueprint to clipboard"
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-fuchsia-950/60 hover:bg-fuchsia-900/60 text-fuchsia-300 border border-fuchsia-500/30 flex items-center space-x-1.5 transition-all focus-visible:outline-2 focus-visible:outline-fuchsia-400"
        >
          {isCopiedJson ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Code2 className="w-3.5 h-3.5 text-fuchsia-300" aria-hidden="true" />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}

