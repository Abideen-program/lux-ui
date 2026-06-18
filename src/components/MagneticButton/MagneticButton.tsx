'use client';

import React, { useRef, MouseEvent } from 'react';
import { ButtonProps } from '../Button/Button.types';
import { sizeToDensity, sizeToFontSize } from '../../types';

export interface MagneticButtonProps extends ButtonProps {
  /** How strongly the button follows the cursor (0-1) */
  strength?: number;
}

const variantToSurface = { solid: 'solid', outline: 'outline', ghost: 'ghost', soft: 'matte' };

export function MagneticButton({
  variant   = 'solid',
  tone      = 'primary',
  size      = 'md',
  radius    = 'full',
  strength  = 0.4,
  children,
  disabled,
  className,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
    onMouseMove?.(e);
  };

  const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
    onMouseLeave?.(e);
  };

  return (
    <button
      ref={ref}
      {...{ surface: variantToSurface[variant], tone, radius, density: sizeToDensity[size], ripple: 'true' } as any}
      disabled={disabled}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        fontSize: sizeToFontSize[size],
        transition: 'transform 0.15s ease-out',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
