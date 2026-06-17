import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface BackdropProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Whether the backdrop is visible */
  open?: boolean;
  /** Blur amount in px */
  blur?: number;
  /** Background opacity 0-1 */
  opacity?: number;
  /** Click handler — typically closes the overlay */
  onClick?: () => void;
  /** z-index */
  zIndex?: number;
}

export function Backdrop({
  open = true,
  blur = 4,
  opacity = 0.55,
  onClick,
  zIndex = 1000,
  children,
  className,
  style,
  ...props
}: BackdropProps) {
  if (!open) return null;

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: `rgba(0,0,0,${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        zIndex,
        display: 'flex',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
