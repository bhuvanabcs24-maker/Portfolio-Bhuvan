'use client';

import React from 'react';
import { 
  Clock, 
  QrCode, 
  Activity, 
  Users, 
  Map, 
  ExternalLink, 
  ShieldCheck, 
  Server,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function QWaitApp() {
  const qwait = PORTFOLIO_DATA.projects.find((p) => p.id === 'qwait')!;

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        {/* Header Hero Card */}
        <div className="os-hero-card">
          <div className="os-card-badge-row">
            <span className="os-badge-mono">CLINICAL TELEMATICS</span>
            <span className="badge badge-emerald">SYSTEM ONLINE</span>
          </div>

          <h2 style={{ fontSize: '1.45rem', margin: '0.4rem 0', color: '#f8fafc', letterSpacing: '-0.01em' }}>
            {qwait.title}
          </h2>
          <p style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.75rem' }}>
            {qwait.subtitle}
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
            {qwait.tagline}
          </p>

          {/* Key Metrics Grid */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ 
              fontSize: '0.72rem', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '0.08em', 
              color: '#38bdf8', 
              marginBottom: '0.75rem',
              fontWeight: 700 
            }}>
              PRODUCTION TELEMETRY METRICS
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
              {qwait.metrics.map((m, idx) => (
                <div key={idx} className="os-stat-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem' }}>
                  <div className="os-stat-num" style={{ fontSize: '1.1rem', color: '#f8fafc' }}>
                    {m.value}
                  </div>
                  <div className="os-stat-lbl" style={{ color: '#38bdf8', fontSize: '0.7rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
          {/* Real-time Telematics */}
          <div className="os-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: '#38bdf8' }}>
              <QrCode size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                QR-BASED ZERO-FRICTION INGESTION
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Patients scan a location-bound dynamic QR code upon arrival. Bypasses app store installations, assigning an ephemeral token subscribed to Supabase Realtime WebSocket queue events.
            </p>
          </div>

          {/* Operational Dashboards */}
          <div className="os-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: '#34d399' }}>
              <Users size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                DOCTOR &amp; STAFF DISPATCH
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Multi-tenant triage portal displaying consultation duration estimates, room availability, and priority patient flags calculated via live rolling averages.
            </p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
            VERIFIED TECHNOLOGY STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {qwait.tech.map((t, idx) => (
              <span key={idx} className="os-badge-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* External Repo Action */}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={qwait.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', gap: '0.5rem' }}
          >
            <span>Inspect GitHub Repository</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
