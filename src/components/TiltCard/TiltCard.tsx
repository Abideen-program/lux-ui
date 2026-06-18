'use client';

import React, { useRef, MouseEvent } from 'react';
import { CardProps } from '../Card/Card';
import { sizeToDensity } from '../../types';

export interface TiltCardProps extends CardProps {
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Scale on hover */
  scale?: number;
  /** Glare effect overlay */
  glare?: boolean;
}

const variantToSurface: Record<string, string> = {
  default: 'matte', glass: 'glass', neon: 'neon', aurora: 'aurora', matte: 'matte', raised: 'raised', outline: 'outline',
};

export function TiltCard({
  variant   = 'glass',
  radius    = 'xl',
  size      = 'md',
  maxTilt   = 12,
  scale     = 1.02,
  glare     = true,
  children,
  className,
  style,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      {...{ surface: variantToSurface[variant] || 'glass', radius, density: sizeToDensity[size] } as any}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {glare && (
        <div ref={glareRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.1s', zIndex: 1 }} />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
