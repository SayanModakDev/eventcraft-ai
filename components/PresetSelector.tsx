import React from "react";
import { Zap } from "lucide-react";
import { DEMO_PRESETS, DemoPreset } from "@/lib/presets";
import { formatCurrency } from "@/lib/utils";

interface PresetSelectorProps {
  activePresetId?: string;
  onSelectPreset: (preset: DemoPreset) => void;
}

/**
 * 5-Preset responsive selector grid with instant hackathon evaluation blueprints.
 */
export default function PresetSelector({
  activePresetId,
  onSelectPreset,
}: PresetSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            One-Click Hackathon Demo Presets
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Instant evaluation data across 5 celebration types
        </span>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        role="group"
        aria-label="Preset event templates"
      >
        {DEMO_PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Load preset template: ${preset.name}`}
              tabIndex={0}
              onClick={() => onSelectPreset(preset)}
              className={`relative group text-left p-3.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 flex flex-col justify-between ${
                isSelected
                  ? "bg-fuchsia-950/50 border-fuchsia-500 shadow-glow"
                  : "bg-slate-900/60 border-white/10 hover:border-fuchsia-500/40 hover:bg-slate-900/90"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xl" aria-hidden="true">
                      {preset.emoji}
                    </span>
                    <span className="font-bold text-xs text-slate-100 group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                      {preset.name}
                    </span>
                  </div>
                </div>
                <span className="inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold bg-white/10 text-slate-300 mt-1">
                  {preset.badge}
                </span>
                <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-white/5">
                <span>{preset.data.guestCount} Guests</span>
                <span className="text-amber-400 font-semibold">
                  {formatCurrency(preset.data.totalBudget, preset.data.currency)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

