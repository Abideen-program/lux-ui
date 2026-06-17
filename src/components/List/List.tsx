import React, { ReactNode, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

// ── List (root) ───────────────────────────────────────────────

export interface ListProps extends HTMLAttributes<HTMLUListElement>, BaseProps {
  /** Show dividers between items */
  divided?: boolean;
  /** Compact spacing */
  dense?: boolean;
}

export function List({ divided = false, dense = false, children, className, style, ...props }: ListProps) {
  return (
    <ul
      className={className}
      style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', ...style }}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <>
          {child}
          {divided && i < React.Children.count(children) - 1 && (
            <div style={{ height: 1, background: 'var(--lux-border)' }} />
          )}
        </>
      ))}
    </ul>
  );
}

// ── ListItem ──────────────────────────────────────────────────

export interface ListItemProps extends HTMLAttributes<HTMLLIElement>, BaseProps {
  /** Leading content (icon, avatar) */
  leading?: ReactNode;
  /** Trailing content (icon, badge, action) */
  trailing?: ReactNode;
  /** Primary text */
  primary?: ReactNode;
  /** Secondary text */
  secondary?: ReactNode;
  /** Clickable row */
  onClick?: () => void;
  /** Selected/active state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Compact spacing */
  dense?: boolean;
}

export function ListItem({
  leading,
  trailing,
  primary,
  secondary,
  onClick,
  selected = false,
  disabled = false,
  dense = false,
  children,
  className,
  style,
  ...props
}: ListItemProps) {
  return (
    <li
      className={className}
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: dense ? '0.5rem 0.75rem' : '0.75rem 1rem',
        cursor: onClick && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        background: selected ? 'var(--lux-surface-1)' : 'transparent',
        borderRadius: 8,
        transition: 'background 0.15s',
        ...style,
      }}
      {...props}
    >
      {leading && <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{leading}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {primary && <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{primary}</div>}
        {secondary && <div style={{ fontSize: '0.78rem', opacity: 0.55, marginTop: '0.1rem' }}>{secondary}</div>}
        {children}
      </div>
      {trailing && <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{trailing}</div>}
    </li>
  );
}
