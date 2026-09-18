'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ExternalLink, 
  BookOpen, 
  Folder, 
  FileCode, 
  Tag, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Code2
} from 'lucide-react';

interface ArticleDoc {
  id: string;
  filename: string;
  title: string;
  topic: 'CAD' | 'AI Engineering' | 'Backend' | 'Systems' | 'Testing';
  status: 'Published' | 'Draft';
  lines: number;
  readTime: string;
  date: string;
  slug?: string;
  summary: string;
  content: string[];
}

const ARTICLES: ArticleDoc[] = [
  {
    id: 'art-01',
    filename: 'why_cad_understanding_is_difficult.md',
    title: 'Why CAD Understanding Is Difficult for Manufacturing Automation',
    topic: 'CAD',
    status: 'Published',
    lines: 142,
    readTime: '8 min read',
    date: 'September 2024',
    slug: 'why-cad-understanding-is-difficult',
    summary: 'An engineering analysis of geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF files requires graph math rather than generative AI vision models.',
    content: [
      '# Why CAD Understanding Is Difficult for Manufacturing Automation',
      '',
      'Generic multimodal vision models (e.g. GPT-4V, Gemini Pro Vision) have demonstrated impressive performance on photographs, diagrams, and invoices. However, when applied to industrial manufacturing workflows—specifically CNC milling, laser cutting, and sheet-metal bending—vision models fail catastrophically.',
      '',
      '## The Core Problem: Visual Approximation vs. Micro-Millimeter Reality',
      'In manufacturing, geometry is not an aesthetic pattern; it is a legal and physical contract. A hole positioned at (124.005mm, 42.000mm) must be machined exactly at those Euclidean coordinates. A pixel-based vision model approximates edges based on rasterized pixels, discarding floating-point coordinates.',
      '',
      '## The Drafter Gap Dilemma',
      'Human draftsmen working in AutoCAD frequently leave micro-gaps (e.g. 0.002mm to 0.015mm) between intersecting lines. While visually invisible to human operators at 100% zoom, a vector parsing algorithm sees unclosed topological boundaries. Without closed loops, laser pierce points cannot be computed and cutting toolpaths fail.',
      '',
      '## The Deterministic Grounding Solution',
      'Rather than prompting an LLM to guess coordinates, ForgeIQ isolates CAD ingestion into deterministic computational geometry:',
      '1. KD-Tree spatial coordinate clustering with configurable epsilon (0.01mm) tolerance.',
      '2. NetworkX cycle basis extraction to identify closed interior holes and exterior boundaries.',
      '3. Exact Euclidean travel summation for piercing and feed rate estimation.',
      '',
      'Generative AI is strictly confined to business margin advisory, while geometry remains 100% deterministic.'
    ]
  },
  {
    id: 'art-02',
    filename: 'designing_ai_systems_that_fail_safely.md',
    title: 'Designing AI Systems That Fail Safely in Industrial Pipelines',
    topic: 'AI Engineering',
    status: 'Draft',
    lines: 118,
    readTime: '6 min read',
    date: 'Draft · Review Phase',
    summary: 'Deterministic boundaries, fallback providers, and structured Pydantic schema validation when integrating LLMs into operations.',
    content: [
      '# Designing AI Systems That Fail Safely in Industrial Pipelines',
      '',
      'In consumer software, an LLM generating a slightly off-tone joke or vague summary is a minor annoyance. In an industrial quotation platform, an LLM hallucinating that 6061-T6 aluminum requires waterjet cutting instead of fiber laser cutting results in vendor scrap, broken tooling, and lost contracts.',
      '',
      '## Three Principles of Industrial AI Safety',
      '',
      '### 1. Hard Schema Gates (Zero Free-Form Text Ingestion)',
      'No downstream service or database query should ever accept unstructured strings from an LLM. Every LLM generation must be validated against a Pydantic v2 schema with strict enum constraints. If validation fails, the system executes an automated fallback or prompts for human clarification.',
      '',
      '### 2. Multi-Tier Circuit Breakers',
      'External model APIs suffer from latency spikes, rate limits, and occasional provider outages. ForgeIQ uses a Circuit Breaker pattern that transparently switches from remote cloud models to deterministic heuristic lookup tables when API latency exceeds 2.5 seconds.',
      '',
      '### 3. Immutable Audit Telemetry',
      'Every inference request, prompt template hash, raw provider payload, and validator status is recorded in an append-only transaction audit table, allowing complete post-incident reproduction.'
    ]
  },
  {
    id: 'art-03',
    filename: 'engineering_tradeoffs_behind_forgeiq.md',
    title: 'Engineering Trade-offs Behind ForgeIQ: Async Python, Schemas & Integrity',
    topic: 'Backend',
    status: 'Draft',
    lines: 126,
    readTime: '7 min read',
    date: 'Draft · Technical Review',
    summary: 'Why we chose FastAPI over Express, PostgreSQL JSONB over MongoDB, and decoupled CPU geometry parsing from async network loops.',
    content: [
      '# Engineering Trade-offs Behind ForgeIQ',
      '',
      'Every system design decision is a trade-off. In building ForgeIQ, our choices prioritized physical correctness, developer velocity in scientific Python, and transactional data integrity over superficial trendiness.',
      '',
      '## FastAPI vs. Express.js / Go',
      'While Go and Node.js provide excellent raw HTTP throughput, CAD processing relies on mature Python libraries (ezdxf, shapely, networkx, scipy). Building an Express backend would have required fragile cross-process IPC or microservice wrappers. FastAPI provided sub-millisecond serialization while keeping geometry algorithms native.',
      '',
      '## PostgreSQL Relational + JSONB vs. Pure NoSQL',
      'Quotation line items vary dramatically between CNC milling and sheet-metal cutting. While MongoDB offers schema flexibility, procurement transactions require ACID financial guarantees. PostgreSQL with typed relational parent tables and JSONB line item parameters gave us the best of both worlds.'
    ]
  },
  {
    id: 'art-04',
    filename: 'evaluating_rag_beyond_retrieval_accuracy.md',
    title: 'Evaluating RAG Beyond Simple Vector Cosine Accuracy',
    topic: 'Systems',
    status: 'Draft',
    lines: 108,
    readTime: '6 min read',
    date: 'Draft · Research Notes',
    summary: 'Why unfiltered semantic similarity breaks on industrial metadata and how pre-filtering restores retrieval precision.',
    content: [
      '# Evaluating RAG Beyond Simple Vector Cosine Accuracy',
      '',
      'Standard RAG benchmarks prioritize semantic similarity. However, in engineering retrieval, two materials might have 95% semantic proximity in text while being physically incompatible in a CNC milling machine.',
      '',
      '## The Vector Proximity Trap',
      'Stainless Steel 304 and Stainless Steel 316L appear nearly identical in natural language descriptions. But 316L contains molybdenum for marine corrosion resistance. If a vector search recommends an SS304 vendor for a chemical plant RFQ due to cosine closeness, the resulting part will corrode and fail.',
      '',
      '## The Solution: Metadata Pre-Partitioning',
      'In ForgeIQ, pgvector similarity queries are strictly partitioned by relational machine capability IDs before cosine distance calculations are evaluated, boosting precision@5 from 68.0% to 91.4%.'
    ]
  },
  {
    id: 'art-05',
    filename: 'testing_ai_powered_manufacturing_workflow.md',
    title: 'Testing an AI-Powered Manufacturing Workflow: From Unit Tests to 14 E2E Suites',
    topic: 'Testing',
    status: 'Draft',
    lines: 114,
    readTime: '7 min read',
    date: 'Draft · Systems Testing',
    summary: 'How we achieved 47 automated tests without flakiness: Mock AI providers, deterministic CAD fixtures, and Playwright transaction polling.',
    content: [
      '# Testing an AI-Powered Manufacturing Workflow',
      '',
      'Testing software that integrates non-deterministic AI models is notoriously difficult. Test suites either become brittle due to changing LLM responses or become expensive and slow due to repeated API calls.',
      '',
      '## The Mock AI Provider Strategy',
      'In CI/CD environments, ForgeIQ swaps remote cloud LLMs for a local Mock Provider that returns deterministic, mathematically verified fixture responses. This allows all 33 Pytest unit/integration tests to execute in 0.42 seconds without network overhead.',
      '',
      '## Playwright E2E Synchronization',
      'To eliminate flaky tests during complex 9-stage order state transitions, our 14 Playwright end-to-end tests poll explicit backend database event IDs rather than relying on brittle arbitrary sleep timeouts.'
    ]
  }
];

