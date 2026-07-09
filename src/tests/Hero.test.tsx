import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Hero } from '../components/sections/Hero';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: () => ({ scrollY: { get: () => 0 } }),
    useTransform: (_v: unknown, _i: unknown, o: unknown[]) => o[0],
  };
});

describe('Hero carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the first slide on mount', () => {
    render(<Hero />);
    expect(screen.getByAltText(/vedah vital ashwagandha bottle/i)).toBeInTheDocument();
  });

  it('advances slide automatically every 5 seconds', async () => {
    render(<Hero />);
    // After 5s the carousel should advance to slide 1
    act(() => { vi.advanceTimersByTime(5100); });
    // Slide 2 is supplement facts panel
    expect(screen.getByText(/Supplement Facts/i)).toBeInTheDocument();
  });

  it('pagination dot buttons render with accessible labels', () => {
    render(<Hero />);
    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dots).toHaveLength(5);
  });

  it('manual dot click resets timer (no double-advance within 5s)', () => {
    render(<Hero />);
    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    fireEvent.click(dots[2]); // jump to slide 3
    // advance only 4.9s — should still be on slide 3
    act(() => { vi.advanceTimersByTime(4900); });
    expect(screen.getByText(/Active Ingredients/i)).toBeInTheDocument();
  });

  it('dragging does not open the enlarged modal, but clicking does', () => {
    render(<Hero />);
    const carousel = screen.getByTestId('hero-carousel');
    // Simulate drag: mouse down, move > 50px, mouse up
    fireEvent.mouseDown(carousel, { clientX: 100, clientY: 0 });
    fireEvent.mouseMove(carousel, { clientX: 30, clientY: 0 }); // 70px left drag
    fireEvent.mouseUp(carousel);
    // Modal should not be present
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    // Now simulate a simple click (no drag)
    fireEvent.click(carousel);
    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
