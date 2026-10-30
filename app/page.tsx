"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import EventIntakeForm from "@/components/EventIntakeForm";
import StepLoader from "@/components/StepLoader";
import HeroIntro from "@/components/HeroIntro";
import PlanNavigationTabs, { ActiveTab } from "@/components/PlanNavigationTabs";
import PlanResultsHeader from "@/components/PlanResultsHeader";
import PlanExecutiveOverview, { NavigableTab } from "@/components/PlanExecutiveOverview";
import { EventPlan, EventIntakeData } from "@/types/event";
import { DEMO_PRESETS, DemoPreset } from "@/lib/presets";
import confetti from "canvas-confetti";

// Dynamic imports with code splitting for maximum efficiency & reduced initial JS bundle
const BudgetVisualizer = dynamic(() => import("@/components/BudgetVisualizer"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading budget allocation...</div>,
});
const TimelineChecklist = dynamic(() => import("@/components/TimelineChecklist"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading phased roadmap...</div>,
});
const DayOfScheduleView = dynamic(() => import("@/components/DayOfScheduleView"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading execution schedule...</div>,
});
const DietaryAndLogisticsView = dynamic(() => import("@/components/DietaryAndLogisticsView"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading dietary matrix...</div>,
});
const VendorPlaybook = dynamic(() => import("@/components/VendorPlaybook"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading vendor playbook...</div>,
});
const CreativeAesthetics = dynamic(() => import("@/components/CreativeAesthetics"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading aesthetics &amp; vibe...</div>,
});
const RawJsonViewer = dynamic(() => import("@/components/RawJsonViewer"), {
  loading: () => <div className="p-8 text-center text-slate-400 text-xs">Loading blueprint inspector...</div>,
});
const PrintDossierView = dynamic(() => import("@/components/PrintDossierView"), {
  ssr: false,
});
const QuickRefineChat = dynamic(() => import("@/components/QuickRefineChat"), {
  ssr: false,
});

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

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setActivePlan(JSON.parse(cached));
        return;
      }
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    }

    const defaultPreset = DEMO_PRESETS[0];
    setActivePlan({
      ...defaultPreset.mockBlueprint,
      guest_count: defaultPreset.data.guestCount,
      location: defaultPreset.data.locationOrVenue,
      eventType: defaultPreset.data.eventType,
      created_at: new Date().toISOString(),
    });
  }, []);

  const savePlan = useCallback((plan: EventPlan) => {
    setActivePlan(plan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
  }, []);

  const handleSelectPreset = useCallback((preset: DemoPreset) => {
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
  }, [savePlan]);

  const handleGeneratePlan = useCallback(async (intake: EventIntakeData) => {
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
          isLive: Boolean(data.is_live),
          note: data.note,
        });

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d946ef", "#8b5cf6", "#f59e0b", "#06b6d4"],
        });

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
  }, [savePlan]);

  const handleCopyJson = useCallback(() => {
    if (!activePlan) return;
    navigator.clipboard.writeText(JSON.stringify(activePlan, null, 2));
    setIsCopiedJson(true);
    setTimeout(() => setIsCopiedJson(false), 2000);
  }, [activePlan]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StepLoader isLoading={isLoading} />

      {/* Hero Intro Section */}
      <HeroIntro />

      {/* Intake Form */}
      <section aria-label="Event Configuration" className="no-print">
        <EventIntakeForm
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />
      </section>

      {/* Master Blueprint Results */}
      {activePlan && (
        <section id="plan-results" aria-label="Event Master Blueprint" className="print-area space-y-6 pt-6">
          <PlanResultsHeader
            plan={activePlan}
            modelUsed={generationMeta.modelUsed}
            onPrintPdf={() => window.print()}
            onCopyJson={handleCopyJson}
            isCopiedJson={isCopiedJson}
          />

          <PlanNavigationTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Screen Tab Panels */}
          <div className="print:hidden">
            {activeTab === "overview" && (
              <PlanExecutiveOverview
                plan={activePlan}
                onNavigateTab={(targetTab: NavigableTab) => setActiveTab(targetTab)}
              />
            )}
            {activeTab === "budget" && (
              <BudgetVisualizer
                totalBudget={activePlan.total_budget}
                currency={activePlan.currency}
                breakdown={activePlan.budget_breakdown || []}
              />
            )}
            {activeTab === "timeline" && (
              <TimelineChecklist milestones={activePlan.timeline_milestones || []} />
            )}
            {activeTab === "schedule" && (
              <DayOfScheduleView schedule={activePlan.day_of_schedule} />
            )}
            {activeTab === "dietary" && (
              <DietaryAndLogisticsView
                dietary={activePlan.dietary_breakdown}
                logistics={activePlan.logistics_contingency}
                totalGuests={activePlan.guest_count}
              />
            )}
            {activeTab === "vendors" && (
              <VendorPlaybook checklists={activePlan.vendor_checklists || []} />
            )}
            {activeTab === "aesthetics" && (
              <CreativeAesthetics
                ideas={activePlan.personalized_ideas}
                eventTitle={activePlan.event_title}
              />
            )}
            {activeTab === "json" && (
              <RawJsonViewer
                plan={activePlan}
                isCopied={isCopiedJson}
                onCopy={handleCopyJson}
              />
            )}
          </div>

          {/* Dedicated Full Print Dossier */}
          <PrintDossierView plan={activePlan} />
        </section>
      )}

      {/* Persistent AI Co-pilot Chat Drawer */}
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
