import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Languages, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Terminal,
  BookOpen
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const metadata = {
  title: 'About | Bhuvan A B',
  description: 'Background, education at BMSCE, achievements, leadership, and engineering interests of Bhuvan A B.',
};

export default function AboutPage() {
  const { personal, achievements, leadership, skills } = PORTFOLIO_DATA;

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
            Background & Profile
          </div>
          <h1>About Me</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-accent)', fontWeight: 600, marginTop: '0.5rem' }}>
            Computer Science & Engineering Student at BMSCE · Expected June 2028 · CGPA: 8.08
          </p>
        </div>

        {/* Narrative / Bio */}
        <section className="card-elevated" style={{ marginBottom: '3rem', padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Engineering Focus
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
            <p>
              I am pursuing my Bachelor of Engineering in Computer Science &amp; Engineering at <strong>BMS College of Engineering (BMSCE)</strong>, Bengaluru (Expected June 2028, current CGPA: 8.08/10).
            </p>
            <p>
              My primary focus lies in <strong>backend engineering</strong>, <strong>full-stack system architecture</strong>, <strong>applied AI</strong>, and <strong>core problem solving</strong>. I concentrate on practical project building: designing software systems that solve real operational friction rather than building surface-level prototypes.
            </p>
            <p>
              Through projects like <strong>ForgeIQ</strong> (manufacturing CAD parsing, 40+ REST endpoints, and 9-stage tracking) and <strong>QWait Estimator</strong> (real-time clinic queue management), I have developed a strong appreciation for deterministic logic, type-safe API boundaries, automated testing (Pytest and Playwright), and data-backed performance optimization.
            </p>
            <p>
              Outside of system architecture, I practice algorithmic problem solving daily on LeetCode (100+ problems solved across arrays, trees, graphs, and dynamic programming) and continually strengthen my applied AI foundation across industry learning tracks.
            </p>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ gap: '0.45rem' }}
            >
              <FileText size={16} />
              <span>Download Official Resume (PDF)</span>
            </a>
            <Link href="/projects" className="btn btn-secondary">
              <span>View Technical Projects</span>
            </Link>
          </div>
        </section>

        {/* Education Detail */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <GraduationCap size={22} color="#60a5fa" />
            <span>Formal Education</span>
          </h2>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                  B.E., Computer Science &amp; Engineering
                </h3>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-accent)', marginTop: '0.2rem' }}>
                  BMS College of Engineering (BMSCE), Bengaluru
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-emerald">Expected June 2028</span>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '0.875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: '#93c5fd',
            }}>
              Current CGPA: 8.08 / 10
            </div>
          </div>
        </section>

        {/* Achievements & Scholarships */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={22} color="#fbbf24" />
            <span>Key Achievements</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {achievements.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '0.5rem' }}>
                  {item.organization}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community & Leadership */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Users size={22} color="#34d399" />
            <span>Community &amp; Volunteering</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {leadership.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.organization}</h3>
                  <span className="badge">{item.period}</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '0.5rem' }}>
                  {item.role}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {item.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Spoken Languages */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Languages size={22} color="#c084fc" />
            <span>Spoken Languages</span>
          </h2>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skills.spokenLanguages.map((lang) => (
                <div
                  key={lang}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
