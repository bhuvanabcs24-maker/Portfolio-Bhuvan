/**
 * useMobile — Detects mobile viewport and touch input.
 * SSR-safe: returns false on server, recalculates on client.
 */
'use client';

import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth <= 768;
      const touch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(width);
      setIsTouch(touch);
    };

    checkMobile();

    const ro = new ResizeObserver(checkMobile);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return { isMobile, isTouch };
}
