'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';

const PATTERNS_DATA = [
  {
    id: 'PAT-01',
    name: 'AI Provider Abstraction (Strategy / Adapter Pattern)',
    problem: 'Direct coupling to OpenAI or Anthropic SDKs creates vendor lock-in, breaks during provider outages, and makes offline unit testing costly.',
    solution: 'Engineered an abstract BaseLLMProvider interface with concrete adapters (OpenAIAdapter, AnthropicAdapter, MockLLMAdapter) selected via environment config.',
    reuse: 'Any system requiring model fallbacks, multi-tenant billing quotas, or offline deterministic CI/CD testing.'
  },
  {
    id: 'PAT-02',
    name: 'Deterministic CAD Guardrails with Computational Geometry',
    problem: 'Generative AI models hallucinate technical measurements, cutting perimeters, and hole locations when interpreting CAD technical drawings.',
    solution: 'Isolated raw entity geometry into a deterministic pipeline (KD-Tree vertex snapping + graph cycle basis) before passing structured metrics to LLM margin advisors.',
    reuse: 'Industrial manufacturing, structural engineering, blueprint extraction, and BIM processing workflows.'
  },
  {
    id: 'PAT-03',
    name: 'Finite State Machine (FSM) Order Lifecycle Engine',
    problem: 'Asynchronous manufacturing jobs risk race conditions, illegal status jumps (e.g. shipping before quality inspection), and orphan database records.',
    solution: 'Implemented a strict transition table enforcing legal transitions between 9 order stages with database transaction locks and immutable audit event logs.',
    reuse: 'E-commerce fulfillment, logistics tracking, payment reconciliation, and healthcare patient routing.'
  },
  {
    id: 'PAT-04',
    name: 'Multi-Role RBAC with Database Row-Level Security',
    problem: 'Vendor quoting platforms must strictly segregate proprietary pricing and machine telemetry between competing manufacturing suppliers.',
    solution: 'Combined Supabase JWT claims with PostgreSQL Row-Level Security policies, ensuring data isolation is enforced at the database kernel level.',
    reuse: 'B2B SaaS platforms, multi-tenant vendor marketplaces, and healthcare compliance telematics.'
  }
];

export default function PatternsApp() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const pattern = PATTERNS_DATA[selectedIdx];

  return (
    <div className="os-app-container">
      <div className="os-split-view">
        {/* Left Sidebar */}
        <div className="os-split-sidebar">
          <div className="os-sidebar-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
              4 Production Patterns
            </span>
          </div>
          <div className="os-sidebar-list">
            {PATTERNS_DATA.map((p, idx) => (
              <div
                key={p.id}
                className={`os-sidebar-item ${idx === selectedIdx ? 'active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#fbbf24', marginBottom: '0.2rem' }}>
                  {p.id}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>
                  {p.name}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link href="/engineering/patterns" className="btn btn-secondary btn-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <span>View Full Pattern Guide</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="os-split-detail">
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>{pattern.id}</span>
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{pattern.name}</h2>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">The Core Problem</h4>
            <p className="os-adr-text">{pattern.problem}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">Engineered Solution</h4>
            <p className="os-adr-text" style={{ color: '#fcd34d' }}>{pattern.solution}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">Where This Can Be Reused</h4>
            <p className="os-adr-text">{pattern.reuse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
