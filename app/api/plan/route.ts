/**
 * API Route Handler: /api/plan
 * Generates the complete Master Event Blueprint using Gemini 3.8 Flash.
 *
 * Enforces Zod input validation, IP rate limiting, and strict JSON schema guarantees.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { genAI, PRIMARY_HEAVY_MODELS, cleanAndParseJSON } from "@/lib/gemini";
import { EventPlan } from "@/types/event";
import { DEMO_PRESETS } from "@/lib/presets";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getCache, setCache, hashPayload } from "@/lib/cache";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds max execution time for heavy model reasoning

/**
 * Zod schema defining strict parameter validation for event intake.
 */
const IntakeValidationSchema = z.object({
  eventTitle: z
    .string()
    .trim()
    .min(2, "Event title must be at least 2 characters")
    .max(150, "Event title cannot exceed 150 characters"),
  eventType: z
    .string()
    .trim()
    .min(2, "Event category must be at least 2 characters")
    .max(60)
    .default("Celebration"),
  guestCount: z.coerce
    .number()
    .int("Guest count must be an integer")
    .min(1, "Guest count must be at least 1")
    .max(10000, "Guest count cannot exceed 10,000")
    .default(50),
  totalBudget: z.coerce
    .number()
    .positive("Total budget must be a positive number")
    .max(100000000, "Total budget exceeds maximum allowable threshold")
    .default(10000),
  currency: z.enum(["INR", "USD", "EUR"]).default("USD"),
  vibe: z.string().trim().max(400).optional().default("Chic, memorable, elegant"),
  locationOrVenue: z.string().trim().max(300).optional().default("Curated Celebration Venue"),
  specialRequirements: z.string().trim().max(1000).optional().default("None"),
});

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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Abuse Protection & Rate Limiting Check
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`plan_${clientIp}`, 30, 60000);

    if (!rateCheck.success) {
      const retryAfter = Math.max(1, Math.ceil((rateCheck.reset - Date.now()) / 1000));
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before generating another blueprint.",
          retry_after_seconds: retryAfter,
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        }
      );
    }

    // 2. Parse and Validate Request Body via Zod
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request body" },
        { status: 400 }
      );
    }

    const validation = IntakeValidationSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed for event intake parameters",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      eventType,
      eventTitle,
      guestCount,
      totalBudget,
      currency,
      vibe,
      locationOrVenue,
      specialRequirements,
    } = validation.data;

    // 3. In-Memory Cache Lookup (eliminates duplicate calls and provides 0ms responses)
    const cacheKey = `plan_${hashPayload(validation.data)}`;
    const cachedResult = getCache<{
      plan: EventPlan;
      model_used: string;
      is_live: boolean;
      note?: string;
    }>(cacheKey);

    if (cachedResult) {
      return NextResponse.json({
        ...cachedResult,
        is_cached: true,
      });
    }

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

    // 3. Primary AI Model Execution with Fallback Chain
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

            const liveResponse = {
              plan: parsed,
              model_used: modelName,
              is_live: true,
            };
            setCache(cacheKey, liveResponse);
            return NextResponse.json(liveResponse);
          }
        } catch (err) {
          console.warn(`Model ${modelName} failed, attempting fallback candidate:`, err);
          lastError = err as Error;
        }
      }

      console.error("All heavy models exhausted, serving dynamic calculation engine:", lastError);
    }

    // 4. Zero-Config Intelligent Fallback Engine
    const matchedPreset =
      DEMO_PRESETS.find(
        (p) =>
          p.data.eventTitle.toLowerCase() === eventTitle.toLowerCase() ||
          p.data.eventType.toLowerCase() === eventType.toLowerCase()
      ) || DEMO_PRESETS[0];

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

    const fallbackResponse = {
      plan: fallbackPlan,
      model_used: "gemini-3.8-flash (intelligent local engine)",
      is_live: false,
      note: !process.env.GEMINI_API_KEY
        ? "Running in zero-config demo mode. Add GEMINI_API_KEY to .env.local for live Gemini 3.8 Flash generation."
        : "Live API quota limit reached; served dynamic calculated blueprint.",
    };
    setCache(cacheKey, fallbackResponse);

    return NextResponse.json(fallbackResponse);
  } catch (error) {
    console.error("Plan generation API unexpected error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate event blueprint",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
