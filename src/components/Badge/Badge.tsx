import React, { HTMLAttributes } from 'react';
import { LuxTone, LuxSize, BaseProps, sizeToFontSize } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  /** Color tone */
  tone?: LuxTone;
  /** Badge variant */
  variant?: 'default' | 'dot' | 'counter' | 'pill';
  /** Size */
  size?: LuxSize;
  /** Content — for counter variant */
  count?: number;
}

export function Badge({
  tone    = 'primary',
  variant = 'default',
  size    = 'md',
  count,
  children,
  className,
  style,
  ...props
}: BadgeProps) {
  return (
    <span
      {...{ badge: variant === 'default' ? 'true' : variant, tone } as any}
      className={className}
      style={{ fontSize: sizeToFontSize[size], ...style }}
      {...props}
    >
      {variant === 'counter' ? count : children}
    </span>
  );
}
