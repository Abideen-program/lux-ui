import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'ng', label: 'Nigeria' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
];

describe('Select', () => {
  it('renders the label', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    expect(screen.getByText('Nigeria')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
  });

  it('renders placeholder as first option', () => {
    render(<Select options={options} placeholder="Choose country" />);
    expect(screen.getByText('Choose country')).toBeInTheDocument();
  });

  it('shows hint text', () => {
    render(<Select options={options} hint="Select your region" />);
    expect(screen.getByText('Select your region')).toBeInTheDocument();
  });

  it('shows error text', () => {
    render(<Select options={options} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('disables the select when disabled prop is set', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('marks disabled options as disabled', () => {
    render(<Select options={options} />);
    const disabledOption = screen.getByText('United Kingdom').closest('option') as HTMLOptionElement;
    expect(disabledOption.disabled).toBe(true);
  });

  it('calls onChange when a value is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'ng');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
