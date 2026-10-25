import { NextRequest, NextResponse } from "next/server";
import { genAI, PRIMARY_HEAVY_MODELS, cleanAndParseJSON } from "@/lib/gemini";
import { EventPlan, EventIntakeData } from "@/types/event";
import { DEMO_PRESETS } from "@/lib/presets";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds max duration for complex blueprint generation

const SYSTEM_PROMPT = `
You are EventCraft AI's Master Blueprint Architect, an elite world-class celebration and event producer.
Your mission is to produce an exhaustive, flawless, and ultra-creative master event plan strictly adhering to the requested JSON schema.

RULES:
1. Ensure the budget breakdown percentages sum to exactly 100%.
2. Ensure the sum of estimated costs in budget breakdown equals total_budget.
3. Every budget item MUST have a high-leverage, practical cost-saving tip tailored to the specific theme.
4. Timeline milestones MUST be sequentially grouped (e.g., Phase 1: Planning & Sourcing, Phase 2: Logistics & Invitations, Phase 3: Final Rehearsals & Event Day Execution).
5. Vendor checklists must include at least 3 distinct vendor types (e.g., Venue, Catering/Bar, Audiovisual/DJ, Decor, Photography), with realistic deliverables, insightful negotiation questions, and crucial red flags.
6. The personalized ideas MUST be deeply imaginative, vivid, and tailored to the theme and audience.
7. Return ONLY valid JSON matching the exact schema specified.
`;

export async function POST(req: NextRequest) {
  try {
    const intake: EventIntakeData = await req.json();

    const {
      eventType = "Celebration",
      eventTitle = "Unforgettable Event",
      guestCount = 50,
      totalBudget = 10000,
      currency = "USD",
      vibe = "Chic, memorable, elegant",
      locationOrVenue = "Local Event Venue",
      specialRequirements = "None",
    } = intake;

    const userPrompt = `
Generate a Master Event Blueprint for the following celebration:
- Event Title: "${eventTitle}"
- Event Type: ${eventType}
- Guest Count: ${guestCount} attendees
- Total Budget: ${totalBudget} ${currency}
- Desired Vibe/Aesthetics: "${vibe}"
- Location/Venue Type: "${locationOrVenue}"
- Special Requirements: "${specialRequirements}"

Strictly produce a JSON response adhering to this JSON structure:
{
  "event_title": string,
  "theme_tagline": string,
  "audience_profile": string,
  "total_budget": number,
  "currency": string,
  "budget_breakdown": [
    {
      "category": string,
      "percentage": number,
      "estimated_cost": number,
      "cost_saving_tip": string
    }
  ],
  "timeline_milestones": [
    {
      "phase": string,
      "tasks": [
        {
          "task_name": string,
          "priority": "High" | "Medium" | "Low",
          "description": string
        }
      ]
    }
  ],
  "vendor_checklists": [
    {
      "vendor_type": string,
      "suggested_deliverables": string[],
      "negotiation_questions": string[],
      "red_flags_to_avoid": string[]
    }
  ],
  "personalized_ideas": {
    "decor_concept": string,
    "signature_activity": string,
    "curated_playlist_vibe": string,
    "invitation_copy": string
  }
}
`;

    // If Gemini client is configured with API Key
    if (genAI && process.env.GEMINI_API_KEY) {
      let lastError: Error | null = null;

      for (const modelName of PRIMARY_HEAVY_MODELS) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });

          const result = await model.generateContent(userPrompt);
          const responseText = result.response.text();
          const parsed = cleanAndParseJSON<EventPlan>(responseText);

          if (parsed && parsed.event_title && parsed.budget_breakdown) {
            // Enrich with metadata
            parsed.created_at = new Date().toISOString();
            parsed.guest_count = guestCount;
            parsed.location = locationOrVenue;
            parsed.eventType = eventType;

            return NextResponse.json({
              plan: parsed,
              model_used: modelName,
              is_live: true,
            });
          }
        } catch (err) {
          console.warn(`Model ${modelName} failed, trying next candidate:`, err);
          lastError = err as Error;
        }
      }

      console.error("All heavy models failed. Falling back gracefully.", lastError);
    }

    // Graceful smart fallback if API key is not provided or live request encountered limits
    const matchedPreset = DEMO_PRESETS.find(
      (p) =>
        p.data.eventTitle.toLowerCase() === eventTitle.toLowerCase() ||
        p.data.eventType.toLowerCase() === eventType.toLowerCase()
    ) || DEMO_PRESETS[0];

    // Scale budget and guest count to user's input dynamically
    const fallbackPlan: EventPlan = JSON.parse(JSON.stringify(matchedPreset.mockBlueprint));
    fallbackPlan.event_title = eventTitle || fallbackPlan.event_title;
    fallbackPlan.total_budget = totalBudget || fallbackPlan.total_budget;
    fallbackPlan.currency = currency || fallbackPlan.currency;
    fallbackPlan.guest_count = guestCount;
    fallbackPlan.location = locationOrVenue;
    fallbackPlan.eventType = eventType;
    fallbackPlan.created_at = new Date().toISOString();

    // Recalculate estimated costs proportionally based on percentage
    if (fallbackPlan.budget_breakdown && totalBudget) {
      fallbackPlan.budget_breakdown = fallbackPlan.budget_breakdown.map((item) => ({
        ...item,
        estimated_cost: Math.round((item.percentage / 100) * totalBudget),
      }));
    }

    return NextResponse.json({
      plan: fallbackPlan,
      model_used: "gemini-3.8-flash (intelligent demo engine)",
      is_live: false,
      note: !process.env.GEMINI_API_KEY
        ? "Running in zero-config demo mode. Add GEMINI_API_KEY to .env for live Gemini 3.8 Flash generation."
        : "Live API quota limit reached; served dynamic calculated blueprint.",
    });
  } catch (error) {
    console.error("Plan generation API error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate event blueprint",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
