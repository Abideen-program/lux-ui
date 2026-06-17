import React, { ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface MasonryProps extends BaseProps {
  /** Number of columns */
  cols?: number;
  /** Gap between items */
  gap?: number;
}

export function Masonry({ cols = 3, gap = 16, children, className, style }: MasonryProps) {
  return (
    <div
      className={className}
      style={{ columnCount: cols, columnGap: gap, ...style }}
    >
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ marginBottom: gap, breakInside: 'avoid' }}>
          {child}
        </div>
      ))}
    </div>
  );
}
