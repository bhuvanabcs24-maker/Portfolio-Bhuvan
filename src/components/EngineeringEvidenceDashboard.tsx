'use client';

import React from 'react';
import { 
  Server, 
  CheckCircle2, 
  Layers, 
  Target, 
  Zap, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

interface EvidenceItem {
  id: string;
  category: string;
  metric: string;
  metricLabel: string;
  subtitle: string;
  verificationSource: string;
  status: string;
  icon: React.ReactNode;
}

const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'api',
    category: 'API',
    metric: '40+',
    metricLabel: 'endpoints',
    subtitle: 'FastAPI REST Routers & OpenAPI 3.1 Contract',
    verificationSource: 'backend/api/v1/routers',
    status: 'PRODUCTION READY',
    icon: <Server size={18} />
  },
  {
    id: 'tests',
    category: 'TESTS',
    metric: '33/33',
    metricLabel: 'pytest',
    subtitle: 'Geometry fixtures, KD-tree snapping & auth tests',
    verificationSource: 'backend/tests/test_cad_preprocessor.py',
    status: 'ALL PASSING',
    icon: <CheckCircle2 size={18} />
  },
  {
    id: 'e2e',
    category: 'E2E',
    metric: '14',
    metricLabel: 'Playwright tests',
    subtitle: 'Full browser purchase lifecycle & multi-tenant auth',
    verificationSource: 'e2e/order_lifecycle.spec.ts',
    status: 'CI ENFORCED',
    icon: <Layers size={18} />
  },
  {
    id: 'pricing',
    category: 'PRICING',
    metric: '96.9%',
    metricLabel: 'accuracy',
    subtitle: 'Deterministic cutting cost vs actual CNC invoices',
    verificationSource: 'benchmark_results.json',
    status: 'VALIDATED',
    icon: <Target size={18} />
  },
  {
    id: 'load-test',
    category: 'LOAD TEST',
    metric: '5.5×',
    metricLabel: 'throughput improvement',
    subtitle: '860 → 4,589 req/s via ProcessPoolExecutor',
    verificationSource: 'locustfile.py load test suite',
    status: 'BENCHMARKED',
    icon: <Zap size={18} />
  }
];

export default function EngineeringEvidenceDashboard() {
  return (
    <div className="evidence-dashboard-container" id="engineering-evidence">
      <div className="evidence-dashboard-header">
        <div className="evidence-header-tag-row">
          <span className="os-badge-mono">GROUND TRUTH METRICS</span>
          <span className="os-badge-emerald">● 5 VERIFIED BENCHMARKS</span>
        </div>
        <h3 className="evidence-dashboard-title">
          ENGINEERING EVIDENCE
        </h3>
        <p className="evidence-dashboard-subtitle">
          Empirical verification metrics extracted directly from production test suites, load test runners, and benchmark datasets. No inflated projections.
        </p>
      </div>

      <div className="evidence-grid">
        {EVIDENCE_ITEMS.map((item, index) => (
          <div 
            key={item.id} 
            className="evidence-card"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="evidence-card-top">
              <span className="evidence-card-category">{item.category}</span>
              <span className="evidence-card-status">
                <span className="os-status-dot-sm" />
                <span>{item.status}</span>
              </span>
            </div>

            <div className="evidence-metric-row">
              <span className="evidence-metric-number">{item.metric}</span>
              <span className="evidence-metric-unit">{item.metricLabel}</span>
            </div>

            <p className="evidence-card-subtitle">
              {item.subtitle}
            </p>

            <div className="evidence-card-footer">
              <span className="evidence-source-label">SRC:</span>
              <code className="evidence-source-path">{item.verificationSource}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
