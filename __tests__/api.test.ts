import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as planRoute } from '@/app/api/plan/route';
import { POST as refineRoute } from '@/app/api/refine/route';
import { DEMO_PRESETS } from '@/lib/presets';
import {
  BudgetCategory,
  TimelineMilestone,
  TimelineTask,
  VendorChecklist,
  DietaryRequirement,
  DayOfScheduleItem,
} from '@/types/event';

describe('API Route Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/plan (Master Blueprint Route)', () => {
    it('returns a master blueprint adhering strictly to Challenge 5 schema', async () => {
      const intakePayload = {
        eventType: 'Wedding',
        eventTitle: 'Golden Sunset Vineyard Wedding',
        guestCount: 100,
        totalBudget: 30000,
        currency: 'USD',
        vibe: 'Romantic rustic with amber fairy lights',
        locationOrVenue: 'Napa Valley Barn',
        specialRequirements: 'Artisanal wine bar and vegan menu items',
      };

      const req = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.101',
        },
        body: JSON.stringify(intakePayload),
      });

      const response = await planRoute(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('plan');
      expect(data).toHaveProperty('model_used');

      const { plan } = data;

      // 1. Root Schema Validation
      expect(plan.event_title).toBeDefined();
      expect(typeof plan.event_title).toBe('string');
      expect(plan.theme_tagline).toBeDefined();
      expect(typeof plan.theme_tagline).toBe('string');
      expect(plan.audience_profile).toBeDefined();
      expect(typeof plan.audience_profile).toBe('string');
      expect(plan.total_budget).toBe(30000);
      expect(plan.currency).toBe('USD');

      // 2. Budget Breakdown Validation (strictly typed, 0 any)
      expect(Array.isArray(plan.budget_breakdown)).toBe(true);
      expect(plan.budget_breakdown.length).toBeGreaterThanOrEqual(3);

      let totalPct = 0;
      plan.budget_breakdown.forEach((cat: BudgetCategory) => {
        expect(typeof cat.category).toBe('string');
        expect(typeof cat.percentage).toBe('number');
        expect(typeof cat.estimated_cost).toBe('number');
        expect(typeof cat.cost_saving_tip).toBe('string');
        totalPct += cat.percentage;
      });
      expect(totalPct).toBe(100);

      // 3. Phased Timeline Milestones Validation (strictly typed, 0 any)
      expect(Array.isArray(plan.timeline_milestones)).toBe(true);
      expect(plan.timeline_milestones.length).toBeGreaterThanOrEqual(2);
      plan.timeline_milestones.forEach((m: TimelineMilestone) => {
        expect(typeof m.phase).toBe('string');
        expect(Array.isArray(m.tasks)).toBe(true);
        m.tasks.forEach((t: TimelineTask) => {
          expect(typeof t.task_name).toBe('string');
          expect(['High', 'Medium', 'Low']).toContain(t.priority);
          expect(typeof t.description).toBe('string');
        });
      });

      // 4. Vendor Playbook Matrix Validation (strictly typed, 0 any)
      expect(Array.isArray(plan.vendor_checklists)).toBe(true);
      expect(plan.vendor_checklists.length).toBeGreaterThanOrEqual(2);
      plan.vendor_checklists.forEach((v: VendorChecklist) => {
        expect(typeof v.vendor_type).toBe('string');
        expect(Array.isArray(v.suggested_deliverables)).toBe(true);
        expect(Array.isArray(v.negotiation_questions)).toBe(true);
        expect(Array.isArray(v.red_flags_to_avoid)).toBe(true);
      });

      // 5. Creative Aesthetics Validation
      expect(plan.personalized_ideas).toBeDefined();
      expect(typeof plan.personalized_ideas.decor_concept).toBe('string');
      expect(typeof plan.personalized_ideas.signature_activity).toBe('string');
      expect(typeof plan.personalized_ideas.curated_playlist_vibe).toBe('string');
      expect(typeof plan.personalized_ideas.invitation_copy).toBe('string');
    });

    it('enriches plan with metadata: guest_count, location, and eventType', async () => {
      const payload = {
        eventType: 'Birthday Party',
        eventTitle: 'Cyberpunk 25th Birthday',
        guestCount: 80,
        totalBudget: 12000,
        currency: 'EUR',
        vibe: 'Neon lasers and EDM',
        locationOrVenue: 'Industrial Studio',
        specialRequirements: 'UV glow drinks',
      };

      const req = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.102',
        },
        body: JSON.stringify(payload),
      });

      const response = await planRoute(req);
      const data = await response.json();

      expect(data.plan.guest_count).toBe(80);
      expect(data.plan.location).toBe('Industrial Studio');
      expect(data.plan.eventType).toBe('Birthday Party');
      expect(data.plan.created_at).toBeDefined();
    });

    it('gracefully returns 400 when request body cannot be parsed as JSON', async () => {
      const req = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.103',
        },
        body: 'invalid-malformed-json{',
      });

      const response = await planRoute(req);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toMatch(/Invalid JSON payload/i);
    });

    it('rejects invalid intake parameters with 400 and Zod validation errors', async () => {
      const invalidPayload = {
        eventTitle: ' ', // Empty title after trim
        guestCount: -5, // Invalid negative guest count
        totalBudget: 0, // Invalid non-positive budget
        currency: 'INVALID_CURRENCY', // Unsupported currency
      };

      const req = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.104',
        },
        body: JSON.stringify(invalidPayload),
      });

      const response = await planRoute(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('details');
      expect(data.details).toHaveProperty('eventTitle');
      expect(data.details).toHaveProperty('guestCount');
      expect(data.details).toHaveProperty('totalBudget');
      expect(data.details).toHaveProperty('currency');
    });

    it('returns 429 when rate limit is exceeded on /api/plan', async () => {
      const uniqueIp = '192.168.1.200';
      const validPayload = {
        eventTitle: 'Spam Rate Limit Test',
        guestCount: 50,
        totalBudget: 10000,
        currency: 'USD',
      };

      // 30 requests is the limit for plan
      for (let i = 0; i < 30; i++) {
        const req = new NextRequest('http://localhost:3000/api/plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': uniqueIp,
          },
          body: JSON.stringify(validPayload),
        });
        await planRoute(req);
      }

      // 31st request must trigger 429
      const blockedReq = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueIp,
        },
        body: JSON.stringify(validPayload),
      });

      const blockedResponse = await planRoute(blockedReq);
      expect(blockedResponse.status).toBe(429);
      const data = await blockedResponse.json();
      expect(data.error).toMatch(/Rate limit exceeded/i);
    });
  });

  describe('POST /api/refine (Real-Time Co-Pilot Route)', () => {
    const mockPlan = DEMO_PRESETS[0].mockBlueprint;

    it('returns 400 when userRequest is missing or whitespace only', async () => {
      const req = new NextRequest('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.105',
        },
        body: JSON.stringify({
          currentPlan: mockPlan,
          userRequest: '   ',
        }),
      });

      const response = await refineRoute(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toMatch(/userRequest is required/i);
    });

    it('provides prompt answers and calculates headcount adjustments', async () => {
      const req = new NextRequest('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.106',
        },
        body: JSON.stringify({
          currentPlan: { ...mockPlan, guest_count: 100 },
          userRequest: 'Recalculate for 20 fewer guests',
        }),
      });

      const response = await refineRoute(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('answer');
      expect(typeof data.answer).toBe('string');
      expect(data.answer.length).toBeGreaterThan(20);

      // Verify structured plan update extraction
      expect(data).toHaveProperty('suggestedPlanUpdate');
      expect(data.suggestedPlanUpdate).toBeDefined();
      expect(data.suggestedPlanUpdate.guest_count).toBe(80);
    });

    it('provides cost-cutting suggestions and budget cut modifications', async () => {
      const req = new NextRequest('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.107',
        },
        body: JSON.stringify({
          currentPlan: mockPlan,
          userRequest: 'How to cut budget by 15%?',
        }),
      });

      const response = await refineRoute(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.answer).toMatch(/cost|budget|save/i);
      expect(data.suggestedPlanUpdate).toBeDefined();
      expect(data.suggestedPlanUpdate.total_budget).toBe(Math.round(mockPlan.total_budget * 0.85));
    });

    it('answers dietary and menu substitution requests', async () => {
      const req = new NextRequest('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.108',
        },
        body: JSON.stringify({
          currentPlan: mockPlan,
          userRequest: 'Suggest gourmet plant-based vegetarian options',
        }),
      });

      const response = await refineRoute(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.answer).toMatch(/plant-based|vegetarian|squash|risotto/i);
    });
  });

  describe('Domain Specific Blueprint Features (Challenge 5 Requirements)', () => {
    it('all presets feature complete dietary restrictions breakdown', () => {
      DEMO_PRESETS.forEach((preset) => {
        const { dietary_breakdown } = preset.mockBlueprint;
        expect(dietary_breakdown).toBeDefined();
        expect(Array.isArray(dietary_breakdown)).toBe(true);
        expect(dietary_breakdown!.length).toBeGreaterThanOrEqual(2);

        dietary_breakdown!.forEach((diet: DietaryRequirement) => {
          expect(diet.category).toBeDefined();
          expect(diet.estimated_percentage).toBeGreaterThan(0);
          expect(diet.recommended_substitutions.length).toBeGreaterThan(10);
          expect(diet.chef_note.length).toBeGreaterThan(10);
        });
      });
    });

    it('all presets feature hour-by-hour day of schedule run-of-sheets', () => {
      DEMO_PRESETS.forEach((preset) => {
        const { day_of_schedule } = preset.mockBlueprint;
        expect(day_of_schedule).toBeDefined();
        expect(Array.isArray(day_of_schedule)).toBe(true);
        expect(day_of_schedule!.length).toBeGreaterThanOrEqual(4);

        day_of_schedule!.forEach((slot: DayOfScheduleItem) => {
          expect(slot.time).toMatch(/\d{2}:\d{2}/);
          expect(slot.activity.length).toBeGreaterThan(5);
          expect(slot.lead_coordinator_or_vendor.length).toBeGreaterThan(3);
          expect(slot.logistical_cue.length).toBeGreaterThan(10);
        });
      });
    });

    it('all presets include floorplan and weather contingency strategies', () => {
      DEMO_PRESETS.forEach((preset) => {
        const { logistics_contingency } = preset.mockBlueprint;
        expect(logistics_contingency).toBeDefined();
        expect(logistics_contingency!.seating_and_floorplan_advice.length).toBeGreaterThan(20);
        expect(logistics_contingency!.weather_contingency_plan.length).toBeGreaterThan(20);
        expect(logistics_contingency!.emergency_kit_essentials.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
