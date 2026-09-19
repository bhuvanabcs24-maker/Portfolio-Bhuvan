'use client';

import React, { useEffect, useRef, useState } from 'react';

export type TransitionType =
  | 'entry-workspace'   // Hero → Workspace: fade + scale
  | 'entry-forgeiq'     // Workspace → ForgeIQ: clip-expand from center
  | 'entry-lab'         // Workspace → Engineering Lab: grid-reveal
  | 'entry-profile'     // Workspace → Profile: slide + scale
  | 'entry-default'     // Generic: fade
  | 'exit-window'       // Window close: fast fade-out
  | 'exit-workspace';   // Module → Workspace: contract

export interface TransitionState {
  isActive: boolean;
  phase: 'in' | 'hold' | 'out' | 'idle';
  type: TransitionType;
  label: string;
}

interface TransitionOverlayProps {
  state: TransitionState;
  onComplete?: () => void;
}

// Scan-line grid used for engineering lab transition
function ScanGrid({ opacity }: { opacity: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}
    />
  );
}

// Corner decoration marks
function CornerMarks() {
  const corners: Array<{ style: React.CSSProperties; rotateDeg: number }> = [
    { style: { top: 20, left: 20 },    rotateDeg: 0 },
    { style: { top: 20, right: 20 },   rotateDeg: 90 },
    { style: { bottom: 20, right: 20 },rotateDeg: 180 },
    { style: { bottom: 20, left: 20 }, rotateDeg: 270 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...c.style,
            width: 24,
            height: 24,
            borderTop: '2px solid rgba(245,158,11,0.8)',
            borderLeft: '2px solid rgba(245,158,11,0.8)',
            transform: `rotate(${c.rotateDeg}deg)`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function TransitionOverlay({ state, onComplete }: TransitionOverlayProps) {
  const [renderFrame, setRenderFrame] = useState(0);
  const callbackRef = useRef(onComplete);
  callbackRef.current = onComplete;

  // Tick render on each animation frame during active transitions (for scanline effect)
  useEffect(() => {
    if (!state.isActive) return;
    let raf: number;
    const tick = () => {
      setRenderFrame(f => f + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state.isActive]);

  if (!state.isActive && state.phase === 'idle') return null;

  const isIn = state.phase === 'in' || state.phase === 'hold';
  const type = state.type;

  // ── Base overlay style ────────────────────────────────────────────
  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    pointerEvents: isIn ? 'all' : 'none',
    transition: `opacity ${isIn ? '250ms' : '350ms'} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };

  // ── Per-type overlays ─────────────────────────────────────────────

  if (type === 'entry-workspace') {
    return (
      <div
        style={{
          ...baseStyle,
          background: 'rgba(8, 9, 11, 0.96)',
          opacity: isIn ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
        }}
        className="os-transition-overlay"
      >
        <ScanGrid opacity={isIn ? 0.6 : 0} />
        <CornerMarks />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(245,158,11,0.9)',
          letterSpacing: '0.25em',
          animation: isIn ? 'tx-blink 0.8s step-start infinite' : 'none',
        }}>
          BHUVAN
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(148,163,184,0.6)',
          letterSpacing: '0.2em',
        }}>
          ENTERING WORKSPACE
        </div>
      </div>
    );
  }

  if (type === 'entry-forgeiq') {
    // Cinematic clip from center: a white-line ring expands outward
    return (
      <div
        style={{
          ...baseStyle,
          background: 'rgba(8, 9, 11, 0.97)',
          opacity: isIn ? 1 : 0,
          overflow: 'hidden',
        }}
        className="os-transition-overlay"
      >
        <ScanGrid opacity={isIn ? 0.4 : 0} />
        <CornerMarks />
        {/* Center expand ring */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isIn ? '60px' : '200vmax',
          height: isIn ? '60px' : '200vmax',
          borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.5)',
          transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1), height 0.6s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(245,158,11,0.8)',
          letterSpacing: '0.3em',
          whiteSpace: 'nowrap',
          animation: isIn ? 'tx-blink 0.6s step-start infinite' : 'none',
        }}>
          FORGEIQ — SYSTEM LOAD
        </div>
      </div>
    );
  }

  if (type === 'entry-lab') {
    return (
      <div
        style={{
          ...baseStyle,
          background: 'rgba(8, 9, 11, 0.97)',
          opacity: isIn ? 1 : 0,
        }}
        className="os-transition-overlay"
      >
        {/* Animated grid lines from top */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(245,158,11,0.2) 1px, transparent 1px)`,
          backgroundSize: '100% 40px',
          animation: isIn ? 'tx-grid-scan 0.6s ease-out forwards' : 'none',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(90deg, rgba(245,158,11,0.12) 1px, transparent 1px)`,
          backgroundSize: '40px 100%',
          animation: isIn ? 'tx-grid-scan 0.5s ease-out 0.1s forwards' : 'none',
          opacity: 0,
          pointerEvents: 'none',
        }} />
        <CornerMarks />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(245,158,11,0.8)',
          letterSpacing: '0.3em',
          whiteSpace: 'nowrap',
          animation: isIn ? 'tx-blink 0.7s step-start infinite' : 'none',
        }}>
          ENGINEERING LAB — BOOT
        </div>
      </div>
    );
  }

  if (type === 'entry-profile') {
    return (
      <div
        style={{
          ...baseStyle,
          background: 'rgba(8, 9, 11, 0.97)',
          opacity: isIn ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
        className="os-transition-overlay"
      >
        <CornerMarks />
        {/* Horizontal scan line */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)',
          animation: isIn ? 'tx-scan-h 0.5s ease-out forwards' : 'none',
          top: '50%',
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'rgba(245,158,11,0.9)',
          letterSpacing: '0.3em',
          animation: isIn ? 'tx-fade-up 0.4s ease-out 0.2s both' : 'none',
        }}>
          IDENTITY — BHUVAN A B
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'rgba(148,163,184,0.5)',
          letterSpacing: '0.2em',
          animation: isIn ? 'tx-fade-up 0.4s ease-out 0.3s both' : 'none',
        }}>
          LOADING ENGINEERING PROFILE
        </div>
      </div>
    );
  }

  if (type === 'exit-workspace') {
    return (
      <div
        style={{
          ...baseStyle,
          background: 'rgba(8, 9, 11, 0.9)',
          opacity: isIn ? 1 : 0,
        }}
        className="os-transition-overlay"
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: isIn ? 'tx-grid-contract 0.4s ease-in forwards' : 'none',
        }} />
      </div>
    );
  }

  // entry-default / exit-window — simple fade
  return (
    <div
      style={{
        ...baseStyle,
        background: 'rgba(8, 9, 11, 0.85)',
        opacity: isIn ? 1 : 0,
      }}
      className="os-transition-overlay"
    />
  );
}
