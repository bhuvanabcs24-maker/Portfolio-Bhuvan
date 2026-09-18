import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
  badge?: string;
  variant?: 'blue' | 'emerald' | 'default';
}

export default function MetricCard({
  label,
  value,
  detail,
  badge,
  variant = 'default',
}: MetricCardProps) {
  const getBorderColor = () => {
    if (variant === 'blue') return 'rgba(59, 130, 246, 0.3)';
    if (variant === 'emerald') return 'rgba(16, 185, 129, 0.3)';
    return 'var(--border-subtle)';
  };

  const getValueColor = () => {
    if (variant === 'blue') return '#93c5fa';
    if (variant === 'emerald') return '#6ee7b7';
    return 'var(--text-primary)';
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: `1px solid ${getBorderColor()}`,
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      backdropFilter: 'blur(8px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {badge && (
        <span style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          fontSize: '0.68rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '0.15rem 0.45rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.06)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-subtle)',
        }}>
          {badge}
        </span>
      )}
      <div style={{
        fontSize: '2rem',
        fontWeight: 800,
        fontFamily: 'var(--font-mono)',
        color: getValueColor(),
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
      }}>
        {label}
      </div>
      {detail && (
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
        }}>
          {detail}
        </div>
      )}
    </div>
  );
}
