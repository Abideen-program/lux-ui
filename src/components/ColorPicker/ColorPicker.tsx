import React, { useState, useRef, useEffect } from 'react';
import { BaseProps } from '../../types';

export interface ColorPickerProps extends BaseProps {
  value?: string;
  onChange?: (color: string) => void;
  /** Preset swatches shown above the native picker */
  presets?: string[];
  label?: string;
}

const defaultPresets = [
  '#6366f1', '#f472b6', '#38bdf8', '#22c55e',
  '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6',
];

export function ColorPicker({
  value = '#6366f1',
  onChange,
  presets = defaultPresets,
  label,
  className,
  style,
}: ColorPickerProps) {
  const [color, setColor] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (next: string) => {
    setColor(next);
    onChange?.(next);
  };

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      {label && <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.3rem' }}>{label}</label>}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.4rem 0.7rem', borderRadius: 8,
          border: '1px solid var(--lux-border)', background: 'var(--lux-surface-1)',
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 22, height: 22, borderRadius: 6, background: color, border: '1px solid rgba(255,255,255,0.15)' }} />
        <span style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{color}</span>
      </button>

      {open && (
        <div
          {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
          style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, padding: '0.875rem', zIndex: 50, width: 220 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.875rem' }}>
            {presets.map(p => (
              <button
                key={p}
                onClick={() => handleChange(p)}
                style={{
                  width: '100%', height: 32, borderRadius: 8, background: p,
                  border: color === p ? '2px solid var(--lux-fg)' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={e => handleChange(e.target.value)}
            style={{ width: '100%', height: 36, border: 'none', borderRadius: 8, cursor: 'pointer' }}
          />
        </div>
      )}
    </div>
  );
}
