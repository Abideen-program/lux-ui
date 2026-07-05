import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders content in the DOM when open (even if CSS translates it)', () => {
    render(<Drawer open title="Settings">Drawer content</Drawer>);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('renders content in the DOM (uses CSS transform for show/hide)', () => {
    // Drawer is always in DOM via portal, sliding via transform
    const { rerender } = render(<Drawer open={false} title="Settings">Content</Drawer>);
    // jsdom doesn't compute CSS so we just verify it renders without crashing
    rerender(<Drawer open title="Settings">Content</Drawer>);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders a close button by default', () => {
    render(<Drawer open title="Settings">Content</Drawer>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Drawer open onClose={onClose} title="Settings">Content</Drawer>);
    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>Content</Drawer>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when showCloseButton is false', () => {
    render(<Drawer open showCloseButton={false} title="Settings">Content</Drawer>);
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });
});
