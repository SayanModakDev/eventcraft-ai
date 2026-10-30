/**
 * General purpose utilities for currency formatting, class concatenation, and financial calculation.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "@/types/event";

/**
 * Combines Tailwind classes with clsx and twMerge to resolve conflicting utilities.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric monetary amount into standard localized currency representations.
 *
 * @param amount Numeric value to format
 * @param currency Target currency code ('USD', 'INR', 'EUR', etc.)
 * @returns Formatted currency string (e.g. "$25,000", "₹50,000", "€18,000")
 */
export function formatCurrency(amount: number, currency: Currency | string = "USD"): string {
  try {
    let locale = "en-US";
    if (currency === "INR") locale = "en-IN";
    else if (currency === "EUR") locale = "de-DE";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const symbolMap: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
    };
    const symbol = symbolMap[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  }
}

/**
 * Sums the estimated costs across an array of budget categories.
 *
 * @param breakdown Array of objects containing estimated_cost
 * @returns Total aggregate cost
 */
export function calculateTotalAllocated(breakdown: { estimated_cost: number }[]): number {
  return breakdown.reduce((sum, item) => sum + (item.estimated_cost || 0), 0);
}
