'use client';

import React, { useState, ReactNode, createContext, useContext } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

// ── Context ───────────────────────────────────────────────────

interface TabsContextType {
  value: string;
  setValue: (v: string) => void;
  tone: LuxTone;
  size: LuxSize;
  variant: 'line' | 'pill' | 'enclosed';
}

const TabsContext = createContext<TabsContextType | null>(null);

// ── Tabs (root) ───────────────────────────────────────────────

export interface TabsProps extends BaseProps {
  /** Controlled active tab value */
  value?: string;
  /** Default tab value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Color tone */
  tone?: LuxTone;
  /** Size */
  size?: LuxSize;
  /** Visual variant */
  variant?: 'line' | 'pill' | 'enclosed';
}

export function Tabs({
  value: controlledValue,
  defaultValue,
  onChange,
  tone    = 'primary',
  size    = 'md',
  variant = 'line',
  children,
  className,
  style,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue || '');
  const value = controlledValue ?? internal;
  const setValue = (v: string) => { setInternal(v); onChange?.(v); };

  return (
    <TabsContext.Provider value={{ value, setValue, tone, size, variant }}>
      <div className={className} style={style}>{children}</div>
    </TabsContext.Provider>
  );
}

// ── TabList ───────────────────────────────────────────────────

export function TabList({ children, style }: BaseProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: ctx.variant === 'pill' ? '0.4rem' : 0,
        borderBottom: ctx.variant === 'line' ? '1px solid var(--lux-border)' : undefined,
        background: ctx.variant === 'enclosed' ? 'var(--lux-surface-2)' : undefined,
        borderRadius: ctx.variant === 'enclosed' ? 10 : undefined,
        padding: ctx.variant === 'enclosed' ? '0.25rem' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────

export interface TabProps extends BaseProps {
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const sizeFontMap: Record<LuxSize, string> = { xs: '0.75rem', sm: '0.8rem', md: '0.875rem', lg: '0.95rem', xl: '1.05rem' };

export function Tab({ value, icon, disabled, children, style }: TabProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const active = ctx.value === value;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: ctx.variant === 'pill' ? '0.45rem 1rem' : '0.6rem 1rem',
    fontSize: sizeFontMap[ctx.size],
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    border: 'none',
    background: 'none',
    color: active ? `var(--lux-${ctx.tone})` : 'var(--lux-fg)',
    position: 'relative',
    transition: 'all 0.15s',
  };

  if (ctx.variant === 'line') {
    baseStyle.opacity = disabled ? 0.4 : active ? 1 : 0.55;
    baseStyle.borderBottom = active ? `2px solid var(--lux-${ctx.tone})` : '2px solid transparent';
    baseStyle.marginBottom = '-1px';
  }
  if (ctx.variant === 'pill') {
    baseStyle.borderRadius = 99;
    baseStyle.background = active ? `var(--lux-${ctx.tone})` : 'var(--lux-surface-2)';
    baseStyle.color = active ? '#fff' : 'var(--lux-fg)';
    baseStyle.opacity = disabled ? 0.4 : active ? 1 : 0.65;
  }
  if (ctx.variant === 'enclosed') {
    baseStyle.borderRadius = 8;
    baseStyle.background = active ? 'var(--lux-bg)' : 'transparent';
    baseStyle.boxShadow = active ? 'var(--lux-shadow-sm)' : undefined;
    baseStyle.opacity = disabled ? 0.4 : active ? 1 : 0.6;
  }

  return (
    <button
      onClick={() => !disabled && ctx.setValue(value)}
      disabled={disabled}
      style={{ ...baseStyle, ...style }}
    >
      {icon}
      {children}
    </button>
  );
}

// ── TabPanel ──────────────────────────────────────────────────

export interface TabPanelProps extends BaseProps {
  value: string;
}

export function TabPanel({ value, children, style, className }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;
  return <div className={className} style={style}>{children}</div>;
}