export default function WritingApp() {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDocId, setSelectedDocId] = useState<string>('art-01');

  const topics: ('All' | 'AI Engineering' | 'CAD' | 'Backend' | 'Systems' | 'Testing')[] = [
    'All',
    'CAD',
    'AI Engineering',
    'Backend',
    'Systems',
    'Testing'
  ];

  const filteredArticles = selectedTopic === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.topic === selectedTopic);

  const activeDoc = ARTICLES.find(a => a.id === selectedDocId) || ARTICLES[0];

  return (
    <div className="os-app-container">
      <div className="os-ide-layout">
        {/* Left IDE File Tree & Topic Filter */}
        <div className="os-ide-sidebar">
          {/* Topic Filter Pills */}
          <div className="os-ide-filter-bar">
            <div style={{ fontSize: '0.675rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginBottom: '0.35rem', fontWeight: 600 }}>
              FILTER BY TOPIC:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {topics.map((t) => (
                <button
                  key={t}
                  className={`os-ide-filter-pill ${selectedTopic === t ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Document File Tree */}
          <div className="os-ide-tree-header">
            <Folder size={13} color="#60a5fa" />
            <span>docs / technical-notes ({filteredArticles.length})</span>
          </div>

          <div className="os-ide-file-list">
            {filteredArticles.map((art) => {
              const isSelected = art.id === activeDoc.id;
              return (
                <button
                  key={art.id}
                  className={`os-ide-file-item ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedDocId(art.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                    <FileCode size={13} color={art.status === 'Published' ? '#34d399' : '#94a3b8'} />
                    <span className="os-ide-filename">{art.filename}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <span className={`badge ${art.status === 'Published' ? 'badge-emerald' : 'badge-gray'}`} style={{ fontSize: '0.625rem', padding: '0.05rem 0.3rem' }}>
                      {art.status}
                    </span>
                    <span className="badge badge-blue" style={{ fontSize: '0.625rem', padding: '0.05rem 0.3rem' }}>
                      {art.topic}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right IDE Document Viewer */}
        <div className="os-ide-editor">
          {/* Top IDE Document Tab Bar */}
          <div className="os-ide-tab-bar">
            <div className="os-ide-tab active">
              <FileCode size={13} color={activeDoc.status === 'Published' ? '#34d399' : '#60a5fa'} />
              <span>{activeDoc.filename}</span>
              <span className={`os-ide-tab-status ${activeDoc.status.toLowerCase()}`}>
                {activeDoc.status === 'Draft' ? '● Draft' : '✓ Live'}
              </span>
            </div>
          </div>

          {/* Breadcrumb & Telematics Strip */}
          <div className="os-ide-status-strip">
            <div className="os-ide-status-left">
              <span>docs &gt; {activeDoc.topic.toLowerCase().replace(' ', '-')} &gt; {activeDoc.filename}</span>
            </div>
            <div className="os-ide-status-right">
              <span>{activeDoc.topic}</span>
              <span className="os-entry-divider">|</span>
              <span>{activeDoc.lines} lines</span>
              <span className="os-entry-divider">|</span>
              <span>{activeDoc.readTime}</span>
              <span className="os-entry-divider">|</span>
              <span>UTF-8 Markdown</span>
            </div>
          </div>

          {/* Editor Content with Line Numbers */}
          <div className="os-ide-scroll-body">
            {/* Frontmatter Metadata Block */}
            <div className="os-ide-frontmatter">
              <div style={{ color: '#64748b' }}>---</div>
              <div><span style={{ color: '#93c5fd' }}>title:</span> &ldquo;{activeDoc.title}&rdquo;</div>
              <div><span style={{ color: '#93c5fd' }}>topic:</span> {activeDoc.topic}</div>
              <div><span style={{ color: '#93c5fd' }}>status:</span> {activeDoc.status}</div>
              <div><span style={{ color: '#93c5fd' }}>date:</span> {activeDoc.date}</div>
              <div><span style={{ color: '#93c5fd' }}>estimated_read:</span> {activeDoc.readTime}</div>
              <div style={{ color: '#64748b' }}>---</div>
            </div>

            {/* Document Lines with Gutter */}
            <div className="os-ide-code-view">
              {activeDoc.content.map((line, idx) => (
                <div key={idx} className="os-ide-line-row">
                  <div className="os-ide-line-num">{idx + 1}</div>
                  <div className="os-ide-line-content">
                    {line.startsWith('# ') ? (
                      <h1 className="os-ide-h1">{line.replace('# ', '')}</h1>
                    ) : line.startsWith('## ') ? (
                      <h2 className="os-ide-h2">{line.replace('## ', '')}</h2>
                    ) : line.startsWith('### ') ? (
                      <h3 className="os-ide-h3">{line.replace('### ', '')}</h3>
                    ) : (
                      <p className="os-ide-p">{line}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Document Footer Navigation */}
            <div className="os-ide-doc-footer">
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                End of technical document · {activeDoc.filename}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {activeDoc.slug ? (
                  <Link href={`/writing/${activeDoc.slug}`} className="btn btn-primary btn-sm" style={{ gap: '0.4rem' }}>
                    <span>Open Standalone Reader</span>
                    <ExternalLink size={12} />
                  </Link>
                ) : (
                  <span className="badge badge-gray">Draft in progress</span>
                )}
                <Link href="/writing" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
                  <span>Writing Hub (/writing)</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
