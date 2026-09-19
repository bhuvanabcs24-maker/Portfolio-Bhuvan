import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Cpu, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Zap, 
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import ForgeIQSystemMap from '@/components/ForgeIQSystemMap';
import EngineeringEvidenceDashboard from '@/components/EngineeringEvidenceDashboard';

export const metadata = {
  title: 'ForgeIQ Engineering Case Study | Autonomous AI Manufacturing OS',
  description: 'In-depth case study of ForgeIQ: autonomous AI manufacturing intelligence & commerce OS, deterministic physical models, 40+ REST API endpoints, 96.9% AI accuracy, and 5.5x throughput load-test optimization.',
};

export default function ForgeIQCaseStudyPage() {
  const forgeiq = PORTFOLIO_DATA.projects.find((p) => p.id === 'forgeiq')!;

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Breadcrumb / Back link */}
        <Link
          href="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        {/* Title Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
            Systems & Performance Case Study
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Engineering ForgeIQ: Autonomous AI Manufacturing Intelligence & Commerce OS
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-accent)', fontWeight: 600, marginBottom: '1.25rem' }}>
            How a deterministic-first hybrid architecture, multi-agent AI orchestration, and database optimization delivered 96.9% quotation accuracy, 100% zero numerical hallucinations, and 5.5x throughput scaling.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div><strong>Author:</strong> Bhuvan A B (CS & Engineering Student, BMSCE)</div>
            <div><strong>Stack:</strong> Python 3.11, FastAPI, Next.js 15, PostgreSQL 18, AI Agents</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={forgeiq.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <GithubIcon size={14} /> GitHub Repo
              </a>
              <a href={forgeiq.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* Verified Metrics Summary Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(14, 20, 34, 0.8)',
          border: '1px solid var(--border-strong)',
          marginBottom: '3.5rem',
        }}>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>96.9%</div>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Accuracy</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>100% Zero Hallucinations</div>
          </div>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#34d399' }}>5.5x</div>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>Throughput Gain</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>860 → 4,589 req/s under load test</div>
          </div>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#a855f7' }}>40+</div>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>REST Endpoints</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>OpenAPI 3.1 & JWT / RBAC</div>
          </div>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>109 + 22</div>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>Automated Tests</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>109 Pytest + 22 Playwright E2E</div>
          </div>
        </div>

        {/* Section 1: The Problem */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            1. Problem Context: Manufacturing Quotation Friction
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            In precision sheet metal fabrication and CNC machining, generating purchase quotations from raw technical drawings typically requires manual engineering reviews. Estimators must manually calculate cutting perimeter length, internal piercing counts, material sheet utilization, and machine setup times across different alloys (SS304, AL6061, Mild Steel).
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            A common temptation in modern AI projects is to feed CAD drawing images into vision LLMs. However, LLMs are fundamentally probabilistic and prone to hallucinating dimensions, resulting in catastrophic pricing inaccuracies for physical manufacturing parts.
          </p>
        </section>

        {/* Section 2: Deterministic Architecture */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            2. Architectural Decision: Deterministic CAD Parsing vs. AI
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            To guarantee physical precision, ForgeIQ separates deterministic geometric computation from language processing:
          </p>

          <div style={{
            background: 'rgba(8, 12, 20, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            color: '#cbd5e1'
          }}>
            <div style={{ color: '#93c5fd', fontWeight: 600, marginBottom: '0.5rem' }}>// Deterministic Pipeline Separation:</div>
            <div>[DXF / Vector File] ──&gt; Python Geometry Engine (ezdxf)</div>
            <div style={{ paddingLeft: '2rem', color: '#6ee7b7' }}>├── Deterministic Contour Traversal (Outer Bound Box)</div>
            <div style={{ paddingLeft: '2rem', color: '#6ee7b7' }}>├── Exact Piercing Counts (Holes, Slots, Cutouts)</div>
            <div style={{ paddingLeft: '2rem', color: '#6ee7b7' }}>└── Total Cutting Path Length (mm) &amp; Sheet Density</div>
            <div>[NLP &amp; Context Layer] ──&gt; Buyer RFQ &amp; Spec Extraction (Materials, Finish, Tolerance)</div>
            <div>[Pricing Formula Engine] ──&gt; Parametric Cost Model (96.9% Accuracy Verified)</div>
          </div>

          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            By constraining vector extraction to deterministic mathematical geometry, the system eliminated geometric hallucination while retaining NLP strictly for unstructured RFQ notes and material requirements.
          </p>

          {/* Interactive Topology System Map */}
          <ForgeIQSystemMap />
        </section>

        {/* Section 3: REST API Design */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            3. Backend Architecture: 40+ Secure REST Endpoints
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            The backend is built with FastAPI and PostgreSQL, exposing over 40 structured REST endpoints documented via OpenAPI 3.1. Key implementation highlights include:
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', lineHeight: 1.6 }}>
              <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span><strong>JWT Authentication & Tenant Isolation:</strong> Scoped claims separating buyer roles from manufacturer estimators, ensuring multi-tenant data privacy.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', lineHeight: 1.6 }}>
              <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span><strong>Sliding-Window Rate Limiting:</strong> In-memory and Redis-backed middleware protecting expensive geometric computation endpoints from denial-of-service spikes.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', lineHeight: 1.6 }}>
              <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span><strong>9-Stage Production Tracking Pipeline:</strong> State machine managing: RFQ Received → Geometry Parsed → Quotation Generated → Order Confirmed → Material Reserved → Laser Cutting → Bending → Quality Inspection → Dispatched.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Performance Optimization Case Study */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            4. Performance Optimization: 5.5x Throughput Improvement
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            During automated concurrency load testing simulating 50 active workstations submitting simultaneous quotation and order tracking requests, baseline performance saturated:
          </p>

          {/* Benchmark Comparison Table */}
          <div className="table-container" style={{ marginBottom: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Benchmark Metric</th>
                  <th>Baseline (Before)</th>
                  <th>Optimized (After)</th>
                  <th>Net Gain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>System Throughput</strong></td>
                  <td>860 req/sec</td>
                  <td style={{ color: '#6ee7b7', fontWeight: 700 }}>4,589 req/sec</td>
                  <td><span className="badge badge-emerald">5.5x (+433.6%)</span></td>
                </tr>
                <tr>
                  <td><strong>End-to-End p95 Latency</strong></td>
                  <td>58.1 ms</td>
                  <td style={{ color: '#6ee7b7', fontWeight: 700 }}>10.9 ms</td>
                  <td><span className="badge badge-blue">-81.2% reduction</span></td>
                </tr>
                <tr>
                  <td><strong>p99 Spike Latency</strong></td>
                  <td>380 ms</td>
                  <td style={{ color: '#6ee7b7', fontWeight: 700 }}>24.2 ms</td>
                  <td><span className="badge badge-emerald">-93.6% reduction</span></td>
                </tr>
                <tr>
                  <td><strong>Concurrent Workstations</strong></td>
                  <td>50 clients</td>
                  <td style={{ color: '#6ee7b7', fontWeight: 700 }}>50 clients sustained</td>
                  <td>Zero dropped connections</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#93c5fd' }}>
            The 4 Architectural Optimization Tiers (From Case Study):
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Tier 1: Strategic PostgreSQL Indexing (37.6x Query Acceleration):</strong>
              <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
                Eliminated 45.2ms sequential scans on high-volume tables (`orders`, `production_jobs`) by introducing 12 targeted B-Tree indexes on status discriminators and tenant foreign keys, dropping query times down to 1.2ms.
              </p>
            </div>
            <div className="card" style={{ padding: '1.25rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Tier 2: In-Flight Request Deduplication (Coalescing Thundering Herds):</strong>
              <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
                Coalesced simultaneous identical query requests triggered when executive KPI cards, live trackers, and AI grounding components mount concurrently. Merged 3 parallel queries per user into one in-flight Promise.
              </p>
            </div>
            <div className="card" style={{ padding: '1.25rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Tier 3: Pre-Normalized Float32 Hardware Vector Dot-Product:</strong>
              <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
                Replaced looped Euclidean vector norm computations with pre-normalized Float32 dot products for RAG retrieval over BenDFM/NIST/NASA fabrication standards, accelerating vector search 5.2x (1.17ms → 0.22ms) with SHA-256 embedding caching.
              </p>
            </div>
            <div className="card" style={{ padding: '1.25rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Tier 4: Bounded LRU Memoization for Physical Calculators:</strong>
              <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
                Implemented LRU caching (`_CALC_CACHE`) across 18 deterministic manufacturing formulas (material density, ISO 9013 laser speeds, DIN 6935 bend deductions), achieving a 4.5x execution speedup.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Verification & Testing */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            5. Automated Verification & Test Suite
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            To guarantee zero regression during architectural optimizations, the codebase is protected by a production verification harness:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <h4 style={{ fontSize: '1.05rem' }}>109 Pytest Tests (100% Passing)</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Adversarial edge cases, physical invariant bounds, schema validation, and performance tests across all FastAPI backend endpoints.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <h4 style={{ fontSize: '1.05rem' }}>22 Playwright E2E Journeys</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Full user journey tests: RFQ creation, 2-sec quote generation, production kanban stage progression, and payment reconciliation.
              </p>
            </div>
          </div>

          {/* Evidence Dashboard */}
          <EngineeringEvidenceDashboard />
        </section>

        {/* Conclusion / Navigation */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/projects" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>
          <Link href="/engineering" className="btn btn-primary">
            <span>Read Engineering Philosophy</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
