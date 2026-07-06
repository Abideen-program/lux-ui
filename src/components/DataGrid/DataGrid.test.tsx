import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataGrid } from './DataGrid';

interface Row { name: string; age: number; }

const rows: Row[] = [
  { name: 'Charlie', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
];

describe('DataGrid', () => {
  it('renders all rows by default', () => {
    render(<DataGrid columns={columns} data={rows} pageSize={0} />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows the empty message when data is empty', () => {
    render(<DataGrid columns={columns} data={[]} emptyText="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows a loading message when loading is true', () => {
    render(<DataGrid columns={columns} data={rows} loading />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('sorts rows ascending then descending on header click', async () => {
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={rows} pageSize={0} />);

    await user.click(screen.getByText('Name'));
    let cells = screen.getAllByRole('row').slice(1).map(r => r.textContent);
    expect(cells[0]).toContain('Alice');

    await user.click(screen.getByText('Name'));
    cells = screen.getAllByRole('row').slice(1).map(r => r.textContent);
    expect(cells[0]).toContain('Charlie');
  });

  it('filters rows via the search box', async () => {
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={rows} searchable pageSize={0} />);
    await user.type(screen.getByPlaceholderText('Search…'), 'alice');
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('calls onRowClick with the clicked row', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={rows} onRowClick={onRowClick} pageSize={0} />);
    await user.click(screen.getByText('Bob'));
    expect(onRowClick).toHaveBeenCalledWith(rows[2], 2);
  });

  it('shows row checkboxes when selectable is true', () => {
    render(<DataGrid columns={columns} data={rows} selectable pageSize={0} />);
    // +1 for the select-all checkbox in the header
    expect(screen.getAllByRole('checkbox')).toHaveLength(rows.length + 1);
  });

  it('calls onSelectionChange when a row checkbox is toggled', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={rows} selectable onSelectionChange={onSelectionChange} pageSize={0} />);
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // first row checkbox
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('paginates rows according to pageSize', () => {
    render(<DataGrid columns={columns} data={rows} pageSize={2} />);
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it('renders custom cell content via render function', () => {
    const customColumns = [
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age', render: (row: Row) => `${row.age} yrs` },
    ];
    render(<DataGrid columns={customColumns} data={rows} pageSize={0} />);
    expect(screen.getByText('25 yrs')).toBeInTheDocument();
  });
});
