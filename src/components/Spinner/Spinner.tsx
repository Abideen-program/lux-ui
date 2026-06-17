import React, { HTMLAttributes } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  size?: LuxSize;
  tone?: LuxTone;
}

const sizeMap: Record<LuxSize, number> = { xs: 14, sm: 18, md: 24, lg: 32, xl: 44 };

export function Spinner({ size = 'md', tone = 'primary', className, style, ...props }: SpinnerProps) {
  const px = sizeMap[size];
  return (
    <div
      {...{ animate: 'spin' } as any}
      className={className}
      style={{
        display: 'inline-block',
        width: px, height: px,
        border: `${Math.max(2, px * 0.1)}px solid var(--lux-surface-2)`,
        borderTopColor: `var(--lux-${tone})`,
        borderRadius: '50%',
        ...style,
      }}
      {...props}
    />
  );
}
