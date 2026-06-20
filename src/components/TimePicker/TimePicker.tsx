'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface TimePickerProps extends BaseProps {
  value?: string; // "HH:MM" 24h format
  onChange?: (time: string) => void;
  label?: string;
  size?: LuxSize;
  fullWidth?: boolean;
  /** 12-hour format with AM/PM */
  use12Hour?: boolean;
  /** Minute increment step */
  minuteStep?: number;
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string }> = {
  xs: { fontSize: '0.75rem',  padding: '0.3rem 0.6rem'    },
  sm: { fontSize: '0.8rem',   padding: '0.4rem 0.75rem'   },
  md: { fontSize: '0.875rem', padding: '0.5rem 0.875rem'  },
  lg: { fontSize: '1rem',     padding: '0.625rem 1rem'    },
  xl: { fontSize: '1.125rem', padding: '0.75rem 1.125rem' },
};

function formatDisplay(time: string | undefined, use12Hour: boolean) {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  if (!use12Hour) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export function TimePicker({
  value,
  onChange,
  label,
  size = 'md',
  fullWidth = false,
  use12Hour = true,
  minuteStep = 5,
  className,
  style,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { fontSize, padding } = sizeStyles[size];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const [h, m] = (value || '09:00').split(':').map(Number);

  const hours = use12Hour ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

  const setHour = (newH: number) => {
    let hour24 = newH;
    if (use12Hour) {
      const isPM = h >= 12;
      hour24 = (newH % 12) + (isPM ? 12 : 0);
    }
    onChange?.(`${String(hour24).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  };

  const setMinute = (newM: number) => {
    onChange?.(`${String(h).padStart(2, '0')}:${String(newM).padStart(2, '0')}`);
  };

  const togglePeriod = () => {
    const newH = h >= 12 ? h - 12 : h + 12;
    onChange?.(`${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  };

  const displayHour = use12Hour ? (h % 12 === 0 ? 12 : h % 12) : h;

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', width: fullWidth ? '100%' : undefined, ...style }}>
      {label && <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.3rem' }}>{label}</label>}

      <button
        {...{ input: 'true' } as any}
        onClick={() => setOpen(o => !o)}
        style={{
          fontSize, padding, width: fullWidth ? '100%' : undefined,
          textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
          cursor: 'pointer',
        }}
      >
        <span style={{ opacity: value ? 1 : 0.45 }}>{value ? formatDisplay(value, use12Hour) : 'Select time'}</span>
        <span style={{ opacity: 0.4, fontSize: '0.85em' }}>🕐</span>
      </button>

      {open && (
        <div
          {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
          style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 60, padding: '0.75rem', display: 'flex', gap: '0.5rem' }}
        >
          <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '0.25rem' }}>
            {hours.map(hr => (
              <button
                key={hr}
                onClick={() => setHour(hr)}
                style={{
                  padding: '0.35rem 0.7rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                  background: displayHour === hr ? 'var(--lux-primary)' : 'transparent',
                  color: displayHour === hr ? '#fff' : 'inherit',
                  minWidth: 44,
                }}
              >
                {String(hr).padStart(2, '0')}
              </button>
            ))}
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '0.25rem' }}>
            {minutes.map(min => (
              <button
                key={min}
                onClick={() => setMinute(min)}
                style={{
                  padding: '0.35rem 0.7rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                  background: m === min ? 'var(--lux-primary)' : 'transparent',
                  color: m === min ? '#fff' : 'inherit',
                  minWidth: 44,
                }}
              >
                {String(min).padStart(2, '0')}
              </button>
            ))}
          </div>
          {use12Hour && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {['AM', 'PM'].map(period => (
                <button
                  key={period}
                  onClick={() => { if ((period === 'PM') !== (h >= 12)) togglePeriod(); }}
                  style={{
                    padding: '0.35rem 0.7rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                    background: (period === 'PM') === (h >= 12) ? 'var(--lux-primary)' : 'transparent',
                    color: (period === 'PM') === (h >= 12) ? '#fff' : 'inherit',
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
