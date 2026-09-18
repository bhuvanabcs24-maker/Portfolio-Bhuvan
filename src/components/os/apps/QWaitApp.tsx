'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  QrCode, 
  Activity, 
  Users, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  Server,
  Layers,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';

export default function QWaitApp() {
  const qwait = PORTFOLIO_DATA.projects.find((p) => p.id === 'qwait')!;
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture'>('overview');

  const verifiedFeatures = [
    {
      title: 'QR CHECK-IN',
      desc: 'Zero-friction patient arrival registration via on-premise dynamic QR code. Eliminates app downloads.',
      tag: 'INGESTION'
    },
    {
      title: 'LIVE QUEUE TRACKING',
      desc: 'Real-time WebSocket streaming of queue position and current triage ticket updates directly in mobile browser.',
      tag: 'REAL-TIME'
    },
    {
      title: 'WAIT-TIME ESTIMATION',
      desc: 'Dynamic delay calculation combining queue depth, practitioner pacing, and average visit durations.',
      tag: 'ALGORITHM'
    },
    {
      title: 'STAFF DASHBOARD',
      desc: 'Operational console for clinic physicians and nurses to advance queues, assign exam rooms, and flag urgent consults.',
      tag: 'OPERATIONS'
    },
    {
      title: 'VENUE MAPPING',
      desc: 'Interactive spatial floorplan routing patients between check-in, waiting lounges, and designated exam rooms.',
      tag: 'SPATIAL'
    }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content" style={{ padding: '1.25rem' }}>
        
        {/* Header Hero Card */}
        <div className="os-hero-card" style={{
          backgroundColor: 'rgba(11, 14, 22, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem',
          position: 'relative'
        }}>
          <div className="os-card-badge-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: '#10b981', 
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              padding: '0.2rem 0.5rem',
              borderRadius: '3px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              PROJECT 02 // ARTIFACT
            </span>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.72rem', 
              color: '#10b981', 
              fontFamily: 'var(--font-mono)' 
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              QUEUE MANAGEMENT SYSTEM
            </span>
          </div>

          <h2 style={{ fontSize: '1.65rem', margin: '0.2rem 0 0.4rem', color: '#f8fafc', letterSpacing: '-0.02em', fontWeight: 800 }}>
            QWAIT ESTIMATOR
          </h2>
          <p style={{ color: '#34d399', fontSize: '0.92rem', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
            CLINICAL QUEUE TELEMATICS &amp; WAIT-TIME ESTIMATION
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem', margin: 0 }}>
            {qwait.tagline}
          </p>

          {/* Quick Action Buttons */}
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/bhuvanabcs24-maker/QueueEstimater"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              <GithubIcon size={14} />
              <span>Inspect GitHub Repository</span>
              <ExternalLink size={12} />
            </a>

            <Link
              href="/projects#qwait"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              <span>View in Engineering Archive</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* 5 Verified Features Highlight */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ 
            fontSize: '0.72rem', 
            fontFamily: 'var(--font-mono)', 
            letterSpacing: '0.1em', 
            color: '#10b981', 
            marginBottom: '0.85rem',
            fontWeight: 700 
          }}>
            VERIFIED FEATURES (RESUME SUPPORTED)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {verifiedFeatures.map((feat) => (
              <div
                key={feat.title}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.65rem', 
                    color: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '2px'
                  }}>
                    {feat.tag}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                  {feat.title}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Specs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.4rem' }}>
              PROBLEM ADDRESSED
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
              Physical clinic check-in desk bottlenecks, waiting room uncertainty, and lack of spatial navigation for patients moving between triage, consultations, and labs.
            </p>
          </div>

          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem' }}>
              MEASURED OUTCOME
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.55, margin: 0 }}>
              Zero-friction QR check-in without native app installs, live queue tracking over WebSockets, dynamic wait-time calculation, and interactive clinic floorplan mapping.
            </p>
          </div>

        </div>

        {/* Tech Stack Badges */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontWeight: 600 }}>
            VERIFIED TECHNOLOGY STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Next.js / React', 'Supabase Realtime', 'TypeScript', 'TailwindCSS / CSS Modules', 'Dynamic QR Engine', 'Canvas / SVG Floorplan'].map((t) => (
              <span 
                key={t} 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.75)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '3px'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Truthfulness Guarantee */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '0.85rem', 
          borderRadius: '4px', 
          backgroundColor: 'rgba(16, 185, 129, 0.05)', 
          border: '1px solid rgba(16, 185, 129, 0.15)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#94a3b8'
        }}>
          <strong style={{ color: '#10b981' }}>DATA INTEGRITY:</strong> Documented strictly from verified codebase architecture. No unverified clinic volume, patient count, or commercial revenue metrics are made.
        </div>

      </div>
    </div>
  );
}
