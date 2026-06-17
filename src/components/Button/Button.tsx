import React from 'react';
import { ButtonProps } from './Button.types';
import { sizeToDensity, sizeToFontSize } from '../../types';

const variantToSurface = {
  solid:   'solid',
  outline: 'outline',
  ghost:   'ghost',
  soft:    'matte',
};

export function Button({
  variant  = 'solid',
  tone     = 'primary',
  size     = 'md',
  radius   = 'full',
  loading  = false,
  ripple   = true,
  magnetic = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  disabled,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...{ surface: variantToSurface[variant], tone, radius, density: sizeToDensity[size] } as any}
      {...(ripple && !disabled && !loading ? { ripple: 'true' } : {})}
      {...(magnetic ? { magnetic: 'true' } : {})}
      disabled={disabled || loading}
      className={className}
      style={{
        fontSize: sizeToFontSize[size],
        width: fullWidth ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span {...{ animate: 'spin' } as any} style={{ display: 'inline-block', fontSize: '1em' }}>↻</span>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
