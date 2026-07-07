import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Button } from '../Button/Button';
import { ToggleButton, ToggleButtonGroup } from '../ToggleButton/ToggleButton';

// ── ButtonGroup ───────────────────────────────────────────────

describe('ButtonGroup', () => {
  it('renders all child buttons', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });

  it('each button remains clickable', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ButtonGroup>
        <Button onClick={onClick}>A</Button>
        <Button onClick={onClick}>B</Button>
      </ButtonGroup>
    );
    await user.click(screen.getByText('A'));
    await user.click(screen.getByText('B'));
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

// ── ToggleButton ──────────────────────────────────────────────

describe('ToggleButtonGroup', () => {
  it('renders all child toggle buttons', () => {
    render(
      <ToggleButtonGroup value="a" onChange={() => {}}>
        <ToggleButton value="a">Left</ToggleButton>
        <ToggleButton value="b">Center</ToggleButton>
        <ToggleButton value="c">Right</ToggleButton>
      </ToggleButtonGroup>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('calls onChange with the new value on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ToggleButtonGroup value="a" onChange={onChange}>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>
    );
    await user.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('calls onChange with an array in multiple mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ToggleButtonGroup value={['a']} onChange={onChange} multiple>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>
    );
    await user.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  });

  it('deselects an item in multiple mode when clicked again', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ToggleButtonGroup value={['a', 'b']} onChange={onChange} multiple>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>
    );
    await user.click(screen.getByText('A'));
    expect(onChange).toHaveBeenCalledWith(['b']);
  });
});
