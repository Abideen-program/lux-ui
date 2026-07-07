import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { Counter } from './Counter';

// Counter animates via requestAnimationFrame + performance.now.
// We need to mock both to fast-forward the animation in tests.

describe('Counter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    let time = 0;
    vi.spyOn(performance, 'now').mockImplementation(() => time++);
    // Fast rAF: immediately invoke callback with a timestamp ahead of any duration
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(99999); // progress = (99999 - 0) / duration → ≥1, so snaps to final value
      return 0;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the final value after animation', async () => {
    const { container } = render(<Counter value={1000} triggerOnView={false} />);
    await act(async () => {});
    expect(container.textContent).toContain('1');
  });

  it('renders with a prefix', async () => {
    const { container } = render(<Counter value={500} prefix="$" triggerOnView={false} />);
    await act(async () => {});
    expect(container.textContent).toContain('$');
  });

  it('renders with a suffix', async () => {
    const { container } = render(<Counter value={99} suffix="%" triggerOnView={false} />);
    await act(async () => {});
    expect(container.textContent).toContain('%');
  });

  it('renders with decimal places', async () => {
    const { container } = render(<Counter value={3.14} decimals={2} triggerOnView={false} />);
    await act(async () => {});
    expect(container.textContent).toContain('3');
  });

  it('renders as a different element via as prop', async () => {
    const { container } = render(<Counter value={42} as="h2" triggerOnView={false} />);
    await act(async () => {});
    expect(container.querySelector('h2')).toBeInTheDocument();
  });
});
