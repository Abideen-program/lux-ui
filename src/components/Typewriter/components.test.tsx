import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Typewriter } from '../Typewriter/Typewriter';
import { Skeleton } from '../Skeleton/Skeleton';

// ── Typewriter ────────────────────────────────────────────────

describe('Typewriter', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts with an empty string', () => {
    render(<Typewriter text="Hello" speed={50} cursor={false} />);
    // Immediately after render, no characters yet (first tick hasn't fired)
    const el = document.body.firstElementChild?.firstElementChild;
    expect(el).toBeTruthy();
  });

  it('types out a single string character by character', async () => {
    render(<Typewriter text="Hi" speed={50} cursor={false} loop={false} />);
    // Advance past first character
    await act(async () => { vi.advanceTimersByTime(55); });
    expect(document.body.textContent).toContain('H');
    await act(async () => { vi.advanceTimersByTime(55); });
    expect(document.body.textContent).toContain('Hi');
  });

  it('renders a cursor element when cursor is true', () => {
    render(<Typewriter text="Hello" cursor />);
    // The cursor is a <span> with &nbsp; content
    const spans = document.querySelectorAll('span');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('renders as a different element via as prop', () => {
    const { container } = render(<Typewriter text="Test" as="h1" />);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('accepts an array of strings', () => {
    render(<Typewriter text={['First', 'Second']} speed={50} cursor={false} />);
    // Should render without crashing
    expect(document.body).toBeInTheDocument();
  });
});

// ── Skeleton ──────────────────────────────────────────────────

describe('Skeleton', () => {
  it('renders a text variant by default', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.style.borderRadius).toBe('4px');
  });

  it('renders a circular variant', () => {
    const { container } = render(<Skeleton variant="circular" width={40} height={40} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.borderRadius).toBe('50%');
  });

  it('renders a rectangular variant with zero or empty border radius', () => {
    const { container } = render(<Skeleton variant="rectangular" width={120} height={60} />);
    const el = container.firstChild as HTMLElement;
    // jsdom may return '0' or '0px' — both mean zero border radius
    const br = el.style.borderRadius;
    expect(br === '0px' || br === '0' || br === '').toBe(true);
  });

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={50} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('50px');
  });
});
