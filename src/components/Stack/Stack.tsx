import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Direction */
  direction?: 'row' | 'column';
  /** Gap between items */
  gap?: number | string;
  /** Align items (cross axis) */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content (main axis) */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap items */
  wrap?: boolean;
  /** Divider between items */
  divider?: React.ReactNode;
}

const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline' };
const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around', evenly: 'space-evenly' };
const toUnit = (v?: number | string) => typeof v === 'number' ? `${v * 0.25}rem` : v;

export function Stack({
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap = false,
  divider,
  children,
  className,
  style,
  ...props
}: StackProps) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: divider ? 0 : toUnit(gap),
        alignItems: align ? alignMap[align] : undefined,
        justifyContent: justify ? justifyMap[justify] : undefined,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...props}
    >
      {divider
        ? items.map((child, i) => (
            <React.Fragment key={i}>
              {child}
              {i < items.length - 1 && divider}
            </React.Fragment>
          ))
        : children}
    </div>
  );
}
