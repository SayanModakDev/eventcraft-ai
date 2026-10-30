"use client";

import React, { useState } from "react";
import { Sparkles, Users, Coins, MapPin, FileText } from "lucide-react";
import { EventIntakeData, Currency } from "@/types/event";
import { DemoPreset } from "@/lib/presets";
import { formatCurrency } from "@/lib/utils";
import PresetSelector from "@/components/PresetSelector";
import CurrencySelector from "@/components/ui/CurrencySelector";
import RangeSlider from "@/components/ui/RangeSlider";
import VibeSelector from "@/components/ui/VibeSelector";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

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
      <PresetSelector activePresetId={activePresetId} onSelectPreset={handleApplyPreset} />

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

          <CurrencySelector
            value={formData.currency}
            onChange={(cur: Currency) => setFormData({ ...formData, currency: cur })}
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="event-title-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Title / Name <span className="text-rose-400" aria-hidden="true">*</span>
            </label>
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

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950/40 border border-white/5">
          <RangeSlider
            id="guest-count-slider"
            label="Guest Count"
            icon={<Users className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
            value={formData.guestCount}
            formattedValue={`${formData.guestCount} Guests`}
            min={10}
            max={1000}
            step={5}
            valueBadgeColor="cyan"
            accentColor="accent-cyan-400"
            focusColor="focus-visible:ring-cyan-400"
            minLabel="Intimate (10)"
            midLabel="Medium (150)"
            maxLabel="Large Gathering (1,000)"
            onChange={(val) => setFormData({ ...formData, guestCount: val })}
          />

          <RangeSlider
            id="total-budget-slider"
            label="Total Target Budget"
            icon={<Coins className="w-4 h-4 text-amber-400" aria-hidden="true" />}
            value={formData.totalBudget}
            formattedValue={formatCurrency(formData.totalBudget, formData.currency)}
            min={1000}
            max={200000}
            step={1000}
            valueBadgeColor="amber"
            accentColor="accent-amber-400"
            focusColor="focus-visible:ring-amber-400"
            minLabel={formatCurrency(1000, formData.currency)}
            midLabel={formatCurrency(50000, formData.currency)}
            maxLabel={formatCurrency(200000, formData.currency)}
            onChange={(val) => setFormData({ ...formData, totalBudget: val })}
          />
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
              placeholder="e.g. Hilltop Barn & Orchard, Napa Valley"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            />
          </div>

          <VibeSelector
            value={formData.vibe}
            popularVibes={POPULAR_VIBES}
            onChange={(vibe) => setFormData({ ...formData, vibe })}
          />
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

        <FormSubmitButton isLoading={isLoading} />
      </form>
    </section>
  );
}
