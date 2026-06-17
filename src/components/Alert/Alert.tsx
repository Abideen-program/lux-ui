import React, { HTMLAttributes } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
  tone?: LuxTone;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  variant?: 'solid' | 'soft' | 'outline';
}

const defaultIcons: Record<LuxTone, string> = {
  primary: 'ℹ', danger: '✕', success: '✓', warning: '⚠',
  info: 'ℹ', accent: '★', neutral: '•',
};

const variantToSurface = { solid: 'solid', soft: 'matte', outline: 'outline' };

export function Alert({
  tone    = 'info',
  title,
  icon,
  onClose,
  variant = 'soft',
  children,
  className,
  style,
  ...props
}: AlertProps) {
  return (
    <div
      {...{ surface: variantToSurface[variant], tone, radius: 'lg' } as any}
      className={className}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.875rem 1rem', ...style }}
      {...props}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.4 }}>{icon || defaultIcons[tone]}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: children ? '0.2rem' : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{children}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.6, fontSize: '0.9rem', flexShrink: 0, color: 'inherit', lineHeight: 1 }}
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
}
