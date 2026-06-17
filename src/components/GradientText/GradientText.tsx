import React, { ElementType, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export type GradientPreset =
  | 'electric' | 'sunset' | 'ocean' | 'fire' | 'aurora'
  | 'neon' | 'gold' | 'candy';

export interface GradientTextProps extends HTMLAttributes<HTMLElement>, BaseProps {
  /** Preset gradient */
  gradient?: GradientPreset;
  /** Custom gradient (CSS gradient string) — overrides preset */
  customGradient?: string;
  /** Render as a different element */
  as?: ElementType;
  /** Animate the gradient */
  animated?: boolean;
  /** Font weight */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
}

export function GradientText({
  gradient = 'electric',
  customGradient,
  as: Tag = 'span',
  animated = false,
  weight = 'bold',
  children,
  className,
  style,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      {...{
        'text-gradient': customGradient ? undefined : gradient,
        weight,
        ...(animated ? { 'gradient-animate': 'true' } : {}),
      } as any}
      className={className}
      style={{
        ...(customGradient ? {
          backgroundImage: customGradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
