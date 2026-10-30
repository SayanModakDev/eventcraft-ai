import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as planRoute } from '@/app/api/plan/route';
import { POST as refineRoute } from '@/app/api/refine/route';
import { DEMO_PRESETS } from '@/lib/presets';

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
        headers: { 'Content-Type': 'application/json' },
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

      // 2. Budget Breakdown Validation
      expect(Array.isArray(plan.budget_breakdown)).toBe(true);
      expect(plan.budget_breakdown.length).toBeGreaterThanOrEqual(3);

      let totalPct = 0;
      plan.budget_breakdown.forEach((cat: any) => {
        expect(typeof cat.category).toBe('string');
        expect(typeof cat.percentage).toBe('number');
        expect(typeof cat.estimated_cost).toBe('number');
        expect(typeof cat.cost_saving_tip).toBe('string');
        totalPct += cat.percentage;
      });
      expect(totalPct).toBe(100);

      // 3. Phased Timeline Milestones Validation
      expect(Array.isArray(plan.timeline_milestones)).toBe(true);
      expect(plan.timeline_milestones.length).toBeGreaterThanOrEqual(2);
      plan.timeline_milestones.forEach((m: any) => {
        expect(typeof m.phase).toBe('string');
        expect(Array.isArray(m.tasks)).toBe(true);
        m.tasks.forEach((t: any) => {
          expect(typeof t.task_name).toBe('string');
          expect(['High', 'Medium', 'Low']).toContain(t.priority);
          expect(typeof t.description).toBe('string');
        });
      });

      // 4. Vendor Playbook Matrix Validation
      expect(Array.isArray(plan.vendor_checklists)).toBe(true);
      expect(plan.vendor_checklists.length).toBeGreaterThanOrEqual(2);
      plan.vendor_checklists.forEach((v: any) => {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const response = await planRoute(req);
      const data = await response.json();

      expect(data.plan.guest_count).toBe(80);
      expect(data.plan.location).toBe('Industrial Studio');
      expect(data.plan.eventType).toBe('Birthday Party');
      expect(data.plan.created_at).toBeDefined();
    });

    it('gracefully returns 500 when request body cannot be parsed as JSON', async () => {
      const req = new NextRequest('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-malformed-json{',
      });

      const response = await planRoute(req);
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  describe('POST /api/refine (Real-Time Co-Pilot Route)', () => {
    const mockPlan = DEMO_PRESETS[0].mockBlueprint;

    it('returns 400 when userRequest is missing or empty', async () => {
      const req = new NextRequest('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
});

