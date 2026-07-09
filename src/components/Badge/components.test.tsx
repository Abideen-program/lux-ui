import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../Badge/Badge';
import { Avatar, AvatarGroup } from '../Avatar/Avatar';
import { Chip } from '../Chip/Chip';
import { Card, CardHeader, CardBody, CardFooter, GlassCard, NeonCard, AuroraCard } from '../Card/Card';

// ── Badge ──────────────────────────────────────────────────────

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders a count in counter variant', () => {
    render(<Badge variant="counter" count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

// ── Avatar ────────────────────────────────────────────────────

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<Avatar src="/avatar.jpg" alt="User avatar" />);
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('shows a status indicator when status prop is set', () => {
    const { container } = render(<Avatar initials="AB" status="online" />);
    // Status dot is a child span
    const statusDot = container.querySelectorAll('span');
    expect(statusDot.length).toBeGreaterThan(0);
  });
});

describe('AvatarGroup', () => {
  it('renders up to max avatars and an overflow count', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
        <Avatar initials="D" />
      </AvatarGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });
});

// ── Chip ──────────────────────────────────────────────────────

describe('Chip', () => {
  it('renders label text', () => {
    render(<Chip>React</Chip>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders a delete button when onDelete is provided', () => {
    render(<Chip onDelete={() => {}}>React</Chip>);
    expect(screen.getByLabelText('Remove')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<Chip onDelete={onDelete}>React</Chip>);
    await user.click(screen.getByLabelText('Remove'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when chip is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Chip onClick={onClick}>Tag</Chip>);
    await user.click(screen.getByText('Tag'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders an icon when provided', () => {
    render(<Chip icon={<span data-testid="chip-icon" />}>React</Chip>);
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
  });
});

// ── Card ──────────────────────────────────────────────────────

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders CardHeader with title and subtitle', () => {
    render(<CardHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('renders CardHeader action slot', () => {
    render(<CardHeader title="Title" action={<button>Edit</button>} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('renders CardFooter children', () => {
    render(<CardFooter><button>Save</button></CardFooter>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('GlassCard renders without crashing', () => {
    render(<GlassCard>Glass</GlassCard>);
    expect(screen.getByText('Glass')).toBeInTheDocument();
  });

  it('NeonCard renders without crashing', () => {
    render(<NeonCard>Neon</NeonCard>);
    expect(screen.getByText('Neon')).toBeInTheDocument();
  });

  it('AuroraCard renders without crashing', () => {
    render(<AuroraCard>Aurora</AuroraCard>);
    expect(screen.getByText('Aurora')).toBeInTheDocument();
  });
});
