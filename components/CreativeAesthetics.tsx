"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Music2,
  Mail,
  Flame,
  Copy,
  Check,
  Palette,
  Volume2,
  Share2,
} from "lucide-react";
import { PersonalizedIdeas } from "@/types/event";

interface CreativeAestheticsProps {
  ideas: PersonalizedIdeas;
  eventTitle: string;
}

export default function CreativeAesthetics({
  ideas,
  eventTitle,
}: CreativeAestheticsProps) {
  const [copiedInvite, setCopiedInvite] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(ideas.invitation_copy || "");
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-base font-bold text-white">
              Creative Aesthetics & Experience Concept
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Atmospheric decor, curated playlist vibe, signature activations, and ready-to-send invitation copy
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 self-start sm:self-auto">
          Tailored to &ldquo;{eventTitle}&rdquo;
        </span>
      </div>

      {/* Grid of Aesthetics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Decor & Floral Installation Concept */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 hover:border-fuchsia-500/30 transition-all">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Sparkles className="w-20 h-20 text-fuchsia-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                  Visual Identity
                </span>
                <h4 className="text-base font-bold text-white">
                  Decor & Installation Concept
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-2 p-4 rounded-xl bg-slate-950/50 border border-white/5">
              {ideas.decor_concept}
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
            <span>Harmonized with event guest scale and ambient lighting</span>
          </div>
        </div>

        {/* Signature Interactive Activity */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 hover:border-amber-500/30 transition-all">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Flame className="w-20 h-20 text-amber-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Guest Engagement
                </span>
                <h4 className="text-base font-bold text-white">
                  Signature Activation & Moment
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-2 p-4 rounded-xl bg-slate-950/50 border border-white/5">
              {ideas.signature_activity}
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>High viral factor and emotional resonance</span>
          </div>
        </div>

        {/* Curated Soundscape / Playlist Vibe */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 hover:border-cyan-500/30 transition-all">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Music2 className="w-20 h-20 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Music2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Audio Atmosphere
                </span>
                <h4 className="text-base font-bold text-white">
                  Curated Playlist & Soundscape Vibe
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-2 p-4 rounded-xl bg-slate-950/50 border border-white/5">
              {ideas.curated_playlist_vibe}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5 text-cyan-300">
              <Volume2 className="w-3.5 h-3.5" />
              <span>BPM arc: Cocktail &rarr; Dinner &rarr; Peak celebration</span>
            </span>
          </div>
        </div>

        {/* Copy-Pasteable Invitation Copy */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 hover:border-emerald-500/30 transition-all">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Mail className="w-20 h-20 text-emerald-400" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Guest Communications
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Ready-to-Send Invitation Copy
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyInvite}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5 transition-all"
              >
                {copiedInvite ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-950/70 border border-white/5 italic text-sm text-slate-200 leading-relaxed font-serif">
              &ldquo;{ideas.invitation_copy}&rdquo;
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-[11px] text-slate-400">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for WhatsApp, paper cards, or digital RSVP platforms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
