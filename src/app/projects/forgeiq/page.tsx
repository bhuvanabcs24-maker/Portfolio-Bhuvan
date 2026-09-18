import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import ForgeIQSystemWorld from '@/components/forgeiq/ForgeIQSystemWorld';

export const metadata = {
  title: 'ForgeIQ — Manufacturing Intelligence System | Bhuvan.OS',
  description: 'Inspect ForgeIQ: AI-powered manufacturing system architecture, deterministic 2D CAD geometry parser, 96.9% quotation accuracy, and 40+ REST API endpoints.',
};

export default function ForgeIQSystemPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#07090d', color: '#f1f5f9' }}>
      {/* Top Minimal OS Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 13, 18, 0.95)',
        backdropFilter: 'blur(10px)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--os-text-body, #94a3b8)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <ArrowLeft size={13} />
            <span>RETURN TO BHUVAN.OS</span>
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span style={{ color: 'var(--os-accent, #f59e0b)', fontWeight: 700 }}>PROJECTS // FORGEIQ</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span>SYSTEM ONLINE</span>
          </div>
          <Link
            href="/forgeiq-case-study"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--os-text-body, #94a3b8)',
              textDecoration: 'none',
              fontSize: '0.75rem'
            }}
          >
            <span>Read Case Study</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Main Interactive System World */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1rem' }}>
        <ForgeIQSystemWorld />
      </div>
    </main>
  );
}
