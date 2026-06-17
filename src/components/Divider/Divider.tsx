import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface DividerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Label in the middle */
  label?: React.ReactNode;
  /** Style variant */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Thickness */
  thickness?: number;
  /** Color */
  color?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  variant     = 'solid',
  thickness   = 1,
  color,
  className,
  style,
  ...props
}: DividerProps) {
  const borderColor = color || 'var(--lux-border)';

  if (orientation === 'vertical') {
    return (
      <div
        className={className}
        style={{
          display:      'inline-block',
          width:        thickness,
          height:       '100%',
          minHeight:    '1em',
          background:   borderColor,
          flexShrink:   0,
          ...style,
        }}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', ...style }}
        {...props}
      >
        <div style={{ flex: 1, height: thickness, background: borderColor, borderStyle: variant }} />
        <span style={{ fontSize: '0.78rem', opacity: 0.5, whiteSpace: 'nowrap', fontWeight: 500 }}>{label}</span>
        <div style={{ flex: 1, height: thickness, background: borderColor }} />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        width:        '100%',
        height:       thickness,
        background:   borderColor,
        borderStyle:  variant !== 'solid' ? variant : undefined,
        flexShrink:   0,
        ...style,
      }}
      {...props}
    />
  );
}
