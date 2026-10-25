"use client";

import React, { useState } from "react";
import {
  CalendarClock,
  CheckCircle,
  Circle,
  Flag,
  Sparkles,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { TimelineMilestone } from "@/types/event";
import confetti from "canvas-confetti";

interface TimelineChecklistProps {
  milestones: TimelineMilestone[];
  onToggleTask?: (phaseIndex: number, taskIndex: number, completed: boolean) => void;
}

export default function TimelineChecklist({
  milestones,
  onToggleTask,
}: TimelineChecklistProps) {
  // Local state to track completed tasks by composite key: `phaseIdx-taskIdx`
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const totalTasks = milestones.reduce(
    (sum, phase) => sum + (phase.tasks?.length || 0),
    0
  );

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleToggle = (phaseIdx: number, taskIdx: number) => {
    const key = `${phaseIdx}-${taskIdx}`;
    const nextState = !completedTasks[key];

    setCompletedTasks((prev) => ({
      ...prev,
      [key]: nextState,
    }));

    if (onToggleTask) {
      onToggleTask(phaseIdx, taskIdx, nextState);
    }

    // Trigger celebratory confetti if user completes milestone or reaches 100%
    if (nextState) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#d946ef", "#f59e0b", "#06b6d4"],
      });
    }
  };

  const getPriorityBadge = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-2.5 h-2.5 mr-1" />
            High Priority
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flag className="w-2.5 h-2.5 mr-1" />
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            Low
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ListChecks className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-base font-bold text-white">
              Event Execution Readiness
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive milestone tracker &bull; Click any task to mark completed
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-sm font-bold text-slate-200">
              {completedCount} of {totalTasks} Tasks Done
            </span>
            <span className="text-xs text-fuchsia-400 block font-semibold">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="w-24 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-fuchsia-500 to-emerald-400 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Sequential Milestone Phases */}
      <div className="space-y-5">
        {milestones.map((phaseGroup, phaseIdx) => {
          const phaseTasks = phaseGroup.tasks || [];
          const phaseDone = phaseTasks.filter((_, tIdx) => completedTasks[`${phaseIdx}-${tIdx}`]).length;
          const isPhaseComplete = phaseTasks.length > 0 && phaseDone === phaseTasks.length;

          return (
            <div
              key={phaseGroup.phase || phaseIdx}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5"
            >
              {/* Phase Header */}
              <div className="px-5 py-3.5 bg-slate-950/60 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-fuchsia-600/20 text-fuchsia-400 font-bold text-xs border border-fuchsia-500/30">
                    {phaseIdx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{phaseGroup.phase}</span>
                      {isPhaseComplete && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Phase Completed
                        </span>
                      )}
                    </h4>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  {phaseDone} / {phaseTasks.length} Done
                </div>
              </div>

              {/* Task Items */}
              <div className="p-4 space-y-2.5 divide-y divide-white/5">
                {phaseTasks.map((task, taskIdx) => {
                  const key = `${phaseIdx}-${taskIdx}`;
                  const isDone = !!completedTasks[key];

                  return (
                    <div
                      key={task.task_name || taskIdx}
                      onClick={() => handleToggle(phaseIdx, taskIdx)}
                      className={`pt-2.5 first:pt-0 flex items-start space-x-3.5 p-2 rounded-xl cursor-pointer transition-all ${
                        isDone
                          ? "bg-emerald-950/20 opacity-70"
                          : "hover:bg-slate-900/60"
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                        aria-label="Toggle task"
                      >
                        {isDone ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`text-sm font-semibold transition-all ${
                              isDone
                                ? "line-through text-slate-500"
                                : "text-slate-100"
                            }`}
                          >
                            {task.task_name}
                          </span>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            isDone ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
