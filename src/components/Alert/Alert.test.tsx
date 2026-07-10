import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children content', () => {
    render(<Alert tone="info">Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Alert tone="success" title="Saved">Your file was saved.</Alert>);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your file was saved.')).toBeInTheDocument();
  });

  it('renders a close button when onClose is provided', () => {
    render(<Alert tone="danger" onClose={() => {}}>Error</Alert>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('does not render a close button when onClose is not provided', () => {
    render(<Alert tone="info">Info</Alert>);
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Alert tone="warning" onClose={onClose}>Warning</Alert>);
    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a custom icon', () => {
    render(<Alert tone="info" icon={<span data-testid="custom-icon" />}>Info</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
