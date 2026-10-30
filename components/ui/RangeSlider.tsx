import React from "react";

interface RangeSliderProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: number;
  formattedValue: string;
  min: number;
  max: number;
  step: number;
  valueBadgeColor: "cyan" | "amber";
  accentColor: "accent-cyan-400" | "accent-amber-400";
  focusColor: "focus-visible:ring-cyan-400" | "focus-visible:ring-amber-400";
  minLabel: string;
  midLabel: string;
  maxLabel: string;
  onChange: (val: number) => void;
}

/**
 * Reusable accessible range slider with dynamic badge and min/mid/max markers.
 */
export default function RangeSlider({
  id,
  label,
  icon,
  value,
  formattedValue,
  min,
  max,
  step,
  valueBadgeColor,
  accentColor,
  focusColor,
  minLabel,
  midLabel,
  maxLabel,
  onChange,
}: RangeSliderProps) {
  const badgeClasses =
    valueBadgeColor === "cyan"
      ? "text-cyan-400 bg-cyan-950/60 border-cyan-800"
      : "text-amber-400 bg-amber-950/60 border-amber-800";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5 cursor-pointer"
        >
          {icon}
          <span>{label}</span>
        </label>
        <span className={`text-sm font-bold px-2 py-0.5 rounded border ${badgeClasses}`}>
          {formattedValue}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        aria-label={`${label} slider`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || min)}
        className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${accentColor} focus-visible:outline-none focus-visible:ring-2 ${focusColor}`}
      />

      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{minLabel}</span>
        <span>{midLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

