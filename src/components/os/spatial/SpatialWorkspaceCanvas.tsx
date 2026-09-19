'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOS, AppId } from '../OSContext';
import { 
  Zap, 
  Cpu, 
  Package, 
  BookOpen, 
  User, 
  Mail, 
  Terminal, 
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Command,
  Clock,
  Award,
  FileDown
} from 'lucide-react';
import { TechnicalLabel, InteractiveNode } from '../visual';

interface SpatialModule {
  id: AppId;
  code: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  metrics?: string;
  route: string;
  position: 'center-large' | 'upper-right' | 'lower-left' | 'far-right' | 'upper-left' | 'bottom-right';
  depth: number; // For parallax offset
  color: string;
}

export default function SpatialWorkspaceCanvas() {
  const router = useRouter();
  const { openWindow, openWindowWithTransition, setCommandPaletteOpen } = useOS();
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const isParallaxEnabled = useRef(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      isParallaxEnabled.current = false;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseTarget.current = {
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let rafId: number;
    const updateParallax = () => {
      setMouseOffset((prev) => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.05,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.05,
      }));
      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const spatialModules: SpatialModule[] = [
    {
      id: 'forgeiq',
      code: '02',
      title: 'PROJECTS',
      category: 'FEATURED PRODUCTION SYSTEMS',
      summary: 'Autonomous AI manufacturing intelligence & shop-floor commerce OS alongside real-time queue wait estimation.',
      tech: ['FORGEIQ', 'QUEUE ESTIMATOR', 'FASTAPI', 'POSTGRESQL', 'AI AGENTS'],
      metrics: 'ForgeIQ (Autonomous Manufacturing OS) • QWait (M/M/c Queueing)',
      route: '/projects',
      position: 'upper-left',
      depth: 0.85,
      color: '#f59e0b',
    },
    {
      id: 'lab',
      code: '03',
      title: 'ENGINEERING LAB',
      category: 'SYSTEM DESIGN & ARCHITECTURE',
      summary: '10 Architecture Decision Records (ADRs), 8-dimension AI verification framework, and 4 failure retrospectives.',
      tech: ['ADRS', 'AI EVALUATION', 'PATTERNS', 'RETROSPECTIVES'],
      metrics: '10 ADRs • 8 Dimensions • 4 System Patterns',
      route: '/engineering',
      position: 'upper-right',
      depth: 0.8,
      color: '#a855f7',
    },
    {
      id: 'opensource',
      code: '04',
      title: 'OPEN SOURCE',
      category: 'DXF CONTOUR EXTRACTOR',
      summary: 'Automated 2D CAD closed contour parsing and geometric validation pipeline.',
      tech: ['PYTHON', 'NETWORKX', 'SCIPY', 'GEOMETRY'],
      metrics: 'Deterministic Extraction • Graph G(V, E)',
      route: '/opensource',
      position: 'lower-left',
      depth: 0.9,
      color: '#06b6d4',
    },
    {
      id: 'notes',
      code: '05',
      title: 'NOTES',
      category: 'TECHNICAL WRITING & RESEARCH',
      summary: 'In-depth engineering articles on CAD geometry interpretation, LLM guardrails, and deterministic state machines.',
      tech: ['CAD PARSING', 'AI SYSTEMS', 'BACKEND'],
      metrics: 'Editorial Engineering Documentation',
      route: '/writing',
      position: 'far-right',
      depth: 0.7,
      color: '#38bdf8',
    },
    {
      id: 'profile',
      code: '06',
      title: 'PROFILE',
      category: 'SOFTWARE ENGINEER // ACADEMICS',
      summary: 'Bhuvan A B • BMS College of Engineering (B.E. CSE, Class of 2028, CGPA 8.08). 100+ solved algorithmic problems on LeetCode across core DSA.',
      tech: ['FASTAPI', 'NEXT.JS', 'PYTHON', 'POSTGRESQL', 'C', 'JAVA', 'SQL'],
      metrics: 'BMSCE 2028 • CGPA 8.08 • 100+ LeetCode Solved',
      route: '/about',
      position: 'center-large',
      depth: 1.2,
      color: '#10b981',
    },
    {
      id: 'contact',
      code: '07',
      title: 'CONTACT',
      category: 'COMMUNICATION DISPATCHER',
      summary: 'Minimal direct dispatch terminal connecting to Email, LinkedIn, GitHub, and LeetCode profiles.',
      tech: ['EMAIL', 'LINKEDIN', 'GITHUB', 'LEETCODE'],
      metrics: 'bhuvanab.cs24@bmsce.ac.in • +91 78290 23129',
      route: '/contact',
      position: 'bottom-right',
      depth: 1.0,
      color: '#ec4899',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [vectorCoords, setVectorCoords] = useState<Record<string, { x1: number | string; y1: number | string; x2: number | string; y2: number | string }>>({});

  const updateVectors = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const centerMod = spatialModules.find(m => m.position === 'center-large') || spatialModules[4];
    const centerEl = cardRefs.current[centerMod.id];
    if (!centerEl) return;
    const pRect = centerEl.getBoundingClientRect();

    const newCoords: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {};
    
    spatialModules.forEach((mod) => {
      if (mod.id === centerMod.id) return;
      const targetEl = cardRefs.current[mod.id];
      if (!targetEl) return;
      const tRect = targetEl.getBoundingClientRect();
      const isLeft = mod.position === 'upper-left' || mod.position === 'lower-left';

      // Left modules connect from center left edge to target right edge
      // Right modules connect from center right edge to target left edge
      const x1 = isLeft ? pRect.left - cRect.left : pRect.right - cRect.left;
      const y1 = pRect.top + pRect.height / 2 - cRect.top;
      const x2 = isLeft ? tRect.right - cRect.left : tRect.left - cRect.left;
      const y2 = tRect.top + tRect.height / 2 - cRect.top;

      newCoords[mod.id] = { x1, y1, x2, y2 };
    });

    setVectorCoords(newCoords);
  };

  useEffect(() => {
    updateVectors();
    const t = setTimeout(updateVectors, 120);
    window.addEventListener('resize', updateVectors);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateVectors);
    };
  }, []);

  const renderModuleCard = (mod: SpatialModule) => {
    const isHovered = hoveredModuleId === mod.id;
    const isProjectsCard = mod.id === 'forgeiq';
    const px = mouseOffset.x * mod.depth * 3;
    const py = mouseOffset.y * mod.depth * 3;

    return (
      <div
        key={mod.id}
        ref={(el) => { cardRefs.current[mod.id] = el; }}
        className={`os-spatial-module os-spatial-pos-${mod.position} ${isHovered ? 'active' : ''}`}
        style={{
          transform: `translate3d(${px}px, ${py}px, 0)`,
        }}
        onMouseEnter={() => setHoveredModuleId(mod.id)}
        onMouseLeave={() => setHoveredModuleId(null)}
        onClick={() => router.push(mod.route)}
      >
        {/* Corner Registration Mark */}
        <div className="os-spatial-corner-tl" />
        <div className="os-spatial-corner-br" />

        {/* Module Header */}
        <div className="os-spatial-mod-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
            <span className="os-spatial-mod-code">{mod.code}</span>
            <h3 className="os-spatial-mod-title">{mod.title}</h3>
          </div>
          <span className="os-spatial-mod-badge">SYS_MOD</span>
        </div>

        {/* Category / Discipline */}
        <div className="os-spatial-mod-cat">{mod.category}</div>

        {/* Special Projects Card content housing ForgeIQ + Queue Estimator */}
        {isProjectsCard ? (
          <div className="os-spatial-projects-list">
            {/* Sub-Project 1: ForgeIQ */}
            <div className="os-spatial-subproject-card">
              <div className="os-spatial-subproject-head">
                <div className="os-spatial-subproject-title-group">
                  <span className="os-spatial-project-dot" style={{ background: '#3b82f6' }} />
                  <span className="os-spatial-subproject-name">ForgeIQ (Flagship)</span>
                </div>
                <span className="os-spatial-subproject-pill">AI COMMERCE OS</span>
              </div>
              <p className="os-spatial-subproject-desc">
                Autonomous AI manufacturing intelligence & commerce OS: 7-stage order lifecycle, 2-sec quoter, deterministic physical models, 40+ REST endpoints, and 5.5× throughput optimization.
              </p>
              <div className="os-spatial-mod-tech" style={{ marginBottom: '0.45rem' }}>
                <span className="os-spatial-tech-tag">FASTAPI</span>
                <span className="os-spatial-tech-tag">AI AGENTS</span>
                <span className="os-spatial-tech-tag">NEXT.JS</span>
                <span className="os-spatial-tech-tag">POSTGRESQL</span>
                <span className="os-spatial-tech-tag">PHYSICAL MODELS</span>
              </div>
              <div className="os-spatial-subproject-actions">
                <button
                  className="os-spatial-launch-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    openWindowWithTransition('forgeiq', 'entry-forgeiq', 'ForgeIQ Flagship');
                  }}
                  title="Open ForgeIQ Window"
                >
                  <Zap size={13} />
                  <span>Open Window</span>
                </button>
                <Link
                  href="/forgeiq-case-study"
                  className="os-spatial-route-link"
                  onClick={(e) => e.stopPropagation()}
                  title="View ForgeIQ Case Study"
                >
                  <span>Case Study</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </div>

            {/* Sub-Project 2: Queue Estimator */}
            <div className="os-spatial-subproject-card">
              <div className="os-spatial-subproject-head">
                <div className="os-spatial-subproject-title-group">
                  <span className="os-spatial-project-dot" style={{ background: '#10b981' }} />
                  <span className="os-spatial-subproject-name">Queue Estimator (QWait)</span>
                </div>
                <span className="os-spatial-subproject-pill" style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)' }}>M/M/c QUEUEING</span>
              </div>
              <p className="os-spatial-subproject-desc">
                Real-time patient queue wait-time estimation system modeling Poisson arrivals and dynamic capacity scaling.
              </p>
              <div className="os-spatial-mod-tech" style={{ marginBottom: '0.45rem' }}>
                <span className="os-spatial-tech-tag">PYTHON</span>
                <span className="os-spatial-tech-tag">FASTAPI</span>
                <span className="os-spatial-tech-tag">QUEUES</span>
                <span className="os-spatial-tech-tag">ANALYTICS</span>
              </div>
              <div className="os-spatial-subproject-actions">
                <button
                  className="os-spatial-launch-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    openWindow('qwait');
                  }}
                  title="Open QWait Telematics Window"
                >
                  <Clock size={13} />
                  <span>Open Window</span>
                </button>
                <Link
                  href="/projects/qwait"
                  className="os-spatial-route-link"
                  onClick={(e) => e.stopPropagation()}
                  title="Inspect QWait Architecture"
                >
                  <span>Inspect</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Standard Module Body */}
            <p className="os-spatial-mod-desc">{mod.summary}</p>

            {/* Tech Stack Pills */}
            <div className="os-spatial-mod-tech">
              {mod.tech.map((t, idx) => (
                <span key={idx} className="os-spatial-tech-tag">{t}</span>
              ))}
            </div>

            {/* Verified Metrics Footnote */}
            {mod.metrics && (
              <div className="os-spatial-mod-metrics">
                <span>{mod.metrics}</span>
              </div>
            )}

            {/* Dual Action: Window Launch or Full-Screen System Environment */}
            <div className="os-spatial-mod-actions">
              <button
                className="os-spatial-launch-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const transitionMap: Record<string, import('../TransitionOverlay').TransitionType> = {
                    lab: 'entry-lab',
                    profile: 'entry-profile',
                  };
                  const txType = transitionMap[mod.id] ?? 'entry-default';
                  openWindowWithTransition(mod.id, txType, mod.title);
                }}
                title={`Open ${mod.title} Window`}
              >
                <span>Open Window</span>
                <ArrowRight size={12} />
              </button>

              <Link
                href={mod.route}
                className="os-spatial-route-link"
                onClick={(e) => e.stopPropagation()}
                title={`Navigate directly to ${mod.route}`}
              >
                <span>FULL VIEW</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="os-spatial-workspace-container" ref={containerRef}>
      {/* 1. Left Telemetry Rail */}
      <div className="os-spatial-rail os-spatial-rail-left">
        <span className="os-rail-tag">SYS.GEO // 12.9716° N, 77.5946° E</span>
        <span className="os-rail-divider" />
        <span className="os-rail-tag">KERNEL: DARWIN_X86_64</span>
        <span className="os-rail-divider" />
        <span className="os-rail-tag">TOPOLOGY: MESH_06</span>
      </div>

      {/* 2. Right Telemetry Rail */}
      <div className="os-spatial-rail os-spatial-rail-right">
        <span className="os-rail-tag">SYSTEM: ONLINE</span>
        <span className="os-rail-divider" />
        <span className="os-rail-tag">INTERACTION: READY</span>
        <span className="os-rail-divider" />
        <span className="os-rail-tag">BUILD: 2026</span>
      </div>

      {/* 3. Interactive SVG Vector Transmission Lines */}
      <svg 
        className="os-spatial-vectors-svg"
        width="100%" 
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vectorGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.05)" />
          </linearGradient>
        </defs>

        {/* Dynamic Connected Vectors from Center Core to Surrounding Modules */}
        {([
          { id: 'forgeiq', defaultCoords: { x1: '37%', y1: '50%', x2: '28%', y2: '22%' } },
          { id: 'opensource', defaultCoords: { x1: '37%', y1: '50%', x2: '28%', y2: '58%' } },
          { id: 'lab', defaultCoords: { x1: '63%', y1: '50%', x2: '72%', y2: '20%' } },
          { id: 'notes', defaultCoords: { x1: '63%', y1: '50%', x2: '72%', y2: '48%' } },
          { id: 'contact', defaultCoords: { x1: '63%', y1: '50%', x2: '72%', y2: '76%' } },
        ] as const).map(({ id, defaultCoords }) => {
          const coords = vectorCoords[id] || defaultCoords;
          const isHovered = hoveredModuleId === id;
          return (
            <g key={id}>
              <line 
                x1={coords.x1} 
                y1={coords.y1} 
                x2={coords.x2} 
                y2={coords.y2} 
                stroke={isHovered ? '#f59e0b' : 'rgba(255, 255, 255, 0.07)'} 
                strokeWidth={isHovered ? 1.75 : 1}
                strokeDasharray={isHovered ? 'none' : '4 4'}
                className="os-vector-line"
              />
              {isHovered && typeof coords.x2 === 'number' && typeof coords.y2 === 'number' && (
                <>
                  <circle cx={coords.x1} cy={coords.y1} r={3} fill="#f59e0b" />
                  <circle cx={coords.x2} cy={coords.y2} r={3.5} fill="#f59e0b" />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* 4. Balanced 3-Column Spatial Modules Canvas */}
      <div className="os-spatial-canvas-grid">
        {/* Left Column: Projects (02) & Open Source (04) */}
        <div className="os-spatial-column os-spatial-column-left">
          {spatialModules
            .filter((m) => m.id === 'forgeiq' || m.id === 'opensource')
            .map((mod) => renderModuleCard(mod))}
        </div>

        {/* Center Column: Profile (06) */}
        <div className="os-spatial-column os-spatial-column-center">
          {spatialModules
            .filter((m) => m.id === 'profile')
            .map((mod) => renderModuleCard(mod))}
        </div>

        {/* Right Column: Engineering Lab (03), Notes (05), Contact (07) */}
        <div className="os-spatial-column os-spatial-column-right">
          {spatialModules
            .filter((m) => m.id === 'lab' || m.id === 'notes' || m.id === 'contact')
            .map((mod) => renderModuleCard(mod))}
        </div>
      </div>

      {/* 5. Bottom Command Palette Bar & Status Bar */}
      <footer className="os-spatial-bottom-bar">
        <div className="os-spatial-bottom-left">
          <button
            className="os-spatial-cmd-btn"
            onClick={() => setCommandPaletteOpen(true)}
            data-cursor="pointer"
            title="Open Command Palette (Cmd + K)"
          >
            <Command size={14} />
            <span>COMMAND PALETTE</span>
            <span className="os-spatial-key-pill">⌘K</span>
          </button>
        </div>

        <div className="os-spatial-bottom-center">
          <span className="os-spatial-status-item">
            <span className="os-status-pulse-dot" />
            <span>SYSTEM ONLINE</span>
          </span>
          <span className="os-spatial-divider">|</span>
          <span className="os-spatial-status-item">INTERACTION READY</span>
          <span className="os-spatial-divider">|</span>
          <span className="os-spatial-status-item">BUILD 2026</span>
        </div>

        {/* Secondary Modules Quick Links (Terminal/Specs/Certs/Resume) */}
        <div className="os-spatial-bottom-right">
          <button
            className="os-spatial-helper-btn os-desktop-icon"
            onClick={() => openWindow('system')}
            data-cursor="open"
            title="System Diagnostics & Terminal"
          >
            <Terminal size={12} />
            <span className="os-icon-mod-code">01</span>
            <span className="os-icon-label">SYSTEM</span>
          </button>

          <button
            className="os-spatial-helper-btn os-desktop-icon"
            onClick={() => openWindow('qwait')}
            data-cursor="open"
            title="QWait Queue Estimator"
          >
            <Clock size={12} />
            <span className="os-icon-mod-code">08</span>
            <span className="os-icon-label">QWAIT</span>
          </button>

          <button
            className="os-spatial-helper-btn os-desktop-icon"
            onClick={() => openWindow('certifications')}
            data-cursor="open"
            title="Verified Industry Certifications"
          >
            <Award size={12} />
            <span className="os-icon-mod-code">09</span>
            <span className="os-icon-label">CERTS</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="os-spatial-helper-btn os-desktop-icon"
            data-cursor="external"
            title="Download Official Resume PDF"
          >
            <FileDown size={12} />
            <span className="os-icon-mod-code">DOC</span>
            <span className="os-icon-label">RESUME.PDF</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
