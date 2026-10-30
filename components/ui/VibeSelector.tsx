import React from "react";
import { Palette } from "lucide-react";

interface VibeSelectorProps {
  value: string;
  popularVibes: readonly string[];
  onChange: (vibe: string) => void;
}

/**
 * Reusable aesthetic vibe input with clickable quick-suggestion chips.
 */
export default function VibeSelector({
  value,
  popularVibes,
  onChange,
}: VibeSelectorProps) {
  return (
    <div className="space-y-2">
      <div>
        <label
          htmlFor="aesthetic-vibe-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5"
        >
          <Palette className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
          <span>Aesthetic / Vibe Keywords</span>
        </label>
        <input
          id="aesthetic-vibe-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Boho rustic, amber fairy lights"
          className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
        >
        </input>
      </div>

      <div>
        <span className="text-xs text-slate-300 block mb-1.5 font-medium">
          Quick Vibe Suggestions (click to append):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {popularVibes.map((vibeSuggestion) => (
            <button
              key={vibeSuggestion}
              type="button"
              aria-label={`Append vibe: ${vibeSuggestion}`}
              tabIndex={0}
              onClick={() => onChange(vibeSuggestion)}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-fuchsia-950/60 border border-white/10 hover:border-fuchsia-500/40 text-slate-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              + {vibeSuggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

