import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  variant   = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...props
}: SkeletonProps) {
  const radiusMap = { text: 4, circular: '50%', rectangular: 0, rounded: 8 };

  return (
    <div
      className={className}
      style={{
        width:  width  ?? (variant === 'circular' ? 40 : '100%'),
        height: height ?? (variant === 'text' ? '1em' : variant === 'circular' ? 40 : 100),
        borderRadius: radiusMap[variant],
        background: 'var(--lux-surface-2)',
        ...(animation === 'pulse' ? { animation: 'lux-skeleton-pulse 1.5s ease-in-out infinite' } : {}),
        ...(animation === 'wave'  ? {
            background: 'linear-gradient(90deg, var(--lux-surface-2) 25%, var(--lux-surface-1) 50%, var(--lux-surface-2) 75%)',
            backgroundSize: '200% 100%',
            animation: 'lux-skeleton-wave 1.5s ease-in-out infinite',
          } : {}),
        ...style,
      }}
      {...props}
    >
      <style>{`
        @keyframes lux-skeleton-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes lux-skeleton-wave  { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}
