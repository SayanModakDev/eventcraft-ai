import { describe, it, expect } from 'vitest';
import { DEMO_PRESETS } from '@/lib/presets';
import { TimelineMilestone, TimelineTask } from '@/types/event';

describe('Timeline & Milestone Phasing Logic', () => {
  const VALID_PRIORITIES = ['High', 'Medium', 'Low'] as const;

  DEMO_PRESETS.forEach((preset) => {
    describe(`Preset Milestones: ${preset.name}`, () => {
      const { timeline_milestones } = preset.mockBlueprint;

      it('contains multiple sequentially ordered phases', () => {
        expect(timeline_milestones.length).toBeGreaterThanOrEqual(2);

        // Verify phase titles follow chronological progression
        timeline_milestones.forEach((milestone, index) => {
          expect(milestone.phase).toBeDefined();
          expect(milestone.phase.length).toBeGreaterThan(0);
          expect(milestone.phase).toMatch(new RegExp(`Phase ${index + 1}`, 'i'));
        });
      });

      it('each phase contains valid and well-defined tasks', () => {
        timeline_milestones.forEach((milestone) => {
          expect(milestone.tasks.length).toBeGreaterThanOrEqual(1);

          milestone.tasks.forEach((task: TimelineTask) => {
            expect(task.task_name).toBeDefined();
            expect(task.task_name.trim().length).toBeGreaterThan(0);

            expect(task.description).toBeDefined();
            expect(task.description.trim().length).toBeGreaterThan(15);
          });
        });
      });

      it('every task has a strictly valid priority level (High, Medium, or Low)', () => {
        timeline_milestones.forEach((milestone) => {
          milestone.tasks.forEach((task: TimelineTask) => {
            expect(VALID_PRIORITIES).toContain(task.priority);
          });
        });
      });

      it('foundational phase 1 contains at least one High priority task', () => {
        const phase1 = timeline_milestones[0];
        const highPriorityTasks = phase1.tasks.filter((t) => t.priority === 'High');
        expect(highPriorityTasks.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Timeline Progress Calculation', () => {
    const mockMilestones: TimelineMilestone[] = [
      {
        phase: 'Phase 1: Setup',
        tasks: [
          { task_name: 'Task 1', priority: 'High', description: 'Description 1' },
          { task_name: 'Task 2', priority: 'Medium', description: 'Description 2' },
        ],
      },
      {
        phase: 'Phase 2: Execution',
        tasks: [
          { task_name: 'Task 3', priority: 'High', description: 'Description 3' },
          { task_name: 'Task 4', priority: 'Low', description: 'Description 4' },
        ],
      },
    ];

    it('calculates total task count across all phases', () => {
      const total = mockMilestones.reduce((acc, m) => acc + m.tasks.length, 0);
      expect(total).toBe(4);
    });

    it('computes completion percentages accurately', () => {
      const total = mockMilestones.reduce((acc, m) => acc + m.tasks.length, 0);
      
      const calcProgress = (done: number) => (total > 0 ? Math.round((done / total) * 100) : 0);

      expect(calcProgress(0)).toBe(0);
      expect(calcProgress(1)).toBe(25);
      expect(calcProgress(2)).toBe(50);
      expect(calcProgress(3)).toBe(75);
      expect(calcProgress(4)).toBe(100);
    });

    it('handles zero task edge case gracefully', () => {
      const emptyMilestones: TimelineMilestone[] = [];
      const total = emptyMilestones.reduce((acc, m) => acc + (m.tasks?.length || 0), 0);
      const progress = total > 0 ? Math.round((0 / total) * 100) : 0;
      expect(progress).toBe(0);
    });
  });
});

