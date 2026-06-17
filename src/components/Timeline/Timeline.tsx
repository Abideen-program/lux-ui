import React, { ReactNode } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface TimelineItemData {
  title: ReactNode;
  description?: ReactNode;
  time?: ReactNode;
  icon?: ReactNode;
  tone?: LuxTone;
}

export interface TimelineProps extends BaseProps {
  items: TimelineItemData[];
  /** Default tone for items without their own tone */
  tone?: LuxTone;
}

export function Timeline({ items, tone = 'primary', className, style }: TimelineProps) {
  return (
    <div className={className} style={style}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const itemTone = item.tone || tone;

        return (
          <div key={i} style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `var(--lux-${itemTone})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.9rem', flexShrink: 0,
              }}>
                {item.icon || '•'}
              </div>
              {!isLast && <div style={{ width: 2, flex: 1, background: 'var(--lux-border)', minHeight: 24 }} />}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : '1.5rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                {item.time && <div style={{ fontSize: '0.72rem', opacity: 0.5, flexShrink: 0 }}>{item.time}</div>}
              </div>
              {item.description && (
                <div style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: '0.25rem', lineHeight: 1.5 }}>{item.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
