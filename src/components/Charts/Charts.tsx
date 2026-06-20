'use client';

import React, { useState } from 'react';
import { LuxTone, BaseProps } from '../../types';

export interface ChartDataPoint {
  label: string;
  value: number;
  tone?: LuxTone;
}

const defaultColors = ['#6366f1', '#ec4899', '#22d3ee', '#22c55e', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6'];

function toneColor(tone?: LuxTone, fallback?: string) {
  if (!tone) return fallback;
  return `var(--lux-${tone})`;
}

// ── BarChart ──────────────────────────────────────────────────

export interface BarChartProps extends BaseProps {
  data: ChartDataPoint[];
  height?: number;
  showValues?: boolean;
  tone?: LuxTone;
  horizontal?: boolean;
}

export function BarChart({ data, height = 220, showValues = true, tone = 'primary', horizontal = false, className, style }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1);
  const [hovered, setHovered] = useState<number | null>(null);

  if (horizontal) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', ...style }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 80, fontSize: '0.75rem', opacity: 0.65, textAlign: 'right', flexShrink: 0 }}>{d.label}</div>
            <div style={{ flex: 1, background: 'var(--lux-surface-2)', borderRadius: 6, height: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: `${(d.value / max) * 100}%`, height: '100%', borderRadius: 6,
                background: toneColor(d.tone || tone, defaultColors[i % defaultColors.length]),
                transition: 'width 0.4s ease',
              }} />
            </div>
            {showValues && <div style={{ width: 40, fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>{d.value}</div>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height, ...style }}>
      {data.map((d, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.4rem' }}
        >
          {showValues && (
            <div style={{ fontSize: '0.72rem', fontWeight: 700, opacity: hovered === i ? 1 : 0.6 }}>{d.value}</div>
          )}
          <div style={{
            width: '100%', maxWidth: 44,
            height: `${(d.value / max) * (height - 50)}px`,
            borderRadius: '6px 6px 0 0',
            background: toneColor(d.tone || tone, defaultColors[i % defaultColors.length]),
            transition: 'height 0.4s ease, opacity 0.15s',
            opacity: hovered === null || hovered === i ? 1 : 0.5,
          }} />
          <div style={{ fontSize: '0.7rem', opacity: 0.5, whiteSpace: 'nowrap' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── LineChart ─────────────────────────────────────────────────

export interface LineChartProps extends BaseProps {
  data: ChartDataPoint[];
  height?: number;
  width?: number;
  tone?: LuxTone;
  showDots?: boolean;
  showArea?: boolean;
}

export function LineChart({ data, height = 200, width = 480, tone = 'primary', showDots = true, showArea = false, className, style }: LineChartProps) {
  const max = Math.max(...data.map(d => d.value), 1);
  const min = Math.min(...data.map(d => d.value), 0);
  const range = max - min || 1;
  const padX = 20, padY = 20;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = data.map((d, i) => {
    const x = padX + (i / Math.max(1, data.length - 1)) * innerW;
    const y = padY + innerH - ((d.value - min) / range) * innerH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  const colorVar = `var(--lux-${tone})`;

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', ...style }}>
      {showArea && <path d={areaPath} fill={colorVar} opacity={0.12} />}
      <path d={linePath} fill="none" stroke={colorVar} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {showDots && points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill={colorVar} stroke="var(--lux-bg)" strokeWidth={2} />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 4} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.5}>{p.label}</text>
      ))}
    </svg>
  );
}

// ── AreaChart (alias of LineChart with showArea) ────────────────

export function AreaChart(props: Omit<LineChartProps, 'showArea'>) {
  return <LineChart {...props} showArea />;
}

// ── PieChart / DonutChart ────────────────────────────────────────

export interface PieChartProps extends BaseProps {
  data: ChartDataPoint[];
  size?: number;
  /** 0 = pie, > 0 = donut hole radius ratio (0-1) */
  innerRadiusRatio?: number;
  showLegend?: boolean;
}

export function PieChart({ data, size = 200, innerRadiusRatio = 0, showLegend = true, className, style }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = size / 2;
  const innerRadius = radius * innerRadiusRatio;
  let cumulativeAngle = -90;

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = radius + radius * Math.cos(toRad(startAngle));
    const y1 = radius + radius * Math.sin(toRad(startAngle));
    const x2 = radius + radius * Math.cos(toRad(endAngle));
    const y2 = radius + radius * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;

    const color = toneColor(d.tone, defaultColors[i % defaultColors.length]) as string;

    let path: string;
    if (innerRadius > 0) {
      const ix1 = radius + innerRadius * Math.cos(toRad(startAngle));
      const iy1 = radius + innerRadius * Math.sin(toRad(startAngle));
      const ix2 = radius + innerRadius * Math.cos(toRad(endAngle));
      const iy2 = radius + innerRadius * Math.sin(toRad(endAngle));
      path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
    } else {
      path = `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }

    return { path, color, ...d, pct: Math.round((d.value / total) * 100) };
  });

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="var(--lux-bg)" strokeWidth={1.5} />
        ))}
      </svg>
      {showLegend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
              <span style={{ opacity: 0.8 }}>{s.label}</span>
              <span style={{ opacity: 0.5, marginLeft: 'auto' }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DonutChart(props: Omit<PieChartProps, 'innerRadiusRatio'>) {
  return <PieChart {...props} innerRadiusRatio={0.6} />;
}
