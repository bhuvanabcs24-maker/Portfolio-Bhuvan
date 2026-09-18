'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Activity, 
  Cpu, 
  AlertCircle, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';
import ArchitectureApp from './ArchitectureApp';
import AIEvalApp from './AIEvalApp';
import PatternsApp from './PatternsApp';
import LearningsApp from './LearningsApp';

export default function EngineeringLabApp() {
  const [activeModule, setActiveModule] = useState<'architecture' | 'evaluation' | 'patterns' | 'learnings'>('architecture');

  const modules = [
    {
      id: 'architecture' as const,
      code: '01',
      label: 'ARCHITECTURE',
      metric: '10 ADRs',
      subtitle: 'Architecture Decision Records',
      desc: 'Relational vs JSONB, deterministic CAD parsing, Supabase RLS, and pgvector persistence.',
      color: '#60a5fa',
      link: '/engineering/decisions'
    },
    {
      id: 'evaluation' as const,
      code: '02',
      label: 'AI EVALUATION',
      metric: '8 DIMENSIONS',
      subtitle: 'Verification & Benchmarking Framework',
      desc: 'Deterministic pricing, strict Pydantic schemas, hallucination controls, and latency budgets.',
      color: '#ec4899',
      link: '/engineering/evaluation'
    },
    {
      id: 'patterns' as const,
      code: '03',
      label: 'PATTERNS',
      metric: '4 SYSTEM PATTERNS',
      subtitle: 'Production Architecture Patterns',
      desc: 'AI Provider Abstraction, KD-Tree Guardrails, Finite State Machine, and Multi-Tenant RBAC.',
      color: '#f59e0b',
      link: '/engineering/patterns'
    },
    {
      id: 'learnings' as const,
      code: '04',
      label: 'LEARNINGS',
      metric: '4 RETROSPECTIVES',
      subtitle: 'Production Incidents & Mitigations',
      desc: 'Worker thread starvation, pgvector index degradation, CAD micro-gaps, and E2E race conditions.',
      color: '#ef4444',
      link: '/engineering/learnings'
    }
  ];

  return (
    <div className="os-app-container">
      {/* Top 4 Engineering Modules Summary Selector */}
      <div className="os-lab-module-selector">
        {modules.map((m) => {
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              className={`os-lab-module-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveModule(m.id)}
              style={{
                borderColor: isActive ? m.color : 'rgba(255, 255, 255, 0.08)',
                background: isActive ? `${m.color}10` : 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: m.color, fontWeight: 700 }}>
                  MODULE {m.code}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f8fafc', fontWeight: 800 }}>
                  {m.metric}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', textAlign: 'left' }}>
                {m.label}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0', textAlign: 'left', lineHeight: 1.35 }}>
                {m.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Module Title & Link Bar */}
      <div className="os-lab-module-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#60a5fa' }}>
            ACTIVE LAB MODULE:
          </span>
          <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>
            {modules.find(m => m.id === activeModule)?.label} ({modules.find(m => m.id === activeModule)?.metric})
          </strong>
        </div>
        <Link 
          href={modules.find(m => m.id === activeModule)?.link || '/engineering'}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', gap: '0.35rem' }}
        >
          <span>Open Full Documentation</span>
          <ExternalLink size={12} />
        </Link>
      </div>

      {/* Active Module Sub-Component */}
      <div className="os-app-scroll-content" style={{ padding: 0 }}>
        {activeModule === 'architecture' && <ArchitectureApp />}
        {activeModule === 'evaluation' && <AIEvalApp />}
        {activeModule === 'patterns' && <PatternsApp />}
        {activeModule === 'learnings' && <LearningsApp />}
      </div>
    </div>
  );
}
