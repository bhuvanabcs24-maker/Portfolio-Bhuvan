'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

const LEARNINGS_DATA = [
  {
    id: 'LEARN-01',
    title: 'Celery Worker Starvation Under Heavy CAD Uploads (5.5x Gain)',
    problem: 'Synchronous CPU-intensive geometry loops in gevent tasks starved FastAPI event loops, causing timeouts under 20 concurrent requests.',
    fix: 'Decoupled geometry parsing into dedicated multiprocessing worker pools managed via Redis token buckets.',
    takeaway: 'CPU-bound computational tasks must never share an event loop with asynchronous network I/O.'
  },
  {
    id: 'LEARN-02',
    title: 'Unindexed pgvector Search Degradation Under Schema Growth',
    problem: 'Cosine distance queries on quotation embeddings degraded to table scans (>420ms) as quotation records expanded.',
    fix: 'Migrated from flat IVFFlat to HNSW (Hierarchical Navigable Small World) index with metadata pre-filtering on supplier IDs.',
    takeaway: 'Vector search in relational databases requires index tuning and strict metadata partitioning prior to similarity calculation.'
  },
  {
    id: 'LEARN-03',
    title: 'Unclosed Polyline Loops in AutoCAD Drafting Files',
    problem: 'Naive entity traversal failed on 84% of real-world supplier DXF files because human drafters leave micro-gaps (0.002mm).',
    fix: 'Introduced KD-Tree spatial coordinate clustering within a configurable tolerance window before cycle extraction.',
    takeaway: 'Real-world technical data is dirty; deterministic software must build tolerance resilience into ingestion boundaries.'
  },
  {
    id: 'LEARN-04',
    title: 'Playwright E2E Race Conditions in Order State Transitions',
    problem: 'Automated browser tests flaked when checking order status transitions because frontend state updated before WebSocket broadcast.',
    fix: 'Replaced arbitrary sleep timeouts with explicit DOM assertion polling on state-change transaction IDs.',
    takeaway: 'Never use arbitrary sleeps in distributed test suites; synchronize against explicit backend event hashes.'
  }
];

export default function LearningsApp() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const story = LEARNINGS_DATA[selectedIdx];

  return (
    <div className="os-app-container">
      <div className="os-split-view">
        {/* Left Sidebar */}
        <div className="os-split-sidebar">
          <div className="os-sidebar-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>
              4 Failure Retrospectives
            </span>
          </div>
          <div className="os-sidebar-list">
            {LEARNINGS_DATA.map((l, idx) => (
              <div
                key={l.id}
                className={`os-sidebar-item ${idx === selectedIdx ? 'active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f87171', marginBottom: '0.2rem' }}>
                  {l.id}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>
                  {l.title}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link href="/engineering/learnings" className="btn btn-secondary btn-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <span>Read All Stories</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="os-split-detail">
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>{story.id}</span>
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{story.title}</h2>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading" style={{ color: '#f87171' }}>What Failed / The Bottleneck</h4>
            <p className="os-adr-text">{story.problem}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading" style={{ color: '#34d399' }}>The Engineered Fix</h4>
            <p className="os-adr-text">{story.fix}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading" style={{ color: '#93c5fd' }}>Engineering Takeaway</h4>
            <p className="os-adr-text">{story.takeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
