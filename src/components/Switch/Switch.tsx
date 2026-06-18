'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, BaseProps {
  label?: string;
  hint?: string;
  size?: LuxSize;
  tone?: LuxTone;
}

const trackSizeMap: Record<LuxSize, { w: number; h: number; thumb: number }> = {
  xs: { w: 32, h: 18, thumb: 14 },
  sm: { w: 38, h: 21, thumb: 17 },
  md: { w: 44, h: 24, thumb: 18 },
  lg: { w: 52, h: 28, thumb: 22 },
  xl: { w: 60, h: 32, thumb: 26 },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  hint,
  size  = 'md',
  tone  = 'primary',
  checked,
  disabled,
  onChange,
  className,
  style,
  ...props
}, ref) => {
  const { w, h, thumb } = trackSizeMap[size];
  const pad = (h - thumb) / 2;

  return (
    <label className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, userSelect: 'none', ...style }}>
      <div style={{ position: 'relative', width: w, height: h, flexShrink: 0 }}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: w, height: h, margin: 0, cursor: 'pointer' }}
          {...props}
        />
        <div style={{
          width: w, height: h, borderRadius: 99,
          background: checked ? `var(--lux-${tone})` : 'var(--lux-surface-2)',
          transition: 'background 0.2s',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: pad, left: checked ? w - thumb - pad : pad,
            width: thumb, height: thumb, borderRadius: '50%',
            background: '#fff', transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </div>
      </div>
      {(label || hint) && (
        <div>
          {label && <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</div>}
          {hint  && <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{hint}</div>}
        </div>
      )}
    </label>
  );
});

Switch.displayName = 'Switch';
