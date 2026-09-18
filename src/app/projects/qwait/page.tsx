import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, QrCode, Clock, Users, MapPin, Activity, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export const metadata = {
  title: 'QWait Estimator — Queue Management System | Bhuvan.OS',
  description: 'Inspect QWait Estimator engineering artifact: QR check-in, live queue tracking, wait-time estimation, staff dashboard, and venue mapping.',
};

export default function QWaitArtifactPage() {
  const features = [
    {
      title: 'QR CHECK-IN',
      detail: 'Zero-friction patient arrival registration. Scanning an on-site dynamic QR code enters the visitor into the virtual queue with no app install required.',
      tag: 'RESUME VERIFIED'
    },
    {
      title: 'LIVE QUEUE TRACKING',
      detail: 'Persistent real-time queue ticket view updated via WebSockets. Patients monitor their position in line and receive arrival consultation updates directly.',
      tag: 'RESUME VERIFIED'
    },
    {
      title: 'WAIT-TIME ESTIMATION',
      detail: 'Dynamic wait-time calculation computing expected delay based on live queue depth, practitioner pacing, and ongoing visit durations.',
      tag: 'RESUME VERIFIED'
    },
    {
      title: 'STAFF DASHBOARD',
      detail: 'Operational dashboard for clinical staff and physicians to triage arriving patients, advance queue tickets, and inspect room load in real time.',
      tag: 'RESUME VERIFIED'
    },
    {
      title: 'VENUE MAPPING',
      detail: 'Interactive spatial floorplan mapping that guides patients to examination rooms, diagnostic labs, and designated waiting lounges.',
      tag: 'RESUME VERIFIED'
    }
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#07090e', color: '#f1f5f9' }}>
      {/* Header Breadcrumb */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.85rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(10, 13, 18, 0.95)',
        backdropFilter: 'blur(12px)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-secondary, #94a3b8)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <ArrowLeft size={13} />
            <span>RETURN TO ARCHIVE</span>
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span style={{ color: '#10b981', fontWeight: 700 }}>PROJECT 02 // QWAIT ESTIMATOR</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>ARTIFACT VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Artifact Container */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* Artifact Header Card */}
        <div style={{
          backgroundColor: 'rgba(11, 14, 22, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '2.5rem',
          boxShadow: '0 20px 50px -10px rgba(16, 185, 129, 0.15)',
          marginBottom: '2.5rem',
          position: 'relative'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#10b981', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
            PROJECT 02 // SYSTEM ARTIFACT
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', margin: '0 0 0.5rem' }}>
            QWAIT ESTIMATOR
          </h1>

          <div style={{ fontSize: '1.15rem', color: '#34d399', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
            QUEUE MANAGEMENT SYSTEM
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/bhuvanabcs24-maker/QueueEstimater"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                padding: '0.6rem 1.25rem',
                borderRadius: '5px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <GithubIcon size={16} />
              <span>Inspect GitHub Repository</span>
              <ExternalLink size={13} />
            </a>

            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '0.6rem 1.25rem',
                borderRadius: '5px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none'
              }}
            >
              <span>View in Engineering Archive</span>
            </Link>
          </div>
        </div>

        {/* Problem and Result Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          <div style={{
            backgroundColor: 'rgba(11, 14, 22, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '1.75rem'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ef4444', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
              PROBLEM STATEMENT
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.65, margin: 0 }}>
              Physical waiting rooms in clinical environments suffer from physical check-in bottlenecks at the reception counter, zero transparency for waiting patients regarding actual consultation wait-times, and disorientation navigating clinic floorplans.
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(11, 14, 22, 0.65)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '1.75rem'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
              RESULT & OUTCOME
            </div>
            <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.65, margin: 0 }}>
              Built an interactive queue management system featuring zero-friction dynamic QR check-in (no app download required), real-time ticket telematics subscribed to live database channels, dynamic wait-time estimation computed from queue depth and visit durations, responsive multi-role doctor & staff dashboards, and spatial venue mapping for clinic floor navigation.
            </p>
          </div>

        </div>

        {/* 5 Resume Features Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10b981', letterSpacing: '0.1em', marginBottom: '0.75rem', fontWeight: 700 }}>
            VERIFIED FEATURES (RESUME SUPPORTED)
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#f8fafc', marginBottom: '1.5rem', fontWeight: 800 }}>
            5 Core Queue Telematics Capabilities
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {features.map((feat) => (
              <div
                key={feat.title}
                style={{
                  backgroundColor: 'rgba(11, 14, 22, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '3px',
                    marginBottom: '0.5rem'
                  }}>
                    {feat.tag}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: '0.2rem 0 0.6rem' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0 }}>
                    {feat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strict Verification Callout */}
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '6px',
          padding: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#94a3b8',
          lineHeight: 1.6
        }}>
          <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.35rem' }}>
            PORTFOLIO INTEGRITY GUARANTEE
          </div>
          All specifications presented for QWait Estimator reflect active codebase implementations. No unverified user volumes, clinic counts, traffic benchmarks, estimation accuracy percentages, or commercial revenue figures are fabricated.
        </div>

      </div>
    </main>
  );
}
