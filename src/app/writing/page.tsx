'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Clock, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Layers, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  isPublished: boolean;
  date: string;
  readTime: string;
  categories: string[];
  categoryLabels: string[];
  summary: string;
  component: string;
  isFullArticle: boolean;
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'cad-understanding-manufacturing',
    slug: 'why-cad-understanding-is-difficult',
    title: 'Why CAD Understanding Is Difficult for Manufacturing Automation',
    subtitle: 'Geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF and 3D STEP files requires graph math rather than generative AI.',
    status: 'Published Note',
    isPublished: true,
    date: 'September 2026',
    readTime: '9 min read',
    categories: ['manufacturing', 'ai', 'system'],
    categoryLabels: ['Manufacturing Technology', 'AI Engineering', 'System Design'],
    summary: 'When mechanical drawings are uploaded to an automated quotation system, they cannot be treated like images or raw text. This note explores why naive polyline traversal fails, how graph-based vertex snapping resolves micro-gaps, and why deterministic geometry algorithms must precede AI inference.',
    component: 'backend/services/cad_preprocessor.py',
    isFullArticle: true
  },
  {
    id: 'designing-safe-ai-systems',
    slug: 'designing-ai-systems-that-fail-safely',
    title: 'Designing AI Systems That Fail Safely',
    subtitle: 'Defensive Pydantic schema enforcement, temperature zero fallbacks, and multi-tier verification in physical software systems.',
    status: 'Draft',
    isPublished: false,
    date: 'Upcoming Note',
    readTime: '7 min read',
    categories: ['ai', 'testing', 'system'],
    categoryLabels: ['AI Engineering', 'Testing', 'System Design'],
    summary: 'When language models operate within systems that generate financial quotes or physical machining specifications, unhandled hallucinations cause real-world damage. This note outlines strategies for deterministic schema containment, JSON repair regexes, and circuit breakers.',
    component: 'backend/ai/quotation_engine.py & backend/ai/factory.py',
    isFullArticle: false
  },
  {
    id: 'building-manufacturing-workflow',
    slug: 'building-an-ai-powered-manufacturing-workflow',
    title: 'Building an AI-Powered Manufacturing Workflow',
    subtitle: 'Orchestrating a 9-stage production lifecycle between buyers, factory admins, and quality inspectors with append-only audit trails.',
    status: 'Draft',
    isPublished: false,
    date: 'Upcoming Note',
    readTime: '8 min read',
    categories: ['manufacturing', 'backend', 'system'],
    categoryLabels: ['Manufacturing Technology', 'Backend Engineering', 'System Design'],
    summary: 'How ForgeIQ structures order states from RFQ intake to final CNC machining and quality dispatch. Discusses state transition validation, database locking under concurrency, and decoupling real-time event updates.',
    component: 'backend/services/order_workflow.py',
    isFullArticle: false
  },
  {
    id: 'evaluating-rag-beyond-accuracy',
    slug: 'evaluating-rag-beyond-retrieval-accuracy',
    title: 'Evaluating RAG Beyond Retrieval Accuracy',
    subtitle: 'Why high cosine similarity can retrieve operationally illegal recommendations, and how hybrid SQL metadata filters prevent hallucinated manufacturing standards.',
    status: 'Draft',
    isPublished: false,
    date: 'Upcoming Note',
    readTime: '6 min read',
    categories: ['ai', 'testing', 'backend'],
    categoryLabels: ['AI Engineering', 'Testing', 'Backend Engineering'],
    summary: 'Vector similarity measures semantic proximity, not regulatory compliance. Explores why combining relational WHERE clauses with pgvector cosine distance ranking is essential for aerospace, medical, and industrial standards retrieval.',
    component: 'backend/retrieval/hybrid_search.py',
    isFullArticle: false
  },
  {
    id: 'engineering-trade-offs-forgeiq',
    slug: 'engineering-trade-offs-behind-forgeiq',
    title: 'Engineering Trade-offs Behind ForgeIQ',
    subtitle: 'Why PostgreSQL over MongoDB, FastAPI over Node.js, and ProcessPoolExecutor over raw async event loops.',
    status: 'Draft',
    isPublished: false,
    date: 'Upcoming Note',
    readTime: '10 min read',
    categories: ['system', 'backend', 'learning'],
    categoryLabels: ['System Design', 'Backend Engineering', 'Learning'],
    summary: 'An honest review of what worked, what caused bottlenecks (N+1 query connection pool starvation), and what I would build differently at enterprise scale.',
    component: 'Full-Stack System Architecture',
    isFullArticle: false
  }
];

