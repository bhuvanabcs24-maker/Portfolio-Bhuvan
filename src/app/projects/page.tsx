import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const metadata = {
  title: 'Projects | Bhuvan A B',
  description: 'Verified engineering implementations: ForgeIQ (AI-powered manufacturing intelligence) and QWait Estimator (clinical queue & wait-time management).',
};

export default function ProjectsPage() {
  const { projects } = PORTFOLIO_DATA;
  const forgeiq = projects.find((p) => p.id === 'forgeiq')!;
  const qwait = projects.find((p) => p.id === 'qwait')!;

  return (
    <div className="section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
            Verified Software Implementations
          </div>
          <h1>Technical Projects</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.65 }}>
            Systems built and tested with authentic engineering artifacts. Every architectural detail, test metric, and performance benchmark listed below is corroborated by active codebase repositories.
          </p>
        </div>

        {/* PROJECT #1: FORGEIQ */}
        <section id="forgeiq" style={{ marginBottom: '5rem' }}>
          <div className="card-elevated" style={{ padding: '2.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '0.65rem' }}>
                  Project #1 · Full-Stack & Systems
                </div>
                <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.03em' }}>{forgeiq.title}</h2>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-accent)', fontWeight: 600, marginTop: '0.25rem' }}>
                  {forgeiq.subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={forgeiq.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.45rem' }}
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
                <a
                  href={forgeiq.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.45rem' }}
                >
                  <ExternalLink size={16} />
                  <span>Visit Live Demo</span>
                </a>
                <Link
                  href="/forgeiq-case-study"
                  className="btn btn-emerald btn-sm"
                  style={{ gap: '0.45rem' }}
                >
                  <span>5.5x Optimization Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {forgeiq.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(8, 12, 20, 0.75)',
              border: '1px solid var(--border-subtle)',
            }}>
              {forgeiq.metrics.map((m) => (
                <div key={m.label}>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {m.label}
                  </div>
                  {m.detail && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {m.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Deep Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#93c5fd', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={18} />
                  <span>1. CAD Feature Parsing & Geometry Engine</span>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Implemented deterministic CAD parsing algorithms to extract 2D DXF contours, outer boundaries, hole diameters, bend allowances, and cutting perimeter lengths directly from vector drawings. Avoids relying on generative hallucination for physical engineering dimensions.
                </p>
              </div>

              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#93c5fd', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={18} />
                  <span>2. Secure REST API (40+ Endpoints)</span>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Engineered modular FastAPI microservices backed by PostgreSQL. Implemented JWT role-based access control, tenant isolation, strict pydantic schema validation, sliding-window rate limiting, and centralized structured error handling conforming to OpenAPI 3.1.
                </p>
              </div>

              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#93c5fd', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span>3. Pricing & Quotation Automation</span>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Engineered parametric quotation calculations combining piercing counts, cutting tool travel, raw sheet utilization, and surface finishing rules. Achieved a verified <strong>96.9% accuracy</strong> benchmark when evaluated against production shop-floor models.
                </p>
              </div>

              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#93c5fd', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span>4. 9-Stage Production Tracking Pipeline</span>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Developed an end-to-end multi-state tracking pipeline following manufacturing progress: RFQ received → CAD parsed → Quoted → Order confirmed → Material allocated → CNC laser cutting → Bending/Forming → Quality inspection → Dispatched. Provides real-time status updates via a customer portal.
                </p>
              </div>
            </div>

            {/* Test Harness & Reliability */}
            <div className="callout" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Test Automation & Verification Harness
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Every release is verified using a combined suite of <strong>33/33 pytest unit & integration tests</strong> covering CAD feature extractors and quotation logic, plus <strong>14 Playwright end-to-end tests</strong> covering buyer authentication, quotation generation, and order stage progression.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT #2: QWAIT ESTIMATOR */}
        <section id="qwait">
          <div className="card-elevated" style={{ padding: '2.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div className="badge badge-purple" style={{ marginBottom: '0.65rem' }}>
                  Project #2 · Full-Stack Web Application
                </div>
                <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.03em' }}>{qwait.title}</h2>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-accent)', fontWeight: 600, marginTop: '0.25rem' }}>
                  {qwait.subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={qwait.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.45rem' }}
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
              </div>
            </div>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {qwait.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(8, 12, 20, 0.75)',
              border: '1px solid var(--border-subtle)',
            }}>
              {qwait.metrics.map((m) => (
                <div key={m.label}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#a855f7' }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {m.label}
                  </div>
                  {m.detail && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {m.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Implementation details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#d8b4fe', marginBottom: '0.85rem' }}>
                  QR-Based Patient Check-in
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Eliminates physical reception congestion. Patients scan an on-site dynamic QR code to enter the virtual clinic queue without downloading a native mobile app. A persistent queue ticket provides live position updates directly in their browser.
                </p>
              </div>

              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#d8b4fe', marginBottom: '0.85rem' }}>
                  Doctor & Staff Operational Dashboard
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Built administrative interfaces enabling clinic physicians and desk staff to advance patient tickets, track average consultation durations, flag emergency consultations, and inspect room load in real-time.
                </p>
              </div>

              <div className="card" style={{ background: 'rgba(14, 20, 34, 0.5)' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#d8b4fe', marginBottom: '0.85rem' }}>
                  Interactive Venue Mapping & Wait Estimation
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Integrated spatial venue floorplans showing examination rooms, diagnostic labs, and waiting lounges. Dynamic wait-time calculations compute expected consultation delays based on current queue depth and ongoing visit durations.
                </p>
              </div>
            </div>

            {/* Integrity note */}
            <div className="callout callout-emerald">
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Strict Verification Note
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                In accordance with my resume and source of truth principles, this project is documented strictly based on working code architecture. No unverified clinic counts, patient volumes, or revenue claims are made.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
