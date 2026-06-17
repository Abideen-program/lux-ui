import React, { MouseEvent } from 'react';
import { ButtonProps } from '../Button/Button.types';
import { sizeToDensity, sizeToFontSize } from '../../types';

declare global {
  interface Window {
    Lux?: {
      confetti: (opts?: { count?: number; duration?: number; origin?: { x: number; y: number } }) => void;
      [key: string]: any;
    };
  }
}

export interface ConfettiButtonProps extends ButtonProps {
  /** Number of confetti particles */
  count?: number;
  /** Called after confetti fires */
  onConfetti?: () => void;
}

const variantToSurface = { solid: 'solid', outline: 'outline', ghost: 'ghost', soft: 'matte' };

export function ConfettiButton({
  variant  = 'solid',
  tone     = 'primary',
  size     = 'md',
  radius   = 'full',
  count    = 80,
  children,
  disabled,
  className,
  style,
  onClick,
  onConfetti,
  ...props
}: ConfettiButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && typeof window !== 'undefined' && window.Lux?.confetti) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.Lux.confetti({
        count,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      });
      onConfetti?.();
    }
    onClick?.(e);
  };

  return (
    <button
      {...{ surface: variantToSurface[variant], tone, radius, density: sizeToDensity[size], ripple: 'true' } as any}
      disabled={disabled}
      className={className}
      onClick={handleClick}
      style={{ fontSize: sizeToFontSize[size], cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
