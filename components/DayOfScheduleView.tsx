"use client";

import React from "react";
import { Clock, UserCheck, Flag, Sparkles, CheckCircle2 } from "lucide-react";
import { DayOfScheduleItem } from "@/types/event";

interface DayOfScheduleViewProps {
  schedule?: DayOfScheduleItem[];
}

/**
 * Hour-by-hour event day run-of-sheet schedule.
 * Maps timing, critical cues, and assigned coordinators to guarantee flawless day-of execution.
 */
export default function DayOfScheduleView({ schedule = [] }: DayOfScheduleViewProps) {
  if (!schedule || schedule.length === 0) {
    return (
      <section
        aria-label="Day-of Schedule"
        className="glass-panel rounded-2xl p-8 text-center space-y-3 border border-white/10"
      >
        <Clock className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
        <h3 className="text-base font-bold text-white">No Day-of Schedule Generated</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Ask the real-time AI assistant to generate an hour-by-hour run-of-sheet for this event.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Day-of Hour-by-Hour Schedule" className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-2">
        <div className="flex items-center space-x-2.5">
          <Clock className="w-5 h-5 text-cyan-400" aria-hidden="true" />
          <h3 className="text-base font-bold text-white">
            Day-of Run of Sheet & Itinerary
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Minute-by-minute execution timeline mapping vendor handoffs, guest movements, and stage cues.
        </p>
      </div>

      <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6">
        {schedule.map((item, index) => (
          <article
            key={index}
            className="relative glass-panel rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 shadow-md"
          >
            {/* Timeline node icon */}
            <div
              className="absolute -left-[27px] sm:-left-[35px] top-5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300"
              aria-hidden="true"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
                  {item.time}
                </span>
                <span className="text-sm sm:text-base font-bold text-white">
                  {item.activity}
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                <UserCheck className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
                <span className="font-medium text-slate-200">
                  Lead: {item.lead_coordinator_or_vendor}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-xs text-slate-200 bg-slate-950/50 p-3 rounded-xl border border-white/5">
              <Flag className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <span className="font-bold text-amber-300 mr-1.5">Logistical Cue:</span>
                <span className="leading-relaxed">{item.logistical_cue}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

