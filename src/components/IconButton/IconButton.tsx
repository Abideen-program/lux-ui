import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { LuxTone, LuxSize, LuxRadius, LuxVariant, BaseProps } from '../../types';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  icon: ReactNode;
  variant?: LuxVariant;
  tone?: LuxTone;
  size?: LuxSize;
  radius?: LuxRadius;
  ripple?: boolean;
  /** Accessible label — required since there's no visible text */
  'aria-label': string;
}

const variantToSurface: Record<LuxVariant, string> = { solid: 'solid', outline: 'outline', ghost: 'ghost', soft: 'matte' };
const sizePx: Record<LuxSize, number> = { xs: 26, sm: 30, md: 36, lg: 44, xl: 52 };
const sizeFont: Record<LuxSize, string> = { xs: '0.75rem', sm: '0.85rem', md: '1rem', lg: '1.2rem', xl: '1.4rem' };

export function IconButton({
  icon,
  variant = 'ghost',
  tone    = 'neutral',
  size    = 'md',
  radius  = 'full',
  ripple  = true,
  disabled,
  className,
  style,
  ...props
}: IconButtonProps) {
  const px = sizePx[size];

  return (
    <button
      {...{ surface: variantToSurface[variant], tone, radius } as any}
      {...(ripple && !disabled ? { ripple: 'true' } : {})}
      disabled={disabled}
      className={className}
      style={{
        width: px, height: px,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: sizeFont[size],
        padding: 0,
        flexShrink: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...props}
    >
      {icon}
    </button>
  );
}
