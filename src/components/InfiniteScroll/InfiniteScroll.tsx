'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface InfiniteScrollProps extends BaseProps {
  /** Called when the sentinel enters the viewport — load more data here */
  onLoadMore: () => void;
  /** Whether more data is available */
  hasMore: boolean;
  /** Whether a load is currently in progress */
  loading?: boolean;
  /** Custom loading indicator */
  loader?: ReactNode;
  /** Custom end-of-list message */
  endMessage?: ReactNode;
  /** Root margin for the intersection observer — how far before the end to trigger */
  threshold?: string;
}

export function InfiniteScroll({
  onLoadMore,
  hasMore,
  loading = false,
  loader,
  endMessage,
  threshold = '200px',
  children,
  className,
  style,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onLoadMoreRef.current();
      },
      { rootMargin: threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, threshold]);

  return (
    <div className={className} style={style}>
      {children}

      {hasMore ? (
        <div ref={sentinelRef} style={{ display: 'flex', justifyContent: 'center', padding: '1.25rem' }}>
          {loading && (loader || (
            <div {...{ animate: 'spin' } as any} style={{ width: 22, height: 22, border: '2px solid var(--lux-surface-2)', borderTopColor: 'var(--lux-primary)', borderRadius: '50%' }} />
          ))}
        </div>
      ) : (
        endMessage && <div style={{ textAlign: 'center', padding: '1.25rem', fontSize: '0.8rem', opacity: 0.5 }}>{endMessage}</div>
      )}
    </div>
  );
}
