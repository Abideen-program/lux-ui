import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a percentage label when showLabel is true', () => {
    render(<Progress value={65} showLabel />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does not show label when showLabel is false', () => {
    render(<Progress value={65} showLabel={false} />);
    expect(screen.queryByText('65%')).not.toBeInTheDocument();
  });

  it('rounds the label to the nearest integer', () => {
    render(<Progress value={66.7} showLabel />);
    expect(screen.getByText('67%')).toBeInTheDocument();
  });

  it('renders a circular variant without crashing', () => {
    const { container } = render(<Progress variant="circular" value={50} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows the percentage inside circular variant when showLabel is true', () => {
    render(<Progress variant="circular" value={80} showLabel />);
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('does not show label text in indeterminate mode', () => {
    render(<Progress value={50} indeterminate showLabel />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });
});
