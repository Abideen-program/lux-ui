'use client';

import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface GridProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Number of columns (default) */
  cols?: number;
  /** Columns at sm breakpoint (≥640px) */
  smCols?: number;
  /** Columns at md breakpoint (≥768px) */
  mdCols?: number;
  /** Columns at lg breakpoint (≥1024px) */
  lgCols?: number;
  /** Gap between items */
  gap?: number | string;
  /** Row gap (overrides gap) */
  rowGap?: number | string;
  /** Column gap (overrides gap) */
  colGap?: number | string;
}

const toUnit = (v?: number | string) => typeof v === 'number' ? `${v * 0.25}rem` : v;

export function Grid({
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 4,
  rowGap,
  colGap,
  children,
  className,
  style,
  ...props
}: GridProps) {
  // Use CSS custom properties + media queries via inline <style> for responsive cols
  const gridId = React.useId().replace(/:/g, '');

  return (
    <>
      {(smCols || mdCols || lgCols) && (
        <style>{`
          .lux-grid-${gridId} { grid-template-columns: repeat(${cols}, minmax(0, 1fr)); }
          ${smCols ? `@media (min-width: 640px)  { .lux-grid-${gridId} { grid-template-columns: repeat(${smCols}, minmax(0, 1fr)); } }` : ''}
          ${mdCols ? `@media (min-width: 768px)  { .lux-grid-${gridId} { grid-template-columns: repeat(${mdCols}, minmax(0, 1fr)); } }` : ''}
          ${lgCols ? `@media (min-width: 1024px) { .lux-grid-${gridId} { grid-template-columns: repeat(${lgCols}, minmax(0, 1fr)); } }` : ''}
        `}</style>
      )}
      <div
        className={`lux-grid-${gridId} ${className || ''}`.trim()}
        style={{
          display: 'grid',
          gridTemplateColumns: !(smCols || mdCols || lgCols) ? `repeat(${cols}, minmax(0, 1fr))` : undefined,
          gap:    !rowGap && !colGap ? toUnit(gap) : undefined,
          rowGap: rowGap ? toUnit(rowGap) : undefined,
          columnGap: colGap ? toUnit(colGap) : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
