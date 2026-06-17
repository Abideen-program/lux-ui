import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Max width breakpoint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Disable horizontal padding */
  disableGutters?: boolean;
}

const maxWidthMap = { sm: 600, md: 900, lg: 1200, xl: 1536, full: '100%' };

export function Container({
  maxWidth = 'lg',
  disableGutters = false,
  children,
  className,
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: maxWidthMap[maxWidth],
        marginInline: 'auto',
        paddingInline: disableGutters ? 0 : '1.5rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
