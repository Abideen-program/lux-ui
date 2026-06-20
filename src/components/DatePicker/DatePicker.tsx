'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LuxSize, BaseProps } from '../../types';

export interface DatePickerProps extends BaseProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  size?: LuxSize;
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  /** First day of week: 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function isSameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(d: Date) {
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const sizeStyles: Record<LuxSize, { fontSize: string; padding: string }> = {
  xs: { fontSize: '0.75rem',  padding: '0.3rem 0.6rem'    },
  sm: { fontSize: '0.8rem',   padding: '0.4rem 0.75rem'   },
  md: { fontSize: '0.875rem', padding: '0.5rem 0.875rem'  },
  lg: { fontSize: '1rem',     padding: '0.625rem 1rem'    },
  xl: { fontSize: '1.125rem', padding: '0.75rem 1.125rem' },
};

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  size = 'md',
  minDate,
  maxDate,
  fullWidth = false,
  weekStartsOn = 0,
  className,
  style,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const { fontSize, padding } = sizeStyles[size];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() - weekStartsOn + 7) % 7;
  const totalDays = daysInMonth(year, month);

  const weekLabels = weekStartsOn === 1
    ? ['Mo','Tu','We','Th','Fr','Sa','Su']
    : ['Su','Mo','Tu','We','Th','Fr','Sa'];

  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: totalDays }, (_, i) => i + 1)];

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const selectDay = (day: number) => {
    const d = new Date(year, month, day);
    onChange?.(d);
    setOpen(false);
  };

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
        <span style={{ opacity: value ? 1 : 0.45 }}>{value ? formatDate(value) : placeholder}</span>
        <span style={{ opacity: 0.4, fontSize: '0.85em' }}>📅</span>
      </button>

      {open && (
        <div
          {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
          style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 60, padding: '0.875rem', width: 280 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <button
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', opacity: 0.6, padding: '0.25rem' }}
            >‹</button>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{MONTHS[month]} {year}</span>
            <button
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', opacity: 0.6, padding: '0.25rem' }}
            >›</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '0.25rem' }}>
            {weekLabels.map(w => (
              <div key={w} style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, opacity: 0.4, padding: '0.3rem 0' }}>{w}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const disabled = isDisabled(day);
              const selected = isSameDay(value, new Date(year, month, day));
              const today = isSameDay(new Date(), new Date(year, month, day));

              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', borderRadius: 6, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                    background: selected ? 'var(--lux-primary)' : 'transparent',
                    color: selected ? '#fff' : 'inherit',
                    opacity: disabled ? 0.3 : 1,
                    fontWeight: today && !selected ? 700 : 400,
                    outline: today && !selected ? '1px solid var(--lux-primary)' : undefined,
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
