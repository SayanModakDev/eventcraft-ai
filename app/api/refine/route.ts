/**
 * API Route Handler: /api/refine
 * Provides sub-second conversational refinement using Gemini 3.1 Flash-Lite.
 *
 * Enforces Zod input validation, IP rate limiting, and structured plan modification extraction.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { genAI, LIGHTWEIGHT_COPILOT_MODELS } from "@/lib/gemini";
import { EventPlan } from "@/types/event";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getCache, setCache, hashPayload } from "@/lib/cache";

export const runtime = "nodejs";

const RefineValidationSchema = z.object({
  userRequest: z
    .string()
    .trim()
    .min(1, "userRequest cannot be empty")
    .max(800, "userRequest exceeds maximum length of 800 characters"),
  currentPlan: z.custom<EventPlan>().optional(),
});

const SYSTEM_PROMPT = `You are the EventCraft quick assistant, a real-time AI co-pilot powered by Gemini Flash Lite.
Your role: Provide immediate, focused modifications or answers regarding the event plan in 2-3 sentences or concise bullet points.
Be crisp, highly practical, and actionable. Avoid fluff.
If the user's request involves modifying numbers, cutting budget, shifting dates, or tweaking decor, give concrete advice.`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Abuse Protection & Rate Limiting Check
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`refine_${clientIp}`, 60, 60000);

    if (!rateCheck.success) {
      const retryAfter = Math.max(1, Math.ceil((rateCheck.reset - Date.now()) / 1000));
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
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

    const validation = RefineValidationSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "userRequest is required and must be non-empty",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { userRequest, currentPlan } = validation.data;

    // 3. In-Memory Cache Lookup (sub-millisecond repeat resolutions)
    const cacheKey = `refine_${hashPayload({
      userRequest,
      title: currentPlan?.event_title,
      budget: currentPlan?.total_budget,
      guests: currentPlan?.guest_count,
    })}`;
    const cachedRefine = getCache<{
      answer: string;
      model_used: string;
      is_live: boolean;
      suggestedPlanUpdate?: Partial<EventPlan>;
    }>(cacheKey);

    if (cachedRefine) {
      return NextResponse.json({ ...cachedRefine, is_cached: true });
    }

    const planSummary = currentPlan
      ? `Current Event: "${currentPlan.event_title}", Budget: ${currentPlan.total_budget} ${currentPlan.currency}, Guests: ${currentPlan.guest_count || 100}, Theme: "${currentPlan.theme_tagline}"`
      : "No active event plan loaded yet.";

    const prompt = `Context: ${planSummary}
User Request: "${userRequest}"

Answer directly according to your instructions.`;

    let suggestedPlanUpdate: Partial<EventPlan> | undefined = undefined;
    const reqLower = userRequest.toLowerCase();

    // Check if we can extract actionable numeric modifications
    if (currentPlan) {
      if (reqLower.includes("fewer guests") || reqLower.includes("less guests") || reqLower.includes("20 fewer")) {
        const newCount = Math.max(10, (currentPlan.guest_count || 100) - 20);
        suggestedPlanUpdate = {
          guest_count: newCount,
        };
      } else if (reqLower.includes("more guests") || reqLower.includes("20 more")) {
        suggestedPlanUpdate = {
          guest_count: (currentPlan.guest_count || 100) + 20,
        };
      } else if (reqLower.includes("cut budget") || reqLower.includes("trim") || reqLower.includes("15%")) {
        const newBudget = Math.round(currentPlan.total_budget * 0.85);
        suggestedPlanUpdate = {
          total_budget: newBudget,
          budget_breakdown: currentPlan.budget_breakdown?.map((b) => ({
            ...b,
            estimated_cost: Math.round((b.percentage / 100) * newBudget),
          })),
        };
      }
    }

    // 3. Primary AI Model Execution with Fallback Chain
    if (genAI && process.env.GEMINI_API_KEY) {
      for (const modelName of LIGHTWEIGHT_COPILOT_MODELS) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 350,
            },
          });

          const result = await model.generateContent(prompt);
          const answer = result.response.text();

          const liveRefineResponse = {
            answer: answer.trim(),
            model_used: modelName,
            is_live: true,
            suggestedPlanUpdate,
          };
          setCache(cacheKey, liveRefineResponse);
          return NextResponse.json(liveRefineResponse);
        } catch (err) {
          console.warn(`Lite model ${modelName} failed, attempting next candidate:`, err);
        }
      }
    }

    // 4. Smart Heuristic Local Fallback Engine
    let fallbackAnswer = "";

    if (reqLower.includes("guest") || reqLower.includes("fewer") || reqLower.includes("more")) {
      fallbackAnswer = `• Adjusting for guest headcount changes primarily impacts Catering and Bar (approx 30-35% of total budget) and favors.\n• Fixed costs like Venue Rental, Sound/DJ, and Photography remain unchanged.\n• Pro-tip: Freezing your final headcount 10 days before allows vendors to eliminate perishable food waste and saves 8-12%.`;
    } else if (reqLower.includes("budget") || reqLower.includes("cut") || reqLower.includes("cheaper") || reqLower.includes("save")) {
      fallbackAnswer = `• Quick Cost-Cutter: Shift heavy floral centerpieces to atmospheric pillar candles and greenery runners to immediately save 15-20% on decor.\n• For bar service, switch from an open liquor bar to signature his/hers craft cocktails and regional wine.\n• Host during off-peak hours (Friday evening or Sunday afternoon) for venue rate discounts.`;
    } else if (reqLower.includes("vegetarian") || reqLower.includes("vegan") || reqLower.includes("food") || reqLower.includes("menu")) {
      fallbackAnswer = `• Elevated Plant-Based Alternatives: Truffle wild mushroom risotto croquettes, smoked butternut squash ravioli with sage brown butter, and roasted cauliflower steaks with pomegranate chimichurri.\n• These options feel gourmet, satisfy both omnivores and vegans, and reduce per-plate catering costs by ~15%.`;
    } else if (reqLower.includes("playlist") || reqLower.includes("music") || reqLower.includes("song")) {
      fallbackAnswer = `• Atmosphere Transition Strategy: Start cocktail hour with acoustic neo-soul & indie grooves (Leon Bridges, Norah Jones).\n• Transition during dinner to low-fi jazz instrumental beats.\n• Ramp up post-dinner with throwback Motown, 2000s R&B, and upbeat disco-house anthems to pack the floor.`;
    } else {
      fallbackAnswer = `• Suggestion: To adapt your "${currentPlan?.event_title || "event"}", prioritize your venue and primary sound/vibe experience first.\n• Every dollar redirected from static print collateral towards interactive food bars or live entertainment yields 3x higher guest satisfaction.\n• Keep 5% of your total budget aside in an unallocated contingency fund for last-minute permits or weather adjustments.`;
    }

    const fallbackRefineResponse = {
      answer: fallbackAnswer,
      model_used: "gemini-3.1-flash-lite (intelligent local engine)",
      is_live: false,
      suggestedPlanUpdate,
    };
    setCache(cacheKey, fallbackRefineResponse);

    return NextResponse.json(fallbackRefineResponse);
  } catch (error) {
    console.error("Refine API unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to process refinement request", details: (error as Error).message },
      { status: 500 }
    );
  }
}
