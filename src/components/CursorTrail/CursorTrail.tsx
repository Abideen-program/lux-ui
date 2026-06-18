'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

export interface CursorTrailProps {
  /** Trail color */
  color?: string;
  /** Number of trail particles */
  particleCount?: number;
  /** Particle size in px */
  size?: number;
  /** Children to render trail effect over */
  children?: ReactNode;
}

interface Particle { x: number; y: number; life: number; }

export function CursorTrail({ color = 'var(--lux-primary)', particleCount = 16, size = 6, children }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      particles.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, life: 1 });
      if (particles.current.length > particleCount) particles.current.shift();
    };
    container.addEventListener('mousemove', handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.life -= 0.05;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * (i / particles.current.length), 0, Math.PI * 2);
        ctx.fillStyle = typeof color === 'string' && color.startsWith('var') ? '#6366f1' : color;
        ctx.fill();
      });
      particles.current = particles.current.filter(p => p.life > 0);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, [color, particleCount, size]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
