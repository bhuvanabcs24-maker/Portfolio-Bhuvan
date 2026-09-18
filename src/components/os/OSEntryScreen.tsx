'use client';

import React, { useEffect, useState } from 'react';
import { useOS } from './OSContext';
import { 
  Terminal, 
  ArrowRight, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function OSEntryScreen() {
  const { enterWorkspace } = useOS();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        enterWorkspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enterWorkspace]);

  return (
    <div className={`os-entry-screen ${mounted ? 'active' : ''}`}>
      {/* Background Technical Grid & Glow */}
      <div className="os-entry-grid-overlay" />
      <div className="os-entry-scanline" />

      {/* Top Telematics Bar */}
      <header className="os-entry-header">
        <div className="os-entry-header-left">
          <div className="os-entry-pill">
            <span className="os-status-dot pulse" />
            <span className="os-entry-mono-tag">SYSTEM ONLINE</span>
          </div>
          <span className="os-entry-divider">/</span>
          <span className="os-entry-mono-sub">HOST: BLR-DC-01</span>
          <span className="os-entry-divider">/</span>
          <span className="os-entry-mono-sub">KERNEL: DARWIN_X86_64</span>
        </div>

        <div className="os-entry-header-right">
          <span className="os-entry-mono-sub">47/47 AUTOMATED TESTS PASSING</span>
          <span className="os-entry-divider">/</span>
          <span className="os-entry-mono-tag">BUILD 2.4.0-PROD</span>
        </div>
      </header>

      {/* Center Technical Hero Box */}
      <main className="os-entry-center-stage">
        <div className="os-entry-card">
          {/* Card Meta Header */}
          <div className="os-entry-card-meta">
            <div className="os-entry-card-meta-left">
              <span className="os-entry-subtle-badge">OPERATING SYSTEM ENVIRONMENT</span>
              <span className="os-entry-version">v2.4</span>
            </div>
            <div className="os-entry-card-meta-right">
              <span className="os-entry-mode-badge">INTERACTIVE WORKSPACE</span>
            </div>
          </div>

          {/* Major Title & System Name */}
          <div className="os-entry-brand-block">
            <h1 className="os-entry-title">BHUVAN.OS</h1>
            <div className="os-entry-system-badge">
              <span className="os-status-dot-static" />
              <span>SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Engineer Identity & Positioning */}
          <div className="os-entry-identity-block">
            <div className="os-entry-name">Bhuvan A B</div>
            <div className="os-entry-role">Software Engineer</div>
            <div className="os-entry-specialization">
              AI Systems <span className="dot-sep">•</span> Backend <span className="dot-sep">•</span> Full-Stack
            </div>
          </div>

          {/* Supporting Statement */}
          <p className="os-entry-statement">
            &ldquo;Building software systems where AI meets real-world workflows.&rdquo;
          </p>

          {/* Quick Metrics Bar */}
          <div className="os-entry-metrics-preview">
            <div className="os-entry-metric-item">
              <span className="os-entry-metric-val">33/33</span>
              <span className="os-entry-metric-key">Unit/Int Tests</span>
            </div>
            <div className="os-entry-metric-divider" />
            <div className="os-entry-metric-item">
              <span className="os-entry-metric-val">14</span>
              <span className="os-entry-metric-key">E2E Tests</span>
            </div>
            <div className="os-entry-metric-divider" />
            <div className="os-entry-metric-item">
              <span className="os-entry-metric-val">5.5×</span>
              <span className="os-entry-metric-key">Throughput Gain</span>
            </div>
            <div className="os-entry-metric-divider" />
            <div className="os-entry-metric-item">
              <span className="os-entry-metric-val">96.9%</span>
              <span className="os-entry-metric-key">Pricing Accuracy</span>
            </div>
          </div>

          {/* Primary & Secondary Interactions */}
          <div className="os-entry-actions">
            <button 
              id="enter-workspace-btn"
              className="os-entry-btn-primary"
              onClick={enterWorkspace}
              autoFocus
            >
              <span className="os-entry-btn-text">ENTER WORKSPACE</span>
              <span className="os-entry-btn-key">↵ ENTER</span>
            </button>

            <a 
              id="view-resume-btn"
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="os-entry-btn-secondary"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </a>
          </div>

          {/* Module Capabilities Bar */}
          <div className="os-entry-modules-bar">
            <span className="os-entry-mod-label">6 MODULES LOADED:</span>
            <span className="os-entry-mod-item">01 SYSTEM</span>
            <span className="os-entry-mod-item">02 FORGEIQ</span>
            <span className="os-entry-mod-item">03 ENGINEERING LAB</span>
            <span className="os-entry-mod-item">04 OPEN SOURCE</span>
            <span className="os-entry-mod-item">05 NOTES</span>
            <span className="os-entry-mod-item">06 PROFILE</span>
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
