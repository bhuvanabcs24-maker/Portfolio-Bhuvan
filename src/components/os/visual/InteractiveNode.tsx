'use client';

import React from 'react';

interface InteractiveNodeProps {
  id?: string;
  label: string;
  category?: string;
  status?: 'active' | 'ready' | 'idle' | 'warning';
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * InteractiveNode
 * Telemetry node with hover physics (scale/elevation), cursor='inspect',
 * and single-accent highlighting.
 */
export default function InteractiveNode({
  id,
  label,
  category,
  status = 'ready',
  active = false,
  onClick,
  className = '',
}: InteractiveNodeProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      data-cursor="inspect"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`os-interactive-node ${active ? 'os-node-active' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '0.25rem',
        padding: '0.65rem 0.85rem',
        borderRadius: '6px',
        background: active ? 'rgba(245, 158, 11, 0.08)' : 'rgba(14, 16, 20, 0.9)',
        border: active
          ? '1px solid var(--os-accent, #f59e0b)'
          : '1px solid rgba(255, 255, 255, 0.09)',
        boxShadow: active
          ? '0 0 16px rgba(245, 158, 11, 0.25)'
          : '0 2px 8px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        {id && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: active ? 'var(--os-accent, #f59e0b)' : 'var(--text-muted, #64748b)',
              letterSpacing: '0.06em',
            }}
          >
            {id}
          </span>
        )}
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: active ? 'var(--os-accent, #f59e0b)' : '#64748b',
            boxShadow: active ? '0 0 6px rgba(245, 158, 11, 0.9)' : 'none',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display, var(--font-sans))',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: active ? 'var(--text-primary, #f1f5f9)' : 'var(--text-primary, #f1f5f9)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </div>

      {category && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted, #64748b)',
          }}
        >
          {category}
        </span>
      )}
    </div>
  );
}
