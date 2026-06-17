import React, { useState, ReactNode } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface SpeedDialAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface SpeedDialProps extends BaseProps {
  /** Main FAB icon */
  icon: ReactNode;
  /** Icon shown when open (defaults to ✕) */
  openIcon?: ReactNode;
  actions: SpeedDialAction[];
  tone?: LuxTone;
  /** Direction actions expand */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const positionStyles: Record<string, React.CSSProperties> = {
  'bottom-right': { bottom: 24, right: 24 },
  'bottom-left':  { bottom: 24, left: 24 },
  'top-right':    { top: 24, right: 24 },
  'top-left':     { top: 24, left: 24 },
};

export function SpeedDial({
  icon,
  openIcon = '✕',
  actions,
  tone = 'primary',
  direction = 'up',
  position = 'bottom-right',
  className,
  style,
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  const isVertical = direction === 'up' || direction === 'down';

  return (
    <div
      className={className}
      style={{ position: 'fixed', zIndex: 200, display: 'flex', flexDirection: isVertical ? 'column' : 'row', alignItems: 'center', gap: '0.75rem', ...positionStyles[position], ...style }}
    >
      {open && (
        <div style={{ display: 'flex', flexDirection: direction === 'up' ? 'column-reverse' : direction === 'down' ? 'column' : direction === 'left' ? 'row-reverse' : 'row', gap: '0.6rem' }}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => { action.onClick(); setOpen(false); }}
              title={action.label}
              {...{ surface: 'matte', radius: 'full', elevation: 'mid' } as any}
              style={{
                width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', border: 'none', cursor: 'pointer',
                animation: `lux-sd-in 0.15s ease-out ${i * 0.03}s backwards`,
              }}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        {...{ surface: 'solid', tone, radius: 'full' } as any}
        style={{
          width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', border: 'none', cursor: 'pointer',
          transform: open ? 'rotate(135deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}
      >
        {open ? openIcon : icon}
      </button>
      <style>{`@keyframes lux-sd-in { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}
