import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
];

describe('Breadcrumbs', () => {
  it('renders all item labels', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={items} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('does not render a link for the last item', () => {
    render(<Breadcrumbs items={items} />);
    const profileEl = screen.getByText('Profile');
    expect(profileEl.closest('a')).toBeNull();
  });

  it('renders a custom separator', () => {
    render(<Breadcrumbs items={items} separator=">" />);
    expect(screen.getAllByText('>').length).toBeGreaterThan(0);
  });

  it('calls onClick handler when provided', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Breadcrumbs items={[{ label: 'Home', onClick }]} />);
    await user.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('collapses middle items with maxItems', () => {
    const manyItems = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E' },
    ];
    render(<Breadcrumbs items={manyItems} maxItems={2} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });
});
