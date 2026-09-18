import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const metadata = {
  title: 'Certifications & Professional Development | Bhuvan A B',
  description: 'Verified certifications in AI, Systems & Linux (Red Hat), Risk Management, and Data Analytics by Bhuvan A B.',
};

export default function CertificationsPage() {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.65rem' }}>
            Professional Development
          </div>
          <h1>Verified Certifications</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.65 }}>
            Industry and academic certifications strictly corroborated by my resume. Covers applied AI foundations, Linux systems administration, responsible AI governance, and analytical simulations.
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <span className={`badge ${
                    cert.badgeCategory === 'AI/ML' ? 'badge-purple' :
                    cert.badgeCategory === 'Systems & Linux' ? 'badge-blue' :
                    cert.badgeCategory === 'Data & Analytics' ? 'badge-emerald' : 'badge-amber'
                  }`}>
                    {cert.badgeCategory}
                  </span>
                  <Award size={18} color="var(--text-muted)" />
                </div>

                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                  {cert.title}
                </h2>

                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '1rem' }}>
                  {cert.issuer}
                </div>
              </div>

              <div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guarantee */}
        <div className="callout callout-emerald" style={{ marginTop: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <strong style={{ color: 'var(--text-primary)' }}>Source of Truth Compliance:</strong>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            To adhere strictly to professional integrity, dates, grades, and credential IDs are not invented. Only verified credentials recognized on my official resume are listed here.
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/about" className="btn btn-secondary">
            <span>Read About My Education</span>
          </Link>
          <Link href="/contact" className="btn btn-primary">
            <span>Contact Me</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
