import React from 'react';
import Link from 'next/link';
import { Mail, Code2, FileText, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-secondary)',
      padding: '3.5rem 0 2rem',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Col 1: Identity & Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #2563eb, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}>
                B
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.5 }}>
              Computer Science & Engineering Student
              <br />
              <strong style={{ color: 'var(--text-primary)' }}>{PORTFOLIO_DATA.personal.college}</strong>
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Graduation: {PORTFOLIO_DATA.personal.graduation} · CGPA: {PORTFOLIO_DATA.personal.cgpa}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Explore Portfolio
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.875rem' }}>
              <Link href="/projects" style={{ color: 'var(--text-secondary)' }}>Projects Overview</Link>
              <Link href="/forgeiq-case-study" style={{ color: 'var(--text-secondary)' }}>ForgeIQ Case Study (5.5x Optimization)</Link>
              <Link href="/engineering" style={{ color: 'var(--text-secondary)' }}>Engineering & Testing Discipline</Link>
              <Link href="/notes" style={{ color: 'var(--text-secondary)' }}>Writing & Applied AI Notes</Link>
              <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About & Education</Link>
              <Link href="/certifications" style={{ color: 'var(--text-secondary)' }}>Verified Certifications</Link>
            </div>
          </div>

          {/* Col 3: Source of Truth Statement */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Source of Truth Guarantee
            </h4>
            <div style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
            }}>
              <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <p style={{ fontSize: '0.8rem', color: '#a7f3d0', lineHeight: 1.45 }}>
                Every metric, test count, project detail, and credential on this website is verified against my current resume and actual git repositories. Zero fabricated metrics.
              </p>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary"
                style={{ width: '100%', gap: '0.4rem' }}
              >
                <FileText size={14} />
                <span>View Official Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Col 4: Verified Channels */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Connect & Verify
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              >
                <GithubIcon size={16} />
                <span>github.com/bhuvanabcs24-maker</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              >
                <Code2 size={16} />
                <span>LeetCode (100+ Solved)</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              >
                <Mail size={16} />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Built with Next.js & TypeScript.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Expected June 2028</span>
            <span>·</span>
            <span>BMSCE, Bangalore</span>
            <span>·</span>
            <span>CGPA: 8.08</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
