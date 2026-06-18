'use client';

import React, { useState } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface RatingProps extends BaseProps {
  /** Current rating value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Max stars */
  max?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Size */
  size?: LuxSize;
  /** Read-only display mode */
  readOnly?: boolean;
  /** Allow half-star precision */
  allowHalf?: boolean;
  /** Custom color */
  color?: string;
}

const sizeMap: Record<LuxSize, number> = { xs: 14, sm: 18, md: 22, lg: 28, xl: 34 };

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  onChange,
  size = 'md',
  readOnly = false,
  allowHalf = false,
  color = 'var(--lux-warning)',
  className,
  style,
}: RatingProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const value = controlledValue ?? internal;
  const displayValue = hover ?? value;
  const px = sizeMap[size];

  const handleClick = (star: number, half: boolean) => {
    if (readOnly) return;
    const newValue = half ? star - 0.5 : star;
    setInternal(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={className} style={{ display: 'inline-flex', gap: '0.2rem', ...style }}>
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = displayValue >= star;
        const halfFilled = allowHalf && displayValue >= star - 0.5 && displayValue < star;

        return (
          <div
            key={i}
            style={{ position: 'relative', width: px, height: px, cursor: readOnly ? 'default' : 'pointer' }}
            onMouseMove={e => {
              if (readOnly) return;
              if (allowHalf) {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeftHalf = e.clientX - rect.left < rect.width / 2;
                setHover(isLeftHalf ? star - 0.5 : star);
              } else {
                setHover(star);
              }
            }}
            onMouseLeave={() => setHover(null)}
            onClick={e => {
              if (readOnly) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const isLeftHalf = allowHalf && e.clientX - rect.left < rect.width / 2;
              handleClick(star, isLeftHalf);
            }}
          >
            <span style={{ position: 'absolute', inset: 0, fontSize: px, lineHeight: 1, color: 'var(--lux-border)' }}>★</span>
            <span style={{
              position: 'absolute', inset: 0, fontSize: px, lineHeight: 1, color,
              clipPath: halfFilled ? 'inset(0 50% 0 0)' : filled ? 'none' : 'inset(0 100% 0 0)',
            }}>★</span>
          </div>
        );
      })}
    </div>
  );
}
