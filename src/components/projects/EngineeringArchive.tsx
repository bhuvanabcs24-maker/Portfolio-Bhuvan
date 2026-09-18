'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  QrCode, 
  Users, 
  Clock, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  ChevronRight, 
  X, 
  Maximize2,
  FileCode,
  Sparkles,
  GitBranch,
  Database,
  Search
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

// Types for Engineering Artifacts
export interface EngineeringArtifact {
  id: 'forgeiq' | 'qwait';
  projectId: string; // e.g. "PROJECT 01", "PROJECT 02"
  system: string;
  status: string;
  badgeColor: string;
  accentColor: string;
  accentGlow: string;
  stack: string[];
  problem: string;
  result: string;
  solution: string;
  architecture: {
    layers: { name: string; description: string; tech: string }[];
    dataFlow: string[];
  };
  features: {
    title: string;
    description: string;
    tag: string;
    metricsOrDetail?: string;
  }[];
  technology: {
    category: string;
    items: string[];
  }[];
  githubUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  interactiveSystemUrl?: string;
}

// Data definitions adhering strictly to verified resume facts (NO invented clinics/revenue/users)
const ARTIFACTS: EngineeringArtifact[] = [
  {
    id: 'forgeiq',
    projectId: 'PROJECT 01',
    system: 'MANUFACTURING INTELLIGENCE SYSTEM',
    status: 'PRODUCTION ARTIFACT // DEPLOYED & TESTED',
    badgeColor: '#f59e0b',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    stack: ['Next.js 14', 'FastAPI', 'Python (ezdxf, NetworkX)', 'PostgreSQL', 'TailwindCSS', 'Pytest', 'Playwright'],
    problem: 'Custom sheet-metal manufacturing quotes traditionally require 2–4 days of manual CAD geometry extraction and manual shop-floor rate lookups. Human estimation is prone to calculation drift, dimensional oversight, and costly quoting backlogs.',
    result: 'Engineered an end-to-end intelligence system achieving 96.9% quotation accuracy against shop-floor production models, 5.5× throughput speedup under concurrent load (860 → 4,589 req/s), 40+ secure REST endpoints, and automated reliability verified by 47 automated tests (33 pytest + 14 Playwright).',
    solution: 'Designed a dual-core architecture: a deterministic Python CAD computational geometry parser that extracts cutting contours, piercing counts, and bend lengths directly from 2D vector drawings without generative hallucination, coupled with an automated pricing engine and 9-stage order tracking pipeline.',
    architecture: {
      layers: [
        { name: 'Deterministic CAD Parser', description: 'Extracts 2D DXF vector contours, entity loops, hole diameters, and bend lines using ezdxf & NetworkX graph cycle algorithms.', tech: 'Python / ezdxf / NetworkX' },
        { name: 'Core Microservices API', description: '40+ REST endpoints with OpenAPI 3.1 schema validation, JWT role-based access control, and sliding-window rate limiting.', tech: 'FastAPI / Pydantic / PostgreSQL' },
        { name: 'Parametric Quotation Engine', description: 'Laser cutting travel time, piercing wear, sheet utilization algorithms yielding verified 96.9% quotation accuracy.', tech: 'Python / Async Workers' },
        { name: '9-Stage Production Pipeline', description: 'End-to-end lifecycle tracking: RFQ Ingest → CAD Analysis → Quoting → Confirmed → Laser → Bending → QA → Dispatched.', tech: 'PostgreSQL / Next.js / Supabase' }
      ],
      dataFlow: [
        'Buyer uploads DXF / DWG vector drawing',
        'Deterministic engine parses 2D geometry loops & bend lines',
        'Parametric rules compute cut duration & material yield',
        'Instant quotation generated (96.9% verified benchmark)',
        'Order moves across 9 verifiable production stages'
      ]
    },
    features: [
      {
        title: 'Deterministic CAD Feature Parsing',
        description: 'Direct vector boundary extraction, inner hole identification, and cut perimeter calculation eliminating generative dimensional hallucinations.',
        tag: 'GEOMETRY ENGINE',
        metricsOrDetail: '100% Vector Precision'
      },
      {
        title: 'Secure REST API (40+ Endpoints)',
        description: 'Comprehensive API surface with strict Pydantic contract validation, tenant isolation, and standardized RFC 7807 error envelopes.',
        tag: 'API CONTRACTS',
        metricsOrDetail: '40+ Endpoints'
      },
      {
        title: 'Parametric Pricing Automation',
        description: 'Mathematical cost modeling accounting for laser pierce cycles, contour linear inches, machine wear, and material density.',
        tag: 'AUTOMATION',
        metricsOrDetail: '96.9% Accuracy Benchmark'
      },
      {
        title: '9-Stage Production State Machine',
        description: 'Granular status progression tracking parts from RFQ submission through laser cutting, forming, quality inspection, and dispatch.',
        tag: 'PIPELINE',
        metricsOrDetail: '9 Monitored Stages'
      },
      {
        title: '5.5x Throughput Optimization',
        description: 'Refactored async database connection pooling, query batching, and index restructuring to increase load capacity from 860 to 4,589 req/s.',
        tag: 'PERFORMANCE',
        metricsOrDetail: '5.5x Load Improvement'
      }
    ],
    technology: [
      { category: 'Computational Core', items: ['Python 3.11', 'FastAPI', 'ezdxf', 'NetworkX', 'NumPy'] },
      { category: 'Persistence & Services', items: ['PostgreSQL', 'SQLAlchemy', 'Pydantic v2', 'JWT Auth'] },
      { category: 'Frontend Interface', items: ['Next.js 14', 'React 18', 'TypeScript', 'TailwindCSS', 'Canvas API'] },
      { category: 'Test & Verification Harness', items: ['33 Pytest Unit/Integration', '14 Playwright E2E Tests', 'Locust Load Suite'] }
    ],
    githubUrl: 'https://github.com/bhuvanabcs24-maker/Forge-IQ',
    liveUrl: 'https://forge-iq-gold.vercel.app',
    caseStudyUrl: '/forgeiq-case-study',
    interactiveSystemUrl: '/projects/forgeiq'
  },
  {
    id: 'qwait',
    projectId: 'PROJECT 02',
    system: 'QUEUE MANAGEMENT SYSTEM',
    status: 'PRODUCTION ARTIFACT // RESUME VERIFIED',
    badgeColor: '#10b981',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
    stack: ['Next.js / React', 'Supabase Realtime', 'TypeScript', 'TailwindCSS', 'Dynamic QR Engine', 'Canvas Spatial Mapping'],
    problem: 'Physical waiting rooms in clinical environments suffer from physical check-in bottlenecks at the reception counter, zero transparency for waiting patients regarding actual consultation wait-times, and disorientation navigating complex clinical floorplans.',
    result: 'Built an interactive queue management system featuring zero-friction dynamic QR check-in (no app download required), real-time ticket telematics subscribed to live database channels, dynamic wait-time estimation computed from queue depth and visit durations, responsive multi-role doctor & staff dashboards, and spatial venue mapping for clinic floor navigation.',
    solution: 'Engineered a real-time web application leveraging dynamic QR ingestion to spawn ephemeral queue tickets, synchronized via WebSocket push events to doctor and nurse consoles. Implemented rolling wait-time calculation based on active consultation pacing and an interactive SVG/Canvas venue floorplan for patient routing.',
    architecture: {
      layers: [
        { name: 'Dynamic QR Ingestion Gateway', description: 'Generates location-bound and department-specific QR codes enabling instant patient check-in via any mobile browser without native app installation.', tech: 'Next.js / QR Code Engine' },
        { name: 'Real-Time State Synchronization', description: 'WebSocket-powered bi-directional event bus streaming ticket status, room assignments, and queue state changes instantly.', tech: 'Supabase Realtime / PostgreSQL RLS' },
        { name: 'Wait-Time Estimation Engine', description: 'Mathematical estimation combining active queue depth, average practitioner consultation durations, and department throughput velocity.', tech: 'TypeScript / Reactive State' },
        { name: 'Multi-Role Staff & Doctor Console', description: 'Role-gated operational dashboard for triage nurses and consulting physicians to call next ticket, mark in-consultation, and route emergencies.', tech: 'Next.js / React Hooks' },
        { name: 'Spatial Venue Mapping Module', description: 'Interactive floorplan mapping depicting waiting zones, examination rooms, and diagnostic facilities to orient waiting patients.', tech: 'Canvas / SVG Floorplan' }
      ],
      dataFlow: [
        'Patient scans on-premise dynamic QR code',
        'System issues ephemeral queue ticket & registers arrival',
        'Live queue position & estimated wait time stream to patient UI',
        'Staff & doctor dashboard displays queue order & patient triage status',
        'Practitioner calls ticket; venue map highlights designated consultation room'
      ]
    },
    features: [
      {
        title: 'QR CHECK-IN',
        description: 'Zero-friction patient arrival registration. Scanning an on-site dynamic QR code immediately enters the visitor into the virtual queue without requiring an app store download or login account.',
        tag: 'VERIFIED RESUME FEATURE',
        metricsOrDetail: 'Zero-App Install Flow'
      },
      {
        title: 'LIVE QUEUE TRACKING',
        description: 'Persistent real-time queue ticket view updated via WebSockets. Patients monitor their exact position in line and receive immediate notifications when their consultation approaches.',
        tag: 'VERIFIED RESUME FEATURE',
        metricsOrDetail: 'Real-Time WebSocket Sync'
      },
      {
        title: 'WAIT-TIME ESTIMATION',
        description: 'Algorithmic wait-time calculation computing expected delay dynamically based on live queue depth, practitioner pace, and ongoing visit durations.',
        tag: 'VERIFIED RESUME FEATURE',
        metricsOrDetail: 'Dynamic Duration Model'
      },
      {
        title: 'STAFF DASHBOARD',
        description: 'Comprehensive operational console for clinical staff and physicians to manage incoming queue tickets, reassign rooms, flag triage priorities, and monitor department throughput.',
        tag: 'VERIFIED RESUME FEATURE',
        metricsOrDetail: 'Multi-Role Staff/Doctor View'
      },
      {
        title: 'VENUE MAPPING',
        description: 'Interactive spatial venue floorplan that provides visual guidance to waiting patients, mapping exam rooms, triage desks, diagnostic labs, and designated waiting lounges.',
        tag: 'VERIFIED RESUME FEATURE',
        metricsOrDetail: 'Interactive Spatial Floorplan'
      }
    ],
    technology: [
      { category: 'Frontend Architecture', items: ['Next.js 14', 'React', 'TypeScript', 'TailwindCSS / CSS Modules'] },
      { category: 'Realtime & Backend', items: ['Supabase Realtime', 'PostgreSQL', 'Row-Level Security (RLS)'] },
      { category: 'Telematics & Spatial', items: ['Dynamic QR Code Generation', 'SVG / Canvas Venue Mapping', 'Web Audio Beeps'] },
      { category: 'Verification & Quality', items: ['Role-Based Route Guards', 'Multi-tenant Isolation', 'Strict Schema Contracts'] }
    ],
    githubUrl: 'https://github.com/bhuvanabcs24-maker/QueueEstimater'
  }
];

