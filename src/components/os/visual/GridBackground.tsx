'use client';

import React, { useEffect, useState } from 'react';

interface GridBackgroundProps {
  showScan?: boolean;
  className?: string;
}

/**
 * GridBackground
 * Barely visible engineering grid with micro-dots and optional one-shot entry scan line.
 */
export default function GridBackground({ showScan = true, className = '' }: GridBackgroundProps) {
  const [scanning, setScanning] = useState(showScan);

  useEffect(() => {
    if (showScan) {
      setScanning(true);
      const timer = setTimeout(() => {
        setScanning(false);
      }, 1400); // one-shot short sweep, then terminated
      return () => clearTimeout(timer);
    }
  }, [showScan]);

  return (
    <div
      aria-hidden="true"
      className={`os-grid-background-layer ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Subtle Engineering Grid Pattern */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: 0.045,
          position: 'absolute',
          inset: 0,
        }}
      >
        <defs>
          <pattern id="osEngineeringGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.5"
            />
            <circle cx="48" cy="0" r="0.8" fill="rgba(245, 158, 11, 0.7)" />
            <circle cx="0" cy="48" r="0.8" fill="rgba(245, 158, 11, 0.7)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#osEngineeringGrid)" />
      </svg>

      {/* Subtle Coordinate Crosshair Watermarks in Negative Space */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: 'rgba(255, 255, 255, 0.12)',
          userSelect: 'none',
        }}
      >
        SYS.GRID // 12.9716° N • 77.5946° E
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: 'rgba(255, 255, 255, 0.12)',
          userSelect: 'none',
        }}
      >
        ENV_SCALE: 1:1 // SEC_LEVEL: 0
      </div>

      {/* One-Shot Entrance Scan Beam */}
      {scanning && (
        <div
          className="os-entry-scan-beam"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.45) 50%, transparent 100%)',
            boxShadow: '0 0 16px 2px rgba(245, 158, 11, 0.25)',
            animation: 'osScanEntrance 1.3s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          }}
        />
      )}
    </div>
  );
}
