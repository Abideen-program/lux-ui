import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders the label', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('renders the hint', () => {
    render(<Switch label="Notifications" hint="Get email alerts" />);
    expect(screen.getByText('Get email alerts')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Switch label="On" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Toggle" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Toggle" onChange={onChange} disabled />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
