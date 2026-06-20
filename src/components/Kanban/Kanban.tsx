'use client';

import React, { useState, ReactNode, DragEvent } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tone?: LuxTone;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanProps extends BaseProps {
  columns: KanbanColumnData[];
  onChange?: (columns: KanbanColumnData[]) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
}

export function Kanban({ columns, onChange, onCardClick, className, style }: KanbanProps) {
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; fromColumn: string } | null>(null);

  const handleDrop = (toColumnId: string) => {
    if (!draggedCard) return;
    if (draggedCard.fromColumn === toColumnId) { setDraggedCard(null); return; }

    const next = columns.map(col => {
      if (col.id === draggedCard.fromColumn) {
        return { ...col, cards: col.cards.filter(c => c.id !== draggedCard.card.id) };
      }
      if (col.id === toColumnId) {
        return { ...col, cards: [...col.cards, draggedCard.card] };
      }
      return col;
    });

    onChange?.(next);
    setDraggedCard(null);
  };

  return (
    <div className={className} style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', ...style }}>
      {columns.map(col => (
        <div
          key={col.id}
          onDragOver={e => e.preventDefault()}
          onDrop={() => handleDrop(col.id)}
          style={{ minWidth: 260, flexShrink: 0, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', padding: '0 0.25rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{col.title}</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.5, background: 'var(--lux-surface-2)', borderRadius: 99, padding: '0.1rem 0.5rem' }}>
              {col.cards.length}
            </span>
          </div>

          <div
            {...{ surface: 'matte', radius: 'lg' } as any}
            style={{ flex: 1, padding: '0.6rem', minHeight: 80, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
          >
            {col.cards.map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={() => setDraggedCard({ card, fromColumn: col.id })}
                onClick={() => onCardClick?.(card, col.id)}
                {...{ surface: 'raised', radius: 'md' } as any}
                style={{ padding: '0.7rem 0.875rem', cursor: 'grab' }}
              >
                {card.tone && (
                  <div style={{ width: 24, height: 4, borderRadius: 99, background: `var(--lux-${card.tone})`, marginBottom: '0.5rem' }} />
                )}
                <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: card.description ? '0.25rem' : 0 }}>{card.title}</div>
                {card.description && <div style={{ fontSize: '0.72rem', opacity: 0.55, lineHeight: 1.4 }}>{card.description}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
