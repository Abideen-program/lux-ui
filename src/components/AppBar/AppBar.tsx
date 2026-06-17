import React, { ReactNode, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface AppBarProps extends HTMLAttributes<HTMLElement>, BaseProps {
  /** Content on the left (logo, title) */
  left?: ReactNode;
  /** Content on the right (actions, avatar) */
  right?: ReactNode;
  /** Center content (search, nav) */
  center?: ReactNode;
  /** Sticky positioning */
  sticky?: boolean;
  /** Visual variant */
  variant?: 'solid' | 'glass' | 'transparent';
  /** Height in px */
  height?: number;
}

const variantToSurface = { solid: 'solid', glass: 'glass', transparent: undefined };

export function AppBar({
  left,
  right,
  center,
  sticky = false,
  variant = 'glass',
  height = 64,
  children,
  className,
  style,
  ...props
}: AppBarProps) {
  return (
    <header
      {...(variantToSurface[variant] ? { surface: variantToSurface[variant] } as any : {})}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height,
        padding: '0 1.5rem',
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 100 : undefined,
        borderBottom: variant !== 'transparent' ? '1px solid var(--lux-border)' : undefined,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexShrink: 0 }}>{left}</div>
      {center && <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{center}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0, marginLeft: center ? 0 : 'auto' }}>{right}</div>
      {children}
    </header>
  );
}
