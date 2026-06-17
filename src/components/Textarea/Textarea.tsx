import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, BaseProps {
  label?: string;
  hint?: string;
  error?: string;
  size?: LuxSize;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string; minHeight: string }> = {
  xs: { fontSize: '0.75rem',  padding: '0.4rem 0.6rem',   minHeight: '4rem'  },
  sm: { fontSize: '0.8rem',   padding: '0.5rem 0.75rem',  minHeight: '5rem'  },
  md: { fontSize: '0.875rem', padding: '0.6rem 0.875rem', minHeight: '6rem'  },
  lg: { fontSize: '1rem',     padding: '0.75rem 1rem',    minHeight: '8rem'  },
  xl: { fontSize: '1.125rem', padding: '0.875rem 1.125rem',minHeight: '10rem' },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  hint,
  error,
  size      = 'md',
  fullWidth = false,
  resize    = 'vertical',
  className,
  style,
  disabled,
  ...props
}, ref) => {
  const { fontSize, padding, minHeight } = sizeStyles[size];

  return (
    <div
      {...{ field: 'true', ...(error ? { state: 'error' } : {}), ...(disabled ? { state: 'disabled' } : {}) } as any}
      style={{ width: fullWidth ? '100%' : undefined, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
    >
      {label && <label style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.8 }}>{label}</label>}
      <textarea
        ref={ref}
        {...{ input: 'textarea' } as any}
        disabled={disabled}
        className={className}
        style={{ fontSize, padding, minHeight, resize, width: fullWidth ? '100%' : undefined, ...style }}
        {...props}
      />
      {(hint || error) && (
        <span {...{ hint: 'true' } as any} style={{ fontSize: '0.75rem', color: error ? 'var(--lux-danger)' : undefined }}>
          {error || hint}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
