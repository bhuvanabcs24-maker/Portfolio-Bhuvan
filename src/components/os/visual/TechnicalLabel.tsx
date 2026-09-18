'use client';

import React from 'react';

interface TechnicalLabelProps {
  label: string;
  subtext?: string;
  prefix?: string;
  variant?: 'default' | 'accent' | 'dim' | 'outline';
  dot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TechnicalLabel
 * Monospace telemetry badge/annotation for engineering metadata, coordinates, and metrics.
 */
export default function TechnicalLabel({
  label,
  subtext,
  prefix,
  variant = 'default',
  dot = false,
  className = '',
  style,
}: TechnicalLabelProps) {
  let color = 'var(--text-secondary, #94a3b8)';
  let bg = 'rgba(255, 255, 255, 0.04)';
  let borderColor = 'rgba(255, 255, 255, 0.08)';

  if (variant === 'accent') {
    color = 'var(--os-accent, #f59e0b)';
    bg = 'rgba(245, 158, 11, 0.08)';
    borderColor = 'rgba(245, 158, 11, 0.25)';
  } else if (variant === 'dim') {
    color = 'var(--text-muted, #64748b)';
    bg = 'transparent';
    borderColor = 'transparent';
  } else if (variant === 'outline') {
    color = 'var(--text-primary, #f1f5f9)';
    bg = 'transparent';
    borderColor = 'rgba(255, 255, 255, 0.15)';
  }

  return (
    <span
      className={`os-tech-label os-mono ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        padding: variant === 'dim' ? '0' : '0.2rem 0.55rem',
        borderRadius: '4px',
        color,
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
        lineHeight: 1.2,
        userSelect: 'none',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: variant === 'accent' ? 'var(--os-accent, #f59e0b)' : '#10b981',
            boxShadow: variant === 'accent' ? '0 0 6px rgba(245, 158, 11, 0.7)' : '0 0 6px rgba(16, 185, 129, 0.7)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {prefix && (
        <span style={{ opacity: 0.5, fontWeight: 400 }}>{prefix}</span>
      )}
      <span>{label}</span>
      {subtext && (
        <span style={{ opacity: 0.65, fontWeight: 400, marginLeft: '0.15rem' }}>
          {subtext}
        </span>
      )}
    </span>
  );
}
