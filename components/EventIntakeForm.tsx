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
  "Vintage Champagne & Golden Glamour",
  "Tropical Sunset & Beachside Acoustic",
  "Royal Velvet & Candlelit Elegance",
];

const EVENT_TYPES = [
  "Wedding",
  "Birthday Party",
  "Conference / Gala",
  "Corporate Retreat",
  "Cocktail Reception",
  "Anniversary Celebration",
  "Product Launch",
  "Charity Fundraiser",
];

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
    <div id="intake-section" className="w-full">
      {/* 1-Click Demo Presets Bar for Judges */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              One-Click Hackathon Demo Presets
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Instant evaluation data for judges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`relative group text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-fuchsia-950/40 border-fuchsia-500 shadow-glow"
                    : "bg-slate-900/60 border-white/10 hover:border-fuchsia-500/40 hover:bg-slate-900/90"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{preset.emoji}</span>
                    <span className="font-bold text-sm text-slate-100 group-hover:text-fuchsia-300 transition-colors">
                      {preset.name}
                    </span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-white/10 text-slate-300">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </p>
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
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              <span>Event Intake & Parameters</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Powered by <span className="text-purple-400 font-semibold">Gemini 3.8 Flash</span> heavy reasoning engine
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Currency:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-white/10">
              {(["INR", "USD", "EUR"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setFormData({ ...formData, currency: cur })}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Title / Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.eventTitle}
                onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                placeholder="e.g., Mia & David's Vineyard Wedding"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Category
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full glass-input px-3 py-2.5 rounded-xl text-sm bg-slate-900"
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Guest Count</span>
              </span>
              <span className="text-sm font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                {formData.guestCount} Guests
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="5"
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({ ...formData, guestCount: parseInt(e.target.value) || 10 })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Intimate (10)</span>
              <span>Medium (150)</span>
              <span>Large Gathering (1,000)</span>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Total Target Budget</span>
              </span>
              <span className="text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                {formatCurrency(formData.totalBudget, formData.currency)}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={formData.totalBudget}
              onChange={(e) =>
                setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 1000 })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>{formatCurrency(1000, formData.currency)}</span>
              <span>{formatCurrency(50000, formData.currency)}</span>
              <span>{formatCurrency(200000, formData.currency)}</span>
            </div>
          </div>
        </div>

        {/* Location & Desired Vibe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Location / Venue Concept</span>
            </label>
            <input
              type="text"
              value={formData.locationOrVenue}
              onChange={(e) => setFormData({ ...formData, locationOrVenue: e.target.value })}
              placeholder="e.g. Hilltop Barn & Orchard, Napa Valley or Urban Loft"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Aesthetic / Vibe Keywords</span>
            </label>
            <input
              type="text"
              value={formData.vibe}
              onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
              placeholder="e.g. Boho rustic, amber fairy lights, dried floral installations"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Quick Vibe Chips */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Quick Vibe Suggestions (click to append):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_VIBES.map((vibeSuggestion) => (
              <button
                key={vibeSuggestion}
                type="button"
                onClick={() => setFormData({ ...formData, vibe: vibeSuggestion })}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-fuchsia-950/60 border border-white/10 hover:border-fuchsia-500/40 text-slate-300 transition-colors"
              >
                + {vibeSuggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Special Requirements */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Special Requirements / Must-Haves</span>
          </label>
          <textarea
            rows={2}
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            placeholder="e.g. Farm-to-table vegan dishes, late-night DJ, photo booth with vintage props..."
            className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 resize-none"
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero database required &bull; Auto-synced to local storage</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin text-white" />
                <span>Crafting Master Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Master Blueprint (Gemini 3.8 Flash)</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
