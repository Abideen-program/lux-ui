'use client';

import React, { useState, ReactNode, createContext, useContext } from 'react';
import { BaseProps } from '../../types';

// ── Context ───────────────────────────────────────────────────

interface AccordionContextType {
  openItems: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

// ── Accordion (root) ─────────────────────────────────────────

export interface AccordionProps extends BaseProps {
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Default open item id(s) */
  defaultOpen?: string | string[];
}

export function Accordion({ allowMultiple = false, defaultOpen, children, className, style }: AccordionProps) {
  const initial = Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : [];
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(initial));

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        if (allowMultiple) next.delete(id);
        // if not allowMultiple, clicking the open item closes it (next stays empty)
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...style }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ── AccordionItem ────────────────────────────────────────────

export interface AccordionItemProps extends BaseProps {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export function AccordionItem({ id, title, icon, disabled, children, style }: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;
  const open = ctx.openItems.has(id);

  return (
    <div {...{ surface: 'matte', radius: 'lg' } as any} style={{ overflow: 'hidden', ...style }}>
      <button
        onClick={() => !disabled && ctx.toggle(id)}
        disabled={disabled}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          padding: '0.875rem 1.125rem', background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '0.9rem', fontWeight: 600, color: 'inherit', opacity: disabled ? 0.5 : 1, textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>{icon}{title}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', fontSize: '0.75rem', opacity: 0.5 }}>▾</span>
      </button>
      <div style={{
        maxHeight: open ? 1000 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.25s ease, opacity 0.2s ease',
      }}>
        <div style={{ padding: '0 1.125rem 1rem', fontSize: '0.85rem', opacity: 0.75, lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
