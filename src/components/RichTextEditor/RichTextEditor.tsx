'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { BaseProps } from '../../types';

export interface RichTextEditorProps extends BaseProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  height?: number | string;
  readOnly?: boolean;
}

interface ToolbarButtonProps {
  label: string;
  command: string;
  value?: string;
  active?: boolean;
  onClick: (command: string, value?: string) => void;
}

function ToolbarButton({ label, command, value, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(command, value); }}
      style={{
        width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'none', borderRadius: 6, cursor: 'pointer',
        fontSize: '0.82rem', fontWeight: 700, color: 'inherit', opacity: 0.75,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--lux-surface-1)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      title={label}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start writing…',
  height = 240,
  readOnly = false,
  className,
  style,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (editorRef.current && isFirstRender.current) {
      editorRef.current.innerHTML = value;
      isFirstRender.current = false;
    }
  }, [value]);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    onChange?.(editorRef.current?.innerHTML || '');
  }, [onChange]);

  const handleInput = () => {
    onChange?.(editorRef.current?.innerHTML || '');
  };

  return (
    <div
      className={className}
      {...{ surface: 'matte', radius: 'lg' } as any}
      style={{ overflow: 'hidden', ...style }}
    >
      {!readOnly && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', padding: '0.4rem 0.5rem', borderBottom: '1px solid var(--lux-border)', flexWrap: 'wrap' }}>
          <ToolbarButton label="B" command="bold" onClick={exec} />
          <ToolbarButton label="I" command="italic" onClick={exec} />
          <ToolbarButton label="U" command="underline" onClick={exec} />
          <div style={{ width: 1, height: 18, background: 'var(--lux-border)', margin: '0 0.3rem' }} />
          <ToolbarButton label="H1" command="formatBlock" value="H1" onClick={exec} />
          <ToolbarButton label="H2" command="formatBlock" value="H2" onClick={exec} />
          <ToolbarButton label="¶" command="formatBlock" value="P" onClick={exec} />
          <div style={{ width: 1, height: 18, background: 'var(--lux-border)', margin: '0 0.3rem' }} />
          <ToolbarButton label="•" command="insertUnorderedList" onClick={exec} />
          <ToolbarButton label="1." command="insertOrderedList" onClick={exec} />
          <div style={{ width: 1, height: 18, background: 'var(--lux-border)', margin: '0 0.3rem' }} />
          <ToolbarButton label="🔗" command="createLink" onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) exec('createLink', url);
          }} />
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning
        style={{
          height, overflowY: 'auto', padding: '1rem 1.125rem', outline: 'none',
          fontSize: '0.9rem', lineHeight: 1.65,
        }}
      />

      <style>{`
        [contenteditable]:empty::before {
          content: attr(data-placeholder);
          opacity: 0.4;
          pointer-events: none;
        }
        [contenteditable] h1 { font-size: 1.5em; font-weight: 700; margin: 0.5em 0; }
        [contenteditable] h2 { font-size: 1.25em; font-weight: 700; margin: 0.5em 0; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 1.5em; margin: 0.5em 0; }
        [contenteditable] a { color: var(--lux-primary); }
      `}</style>
    </div>
  );
}
