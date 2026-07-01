import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table';

interface Row { name: string; age: number; }

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age', align: 'right' as const },
];
const data: Row[] = [
  { name: 'Ada Lovelace', age: 36 },
  { name: 'Grace Hopper', age: 85 },
];

describe('Table', () => {
  it('renders all column headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders all row data', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText('36')).toBeInTheDocument();
  });

  it('shows empty text when data is empty', () => {
    render(<Table columns={columns} data={[]} emptyText="No records" />);
    expect(screen.getByText('No records')).toBeInTheDocument();
  });

  it('shows loading text when loading is true', () => {
    render(<Table columns={columns} data={data} loading />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('calls onRowClick with row and index when a row is clicked', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    await user.click(screen.getByText('Ada Lovelace'));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('renders custom cell content via render function', () => {
    const customCols = [
      { key: 'name', header: 'Name', render: (row: Row) => `${row.name} (${row.age})` },
    ];
    render(<Table columns={customCols} data={data} />);
    expect(screen.getByText('Ada Lovelace (36)')).toBeInTheDocument();
  });
});
