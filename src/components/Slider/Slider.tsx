'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface SliderProps extends BaseProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Min value */
  min?: number;
  /** Max value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Color tone */
  tone?: LuxTone;
  /** Show current value label */
  showValue?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Label */
  label?: string;
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  tone = 'primary',
  showValue = false,
  disabled = false,
  label,
  className,
  style,
}: SliderProps) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlledValue ?? internal;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const percent = ((value - min) / (max - min)) * 100;

  const setFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.min(max, Math.max(min, stepped));
    setInternal(clamped);
    onChange?.(clamped);
  }, [min, max, step, onChange]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) setFromClientX(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [setFromClientX]);

  return (
    <div className={className} style={{ width: '100%', ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          {label && <span style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.8 }}>{label}</span>}
          {showValue && <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{value}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        onMouseDown={e => { if (!disabled) { dragging.current = true; setFromClientX(e.clientX); } }}
        style={{
          position: 'relative',
          height: 6,
          borderRadius: 99,
          background: 'var(--lux-surface-2)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${percent}%`, borderRadius: 99, background: `var(--lux-${tone})` }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percent}%`,
            transform: 'translate(-50%, -50%)',
            width: 18, height: 18,
            borderRadius: '50%',
            background: '#fff',
            border: `3px solid var(--lux-${tone})`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            cursor: disabled ? 'not-allowed' : 'grab',
          }}
        />
      </div>
    </div>
  );
}
