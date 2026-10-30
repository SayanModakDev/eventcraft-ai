import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateTotalAllocated } from '@/lib/utils';
import { DEMO_PRESETS } from '@/lib/presets';
import { BudgetCategory } from '@/types/event';

describe('Financial Logic & Budget Calculations', () => {
  describe('formatCurrency utility', () => {
    it('formats USD currency correctly', () => {
      const formatted = formatCurrency(25000, 'USD');
      expect(formatted).toMatch(/\$25,000/);
    });

    it('formats INR currency with rupee symbol or currency code', () => {
      const formatted = formatCurrency(500000, 'INR');
      expect(formatted).toContain('₹');
    });

    it('formats EUR currency with euro symbol', () => {
      const formatted = formatCurrency(15000, 'EUR');
      expect(formatted).toContain('€');
    });

    it('handles zero and fractional amounts without decimals', () => {
      const zeroUSD = formatCurrency(0, 'USD');
      expect(zeroUSD).toMatch(/\$0/);

      const rounded = formatCurrency(1234.56, 'USD');
      expect(rounded).toMatch(/\$1,235/);
    });

    it('gracefully handles unknown currencies with fallback', () => {
      const custom = formatCurrency(1000, 'GBP');
      expect(custom).toBeDefined();
      expect(custom.length).toBeGreaterThan(0);
    });
  });

  describe('calculateTotalAllocated utility', () => {
    it('correctly aggregates multiple budget items', () => {
      const items: BudgetCategory[] = [
        { category: 'Venue', percentage: 40, estimated_cost: 4000, cost_saving_tip: 'Tip 1' },
        { category: 'Catering', percentage: 35, estimated_cost: 3500, cost_saving_tip: 'Tip 2' },
        { category: 'DJ', percentage: 25, estimated_cost: 2500, cost_saving_tip: 'Tip 3' },
      ];
      expect(calculateTotalAllocated(items)).toBe(10000);
    });

    it('returns zero for empty breakdown', () => {
      expect(calculateTotalAllocated([])).toBe(0);
    });
  });

  describe('Preset Budget Validation & Balance', () => {
    DEMO_PRESETS.forEach((preset) => {
      describe(`Preset: ${preset.name}`, () => {
        const { budget_breakdown, total_budget } = preset.mockBlueprint;

        it('category percentages sum to exactly 100%', () => {
          const totalPercentage = budget_breakdown.reduce(
            (sum, cat) => sum + cat.percentage,
            0
          );
          expect(totalPercentage).toBe(100);
        });

        it('sum of estimated costs equals total target budget', () => {
          const totalAllocated = calculateTotalAllocated(budget_breakdown);
          expect(totalAllocated).toBe(total_budget);
        });

        it('all categories have strictly positive non-zero allocations', () => {
          budget_breakdown.forEach((cat) => {
            expect(cat.percentage).toBeGreaterThan(0);
            expect(cat.estimated_cost).toBeGreaterThan(0);
            expect(cat.category.trim().length).toBeGreaterThan(0);
          });
        });

        it('all categories include actionable cost-cutting tips', () => {
          budget_breakdown.forEach((cat) => {
            expect(cat.cost_saving_tip).toBeDefined();
            expect(cat.cost_saving_tip.trim().length).toBeGreaterThan(15);
          });
        });
      });
    });
  });

  describe('Dynamic Proportional Budget Recalculation', () => {
    it('accurately distributes budget proportionally for custom total targets', () => {
      const basePreset = DEMO_PRESETS[0].mockBlueprint.budget_breakdown;
      const customBudget = 50000;

      const recalculated = basePreset.map((cat) => ({
        ...cat,
        estimated_cost: Math.round((cat.percentage / 100) * customBudget),
      }));

      const totalRecalculated = calculateTotalAllocated(recalculated);
      expect(totalRecalculated).toBe(customBudget);

      recalculated.forEach((cat) => {
        expect(cat.estimated_cost).toBeGreaterThan(0);
      });
    });
  });
});

