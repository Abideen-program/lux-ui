'use client';

import React, { useState, useRef } from 'react';
import { BaseProps } from '../../types';

export interface CodeEditorProps extends BaseProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  placeholder?: string;
  readOnly?: boolean;
  height?: number | string;
  showLineNumbers?: boolean;
  fontSize?: number;
}

export function CodeEditor({
  value,
  onChange,
  language = 'text',
  placeholder = '',
  readOnly = false,
  height = 280,
  showLineNumbers = true,
  fontSize = 13,
  className,
  style,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const lines = value.split('\n').length;

  const syncScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.slice(0, start) + '  ' + value.slice(end);
      onChange?.(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div
      className={className}
      {...{ surface: 'matte', radius: 'lg' } as any}
      style={{ overflow: 'hidden', ...style }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.875rem', borderBottom: '1px solid var(--lux-border)' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 }}>{language}</span>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.5 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.5 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', opacity: 0.5 }} />
        </div>
      </div>

      <div style={{ display: 'flex', height, fontFamily: 'monospace', fontSize }}>
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            style={{
              padding: '0.875rem 0.6rem', textAlign: 'right', userSelect: 'none', opacity: 0.3,
              overflow: 'hidden', lineHeight: 1.6, flexShrink: 0, minWidth: 36,
            }}
          >
            {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          style={{
            flex: 1, border: 'none', outline: 'none', resize: 'none',
            background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit',
            padding: '0.875rem 0.875rem 0.875rem 0', lineHeight: 1.6, tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
