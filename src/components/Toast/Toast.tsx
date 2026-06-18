'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LuxTone } from '../../types';

export interface ToastOptions {
  title?: string;
  tone?: LuxTone;
  duration?: number;
  icon?: ReactNode;
}

interface ToastItem extends ToastOptions {
  id: number;
  message: string;
}

interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let idCounter = 0;

const toneIcon: Record<LuxTone, string> = {
  primary: 'ℹ', success: '✓', danger: '✕', warning: '⚠', info: 'ℹ', accent: '★', neutral: '•',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = (message: string, options: ToastOptions = {}) => {
    const id = ++idCounter;
    const duration = options.duration ?? 4000;
    setToasts(prev => [...prev, { id, message, ...options }]);
    if (duration > 0) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    }
  };

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 2000 }}>
          {toasts.map(t => (
            <div
              key={t.id}
              {...{ surface: 'matte', radius: 'lg', elevation: 'float' } as any}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', padding: '0.875rem 1rem', minWidth: 280, maxWidth: 360, animation: 'lux-toast-in 0.2s ease-out' }}
              onClick={() => dismiss(t.id)}
            >
              <span style={{ fontSize: '1rem', color: `var(--lux-${t.tone || 'primary'})`, flexShrink: 0 }}>
                {t.icon || toneIcon[t.tone || 'primary']}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                {t.title && <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.15rem' }}>{t.title}</div>}
                <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{t.message}</div>
              </div>
            </div>
          ))}
          <style>{`@keyframes lux-toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx.toast;
}
