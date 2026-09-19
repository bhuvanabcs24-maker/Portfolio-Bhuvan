'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { TransitionType, TransitionState } from './TransitionOverlay';

// Duration config per transition type (ms)
const TRANSITION_DURATIONS: Record<TransitionType, { in: number; hold: number; out: number }> = {
  'entry-workspace': { in: 300, hold: 200, out: 350 },
  'entry-forgeiq':  { in: 350, hold: 300, out: 400 },
  'entry-lab':      { in: 300, hold: 200, out: 350 },
  'entry-profile':  { in: 280, hold: 150, out: 300 },
  'entry-default':  { in: 200, hold: 100, out: 250 },
  'exit-window':    { in: 150, hold: 50,  out: 200 },
  'exit-workspace': { in: 200, hold: 100, out: 250 },
};

const IDLE_STATE: TransitionState = {
  isActive: false,
  phase: 'idle',
  type: 'entry-default',
  label: '',
};

/**
 * useTransitionEngine
 *
 * Runs a three-phase transition: in → hold → out
 * Returns:
 *  - transitionState: current overlay state
 *  - runTransition(type, label, callback): starts the transition,
 *    calls callback() when the hold phase begins (i.e., at peak visual),
 *    then fades out.
 */
export function useTransitionEngine() {
  const [transitionState, setTransitionState] = useState<TransitionState>(IDLE_STATE);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  const runTransition = useCallback(
    (type: TransitionType, label: string, callback?: () => void) => {
      clearTimers();

      // If user prefers reduced motion, skip animation → call callback immediately
      if (prefersReducedMotionRef.current) {
        callback?.();
        return;
      }

      const durations = TRANSITION_DURATIONS[type];

      // Phase 1: IN — overlay fades in
      setTransitionState({ isActive: true, phase: 'in', type, label });

      // Phase 2: HOLD — callback fires here (content switches underneath)
      const t1 = setTimeout(() => {
        setTransitionState({ isActive: true, phase: 'hold', type, label });
        callback?.();
      }, durations.in);

      // Phase 3: OUT — overlay fades out
      const t2 = setTimeout(() => {
        setTransitionState({ isActive: true, phase: 'out', type, label });
      }, durations.in + durations.hold);

      // Phase 4: IDLE — overlay unmounts
      const t3 = setTimeout(() => {
        setTransitionState(IDLE_STATE);
      }, durations.in + durations.hold + durations.out);

      timerRefs.current = [t1, t2, t3];
    },
    [clearTimers]
  );

  const cancelTransition = useCallback(() => {
    clearTimers();
    setTransitionState(IDLE_STATE);
  }, [clearTimers]);

  return { transitionState, runTransition, cancelTransition };
}
