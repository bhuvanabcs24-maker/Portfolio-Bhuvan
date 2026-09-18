'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // max offset in px, default 7
  className?: string;
  cursorType?: 'pointer' | 'inspect' | 'open' | 'external';
}

/**
 * MagneticButton
 * Subtle physical magnetic attraction toward cursor on hover.
 * Retains full accessibility, keyboard focus, and disables on reduced-motion / touch.
 */
export default function MagneticButton({
  children,
  strength = 6,
  className = '',
  cursorType = 'pointer',
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMagneticEnabled, setIsMagneticEnabled] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsMagneticEnabled(false);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMagneticEnabled || !btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Normalize and cap by strength (subtle displacement)
    const distance = Math.hypot(deltaX, deltaY);
    const maxDistance = rect.width / 2;
    const factor = Math.min(distance / maxDistance, 1);

    const pullX = (deltaX / (distance || 1)) * factor * strength;
    const pullY = (deltaY / (distance || 1)) * factor * strength;

    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
    onMouseLeave?.(e);
  };

  return (
    <button
      ref={btnRef}
      className={`os-magnetic-btn ${className}`}
      data-cursor={cursorType}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.1s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.2s ease, border-color 0.2s ease'
          : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
