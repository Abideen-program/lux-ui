import React, { HTMLAttributes } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Progress value 0-100 */
  value?: number;
  /** Indeterminate/loading animation */
  indeterminate?: boolean;
  /** Color tone */
  tone?: LuxTone;
  /** Show percentage label */
  showLabel?: boolean;
  /** Variant */
  variant?: 'linear' | 'circular';
  /** Size for circular */
  size?: number;
  /** Stroke width for circular */
  strokeWidth?: number;
}

export function Progress({
  value = 0,
  indeterminate = false,
  tone = 'primary',
  showLabel = false,
  variant = 'linear',
  size = 48,
  strokeWidth = 4,
  className,
  style,
  ...props
}: ProgressProps) {
  if (variant === 'circular') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className={className} style={{ position: 'relative', width: size, height: size, display: 'inline-flex', ...style }} {...props}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--lux-surface-2)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={`var(--lux-${tone})`} strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
            strokeLinecap="round"
            style={{ transition: indeterminate ? undefined : 'stroke-dashoffset 0.3s' }}
            {...(indeterminate ? { animate: 'spin' } as any : {})}
          />
        </svg>
        {showLabel && !indeterminate && (
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.22, fontWeight: 700 }}>
            {Math.round(value)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={className} style={{ width: '100%', ...style }} {...props}>
      <div
        {...{ progress: 'true', tone } as any}
        style={{ height: 8, borderRadius: 99, overflow: 'hidden', background: 'var(--lux-surface-2)' }}
      >
        <div
          {...{ 'progress-bar': 'true' } as any}
          style={{
            height: '100%',
            width: indeterminate ? '40%' : `${value}%`,
            background: `var(--lux-${tone})`,
            borderRadius: 99,
            transition: indeterminate ? undefined : 'width 0.3s',
            ...(indeterminate ? { animation: 'lux-progress-indeterminate 1.4s ease-in-out infinite' } : {}),
          }}
        />
      </div>
      {showLabel && !indeterminate && (
        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.3rem', textAlign: 'right' }}>{Math.round(value)}%</div>
      )}
      {indeterminate && (
        <style>{`
          @keyframes lux-progress-indeterminate {
            0% { margin-left: -40%; }
            100% { margin-left: 100%; }
          }
        `}</style>
      )}
    </div>
  );
}
