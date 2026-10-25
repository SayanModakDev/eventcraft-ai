"use client";

import React, { useState } from "react";
import {
  Users2,
  CheckCircle2,
  MessageSquare,
  AlertOctagon,
  Copy,
  Check,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { VendorChecklist } from "@/types/event";

interface VendorPlaybookProps {
  checklists: VendorChecklist[];
}

export default function VendorPlaybook({ checklists }: VendorPlaybookProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopyQuestion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Users2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Vendor Playbook & Negotiation Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Deliverables checklist, contract negotiation scripts, and critical red flags to avoid
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 self-start sm:self-auto">
          {checklists.length} Vendor Categories Covered
        </span>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {checklists.map((vendor, vIdx) => (
          <div
            key={vendor.vendor_type || vIdx}
            className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between"
          >
            {/* Vendor Title Bar */}
            <div className="p-5 bg-slate-950/70 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                  {vendor.vendor_type.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {vendor.vendor_type}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    SOP & Contract Playbook
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-5 flex-1">
              {/* Deliverables Section */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory Contract Deliverables</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {vendor.suggested_deliverables?.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start space-x-2 bg-slate-900/40 p-2 rounded-lg border border-white/5"
                    >
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negotiation Questions / Scripts */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hardball Negotiation Scripts (Click to Copy)</span>
                </span>
                <div className="space-y-2">
                  {vendor.negotiation_questions?.map((q, qIdx) => {
                    const copyId = `${vIdx}-${qIdx}`;
                    const isCopied = copiedIndex === copyId;

                    return (
                      <div
                        key={qIdx}
                        onClick={() => handleCopyQuestion(q, copyId)}
                        className="group flex items-start justify-between gap-3 p-2.5 rounded-xl bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-800/30 hover:border-cyan-500/40 cursor-pointer transition-all"
                      >
                        <p className="text-xs text-slate-200 italic leading-relaxed">
                          &ldquo;{q}&rdquo;
                        </p>
                        <button
                          type="button"
                          className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-cyan-300 transition-colors"
                          title="Copy script to clipboard"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Red Flags Section */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Contract Red Flags to Avoid</span>
                </span>
                <ul className="space-y-1.5 text-xs text-rose-200/90">
                  {vendor.red_flags_to_avoid?.map((flag, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start space-x-2 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30"
                    >
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-slate-300">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
