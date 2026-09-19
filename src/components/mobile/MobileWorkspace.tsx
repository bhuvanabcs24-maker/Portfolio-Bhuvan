'use client';

import React, { useState } from 'react';
import { useOS } from '@/components/os/OSContext';
import MobileEntryScreen from './MobileEntryScreen';
import MobileTopBar from './MobileTopBar';
import MobileForgeIQPipeline from './MobileForgeIQPipeline';
import CommandPalette from '@/components/os/CommandPalette';
import {
  ArrowRight, ExternalLink, Code2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

// Artifact card for projects section
function MobileArtifactCard({
  code, title, category, summary, tech, link, externalLink, id,
}: {
  code: string; title: string; category: string; summary: string;
  tech: string[]; link?: string; externalLink?: string; id?: string;
}) {
  return (
    <article className="mb-artifact-card" id={id}>
      <div className="mb-artifact-header">
        <span className="mb-artifact-code">{code}</span>
        <span className="mb-artifact-badge">ARTIFACT</span>
      </div>
      <h3 className="mb-artifact-title">{title}</h3>
      <div className="mb-artifact-category">{category}</div>
      <p className="mb-artifact-summary">{summary}</p>
      <div className="mb-artifact-tech">
        {tech.map(t => <span key={t} className="mb-stack-tag">{t}</span>)}
      </div>
      {(link || externalLink) && (
        <div className="mb-artifact-actions">
          {link && (
            <a href={link} className="mb-artifact-btn-primary" aria-label={`View ${title}`}>
              <span>VIEW</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          )}
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-artifact-btn-secondary"
              aria-label={`External link for ${title}`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>GITHUB</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// Engineering Lab module card
function MobileLabCard({ title, desc, items, link }: {
  title: string; desc: string; items: string[]; link: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-lab-card">
      <button
        className="mb-lab-card-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${title}`}
      >
        <div>
          <div className="mb-lab-card-title">{title}</div>
          <div className="mb-lab-card-desc">{desc}</div>
        </div>
        <span className="mb-lab-expand-icon" aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </button>
      {expanded && (
        <div className="mb-lab-card-body">
          {items.map((item, i) => (
            <div key={i} className="mb-lab-item">
              <span className="mb-lab-item-dot" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
          <a href={link} className="mb-lab-card-link" aria-label={`View ${title}`}>
            VIEW FULL <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function MobileWorkspace() {
  const { hasEnteredWorkspace } = useOS();

  if (!hasEnteredWorkspace) {
    return <MobileEntryScreen />;
  }

  return (
    <div className="mb-workspace">
      {/* Fixed top bar */}
      <MobileTopBar />

      {/* Scrollable content */}
      <main className="mb-main" id="mb-main-content" tabIndex={-1}>

        {/* ── HERO ──────────────────────────────── */}
        <section className="mb-hero" id="mb-section-hero" aria-label="Hero">
          <div className="mb-hero-sys">
            <span className="mb-topbar-dot" aria-hidden="true" />
            <span>BHUVAN · BUILD 2026</span>
          </div>
          <h1 className="mb-hero-name">
            BHUVAN
            <br />
            <span className="mb-hero-name-sub">A B</span>
          </h1>
          <div className="mb-hero-role">
            <span>SOFTWARE ENGINEER</span>
            <div className="mb-hero-tags">
              <span>AI SYSTEMS</span>
              <span className="mb-hero-tag-dot">·</span>
              <span>BACKEND</span>
              <span className="mb-hero-tag-dot">·</span>
              <span>FULL-STACK</span>
            </div>
          </div>
          <p className="mb-hero-statement">
            Building software systems where AI meets real-world workflows.
          </p>
          <div className="mb-hero-meta">
            <span>BMSCE · B.E. CSE · 2028</span>
            <span className="mb-entry-divider">·</span>
            <span>CGPA 8.08</span>
            <span className="mb-entry-divider">·</span>
            <span>100+ LeetCode</span>
          </div>
          <div className="mb-hero-links">
            <a
              href="https://github.com/bhuvanabcs24-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-hero-link"
              aria-label="GitHub profile"
            >
              <GithubIcon size={18} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/bhuvan-a-b-cs24"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-hero-link"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={18} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-hero-link mb-hero-link-accent"
              aria-label="Download resume PDF"
            >
              <span>RESUME ↗</span>
            </a>
          </div>
        </section>

        {/* ── FORGEIQ ───────────────────────────── */}
        <section
          className="mb-section"
          id="mb-section-forgeiq"
          aria-label="ForgeIQ System"
        >
          <MobileForgeIQPipeline />
        </section>

        {/* ── ENGINEERING LAB ───────────────────── */}
        <section
          className="mb-section"
          id="mb-section-lab"
          aria-label="Engineering Lab"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">03</span>
            <h2 className="mb-section-title">ENGINEERING LAB</h2>
          </div>
          <p className="mb-section-desc">
            System design thinking, architecture decisions, and engineering retrospectives.
          </p>
          <div className="mb-lab-cards">
            <MobileLabCard
              title="ARCHITECTURE DECISIONS"
              desc="10 Architecture Decision Records"
              items={[
                'ADR-001: FastAPI over Django REST',
                'ADR-002: Deterministic CAD parsing over LLM geometry',
                'ADR-003: PostgreSQL + pgvector over dedicated vector DB',
                'ADR-004: KD-Tree spatial clustering for vertex snapping',
                'ADR-005: Pydantic v2 strict schema validation',
              ]}
              link="/engineering/decisions"
            />
            <MobileLabCard
              title="AI EVALUATION FRAMEWORK"
              desc="8-dimension AI system verification"
              items={[
                'Factual Accuracy · Schema Compliance',
                'Hallucination Resistance · Output Stability',
                'Latency Budget · Cost Per Token',
                'Edge Case Robustness · Guardrail Enforcement',
              ]}
              link="/engineering/evaluation"
            />
            <MobileLabCard
              title="SYSTEM PATTERNS"
              desc="Production design patterns applied"
              items={[
                'Pattern 01: Deterministic-AI Hybrid Pipeline',
                'Pattern 02: Schema-First API Design',
                'Pattern 03: Event Sourcing with FSM',
                'Pattern 04: Multi-Tenant RBAC Architecture',
              ]}
              link="/engineering/patterns"
            />
            <MobileLabCard
              title="ENGINEERING LEARNINGS"
              desc="4 failure retrospectives"
              items={[
                'LLM geometry hallucination — switched to KD-Tree',
                'PostgreSQL N+1 queries — resolved with eager loading',
                'Missing Pydantic validation — led to bad state machine',
                'Premature pgvector adoption — cost overhead justified later',
              ]}
              link="/engineering/learnings"
            />
          </div>
        </section>

        {/* ── OPEN SOURCE ───────────────────────── */}
        <section
          className="mb-section"
          id="mb-section-opensource"
          aria-label="Open Source"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">04</span>
            <h2 className="mb-section-title">OPEN SOURCE</h2>
          </div>
          <MobileArtifactCard
            id="mb-artifact-dxf"
            code="PKG_01"
            title="DXF-CONTOUR-EXTRACTOR"
            category="GEOMETRY PROCESSING · PYTHON"
            summary="Automated 2D CAD closed contour parsing and geometric validation pipeline. Handles micro-gap vertex snapping, nested loop detection, and pierce count extraction from raw DXF streams."
            tech={['Python', 'NetworkX', 'ezdxf', 'scipy.spatial', 'KD-Tree']}
            link="/opensource"
            externalLink="https://github.com/bhuvanabcs24-maker"
          />
        </section>

        {/* ── PROJECTS ──────────────────────────── */}
        <section
          className="mb-section"
          id="mb-section-notes"
          aria-label="Projects"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">05</span>
            <h2 className="mb-section-title">PROJECTS</h2>
          </div>
          <div className="mb-artifacts-grid">
            <MobileArtifactCard
              id="mb-artifact-qwait"
              code="PRJ_01"
              title="QWAIT ESTIMATOR"
              category="QUEUE MANAGEMENT SYSTEM"
              summary="QR check-in, live queue tracking, wait-time estimation, staff dashboard, and venue mapping for managing physical queues efficiently."
              tech={['Python', 'FastAPI', 'WebSockets', 'PostgreSQL', 'Next.js']}
              externalLink="https://github.com/bhuvanabcs24-maker/QueueEstimater"
            />
          </div>
        </section>

        {/* ── NOTES / WRITING ───────────────────── */}
        <section
          className="mb-section"
          id="mb-section-notes-writing"
          aria-label="Technical Writing"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">05</span>
            <h2 className="mb-section-title">NOTES</h2>
          </div>
          <div className="mb-notes-list">
            <a href="/writing/why-cad-understanding-is-difficult" className="mb-note-item">
              <span className="mb-note-id">NOTE_01</span>
              <span className="mb-note-title">Why CAD Understanding is Difficult for LLMs</span>
              <ArrowRight size={14} className="mb-note-arrow" aria-hidden="true" />
            </a>
          </div>
          <a href="/writing" className="mb-section-link">
            VIEW ALL NOTES <ArrowRight size={13} aria-hidden="true" />
          </a>
        </section>

        {/* ── PROFILE ───────────────────────────── */}
        <section
          className="mb-section"
          id="mb-section-profile"
          aria-label="Profile"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">06</span>
            <h2 className="mb-section-title">PROFILE</h2>
          </div>

          {/* Identity block */}
          <div className="mb-profile-identity">
            <div className="mb-profile-name">BHUVAN A B</div>
            <div className="mb-profile-edu">
              B.E. Computer Science & Engineering
            </div>
            <div className="mb-profile-school">
              BMS College of Engineering · Expected June 2028
            </div>
            <div className="mb-profile-cgpa">
              <span className="mb-profile-cgpa-label">CGPA</span>
              <span className="mb-profile-cgpa-val">8.08</span>
            </div>
          </div>

          {/* Skills grid */}
          <div className="mb-skills-grid">
            {[
              {
                title: 'LANGUAGES', color: '#60a5fa',
                items: ['C', 'Java', 'Python', 'JavaScript'],
              },
              {
                title: 'CORE CS', color: '#10b981',
                items: ['Data Structures & Algorithms', 'Problem Solving', 'SQL', 'DBMS', 'System Design'],
              },
              {
                title: 'WEB & SYSTEMS', color: '#f59e0b',
                items: ['REST APIs', 'FastAPI', 'Next.js', 'Git', 'Linux'],
              },
              {
                title: 'AI / ML', color: '#a855f7',
                items: ['Machine Learning', 'Neural Networks', 'Generative AI', 'Prompt Engineering'],
              },
            ].map(cat => (
              <div key={cat.title} className="mb-skill-category">
                <div
                  className="mb-skill-category-title"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </div>
                <div className="mb-skill-items">
                  {cat.items.map(item => (
                    <span key={item} className="mb-skill-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* LeetCode */}
          <div className="mb-leetcode-row">
            <Code2 size={16} aria-hidden="true" />
            <span>100+ Problems Solved on LeetCode</span>
            <a
              href="https://leetcode.com/u/BHUVANab2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-leetcode-link"
              aria-label="LeetCode profile"
            >
              VIEW ↗
            </a>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────── */}
        <section
          className="mb-section mb-section-last"
          id="mb-section-contact"
          aria-label="Contact"
        >
          <div className="mb-section-header">
            <span className="mb-section-code">07</span>
            <h2 className="mb-section-title">CONTACT</h2>
          </div>
          <div className="mb-contact-links">
            <a
              href="mailto:bhuvanab.cs24@bmsce.ac.in"
              className="mb-contact-row"
              aria-label="Send email"
            >
              <span className="mb-contact-label">EMAIL</span>
              <span className="mb-contact-value">bhuvanab.cs24@bmsce.ac.in</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/bhuvan-a-b-cs24"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-contact-row"
              aria-label="LinkedIn profile"
            >
              <span className="mb-contact-label">LINKEDIN</span>
              <span className="mb-contact-value">bhuvan-a-b-cs24</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/bhuvanabcs24-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-contact-row"
              aria-label="GitHub profile"
            >
              <span className="mb-contact-label">GITHUB</span>
              <span className="mb-contact-value">bhuvanabcs24-maker</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href="https://leetcode.com/u/BHUVANab2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-contact-row"
              aria-label="LeetCode profile"
            >
              <span className="mb-contact-label">LEETCODE</span>
              <span className="mb-contact-value">BHUVANab2006</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
          <p className="mb-contact-location">
            📍 Bengaluru, Karnataka, India
          </p>
        </section>

        {/* Footer */}
        <footer className="mb-footer">
          <div className="mb-footer-brand">BHUVAN</div>
          <div className="mb-footer-meta">BUILD 2026 · SYSTEM ONLINE</div>
          <div className="mb-footer-stack">FASTAPI + NEXT.JS + POSTGRESQL</div>
        </footer>
      </main>

      {/* Command Palette (shared with desktop) */}
      <CommandPalette />
    </div>
  );
}
