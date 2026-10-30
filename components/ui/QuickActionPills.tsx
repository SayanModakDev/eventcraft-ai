import React from "react";

interface QuickActionPillsProps {
  suggestions: readonly string[];
  onSelect: (text: string) => void;
}

/**
 * Horizontal scrollable quick suggestion chips for conversational refinement.
 */
export default function QuickActionPills({
  suggestions,
  onSelect,
}: QuickActionPillsProps) {
  return (
    <div
      role="group"
      aria-label="Quick suggestion prompts"
      className="px-3 py-2 bg-slate-950/60 border-t border-white/5 overflow-x-auto flex space-x-1.5 scrollbar-none"
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          tabIndex={0}
          aria-label={`Ask: ${suggestion}`}
          onClick={() => onSelect(suggestion)}
          className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 hover:border-amber-400/50 hover:text-amber-300 text-slate-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

