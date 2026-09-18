'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  ExternalLink, 
  ArrowRight,
  Zap,
  Workflow,
  MapPin,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useOS } from '../OSContext';
import ForgeIQSystemMap from '@/components/ForgeIQSystemMap';
import EngineeringEvidenceDashboard from '@/components/EngineeringEvidenceDashboard';
import ForgeIQSystemCore from '../ForgeIQSystemCore';

export default function ForgeIQApp() {
  const { openWindow } = useOS();
  const [activeTab, setActiveTab] = useState<'map' | 'status' | 'pipeline' | 'architecture'>('map');

  return (
    <div className="os-app-container">
      {/* Subnav Tabs */}
      <div className="os-app-tabs">
        <button 
          className={`os-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapPin size={14} />
          <span>Interactive System Map (Buyer ↓ Delivery)</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <Zap size={14} />
          <span>Flagship Status & Evidence</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          <Workflow size={14} />
          <span>9-Stage Order Pipeline</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Layers size={14} />
          <span>Deterministic Geometry Engine</span>
        </button>
      </div>

      <div className="os-app-scroll-content">
        {/* TAB 1: INTERACTIVE SYSTEM MAP (The Most Important Visual) */}
        {activeTab === 'map' && (
          <div className="os-tab-pane">
            <ForgeIQSystemMap />

            {/* Quick action bar */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link 
                id="forgeiq-case-study-cta"
                href="/forgeiq-case-study" 
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', gap: '0.5rem' }}
              >
                <span>Open Full Case Study</span>
                <ArrowRight size={15} />
              </Link>
              
              <button 
                className="btn btn-secondary"
                onClick={() => openWindow('cad-viewer')}
                style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', gap: '0.5rem' }}
              >
                <Layers size={14} />
                <span>Launch Interactive CAD Snapper</span>
              </button>

              <a 
                href="https://github.com/bhuvanabcs24-maker/Forge-IQ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', gap: '0.5rem' }}
              >
                <span>GitHub Repository</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: FLAGSHIP STATUS & ENGINEERING EVIDENCE */}
        {activeTab === 'status' && (
          <div className="os-tab-pane">
            {/* Flagship Header Card */}
            <div className="os-hero-card">
              <div className="os-card-badge-row">
                <span className="badge badge-blue">FLAGSHIP SYSTEM</span>
                <span className="badge badge-emerald">SYSTEM ONLINE</span>
              </div>
              <h2 style={{ fontSize: '1.45rem', margin: '0.4rem 0', color: '#f8fafc', letterSpacing: '-0.01em' }}>
                FORGEIQ
              </h2>
              <p style={{ color: '#93c5fd', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                AI-powered manufacturing intelligence platform.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
                Addresses a foundational vulnerability in generic AI for manufacturing: language models hallucinate physical measurements and cannot reliably parse CAD geometry. ForgeIQ combines deterministic spatial graph parsing with LLM cost margin advisory.
              </p>

              {/* SYSTEM STATUS GRID */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'var(--font-mono)', 
                  letterSpacing: '0.08em', 
                  color: '#60a5fa', 
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  SYSTEM STATUS
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                  gap: '0.75rem' 
                }}>
                  <div className="os-status-metric-card">
                    <div className="os-status-metric-label">CAD ENGINE</div>
                    <div className="os-status-metric-val online">
                      <span className="os-status-dot-sm" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  <div className="os-status-metric-card">
                    <div className="os-status-metric-label">AI PIPELINE</div>
                    <div className="os-status-metric-val online">
                      <span className="os-status-dot-sm" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  <div className="os-status-metric-card">
                    <div className="os-status-metric-label">API</div>
                    <div className="os-status-metric-val online">
                      <span className="os-status-dot-sm" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  <div className="os-status-metric-card">
                    <div className="os-status-metric-label">DATABASE</div>
                    <div className="os-status-metric-val online">
                      <span className="os-status-dot-sm" />
                      <span>ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VERIFIED METRICS GRID */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'var(--font-mono)', 
                  letterSpacing: '0.08em', 
                  color: '#94a3b8', 
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  VERIFIED PRODUCTION METRICS
                </div>

                <div className="os-metric-row">
                  <div className="os-stat-box">
                    <div className="os-stat-num" style={{ color: '#60a5fa' }}>33/33</div>
                    <div className="os-stat-lbl">TEST SUITE</div>
                  </div>
                  <div className="os-stat-box">
                    <div className="os-stat-num" style={{ color: '#38bdf8' }}>14 TESTS</div>
                    <div className="os-stat-lbl">E2E</div>
                  </div>
                  <div className="os-stat-box">
                    <div className="os-stat-num" style={{ color: '#34d399' }}>5.5× IMPROVEMENT</div>
                    <div className="os-stat-lbl">THROUGHPUT</div>
                  </div>
                  <div className="os-stat-box">
                    <div className="os-stat-num" style={{ color: '#fbbf24' }}>96.9%</div>
                    <div className="os-stat-lbl">PRICING MODEL ACCURACY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Dashboard */}
            <div style={{ marginTop: '1.25rem' }}>
              <EngineeringEvidenceDashboard />
            </div>

            {/* CTAs */}
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link 
                href="/forgeiq-case-study" 
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', gap: '0.5rem' }}
              >
                <span>Open Full Case Study</span>
                <ArrowRight size={15} />
              </Link>
              
              <button 
                className="btn btn-secondary"
                onClick={() => openWindow('cad-viewer')}
                style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', gap: '0.5rem' }}
              >
                <Layers size={14} />
                <span>Launch Interactive CAD Snapper</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: 9-STAGE FINITE STATE ORDER LIFECYCLE */}
        {activeTab === 'pipeline' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#93c5fd' }}>
              9-Stage Finite State Order Lifecycle
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Transitions are validated server-side using strict state machine invariants. Invalid skips (e.g. DRAFT directly to MACHINING) trigger deterministic HTTP 409 Conflict errors.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
              {[
                { step: '01', name: 'DRAFT', desc: 'Client uploads 2D DXF or enters RFQ specifications' },
                { step: '02', name: 'PARSED', desc: 'KD-Tree snaps endpoints and extracts closed cutting loops' },
                { step: '03', name: 'ESTIMATED', desc: 'Deterministic physics-based machine runtime & material costing' },
                { step: '04', name: 'SUBMITTED', desc: 'RFQ distributed to verified machine vendor network' },
                { step: '05', name: 'QUOTED', desc: 'Bids received with AI margin and lead-time analysis' },
                { step: '06', name: 'ACCEPTED', desc: 'Escrow funded and binding procurement contract generated' },
                { step: '07', name: 'MACHINING', desc: 'Telemetry tracking cutting, CNC milling, and surface treatment' },
                { step: '08', name: 'INSPECTED', desc: 'CMM inspection report & tolerance signoff uploaded' },
                { step: '09', name: 'DELIVERED', desc: 'Final logistics signoff and vendor escrow settlement' },
              ].map((stage, i) => (
                <div key={i} className="os-card" style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#60a5fa' }}>STAGE {stage.step}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>{stage.name}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <Link href="/forgeiq-case-study#lifecycle" className="btn btn-secondary btn-sm">
                <span>View Full State Machine Transition Diagram in Case Study</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: DETERMINISTIC GEOMETRY ENGINE */}
        {activeTab === 'architecture' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#93c5fd' }}>
              Deterministic Geometry vs Probabilistic LLMs
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Generic LLMs fail on CAD files: they cannot perform sub-millimeter Euclidean vertex snapping, trace cycle bases, or reliably extract toolpaths. ForgeIQ splits work across two decoupled layers:
            </p>

            {/* 3D System Core Topology Visualization */}
            <div style={{ marginBottom: '1.25rem' }}>
              <ForgeIQSystemCore />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="os-card" style={{ padding: '1rem', borderLeft: '3px solid #34d399' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#34d399', marginBottom: '0.5rem', fontWeight: 600 }}>
                  DETERMINISTIC SPATIAL LAYER (Ground Truth)
                </div>
                <ul style={{ fontSize: '0.85rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                  <li><strong>KD-Tree Vertex Snapping:</strong> Resolves CAD gaps with 0.01mm tolerance.</li>
                  <li><strong>Graph Cycle Basis:</strong> NetworkX cycles extract inner holes and outer perimeters.</li>
                  <li><strong>Physical Physics Engine:</strong> Computes feed rate, pierce delays, and raw stock waste.</li>
                  <li><strong>100% Deterministic:</strong> Zero hallucinations on dimensions.</li>
                </ul>
              </div>

              <div className="os-card" style={{ padding: '1rem', borderLeft: '3px solid #60a5fa' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#60a5fa', marginBottom: '0.5rem', fontWeight: 600 }}>
                  ADVISORY AI LAYER (Market Intelligence)
                </div>
                <ul style={{ fontSize: '0.85rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                  <li><strong>Cost Margin Recommendations:</strong> Recommends optimal pricing markups.</li>
                  <li><strong>Material Substitutions:</strong> Recommends alternatives when 6061-T6 aluminum has lead-time surges.</li>
                  <li><strong>Supplier Risk Scoring:</strong> Evaluates historical defect rates.</li>
                  <li><strong>Strict JSON Schema:</strong> Guarded by Pydantic validators.</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => openWindow('cad-viewer')}
              >
                <Layers size={13} />
                <span>Test KD-Tree Snapper in Interactive Visualizer</span>
              </button>
              <Link href="/forgeiq-case-study" className="btn btn-secondary btn-sm">
                <span>Read Full Technical Architecture</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
