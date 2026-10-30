/**
 * Google Gemini AI SDK client and multi-model routing configuration.
 *
 * Implements a Dual-Model Architecture:
 * 1. Heavy Workhorse Models (gemini-3.8-flash): Deep reasoning for complex blueprints
 * 2. Lightweight Co-pilot Models (gemini-3.1-flash-lite): Sub-second turnaround for interactive tweaks
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

/**
 * Singleton Google Generative AI client instance.
 * Initialized strictly server-side using GEMINI_API_KEY.
 */
export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Priority order for heavy reasoning models used to generate master event blueprints.
 */
export const PRIMARY_HEAVY_MODELS = [
  "gemini-3.8-flash",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
] as const;

/**
 * Priority order for real-time lightweight models used in interactive co-pilot drawers.
 */
export const LIGHTWEIGHT_COPILOT_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-8b",
  "gemini-1.5-flash",
] as const;

/**
 * Robust JSON extractor and parser that strips markdown code blocks (```json ... ```)
 * and safely isolates the innermost JSON object or array.
 *
 * @template T Expected return type structure
 * @param rawText Raw text string returned by the LLM
 * @returns Parsed object of type T
 * @throws SyntaxError if no valid JSON can be extracted
 */
export function cleanAndParseJSON<T>(rawText: string): T {
  let cleaned = rawText.trim();

  // Strip leading and trailing markdown code block formatting
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Locate the boundaries of the JSON payload
  const firstBrace = cleaned.indexOf("{");
  const firstBracket = cleaned.indexOf("[");
  let startIdx = 0;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    const lastBrace = cleaned.lastIndexOf("}");
    if (lastBrace !== -1) {
      cleaned = cleaned.substring(startIdx, lastBrace + 1);
    }
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    const lastBracket = cleaned.lastIndexOf("]");
    if (lastBracket !== -1) {
      cleaned = cleaned.substring(startIdx, lastBracket + 1);
    }
  }

  return JSON.parse(cleaned) as T;
}
