"use client";

import React from "react";
import { EventPlan } from "@/types/event";
import { formatCurrency } from "@/lib/utils";

interface PrintDossierViewProps {
  plan: EventPlan;
}

/**
 * Clean, multi-page printable dossier formatted specifically for printing
 * or generating PDF exports without screen UI elements.
 */
export default function PrintDossierView({ plan }: PrintDossierViewProps) {
  return (
    <article aria-label="Printable Event Dossier" className="hidden print:block space-y-8 text-black bg-white p-4">
      {/* Dossier Header */}
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold text-black">{plan.event_title}</h1>
        <p className="text-sm italic text-gray-700 mt-0.5">&ldquo;{plan.theme_tagline}&rdquo;</p>
        <div className="mt-3 text-xs text-gray-600 flex flex-wrap gap-4 font-medium">
          <span>Budget: {formatCurrency(plan.total_budget, plan.currency)}</span>
          <span>Guests: {plan.guest_count || 100}</span>
          <span>Venue: {plan.location || "Curated Venue"}</span>
          <span>Event Type: {plan.eventType || "Celebration"}</span>
        </div>
      </header>

      {/* 1. Budget Allocation Table */}
      <section className="space-y-3">
        <h2 className="text-base font-bold border-b pb-1 text-black">1. Budget Allocation Breakdown</h2>
        <table className="w-full text-xs text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2">Category</th>
              <th className="p-2">Allocation</th>
              <th className="p-2">Estimated Cost</th>
              <th className="p-2">Cost-Cutting Tip</th>
            </tr>
          </thead>
          <tbody>
            {plan.budget_breakdown?.map((b) => (
              <tr key={b.category} className="border-b border-gray-200">
                <td className="p-2 font-medium">{b.category}</td>
                <td className="p-2">{b.percentage}%</td>
                <td className="p-2">{formatCurrency(b.estimated_cost, plan.currency)}</td>
                <td className="p-2 text-gray-700">{b.cost_saving_tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 2. Phased Roadmap */}
      <section className="space-y-3 print-page-break">
        <h2 className="text-base font-bold border-b pb-1 text-black">2. Sequential Phased Roadmap</h2>
        {plan.timeline_milestones?.map((phase, pIdx) => (
          <div key={pIdx} className="space-y-1">
            <h3 className="text-xs font-bold text-gray-900">{phase.phase}</h3>
            <ul className="text-xs list-disc pl-5 space-y-1">
              {phase.tasks?.map((t, tIdx) => (
                <li key={tIdx}>
                  <strong>[{t.priority}] {t.task_name}:</strong> {t.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 3. Vendor Playbook */}
      <section className="space-y-3 print-page-break">
        <h2 className="text-base font-bold border-b pb-1 text-black">3. Vendor Playbook & Negotiation Strategies</h2>
        {plan.vendor_checklists?.map((v, vIdx) => (
          <div key={vIdx} className="border border-gray-300 p-3 rounded mb-3 space-y-1.5">
            <h3 className="text-xs font-bold text-gray-900">{v.vendor_type} Protocol</h3>
            <div className="text-xs">
              <strong>Deliverables:</strong> {v.suggested_deliverables?.join("; ")}
            </div>
            <div className="text-xs">
              <strong>Negotiation Questions:</strong>
              <ul className="list-disc pl-4 mt-0.5">
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
      </section>

      {/* 4. Creative Aesthetics */}
      <section className="space-y-2">
        <h2 className="text-base font-bold border-b pb-1 text-black">4. Creative Aesthetics & Invitation Copy</h2>
        <div className="text-xs space-y-1.5">
          <p><strong>Decor:</strong> {plan.personalized_ideas?.decor_concept}</p>
          <p><strong>Signature Moment:</strong> {plan.personalized_ideas?.signature_activity}</p>
          <p><strong>Soundscape:</strong> {plan.personalized_ideas?.curated_playlist_vibe}</p>
          <div className="p-3 bg-gray-50 border border-gray-300 rounded italic mt-2 text-gray-800">
            &ldquo;{plan.personalized_ideas?.invitation_copy}&rdquo;
          </div>
        </div>
      </section>

      {/* 5. Day-of Run of Sheet Schedule */}
      {plan.day_of_schedule && plan.day_of_schedule.length > 0 && (
        <section className="space-y-3 print-page-break">
          <h2 className="text-base font-bold border-b pb-1 text-black">5. Day-of Run of Sheet Schedule</h2>
          <table className="w-full text-xs text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-2 w-28">Time</th>
                <th className="p-2">Activity</th>
                <th className="p-2">Lead / Vendor</th>
                <th className="p-2">Logistical Cue</th>
              </tr>
            </thead>
            <tbody>
              {plan.day_of_schedule.map((item, sIdx) => (
                <tr key={sIdx} className="border-b border-gray-200">
                  <td className="p-2 font-mono font-medium">{item.time}</td>
                  <td className="p-2 font-semibold">{item.activity}</td>
                  <td className="p-2">{item.lead_coordinator_or_vendor}</td>
                  <td className="p-2 text-gray-700">{item.logistical_cue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 6. Dietary & Logistics Contingency */}
      {plan.dietary_breakdown && plan.dietary_breakdown.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-base font-bold border-b pb-1 text-black">6. Dietary Requirements & Contingency</h2>
          <ul className="text-xs list-disc pl-5 space-y-1">
            {plan.dietary_breakdown.map((d, dIdx) => (
              <li key={dIdx}>
                <strong>{d.category} ({d.estimated_percentage}%):</strong> {d.recommended_substitutions} &mdash; <em>Chef Note: {d.chef_note}</em>
              </li>
            ))}
          </ul>
          {plan.logistics_contingency && (
            <div className="mt-3 text-xs space-y-1 border-t pt-2">
              <p><strong>Weather Contingency:</strong> {plan.logistics_contingency.weather_contingency_plan}</p>
              <p><strong>Seating Strategy:</strong> {plan.logistics_contingency.seating_and_floorplan_advice}</p>
            </div>
          )}
        </section>
      )}
    </article>
  );
}

