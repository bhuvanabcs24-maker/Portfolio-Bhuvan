'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ExternalLink, 
  Activity, 
  ArrowRight,
  Database,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';
import { useOS } from '../OSContext';

export default function ForgeIQApp() {
  const { openWindow } = useOS();
  const [activeTab, setActiveTab] = useState<'overview' | 'pipeline' | 'telematics' | 'endpoints'>('overview');

  return (
    <div className="os-app-container">
      {/* Subnav Tabs */}
      <div className="os-app-tabs">
        <button 
          className={`os-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          System Overview
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          9-Stage Pipeline
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'telematics' ? 'active' : ''}`}
          onClick={() => setActiveTab('telematics')}
        >
          5.5x Optimization Benchmark
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'endpoints' ? 'active' : ''}`}
          onClick={() => setActiveTab('endpoints')}
        >
          40+ REST API Endpoints
        </button>
      </div>

      <div className="os-app-scroll-content">
        {activeTab === 'overview' && (
          <div className="os-tab-pane">
            <div className="os-hero-card">
              <div className="os-card-badge-row">
                <span className="badge badge-emerald">Production Manufacturing Intelligence</span>
                <span className="badge badge-blue">FastAPI + PostgreSQL + Next.js</span>
              </div>
              <h2 style={{ fontSize: '1.4rem', margin: '0.5rem 0', color: '#f8fafc' }}>
                ForgeIQ Flagship Engineering Architecture
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Addresses a foundational vulnerability in generic AI for manufacturing: language models hallucinate physical measurements and cannot reliably parse CAD geometry. ForgeIQ combines deterministic spatial graph parsing with LLM cost margin advisory.
              </p>

              <div className="os-metric-row" style={{ marginTop: '1.25rem' }}>
                <div className="os-stat-box">
                  <div className="os-stat-num" style={{ color: '#60a5fa' }}>40+</div>
                  <div className="os-stat-lbl">REST API Endpoints</div>
                </div>
                <div className="os-stat-box">
                  <div className="os-stat-num" style={{ color: '#34d399' }}>96.9%</div>
                  <div className="os-stat-lbl">Pricing Accuracy</div>
                </div>
                <div className="os-stat-box">
                  <div className="os-stat-num" style={{ color: '#a855f7' }}>5.5x</div>
                  <div className="os-stat-lbl">Concurrency Gain</div>
                </div>
                <div className="os-stat-box">
                  <div className="os-stat-num" style={{ color: '#fbbf24' }}>47</div>
                  <div className="os-stat-lbl">Automated Tests</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => openWindow('cad-viewer')}
              >
                <Layers size={14} />
                <span>Launch Interactive CAD Snapper</span>
              </button>
              <Link 
                href="/forgeiq-case-study" 
                className="btn btn-secondary btn-sm"
              >
                <span>Read Full Case Study</span>
                <ExternalLink size={13} />
              </Link>
              <a 
                href="https://github.com/bhuvanabcs24-maker/Forge-IQ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm"
              >
                <span>GitHub Repository</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#93c5fd' }}>
              9-Stage Finite State Order Lifecycle
            </h3>
            <div className="os-pipeline-list">
              {[
                { stage: '01. DXF Upload & Validation', desc: 'Boundary inspection & MIME type verification.', color: '#60a5fa' },
                { stage: '02. Deterministic Parsing', desc: 'ezdxf KD-Tree vertex snapping & perimeter loops.', color: '#a855f7' },
                { stage: '03. Material & Cut Telematics', desc: 'Pierce time, gas, and feed rate lookup matrices.', color: '#10b981' },
                { stage: '04. Hybrid Pricing Engine', desc: 'Algorithmic base rate combined with LLM margin advisor.', color: '#f59e0b' },
                { stage: '05. Production Scheduling', desc: 'Machine slot allocation & job queue serialization.', color: '#06b6d4' },
                { stage: '06. Cutting Telematics', desc: 'CNC runtime & scrap factor monitoring telemetry.', color: '#3b82f6' },
                { stage: '07. Quality Control Audit', desc: 'Dimensional tolerance pass/fail logging.', color: '#ec4899' },
                { stage: '08. Packaging & Dispatch', desc: 'Courier tracking ID and shipping label generation.', color: '#8b5cf6' },
                { stage: '09. Delivery Reconciliation', desc: 'Customer acceptance sign-off & ledger settlement.', color: '#34d399' },
              ].map((p, i) => (
                <div key={i} className="os-pipeline-step">
                  <div className="os-pipe-num" style={{ borderColor: p.color, color: p.color }}>{i + 1}</div>
                  <div className="os-pipe-content">
                    <strong style={{ color: p.color }}>{p.stage}</strong>
                    <p style={{ margin: 0, fontSize: '0.825rem', color: '#94a3b8' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'telematics' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#a855f7' }}>
              5.5x Concurrency Optimization Under Load
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              During heavy multi-megabyte CAD uploads, synchronous ezdxf CPU loops blocked the main FastAPI event loop, causing worker starvation and requests to time out.
            </p>

            <div className="os-comparison-grid">
              <div className="os-comp-card comp-before">
                <div className="comp-badge">Initial Implementation</div>
                <div className="comp-metric">860 req/sec</div>
                <div className="comp-detail">Synchronous Celery gevent tasks. Worker starvation occurred under 20 concurrent uploads with 12 timeouts.</div>
              </div>
              <div className="os-comp-card comp-after">
                <div className="comp-badge">Engineered Solution</div>
                <div className="comp-metric">4,589 req/sec</div>
                <div className="comp-detail">Decoupled geometry parsing into dedicated multiprocessing pools with Redis rate limiting: 5.5x gain with 0 timeouts.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'endpoints' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#60a5fa' }}>
              Selected REST API Endpoints (FastAPI)
            </h3>
            <div className="os-endpoints-table">
              <div className="endpoint-row">
                <span className="method-badge method-post">POST</span>
                <code className="endpoint-path">/api/v1/cad/parse-dxf</code>
                <span className="endpoint-desc">Upload & extract topological cycles & cutting perimeters</span>
              </div>
              <div className="endpoint-row">
                <span className="method-badge method-post">POST</span>
                <code className="endpoint-path">/api/v1/quotes/estimate</code>
                <span className="endpoint-desc">Deterministic price calculation + AI margin recommendation</span>
              </div>
              <div className="endpoint-row">
                <span className="method-badge method-get">GET</span>
                <code className="endpoint-path">/api/v1/orders/{'{id}'}/telematics</code>
                <span className="endpoint-desc">9-stage lifecycle telematics & machine status stream</span>
              </div>
              <div className="endpoint-row">
                <span className="method-badge method-post">POST</span>
                <code className="endpoint-path">/api/v1/retrieval/search</code>
                <span className="endpoint-desc">pgvector hybrid semantic + metadata filtered search</span>
              </div>
              <div className="endpoint-row">
                <span className="method-badge method-get">GET</span>
                <code className="endpoint-path">/api/v1/health/system</code>
                <span className="endpoint-desc">Database pool latency, worker queue depth & memory metrics</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
