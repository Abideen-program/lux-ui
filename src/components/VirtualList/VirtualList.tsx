'use client';

import React, { useState, useRef, ReactNode, UIEvent } from 'react';
import { BaseProps } from '../../types';

export interface VirtualListProps<T = any> extends BaseProps {
  items: T[];
  /** Fixed height of each row in px */
  itemHeight: number;
  /** Visible container height in px */
  height: number;
  renderItem: (item: T, index: number) => ReactNode;
  /** Extra rows rendered above/below the visible window */
  overscan?: number;
}

export function VirtualList<T = any>({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = 5,
  className,
  style,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(height / itemHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onScroll={handleScroll}
      style={{ height, overflowY: 'auto', position: 'relative', ...style }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => {
          const actualIndex = startIndex + i;
          return (
            <div
              key={actualIndex}
              style={{ position: 'absolute', top: actualIndex * itemHeight, left: 0, right: 0, height: itemHeight }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
