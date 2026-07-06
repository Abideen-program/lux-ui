import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders the label', () => {
    render(<DatePicker label="Pick a date" />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(<DatePicker placeholder="Select date" />);
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  it('shows formatted date when a value is provided', () => {
    const date = new Date(2025, 5, 15); // June 15 2025
    render(<DatePicker value={date} />);
    expect(screen.getByText('Jun 15, 2025')).toBeInTheDocument();
  });

  it('opens calendar when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole('button'));
    // Month/year header should appear
    expect(screen.getByText(/\d{4}/)).toBeInTheDocument();
  });

  it('calls onChange when a day is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    // Click any day number that appears (pick "15" which is safe for most months)
    const dayBtn = screen.getAllByRole('button').find(b => b.textContent === '15');
    if (dayBtn) await user.click(dayBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole('button'));
    const header = screen.getByText(/\w+ \d{4}/);
    const initialText = header.textContent;
    await user.click(screen.getByText('‹'));
    expect(screen.getByText(/\w+ \d{4}/).textContent).not.toBe(initialText);
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole('button'));
    const header = screen.getByText(/\w+ \d{4}/);
    const initialText = header.textContent;
    await user.click(screen.getByText('›'));
    expect(screen.getByText(/\w+ \d{4}/).textContent).not.toBe(initialText);
  });

  it('closes calendar after a date is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const dayBtn = screen.getAllByRole('button').find(b => b.textContent === '10');
    if (dayBtn) await user.click(dayBtn);
    // Calendar header should be gone
    expect(screen.queryByText('‹')).not.toBeInTheDocument();
  });
});
