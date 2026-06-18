'use client';

import React, { useState, useRef, useEffect, ReactNode, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { LuxRadius, BaseProps } from '../../types';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps extends BaseProps {
  /** Trigger element — popover positions relative to this */
  trigger: ReactNode;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Controlled open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Open on hover instead of click */
  triggerOn?: 'click' | 'hover';
  /** Border radius */
  radius?: LuxRadius;
  /** Gap between trigger and popover in px */
  offset?: number;
}

export function Popover({
  trigger,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  triggerOn = 'click',
  radius = 'lg',
  offset = 8,
  children,
  className,
  style,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = (v: boolean) => { setInternalOpen(v); onOpenChange?.(v); };

  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const positions: Record<PopoverPlacement, { top: number; left: number }> = {
      top:    { top: rect.top - offset,    left: rect.left + rect.width / 2 },
      bottom: { top: rect.bottom + offset, left: rect.left + rect.width / 2 },
      left:   { top: rect.top + rect.height / 2, left: rect.left - offset },
      right:  { top: rect.top + rect.height / 2, left: rect.right + offset },
    };
    setCoords(positions[placement]);
  }, [isOpen, placement, offset]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen || triggerOn !== 'click') return;
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, triggerOn]);

  const transformMap: Record<PopoverPlacement, string> = {
    top:    'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left:   'translate(-100%, -50%)',
    right:  'translate(0, -50%)',
  };

  const triggerHandlers = triggerOn === 'click'
    ? { onClick: () => setOpen(!isOpen) }
    : { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) };

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-block' }} {...triggerHandlers}>
        {trigger}
      </div>
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          {...{ surface: 'matte', radius, elevation: 'float' } as any}
          className={className}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: transformMap[placement],
            zIndex: 1100,
            minWidth: 160,
            ...style,
          }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}
