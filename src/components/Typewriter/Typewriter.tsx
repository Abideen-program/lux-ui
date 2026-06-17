import React, { useState, useEffect, ElementType, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';

export interface TypewriterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'>, BaseProps {
  /** Text(s) to type — array cycles through each */
  text: string | string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before deleting (when cycling), in ms */
  pauseDuration?: number;
  /** Deleting speed in ms per character */
  deleteSpeed?: number;
  /** Loop through the text array */
  loop?: boolean;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Render as a different element */
  as?: ElementType;
}

export function Typewriter({
  text,
  speed = 60,
  pauseDuration = 1500,
  deleteSpeed = 30,
  loop = true,
  cursor = true,
  as: Tag = 'span',
  className,
  style,
  ...props
}: TypewriterProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
    } else if (!deleting && displayed.length === current.length) {
      if (texts.length > 1 && loop) {
        timeout = setTimeout(() => setDeleting(true), pauseDuration);
      }
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIndex, texts, speed, deleteSpeed, pauseDuration, loop]);

  return (
    <Tag className={className} style={style} {...props}>
      {displayed}
      {cursor && <span style={{ display: 'inline-block', width: '2px', marginLeft: '2px', background: 'currentColor', animation: 'lux-tw-blink 1s step-end infinite' }}>&nbsp;</span>}
      {cursor && <style>{`@keyframes lux-tw-blink { 0%,50% { opacity: 1; } 50.01%,100% { opacity: 0; } }`}</style>}
    </Tag>
  );
}
