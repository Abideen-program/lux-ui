import React, { ReactNode } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  value: string;
  badge?: number;
}

export interface BottomNavigationProps extends BaseProps {
  items: BottomNavItem[];
  value: string;
  onChange: (value: string) => void;
  tone?: LuxTone;
}

export function BottomNavigation({ items, value, onChange, tone = 'primary', className, style }: BottomNavigationProps) {
  return (
    <nav
      {...{ surface: 'matte', elevation: 'float' } as any}
      className={className}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex',
        height: 60,
        borderTop: '1px solid var(--lux-border)',
        zIndex: 100,
        ...style,
      }}
    >
      {items.map(item => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
              background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
              color: active ? `var(--lux-${tone})` : 'var(--lux-fg)',
              opacity: active ? 1 : 0.55,
            }}
          >
            <span style={{ fontSize: '1.2rem', position: 'relative' }}>
              {item.icon}
              {item.badge ? (
                <span style={{ position: 'absolute', top: -4, right: -8, background: 'var(--lux-danger)', color: '#fff', borderRadius: 99, fontSize: '0.6rem', fontWeight: 700, padding: '0.05em 0.4em', minWidth: 14 }}>
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
