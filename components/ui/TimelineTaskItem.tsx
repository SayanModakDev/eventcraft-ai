import React from "react";
import { CheckCircle, Circle, AlertTriangle, Flag } from "lucide-react";
import { TimelineTask } from "@/types/event";

interface TimelineTaskItemProps {
  task: TimelineTask;
  isCompleted: boolean;
  onToggle: () => void;
}

/**
 * Individual checklist task row with priority chip, checkbox toggle, and description.
 */
export default function TimelineTaskItem({
  task,
  isCompleted,
  onToggle,
}: TimelineTaskItemProps) {
  const renderPriorityBadge = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-2.5 h-2.5 mr-1" aria-hidden="true" />
            High Priority
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Flag className="w-2.5 h-2.5 mr-1" aria-hidden="true" />
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-300 border border-slate-500/30">
            Low
          </span>
        );
    }
  };

  return (
    <article
      tabIndex={0}
      role="checkbox"
      aria-checked={isCompleted}
      aria-label={`Task: ${task.task_name}, Priority: ${task.priority}. ${
        isCompleted ? "Completed" : "Incomplete"
      }. Press Enter or Space to toggle`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
        isCompleted
          ? "bg-slate-950/20 border-white/5 opacity-60"
          : "bg-slate-950/50 border-white/10 hover:border-fuchsia-500/40 hover:bg-slate-900/60"
      }`}
    >
      <div className="mt-0.5 shrink-0 text-fuchsia-400 group-hover:scale-110 transition-transform">
        {isCompleted ? (
          <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
        ) : (
          <Circle className="w-4 h-4 text-slate-400 group-hover:text-fuchsia-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span
            className={`text-xs font-bold transition-all ${
              isCompleted ? "line-through text-slate-400" : "text-white group-hover:text-fuchsia-300"
            }`}
          >
            {task.task_name}
          </span>
          {renderPriorityBadge(task.priority)}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {task.description}
        </p>
      </div>
    </article>
  );
}
