import React, { HTMLAttributes, MouseEvent } from 'react';
import { LuxTone, LuxSize, LuxVariant, BaseProps, sizeToFontSize } from '../../types';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  /** Color tone */
  tone?: LuxTone;
  /** Visual variant */
  variant?: LuxVariant;
  /** Size */
  size?: LuxSize;
  /** Left icon/emoji */
  icon?: React.ReactNode;
  /** Show delete/close button */
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Clickable chip */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Selected state */
  selected?: boolean;
}

const variantToSurface: Record<LuxVariant, string> = {
  solid:   'solid',
  outline: 'outline',
  ghost:   'ghost',
  soft:    'matte',
};

const sizeStyles: Record<LuxSize, { padding: string; gap: string }> = {
  xs: { padding: '0.1rem 0.4rem', gap: '0.2rem' },
  sm: { padding: '0.15rem 0.5rem', gap: '0.25rem' },
  md: { padding: '0.25rem 0.65rem', gap: '0.3rem' },
  lg: { padding: '0.35rem 0.875rem', gap: '0.35rem' },
  xl: { padding: '0.5rem 1rem', gap: '0.4rem' },
};

export function Chip({
  tone     = 'primary',
  variant  = 'soft',
  size     = 'sm',
  icon,
  onDelete,
  onClick,
  disabled = false,
  selected = false,
  children,
  className,
  style,
  ...props
}: ChipProps) {
  const { padding, gap } = sizeStyles[size];

  return (
    <span
      {...{ surface: variantToSurface[variant], tone, radius: 'full' } as any}
      className={className}
      onClick={disabled ? undefined : onClick}
      style={{
        display:     'inline-flex',
        alignItems:  'center',
        gap,
        padding,
        fontSize:    sizeToFontSize[size],
        fontWeight:  500,
        cursor:      onClick && !disabled ? 'pointer' : 'default',
        opacity:     disabled ? 0.5 : 1,
        outline:     selected ? '2px solid var(--lux-primary)' : undefined,
        outlineOffset: selected ? '1px' : undefined,
        userSelect:  'none',
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.9em' }}>{icon}</span>}
      {children}
      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); if (!disabled) onDelete(e); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', opacity: 0.6, fontSize: '0.85em', color: 'inherit', lineHeight: 1 }}
          aria-label="Remove"
        >
          ✕
        </button>
      )}
    </span>
  );
}
