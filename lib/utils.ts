import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "@/types/event";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function calculateTotalAllocated(breakdown: { estimated_cost: number }[]): number {
  return breakdown.reduce((sum, item) => sum + (item.estimated_cost || 0), 0);
}
