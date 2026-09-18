'use client';

import React from 'react';

interface SystemPanelProps {
  title?: string;
  code?: string;
  coordinate?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SystemPanel
 * Spatial engineering container with edge-aligned telemetry, corner crosshairs,
 * and restrained graphite elevation.
 */
export default function SystemPanel({
  title,
  code,
  coordinate,
  children,
  action,
  className = '',
  style,
}: SystemPanelProps) {
  return (
    <div
      className={`os-system-panel ${className}`}
      style={{
        position: 'relative',
        background: 'rgba(14, 16, 20, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '1.25rem',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        ...style,
      }}
    >
      {/* Corner Registration Marks (Engineering Aesthetic) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderTop: '1.5px solid var(--os-accent, #f59e0b)',
          borderLeft: '1.5px solid var(--os-accent, #f59e0b)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '8px',
          height: '8px',
          borderBottom: '1.5px solid rgba(255, 255, 255, 0.2)',
          borderRight: '1.5px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Header telemetry & coordinates */}
      {(title || code || coordinate || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '0.85rem',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            {code && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--os-accent, #f59e0b)',
                  letterSpacing: '0.08em',
                }}
              >
                {code}
              </span>
            )}
            {title && (
              <h3
                style={{
                  fontFamily: 'var(--font-display, var(--font-sans))',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #f1f5f9)',
                  letterSpacing: '-0.015em',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {coordinate && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--text-muted, #64748b)',
                  letterSpacing: '0.08em',
                }}
              >
                {coordinate}
              </span>
            )}
            {action}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="os-panel-body">
        {children}
      </div>
    </div>
  );
}
