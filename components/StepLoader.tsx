"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Cpu, Loader2 } from "lucide-react";

interface StepLoaderProps {
  isLoading: boolean;
}

const STAGES = [
  { label: "Analyzing theme, aesthetic vibe & audience profile...", duration: 1600 },
  { label: "Balancing category budget ratios & calculating cost-saving tips...", duration: 2200 },
  { label: "Structuring milestone phases & timeline dependencies...", duration: 2400 },
  { label: "Synthesizing vendor deliverables & negotiation scripts...", duration: 2200 },
  { label: "Curating soundscape playlist & ready-to-send invitation...", duration: 2000 },
  { label: "Enforcing strict master JSON schema with Gemini 3.8 Flash...", duration: 1800 },
];

export default function StepLoader({ isLoading }: StepLoaderProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStageIndex(0);
      return;
    }

    let isMounted = true;
    let accumulatedTime = 0;

    const timers = STAGES.map((stage, idx) => {
      accumulatedTime += stage.duration;
      return setTimeout(() => {
        if (isMounted) {
          setCurrentStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
        }
      }, accumulatedTime);
    });

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const currentStage = STAGES[currentStageIndex];
  const progressPercent = Math.round(((currentStageIndex + 1) / STAGES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 shadow-glow relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Glow orb */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-fuchsia-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg">
            <Cpu className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Gemini 3.8 Flash Engine
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                Heavy Reasoner
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Generating autonomous celebration blueprint
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-fuchsia-400 flex items-center space-x-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Step {currentStageIndex + 1} of {STAGES.length}</span>
            </span>
            <span className="text-slate-300 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-fuchsia-600 via-purple-500 to-amber-400 transition-all duration-500"
            />
          </div>
        </div>

        {/* Stages Checklist */}
        <div className="space-y-3">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 text-xs transition-all ${
                  isCurrent
                    ? "text-white font-bold scale-[1.01]"
                    : isCompleted
                    ? "text-slate-400"
                    : "text-slate-600 opacity-60"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Sparkles className="w-4 h-4 text-fuchsia-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700" />
                  )}
                </div>
                <span className={isCurrent ? "text-fuchsia-200" : ""}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
