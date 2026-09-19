'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '@/components/os/OSContext';
import { ArrowRight, FileText } from 'lucide-react';

export default function MobileEntryScreen() {
  const { enterWorkspace } = useOS();
  const [phase, setPhase] = useState(0); // 0: blank → 1: os name → 2: name → 3: role → 4: cta
  const [isExiting, setIsExiting] = useState(false);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(4);
      return;
    }

    // Check returning visitor
    let isReturning = false;
    try {
      isReturning = localStorage.getItem('bhuvan_os_intro_seen') === 'true';
    } catch {}

    if (isReturning) {
      setPhase(4);
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1300);
    const t4 = setTimeout(() => {
      setPhase(4);
      try { localStorage.setItem('bhuvan_os_intro_seen', 'true'); } catch {}
    }, 1800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const handleEnter = () => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    try { localStorage.setItem('bhuvan_os_intro_seen', 'true'); } catch {}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      enterWorkspace();
      return;
    }

    setIsExiting(true);
    setTimeout(() => enterWorkspace(), 500);
  };

  return (
    <div
      className={`mb-entry-screen ${isExiting ? 'mb-entry-exiting' : ''}`}
      onClick={() => { if (phase < 4) setPhase(4); }}
    >
      {/* Background grid */}
      <div className="mb-entry-grid" aria-hidden="true" />

      {/* Corner marks */}
      <div className="mb-entry-corner mb-entry-corner-tl" aria-hidden="true" />
      <div className="mb-entry-corner mb-entry-corner-tr" aria-hidden="true" />
      <div className="mb-entry-corner mb-entry-corner-bl" aria-hidden="true" />
      <div className="mb-entry-corner mb-entry-corner-br" aria-hidden="true" />

      {/* Content */}
      <main className="mb-entry-main">
        {/* System identifier */}
        <div className={`mb-entry-sys-id ${phase >= 1 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          <span className="mb-entry-dot" aria-hidden="true" />
          <span className="mb-entry-sys-label">BHUVAN</span>
          <span className="mb-entry-sys-build">BUILD 2026</span>
        </div>

        {/* Name */}
        <h1 className={`mb-entry-name ${phase >= 2 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          BHUVAN
          <br />
          <span className="mb-entry-name-sub">A B</span>
        </h1>

        {/* Role */}
        <div className={`mb-entry-role ${phase >= 3 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          <span>SOFTWARE ENGINEER</span>
          <div className="mb-entry-role-tags">
            <span>AI SYSTEMS</span>
            <span className="mb-entry-divider">·</span>
            <span>BACKEND</span>
            <span className="mb-entry-divider">·</span>
            <span>FULL-STACK</span>
          </div>
        </div>

        {/* Statement */}
        <p className={`mb-entry-statement ${phase >= 4 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          Building software systems where AI meets real-world workflows.
        </p>

        {/* Actions */}
        <div className={`mb-entry-actions ${phase >= 4 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          <button
            id="mb-enter-workspace-btn"
            className="mb-entry-btn-primary"
            onClick={(e) => { e.stopPropagation(); handleEnter(); }}
            aria-label="Enter BHUVAN Workspace"
          >
            <span>ENTER WORKSPACE</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-entry-btn-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            <FileText size={15} aria-hidden="true" />
            <span>RESUME</span>
          </a>
        </div>

        {/* Metadata row */}
        <div className={`mb-entry-meta ${phase >= 4 ? 'mb-entry-visible' : 'mb-entry-hidden'}`}>
          <span>BMSCE · 2028 · CGPA 8.08</span>
          <span className="mb-entry-divider">·</span>
          <span>100+ LeetCode</span>
        </div>
      </main>

      {/* Bottom tech bar */}
      <footer className="mb-entry-footer">
        <span>FASTAPI + NEXT.JS + POSTGRESQL</span>
      </footer>
    </div>
  );
}
