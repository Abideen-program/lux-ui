import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when open is false', () => {
    render(<Modal open={false} title="Hello">Content</Modal>);
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('renders title and children when open', () => {
    render(<Modal open title="Hello">Content</Modal>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal open title="Hello" onClose={onClose}>Content</Modal>);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose}>Content</Modal>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} closeOnEscape={false}>Content</Modal>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('hides the close button when showCloseButton is false', () => {
    render(<Modal open title="Hello" showCloseButton={false}>Content</Modal>);
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('renders footer content when provided', () => {
    render(<Modal open footer={<button>Confirm</button>}>Content</Modal>);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
