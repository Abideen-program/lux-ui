import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeView } from './TreeView';

const nodes = [
  {
    id: '1',
    label: 'src',
    children: [
      { id: '2', label: 'components' },
      { id: '3', label: 'index.ts' },
    ],
  },
  { id: '4', label: 'package.json' },
];

describe('TreeView', () => {
  it('renders top-level nodes', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('package.json')).toBeInTheDocument();
  });

  it('hides children by default', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.queryByText('components')).not.toBeInTheDocument();
  });

  it('expands a node when clicked', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} />);
    await user.click(screen.getByText('src'));
    expect(screen.getByText('components')).toBeInTheDocument();
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });

  it('collapses a node when clicked again', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} />);
    await user.click(screen.getByText('src'));
    expect(screen.getByText('components')).toBeInTheDocument();
    await user.click(screen.getByText('src'));
    expect(screen.queryByText('components')).not.toBeInTheDocument();
  });

  it('expands defaultExpanded nodes on mount', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['1']} />);
    expect(screen.getByText('components')).toBeInTheDocument();
  });

  it('calls onSelect when a node is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onSelect={onSelect} />);
    await user.click(screen.getByText('package.json'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '4', label: 'package.json' }));
  });

  it('highlights the selected node', () => {
    render(<TreeView nodes={nodes} selected="4" />);
    const node = screen.getByText('package.json');
    expect(node.closest('div')).toHaveStyle({ color: 'var(--lux-primary)' });
  });
});
