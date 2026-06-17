import React, { HTMLAttributes } from 'react';
import { LuxRadius, BaseProps } from '../../types';

export interface PaperProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Elevation level */
  elevation?: 'none' | 'xs' | 'low' | 'mid' | 'high' | 'float';
  /** Border radius */
  radius?: LuxRadius;
  /** Padding */
  padding?: number | string;
  /** Variant */
  variant?: 'elevation' | 'outline';
}

export function Paper({
  elevation = 'low',
  radius    = 'lg',
  padding   = '1.25rem',
  variant   = 'elevation',
  children,
  className,
  style,
  ...props
}: PaperProps) {
  return (
    <div
      {...{ surface: variant === 'outline' ? 'outline' : 'matte', radius, ...(variant === 'elevation' ? { elevation } : {}) } as any}
      className={className}
      style={{ padding, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