export default function EngineeringArchive() {
  const [selectedArtifact, setSelectedArtifact] = useState<EngineeringArtifact | null>(null);
  const [hoveredArtifact, setHoveredArtifact] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'SYSTEMS' | 'FULL-STACK'>('ALL');
  const [simulatedQueueTick, setSimulatedQueueTick] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'architecture' | 'features' | 'technology'>('features');
  
  // Listen for hash in URL (e.g. #qwait or #forgeiq) to open modal automatically
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'qwait') {
        setSelectedArtifact(ARTIFACTS.find(a => a.id === 'qwait') || null);
      } else if (hash === 'forgeiq') {
        setSelectedArtifact(ARTIFACTS.find(a => a.id === 'forgeiq') || null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard accessibility: Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtifact(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle live simulation for QWait technical preview
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedQueueTick((prev) => (prev % 5) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const filteredArtifacts = ARTIFACTS.filter(a => {
    if (filter === 'SYSTEMS') return a.id === 'forgeiq';
    if (filter === 'FULL-STACK') return a.id === 'qwait';
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#07090e', color: '#f1f5f9', position: 'relative' }}>
      
      {/* Background Architectural Grid Pattern */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0
        }}
      />

      {/* Top Header / Breadcrumb Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(7, 9, 14, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-secondary, #94a3b8)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              padding: '0.3rem 0.65rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={13} />
            <span>RETURN TO BHUVAN.OS</span>
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            ENGINEERING ARCHIVE
          </span>
          <span style={{ 
            fontSize: '0.7rem', 
            color: 'rgba(255, 255, 255, 0.4)', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.15rem 0.45rem',
            borderRadius: '3px'
          }}>
            SYSTEM REPOSITORY
          </span>
        </div>

        {/* Status Indicators & View Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: 'rgba(0,0,0,0.4)', padding: '0.2rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
            {(['ALL', 'SYSTEMS', 'FULL-STACK'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                style={{
                  background: filter === mode ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                  color: filter === mode ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                  border: filter === mode ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid transparent',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#10b981' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>ARCHIVE ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Engineering Archive Space */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1360px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* Archive Title Block */}
        <div style={{ marginBottom: '4.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '2.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            letterSpacing: '0.12em', 
            color: '#f59e0b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase'
          }}>
            <Terminal size={14} />
            <span>PRIMARY SYSTEM CATALOGUE // 2026</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.035em', 
            lineHeight: 1.05,
            color: '#f8fafc',
            margin: '0.25rem 0 1rem'
          }}>
            ENGINEERING ARCHIVE
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', 
            color: 'var(--text-secondary, #94a3b8)', 
            maxWidth: '820px', 
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            Verified engineering implementations presented as production artifacts. Every specification, performance benchmark, and feature documented below is anchored strictly in verifiable repository source code.
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1.5rem', 
            marginTop: '1.75rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            color: 'rgba(255, 255, 255, 0.45)' 
          }}>
            <div>TOTAL ARTIFACTS: <span style={{ color: '#f1f5f9', fontWeight: 600 }}>02</span></div>
            <div>VERIFICATION: <span style={{ color: '#10b981', fontWeight: 600 }}>SOURCE CODE INSPECTED</span></div>
            <div>STATUS: <span style={{ color: '#f59e0b', fontWeight: 600 }}>NO UNCORROBORATED CLAIMS</span></div>
          </div>
        </div>

        {/* Spatial / Vertical Artifact Arrangement (NO conventional 3 cards in a row!) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {filteredArtifacts.map((artifact, index) => {
            const isHovered = hoveredArtifact === artifact.id;
            const isForgeIQ = artifact.id === 'forgeiq';

            return (
              <article
                key={artifact.id}
                id={artifact.id}
                onMouseEnter={() => setHoveredArtifact(artifact.id)}
                onMouseLeave={() => setHoveredArtifact(null)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedArtifact(artifact);
                  }
                }}
                style={{
                  position: 'relative',
                  backgroundColor: 'rgba(11, 14, 21, 0.85)',
                  border: isHovered 
                    ? `1px solid ${artifact.accentColor}` 
                    : '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '8px',
                  boxShadow: isHovered 
                    ? `0 20px 50px -10px ${artifact.accentGlow}, 0 0 0 1px ${artifact.accentColor}` 
                    : '0 8px 30px rgba(0, 0, 0, 0.5)',
                  padding: 'clamp(1.5rem, 3.5vw, 3rem)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedArtifact(artifact)}
              >
                {/* Visual Corner Markers / Technical Crosshairs */}
                <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: `2px solid ${artifact.accentColor}`, borderLeft: `2px solid ${artifact.accentColor}` }} />
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '10px', height: '10px', borderTop: `2px solid ${artifact.accentColor}`, borderRight: `2px solid ${artifact.accentColor}` }} />
                <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '10px', height: '10px', borderBottom: `2px solid ${artifact.accentColor}`, borderLeft: `2px solid ${artifact.accentColor}` }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: `2px solid ${artifact.accentColor}`, borderRight: `2px solid ${artifact.accentColor}` }} />

                {/* Top Meta Bar */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem', 
                  marginBottom: '1.75rem', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingBottom: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ 
                      color: artifact.accentColor, 
                      fontWeight: 800, 
                      letterSpacing: '0.1em',
                      backgroundColor: `rgba(${artifact.id === 'forgeiq' ? '245, 158, 11' : '16, 185, 129'}, 0.12)`,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '3px',
                      border: `1px solid ${artifact.accentColor}`
                    }}>
                      {artifact.projectId}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>//</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.08em' }}>
                      REF: {artifact.id.toUpperCase()}-2026-ARCHIVE
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      color: artifact.accentColor,
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      letterSpacing: '0.05em'
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: artifact.accentColor }} />
                      {artifact.status}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtifact(artifact);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f1f5f9',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = artifact.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                    >
                      <span>INSPECT ARTIFACT</span>
                      <Maximize2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Primary Content Grid: Asymmetric Layout with Left Telematics and Right Dynamic Preview */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: 'clamp(2rem, 4vw, 3.5rem)',
                  alignItems: 'stretch'
                }}>
                  
                  {/* Left Column: Core Engineering Spec */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* SYSTEM Header */}
                      <div style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.75rem', 
                        color: artifact.accentColor, 
                        letterSpacing: '0.12em', 
                        marginBottom: '0.4rem',
                        fontWeight: 700
                      }}>
                        SYSTEM IDENTIFICATION
                      </div>

                      <h2 style={{ 
                        fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', 
                        fontWeight: 800, 
                        letterSpacing: '-0.025em', 
                        color: '#ffffff',
                        margin: '0 0 0.5rem',
                        lineHeight: 1.15
                      }}>
                        {artifact.id === 'qwait' ? 'QWAIT ESTIMATOR' : 'FORGEIQ'}
                      </h2>

                      <div style={{ 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: 'rgba(255, 255, 255, 0.85)', 
                        letterSpacing: '0.04em',
                        marginBottom: '1.75rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {artifact.system}
                      </div>

                      {/* PROBLEM & RESULT Specification Panels */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                        
                        {/* PROBLEM */}
                        <div style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.35)', 
                          border: '1px solid rgba(255, 255, 255, 0.07)', 
                          borderRadius: '6px', 
                          padding: '1.1rem' 
                        }}>
                          <div style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.7rem', 
                            color: '#ef4444', 
                            letterSpacing: '0.1em', 
                            fontWeight: 700, 
                            marginBottom: '0.35rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            <span style={{ width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
                            PROBLEM FORMULATION
                          </div>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0 }}>
                            {artifact.problem}
                          </p>
                        </div>

                        {/* RESULT */}
                        <div style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.35)', 
                          border: `1px solid ${artifact.id === 'forgeiq' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`, 
                          borderRadius: '6px', 
                          padding: '1.1rem' 
                        }}>
                          <div style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.7rem', 
                            color: artifact.accentColor, 
                            letterSpacing: '0.1em', 
                            fontWeight: 700, 
                            marginBottom: '0.35rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            <CheckCircle2 size={12} />
                            RESULT // MEASURED BENCHMARK
                          </div>
                          <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                            {artifact.result}
                          </p>
                        </div>

                      </div>

                      {/* STACK Pills */}
                      <div>
                        <div style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.7rem', 
                          color: 'rgba(255, 255, 255, 0.4)', 
                          letterSpacing: '0.08em', 
                          marginBottom: '0.6rem' 
                        }}>
                          ENGINEERING STACK
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                          {artifact.stack.map((item) => (
                            <span
                              key={item}
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.73rem',
                                color: 'rgba(255, 255, 255, 0.75)',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '3px'
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ 
                      marginTop: '2rem', 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.85rem',
                      alignItems: 'center'
                    }}>
                      <a
                        href={artifact.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          padding: '0.55rem 1.1rem',
                          borderRadius: '5px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.borderColor = artifact.accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        }}
                      >
                        <GithubIcon size={15} />
                        <span>Inspect GitHub Repository</span>
                        <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
                      </a>

                      {artifact.interactiveSystemUrl && (
                        <Link
                          href={artifact.interactiveSystemUrl}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: 'rgba(245, 158, 11, 0.12)',
                            border: '1px solid rgba(245, 158, 11, 0.35)',
                            color: '#f59e0b',
                            padding: '0.55rem 1.1rem',
                            borderRadius: '5px',
                            fontSize: '0.82rem',
                            fontFamily: 'var(--font-mono)',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
                        >
                          <Cpu size={14} />
                          <span>Launch System World</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtifact(artifact);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: artifact.accentColor,
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.55rem 0.5rem'
                        }}
                      >
                        <span>View Full Artifact Documentation</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Unique Large Visual Composition & Technical Hover Preview */}
                  <div style={{
                    backgroundColor: 'rgba(6, 8, 13, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '6px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '380px'
                  }}>
                    
                    {/* Visual Identity Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.08em' }}>
                        TECHNICAL PREVIEW // {isForgeIQ ? 'CAD GEOMETRY RADAR' : 'QUEUE TELEMATICS'}
                      </span>
                      <span style={{ 
                        color: isHovered ? artifact.accentColor : 'rgba(255, 255, 255, 0.3)', 
                        transition: 'color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <Activity size={12} />
                        {isHovered ? 'REACTIVE PREVIEW ACTIVE' : 'HOVER TO EXPAND PREVIEW'}
                      </span>
                    </div>

                    {/* PROJECT 01 VISUAL: FORGEIQ CAD GEOMETRY & REST PIPELINE */}
                    {isForgeIQ && (
                      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        
                        {/* Interactive CAD Drawing Plane */}
                        <div style={{
                          height: '180px',
                          border: '1px dashed rgba(245, 158, 11, 0.25)',
                          backgroundColor: 'rgba(245, 158, 11, 0.03)',
                          borderRadius: '4px',
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                        }}>
                          {/* CAD Grid Lines */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                            opacity: 0.7
                          }} />

                          {/* Vector Contour Polygon */}
                          <svg width="220" height="130" viewBox="0 0 220 130" style={{ position: 'relative', zIndex: 2 }}>
                            {/* Outer cut boundary */}
                            <polygon 
                              points="20,20 160,20 200,60 200,110 20,110" 
                              fill="none" 
                              stroke="#f59e0b" 
                              strokeWidth={isHovered ? '2.5' : '1.75'}
                              strokeDasharray={isHovered ? 'none' : '4 2'}
                            />
                            {/* Inner hole contours */}
                            <circle cx="60" cy="65" r="14" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1.5" />
                            <circle cx="130" cy="65" r="14" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1.5" />
                            {/* Bend Lines */}
                            <line x1="160" y1="20" x2="160" y2="110" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
                            
                            {/* Dimension indicators */}
                            <text x="75" y="15" fill="#f59e0b" fontSize="9" fontFamily="monospace">W: 180.00mm</text>
                            <text x="25" y="70" fill="#06b6d4" fontSize="9" fontFamily="monospace">BEND 90°</text>
                          </svg>

                          <div style={{
                            position: 'absolute',
                            bottom: '6px',
                            right: '8px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#f59e0b',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '0.15rem 0.4rem',
                            borderRadius: '2px'
                          }}>
                            DETERMINISTIC DXF PARSER
                          </div>
                        </div>

                        {/* Metric Barometer */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#f59e0b' }}>96.9%</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.45)' }}>QUOTING ACCURACY</div>
                          </div>
                          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>40+</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.45)' }}>REST ENDPOINTS</div>
                          </div>
                          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>5.5x</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.45)' }}>THROUGHPUT GAIN</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PROJECT 02 VISUAL: QWAIT QUEUE TELEMATICS & 5 VERIFIED RESUME FEATURES */}
                    {!isForgeIQ && (
                      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        
                        {/* Live Queue Flow & Telematics Display */}
                        <div style={{
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          backgroundColor: 'rgba(16, 185, 129, 0.03)',
                          borderRadius: '4px',
                          padding: '1rem',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                        }}>
                          
                          {/* Live Queue Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>
                              <QrCode size={14} />
                              <span>QR CHECK-IN // TICKET STREAM</span>
                            </div>
                            <span style={{ 
                              fontFamily: 'var(--font-mono)', 
                              fontSize: '0.65rem', 
                              backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                              color: '#10b981',
                              padding: '0.15rem 0.45rem',
                              borderRadius: '3px'
                            }}>
                              WEBSOCKET LIVE
                            </span>
                          </div>

                          {/* Simulated Queue Tickets */}
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                            {[
                              { ticket: 'Q-101', status: 'IN CONSULT', room: 'ROOM 01', current: simulatedQueueTick === 1 },
                              { ticket: 'Q-102', status: 'NEXT UP', room: 'ROOM 02', current: simulatedQueueTick === 2 },
                              { ticket: 'Q-103', status: 'WAITING (3m)', room: 'LOUNGE', current: simulatedQueueTick === 3 }
                            ].map((t) => (
                              <div
                                key={t.ticket}
                                style={{
                                  flex: 1,
                                  backgroundColor: t.current ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                  border: t.current ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.06)',
                                  borderRadius: '4px',
                                  padding: '0.5rem',
                                  textAlign: 'center'
                                }}
                              >
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: t.current ? '#10b981' : '#f1f5f9' }}>
                                  {t.ticket}
                                </div>
                                <div style={{ fontSize: '0.62rem', color: t.current ? '#34d399' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
                                  {t.status}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Wait Time Estimation Barometer */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '0.5rem 0.75rem', 
                            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}>
                              <Clock size={12} color="#10b981" />
                              <span>ESTIMATED WAIT DURATION:</span>
                            </div>
                            <span style={{ color: '#10b981', fontWeight: 700 }}>~8-12 MINS (DYNAMIC)</span>
                          </div>

                        </div>

                        {/* Verified 5 Features Ticker */}
                        <div style={{ marginTop: '0.85rem' }}>
                          <div style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.65rem', 
                            color: 'rgba(255, 255, 255, 0.4)', 
                            marginBottom: '0.35rem', 
                            letterSpacing: '0.08em' 
                          }}>
                            VERIFIED CORE CAPABILITIES (RESUME-SUPPORTED)
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {['QR CHECK-IN', 'LIVE QUEUE TRACKING', 'WAIT-TIME ESTIMATION', 'STAFF DASHBOARD', 'VENUE MAPPING'].map((f) => (
                              <span
                                key={f}
                                style={{
                                  fontSize: '0.65rem',
                                  fontFamily: 'var(--font-mono)',
                                  padding: '0.2rem 0.45rem',
                                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                  border: '1px solid rgba(16, 185, 129, 0.25)',
                                  color: '#34d399',
                                  borderRadius: '3px'
                                }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Bottom Technical Preview Status */}
                    <div style={{ 
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
                      paddingTop: '0.85rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'rgba(255, 255, 255, 0.4)'
                    }}>
                      <span>CLICK TO EXPAND FULL SPEC</span>
                      <span style={{ color: artifact.accentColor }}>STATUS: VERIFIED</span>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* ==========================================================
          DETAILED ARTIFACT INSPECTION VIEW (MODAL / FULL-SPEC OVERLAY)
          Displays: Problem, Solution, Architecture, Features, Technology, GitHub
          ========================================================== */}
      {selectedArtifact && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={`Detailed specification for ${selectedArtifact.system}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedArtifact(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: `1px solid ${selectedArtifact.accentColor}`,
              borderRadius: '8px',
              boxShadow: `0 25px 60px -15px ${selectedArtifact.accentGlow}, 0 0 0 1px ${selectedArtifact.accentColor}`,
              width: '100%',
              maxWidth: '960px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ 
                  color: selectedArtifact.accentColor, 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  backgroundColor: `rgba(${selectedArtifact.id === 'forgeiq' ? '245, 158, 11' : '16, 185, 129'}, 0.15)`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px'
                }}>
                  {selectedArtifact.projectId}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>//</span>
                <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem' }}>
                  {selectedArtifact.id === 'qwait' ? 'QWAIT ESTIMATOR' : 'FORGEIQ'}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                  [{selectedArtifact.system}]
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a
                  href={selectedArtifact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#f8fafc',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedArtifact(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px'
                  }}
                  aria-label="Close artifact specification"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Spec Content Body */}
            <div style={{ padding: '2rem 1.75rem' }}>
              
              {/* Navigation Tabs inside Modal */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.75rem',
                marginBottom: '1.75rem',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}>
                {(['features', 'problem', 'solution', 'architecture', 'technology'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? `rgba(${selectedArtifact.id === 'forgeiq' ? '245, 158, 11' : '16, 185, 129'}, 0.15)` : 'transparent',
                      color: activeTab === tab ? selectedArtifact.accentColor : 'rgba(255, 255, 255, 0.5)',
                      border: activeTab === tab ? `1px solid ${selectedArtifact.accentColor}` : '1px solid transparent',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: activeTab === tab ? 700 : 500,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB 1: FEATURES (Focus on QWait's 5 verified features or ForgeIQ modules) */}
              {activeTab === 'features' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: selectedArtifact.accentColor, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    ENGINEERING CAPABILITIES // VERIFIED SPECIFICATIONS
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '1.25rem', fontWeight: 700 }}>
                    {selectedArtifact.id === 'qwait' ? '5 Core Queue Telematics Features' : 'ForgeIQ Architecture Modules'}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {selectedArtifact.features.map((feat) => (
                      <div
                        key={feat.title}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          borderRadius: '6px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                          <span style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.65rem', 
                            color: selectedArtifact.accentColor,
                            backgroundColor: `rgba(${selectedArtifact.id === 'forgeiq' ? '245, 158, 11' : '16, 185, 129'}, 0.1)`,
                            padding: '0.15rem 0.4rem',
                            borderRadius: '2px'
                          }}>
                            {feat.tag}
                          </span>
                          {feat.metricsOrDetail && (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                              {feat.metricsOrDetail}
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: '0.4rem 0 0.5rem' }}>
                          {feat.title}
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.55, margin: 0 }}>
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {selectedArtifact.id === 'qwait' && (
                    <div style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(16, 185, 129, 0.06)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#94a3b8'
                    }}>
                      <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.25rem' }}>
                        RESUME-SUPPORTED INTEGRITY STATEMENT
                      </div>
                      QWait Estimator is presented strictly on verified code implementation facts: QR check-in, live queue tracking, wait-time estimation, staff dashboard, and venue mapping. In accordance with portfolio truthfulness principles, no artificial user volumes, clinic adoption statistics, traffic metrics, or commercial revenue figures are claimed.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PROBLEM */}
              {activeTab === 'problem' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ef4444', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    TECHNICAL PROBLEM STATEMENT
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '1rem', fontWeight: 700 }}>
                    The Failure Mode Being Solved
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '6px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{ fontSize: '0.98rem', color: '#f1f5f9', lineHeight: 1.7, margin: 0 }}>
                      {selectedArtifact.problem}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary, #94a3b8)',
                    lineHeight: 1.6
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
                      ENGINEERING IMPLICATION
                    </div>
                    {selectedArtifact.id === 'qwait'
                      ? 'In healthcare settings, waiting room uncertainty leads to anxiety, physical congestion around receptionist desks, and misallocated clinical room capacity. A deterministic, web-native queue telematics system removes friction and gives patients live transparency without downloading specialized software.'
                      : 'In precision sheet-metal job shops, quoting delays cause customers to seek alternative suppliers. Using manual spreadsheets or hallucinating generative AI leads to either underbidding and margin loss or overpricing and rejected orders.'}
                  </div>
                </div>
              )}

              {/* TAB 3: SOLUTION */}
              {activeTab === 'solution' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: selectedArtifact.accentColor, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    ENGINEERING SOLUTION ARCHITECTURE
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '1rem', fontWeight: 700 }}>
                    The Technical Approach Implemented
                  </h3>

                  <div style={{
                    backgroundColor: `rgba(${selectedArtifact.id === 'forgeiq' ? '245, 158, 11' : '16, 185, 129'}, 0.05)`,
                    border: `1px solid ${selectedArtifact.accentColor}`,
                    borderRadius: '6px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{ fontSize: '0.98rem', color: '#f1f5f9', lineHeight: 1.7, margin: 0 }}>
                      {selectedArtifact.solution}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '6px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: selectedArtifact.accentColor, marginBottom: '0.5rem' }}>
                      RESULTING BENCHMARK
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                      {selectedArtifact.result}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: ARCHITECTURE */}
              {activeTab === 'architecture' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: selectedArtifact.accentColor, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    SYSTEM LAYERS & DATA FLOW
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '1.25rem', fontWeight: 700 }}>
                    Modular Architectural Breakdown
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                    {selectedArtifact.architecture.layers.map((layer, idx) => (
                      <div
                        key={layer.name}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          borderRadius: '6px',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ maxWidth: '650px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                            <span style={{ 
                              fontFamily: 'var(--font-mono)', 
                              fontSize: '0.7rem', 
                              color: selectedArtifact.accentColor,
                              fontWeight: 700
                            }}>
                              LAYER 0{idx + 1}
                            </span>
                            <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>
                              {layer.name}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                            {layer.description}
                          </p>
                        </div>

                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: selectedArtifact.accentColor,
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          {layer.tech}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Flow Steps */}
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.85rem', letterSpacing: '0.08em' }}>
                      DATA FLOW SEQUENCE
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {selectedArtifact.architecture.dataFlow.map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)' }}>
                          <span style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.7rem', 
                            color: selectedArtifact.accentColor,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%'
                          }}>
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TECHNOLOGY */}
              {activeTab === 'technology' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: selectedArtifact.accentColor, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    TECH STACK & DEPENDENCY HARNESS
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '1.25rem', fontWeight: 700 }}>
                    Verified Technology Libraries
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {selectedArtifact.technology.map((grp) => (
                      <div
                        key={grp.category}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          borderRadius: '6px',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: selectedArtifact.accentColor, fontWeight: 700, marginBottom: '0.75rem' }}>
                          {grp.category}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {grp.items.map((item) => (
                            <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                              <span style={{ width: '4px', height: '4px', backgroundColor: selectedArtifact.accentColor, borderRadius: '50%' }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links Bar */}
              <div style={{ 
                marginTop: '2.5rem', 
                paddingTop: '1.5rem', 
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={selectedArtifact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                      padding: '0.6rem 1.25rem',
                      borderRadius: '5px',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <GithubIcon size={16} />
                    <span>Open GitHub Repository</span>
                    <ExternalLink size={13} />
                  </a>

                  {selectedArtifact.interactiveSystemUrl && (
                    <Link
                      href={selectedArtifact.interactiveSystemUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        color: '#f59e0b',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '5px',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      <Cpu size={15} />
                      <span>Launch ForgeIQ System World</span>
                    </Link>
                  )}

                  {selectedArtifact.caseStudyUrl && (
                    <Link
                      href={selectedArtifact.caseStudyUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#cbd5e1',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '5px',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Read 5.5x Optimization Case Study</span>
                    </Link>
                  )}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
