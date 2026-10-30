import React from "react";
import { Zap, RotateCcw, Maximize2, Minimize2, X } from "lucide-react";

interface ChatDrawerHeaderProps {
  isMinimized: boolean;
  onReset: () => void;
  onToggleMinimize: () => void;
  onClose: () => void;
}

/**
 * Top bar header for QuickRefineChat drawer with model badge and window controls.
 */
export default function ChatDrawerHeader({
  isMinimized,
  onReset,
  onToggleMinimize,
  onClose,
}: ChatDrawerHeaderProps) {
  return (
    <div className="p-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div
          aria-hidden="true"
          className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-fuchsia-600 flex items-center justify-center text-white"
        >
          <Zap className="w-4 h-4 fill-white" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <h4 className="text-xs font-bold text-white">EventCraft Co-Pilot</h4>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              3.1 Flash-Lite
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Sub-second low latency assistant</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          aria-label="Reset conversation history"
          tabIndex={0}
          onClick={onReset}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={isMinimized ? "Expand co-pilot drawer" : "Minimize co-pilot drawer"}
          tabIndex={0}
          onClick={onToggleMinimize}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {isMinimized ? <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" /> : <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          aria-label="Close co-pilot drawer"
          tabIndex={0}
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