export default function WritingHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.categories.includes(selectedCategory));

  return (
    <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Breadcrumb Links */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering" style={{ fontSize: '0.85rem', color: '#60a5fa' }}>
            Engineering Philosophy ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/patterns" style={{ fontSize: '0.85rem', color: '#34d399' }}>
            5 Engineering Patterns ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/learnings" style={{ fontSize: '0.85rem', color: '#f59e0b' }}>
            6 Engineering Learnings ↗
          </Link>
        </div>

        {/* Masthead */}
        <header style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.85rem' }}>
            Technical Writing Hub
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            Engineering Notes: Architecture, Experiments &amp; Lessons
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.5rem' }}>
            In-depth technical writeups on real engineering problems: CAD vector parsing, deterministic system boundaries, hybrid retrieval pipelines, and distributed concurrency. No generic SEO fluff—grounded purely in what I explored, implemented, and evaluated.
          </p>
          <div style={{
            background: 'rgba(14, 21, 37, 0.65)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '0.95rem 1.25rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div><strong>Honest Editorial Policy:</strong> Drafts are transparently labeled as drafts. Zero fake publications.</div>
            <div><strong>Engineering Focus:</strong> Architecture trade-offs, empirical measurements, and failure mitigations.</div>
          </div>
        </header>

        {/* Category Toolbar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Filter by Topic:
          </div>
          <div className="writing-filter-bar" role="toolbar" aria-label="Filter technical notes by topic">
            <button 
              className={`writing-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Articles ({ARTICLES.length})
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ai')}
            >
              AI Engineering
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'manufacturing' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('manufacturing')}
            >
              Manufacturing Technology
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'backend' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('backend')}
            >
              Backend Engineering
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'system' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('system')}
            >
              System Design
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'testing' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('testing')}
            >
              Testing
            </button>
            <button 
              className={`writing-filter-btn ${selectedCategory === 'learning' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('learning')}
            >
              Learning
            </button>
          </div>
        </div>

        {/* Articles List */}
        <div className="writing-list">
          {filteredArticles.map((article) => (
            <article key={article.id} className="writing-card" id={article.id}>
              <div>
                <div className="writing-card-header">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {article.isPublished ? (
                      <span className="status-badge-published">{article.status}</span>
                    ) : (
                      <span className="status-badge-draft">{article.status}</span>
                    )}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {article.readTime}
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>·</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {article.date}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {article.categoryLabels.map((lbl) => (
                      <span key={lbl} className="pattern-tag pattern-tag-arch">
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '0.85rem' }}>
                  {article.isFullArticle ? (
                    <h2 className="writing-card-title">
                      <Link href={`/writing/${article.slug}`}>{article.title}</Link>
                    </h2>
                  ) : (
                    <h2 className="writing-card-title">{article.title}</h2>
                  )}
                  <p style={{ fontSize: '0.9rem', color: '#93c5fd', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {article.subtitle}
                  </p>
                  <p className="writing-card-desc">{article.summary}</p>
                </div>
              </div>

              <div className="writing-card-footer">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Component:</span>
                  <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa', fontSize: '0.775rem' }}>
                    {article.component}
                  </code>
                </div>
                {article.isFullArticle ? (
                  <Link href={`/writing/${article.slug}`} className="btn btn-sm btn-primary">
                    Read Article →
                  </Link>
                ) : (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Draft in Progress
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Footer Deep Dives Callout */}
        <div className="card-elevated" style={{
          marginTop: '4rem',
          padding: '2.5rem',
          textAlign: 'center',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.85))'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.65rem' }}>Explore Full Engineering Documentation</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
            Inspect the underlying architectural records, benchmark pipelines, and reusable system patterns referenced in these technical notes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/engineering/decisions" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>14 Decisions (ADRs) →</span>
            </Link>
            <Link href="/engineering/patterns" className="btn btn-secondary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>5 Engineering Patterns →</span>
            </Link>
            <Link href="/engineering/learnings" className="btn btn-secondary" style={{ padding: '0.65rem 1.35rem', color: '#fcd34d', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
              <span>6 Engineering Learnings →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
