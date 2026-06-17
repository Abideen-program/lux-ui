import React, { ReactNode, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement>, BaseProps {
  items: BreadcrumbItem[];
  /** Separator between items */
  separator?: ReactNode;
  /** Max items before collapsing with "..." */
  maxItems?: number;
}

export function Breadcrumbs({
  items,
  separator = '/',
  maxItems,
  className,
  style,
  ...props
}: BreadcrumbsProps) {
  let displayItems = items;
  let collapsed = false;

  if (maxItems && items.length > maxItems) {
    collapsed = true;
    displayItems = [items[0], ...items.slice(-(maxItems - 1))];
  }

  return (
    <nav className={className} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.85rem', ...style }} {...props}>
      {displayItems.map((item, i) => {
        const isLast = i === displayItems.length - 1;
        const showEllipsisAfter = collapsed && i === 0;

        return (
          <React.Fragment key={i}>
            {item.href || item.onClick ? (
              <a
                href={item.href}
                onClick={item.onClick}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  color: isLast ? 'var(--lux-fg)' : 'var(--lux-primary)',
                  fontWeight: isLast ? 600 : 500,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  opacity: isLast ? 1 : 0.85,
                }}
              >
                {item.icon}{item.label}
              </a>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: isLast ? 600 : 500, opacity: isLast ? 1 : 0.65 }}>
                {item.icon}{item.label}
              </span>
            )}
            {!isLast && <span style={{ opacity: 0.35 }}>{separator}</span>}
            {showEllipsisAfter && (
              <>
                <span style={{ opacity: 0.4 }}>…</span>
                <span style={{ opacity: 0.35 }}>{separator}</span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
