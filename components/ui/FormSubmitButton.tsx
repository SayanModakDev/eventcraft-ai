import React from "react";
import { CheckCircle2, Wand2, Sparkles, ChevronRight } from "lucide-react";

interface FormSubmitButtonProps {
  isLoading: boolean;
}

/**
 * Submit button action bar for EventIntakeForm with zero-db indicator and loading animation.
 */
export default function FormSubmitButton({ isLoading }: FormSubmitButtonProps) {
  return (
    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-2 text-xs text-slate-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        <span>Zero database required &bull; Auto-synced to local storage</span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
      >
        {isLoading ? (
          <>
            <Wand2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
            <span>Crafting Master Plan...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <span>Generate Master Blueprint (Gemini 3.8 Flash)</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}

