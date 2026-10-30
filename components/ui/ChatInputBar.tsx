import React from "react";
import { Send } from "lucide-react";

interface ChatInputBarProps {
  input: string;
  isLoading: boolean;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

/**
 * Message text input bar with keyboard enter submission and send action button.
 */
export default function ChatInputBar({
  input,
  isLoading,
  onChange,
  onSubmit,
}: ChatInputBarProps) {
  return (
    <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center space-x-2">
      <label htmlFor="copilot-input" className="sr-only">
        Ask AI Co-Pilot a question or request plan modification
      </label>
      <input
        id="copilot-input"
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder="Ask to adjust guest count, cut budget, etc..."
        className="flex-1 glass-input px-3 py-2 rounded-xl text-xs placeholder:text-slate-500 focus:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      />
      <button
        id="copilot-submit-btn"
        type="button"
        aria-label="Send message to AI co-pilot"
        tabIndex={0}
        disabled={isLoading || !input.trim()}
        onClick={onSubmit}
        className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white hover:opacity-90 disabled:opacity-40 transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <Send className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
