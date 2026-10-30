"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Users,
  Coins,
  MapPin,
  Palette,
  FileText,
  Wand2,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { EventIntakeData, Currency } from "@/types/event";
import { DEMO_PRESETS, DemoPreset } from "@/lib/presets";
import { formatCurrency } from "@/lib/utils";

interface EventIntakeFormProps {
  onSubmit: (data: EventIntakeData) => void;
  isLoading: boolean;
  activePresetId?: string;
  onSelectPreset?: (preset: DemoPreset) => void;
}

const POPULAR_VIBES = [
  "Rustic Bohemia & Warm Festoon Lights",
  "Cyberpunk Neon & Heavy Bass",
  "Minimalist Obsidian & Sleek Tech",
  "Royal Mewar Silk & Traditional Dhol",
  "Parisian Classical Luxury & Candelabras",
  "Tropical Sunset & Beachside Acoustic",
] as const;

const EVENT_TYPES = [
  "Wedding",
  "Birthday Party",
  "Conference / Gala",
  "Cultural Celebration",
  "Anniversary Celebration",
  "Corporate Retreat",
  "Cocktail Reception",
  "Product Launch",
  "Charity Fundraiser",
] as const;

export default function EventIntakeForm({
  onSubmit,
  isLoading,
  activePresetId,
  onSelectPreset,
}: EventIntakeFormProps) {
  const [formData, setFormData] = useState<EventIntakeData>({
    eventType: "Wedding",
    eventTitle: "Autumn Meadow Romantic Wedding",
    guestCount: 120,
    totalBudget: 25000,
    currency: "USD",
    vibe: "Rustic Bohemia, warm amber lanterns, reclaimed wood banquet tables, lush greenery florals",
    locationOrVenue: "Scenic Hilltop Barn & Orchard, Napa Valley",
    specialRequirements: "Farm-to-table artisanal dinner, gluten-free dessert bar, acoustic trio for ceremony",
  });

  const handleApplyPreset = (preset: DemoPreset) => {
    setFormData({ ...preset.data });
    if (onSelectPreset) {
      onSelectPreset(preset);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="intake-section" aria-label="Event Intake and Configuration" className="w-full">
      {/* 1-Click Demo Presets Bar for Judges */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              One-Click Hackathon Demo Presets
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Instant evaluation data across 5 celebration types
          </span>
        </div>

        {/* 5 Presets Grid with full keyboard accessibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" role="group" aria-label="Preset event templates">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Load preset template: ${preset.name}`}
                tabIndex={0}
                onClick={() => handleApplyPreset(preset)}
                className={`relative group text-left p-3.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 flex flex-col justify-between ${
                  isSelected
                    ? "bg-fuchsia-950/50 border-fuchsia-500 shadow-glow"
                    : "bg-slate-900/60 border-white/10 hover:border-fuchsia-500/40 hover:bg-slate-900/90"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xl" aria-hidden="true">{preset.emoji}</span>
                      <span className="font-bold text-xs text-slate-100 group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                        {preset.name}
                      </span>
                    </div>
                  </div>
                  <span className="inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold bg-white/10 text-slate-300 mt-1">
                    {preset.badge}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-white/5">
                  <span>{preset.data.guestCount} Guests</span>
                  <span className="text-amber-400 font-semibold">
                    {formatCurrency(preset.data.totalBudget, preset.data.currency)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Intake Form Container */}
      <form onSubmit={handleSubmit} aria-label="Event Configuration Form" className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" aria-hidden="true" />
              <span>Event Intake &amp; Parameters</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Powered by <span className="text-purple-400 font-semibold">Gemini 3.8 Flash</span> heavy reasoning engine
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span id="currency-selector-label" className="text-xs text-slate-300 font-medium">Currency:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-white/10" role="radiogroup" aria-labelledby="currency-selector-label">
              {(["INR", "USD", "EUR"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  role="radio"
                  aria-checked={formData.currency === cur}
                  aria-label={`Select currency ${cur}`}
                  tabIndex={0}
                  onClick={() => setFormData({ ...formData, currency: cur })}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                    formData.currency === cur
                      ? "bg-fuchsia-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cur === "INR" ? "₹ INR" : cur === "USD" ? "$ USD" : "€ EUR"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Info: Title & Event Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="event-title-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Title / Name <span className="text-rose-400" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                id="event-title-input"
                type="text"
                required
                aria-required="true"
                value={formData.eventTitle}
                onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                placeholder="e.g., Mia & David's Vineyard Wedding"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-category-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Category
            </label>
            <select
              id="event-category-select"
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full glass-input px-3 py-2.5 rounded-xl text-sm bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders: Guest Count & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950/40 border border-white/5">
          {/* Guest Count Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="guest-count-slider" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5 cursor-pointer">
                <Users className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Guest Count</span>
              </label>
              <span className="text-sm font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                {formData.guestCount} Guests
              </span>
            </div>
            <input
              id="guest-count-slider"
              type="range"
              min="10"
              max="1000"
              step="5"
              aria-label="Guest count slider"
              aria-valuemin={10}
              aria-valuemax={1000}
              aria-valuenow={formData.guestCount}
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({ ...formData, guestCount: parseInt(e.target.value) || 10 })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Intimate (10)</span>
              <span>Medium (150)</span>
              <span>Large Gathering (1,000)</span>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="total-budget-slider" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5 cursor-pointer">
                <Coins className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Total Target Budget</span>
              </label>
              <span className="text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                {formatCurrency(formData.totalBudget, formData.currency)}
              </span>
            </div>
            <input
              id="total-budget-slider"
              type="range"
              min="1000"
              max="200000"
              step="1000"
              aria-label="Total budget slider"
              aria-valuemin={1000}
              aria-valuemax={200000}
              aria-valuenow={formData.totalBudget}
              value={formData.totalBudget}
              onChange={(e) =>
                setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 1000 })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatCurrency(1000, formData.currency)}</span>
              <span>{formatCurrency(50000, formData.currency)}</span>
              <span>{formatCurrency(200000, formData.currency)}</span>
            </div>
          </div>
        </div>

        {/* Location & Desired Vibe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location-venue-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
              <span>Location / Venue Concept</span>
            </label>
            <input
              id="location-venue-input"
              type="text"
              value={formData.locationOrVenue}
              onChange={(e) => setFormData({ ...formData, locationOrVenue: e.target.value })}
              placeholder="e.g. Hilltop Barn & Orchard, Napa Valley or Urban Loft"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            />
          </div>

          <div>
            <label htmlFor="aesthetic-vibe-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
              <span>Aesthetic / Vibe Keywords</span>
            </label>
            <input
              id="aesthetic-vibe-input"
              type="text"
              value={formData.vibe}
              onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
              placeholder="e.g. Boho rustic, amber fairy lights, dried floral installations"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            />
          </div>
        </div>

        {/* Quick Vibe Chips */}
        <div>
          <span className="text-xs text-slate-300 block mb-2 font-medium">
            Quick Vibe Suggestions (click to append):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_VIBES.map((vibeSuggestion) => (
              <button
                key={vibeSuggestion}
                type="button"
                aria-label={`Append vibe: ${vibeSuggestion}`}
                tabIndex={0}
                onClick={() => setFormData({ ...formData, vibe: vibeSuggestion })}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-fuchsia-950/60 border border-white/10 hover:border-fuchsia-500/40 text-slate-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                + {vibeSuggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Special Requirements */}
        <div>
          <label htmlFor="special-requirements-textarea" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>Special Requirements / Must-Haves</span>
          </label>
          <textarea
            id="special-requirements-textarea"
            rows={2}
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            placeholder="e.g. Farm-to-table vegan dishes, late-night DJ, photo booth with vintage props..."
            className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Zero database required &bull; Auto-synced to local storage</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                <span>Crafting Master Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Generate Master Blueprint (Gemini 3.8 Flash)</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
