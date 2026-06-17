import React, { useState, useRef, useEffect } from 'react';
import { BaseProps } from '../../types';
import { MenuItemData } from '../Menu/Menu';

export interface MenubarMenu {
  label: string;
  items: MenuItemData[];
}

export interface MenubarProps extends BaseProps {
  menus: MenubarMenu[];
}

export function Menubar({ menus, className, style }: MenubarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ display: 'flex', position: 'relative', ...style }}>
      {menus.map((menu, i) => (
        <div key={menu.label} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              padding: '0.5rem 0.875rem',
              background: openIndex === i ? 'var(--lux-surface-1)' : 'none',
              border: 'none', borderRadius: 6,
              fontSize: '0.85rem', fontWeight: 500,
              cursor: 'pointer', color: 'inherit',
            }}
          >
            {menu.label}
          </button>
          {openIndex === i && (
            <div
              {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
              style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, minWidth: 180, padding: '0.4rem', zIndex: 100 }}
            >
              {menu.items.map((item, j) =>
                item.divider ? (
                  <div key={j} style={{ height: 1, background: 'var(--lux-border)', margin: '0.4rem 0' }} />
                ) : (
                  <button
                    key={j}
                    onClick={() => { if (!item.disabled) { item.onClick?.(); setOpenIndex(null); } }}
                    disabled={item.disabled}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%',
                      padding: '0.5rem 0.7rem', background: 'none', border: 'none', borderRadius: 6,
                      fontSize: '0.85rem', fontWeight: 500, textAlign: 'left',
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      opacity: item.disabled ? 0.4 : 1,
                      color: item.danger ? 'var(--lux-danger)' : 'inherit',
                    }}
                    onMouseEnter={e => !item.disabled && (e.currentTarget.style.background = 'var(--lux-surface-1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    {item.icon}{item.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
