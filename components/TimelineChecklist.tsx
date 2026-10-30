"use client";

import React, { useState } from "react";
import { Sparkles, ListChecks } from "lucide-react";
import { TimelineMilestone } from "@/types/event";
import TimelineTaskItem from "@/components/ui/TimelineTaskItem";
import confetti from "canvas-confetti";

interface TimelineChecklistProps {
  milestones: TimelineMilestone[];
  onToggleTask?: (phaseIndex: number, taskIndex: number, completed: boolean) => void;
}

export default function TimelineChecklist({
  milestones,
  onToggleTask,
}: TimelineChecklistProps) {
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

    if (nextState) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#d946ef", "#f59e0b", "#06b6d4"],
      });
    }
  };

  return (
    <section aria-label="Sequential Milestones Checklist" className="space-y-6">
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ListChecks className="w-5 h-5 text-fuchsia-400" aria-hidden="true" />
            <h3 className="text-base font-bold text-white">Event Execution Readiness</h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Interactive milestone tracker &bull; Click any task to mark completed
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-300 block">Progress</span>
            <span className="text-sm font-bold text-fuchsia-300">
              {completedCount} of {totalTasks} Tasks
            </span>
          </div>

          <div className="w-28 sm:w-36 bg-slate-950 rounded-full h-3 p-0.5 border border-white/10">
            <div
              role="progressbar"
              aria-label="Overall event completion progress"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-full bg-gradient-to-r from-fuchsia-500 to-amber-400 rounded-full transition-all duration-500 shadow-glow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {milestones.map((phase, phaseIdx) => {
          const phaseTasks = phase.tasks || [];
          const phaseCompleted = phaseTasks.filter(
            (_, tIdx) => completedTasks[`${phaseIdx}-${tIdx}`]
          ).length;
          const isPhaseDone = phaseTasks.length > 0 && phaseCompleted === phaseTasks.length;

          return (
            <section
              key={phaseIdx}
              aria-label={phase.phase}
              className="glass-panel rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-fuchsia-600/30 text-fuchsia-300 font-bold text-xs flex items-center justify-center border border-fuchsia-500/40">
                    {phaseIdx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">{phase.phase}</h4>
                </div>

                <div className="flex items-center space-x-2">
                  {isPhaseDone && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                      <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
                      <span>Phase Completed!</span>
                    </span>
                  )}
                  <span className="text-xs text-slate-300 font-medium">
                    {phaseCompleted} / {phaseTasks.length} Done
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group" aria-label={`Tasks for ${phase.phase}`}>
                {phaseTasks.map((task, taskIdx) => {
                  const isCompleted = !!completedTasks[`${phaseIdx}-${taskIdx}`];
                  return (
                    <TimelineTaskItem
                      key={taskIdx}
                      task={task}
                      isCompleted={isCompleted}
                      onToggle={() => handleToggle(phaseIdx, taskIdx)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
