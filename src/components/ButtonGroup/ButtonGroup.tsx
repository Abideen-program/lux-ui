import React, { Children, cloneElement, isValidElement, HTMLAttributes } from 'react';
import { LuxTone, LuxVariant, BaseProps } from '../../types';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Applies to all child Buttons unless overridden */
  variant?: LuxVariant;
  tone?: LuxTone;
}

export function ButtonGroup({
  orientation = 'horizontal',
  variant,
  tone,
  children,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const items = Children.toArray(children);
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        borderRadius: 999,
        overflow: 'hidden',
        border: '1px solid var(--lux-border)',
        ...style,
      }}
      {...props}
    >
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        const isFirst = i === 0;
        const isLast  = i === items.length - 1;

        return cloneElement(child as React.ReactElement, {
          ...(variant ? { variant } : {}),
          ...(tone ? { tone } : {}),
          radius: 'none',
          style: {
            ...(child.props as any).style,
            borderRight: isHorizontal && !isLast ? '1px solid var(--lux-border)' : undefined,
            borderBottom: !isHorizontal && !isLast ? '1px solid var(--lux-border)' : undefined,
          },
        });
      })}
    </div>
  );
}
