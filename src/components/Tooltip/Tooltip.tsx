'use client';

import React, { ReactNode, useState, cloneElement, isValidElement } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text content */
  content: ReactNode;
  /** Element that triggers the tooltip on hover */
  children: ReactNode;
  /** Placement relative to the trigger */
  placement?: TooltipPlacement;
  /** Delay before showing, in ms */
  delay?: number;
}

export function Tooltip({ content, children, placement = 'top', delay = 150 }: TooltipProps) {
  if (!isValidElement(children)) return <>{children}</>;

  const luxPos: Record<TooltipPlacement, string> = {
    top: 'top', bottom: 'bottom', left: 'left', right: 'right',
  };

  return cloneElement(children as React.ReactElement, {
    tooltip: typeof content === 'string' ? content : undefined,
    'tooltip-pos': luxPos[placement],
    ...(typeof content !== 'string' ? { title: undefined } : {}),
  } as any);
}
