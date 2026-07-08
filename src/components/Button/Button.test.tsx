import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} disabled>Click me</Button>);
    await user.click(screen.getByText('Click me'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables the button when loading', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} loading>Saving</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders left and right icons', () => {
    render(<Button leftIcon={<span data-testid="left" />} rightIcon={<span data-testid="right" />}>Go</Button>);
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('hides leftIcon and rightIcon while loading (shows spinner instead)', () => {
    render(<Button leftIcon={<span data-testid="left" />} loading>Go</Button>);
    expect(screen.queryByTestId('left')).not.toBeInTheDocument();
  });

  it('applies fullWidth style', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ width: '100%' });
  });

  it('forwards native button props', () => {
    render(<Button type="submit" aria-label="submit-btn">Go</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('aria-label', 'submit-btn');
  });
});
