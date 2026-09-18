import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  GitBranch, 
  FileCode, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const metadata = {
  title: 'Engineering Philosophy & Principles | Bhuvan A B',
  description: 'Technical principles, deterministic vs probabilistic design, testing discipline, and API architecture by Bhuvan A B.',
};

export default function EngineeringPage() {
  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.65rem' }}>
            Technical Discipline & Practices
          </div>
          <h1>Engineering Philosophy</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.65 }}>
            Principles that guide how I architect systems, write tests, separate concerns between deterministic code and AI models, and optimize performance.
          </p>
        </div>

        {/* Principle 1 */}
        <article className="card-elevated" style={{ marginBottom: '2.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#60a5fa',
              fontWeight: 800,
            }}>
              01
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>
              Deterministic Foundations Over Probabilistic Guesses
            </h2>
          </div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Modern AI is powerful for unstructured semantic understanding, synthesis, and exploratory interaction. However, in engineering and transactional workflows (such as CAD manufacturing geometry, pricing formulas, and healthcare queue states), relying on probabilistic language models introduces severe hallucination risks.
          </p>
          <div className="callout" style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Rule in Practice:</strong>
            <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
              In <strong>ForgeIQ</strong>, physical dimensions, cutting contours, and part pricing are calculated purely with deterministic vector parsing (Python/ezdxf) and mathematical formulas (achieving 96.9% benchmark accuracy). AI is strictly isolated to NLP tasks like extracting customer notes or RFQ metadata.
            </p>
          </div>
        </article>

        {/* Principle 2 */}
        <article className="card-elevated" style={{ marginBottom: '2.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              fontWeight: 800,
            }}>
              02
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>
              Rigorous Test Discipline Over &quot;It Works on My Machine&quot;
            </h2>
          </div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Code without automated verification is technical debt waiting to explode. A robust test suite allows fearless refactoring, ensures edge cases in algorithmic logic are preserved, and validates that optimizations do not break system correctness.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div className="card" style={{ background: 'rgba(8, 12, 20, 0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Terminal size={16} />
                <span>Unit & Integration (Pytest)</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                33 automated unit tests validating CAD entity parsing, bounding box limits, piercing counters, and edge-case exceptions.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(8, 12, 20, 0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, marginBottom: '0.4rem' }}>
                <CheckCircle2 size={16} />
                <span>End-to-End Browser (Playwright)</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                14 automated Playwright browser tests validating buyer sign-in, multi-file uploads, real-time calculation renders, and order status transitions.
              </p>
            </div>
          </div>
        </article>

        {/* Principle 3 */}
        <article className="card-elevated" style={{ marginBottom: '2.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
              fontWeight: 800,
            }}>
              03
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>
              Explicit API Contracts & Type Safety
            </h2>
          </div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            System boundaries should be explicitly defined with schemas and types, eliminating silent runtime errors. By using Pydantic schemas in FastAPI and TypeScript interfaces on the frontend, data structures are validated at compile time and runtime boundaries.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span><strong>OpenAPI 3.1 Documentation:</strong> Over 40+ endpoints cleanly documented with explicit request and response models.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span><strong>Fail-Fast Validation:</strong> Invalid payloads or malformed vector coordinates are rejected at the edge before hitting business logic.</span>
            </li>
          </ul>
        </article>

        {/* Principle 4 */}
        <article className="card-elevated" style={{ marginBottom: '3.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              fontWeight: 800,
            }}>
              04
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>
              Data-Driven Profiling & Evidence-Based Optimization
            </h2>
          </div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Premature optimization is wasteful, but profiling under load is essential. Rather than assuming where latency lies, I measure real query execution times, inspect database query plans (`EXPLAIN ANALYZE`), and stress-test endpoints under concurrency.
          </p>
          <div className="callout callout-emerald">
            <strong style={{ color: 'var(--text-primary)' }}>Verified Optimization Result:</strong>
            <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
              Profiling ForgeIQ under a continuous 50-client load test isolated N+1 roundtrips and event-loop thread contention. Systematic database indexing and process-pool offloading increased throughput by <strong>5.5x</strong> (from 860 to 4,589 req/sec) and lowered p95 latency from 58.1 ms to 10.9 ms.
            </p>
          </div>
        </article>

        {/* Navigation Footer */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/forgeiq-case-study" className="btn btn-secondary">
            <span>Read ForgeIQ Case Study</span>
          </Link>
          <Link href="/notes" className="btn btn-primary">
            <span>Explore Technical Notes</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
