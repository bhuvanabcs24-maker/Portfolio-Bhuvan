'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from '../../components/Icons';

export default function OpenSourcePage() {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'code' | 'config' | 'structure'>('quickstart');

  return (
    <div className="section" style={{ paddingTop: '3.5rem', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link 
            href="/engineering" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.875rem', 
              color: 'var(--text-muted)',
              transition: 'color 0.2s ease'
            }}
          >
            <ArrowLeft size={16} /> Back to Engineering Hub
          </Link>
        </div>

        {/* Header / Hero */}
        <div style={{ maxWidth: '900px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="badge badge-emerald">Open Source & Modular Software</span>
            <span className="os-badge-extracted">1 Extracted Package</span>
            <span className="os-badge-roadmap">3 Roadmap Candidates</span>
          </div>
          <h1 style={{ fontSize: '2.75rem', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Modular Engineering & Open Source
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Engineering work creates the greatest leverage when complex domain algorithms are decoupled from proprietary business logic and published as clean, standalone software primitives.
          </p>

          {/* Credibility Callout */}
          <div style={{ 
            background: 'rgba(8, 12, 22, 0.75)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.25rem 1.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <ShieldCheck size={22} style={{ color: '#60a5fa', flexShrink: 0, marginTop: '0.15rem' }} />
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                Strict Anti-Fabrication & Credibility Policy
              </strong>
              I do not claim thousands of stars, enterprise production deployments, or artificial community sizes. The packages below represent genuine modular extractions from ForgeIQ, published under permissive open-source licenses to benefit other engineers working in CAD and manufacturing automation.
            </div>
          </div>
        </div>

        {/* FEATURED EXTRACTED PACKAGE */}
        <div className="os-showcase-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="os-badge-extracted">
                  <CheckCircle2 size={13} /> Extracted Package
                </span>
                <span className="badge badge-blue">v0.2.0-alpha</span>
                <span className="badge badge-purple">MIT License</span>
                <span className="badge badge-emerald">Python 3.9+</span>
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                dxf-contour-extractor
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#93c5fd', fontWeight: 500 }}>
                Deterministic 2D DXF polyline loop reconstruction, vertex snapping, and laser/CNC manufacturing metrics extractor.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a 
                href="https://github.com/bhuvanabcs24-maker/Forge-IQ/tree/main/backend/services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <GithubIcon size={15} /> View on GitHub
              </a>
              <Link 
                href="/writing/why-cad-understanding-is-difficult" 
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Read Technical Note</span> <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                ForgeIQ Relationship
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                Extracted directly from <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>backend/services/cad_preprocessor.py</code>. Decoupled from FastAPI, PostgreSQL, and LLM orchestration into an independent geometry library.
              </div>
            </div>

            <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Core Problem Solved
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                Resolves AutoCAD DXF drafting micro-gaps (0.002mm - 0.008mm) that break naive coordinate equality, extracting closed polygon loops and piercing counts without floating-point hallucination.
              </div>
            </div>

            <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Key Dependencies
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <span className="tech-tag tech-tag-blue" style={{ marginRight: '0.4rem' }}>ezdxf</span>
                <span className="tech-tag tech-tag-blue" style={{ marginRight: '0.4rem' }}>networkx</span>
                <span className="tech-tag tech-tag-blue" style={{ marginRight: '0.4rem' }}>scipy</span>
                <span className="tech-tag tech-tag-blue">dataclasses</span>
              </div>
            </div>
          </div>

          {/* Architecture ASCII Flow */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Deterministic Algorithm Pipeline
            </div>
            <pre style={{ 
              background: '#070a13', 
              border: '1px solid var(--border-medium)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1.25rem', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.8rem', 
              lineHeight: 1.5, 
              color: '#93c5fd', 
              overflowX: 'auto',
              margin: 0
            }}>
{`Raw .DXF File ────► Entity Extraction (ezdxf)
                         │ (LINE, ARC, LWPOLYLINE, CIRCLE)
                         ▼
                   Spatial Vertex Snapping (scipy.spatial.KDTree)
                         │ (0.01mm clustering merges drafting micro-gaps)
                         ▼
                   Planar Multigraph Construction (networkx)
                         │ (Minimal cycle basis extraction via nx.cycle_basis)
                         ▼
                   Boundary & Hole Separation (Shoelace 2D Formula)
                         │ Largest Closed Loop = Sheet Outer Boundary
                         │ Interior Loops & Circles = Pierced Cutout Holes
                         ▼
                   Manufacturing Metrics (Perimeter mm, Pierces, Scrap Ratio)`}
            </pre>
          </div>

          {/* Interactive Code & Documentation Tabs */}
          <div>
            <div className="os-tabs-nav">
              <button 
                className={`os-tab-btn ${activeTab === 'quickstart' ? 'active' : ''}`}
                onClick={() => setActiveTab('quickstart')}
              >
                Installation & Quickstart
              </button>
              <button 
                className={`os-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                Python Usage Example
              </button>
              <button 
                className={`os-tab-btn ${activeTab === 'config' ? 'active' : ''}`}
                onClick={() => setActiveTab('config')}
              >
                Tolerances & Config
              </button>
              <button 
                className={`os-tab-btn ${activeTab === 'structure' ? 'active' : ''}`}
                onClick={() => setActiveTab('structure')}
              >
                Package Structure & Tests
              </button>
            </div>

            {/* TAB 1: QUICKSTART */}
            {activeTab === 'quickstart' && (
              <div style={{ background: '#090d1a', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Local Development Installation
                </h4>
                <pre style={{ background: '#05070f', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#34d399', overflowX: 'auto', marginBottom: '1.25rem' }}>
{`# 1. Clone the repository
git clone https://github.com/bhuvanabcs24-maker/Forge-IQ.git
cd Forge-IQ/packages/dxf-contour-extractor

# 2. Install in editable development mode
pip install -e .

# 3. Run the automated test suite
python -m unittest discover -s tests`}
                </pre>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>Status:</strong> Active standalone package in <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>packages/dxf-contour-extractor/</code> with passing unit tests and zero external network dependencies.
                </div>
              </div>
            )}

            {/* TAB 2: CODE */}
            {activeTab === 'code' && (
              <div style={{ background: '#090d1a', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Extracting Boundary Geometry & Laser Pierces
                </h4>
                <pre style={{ background: '#05070f', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: '#93c5fd', overflowX: 'auto', margin: 0 }}>
{`from dxf_contour_extractor import DXFContourExtractor

# Initialize extractor with a 0.01mm tolerance window for drafting micro-gaps
extractor = DXFContourExtractor(snap_tolerance_mm=0.01)

# Process a DXF drawing directly
result = extractor.extract_from_file("industrial_bracket.dxf")

print(f"Total Cutting Perimeter: {result.total_cutting_perimeter_mm:.2f} mm")
print(f"Laser Pierce Count:      {result.pierce_count} (1 outer + {len(result.holes)} internal)")
print(f"Stock Bounding Box:      {result.bounding_box.width_mm:.1f} x {result.bounding_box.height_mm:.1f} mm")
print(f"Raw Scrap Ratio:         {result.scrap_ratio:.1%}")

# Inspect individual holes for tooling selection
for i, hole in enumerate(result.holes, 1):
    print(f"  Hole #{i}: Center=({hole.center.x:.1f}, {hole.center.y:.1f}) mm, Dia={hole.diameter_mm:.1f} mm")`}
                </pre>
              </div>
            )}

            {/* TAB 3: CONFIG */}
            {activeTab === 'config' && (
              <div style={{ background: '#090d1a', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  Extractor Configuration Parameters
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.5rem 0.75rem' }}>Parameter</th>
                        <th style={{ padding: '0.5rem 0.75rem' }}>Type</th>
                        <th style={{ padding: '0.5rem 0.75rem' }}>Default</th>
                        <th style={{ padding: '0.5rem 0.75rem' }}>Engineering Purpose</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: 'var(--text-secondary)' }}>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>snap_tolerance_mm</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>float</td>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>0.01</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>Spatial radius for KD-Tree vertex clustering to bridge micro-gaps.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>arc_segments</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>int</td>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>16</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>Number of linear chords used when discretizing circular arcs.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>ignore_paper_space</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>bool</td>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>True</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>Ignores title blocks, revision tables, and borders in paper layouts.</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>min_hole_diameter_mm</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>float</td>
                        <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>0.5</td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>Filters microscopic drafting specks below CNC laser kerf limit.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: STRUCTURE */}
            {activeTab === 'structure' && (
              <div style={{ background: '#090d1a', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Repository Structure & Verification
                </h4>
                <pre style={{ background: '#05070f', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94a3b8', overflowX: 'auto', marginBottom: '1rem' }}>
{`packages/dxf-contour-extractor/
├── pyproject.toml              # Modern hatchling packaging metadata
├── LICENSE                     # Permissive MIT License
├── README.md                   # Complete documentation & usage guide
├── CONTRIBUTING.md             # Contributor guidelines & code style
├── .github/
│   └── ISSUE_TEMPLATE/         # Bug report & feature request templates
├── src/
│   └── dxf_contour_extractor/
│       ├── __init__.py         # Public exports & versioning
│       └── extractor.py        # Core KD-Tree & NetworkX geometry pipeline
├── tests/
│   └── test_extractor.py       # 4 unit tests (snapping, loops, holes, empty)
└── examples/
    └── parse_sample_part.py    # Runnable synthetic bracket demonstration`}
                </pre>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} /> 4/4 Unit tests passing (0.001s execution time)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OPEN SOURCE EXTRACTION ROADMAP */}
        <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
            <div className="badge badge-purple" style={{ marginBottom: '0.65rem' }}>Decoupling Strategy</div>
            <h2 style={{ fontSize: '2.25rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Open Source Extraction Roadmap
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Not every component in an application should be extracted prematurely. Packaging software before its boundaries stabilize creates maintenance overhead and fragile abstractions. Below is the honest decoupling roadmap for candidate components in ForgeIQ.
            </p>
          </div>

          <div className="os-roadmap-grid">

            {/* CANDIDATE 1 */}
            <div className="os-roadmap-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="os-badge-roadmap">
                    <Clock size={12} /> Roadmap Candidate #1
                  </span>
                  <span className="badge badge-blue">Python</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  ai-provider-sdk
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#93c5fd', fontWeight: 500, marginBottom: '1rem' }}>
                  Multi-Model LLM Fallback & Defensive Schema Validation
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Provides a unified interface across Google Gemini, Anthropic Claude, and OpenAI with automatic temperature-zero retries and strict Pydantic JSON response parsing.
                </p>

                <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Current Status in ForgeIQ
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    Operational prototype in <code style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>backend/ai/quotation_engine.py</code>. Tightly coupled to ForgeIQ&apos;s quotation schemas.
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Extraction Work Remaining:
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">1</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Decouple manufacturing-specific quotation prompts from provider dispatch logic.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">2</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Create generic schema-agnostic validation hooks accepting arbitrary Pydantic models.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">3</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Add mock offline LLM provider fixtures for deterministic unit testing.</div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: Standalone PyPI library</span>
                <Link href="/engineering/patterns#pattern-1" style={{ fontSize: '0.8rem', color: '#60a5fa', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Pattern <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* CANDIDATE 2 */}
            <div className="os-roadmap-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="os-badge-roadmap">
                    <Clock size={12} /> Roadmap Candidate #2
                  </span>
                  <span className="badge badge-purple">Python / SQL</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  mfg-retrieval-bench
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#d8b4fe', fontWeight: 500, marginBottom: '1rem' }}>
                  Manufacturing RFQ Hybrid Search Evaluation Suite
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  A specialized evaluation harness calculating Mean Reciprocal Rank (MRR@5) and NDCG@5 for technical procurement queries combining lexical SQL filters and vector distance.
                </p>

                <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Current Status in ForgeIQ
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    Implemented as internal evaluation scripts in <code style={{ fontFamily: 'var(--font-mono)', color: '#d8b4fe' }}>backend/retrieval/hybrid_search.py</code>.
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Extraction Work Remaining:
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">1</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Serialize 120-query synthetic RFQ benchmark dataset into portable JSONL files.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">2</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Decouple evaluation logic from active PostgreSQL instance via SQLite vector mock.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">3</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Publish CLI reporting tool with regression diff comparisons across prompt versions.</div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: Benchmark CLI Tool</span>
                <Link href="/engineering/evaluation" style={{ fontSize: '0.8rem', color: '#d8b4fe', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Eval Lab <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* CANDIDATE 3 */}
            <div className="os-roadmap-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="os-badge-roadmap">
                    <Clock size={12} /> Roadmap Candidate #3
                  </span>
                  <span className="badge badge-emerald">TypeScript / Python</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  mfg-workflow-engine
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6ee7b7', fontWeight: 500, marginBottom: '1rem' }}>
                  9-Stage Industrial Production State Machine
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Finite state machine managing multi-party physical order lifecycles (RFQ → Quoted → Confirmed → Laser Cut → Dispatched) with rollback prevention and immutable audit logging.
                </p>

                <div style={{ background: 'rgba(8, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Current Status in ForgeIQ
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    Operational in <code style={{ fontFamily: 'var(--font-mono)', color: '#6ee7b7' }}>backend/services/order_workflow.py</code>. Coupled to Supabase auth tables and database triggers.
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Extraction Work Remaining:
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">1</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Extract transition graph rules into declarative JSON / YAML state definitions.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">2</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Build pluggable storage interface supporting in-memory, SQLite, and PostgreSQL.</div>
                </div>
                <div className="os-roadmap-step">
                  <div className="os-roadmap-step-icon">3</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Isolate webhook event dispatching from proprietary buyer notification queues.</div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: Framework-Agnostic Engine</span>
                <Link href="/engineering/decisions" style={{ fontSize: '0.8rem', color: '#6ee7b7', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Architecture <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* OPEN SOURCE PHILOSOPHY & PRINCIPLES */}
        <div style={{ 
          background: 'rgba(14, 21, 37, 0.5)', 
          border: '1px solid var(--border-medium)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2.5rem', 
          marginBottom: '4rem' 
        }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            My Open Source Engineering Philosophy
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
                1. Solve Real Engineering Traps
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Open-source software is only useful if it solves problems that standard libraries neglect. Rather than creating generic wrappers, my focus is on tricky domain bottlenecks like CAD micro-gaps, LLM schema containment, and physical production state machines.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
                2. No Inflated Adoption Claims
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Engineering credibility requires transparency. I do not invent download counts, pretend to have enterprise customers, or manufacture false community momentum. Every package reflects its true development status and exact test verification.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
                3. Determinism Over Guesswork
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                In physical engineering systems, non-deterministic bugs result in scrapped material or machine collisions. Geometry and pricing packages must remain strictly reproducible, keeping probabilistic AI models safely behind typed boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="article-footer-nav" style={{ marginTop: '2rem' }}>
          <Link href="/writing" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={15} /> Technical Writing Hub
          </Link>
          <Link href="/projects/forgeiq" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Explore ForgeIQ Case Study</span> <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}
