import React, { HTMLAttributes, ElementType } from 'react';
import { BaseProps } from '../../types';

export interface BoxProps extends HTMLAttributes<HTMLElement>, BaseProps {
  /** Render as a different element */
  as?: ElementType;
  /** Padding (all sides) */
  p?: number | string;
  /** Padding X */
  px?: number | string;
  /** Padding Y */
  py?: number | string;
  /** Margin (all sides) */
  m?: number | string;
  /** Margin X */
  mx?: number | string;
  /** Margin Y */
  my?: number | string;
  /** Width */
  w?: number | string;
  /** Height */
  h?: number | string;
}

const toUnit = (v?: number | string) => typeof v === 'number' ? `${v * 0.25}rem` : v;

export function Box({
  as: Tag = 'div',
  p, px, py, m, mx, my, w, h,
  children,
  className,
  style,
  ...props
}: BoxProps) {
  return (
    <Tag
      className={className}
      style={{
        padding:        toUnit(p),
        paddingInline:  toUnit(px),
        paddingBlock:   toUnit(py),
        margin:         toUnit(m),
        marginInline:   toUnit(mx),
        marginBlock:    toUnit(my),
        width:  w,
        height: h,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
