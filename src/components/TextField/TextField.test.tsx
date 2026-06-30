import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders the label', () => {
    render(<TextField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the placeholder', () => {
    render(<TextField placeholder="you@example.com" />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('calls onChange when typed into', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextField onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hi');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows hint text', () => {
    render(<TextField hint="Must be unique" />);
    expect(screen.getByText('Must be unique')).toBeInTheDocument();
  });

  it('shows error text instead of hint when both are present', () => {
    render(<TextField hint="Must be unique" error="Already taken" />);
    expect(screen.getByText('Already taken')).toBeInTheDocument();
    expect(screen.queryByText('Must be unique')).not.toBeInTheDocument();
  });

  it('disables the input when disabled', () => {
    render(<TextField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders left and right addons', () => {
    render(<TextField leftAddon={<span data-testid="left" />} rightAddon={<span data-testid="right" />} />);
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });
});
