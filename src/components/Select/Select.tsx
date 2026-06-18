'use client';

import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, BaseProps {
  label?: string;
  hint?: string;
  error?: string;
  size?: LuxSize;
  options?: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string }> = {
  xs: { fontSize: '0.75rem',  padding: '0.3rem 0.6rem'    },
  sm: { fontSize: '0.8rem',   padding: '0.4rem 0.75rem'   },
  md: { fontSize: '0.875rem', padding: '0.5rem 0.875rem'  },
  lg: { fontSize: '1rem',     padding: '0.625rem 1rem'    },
  xl: { fontSize: '1.125rem', padding: '0.75rem 1.125rem' },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  hint,
  error,
  size        = 'md',
  options     = [],
  placeholder,
  fullWidth   = false,
  children,
  className,
  style,
  disabled,
  ...props
}, ref) => {
  const { fontSize, padding } = sizeStyles[size];

  return (
    <div
      {...{ field: 'true', ...(error ? { state: 'error' } : {}), ...(disabled ? { state: 'disabled' } : {}) } as any}
      style={{ width: fullWidth ? '100%' : undefined, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
    >
      {label && <label style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.8 }}>{label}</label>}
      <select
        ref={ref}
        {...{ input: 'select' } as any}
        disabled={disabled}
        className={className}
        style={{ fontSize, padding, width: fullWidth ? '100%' : undefined, ...style }}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
        ))}
        {children}
      </select>
      {(hint || error) && (
        <span {...{ hint: 'true' } as any} style={{ fontSize: '0.75rem', color: error ? 'var(--lux-danger)' : undefined }}>
          {error || hint}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
