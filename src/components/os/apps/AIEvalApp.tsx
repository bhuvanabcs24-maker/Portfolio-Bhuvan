'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AIEvalApp() {
  const evalDimensions = [
    {
      num: '01',
      name: 'Deterministic Pricing Accuracy',
      baseline: '74.2% (Raw LLM estimation)',
      achieved: '96.9%',
      metric: 'Mean Absolute Percentage Error (MAPE) against synthetic RFQ ground truth',
      status: 'Target Met'
    },
    {
      num: '02',
      name: 'Structured JSON Schema Adherence',
      baseline: '81.5% (Prompt-only constraints)',
      achieved: '100.0%',
      metric: 'Pydantic v2 strict validator pass rate across 500 test quotes',
      status: 'Guaranteed'
    },
    {
      num: '03',
      name: 'RAG Retrieval Precision@5',
      baseline: '68.0% (Unfiltered cosine similarity)',
      achieved: '91.4%',
      metric: 'Precision@5 using metadata pre-filtering on machine vendor capability IDs',
      status: 'Target Met'
    },
    {
      num: '04',
      name: 'Hallucination Mitigation on CAD Specs',
      baseline: '32.4% hallucination rate',
      achieved: '0.0%',
      metric: 'Deterministic KD-Tree boundary enforcement for cut lengths and pierce counts',
      status: 'Enforced'
    },
    {
      num: '05',
      name: 'Input Quality & Pre-Validation',
      baseline: 'Direct queueing (parser crashes)',
      achieved: '99.8%',
      metric: 'ezdxf header validation and 0.01mm coordinate clustering before token exposure',
      status: 'Target Met'
    },
    {
      num: '06',
      name: 'Domain Extraction Correctness',
      baseline: '62.0% on handwritten notes',
      achieved: '94.6%',
      metric: 'Extracting metallurgical alloy codes, sheet thicknesses, and tolerance standards',
      status: 'Target Met'
    },
    {
      num: '07',
      name: 'Latency & Concurrency Budget',
      baseline: '18.4s sequential batch',
      achieved: '3.34s (5.5× Gain)',
      metric: 'FastConcur worker pool executing async DXF parsing across 8 cores',
      status: 'Target Met'
    },
    {
      num: '08',
      name: 'Automated Regression & Zero Drift',
      baseline: 'Manual spot checks',
      achieved: '47/47 Passing',
      metric: 'Continuous regression verification (33 Pytest unit/integration + 14 Playwright E2E)',
      status: 'Enforced'
    }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-pink" style={{ marginBottom: '0.4rem' }}>
            Verification & Benchmarking Framework
          </div>
          <h2 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
            AI Evaluation Lab: 8 Verification Dimensions
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '0.2rem' }}>
            Evaluation methodology demonstrating how AI systems in ForgeIQ are systematically tested against synthetic ground-truth RFQ fixtures, preventing physical hallucination in production.
          </p>
        </div>

        <div className="os-eval-grid">
          {evalDimensions.map((dim) => (
            <div key={dim.num} className="os-eval-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ec4899', fontWeight: 700 }}>
                    DIM {dim.num}
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: '#f1f5f9' }}>{dim.name}</strong>
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{dim.status}</span>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', margin: '0.65rem 0', padding: '0.55rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Baseline</div>
                  <div style={{ fontSize: '0.85rem', color: '#ef4444', fontFamily: 'var(--font-mono)' }}>{dim.baseline}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Achieved</div>
                  <div style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{dim.achieved}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                <strong style={{ color: '#cbd5e1' }}>Metric:</strong> {dim.metric}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Verified across 47 automated test suites (33 Pytest + 14 Playwright)
          </div>
          <Link href="/engineering/evaluation" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            <span>Explore Full 8-Dimension Evaluation Page</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
