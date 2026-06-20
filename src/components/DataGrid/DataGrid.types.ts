import { ReactNode } from 'react';

export interface DataGridColumn<T = any> {
  key: string;
  header: string;
  /** Custom cell renderer */
  render?: (row: T) => ReactNode;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Custom sort comparator */
  sortFn?: (a: T, b: T) => number;
  /** Column width */
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  /** Enable text filtering on this column */
  filterable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;
