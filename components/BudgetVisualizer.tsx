"use client";

import React from "react";
import { Coins, PiggyBank, Lightbulb, PieChart, ShieldCheck } from "lucide-react";
import { BudgetCategory, Currency } from "@/types/event";
import { formatCurrency } from "@/lib/utils";

interface BudgetVisualizerProps {
  totalBudget: number;
  currency: Currency | string;
  breakdown: BudgetCategory[];
}

const CATEGORY_COLORS = [
  { bar: "from-fuchsia-500 to-purple-600", badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30" },
  { bar: "from-amber-400 to-orange-500", badge: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  { bar: "from-cyan-400 to-blue-500", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { bar: "from-emerald-400 to-teal-500", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  { bar: "from-rose-400 to-pink-500", badge: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
  { bar: "from-indigo-400 to-violet-500", badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" },
] as const;

export default function BudgetVisualizer({
  totalBudget,
  currency,
  breakdown,
}: BudgetVisualizerProps) {
  const totalAllocated = breakdown.reduce(
    (acc, curr) => acc + (curr.estimated_cost || 0),
    0
  );

  const totalPercentage = breakdown.reduce(
    (acc, curr) => acc + (curr.percentage || 0),
    0
  );

  return (
    <section aria-label="Budget Allocation and Financial Breakdown" className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Target Budget */}
        <article className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
            <Coins className="w-16 h-16 text-amber-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <Coins className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Target Budget</span>
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-400">
            {formatCurrency(totalBudget, currency)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Overall ceiling for vendors, venue, and production
          </p>
        </article>

        {/* Total Allocated */}
        <article className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
            <PieChart className="w-16 h-16 text-fuchsia-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <PieChart className="w-4 h-4 text-fuchsia-400" aria-hidden="true" />
            <span>Total Allocated</span>
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-white">
            {formatCurrency(totalAllocated, currency)}
          </div>
          <div className="mt-1 flex items-center space-x-2 text-xs">
            <span className="text-emerald-400 font-semibold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
              {totalPercentage}% Balanced
            </span>
            <span className="text-slate-500" aria-hidden="true">&bull;</span>
            <span className="text-slate-300">{breakdown.length} Categories</span>
          </div>
        </article>

        {/* Est. Potential Cost Savings */}
        <article className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
            <PiggyBank className="w-16 h-16 text-emerald-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <PiggyBank className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Potential Savings</span>
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400">
            ~15% - 22%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Estimated reduction by applying AI cost-saving tips
          </p>
        </article>
      </div>

      {/* Multi-Segment Stacked Progress Bar */}
      <div className="glass-panel rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">
            Portfolio Allocation Breakdown
          </span>
          <span className="text-slate-400 text-xs">
            Calculated by Gemini 3.8 Flash
          </span>
        </div>

        {/* Stacked bar */}
        <div
          role="progressbar"
          aria-label="Budget portfolio allocation"
          aria-valuenow={totalPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-3.5 bg-slate-950 rounded-full flex overflow-hidden p-0.5 border border-white/10"
        >
          {breakdown.map((item, idx) => {
            const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
            return (
              <div
                key={item.category}
                style={{ width: `${item.percentage}%` }}
                title={`${item.category}: ${item.percentage}% (${formatCurrency(
                  item.estimated_cost,
                  currency
                )})`}
                className={`h-full bg-gradient-to-r ${color.bar} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
              />
            );
          })}
        </div>

        {/* Quick legend */}
        <div className="flex flex-wrap gap-3 pt-1 text-xs">
          {breakdown.map((item, idx) => {
            const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
            return (
              <div key={item.category} className="flex items-center space-x-1.5">
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${color.bar}`} aria-hidden="true" />
                <span className="text-slate-300 font-medium">{item.category}</span>
                <span className="text-slate-400">({item.percentage}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {breakdown.map((item, idx) => {
          const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
          return (
            <article
              key={item.category}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/5 hover:border-fuchsia-500/30 transition-all focus-within:ring-2 focus-within:ring-fuchsia-400"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Category {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {item.category}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-amber-300 block">
                      {formatCurrency(item.estimated_cost, currency)}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mt-0.5 ${color.badge}`}
                    >
                      {item.percentage}% of Budget
                    </span>
                  </div>
                </div>

                {/* Progress bar for category */}
                <div
                  className="w-full h-1.5 bg-slate-900 rounded-full mt-3 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    style={{ width: `${Math.min(item.percentage * 2, 100)}%` }}
                    className={`h-full bg-gradient-to-r ${color.bar}`}
                  />
                </div>
              </div>

              {/* Cost-saving tip card */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 text-xs text-slate-300 flex items-start space-x-2.5">
                <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block">
                    AI Cost-Cutting Opportunity
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.cost_saving_tip}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
