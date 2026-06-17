import React, { ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface ImageListItemData {
  src: string;
  alt?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export interface ImageListProps extends BaseProps {
  items: ImageListItemData[];
  /** Number of columns */
  cols?: number;
  /** Gap between items */
  gap?: number;
  /** Aspect ratio for each image */
  aspectRatio?: string;
  /** Variant — standard or masonry-style quilted */
  variant?: 'standard' | 'masonry';
  /** Click handler */
  onItemClick?: (item: ImageListItemData, index: number) => void;
}

export function ImageList({
  items,
  cols = 3,
  gap = 8,
  aspectRatio = '1 / 1',
  variant = 'standard',
  onItemClick,
  className,
  style,
}: ImageListProps) {
  if (variant === 'masonry') {
    return (
      <div
        className={className}
        style={{ columnCount: cols, columnGap: gap, ...style }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onItemClick?.(item, i)}
            style={{ marginBottom: gap, borderRadius: 10, overflow: 'hidden', cursor: onItemClick ? 'pointer' : 'default', breakInside: 'avoid' }}
          >
            <img src={item.src} alt={item.alt} style={{ width: '100%', display: 'block' }} />
            {(item.title || item.subtitle) && (
              <div style={{ padding: '0.5rem 0.1rem' }}>
                {item.title && <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.title}</div>}
                {item.subtitle && <div style={{ fontSize: '0.72rem', opacity: 0.55 }}>{item.subtitle}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => onItemClick?.(item, i)}
          style={{ cursor: onItemClick ? 'pointer' : 'default' }}
        >
          <div style={{ aspectRatio, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
            <img src={item.src} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {(item.title || item.subtitle) && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.6rem 0.7rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff' }}>
                {item.title && <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.title}</div>}
                {item.subtitle && <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>{item.subtitle}</div>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
