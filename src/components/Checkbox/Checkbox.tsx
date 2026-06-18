'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

// ── Checkbox ──────────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, BaseProps {
  label?: string;
  hint?: string;
  size?: LuxSize;
  tone?: LuxTone;
  indeterminate?: boolean;
}

const checkSizeMap: Record<LuxSize, number> = { xs: 14, sm: 16, md: 18, lg: 22, xl: 26 };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  hint,
  size  = 'md',
  tone  = 'primary',
  indeterminate,
  disabled,
  checked,
  className,
  style,
  onChange,
  ...props
}, ref) => {
  const sz = checkSizeMap[size];

  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate || false;
    }
  }, [indeterminate, ref]);

  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0.5rem', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, userSelect: 'none' }}>
      <div style={{ position: 'relative', flexShrink: 0, marginTop: '0.1rem' }}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: sz, height: sz, margin: 0, cursor: 'pointer' }}
          {...props}
        />
        <div style={{
          width: sz, height: sz, borderRadius: 4,
          border: `2px solid ${checked ? `var(--lux-${tone})` : 'var(--lux-border)'}`,
          background: checked ? `var(--lux-${tone})` : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
          flexShrink: 0,
        }}>
          {checked && <span style={{ color: '#fff', fontSize: sz * 0.65, lineHeight: 1, fontWeight: 700 }}>✓</span>}
          {indeterminate && !checked && <span style={{ color: `var(--lux-${tone})`, fontSize: sz * 0.65, lineHeight: 1, fontWeight: 700 }}>—</span>}
        </div>
      </div>
      {(label || hint) && (
        <div>
          {label && <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</div>}
          {hint  && <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.1rem' }}>{hint}</div>}
        </div>
      )}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

// ── Radio ─────────────────────────────────────────────────────

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends BaseProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  size?: LuxSize;
  tone?: LuxTone;
  direction?: 'vertical' | 'horizontal';
  label?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  size      = 'md',
  tone      = 'primary',
  direction = 'vertical',
  label,
  style,
  className,
}: RadioGroupProps) {
  const sz = checkSizeMap[size];

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', ...style }}>
      {label && <div style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.25rem' }}>{label}</div>}
      <div style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', gap: direction === 'horizontal' ? '1.25rem' : '0.5rem', flexWrap: 'wrap' }}>
        {options.map(opt => (
          <label
            key={opt.value}
            style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0.5rem', cursor: opt.disabled ? 'not-allowed' : 'pointer', opacity: opt.disabled ? 0.5 : 1, userSelect: 'none' }}
          >
            <div style={{ position: 'relative', flexShrink: 0, marginTop: '0.1rem' }}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                disabled={opt.disabled}
                onChange={() => onChange?.(opt.value)}
                style={{ position: 'absolute', opacity: 0, width: sz, height: sz, margin: 0, cursor: 'pointer' }}
              />
              <div style={{
                width: sz, height: sz, borderRadius: '50%',
                border: `2px solid ${value === opt.value ? `var(--lux-${tone})` : 'var(--lux-border)'}`,
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {value === opt.value && (
                  <div style={{ width: sz * 0.45, height: sz * 0.45, borderRadius: '50%', background: `var(--lux-${tone})`, transition: 'all 0.15s' }} />
                )}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{opt.label}</div>
              {opt.hint && <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.1rem' }}>{opt.hint}</div>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
