'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface ADR {
  id: string;
  title: string;
  category: string;
  status: 'Accepted' | 'Implemented';
  context: string;
  decision: string;
  consequences: string;
}

const ADRS_DATA: ADR[] = [
  {
    id: 'ADR-001',
    title: 'PostgreSQL with JSONB vs MongoDB for Order Schemas',
    category: 'Database & Storage',
    status: 'Implemented',
    context: 'Order workflows require strict relational constraints for billing and payments while supporting arbitrary vendor quotation line items.',
    decision: 'Selected PostgreSQL with typed relational tables for transactions and JSONB columns for polymorphic machine cutting parameters.',
    consequences: 'ACID transactional guarantees preserved for payments while retaining schema flexibility for custom tooling specs.'
  },
  {
    id: 'ADR-002',
    title: 'FastAPI vs Express.js for Backend API Services',
    category: 'Backend Architecture',
    status: 'Implemented',
    context: 'CAD geometry processing requires Python computational libraries (ezdxf, shapely, networkx) alongside asynchronous web I/O.',
    decision: 'Selected FastAPI to avoid cross-process IPC bridges and maintain native Python typing with Pydantic v2 schemas.',
    consequences: 'Zero-overhead direct integration with scientific Python libraries, sub-millisecond serialization, and automatic OpenAPI generation.'
  },
  {
    id: 'ADR-003',
    title: 'Deterministic CAD Parsing vs Vision LLM Multimodal Extraction',
    category: 'Applied AI & Geometry',
    status: 'Implemented',
    context: 'Multi-modal LLMs fail to extract micro-millimeter cutting tolerances and hallucinate hole coordinates on unrendered technical drawings.',
    decision: 'Mandated deterministic parsing (KD-Tree vertex snapping + graph cycle basis) for ground truth, restricting LLMs to cost margin advisory.',
    consequences: '100% deterministic geometry repeatability with zero hallucinations on dimensional specs.'
  },
  {
    id: 'ADR-004',
    title: 'Supabase Authentication with Row-Level Security (RLS)',
    category: 'Security & Auth',
    status: 'Implemented',
    context: 'Multi-tenant manufacturing platform requires strict data segregation between machine vendors and purchasing engineers.',
    decision: 'Adopted Supabase Auth combined with PostgreSQL Row-Level Security policies tied to JWT claims.',
    consequences: 'Database-level isolation guaranteed even if an application endpoint query omits a tenant_id filter.'
  },
  {
    id: 'ADR-005',
    title: 'Neon Serverless PostgreSQL with pgvector for Semantic Search',
    category: 'Vector & Search',
    status: 'Implemented',
    context: 'Quotation history and RFQ documentation search requires vector embeddings alongside relational supplier metadata.',
    decision: 'Selected pgvector inside Neon PostgreSQL rather than introducing a separate vector database cluster (e.g. Pinecone).',
    consequences: 'Zero data sync drift; single transactional ACID boundary for both structured quotes and vector embeddings.'
  }
];

export default function ArchitectureApp() {
  const [selectedAdr, setSelectedAdr] = useState<ADR>(ADRS_DATA[0]);

  return (
    <div className="os-app-container">
      <div className="os-split-view">
        {/* Left Sidebar: ADR List */}
        <div className="os-split-sidebar">
          <div className="os-sidebar-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase' }}>
              Architectural Decisions (10 ADRs)
            </span>
          </div>
          <div className="os-sidebar-list">
            {ADRS_DATA.map((adr) => (
              <div
                key={adr.id}
                className={`os-sidebar-item ${selectedAdr.id === adr.id ? 'active' : ''}`}
                onClick={() => setSelectedAdr(adr)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#60a5fa' }}>{adr.id}</span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{adr.status}</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>
                  {adr.title}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link href="/engineering/decisions" className="btn btn-secondary btn-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <span>View All 10 ADRs</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="os-split-detail">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa', fontWeight: 700 }}>{selectedAdr.id}</span>
                <span className="badge badge-blue">{selectedAdr.category}</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{selectedAdr.title}</h2>
            </div>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', gap: '0.3rem' }}>
              <CheckCircle2 size={12} />
              <span>{selectedAdr.status}</span>
            </span>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">Context & Problem</h4>
            <p className="os-adr-text">{selectedAdr.context}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">Decision</h4>
            <p className="os-adr-text" style={{ color: '#93c5fd' }}>{selectedAdr.decision}</p>
          </div>

          <div className="os-adr-section">
            <h4 className="os-adr-heading">Consequences & Trade-offs</h4>
            <p className="os-adr-text">{selectedAdr.consequences}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
