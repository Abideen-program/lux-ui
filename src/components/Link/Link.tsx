import React, { AnchorHTMLAttributes } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseProps {
  /** Color tone */
  tone?: LuxTone;
  /** Underline behaviour */
  underline?: 'always' | 'hover' | 'none';
  /** Render with external link icon */
  external?: boolean;
}

export function Link({
  tone = 'primary',
  underline = 'hover',
  external = false,
  children,
  className,
  style,
  target,
  rel,
  ...props
}: LinkProps) {
  return (
    <a
      className={className}
      target={external ? '_blank' : target}
      rel={external ? 'noopener noreferrer' : rel}
      style={{
        color: `var(--lux-${tone})`,
        fontWeight: 500,
        textDecoration: underline === 'always' ? 'underline' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25em',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={e => { if (underline === 'hover') e.currentTarget.style.textDecoration = 'underline'; }}
      onMouseLeave={e => { if (underline === 'hover') e.currentTarget.style.textDecoration = 'none'; }}
      {...props}
    >
      {children}
      {external && <span style={{ fontSize: '0.75em' }}>↗</span>}
    </a>
  );
}
