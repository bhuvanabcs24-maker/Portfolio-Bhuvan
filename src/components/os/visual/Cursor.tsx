'use client';

import React, { useEffect, useRef, useState } from 'react';

type CursorType = 'default' | 'pointer' | 'inspect' | 'open' | 'external' | 'move' | 'text';

/**
 * Context-aware engineering cursor system for desktop.
 * - Auto-disabled on touch/coarse pointers and prefers-reduced-motion.
 * - Smooth lerp tracking via requestAnimationFrame.
 * - Dynamic pill badges for 'INSPECT', 'OPEN', '↗', 'MOVE'.
 */
export default function Cursor() {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorDotPos = useRef({ x: -100, y: -100 });
  const cursorRingPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 
                    window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check target element or closest parent for data-cursor or interactive tag
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const val = cursorEl.getAttribute('data-cursor') as CursorType;
        setCursorType(val || 'pointer');
        return;
      }

      // Check for draggable / window header
      if (target.closest('.window-titlebar') || target.closest('[data-drag]')) {
        setCursorType('move');
        return;
      }

      // Check for external links
      const link = target.closest('a') as HTMLAnchorElement | null;
      if (link) {
        if (link.target === '_blank' || link.rel?.includes('noopener') || link.href.startsWith('http')) {
          setCursorType('external');
          return;
        }
        setCursorType('pointer');
        return;
      }

      // Check for buttons or interactive elements
      if (target.closest('button') || target.closest('.btn') || target.closest('[role="button"]') || target.closest('.os-interactive')) {
        setCursorType('pointer');
        return;
      }

      // Text selection
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setCursorType('text');
        return;
      }

      setCursorType('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth RAF Lerp loop
    const render = () => {
      // Dot follows directly with tiny lag
      cursorDotPos.current.x += (mousePos.current.x - cursorDotPos.current.x) * 0.45;
      cursorDotPos.current.y += (mousePos.current.y - cursorDotPos.current.y) * 0.45;

      // Outer ring follows with smooth damping
      cursorRingPos.current.x += (mousePos.current.x - cursorRingPos.current.x) * 0.18;
      cursorRingPos.current.y += (mousePos.current.y - cursorRingPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorDotPos.current.x}px, ${cursorDotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cursorRingPos.current.x}px, ${cursorRingPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  // Render text for specialized badges
  let badgeContent: string | null = null;
  if (cursorType === 'inspect') badgeContent = 'INSPECT';
  else if (cursorType === 'open') badgeContent = 'OPEN';
  else if (cursorType === 'external') badgeContent = '↗';
  else if (cursorType === 'move') badgeContent = 'MOVE';

  const isExpanded = cursorType !== 'default' && cursorType !== 'text';

  return (
    <div
      aria-hidden="true"
      className="os-cursor-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible && cursorType !== 'text' ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Central Precision Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--os-accent, #f59e0b)',
          boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Lagging Context Ring / Pill */}
      <div
        ref={ringRef}
        className={`os-cursor-ring ${isExpanded ? 'os-cursor-expanded' : ''} ${badgeContent ? 'os-cursor-badged' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          willChange: 'transform, width, height, border-color, background',
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, border-color 0.2s ease',
          ...(badgeContent
            ? {
                minWidth: badgeContent === '↗' ? '28px' : '62px',
                height: '24px',
                padding: '0 8px',
                borderRadius: '12px',
                backgroundColor: 'rgba(8, 9, 11, 0.85)',
                border: '1px solid var(--os-accent, #f59e0b)',
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.3)',
              }
            : isExpanded
            ? {
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1.5px solid var(--os-accent, #f59e0b)',
                boxShadow: '0 0 12px rgba(245, 158, 11, 0.25)',
              }
            : {
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }),
        }}
      >
        {badgeContent && (
          <span
            ref={labelRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--os-accent, #f59e0b)',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            {badgeContent}
          </span>
        )}
      </div>
    </div>
  );
}
