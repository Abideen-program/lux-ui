'use client';

import React, { useState, useMemo } from 'react';
import { DataGridColumn, SortDirection } from './DataGrid.types';
import { BaseProps } from '../../types';

export interface DataGridProps<T = any> extends BaseProps {
  columns: DataGridColumn<T>[];
  data: T[];
  /** Rows per page. 0 disables pagination. */
  pageSize?: number;
  /** Enable a global search box */
  searchable?: boolean;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Row selection (checkboxes) */
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  loading?: boolean;
  emptyText?: string;
  dense?: boolean;
  striped?: boolean;
  /** Unique row key extractor — falls back to index */
  rowKey?: (row: T) => string | number;
}

export function DataGrid<T = any>({
  columns,
  data,
  pageSize = 10,
  searchable = false,
  onRowClick,
  selectable = false,
  onSelectionChange,
  loading = false,
  emptyText = 'No data',
  dense = false,
  striped = false,
  rowKey,
  className,
  style,
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const getKey = (row: T, i: number) => rowKey ? rowKey(row) : i;

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        const val = (row as any)[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    const col = columns.find(c => c.key === sortKey);
    const arr = [...filtered];
    arr.sort((a, b) => {
      if (col?.sortFn) return sortDir === 'asc' ? col.sortFn(a, b) : col.sortFn(b, a);
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const pageData = pageSize > 0 ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const toggleSort = (col: DataGridColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) { setSortKey(col.key); setSortDir('asc'); return; }
    if (sortDir === 'asc') { setSortDir('desc'); return; }
    setSortKey(null); setSortDir(null);
  };

  const toggleSelectRow = (key: string | number) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSelected(next);
    onSelectionChange?.(data.filter((row, i) => next.has(getKey(row, i))));
  };

  const toggleSelectAll = () => {
    if (selected.size === pageData.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const next = new Set(pageData.map((row, i) => getKey(row, i)));
      setSelected(next);
      onSelectionChange?.(pageData);
    }
  };

  const cellPadding = dense ? '0.5rem 0.75rem' : '0.75rem 1rem';

  return (
    <div className={className} style={style}>
      {searchable && (
        <div style={{ marginBottom: '0.75rem' }}>
          <input
            {...{ input: 'true' } as any}
            placeholder="Search…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.875rem', width: '100%', maxWidth: 280 }}
          />
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              {selectable && (
                <th style={{ padding: cellPadding, borderBottom: '1px solid var(--lux-border)', width: 36 }}>
                  <input type="checkbox" checked={pageData.length > 0 && selected.size === pageData.length} onChange={toggleSelectAll} />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col)}
                  style={{
                    textAlign: col.align || 'left', padding: cellPadding, width: col.width,
                    fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                    opacity: 0.5, borderBottom: '1px solid var(--lux-border)',
                    cursor: col.sortable ? 'pointer' : 'default', userSelect: 'none',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {col.header}
                    {col.sortable && (
                      <span style={{ fontSize: '0.7rem', opacity: sortKey === col.key ? 1 : 0.3 }}>
                        {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Loading…</td></tr>
            ) : pageData.length === 0 ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>{emptyText}</td></tr>
            ) : (
              pageData.map((row, i) => {
                const key = getKey(row, i);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row, i)}
                    style={{ cursor: onRowClick ? 'pointer' : 'default', background: striped && i % 2 === 1 ? 'var(--lux-surface-1)' : 'transparent' }}
                  >
                    {selectable && (
                      <td style={{ padding: cellPadding, borderBottom: '1px solid var(--lux-border)' }} onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={selected.has(key)} onChange={() => toggleSelectRow(key)} />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} style={{ padding: cellPadding, textAlign: col.align || 'left', borderBottom: '1px solid var(--lux-border)' }}>
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pageSize > 0 && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.875rem', fontSize: '0.78rem', opacity: 0.7 }}>
          <span>Page {page} of {totalPages} · {sorted.length} rows</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.3rem 0.7rem', borderRadius: 6, border: '1px solid var(--lux-border)', background: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, color: 'inherit' }}>Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '0.3rem 0.7rem', borderRadius: 6, border: '1px solid var(--lux-border)', background: 'none', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1, color: 'inherit' }}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
