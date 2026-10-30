import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock window.print
if (typeof window !== 'undefined') {
  window.print = vi.fn();
}

// Mock window.scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn();
}

