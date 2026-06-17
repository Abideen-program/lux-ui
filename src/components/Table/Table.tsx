import React, { ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface TableColumn<T = any> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> extends BaseProps {
  columns: TableColumn<T>[];
  data: T[];
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyText?: string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Compact rows */
  dense?: boolean;
  /** Striped rows */
  striped?: boolean;
}

export function Table<T = any>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyText = 'No data',
  stickyHeader = false,
  dense = false,
  striped = false,
  className,
  style,
}: TableProps<T>) {
  const cellPadding = dense ? '0.5rem 0.75rem' : '0.75rem 1rem';

  return (
    <div className={className} style={{ overflowX: 'auto', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ position: stickyHeader ? 'sticky' : undefined, top: stickyHeader ? 0 : undefined, background: 'var(--lux-bg)' }}>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  textAlign: col.align || 'left',
                  padding: cellPadding,
                  width: col.width,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  opacity: 0.5,
                  borderBottom: '1px solid var(--lux-border)',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Loading…</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>{emptyText}</td></tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row, i)}
                style={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  background: striped && i % 2 === 1 ? 'var(--lux-surface-1)' : 'transparent',
                }}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{ padding: cellPadding, textAlign: col.align || 'left', borderBottom: '1px solid var(--lux-border)' }}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
