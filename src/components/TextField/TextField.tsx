'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

export type TextFieldState = 'default' | 'error' | 'success' | 'warning' | 'disabled';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
  /** Field label */
  label?: string;
  /** Helper/hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** State */
  state?: TextFieldState;
  /** Size */
  size?: LuxSize;
  /** Left addon (icon or text) */
  leftAddon?: React.ReactNode;
  /** Right addon (icon or text) */
  rightAddon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Tone */
  tone?: LuxTone;
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string }> = {
  xs: { fontSize: '0.75rem', padding: '0.3rem 0.6rem' },
  sm: { fontSize: '0.8rem',  padding: '0.4rem 0.75rem' },
  md: { fontSize: '0.875rem',padding: '0.5rem 0.875rem' },
  lg: { fontSize: '1rem',    padding: '0.625rem 1rem' },
  xl: { fontSize: '1.125rem',padding: '0.75rem 1.125rem' },
};

const stateToLux: Record<TextFieldState, string | undefined> = {
  default:  undefined,
  error:    'error',
  success:  'success',
  warning:  'warning',
  disabled: 'disabled',
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  hint,
  error,
  state    = 'default',
  size     = 'md',
  leftAddon,
  rightAddon,
  fullWidth = false,
  tone,
  className,
  style,
  disabled,
  ...props
}, ref) => {
  const resolvedState = disabled ? 'disabled' : error ? 'error' : state;
  const { fontSize, padding } = sizeStyles[size];

  return (
    <div
      {...{ field: 'true', ...(stateToLux[resolvedState] ? { state: stateToLux[resolvedState] } : {}) } as any}
      style={{ width: fullWidth ? '100%' : undefined, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
    >
      {label && (
        <label style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.8 }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftAddon && (
          <span style={{ position: 'absolute', left: '0.75rem', display: 'flex', alignItems: 'center', opacity: 0.5, fontSize, pointerEvents: 'none' }}>
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          {...{ input: 'true' } as any}
          disabled={disabled || resolvedState === 'disabled'}
          className={className}
          style={{
            fontSize,
            padding,
            paddingLeft: leftAddon  ? '2.25rem' : padding,
            paddingRight: rightAddon ? '2.25rem' : padding,
            width: fullWidth ? '100%' : undefined,
            ...style,
          }}
          {...props}
        />
        {rightAddon && (
          <span style={{ position: 'absolute', right: '0.75rem', display: 'flex', alignItems: 'center', opacity: 0.5, fontSize }}>
            {rightAddon}
          </span>
        )}
      </div>
      {(hint || error) && (
        <span {...{ hint: 'true' } as any} style={{ fontSize: '0.75rem', color: error ? 'var(--lux-danger)' : undefined }}>
          {error || hint}
        </span>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
