import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

function Example({ onChange }: { onChange?: (v: string) => void }) {
  return (
    <Tabs defaultValue="a" onChange={onChange}>
      <TabList>
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows the default tab panel', () => {
    render(<Example />);
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
  });

  it('switches panels when a tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText('Tab B'));
    expect(screen.getByText('Panel B')).toBeInTheDocument();
    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
  });

  it('calls onChange with the new value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onChange={onChange} />);
    await user.click(screen.getByText('Tab B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not switch when a disabled tab is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b" disabled>B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>
    );
    await user.click(screen.getByText('B'));
    expect(screen.getByText('Panel A')).toBeInTheDocument();
  });

  it('respects a controlled value prop', () => {
    render(
      <Tabs value="b">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Panel B')).toBeInTheDocument();
  });
});
