'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '../../types';
import { Backdrop } from '../Backdrop';

export interface DrawerProps extends BaseProps {
  open: boolean;
  onClose?: () => void;
  /** Which edge the drawer slides from */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** Width (for left/right) or height (for top/bottom) */
  size?: number | string;
  title?: ReactNode;
  showCloseButton?: boolean;
}

export function Drawer({
  open,
  onClose,
  placement = 'right',
  size = 320,
  title,
  showCloseButton = true,
  children,
  className,
  style,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const isHorizontal = placement === 'left' || placement === 'right';
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, bottom: 0, left: 0, right: 0,
  };

  if (placement === 'left')   { positionStyle.right = 'auto'; positionStyle.width = sizeValue; }
  if (placement === 'right')  { positionStyle.left  = 'auto'; positionStyle.width = sizeValue; }
  if (placement === 'top')    { positionStyle.bottom= 'auto'; positionStyle.height = sizeValue; }
  if (placement === 'bottom') { positionStyle.top   = 'auto'; positionStyle.height = sizeValue; }

  const translateClosed: Record<string, string> = {
    left: 'translateX(-100%)', right: 'translateX(100%)',
    top: 'translateY(-100%)', bottom: 'translateY(100%)',
  };

  return createPortal(
    <>
      <Backdrop open={open} onClick={() => onClose?.()} style={{ pointerEvents: open ? 'auto' : 'none', opacity: open ? 1 : 0, transition: 'opacity 0.25s' }} />
      <div
        {...{ surface: 'matte', elevation: 'float' } as any}
        className={className}
        style={{
          ...positionStyle,
          zIndex: 1001,
          transform: open ? 'translate(0,0)' : translateClosed[placement],
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          ...style,
        }}
      >
        {(title || showCloseButton) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid var(--lux-border)', flexShrink: 0 }}>
            {title && <div style={{ fontWeight: 600, fontSize: '1rem' }}>{title}</div>}
            {showCloseButton && (
              <button
                onClick={() => onClose?.()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5, marginLeft: 'auto', color: 'inherit' }}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div style={{ padding: '1.25rem', flex: 1 }}>{children}</div>
      </div>
    </>,
    document.body
  );
}
