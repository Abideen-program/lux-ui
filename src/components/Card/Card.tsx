import React, { HTMLAttributes } from 'react';
import { LuxTone, LuxRadius, LuxSize, BaseProps, sizeToDensity } from '../../types';

export type CardVariant = 'default' | 'glass' | 'neon' | 'aurora' | 'matte' | 'raised' | 'outline';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Visual variant */
  variant?: CardVariant;
  /** Color tone */
  tone?: LuxTone;
  /** Border radius */
  radius?: LuxRadius;
  /** Padding size */
  size?: LuxSize;
  /** Hover motion effect */
  hoverable?: boolean;
  /** Glow effect */
  glow?: boolean;
  /** Elevation shadow */
  elevation?: 'none' | 'xs' | 'low' | 'mid' | 'high' | 'float';
}

const variantToSurface: Record<CardVariant, string> = {
  default: 'matte',
  glass:   'glass',
  neon:    'neon',
  aurora:  'aurora',
  matte:   'matte',
  raised:  'raised',
  outline: 'outline',
};

export function Card({
  variant   = 'default',
  tone,
  radius    = 'xl',
  size      = 'md',
  hoverable = false,
  glow      = false,
  elevation = 'low',
  children,
  className,
  style,
  ...props
}: CardProps) {
  return (
    <div
      {...{
        surface:   variantToSurface[variant],
        radius,
        density:   sizeToDensity[size],
        elevation,
        ...(tone      ? { tone }          : {}),
        ...(hoverable ? { motion: 'subtle' } : {}),
        ...(glow      ? { glow: 'sm' }    : {}),
      } as any}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Card sub-components ───────────────────────────────────────

export interface CardHeaderProps extends BaseProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, children, style }: CardHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', ...style }}>
      <div>
        {title && <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: subtitle ? '0.2rem' : 0 }}>{title}</div>}
        {subtitle && <div style={{ fontSize: '0.8rem', opacity: 0.55 }}>{subtitle}</div>}
        {children}
      </div>
      {action && <div style={{ flexShrink: 0, marginLeft: '1rem' }}>{action}</div>}
    </div>
  );
}

export function CardBody({ children, style, className }: BaseProps & { style?: React.CSSProperties; className?: string }) {
  return <div className={className} style={style}>{children}</div>;
}

export function CardFooter({ children, style, className }: BaseProps & { style?: React.CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--lux-border)', ...style }}
    >
      {children}
    </div>
  );
}

// Convenience exports
export const GlassCard = (props: Omit<CardProps, 'variant'>) => <Card variant="glass" {...props} />;
export const NeonCard  = (props: Omit<CardProps, 'variant'>) => <Card variant="neon"  {...props} />;
export const AuroraCard = (props: Omit<CardProps, 'variant'>) => <Card variant="aurora" {...props} />;
