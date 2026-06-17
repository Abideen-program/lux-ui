import { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode, CSSProperties } from 'react';

// ── Core Types ────────────────────────────────────────────────

export type LuxTone =
  | 'primary' | 'danger' | 'success'
  | 'warning' | 'info' | 'accent' | 'neutral';

export type LuxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type LuxRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type LuxSurface =
  | 'solid' | 'matte' | 'glass' | 'frosted'
  | 'ghost' | 'neon' | 'outline' | 'raised'
  | 'ink' | 'aurora' | 'mesh';

export type LuxVariant = 'solid' | 'outline' | 'ghost' | 'soft';

// ── Shared Props ──────────────────────────────────────────────

export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ToneProps {
  /** Color tone */
  tone?: LuxTone;
}

export interface SizeProps {
  /** Component size */
  size?: LuxSize;
}

export interface RadiusProps {
  /** Border radius */
  radius?: LuxRadius;
}

export interface DisabledProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

export interface LoadingProps {
  /** Whether the component is in a loading state */
  loading?: boolean;
}

// ── Size → Lux density map ────────────────────────────────────

export const sizeToDensity: Record<LuxSize, string> = {
  xs: 'compact',
  sm: 'compact',
  md: 'default',
  lg: 'spacious',
  xl: 'loose',
};

// ── Size → font size map ──────────────────────────────────────

export const sizeToFontSize: Record<LuxSize, string> = {
  xs: '0.7rem',
  sm: '0.8rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.125rem',
};

// ── Size → icon size map ──────────────────────────────────────

export const sizeToIconSize: Record<LuxSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
};
