import React, { HTMLAttributes } from 'react';
import { LuxTone, LuxSize, BaseProps } from '../../types';

const sizeMap: Record<LuxSize, number> = {
  xs: 24, sm: 32, md: 40, lg: 48, xl: 64,
};

const fontSizeMap: Record<LuxSize, string> = {
  xs: '0.6rem', sm: '0.75rem', md: '0.875rem', lg: '1rem', xl: '1.25rem',
};

// ── Avatar ────────────────────────────────────────────────────

export interface AvatarProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials when no image */
  initials?: string;
  /** Size */
  size?: LuxSize;
  /** Custom background color */
  color?: string;
  /** Online status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Tone for gradient background */
  tone?: LuxTone;
}

const statusColors = {
  online:  'var(--lux-success)',
  offline: 'var(--lux-border)',
  away:    'var(--lux-warning)',
  busy:    'var(--lux-danger)',
};

export function Avatar({
  src,
  alt,
  initials,
  size    = 'md',
  color,
  status,
  tone,
  className,
  style,
  children,
  ...props
}: AvatarProps) {
  const px = sizeMap[size];

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        width: px,
        height: px,
        borderRadius: '50%',
        overflow: src ? 'hidden' : 'visible',
        background: color || (tone ? `var(--lux-${tone})` : 'linear-gradient(135deg, var(--lux-primary), var(--lux-accent))'),
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSizeMap[size],
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      ) : (
        <span style={{ userSelect: 'none' }}>{initials || children}</span>
      )}

      {/* Status indicator */}
      {status && (
        <span style={{
          position: 'absolute',
          bottom: 1,
          right: 1,
          width: Math.max(8, px * 0.22),
          height: Math.max(8, px * 0.22),
          borderRadius: '50%',
          background: statusColors[status],
          border: '2px solid var(--lux-bg)',
        }} />
      )}
    </div>
  );
}

// ── AvatarGroup ───────────────────────────────────────────────

export interface AvatarGroupProps extends BaseProps {
  /** Maximum avatars to show before +N */
  max?: number;
  /** Size of each avatar */
  size?: LuxSize;
  /** Overlap spacing */
  spacing?: number;
}

export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  spacing,
  style,
  className,
}: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const extra = items.length - max;
  const px = sizeMap[size];
  const overlap = spacing ?? Math.round(px * 0.35);

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', ...style }}
    >
      {visible.map((child, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            zIndex: visible.length - i,
            border: '2px solid var(--lux-bg)',
            borderRadius: '50%',
          }}
        >
          {child}
        </div>
      ))}
      {extra > 0 && (
        <div
          style={{
            marginLeft: -overlap,
            width: px,
            height: px,
            borderRadius: '50%',
            background: 'var(--lux-surface-2)',
            border: '2px solid var(--lux-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: fontSizeMap[size],
            fontWeight: 700,
            color: 'var(--lux-fg)',
            zIndex: 0,
            flexShrink: 0,
          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
