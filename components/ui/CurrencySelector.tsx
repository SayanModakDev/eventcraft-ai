import React from "react";
import { Currency } from "@/types/event";

interface CurrencySelectorProps {
  value: Currency;
  onChange: (cur: Currency) => void;
}

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "INR", label: "₹ INR" },
  { code: "USD", label: "$ USD" },
  { code: "EUR", label: "€ EUR" },
];

/**
 * Accessible radio group toggle for selecting event currency.
 */
export default function CurrencySelector({
  value,
  onChange,
}: CurrencySelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span id="currency-selector-label" className="text-xs text-slate-300 font-medium">
        Currency:
      </span>
      <div
        className="inline-flex rounded-lg bg-slate-950 p-1 border border-white/10"
        role="radiogroup"
        aria-labelledby="currency-selector-label"
      >
        {CURRENCIES.map((cur) => (
          <button
            key={cur.code}
            type="button"
            role="radio"
            aria-checked={value === cur.code}
            aria-label={`Select currency ${cur.code}`}
            tabIndex={0}
            onClick={() => onChange(cur.code)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
              value === cur.code
                ? "bg-fuchsia-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {cur.label}
          </button>
        ))}
      </div>
    </div>
  );
}

