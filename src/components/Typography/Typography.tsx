import React, { HTMLAttributes, ElementType } from 'react';
import { BaseProps } from '../../types';

export type TypographyVariant =
  | 'hero' | 'display' | 'h1' | 'h2' | 'h3' | 'h4'
  | 'lead' | 'body' | 'caption' | 'label' | 'overline' | 'code';

export type TypographyGradient =
  | 'electric' | 'sunset' | 'ocean' | 'fire' | 'aurora'
  | 'neon' | 'gold' | 'candy';

export interface TypographyProps extends HTMLAttributes<HTMLElement>, BaseProps {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Render as different HTML element */
  as?: ElementType;
  /** Text gradient */
  gradient?: TypographyGradient;
  /** Truncate after N lines */
  truncate?: number;
  /** Text balance */
  balance?: boolean;
  /** Fluid scaling */
  fluid?: boolean;
  /** Font weight */
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Muted/dimmed text */
  muted?: boolean;
}

const variantToLux: Record<TypographyVariant, string> = {
  hero:      'hero',
  display:   'display',
  h1:        'heading',
  h2:        'heading',
  h3:        'subheading',
  h4:        'subheading',
  lead:      'lead',
  body:      'body',
  caption:   'caption',
  label:     'label',
  overline:  'overline',
  code:      'code',
};

const variantToTag: Record<TypographyVariant, ElementType> = {
  hero:     'h1',
  display:  'h1',
  h1:       'h1',
  h2:       'h2',
  h3:       'h3',
  h4:       'h4',
  lead:     'p',
  body:     'p',
  caption:  'span',
  label:    'span',
  overline: 'span',
  code:     'code',
};

export function Typography({
  variant  = 'body',
  as,
  gradient,
  truncate,
  balance  = false,
  fluid    = false,
  weight,
  align,
  muted    = false,
  children,
  className,
  style,
  ...props
}: TypographyProps) {
  const Tag = as || variantToTag[variant];

  return (
    <Tag
      {...{
        text: variantToLux[variant],
        ...(gradient ? { 'text-gradient': gradient }  : {}),
        ...(truncate  ? { truncate: String(truncate) } : {}),
        ...(balance   ? { balance: 'true' }            : {}),
        ...(fluid     ? { fluid: 'md' }                : {}),
        ...(weight    ? { weight }                     : {}),
        ...(align     ? { 'text-align': align }        : {}),
      } as any}
      className={className}
      style={{ opacity: muted ? 0.55 : undefined, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Convenience exports
export const H1       = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="h1"      {...p} />;
export const H2       = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="h2"      {...p} />;
export const H3       = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="h3"      {...p} />;
export const H4       = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="h4"      {...p} />;
export const Lead     = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="lead"    {...p} />;
export const Body     = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="body"    {...p} />;
export const Caption  = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="caption" {...p} />;
export const Label    = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="label"   {...p} />;
export const Code     = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="code"    {...p} />;
export const Overline = (p: Omit<TypographyProps, 'variant'>) => <Typography variant="overline"{...p} />;
