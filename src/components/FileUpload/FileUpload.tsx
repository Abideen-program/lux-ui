'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface FileUploadProps extends BaseProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  tone?: LuxTone;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFilesSelected,
  accept,
  multiple = false,
  maxSizeMB,
  tone = 'primary',
  label = 'Drop files here or click to browse',
  hint,
  disabled = false,
  className,
  style,
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (list: File[]): File[] => {
    if (!maxSizeMB) return list;
    const valid = list.filter(f => f.size <= maxSizeMB * 1024 * 1024);
    if (valid.length < list.length) setError(`Some files exceed ${maxSizeMB}MB and were skipped.`);
    else setError(null);
    return valid;
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = validate(Array.from(list));
    const next = multiple ? [...files, ...arr] : arr.slice(0, 1);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const removeFile = (i: number) => {
    const next = files.filter((_, idx) => idx !== i);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={className} style={style}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e: DragEvent) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        {...{ surface: dragging ? 'matte' : 'outline', radius: 'lg' } as any}
        style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          borderColor: dragging ? `var(--lux-${tone})` : undefined,
          transition: 'all 0.15s',
        }}
      >
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📁</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{label}</div>
        {hint && <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{hint}</div>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
      </div>

      {error && <div style={{ fontSize: '0.78rem', color: 'var(--lux-danger)', marginTop: '0.5rem' }}>{error}</div>}

      {files.length > 0 && (
        <div style={{ marginTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {files.map((file, i) => (
            <div
              key={i}
              {...{ surface: 'matte', radius: 'md' } as any}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem' }}
            >
              <span style={{ fontSize: '0.9rem' }}>📄</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.5 }}>{formatSize(file.size)}</div>
              </div>
              <button
                onClick={() => removeFile(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: '0.85rem', color: 'inherit' }}
                aria-label="Remove file"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
