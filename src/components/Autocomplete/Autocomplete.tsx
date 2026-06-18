'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps extends BaseProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  size?: LuxSize;
  fullWidth?: boolean;
  noOptionsText?: string;
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string }> = {
  xs: { fontSize: '0.75rem',  padding: '0.3rem 0.6rem'    },
  sm: { fontSize: '0.8rem',   padding: '0.4rem 0.75rem'   },
  md: { fontSize: '0.875rem', padding: '0.5rem 0.875rem'  },
  lg: { fontSize: '1rem',     padding: '0.625rem 1rem'    },
  xl: { fontSize: '1.125rem', padding: '0.75rem 1.125rem' },
};

export function Autocomplete({
  options,
  value = '',
  onChange,
  placeholder = 'Search…',
  label,
  size = 'md',
  fullWidth = false,
  noOptionsText = 'No options',
  className,
  style,
}: AutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
  const { fontSize, padding } = sizeStyles[size];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectOption = (opt: AutocompleteOption) => {
    setQuery(opt.label);
    onChange?.(opt.value);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); setOpen(true); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && filtered[highlighted]) { e.preventDefault(); selectOption(filtered[highlighted]); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', width: fullWidth ? '100%' : undefined, ...style }}>
      {label && <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.3rem' }}>{label}</label>}
      <input
        {...{ input: 'true' } as any}
        value={query}
        placeholder={placeholder}
        onChange={e => { setQuery(e.target.value); setOpen(true); setHighlighted(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        style={{ fontSize, padding, width: fullWidth ? '100%' : undefined }}
      />
      {open && (
        <div
          {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
          style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, maxHeight: 240, overflowY: 'auto', zIndex: 50, padding: '0.4rem' }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '0.6rem', fontSize: '0.82rem', opacity: 0.5, textAlign: 'center' }}>{noOptionsText}</div>
          ) : (
            filtered.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setHighlighted(i)}
                style={{
                  padding: '0.5rem 0.7rem',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  background: i === highlighted ? 'var(--lux-surface-1)' : 'transparent',
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
