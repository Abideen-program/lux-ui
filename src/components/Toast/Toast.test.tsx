import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast';

function Trigger() {
  const toast = useToast();
  return <button onClick={() => toast('Saved!', { tone: 'success', title: 'Success' })}>Show</button>;
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('throws when useToast is used outside a ToastProvider', () => {
    const Bad = () => { useToast(); return null; };
    // Suppress expected console.error from React for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Bad />)).toThrow();
    spy.mockRestore();
  });

  it('shows a toast after calling toast()', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    await user.click(screen.getByText('Show'));
    expect(screen.getByText('Saved!')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('auto-dismisses after the default duration', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    await user.click(screen.getByText('Show'));
    expect(screen.getByText('Saved!')).toBeInTheDocument();

    vi.advanceTimersByTime(4100);

    await waitFor(() => {
      expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
    });
  });
});
