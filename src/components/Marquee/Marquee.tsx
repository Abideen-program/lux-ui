import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Speed in seconds for one full loop */
  speed?: number;
  /** Direction */
  direction?: 'left' | 'right';
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Gap between repeated content */
  gap?: number;
}

export function Marquee({
  speed = 20,
  direction = 'left',
  pauseOnHover = true,
  gap = 32,
  children,
  className,
  style,
  ...props
}: MarqueeProps) {
  const animName = direction === 'left' ? 'lux-marquee-left' : 'lux-marquee-right';

  return (
    <div
      className={className}
      style={{ display: 'flex', overflow: 'hidden', width: '100%', ...style }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          gap,
          animation: `${animName} ${speed}s linear infinite`,
          paddingRight: gap,
        }}
        onMouseEnter={e => { if (pauseOnHover) e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={e => { if (pauseOnHover) e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {children}
      </div>
      <div
        aria-hidden
        style={{
          display: 'flex',
          flexShrink: 0,
          gap,
          animation: `${animName} ${speed}s linear infinite`,
          paddingRight: gap,
        }}
        onMouseEnter={e => { if (pauseOnHover) e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={e => { if (pauseOnHover) e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {children}
      </div>
      <style>{`
        @keyframes lux-marquee-left  { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes lux-marquee-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
