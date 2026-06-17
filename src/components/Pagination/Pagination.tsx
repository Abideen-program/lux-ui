import React from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

export interface PaginationProps extends BaseProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  count: number;
  /** Page change handler */
  onChange: (page: number) => void;
  /** Color tone */
  tone?: LuxTone;
  /** Size */
  size?: LuxSize;
  /** Number of siblings shown around current page */
  siblings?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
}

function getPageRange(page: number, count: number, siblings: number): (number | '…')[] {
  const range: (number | '…')[] = [];
  const start = Math.max(2, page - siblings);
  const end   = Math.min(count - 1, page + siblings);

  range.push(1);
  if (start > 2) range.push('…');
  for (let i = start; i <= end; i++) range.push(i);
  if (end < count - 1) range.push('…');
  if (count > 1) range.push(count);

  return range;
}

const sizeMap: Record<LuxSize, number> = { xs: 26, sm: 30, md: 34, lg: 40, xl: 46 };

export function Pagination({
  page,
  count,
  onChange,
  tone     = 'primary',
  size     = 'md',
  siblings = 1,
  showFirstLast = false,
  className,
  style,
}: PaginationProps) {
  const px = sizeMap[size];
  const pages = getPageRange(page, count, siblings);

  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    width: px, height: px,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: active ? `var(--lux-${tone})` : 'transparent',
    color: active ? '#fff' : 'var(--lux-fg)',
    fontWeight: 600,
    fontSize: px * 0.4,
    opacity: disabled ? 0.35 : 1,
    flexShrink: 0,
  });

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', ...style }}>
      {showFirstLast && (
        <button onClick={() => onChange(1)} disabled={page === 1} style={btnStyle(false, page === 1)}>«</button>
      )}
      <button onClick={() => onChange(page - 1)} disabled={page === 1} style={btnStyle(false, page === 1)}>‹</button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} style={{ width: px, textAlign: 'center', opacity: 0.4, fontSize: px * 0.4 }}>…</span>
        ) : (
          <button key={p} onClick={() => onChange(p)} style={btnStyle(p === page)}>{p}</button>
        )
      )}

      <button onClick={() => onChange(page + 1)} disabled={page === count} style={btnStyle(false, page === count)}>›</button>
      {showFirstLast && (
        <button onClick={() => onChange(count)} disabled={page === count} style={btnStyle(false, page === count)}>»</button>
      )}
    </div>
  );
}
