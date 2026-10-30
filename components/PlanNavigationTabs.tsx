"use client";

import React from "react";
import {
  Layers,
  Coins,
  Calendar,
  Clock,
  UtensilsCrossed,
  Users,
  Sparkles,
  Code2,
} from "lucide-react";

export type ActiveTab =
  | "overview"
  | "budget"
  | "timeline"
  | "schedule"
  | "dietary"
  | "vendors"
  | "aesthetics"
  | "json";

interface PlanNavigationTabsProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

const TABS = [
  { id: "overview", label: "Executive Summary", icon: Layers },
  { id: "budget", label: "Budget Allocation", icon: Coins },
  { id: "timeline", label: "Phased Timeline", icon: Calendar },
  { id: "schedule", label: "Day-of Schedule", icon: Clock },
  { id: "dietary", label: "Dietary & Logistics", icon: UtensilsCrossed },
  { id: "vendors", label: "Vendor Playbook", icon: Users },
  { id: "aesthetics", label: "Aesthetics & Vibe", icon: Sparkles },
  { id: "json", label: "Raw JSON Blueprint", icon: Code2 },
] as const;

/**
 * Responsive scrollable navigation bar for switching between plan view tabs.
 */
export default function PlanNavigationTabs({
  activeTab,
  onSelectTab,
}: PlanNavigationTabsProps) {
  return (
    <nav
      aria-label="Plan Sections Navigation"
      className="flex overflow-x-auto space-x-2 border-b border-white/10 pb-2 no-print scrollbar-none"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onSelectTab(tab.id as ActiveTab)}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            role="tab"
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-fuchsia-400 ${
              isActive
                ? "bg-fuchsia-600 text-white shadow-glow"
                : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

