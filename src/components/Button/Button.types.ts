import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LuxTone, LuxSize, LuxRadius, LuxVariant, BaseProps } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  /** Visual style variant */
  variant?: LuxVariant;
  /** Color tone */
  tone?: LuxTone;
  /** Size of the button */
  size?: LuxSize;
  /** Border radius */
  radius?: LuxRadius;
  /** Show loading spinner */
  loading?: boolean;
  /** Ripple effect on click */
  ripple?: boolean;
  /** Magnetic hover effect */
  magnetic?: boolean;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}
