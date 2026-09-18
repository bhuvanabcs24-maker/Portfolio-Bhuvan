'use client';

import React from 'react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function CertificationsApp() {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        {/* Header Hero Card */}
        <div className="os-hero-card">
          <div className="os-card-badge-row">
            <span className="os-badge-mono">CREDENTIAL REGISTRY</span>
            <span className="badge badge-emerald">VERIFIED BY RESUME</span>
          </div>

          <h2 style={{ fontSize: '1.45rem', margin: '0.4rem 0', color: '#f8fafc', letterSpacing: '-0.01em' }}>
            Verified Certifications
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
            Industry and academic certifications strictly corroborated by official records. Covers applied AI systems, Linux kernel administration, responsible AI governance, and analytical simulations.
          </p>
        </div>

        {/* Certifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="os-card" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span className="os-badge-mono">
                    {cert.badgeCategory}
                  </span>
                  <Award size={16} color="#38bdf8" />
                </div>

                <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', margin: '0 0 0.35rem 0', lineHeight: 1.35 }}>
                  {cert.title}
                </h3>

                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', marginBottom: '0.85rem' }}>
                  {cert.issuer}
                </div>
              </div>

              <div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {cert.skills.map((skill) => (
                    <span key={skill} className="forgeiq-tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
