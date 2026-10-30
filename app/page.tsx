"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Printer,
  Share2,
  Download,
  Calendar,
  Users,
  Coins,
  MapPin,
  CheckCircle,
  Cpu,
  Zap,
  Code2,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import EventIntakeForm from "@/components/EventIntakeForm";
import BudgetVisualizer from "@/components/BudgetVisualizer";
import TimelineChecklist from "@/components/TimelineChecklist";
import VendorPlaybook from "@/components/VendorPlaybook";
import CreativeAesthetics from "@/components/CreativeAesthetics";
import QuickRefineChat from "@/components/QuickRefineChat";
import StepLoader from "@/components/StepLoader";
import { EventPlan, EventIntakeData } from "@/types/event";
import { DEMO_PRESETS, DemoPreset } from "@/lib/presets";
import { formatCurrency } from "@/lib/utils";
import confetti from "canvas-confetti";
import Logo from "@/components/Logo";

type ActiveTab = "overview" | "budget" | "timeline" | "vendors" | "aesthetics" | "json";

const STORAGE_KEY = "eventcraft_active_plan";

export default function HomePage() {
  const [activePlan, setActivePlan] = useState<EventPlan | null>(null);
  const [activePresetId, setActivePresetId] = useState<string>("rustic-wedding");
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopiedJson, setIsCopiedJson] = useState<boolean>(false);
  const [generationMeta, setGenerationMeta] = useState<{
    modelUsed: string;
    isLive: boolean;
    note?: string;
  }>({
    modelUsed: "gemini-3.8-flash",
    isLive: false,
  });

  // Load cached plan from localStorage or seed with default preset
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed: EventPlan = JSON.parse(cached);
        setActivePlan(parsed);
        return;
      }
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    }

    // Default seed to Rustic Wedding preset for instant evaluation
    const defaultPreset = DEMO_PRESETS[0];
    const initialPlan = {
      ...defaultPreset.mockBlueprint,
      guest_count: defaultPreset.data.guestCount,
      location: defaultPreset.data.locationOrVenue,
      eventType: defaultPreset.data.eventType,
      created_at: new Date().toISOString(),
    };
    setActivePlan(initialPlan);
  }, []);

  // Save active plan to localStorage
  const savePlan = (plan: EventPlan) => {
    setActivePlan(plan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
  };

  // Preset Selection: immediately update form AND load the preset's master blueprint
  const handleSelectPreset = (preset: DemoPreset) => {
    setActivePresetId(preset.id);
    const newPlan: EventPlan = {
      ...preset.mockBlueprint,
      guest_count: preset.data.guestCount,
      location: preset.data.locationOrVenue,
      eventType: preset.data.eventType,
      created_at: new Date().toISOString(),
    };
    savePlan(newPlan);
    setGenerationMeta({
      modelUsed: "gemini-3.8-flash (instant preset cache)",
      isLive: false,
      note: `Loaded ${preset.name} demonstration blueprint.`,
    });
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#d946ef", "#f59e0b", "#06b6d4"],
    });
  };

  // Form Submit -> Call API /api/plan (Gemini 3.8 Flash)
  const handleGeneratePlan = async (intake: EventIntakeData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intake),
      });

      const data = await response.json();

      if (data.plan) {
        savePlan(data.plan);
        setGenerationMeta({
          modelUsed: data.model_used || "gemini-3.8-flash",
          isLive: !!data.is_live,
          note: data.note,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d946ef", "#8b5cf6", "#f59e0b", "#06b6d4"],
        });

        // Auto scroll to results section
        const resultsEl = document.getElementById("plan-results");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Failed to generate plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Print / Save as PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Copy raw JSON
  const handleCopyJson = () => {
    if (!activePlan) return;
    navigator.clipboard.writeText(JSON.stringify(activePlan, null, 2));
    setIsCopiedJson(true);
    setTimeout(() => setIsCopiedJson(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Step by step loader during generation */}
      <StepLoader isLoading={isLoading} />

      {/* Hero Intro Section (Hidden on Print) */}
      <div className="text-center space-y-5 max-w-3xl mx-auto no-print flex flex-col items-center">
        {/* Brand Logo Showcase */}
        <div className="pt-2">
          <Logo size="lg" variant="stacked" showSubtitle={false} />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Hack2skill &bull; PromptWars Challenge 5 Autonomous Event Agent</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Plan Unforgettable Celebrations in{" "}
          <span className="text-gradient-brand">Seconds</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From rustic meadow weddings to cyberpunk bashes and AI tech galas.
          Powered by <strong className="text-fuchsia-400">Gemini 3.8 Flash</strong> for deep mathematical budgeting and vendor playbooks, with <strong className="text-amber-400">Gemini 3.1 Flash-Lite</strong> for instant real-time tweaks.
        </p>
      </div>

      {/* Intake Form Container (Hidden on Print) */}
      <div className="no-print">
        <EventIntakeForm
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />
      </div>

      {/* Master Blueprint Results Section */}
      {activePlan && (
        <section id="plan-results" className="print-area space-y-6 pt-6">
          {/* Top Bar for Results: Title, Model Badge, Print/Export */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                  {activePlan.eventType || "Celebration"}
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs text-slate-300 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400 inline mr-1" />
                  {activePlan.guest_count || 100} Guests
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs text-amber-400 font-bold">
                  {formatCurrency(activePlan.total_budget, activePlan.currency)} Budget
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activePlan.event_title}
              </h2>
              <p className="text-xs sm:text-sm text-fuchsia-300/90 italic mt-0.5">
                &ldquo;{activePlan.theme_tagline}&rdquo;
              </p>
            </div>

            {/* Model & Export Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 no-print">
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />
                <span className="text-slate-300 font-medium">{generationMeta.modelUsed}</span>
              </div>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Save as PDF / Print</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-fuchsia-950/60 hover:bg-fuchsia-900/60 text-fuchsia-300 border border-fuchsia-500/30 flex items-center space-x-1.5 transition-all"
              >
                {isCopiedJson ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Hidden on Print) */}
          <div className="flex overflow-x-auto space-x-2 border-b border-white/10 pb-2 no-print scrollbar-none">
            {[
              { id: "overview", label: "Executive Summary", icon: Layers },
              { id: "budget", label: "Budget Allocation", icon: Coins },
              { id: "timeline", label: "Phased Timeline", icon: Calendar },
              { id: "vendors", label: "Vendor Playbook", icon: Users },
              { id: "aesthetics", label: "Aesthetics & Vibe", icon: Sparkles },
              { id: "json", label: "Raw JSON Blueprint", icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-fuchsia-600 text-white shadow-glow"
                      : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Tabs */}
          <div className="print:hidden">
            {/* TAB 1: EXECUTIVE SUMMARY */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-fuchsia-400" />
                    <span>Event Vision & Strategic Overview</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Audience Profile
                      </span>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {activePlan.audience_profile}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Venue Concept & Location
                      </span>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {activePlan.location || "Curated Celebration Venue"}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        AI Architecture
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        Generated by Gemini 3.8 Flash &bull; Dual-Model Real-Time Co-Pilot enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compact Snapshot of All 4 Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Budget Snapshot */}
                  <div className="glass-panel rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span>Budget Breakdown</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab("budget")}
                        className="text-xs text-amber-400 hover:underline no-print flex items-center"
                      >
                        <span>Explore all</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {activePlan.budget_breakdown?.slice(0, 3).map((item) => (
                        <div
                          key={item.category}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 text-xs"
                        >
                          <span className="text-slate-300 font-medium">{item.category}</span>
                          <span className="text-amber-400 font-bold">
                            {formatCurrency(item.estimated_cost, activePlan.currency)} ({item.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Snapshot */}
                  <div className="glass-panel rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4 text-fuchsia-400" />
                        <span>Phased Roadmap</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab("timeline")}
                        className="text-xs text-fuchsia-400 hover:underline no-print flex items-center"
                      >
                        <span>View checklist</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {activePlan.timeline_milestones?.slice(0, 3).map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-950/40 text-xs flex items-center justify-between"
                        >
                          <span className="text-slate-200 font-medium truncate mr-2">
                            {m.phase}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 shrink-0">
                            {m.tasks?.length || 0} Tasks
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vendor Snapshot */}
                  <div className="glass-panel rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>Vendor Playbook</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab("vendors")}
                        className="text-xs text-cyan-400 hover:underline no-print flex items-center"
                      >
                        <span>Read playbook</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePlan.vendor_checklists?.map((v) => (
                        <span
                          key={v.vendor_type}
                          className="px-3 py-1 rounded-xl text-xs bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-medium"
                        >
                          {v.vendor_type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Aesthetics Snapshot */}
                  <div className="glass-panel rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Curated Aesthetic</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab("aesthetics")}
                        className="text-xs text-emerald-400 hover:underline no-print flex items-center"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {activePlan.personalized_ideas?.decor_concept}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BUDGET ALLOCATION */}
            {activeTab === "budget" && (
              <BudgetVisualizer
                totalBudget={activePlan.total_budget}
                currency={activePlan.currency}
                breakdown={activePlan.budget_breakdown || []}
              />
            )}

            {/* TAB 3: PHASED TIMELINE */}
            {activeTab === "timeline" && (
              <TimelineChecklist milestones={activePlan.timeline_milestones || []} />
            )}

            {/* TAB 4: VENDOR PLAYBOOK */}
            {activeTab === "vendors" && (
              <VendorPlaybook checklists={activePlan.vendor_checklists || []} />
            )}

            {/* TAB 5: AESTHETICS & VIBE */}
            {activeTab === "aesthetics" && (
              <CreativeAesthetics
                ideas={activePlan.personalized_ideas}
                eventTitle={activePlan.event_title}
              />
            )}

            {/* TAB 6: RAW JSON BLUEPRINT INSPECTOR FOR JUDGES */}
            {activeTab === "json" && (
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-fuchsia-400" />
                      <span>Raw Master JSON Blueprint (Gemini 3.8 Flash)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Strict adherence to Challenge 5 schema specifications
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center space-x-1.5 transition-all"
                  >
                    {isCopiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 overflow-x-auto max-h-[550px] font-mono text-xs text-emerald-400 leading-relaxed">
                  <pre>{JSON.stringify(activePlan, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* DEDICATED FULL PRINT DOSSIER (Visible only when Printing / Saving as PDF) */}
          <div className="hidden print:block space-y-8">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-bold text-black">{activePlan.event_title}</h1>
              <p className="text-sm italic text-gray-700">{activePlan.theme_tagline}</p>
              <div className="mt-2 text-xs text-gray-600 flex gap-4">
                <span>Budget: {formatCurrency(activePlan.total_budget, activePlan.currency)}</span>
                <span>Guests: {activePlan.guest_count || 100}</span>
                <span>Venue: {activePlan.location || "Curated Venue"}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold border-b pb-1 text-black">1. Budget Allocation Breakdown</h2>
              <table className="w-full text-xs text-left border">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-2">Category</th>
                    <th className="p-2">Allocation</th>
                    <th className="p-2">Estimated Cost</th>
                    <th className="p-2">Cost-Cutting Tip</th>
                  </tr>
                </thead>
                <tbody>
                  {activePlan.budget_breakdown?.map((b) => (
                    <tr key={b.category} className="border-b">
                      <td className="p-2 font-medium">{b.category}</td>
                      <td className="p-2">{b.percentage}%</td>
                      <td className="p-2">{formatCurrency(b.estimated_cost, activePlan.currency)}</td>
                      <td className="p-2 text-gray-700">{b.cost_saving_tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 print-page-break">
              <h2 className="text-lg font-bold border-b pb-1 text-black">2. Sequential Timeline & Milestones</h2>
              {activePlan.timeline_milestones?.map((phase, pIdx) => (
                <div key={pIdx} className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900">{phase.phase}</h3>
                  <ul className="text-xs list-disc pl-5 space-y-1">
                    {phase.tasks?.map((t, tIdx) => (
                      <li key={tIdx}>
                        <strong>[{t.priority}] {t.task_name}</strong>: {t.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-4 print-page-break">
              <h2 className="text-lg font-bold border-b pb-1 text-black">3. Vendor Playbook & Negotiation</h2>
              {activePlan.vendor_checklists?.map((v, vIdx) => (
                <div key={vIdx} className="border p-3 rounded mb-3 space-y-2">
                  <h3 className="text-sm font-bold text-gray-900">{v.vendor_type} Playbook</h3>
                  <div className="text-xs">
                    <strong>Deliverables:</strong> {v.suggested_deliverables?.join("; ")}
                  </div>
                  <div className="text-xs">
                    <strong>Negotiation Questions:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      {v.negotiation_questions?.map((q, qIdx) => (
                        <li key={qIdx} className="italic">&ldquo;{q}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-red-800">
                    <strong>Red Flags:</strong> {v.red_flags_to_avoid?.join("; ")}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b pb-1 text-black">4. Creative Aesthetics & Invitation Copy</h2>
              <div className="text-xs space-y-1.5">
                <p><strong>Decor:</strong> {activePlan.personalized_ideas?.decor_concept}</p>
                <p><strong>Signature Moment:</strong> {activePlan.personalized_ideas?.signature_activity}</p>
                <p><strong>Soundscape:</strong> {activePlan.personalized_ideas?.curated_playlist_vibe}</p>
                <div className="p-3 bg-gray-50 border rounded italic mt-2">
                  &ldquo;{activePlan.personalized_ideas?.invitation_copy}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Persistent AI Co-pilot Chat Drawer (Gemini 3.1 Flash-Lite) */}
      <QuickRefineChat
        currentPlan={activePlan}
        onUpdatePlan={(updated) => {
          if (activePlan) {
            savePlan({ ...activePlan, ...updated });
          }
        }}
      />
    </div>
  );
}
