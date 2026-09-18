'use client';

import React, { useState, useEffect } from 'react';

interface SystemStatusProps {
  statusText?: string;
  subsystem?: string;
  showPing?: boolean;
  className?: string;
}

/**
 * SystemStatus
 * Monospace telemetry readout displaying live system health, latency, and operational mode.
 */
export default function SystemStatus({
  statusText = 'SYS_ONLINE',
  subsystem = 'CORE.01',
  showPing = true,
  className = '',
}: SystemStatusProps) {
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    // Subtle realistic ping jitter every 5 seconds
    const interval = setInterval(() => {
      setLatency(12 + Math.floor(Math.random() * 6));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`os-system-status-pill os-mono ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.25rem 0.65rem',
        borderRadius: '6px',
        background: 'rgba(14, 16, 20, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--text-secondary, #94a3b8)',
        letterSpacing: '0.04em',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <span
          className="os-status-pulse-dot"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--os-accent, #f59e0b)',
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)',
            display: 'inline-block',
          }}
        />
        <span style={{ fontWeight: 700, color: 'var(--text-primary, #f1f5f9)' }}>
          {statusText}
        </span>
      </div>

      <span style={{ opacity: 0.3 }}>|</span>

      <span style={{ color: 'var(--text-muted, #64748b)' }}>
        {subsystem}
      </span>

      {showPing && (
        <>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: 'var(--os-accent, #f59e0b)', fontWeight: 600 }}>
            {latency}ms
          </span>
        </>
      )}
    </div>
  );
}
