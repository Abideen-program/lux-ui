import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LuxRadius, BaseProps } from '../../types';
import { Backdrop } from '../Backdrop';

export interface ModalProps extends BaseProps {
  /** Whether the modal is open */
  open: boolean;
  /** Close handler — called on backdrop click or Escape key */
  onClose?: () => void;
  /** Modal title */
  title?: React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  /** Max width */
  maxWidth?: number | string;
  /** Border radius */
  radius?: LuxRadius;
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Show the close (✕) button */
  showCloseButton?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  footer,
  maxWidth = 480,
  radius   = 'xl',
  closeOnBackdropClick = true,
  closeOnEscape         = true,
  showCloseButton       = true,
  children,
  className,
  style,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closeOnEscape, onClose]);

  if (typeof document === 'undefined' || !open) return null;

  return createPortal(
    <Backdrop
      open={open}
      onClick={() => closeOnBackdropClick && onClose?.()}
      style={{ alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
    >
      <div
        ref={ref}
        {...{ surface: 'matte', radius, elevation: 'float' } as any}
        className={className}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth, maxHeight: '85vh', overflowY: 'auto', ...style }}
      >
        {(title || showCloseButton) && (
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.25rem 1.25rem 0' }}>
            {title && <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{title}</div>}
            {showCloseButton && (
              <button
                onClick={() => onClose?.()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5, padding: '0.25rem', marginLeft: 'auto', color: 'inherit', lineHeight: 1 }}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div style={{ padding: '1.25rem' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', padding: '0 1.25rem 1.25rem' }}>
            {footer}
          </div>
        )}
      </div>
    </Backdrop>,
    document.body
  );
}
