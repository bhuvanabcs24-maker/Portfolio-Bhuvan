'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  BookOpen,
  GitBranch,
  Sparkles,
  Workflow,
  Compass,
  Zap,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const { personal, skills, problemSolving, projects, timeline } = PORTFOLIO_DATA;

  return (
    <div>
      {/* =========================================================================
          1. HERO SECTION — Recruiter-Optimized (15-Second Clarity)
          ========================================================================= */}
      <section id="hero" className="section" style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            {/* Status Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }} />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#93c5fd' }}>
                BMS College of Engineering (BMSCE) · Expected June 2028 · CGPA: 8.08
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Hi, I&apos;m <span style={{ color: '#60a5fa' }}>{personal.name}</span>.
              <br />
              <span style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Software Engineer building reliable backend systems & applied AI software.
              </span>
            </h1>

            {/* Narrative Progression Statement */}
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '2.25rem',
            }}>
              Computer Science student at BMSCE. Learned full-stack development, built practical systems, and became interested in production-oriented AI architectures. Builder of <strong>ForgeIQ</strong>—an AI manufacturing intelligence platform combining deterministic CAD geometry parsing, 40+ REST endpoints, and 47 automated tests. Deepening software engineering and AI systems craft.
            </p>

            {/* 6 Primary Recruiter CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <Link
                href="/forgeiq-case-study"
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.4rem' }}
              >
                <Zap size={17} />
                <span>Explore ForgeIQ Flagship</span>
              </Link>

              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.3rem' }}
              >
                <GithubIcon size={17} />
                <span>GitHub</span>
              </a>

              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.3rem' }}
              >
                <LinkedinIcon size={17} />
                <span>LinkedIn</span>
              </a>

              <a
                href={personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.3rem', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}
              >
                <LeetCodeIcon size={17} />
                <span>LeetCode (100+ Solved)</span>
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.3rem' }}
              >
                <FileText size={17} />
                <span>Resume (PDF)</span>
              </a>

              <Link
                href="/contact"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.3rem' }}
              >
                <Mail size={17} />
                <span>Contact</span>
              </Link>
            </div>

            {/* Credibility Micro-Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.75rem',
              alignItems: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: '#34d399' }} />
                <span>Zero Fabricated Claims</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: '#34d399' }} />
                <span>47 Automated Tests (Pytest + Playwright)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: '#34d399' }} />
                <span>96.9% Verified Pricing Benchmark</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ENGINEERING POSITIONING — Narrative Arc
          ========================================================================= */}
      <section id="positioning" style={{
        padding: '3.5rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
            <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
              Engineering Mindset
            </div>
            <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              How I Approach Software Engineering
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              I treat software systems as rigorous engineering artifacts rather than rapid prototype wrappers. My work prioritizes deterministic algorithms for ground truth, defense-in-depth error containment, and measurable system performance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            <div className="card" style={{ background: 'rgba(14, 20, 34, 0.6)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.4rem' }}>01 / ACADEMIC FOUNDATIONS</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Core CS & Data Structures</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Undergraduate study at BMSCE (CGPA: 8.08). Strong emphasis on Data Structures, Object-Oriented Design in C & Java, Relational Databases, and SQL querying.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(14, 20, 34, 0.6)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.4rem' }}>02 / PRACTICAL FULL-STACK</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Real-World Applications</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Built QWait Estimator—a zero-friction clinic queue telematics application utilizing Next.js, Supabase, and dynamic QR check-ins to solve waiting room congestion.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(14, 20, 34, 0.6)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', marginBottom: '0.4rem' }}>03 / SYSTEMS & APPLIED AI</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>ForgeIQ Architecture</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Engineered deterministic CAD feature parsing, 40+ FastAPI endpoints, and an end-to-end 9-stage order tracking pipeline. Optimized throughput 5.5x under load.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(14, 20, 34, 0.6)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.4rem' }}>04 / DEEPENING CRAFT</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Rigor & Open Software</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                100+ LeetCode algorithmic problems solved, standalone open-source geometry extractions (<code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>dxf-contour-extractor</code>), and technical deep-dives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FORGEIQ FLAGSHIP CENTERPIECE
          ========================================================================= */}
      <section id="forgeiq" className="section">
        <div className="container">
          <div className="card-elevated" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3b82f6, #10b981)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <span className="badge badge-emerald">Flagship Engineering Centerpiece</span>
                  <span className="badge badge-blue">Manufacturing Intelligence</span>
                </div>
                <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>
                  ForgeIQ
                </h2>
                <p style={{ fontSize: '1.15rem', color: '#93c5fd', fontWeight: 600 }}>
                  Automated CAD Geometry Parsing & Production Quotation Platform
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://github.com/bhuvanabcs24-maker/Forge-IQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <GithubIcon size={15} /> <span>View Repository</span>
                </a>
                <a
                  href="https://forge-iq-gold.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <ExternalLink size={15} /> <span>Live Demo</span>
                </a>
                <Link
                  href="/forgeiq-case-study"
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <span>5.5x Optimization Case Study</span> <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Problem / Solution Banner */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(8, 12, 22, 0.7)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <strong style={{ color: '#f87171', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  The Problem
                </strong>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  Manual sheet metal quotation takes hours of manual CAD polyline inspection, human drafting error calculations, and frequent pricing discrepancies across suppliers.
                </p>
              </div>
              <div>
                <strong style={{ color: '#34d399', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  The Engineering Solution
                </strong>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  Automated geometry extraction recovering closed boundaries from unlinked DXF primitives with spatial KD-Tree vertex snapping, coupled to parametric pricing formulas and a 9-stage tracking pipeline.
                </p>
              </div>
            </div>

            {/* 5 Evidence Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(8, 12, 20, 0.75)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '2.5rem'
            }}>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>96.9%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Pricing Accuracy</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Production benchmark test</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>40+</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>REST Endpoints</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FastAPI & JWT auth</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>9 Stages</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Production Pipeline</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RFQ → Cut → Dispatched</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#34d399' }}>5.5x</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Throughput Gain</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>860 → 4,589 req/s load test</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>33 + 14</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Automated Tests</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>33 Pytest + 14 Playwright</div>
              </div>
            </div>

            {/* 4 Architectural Core Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(14, 20, 34, 0.5)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.4rem' }}>1. CAD Feature Extraction Engine</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Deterministic extraction of 2D DXF contours, outer perimeters, holes, and bend allowances using <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>ezdxf</code> and KD-Tree vertex snapping. Avoids LLM numerical hallucination.
                </p>
              </div>

              <div style={{ background: 'rgba(14, 20, 34, 0.5)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.4rem' }}>2. Secure REST API (40+ Endpoints)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Engineered modular FastAPI microservices backed by PostgreSQL. Implemented JWT role-based access control, tenant isolation, strict Pydantic validation, and structured error handlers.
                </p>
              </div>

              <div style={{ background: 'rgba(14, 20, 34, 0.5)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.4rem' }}>3. Parametric Quotation Automation</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Parametric pricing calculations combining piercing counts, cutting tool travel, raw sheet utilization, and surface finishing rules. Achieved verified 96.9% accuracy on benchmark parts.
                </p>
              </div>

              <div style={{ background: 'rgba(14, 20, 34, 0.5)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.4rem' }}>4. 9-Stage Order State Machine</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  End-to-end multi-state tracking following physical manufacturing progress: RFQ → Quoted → Confirmed → Material allocated → Laser cut → Formed → Inspected → Dispatched.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Detailed technical post-mortem: 5.5x throughput gain, architecture, database schemas, and lessons.
              </span>
              <Link href="/forgeiq-case-study" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }}>
                <span>Read Full Flagship Case Study</span> <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SELECTED PROJECTS
          ========================================================================= */}
      <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
                Applied Implementations
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Selected Projects</h2>
              <p style={{ marginTop: '0.5rem', maxWidth: '600px', color: 'var(--text-secondary)' }}>
                Authentic software systems built and tested with verifiable codebases and automated test harnesses.
              </p>
            </div>
            <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#60a5fa', fontWeight: 600 }}>
              <span>View All Technical Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ENGINEERING CAPABILITIES — 6 Deep-Dive Artifact Hubs
          ========================================================================= */}
      <section id="capabilities" className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <div className="badge badge-purple" style={{ marginBottom: '0.65rem' }}>
              Deep Engineering Systems
            </div>
            <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Engineering Capabilities & Artifacts
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Dedicated technical sections documenting architectural trade-offs, evaluation benchmarks, reusable design patterns, iteration failures, modular open-source packages, and technical notes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* 1. ADRs */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-amber">14 Records</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Architecture</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Architectural Decisions (ADRs)
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  14 structured records analyzing real system trade-offs: PostgreSQL vs MongoDB, FastAPI concurrency, pgvector hybrid search, and deterministic geometry boundaries.
                </p>
              </div>
              <Link href="/engineering/decisions" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                <span>Browse 14 ADRs →</span>
              </Link>
            </div>

            {/* 2. Eval Lab */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-purple">8-Pillar Framework</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Systems</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  AI Evaluation Lab
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Measurement framework covering 7 physical failure modes, hallucination containment, schema enforcement, MRR@5 retrieval metrics, and latency/cost trade-offs.
                </p>
              </div>
              <Link href="/engineering/evaluation" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', color: '#d8b4fe', borderColor: 'rgba(168, 85, 247, 0.4)' }}>
                <span>Open Evaluation Lab →</span>
              </Link>
            </div>

            {/* 3. Patterns */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-emerald">5 Reusable Patterns</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Handbook</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Engineering Patterns
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Architectural handbook of 5 genuine patterns: AI Provider Factory, Deterministic Grounding, RBAC State Machine, Hybrid Search, and Heavy Worker Offload.
                </p>
              </div>
              <Link href="/engineering/patterns" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', color: '#6ee7b7', borderColor: 'rgba(52, 211, 153, 0.4)' }}>
                <span>Explore Patterns →</span>
              </Link>
            </div>

            {/* 4. Learnings */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-amber">6 Retrospectives</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Iteration Stories</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Engineering Learnings
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Honest retrospective: 6 stories detailing what was tried, what broke, why it was a problem, and the architectural shifts implemented in response.
                </p>
              </div>
              <Link href="/engineering/learnings" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', color: '#fcd34d', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                <span>Read 6 Stories →</span>
              </Link>
            </div>

            {/* 5. Open Source */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-emerald">Extracted Package</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modularity</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Open Source Hub
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Standalone Python package <code style={{ fontFamily: 'var(--font-mono)', color: '#34d399' }}>dxf-contour-extractor</code> (KD-Tree vertex snapping & cycle basis loop extraction) plus 3 decoupling roadmaps.
                </p>
              </div>
              <Link href="/opensource" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
                <span>Explore Packages →</span>
              </Link>
            </div>

            {/* 6. Writing */}
            <div className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-blue">Writing Hub</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technical Notes</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Technical Writing
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Technical writing hub with 6 topic filters and deep dives on CAD geometry parsing traps, safe AI system design, and manufacturing state orchestration.
                </p>
              </div>
              <Link href="/writing" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', color: '#60a5fa', borderColor: 'rgba(96, 165, 250, 0.4)' }}>
                <span>Read Technical Notes →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CAREER & LEARNING TIMELINE (2024–2027)
          ========================================================================= */}
      <section id="timeline" className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <div className="badge badge-amber" style={{ marginBottom: '0.65rem' }}>
              Growth & Trajectory
            </div>
            <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Career & Learning Timeline
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              A transparent view of how my skills evolved from core computer science foundations into full-stack systems, applied AI, and production engineering.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {timeline.map((item) => (
              <div 
                key={item.year}
                className="card" 
                style={{ 
                  background: 'rgba(14, 21, 37, 0.7)', 
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    color: item.year === '2026' ? '#34d399' : '#60a5fa',
                    marginBottom: '0.65rem'
                  }}>
                    <Clock size={16} />
                    <span>{item.year}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {item.badges.map((badge) => (
                    <span key={badge} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FEATURED TECHNICAL WRITING NOTE
          ========================================================================= */}
      <section id="writing" className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>
                Technical Writing Note
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Featured Article</h2>
            </div>
            <Link href="/writing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }}>
              <span>View All 5 Notes in Writing Hub</span> <ArrowRight size={15} />
            </Link>
          </div>

          <div className="card-elevated" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-emerald">Published Note</span>
                <span className="tech-tag tech-tag-blue">Manufacturing Technology</span>
                <span className="tech-tag tech-tag-blue">AI Engineering</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>12 min read · September 2026</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Why CAD Understanding Is Difficult for Manufacturing Automation
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF files requires graph math rather than generative AI. Explores KD-Tree vertex snapping to bridge drafting micro-gaps and deterministic piercing calculations.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Related component: <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>backend/services/cad_preprocessor.py</code>
              </div>
              <Link href="/writing/why-cad-understanding-is-difficult" className="btn btn-primary btn-sm" style={{ gap: '0.4rem' }}>
                <span>Read Full Note</span> <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FEATURED ENGINEERING LEARNING STORY
          ========================================================================= */}
      <section id="learnings" className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
                Iteration & System Retrospective
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Featured Engineering Learning</h2>
            </div>
            <Link href="/engineering/learnings" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 600, fontSize: '0.9rem' }}>
              <span>View All 6 Retrospective Stories</span> <ArrowRight size={15} />
            </Link>
          </div>

          <div className="card-elevated" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-amber">Story #1 · Concurrency Architecture</span>
                <span className="badge badge-emerald">5.5x Throughput</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FastAPI & ProcessPoolExecutor</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Moving Heavy CAD Geometry Math from Async Event Loops to Dedicated Worker Pools
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              <strong>What Happened:</strong> Under load testing, heavy 3D STEP B-Rep parsing blocked Python&apos;s single-threaded async event loop, causing API throughput to collapse at 860 req/s with latency spikes exceeding 3,000ms.
              <br />
              <strong>What Changed:</strong> Decoupled CPU-bound boundary math into a <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>ProcessPoolExecutor</code> with worker timeouts. Event loop stayed non-blocking, scaling throughput to <strong>4,589 req/s (5.5x gain)</strong>.
            </p>

            <Link href="/engineering/learnings#story-1" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem', color: '#fcd34d', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
              <span>Inspect Full Iteration Story</span> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LEETCODE & PROBLEM SOLVING + SOCIAL PROOF
          ========================================================================= */}
      <section id="leetcode" className="section">
        <div className="container">
          <div className="card-elevated" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.8), rgba(20, 16, 41, 0.85))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
                  Algorithmic Problem Solving
                </div>
                <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
                  100+ Problems Solved on LeetCode
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.6 }}>
                  Continuous practice across core algorithmic paradigms and data structures: Arrays, Two Pointers, Sliding Window, Trees, Graphs, and Dynamic Programming.
                </p>
              </div>

              <a
                href={problemSolving.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.5rem', backgroundColor: '#d97706', borderColor: '#b45309' }}
              >
                <LeetCodeIcon size={18} />
                <span>Verify LeetCode Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {problemSolving.topics.map((topic) => (
                <span key={topic} className="tech-tag tech-tag-purple" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                  {topic}
                </span>
              ))}
              <span className="tech-tag tech-tag-blue" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                Binary Search
              </span>
              <span className="tech-tag tech-tag-blue" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                Hash Tables
              </span>
              <span className="tech-tag tech-tag-blue" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                Breadth-First Search
              </span>
            </div>

            {/* Social Proof Channels Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(8, 12, 22, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <GithubIcon size={18} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>GitHub</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>github.com/bhuvanabcs24-maker</div>
                </div>
              </a>

              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(8, 12, 22, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <LinkedinIcon size={18} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>LinkedIn</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>linkedin.com/in/bhuvan-a-b...</div>
                </div>
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(8, 12, 22, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <FileText size={18} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Resume</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF (Verified Source of Truth)</div>
                </div>
              </a>

              <a
                href={`mailto:${personal.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(8, 12, 22, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Mail size={18} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Email</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{personal.email}</div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          10. RECRUITER CONTACT SECTION
          ========================================================================= */}
      <section id="contact" className="section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{
            maxWidth: '750px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(14, 21, 37, 0.5)',
            border: '1px solid var(--border-medium)'
          }}>
            <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              Let&apos;s Connect
            </div>
            <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Interested in discussing software engineering or systems architecture?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              I am open to software engineering internships and collaborative engineering discussions. Feel free to explore my code repositories or reach out directly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${personal.email}`}
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.8rem' }}
              >
                <Mail size={18} />
                <span>Send Email ({personal.email})</span>
              </a>
              <Link
                href="/contact"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.8rem' }}
              >
                <span>Contact Page</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
