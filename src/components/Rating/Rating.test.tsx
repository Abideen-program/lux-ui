import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './Rating';

function getStars(container: HTMLElement) {
  // The Rating root is the first div; its direct children are the star wrappers.
  const root = container.firstElementChild as HTMLElement;
  return Array.from(root.children) as HTMLElement[];
}

describe('Rating', () => {
  it('renders the default max of 5 stars', () => {
    const { container } = render(<Rating value={3} />);
    expect(getStars(container).length).toBe(5);
  });

  it('respects a custom max', () => {
    const { container } = render(<Rating value={3} max={10} />);
    expect(getStars(container).length).toBe(10);
  });

  it('calls onChange when a star is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<Rating value={0} onChange={onChange} />);
    const stars = getStars(container);
    await user.click(stars[2]); // third star = value 3
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when readOnly', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<Rating value={2} onChange={onChange} readOnly />);
    const stars = getStars(container);
    await user.click(stars[3]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
