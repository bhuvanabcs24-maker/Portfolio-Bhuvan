'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useOS } from './OSContext';
import { 
  Terminal, 
  ArrowRight, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers,
  Sparkles,
  ExternalLink,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';
import { MagneticButton, SystemStatus, TechnicalLabel, SystemCoreCanvas } from './visual';

export default function OSEntryScreen() {
  const { enterWorkspace } = useOS();
  const [mounted, setMounted] = useState(false);
  const [bootPhase, setBootPhase] = useState<number>(0); // 0: init void, 1: identity, 2: telemetry, 3: interactive
  const [isExiting, setIsExiting] = useState(false);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBootPhase(3);
      return;
    }

    // Check returning visitor
    let isReturning = false;
    try {
      isReturning = localStorage.getItem('bhuvan_os_intro_seen') === 'true';
    } catch {}

    if (isReturning) {
      // Shortened intro for returning visitors (500ms directly to ready)
      const t = setTimeout(() => {
        setBootPhase(3);
      }, 500);
      return () => clearTimeout(t);
    }

    // Phased Boot Sequence: 0ms -> 450ms -> 900ms -> 1400ms (Total ~1.4s)
    const t1 = setTimeout(() => setBootPhase(1), 450);
    const t2 = setTimeout(() => setBootPhase(2), 900);
    const t3 = setTimeout(() => {
      setBootPhase(3);
      try {
        localStorage.setItem('bhuvan_os_intro_seen', 'true');
      } catch {}
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Exit transition handler (~600ms contract -> workspace)
  const handleEnterWorkspace = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    try {
      localStorage.setItem('bhuvan_os_intro_seen', 'true');
    } catch {}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      enterWorkspace();
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      enterWorkspace();
    }, 600);
  };

  // Keyboard shortcut listener: Enter key enters or skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnterWorkspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enterWorkspace]);

  return (
    <div 
      className={`os-entry-screen ${mounted ? 'active' : ''} ${isExiting ? 'exiting' : ''}`}
      onClick={() => {
        // Clicking anywhere during phase 0-2 skips directly to ready state
        if (bootPhase < 3) setBootPhase(3);
      }}
    >
      {/* Background Technical Grid & Glow */}
      <div className="os-entry-grid-overlay" />
      <div className="os-entry-scanline" />

      {/* Phased Boot Initializer Layer (Phase 0) */}
      <div className={`os-boot-init-layer ${bootPhase > 0 ? 'hidden' : ''}`}>
        <div className="os-boot-init-content">
          <div className="os-boot-logo">BHUVAN.OS</div>
          <div className="os-boot-meta">BUILD 2026 // KERNEL: DARWIN_X86_64</div>
          <div className="os-boot-status-row">
            <span className="os-status-dot pulse" />
            <span>SYSTEM INITIALIZING</span>
          </div>
          <div className="os-boot-progress-line">
            <div className="os-boot-progress-fill" />
          </div>
        </div>
      </div>

      {/* Top Telematics Bar */}
      <header className="os-entry-header">
        <div className="os-entry-header-left">
          <SystemStatus statusText="SYSTEM ONLINE" subsystem="HOST: BLR-DC-01" showPing={true} className="os-entry-mono-tag" />
          <span className="os-entry-divider">/</span>
          <span className="os-entry-mono-sub">KERNEL: DARWIN_X86_64</span>
        </div>

        <div className="os-entry-header-right">
          <TechnicalLabel label="47/47 TESTS PASSING" dot={true} variant="accent" />
          <span className="os-entry-divider">/</span>
          <TechnicalLabel label="BUILD 2.4.0-PROD" variant="dim" />
        </div>
      </header>

      {/* Center Stage: Asymmetric Editorial Engineering Composition */}
      <main className="os-entry-center-stage">
        <div className="os-hero-editorial-grid">
          
          {/* Left Column: Identity, Roles & Supporting Statement */}
          <div className={`os-hero-left ${bootPhase >= 1 ? 'phase-visible' : 'phase-hidden'}`}>
            <div className="os-entry-brand-block">
              <h2 className="os-entry-title">BHUVAN.OS</h2>
              <div className="os-entry-system-badge">
                <span className="os-status-dot-static" />
                <span>SYSTEM ONLINE</span>
              </div>
            </div>

            <div className="os-entry-identity-block">
              <h1 className="os-entry-name">Bhuvan A B</h1>
              <div className="os-entry-role">Software Engineer</div>
              <div className="os-entry-specialization">
                AI Systems <span className="dot-sep">•</span> Backend <span className="dot-sep">•</span> Full-Stack
              </div>
            </div>

            <p className={`os-entry-statement ${bootPhase >= 2 ? 'phase-visible' : 'phase-hidden'}`}>
              &ldquo;Building software systems where AI meets real-world workflows.&rdquo;
            </p>

            {/* Quick Metrics Bar */}
            <div className={`os-entry-metrics-preview ${bootPhase >= 2 ? 'phase-visible' : 'phase-hidden'}`}>
              <div className="os-entry-metric-item" data-cursor="inspect">
                <span className="os-entry-metric-val">33/33</span>
                <span className="os-entry-metric-key">Unit/Int Tests</span>
              </div>
              <div className="os-entry-metric-divider" />
              <div className="os-entry-metric-item" data-cursor="inspect">
                <span className="os-entry-metric-val">14</span>
                <span className="os-entry-metric-key">E2E Tests</span>
              </div>
              <div className="os-entry-metric-divider" />
              <div className="os-entry-metric-item" data-cursor="inspect">
                <span className="os-entry-metric-val">5.5×</span>
                <span className="os-entry-metric-key">Throughput</span>
              </div>
              <div className="os-entry-metric-divider" />
              <div className="os-entry-metric-item" data-cursor="inspect">
                <span className="os-entry-metric-val">96.9%</span>
                <span className="os-entry-metric-key">Pricing Acc.</span>
              </div>
            </div>
          </div>

          {/* Center Column: System Core Canvas (Engineering Visualization with Cursor Parallax) */}
          <div className={`os-hero-center ${bootPhase >= 1 ? 'phase-visible' : 'phase-hidden'}`}>
            <div className="os-system-core-meta-bar">
              <span>SYS_TOPOLOGY // G=(V,E)</span>
              <span>CURSOR_TRACK: ONLINE</span>
            </div>
            <SystemCoreCanvas />
          </div>

          {/* Right Column: Verified Resume Metadata Telematics */}
          <div className={`os-hero-right ${bootPhase >= 2 ? 'phase-visible' : 'phase-hidden'}`}>
            <div className="os-hero-telemetry-card" data-cursor="inspect">
              <div className="os-hero-telemetry-header">
                <span>INSTITUTION // ACADEMICS</span>
                <span className="os-entry-version">2028</span>
              </div>
              <div className="os-hero-telemetry-val">BMS College of Eng.</div>
              <div className="os-hero-telemetry-sub">B.E. Computer Science & Eng.</div>
            </div>

            <div className="os-hero-telemetry-card" data-cursor="inspect">
              <div className="os-hero-telemetry-header">
                <span>VERIFIED GRADE</span>
                <span style={{ color: 'var(--os-accent, #f59e0b)', fontFamily: 'var(--font-mono)' }}>★ CGPA</span>
              </div>
              <div className="os-hero-telemetry-val" style={{ color: 'var(--os-accent, #f59e0b)' }}>8.08 CGPA</div>
              <div className="os-hero-telemetry-sub">Graduation Expected June 2028</div>
            </div>

            <div className="os-hero-telemetry-card" data-cursor="inspect">
              <div className="os-hero-telemetry-header">
                <span>PROBLEM SOLVING</span>
                <span>LEETCODE</span>
              </div>
              <div className="os-hero-telemetry-val">100+ Solved</div>
              <div className="os-hero-telemetry-sub">Trees, Graphs, DP & Algorithmic</div>
            </div>

            <div className="os-hero-telemetry-card" data-cursor="inspect">
              <div className="os-hero-telemetry-header">
                <span>CORE STACK</span>
                <span>RUNTIME</span>
              </div>
              <div className="os-hero-telemetry-val">FastAPI • Next.js</div>
              <div className="os-hero-telemetry-sub">PostgreSQL • Docker • Linux</div>
            </div>
          </div>

        </div>

        {/* Bottom Hero Actions & Module Capabilities Bar */}
        <div className={`os-hero-bottom-bar ${bootPhase >= 3 ? 'phase-visible' : 'phase-hidden'}`}>
          <div className="os-entry-actions">
            <MagneticButton 
              id="enter-workspace-btn"
              className="os-entry-btn-primary"
              onClick={handleEnterWorkspace}
              strength={7}
              cursorType="open"
              autoFocus
            >
              <span className="os-entry-btn-text">ENTER WORKSPACE</span>
              <span className="os-entry-btn-key">↵ ENTER</span>
            </MagneticButton>

            <a 
              id="view-resume-btn"
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="os-entry-btn-secondary"
              data-cursor="external"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </a>
          </div>

          <div className="os-entry-modules-bar">
            <span className="os-entry-mod-label">6 MODULES LOADED:</span>
            <span className="os-entry-mod-item" data-cursor="inspect">01 SYSTEM</span>
            <span className="os-entry-mod-item" data-cursor="inspect">02 FORGEIQ</span>
            <span className="os-entry-mod-item" data-cursor="inspect">03 ENGINEERING LAB</span>
            <span className="os-entry-mod-item" data-cursor="inspect">04 OPEN SOURCE</span>
            <span className="os-entry-mod-item" data-cursor="inspect">05 NOTES</span>
            <span className="os-entry-mod-item" data-cursor="inspect">06 PROFILE</span>
          </div>
        </div>
      </main>

      {/* Bottom Technical Telematics */}
      <footer className="os-entry-footer">
        <div className="os-entry-footer-left">
          <span>FASTAPI + NEXT.JS 14 + POSTGRESQL + PGVECTOR</span>
          <span className="os-entry-divider">|</span>
          <span>BMS COLLEGE OF ENGINEERING (JUNE 2028 · CGPA 8.08)</span>
        </div>
        <div className="os-entry-footer-right">
          <span>PRESS <strong>ENTER</strong> KEY OR CLICK TO LAUNCH WORKSPACE</span>
        </div>
      </footer>
    </div>
  );
}

