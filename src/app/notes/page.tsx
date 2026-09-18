import React from 'react';
import Link from 'next/link';
import { BookOpen, BrainCircuit, Code2, Layers, Cpu, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const metadata = {
  title: 'Writing & Technical Notes | Bhuvan A B',
  description: 'Technical notes and architectural writeups by Bhuvan A B on applied AI, deterministic systems, algorithmic patterns, and queue modeling.',
};

export default function NotesPage() {
  const notes = [
    {
      id: 'deterministic-vs-ai',
      badge: 'Systems & CAD',
      badgeColor: 'badge-blue',
      title: 'Deterministic vs. Probabilistic Architecture: Why Manufacturing Can’t Rely on Vision LLMs',
      date: 'Engineering Note',
      summary: 'When building ForgeIQ, the initial question was whether to feed CAD drawings directly into multimodal models. This note examines why vector-level geometry parsing (ezdxf) is mandatory for physical tolerances, and where LLMs actually provide value (unstructured RFQ text).',
      tags: ['CAD Parsing', 'FastAPI', 'System Architecture', 'Applied AI']
    },
    {
      id: 'ai-learning-synthesis',
      badge: 'Applied AI',
      badgeColor: 'badge-purple',
      title: 'Synthesizing 10 AI Learning Tracks: What Grounded AI Means for Software Engineers',
      date: 'Learning Track Synthesis',
      summary: 'A structured review of foundational concepts learned across 10 industry tracks (Machine Learning, NLP, LLMs, and Agentic AI). Highlights why prompt engineering and tool invocation require strict input validation and boundary guards.',
      tags: ['Machine Learning', 'NLP', 'LLMs', 'Agentic AI']
    },
    {
      id: 'dsa-system-design',
      badge: 'Core CS',
      badgeColor: 'badge-emerald',
      title: 'Algorithmic Patterns from 100+ LeetCode Problems and How They Apply to Backend Services',
      date: 'Problem Solving Retrospective',
      summary: 'Connecting data structure fundamentals—graphs for dependency trees, dynamic programming for resource allocation, and sliding windows for rate limiters—to real backend engineering problems in FastAPI and PostgreSQL.',
      tags: ['Data Structures', 'Algorithms', 'LeetCode', 'System Design']
    },
    {
      id: 'queue-latency-modeling',
      badge: 'Web Architecture',
      badgeColor: 'badge-amber',
      title: 'Designing Real-Time Queue Dashboards: Lessons from QWait Estimator',
      date: 'Architecture Note',
      summary: 'Analyzing client-side QR check-in flows, doctor consultation state progression, and interactive venue mapping. How to manage real-time updates and estimate patient wait times under uncertain appointment lengths.',
      tags: ['Next.js', 'Real-time Dashboards', 'Queue Theory', 'UI/UX']
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.65rem' }}>
            Technical Documentation & Retrospectives
          </div>
          <h1>Writing &amp; Notes</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.65 }}>
            Practical writeups and engineering observations based on real project building, coursework at BMSCE, algorithmic problem solving, and foundational AI learning tracks.
          </p>
        </div>

        {/* Notes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {notes.map((note) => (
            <article key={note.id} className="card-elevated" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className={`badge ${note.badgeColor}`}>{note.badge}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{note.date}</span>
              </div>

              <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {note.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {note.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="callout callout-emerald" style={{ marginTop: '3.5rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Authenticity & Academic Rigor:</strong>
          <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
            These notes represent my active personal engineering synthesis as a Computer Science student at BMSCE. I believe in documenting trade-offs, architecture decisions, and learning progress transparently.
          </p>
        </div>
      </div>
    </div>
  );
}
