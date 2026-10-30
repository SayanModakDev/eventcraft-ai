import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventIntakeForm from '@/components/EventIntakeForm';
import BudgetVisualizer from '@/components/BudgetVisualizer';
import VendorPlaybook from '@/components/VendorPlaybook';
import Logo from '@/components/Logo';
import { DEMO_PRESETS } from '@/lib/presets';

describe('UI Component Render & Interaction Tests', () => {
  describe('EventIntakeForm Component', () => {
    it('renders intake form with preset buttons, sliders, and submit button', () => {
      const mockSubmit = vi.fn();
      const mockSelectPreset = vi.fn();

      render(
        <EventIntakeForm
          onSubmit={mockSubmit}
          isLoading={false}
          activePresetId="rustic-wedding"
          onSelectPreset={mockSelectPreset}
        />
      );

      // Verify One-Click Demo Presets rendered
      expect(screen.getByText(/Rustic Meadow Wedding/i)).toBeInTheDocument();
      expect(screen.getByText(/Neon Cyberpunk 21st Birthday/i)).toBeInTheDocument();
      expect(screen.getByText(/Global Tech Hackathon Finale Gala/i)).toBeInTheDocument();

      // Verify Currency toggles
      expect(screen.getByText(/₹ INR/i)).toBeInTheDocument();
      expect(screen.getByText(/\$ USD/i)).toBeInTheDocument();
      expect(screen.getByText(/€ EUR/i)).toBeInTheDocument();

      // Verify Form inputs
      expect(screen.getByPlaceholderText(/e.g., Mia & David's Vineyard Wedding/i)).toBeInTheDocument();
      expect(screen.getByText(/Guest Count/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Target Budget/i)).toBeInTheDocument();

      // Verify Submit Button
      expect(
        screen.getByRole('button', { name: /Generate Master Blueprint/i })
      ).toBeInTheDocument();
    });

    it('triggers onSelectPreset when a demo preset button is clicked', () => {
      const mockSubmit = vi.fn();
      const mockSelectPreset = vi.fn();

      render(
        <EventIntakeForm
          onSubmit={mockSubmit}
          isLoading={false}
          activePresetId="rustic-wedding"
          onSelectPreset={mockSelectPreset}
        />
      );

      const neonPresetBtn = screen.getByText(/Neon Cyberpunk 21st Birthday/i).closest('button');
      expect(neonPresetBtn).not.toBeNull();
      fireEvent.click(neonPresetBtn!);

      expect(mockSelectPreset).toHaveBeenCalledTimes(1);
      expect(mockSelectPreset).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'neon-birthday' })
      );
    });

    it('updates currency when currency buttons are clicked', () => {
      const mockSubmit = vi.fn();

      render(
        <EventIntakeForm
          onSubmit={mockSubmit}
          isLoading={false}
          activePresetId="rustic-wedding"
        />
      );

      const inrBtn = screen.getByText(/₹ INR/i);
      fireEvent.click(inrBtn);

      const submitBtn = screen.getByRole('button', { name: /Generate Master Blueprint/i });
      fireEvent.click(submitBtn);

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ currency: 'INR' })
      );
    });

    it('displays loading spinner and disables submit during active generation', () => {
      const mockSubmit = vi.fn();

      render(
        <EventIntakeForm
          onSubmit={mockSubmit}
          isLoading={true}
          activePresetId="rustic-wedding"
        />
      );

      expect(screen.getByText(/Crafting Master Plan.../i)).toBeInTheDocument();
      const submitBtn = screen.getByRole('button', { name: /Crafting Master Plan.../i });
      expect(submitBtn).toBeDisabled();
    });
  });

  describe('BudgetVisualizer Component', () => {
    const mockBreakdown = DEMO_PRESETS[0].mockBlueprint.budget_breakdown;

    it('renders target budget, allocated sum, and category cards', () => {
      render(
        <BudgetVisualizer
          totalBudget={25000}
          currency="USD"
          breakdown={mockBreakdown}
        />
      );

      expect(screen.getByText(/Target Budget/i)).toBeInTheDocument();
      expect(screen.getAllByText(/\$25,000/i).length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText(/Total Allocated/i)).toBeInTheDocument();
      expect(screen.getByText(/Potential Savings/i)).toBeInTheDocument();

      // Check for categories
      mockBreakdown.forEach((cat) => {
        expect(screen.getAllByText(cat.category).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('VendorPlaybook Component', () => {
    const mockChecklists = DEMO_PRESETS[0].mockBlueprint.vendor_checklists;

    it('renders vendor cards with deliverables, scripts, and red flags', () => {
      render(<VendorPlaybook checklists={mockChecklists} />);

      expect(screen.getByText(/Vendor Playbook & Negotiation Matrix/i)).toBeInTheDocument();

      mockChecklists.forEach((v) => {
        expect(screen.getByText(v.vendor_type)).toBeInTheDocument();
      });

      expect(screen.getAllByText(/Mandatory Contract Deliverables/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Contract Red Flags to Avoid/i).length).toBeGreaterThan(0);
    });
  });

  describe('Custom Brand Logo Component', () => {
    it('renders full brand lockup with EventCraft typography and AI badge', () => {
      render(<Logo size="md" variant="full" />);
      expect(screen.getByText('Event')).toBeInTheDocument();
      expect(screen.getByText('Craft')).toBeInTheDocument();
      expect(screen.getByText('AI')).toBeInTheDocument();
      expect(screen.getByText(/Celebration & Event Planner/i)).toBeInTheDocument();
    });

    it('renders standalone mark variant', () => {
      const { container } = render(<Logo variant="mark" href="/" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
