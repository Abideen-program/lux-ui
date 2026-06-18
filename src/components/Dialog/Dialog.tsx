'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LuxTone } from '../../types';
import { Backdrop } from '../Backdrop';
import { Button } from '../Button';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  /** Primary action button label */
  confirmLabel?: string;
  /** Secondary action button label */
  cancelLabel?: string;
  /** Called when confirm is clicked */
  onConfirm?: () => void;
  /** Called when cancel is clicked */
  onCancel?: () => void;
  /** Tone for the confirm button — use 'danger' for destructive actions */
  tone?: LuxTone;
  /** Loading state for confirm button */
  loading?: boolean;
  children?: ReactNode;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  onConfirm,
  onCancel,
  tone = 'primary',
  loading = false,
  children,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (typeof document === 'undefined' || !open) return null;

  return createPortal(
    <Backdrop open={open} onClick={() => onClose?.()} style={{ alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div
        {...{ surface: 'matte', radius: 'xl', elevation: 'float' } as any}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 400, padding: '1.5rem' }}
      >
        {title && <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{title}</div>}
        {description && <div style={{ fontSize: '0.875rem', opacity: 0.65, lineHeight: 1.5 }}>{description}</div>}
        {children}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '1.5rem' }}>
          <Button variant="ghost" tone="neutral" size="sm" onClick={() => { onCancel?.(); onClose?.(); }}>
            {cancelLabel}
          </Button>
          <Button variant="solid" tone={tone} size="sm" loading={loading} onClick={() => onConfirm?.()}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Backdrop>,
    document.body
  );
}
