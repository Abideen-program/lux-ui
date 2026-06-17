import React, { ReactNode } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface StepData {
  label: string;
  description?: string;
  icon?: ReactNode;
}

export interface StepperProps extends BaseProps {
  steps: StepData[];
  /** Current active step (0-indexed) */
  activeStep: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Color tone */
  tone?: LuxTone;
}

export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  tone = 'primary',
  className,
  style,
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', width: '100%', ...style }}
    >
      {steps.map((step, i) => {
        const completed = i < activeStep;
        const active    = i === activeStep;
        const isLast    = i === steps.length - 1;

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: isHorizontal ? 'column' : 'row',
              alignItems: isHorizontal ? 'center' : 'flex-start',
              flex: isHorizontal && !isLast ? 1 : undefined,
              gap: isHorizontal ? 0 : '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: isHorizontal ? '100%' : undefined }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: completed || active ? `var(--lux-${tone})` : 'var(--lux-surface-2)',
                color: completed || active ? '#fff' : 'var(--lux-fg)',
                fontWeight: 700, fontSize: '0.85rem',
                flexShrink: 0,
                opacity: !completed && !active ? 0.5 : 1,
                transition: 'all 0.2s',
              }}>
                {completed ? '✓' : step.icon || (i + 1)}
              </div>
              {!isLast && isHorizontal && (
                <div style={{ flex: 1, height: 2, background: completed ? `var(--lux-${tone})` : 'var(--lux-border)', marginInline: '0.5rem' }} />
              )}
              {!isLast && !isHorizontal && null}
            </div>

            <div style={{
              marginTop: isHorizontal ? '0.5rem' : 0,
              textAlign: isHorizontal ? 'center' : 'left',
              paddingBottom: !isHorizontal && !isLast ? '1.5rem' : 0,
              position: !isHorizontal ? 'relative' : undefined,
            }}>
              {!isHorizontal && !isLast && (
                <div style={{ position: 'absolute', left: -25, top: 32, width: 2, height: 'calc(100% - 20px)', background: completed ? `var(--lux-${tone})` : 'var(--lux-border)' }} />
              )}
              <div style={{ fontWeight: 600, fontSize: '0.85rem', opacity: active || completed ? 1 : 0.5 }}>{step.label}</div>
              {step.description && (
                <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.15rem' }}>{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
