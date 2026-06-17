import React, { ReactNode, Children, cloneElement, isValidElement, ButtonHTMLAttributes } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

// ── ToggleButton ──────────────────────────────────────────────

export interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, BaseProps {
  value: string;
  selected?: boolean;
  onToggle?: (value: string) => void;
  tone?: LuxTone;
  size?: LuxSize;
  icon?: ReactNode;
}

const sizeStyles: Record<LuxSize, { padding: string; fontSize: string }> = {
  xs: { padding: '0.3rem 0.6rem',  fontSize: '0.72rem' },
  sm: { padding: '0.4rem 0.75rem', fontSize: '0.78rem' },
  md: { padding: '0.5rem 0.9rem',  fontSize: '0.85rem' },
  lg: { padding: '0.625rem 1.1rem',fontSize: '0.95rem' },
  xl: { padding: '0.75rem 1.3rem', fontSize: '1.05rem' },
};

export function ToggleButton({
  value,
  selected = false,
  onToggle,
  tone = 'primary',
  size = 'md',
  icon,
  children,
  className,
  style,
  disabled,
  ...props
}: ToggleButtonProps) {
  const { padding, fontSize } = sizeStyles[size];

  return (
    <button
      onClick={() => !disabled && onToggle?.(value)}
      disabled={disabled}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding, fontSize,
        fontWeight: 600,
        border: 'none',
        background: selected ? `var(--lux-${tone})` : 'var(--lux-surface-2)',
        color: selected ? '#fff' : 'var(--lux-fg)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s',
        ...style,
      }}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

// ── ToggleButtonGroup ─────────────────────────────────────────

export interface ToggleButtonGroupProps extends BaseProps {
  /** Selected value(s) */
  value: string | string[];
  /** Allow multiple selection */
  multiple?: boolean;
  /** Change handler */
  onChange?: (value: string | string[]) => void;
}

export function ToggleButtonGroup({ value, multiple = false, onChange, children, className, style }: ToggleButtonGroupProps) {
  const selectedValues = Array.isArray(value) ? value : [value];

  const handleToggle = (clicked: string) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [value];
      const next = arr.includes(clicked) ? arr.filter(v => v !== clicked) : [...arr, clicked];
      onChange?.(next);
    } else {
      onChange?.(clicked);
    }
  };

  const items = Children.toArray(children);

  return (
    <div className={className} style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', ...style }}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        const childValue = (child.props as any).value;
        return cloneElement(child as React.ReactElement, {
          selected: selectedValues.includes(childValue),
          onToggle: handleToggle,
        });
      })}
    </div>
  );
}
