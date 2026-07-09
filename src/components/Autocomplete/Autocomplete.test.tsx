import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './Autocomplete';

const options = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
];

describe('Autocomplete', () => {
  it('renders the label', () => {
    render(<Autocomplete options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders the placeholder', () => {
    render(<Autocomplete options={options} placeholder="Pick a fruit" />);
    expect(screen.getByPlaceholderText('Pick a fruit')).toBeInTheDocument();
  });

  it('shows dropdown options on focus', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('filters options as user types', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} />);
    await user.type(screen.getByRole('textbox'), 'ban');
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Autocomplete options={options} onChange={onChange} />);
    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByText('Cherry'));
    expect(onChange).toHaveBeenCalledWith('3');
  });

  it('shows noOptionsText when no options match', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} noOptionsText="Nothing found" />);
    await user.type(screen.getByRole('textbox'), 'xyz');
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Autocomplete options={options} />
        <button>Outside</button>
      </div>
    );
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    await user.click(screen.getByText('Outside'));
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('navigates options with arrow keys', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Autocomplete options={options} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.click(input);
    // highlighted starts at 0 (Apple), ArrowDown moves to 1 (Banana), Enter selects it
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
