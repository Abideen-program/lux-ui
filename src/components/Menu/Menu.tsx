import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps, LuxRadius } from '../../types';

export interface MenuItemData {
  label: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface MenuProps extends BaseProps {
  /** Trigger element */
  trigger: ReactNode;
  /** Menu items */
  items: MenuItemData[];
  /** Placement */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Border radius */
  radius?: LuxRadius;
  /** Min width */
  minWidth?: number;
}

export function Menu({
  trigger,
  items,
  placement = 'bottom-start',
  radius = 'lg',
  minWidth = 180,
  className,
  style,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const isTop = placement.startsWith('top');
    const isEnd = placement.endsWith('end');
    setCoords({
      top:  isTop ? rect.top - 8 : rect.bottom + 8,
      left: isEnd ? rect.right : rect.left,
    });
  }, [open, placement]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isTop = placement.startsWith('top');
  const isEnd = placement.endsWith('end');

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-block' }} onClick={() => setOpen(o => !o)}>
        {trigger}
      </div>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          {...{ surface: 'matte', radius, elevation: 'float' } as any}
          className={className}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: `${isEnd ? 'translateX(-100%)' : ''} ${isTop ? 'translateY(-100%)' : ''}`.trim(),
            minWidth,
            zIndex: 1100,
            padding: '0.4rem',
            ...style,
          }}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} style={{ height: 1, background: 'var(--lux-border)', margin: '0.4rem 0' }} />
            ) : (
              <button
                key={i}
                onClick={() => { if (!item.disabled) { item.onClick?.(); setOpen(false); } }}
                disabled={item.disabled}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  width: '100%', padding: '0.5rem 0.7rem',
                  background: 'none', border: 'none', borderRadius: 6,
                  fontSize: '0.85rem', fontWeight: 500, textAlign: 'left',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.4 : 1,
                  color: item.danger ? 'var(--lux-danger)' : 'var(--lux-fg)',
                }}
                onMouseEnter={e => !item.disabled && (e.currentTarget.style.background = 'var(--lux-surface-1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}
        </div>,
        document.body
      )}
    </>
  );
}
