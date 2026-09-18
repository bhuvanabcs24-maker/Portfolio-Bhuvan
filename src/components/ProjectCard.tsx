import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { Project } from '@/data/portfolioData';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article style={{
      backgroundColor: 'var(--bg-card)',
      border: featured ? '1px solid rgba(59, 130, 246, 0.35)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      backdropFilter: 'blur(12px)',
      boxShadow: featured ? '0 12px 36px -8px rgba(37, 99, 235, 0.15)' : 'var(--shadow-md)',
      position: 'relative',
    }}>
      {featured && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.2rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          color: '#93c5fa',
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '1rem',
        }}>
          Featured Engineering Project
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-accent)' }}>
            {project.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-secondary"
              style={{ gap: '0.4rem' }}
            >
              <GithubIcon size={15} />
              <span>Repository</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
              style={{ gap: '0.4rem' }}
            >
              <ExternalLink size={15} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {project.tagline}
      </p>

      {/* Tech Stack Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Verified Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.75rem',
          padding: '1.1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(8, 12, 20, 0.6)',
          border: '1px solid var(--border-subtle)',
        }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: '#60a5fa',
                letterSpacing: '-0.02em',
              }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                {m.label}
              </div>
              {m.detail && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {m.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Engineering Work List */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Resume-Supported Engineering Implementation:
        </h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {project.bulletPoints.map((bp, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span>{bp}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.caseStudyUrl && (
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <Link
            href={project.caseStudyUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#60a5fa',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            <span>Read Complete Engineering Case Study & Benchmark</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </article>
  );
}
