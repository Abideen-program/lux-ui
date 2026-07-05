import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

const items = [
  { label: 'Edit', onClick: vi.fn() },
  { label: 'Duplicate', onClick: vi.fn() },
  { divider: true, label: '', onClick: vi.fn() },
  { label: 'Delete', danger: true, onClick: vi.fn() },
  { label: 'Disabled', disabled: true, onClick: vi.fn() },
];

describe('Menu', () => {
  it('does not show menu items by default', () => {
    render(<Menu trigger={<Button>Open</Button>} items={items} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('shows menu items when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu trigger={<Button>Open</Button>} items={items} />);
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick when a menu item is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Menu trigger={<Button>Open</Button>} items={[{ label: 'Edit', onClick }]} />);
    await user.click(screen.getByText('Open'));
    await user.click(screen.getByText('Edit'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('closes the menu after an item is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu trigger={<Button>Open</Button>} items={[{ label: 'Edit', onClick: vi.fn() }]} />);
    await user.click(screen.getByText('Open'));
    await user.click(screen.getByText('Edit'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('does not call onClick for a disabled item', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Menu trigger={<Button>Open</Button>} items={[{ label: 'Disabled', disabled: true, onClick }]} />);
    await user.click(screen.getByText('Open'));
    await user.click(screen.getByText('Disabled'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('closes the menu when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Menu trigger={<Button>Open</Button>} items={[{ label: 'Edit', onClick: vi.fn() }]} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('toggles the menu closed when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(<Menu trigger={<Button>Open</Button>} items={[{ label: 'Edit', onClick: vi.fn() }]} />);
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    await user.click(screen.getByText('Open'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
