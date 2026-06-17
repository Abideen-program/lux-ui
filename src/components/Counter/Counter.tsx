import React, { useState, useEffect, useRef, ElementType, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface CounterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'>, BaseProps {
  /** Target value to count to */
  value: number;
  /** Animation duration in ms */
  duration?: number;
  /** Decimal places */
  decimals?: number;
  /** Prefix (e.g. "$") */
  prefix?: string;
  /** Suffix (e.g. "%", "+") */
  suffix?: string;
  /** Thousands separator */
  separator?: string;
  /** Start animation when element enters viewport */
  triggerOnView?: boolean;
  /** Render as a different element */
  as?: ElementType;
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function Counter({
  value,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  triggerOnView = true,
  as: Tag = 'span',
  className,
  style,
  ...props
}: CounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const animate = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(value * easeOutExpo(progress));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!triggerOnView) { animate(); return; }
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { animate(); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).replace(/,/g, separator);

  return (
    <Tag ref={ref as any} className={className} style={style} {...props}>
      {prefix}{formatted}{suffix}
    </Tag>
  );
}
