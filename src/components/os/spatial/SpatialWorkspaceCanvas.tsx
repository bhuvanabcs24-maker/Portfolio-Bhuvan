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
  const { openWindow, setCommandPaletteOpen } = useOS();
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
      title: 'FORGEIQ',
      category: 'AI-POWERED MANUFACTURING',
      summary: 'Deterministic CAD parsing, automated pricing engine with 96.9% accuracy, and 9-stage production tracking.',
      tech: ['PYTHON', 'FASTAPI', 'NEXT.JS', 'POSTGRESQL', 'EZDXF', 'NETWORKX'],
      metrics: '33/33 Pytest • 14 E2E • 5.5× Throughput Gain',
      route: '/projects/forgeiq',
      position: 'center-large',
      depth: 1.2,
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
      summary: 'Bhuvan A B • BMS College of Engineering (Class of 2028, CGPA 8.08). 100+ solved algorithmic problems on LeetCode.',
      tech: ['FASTAPI', 'NEXT.JS', 'C', 'JAVA', 'PYTHON', 'SQL'],
      metrics: 'BMSCE 2028 • CGPA 8.08 • 100+ LeetCode',
      route: '/about',
      position: 'upper-left',
      depth: 0.85,
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

  return (
    <div className="os-spatial-workspace-container">
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

        {/* Dynamic Connected Vectors to Center Core */}
        <line 
          x1="50%" y1="50%" x2="22%" y2="25%" 
          stroke={hoveredModuleId === 'profile' ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'} 
          strokeWidth={hoveredModuleId === 'profile' ? 1.5 : 1}
          strokeDasharray={hoveredModuleId === 'profile' ? 'none' : '4 4'}
          className="os-vector-line"
        />
        <line 
          x1="50%" y1="50%" x2="78%" y2="25%" 
          stroke={hoveredModuleId === 'lab' ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'} 
          strokeWidth={hoveredModuleId === 'lab' ? 1.5 : 1}
          strokeDasharray={hoveredModuleId === 'lab' ? 'none' : '4 4'}
          className="os-vector-line"
        />
        <line 
          x1="50%" y1="50%" x2="22%" y2="78%" 
          stroke={hoveredModuleId === 'opensource' ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'} 
          strokeWidth={hoveredModuleId === 'opensource' ? 1.5 : 1}
          strokeDasharray={hoveredModuleId === 'opensource' ? 'none' : '4 4'}
          className="os-vector-line"
        />
        <line 
          x1="50%" y1="50%" x2="82%" y2="55%" 
          stroke={hoveredModuleId === 'notes' ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'} 
          strokeWidth={hoveredModuleId === 'notes' ? 1.5 : 1}
          strokeDasharray={hoveredModuleId === 'notes' ? 'none' : '4 4'}
          className="os-vector-line"
        />
        <line 
          x1="50%" y1="50%" x2="78%" y2="82%" 
          stroke={hoveredModuleId === 'contact' ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'} 
          strokeWidth={hoveredModuleId === 'contact' ? 1.5 : 1}
          strokeDasharray={hoveredModuleId === 'contact' ? 'none' : '4 4'}
          className="os-vector-line"
        />
      </svg>

      {/* 4. Asymmetric Spatial Modules Canvas */}
      <div className="os-spatial-canvas-grid">
        {spatialModules.map((mod) => {
          const isHovered = hoveredModuleId === mod.id;
          const px = mouseOffset.x * mod.depth * 4;
          const py = mouseOffset.y * mod.depth * 4;

          return (
            <div
              key={mod.id}
              className={`os-spatial-module os-spatial-pos-${mod.position} ${isHovered ? 'active' : ''}`}
              style={{
                transform: `translate3d(${px}px, ${py}px, 0)`,
              }}
              onMouseEnter={() => setHoveredModuleId(mod.id)}
              onMouseLeave={() => setHoveredModuleId(null)}
              onClick={() => router.push(mod.route)}
              data-cursor="open"
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

              {/* Summary Description */}
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
                  className="os-spatial-open-btn os-desktop-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openWindow(mod.id);
                  }}
                  data-cursor="open"
                  title={`Open ${mod.title} Window`}
                >
                  <span className="os-icon-mod-code">{mod.code}</span>
                  <span className="os-icon-label">{mod.title}</span>
                  <span className="os-spatial-btn-divider">•</span>
                  <span className="os-spatial-btn-open">OPEN</span>
                  <ArrowRight size={13} />
                </button>

                <Link
                  href={mod.route}
                  className="os-spatial-route-link"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="external"
                  title={`Navigate directly to ${mod.route}`}
                >
                  <span>FULL VIEW</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          );
        })}
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
