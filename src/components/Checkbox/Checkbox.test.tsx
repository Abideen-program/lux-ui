import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, RadioGroup } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Checkbox label="Subscribe" checked readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" onChange={onChange} disabled />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders hint text', () => {
    render(<Checkbox label="Subscribe" hint="You can unsubscribe anytime" />);
    expect(screen.getByText('You can unsubscribe anytime')).toBeInTheDocument();
  });

  it('sets indeterminate DOM property', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });
});

describe('RadioGroup', () => {
  const options = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
  ];

  it('renders all options', () => {
    render(<RadioGroup name="plan" options={options} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('marks the matching value as checked', () => {
    render(<RadioGroup name="plan" value="pro" options={options} />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const proRadio = radios.find(r => r.value === 'pro');
    expect(proRadio?.checked).toBe(true);
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<RadioGroup name="plan" value="free" options={options} onChange={onChange} />);
    await user.click(screen.getByText('Pro'));
    expect(onChange).toHaveBeenCalledWith('pro');
  });

  it('disables individual options', () => {
    render(<RadioGroup name="plan" options={[{ value: 'a', label: 'A', disabled: true }]} />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
