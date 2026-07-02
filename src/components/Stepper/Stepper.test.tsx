import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const steps = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Confirm' },
];

describe('Stepper', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('shows step numbers for non-active, non-completed steps', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows a checkmark for completed steps', () => {
    render(<Stepper steps={steps} activeStep={2} />);
    expect(screen.getAllByText('✓').length).toBe(2);
  });

  it('renders step descriptions when provided', () => {
    render(<Stepper steps={[{ label: 'Step 1', description: 'Enter your email' }]} activeStep={0} />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('accepts vertical orientation', () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} orientation="vertical" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
