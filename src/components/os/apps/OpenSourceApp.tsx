'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  Package, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  ArrowDown, 
  Layers, 
  Code2, 
  FileCode, 
  Folder, 
  Play,
  FileText
} from 'lucide-react';
import { useOS } from '../OSContext';

export default function OpenSourceApp() {
  const { openWindow } = useOS();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'tree' | 'tests' | 'roadmap'>('pipeline');
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const pipelineStages = [
    {
      name: 'DXF',
      tag: 'INPUT',
      desc: 'Raw AutoCAD drawing file containing unorganized LINE, ARC, and LWPOLYLINE entities with micro-gaps.',
      input: 'sample_bracket.dxf (ASCII AutoCAD Release 2018)',
      transform: 'Binary/ASCII entity stream parsing via ezdxf',
      output: '24 unlinked geometric primitives (8 lines, 16 arcs)'
    },
    {
      name: 'Parser',
      tag: 'FILTER',
      desc: 'Filters out dimension lines, text annotations, and non-cutting border layers, isolating cut lines.',
      input: 'Raw DXF entity collection with metadata annotations',
      transform: 'Layer filter (CUT_LAYER only) + coordinate normalization',
      output: 'Clean planar segments normalized to (0, 0) origin'
    },
    {
      name: 'Topology',
      tag: 'SNAPPER',
      desc: 'KD-Tree spatial clustering snaps vertex endpoints within 0.01mm tolerance, closing drafter gaps.',
      input: 'Unclosed vertices with float coordinate drift (0.002mm)',
      transform: 'scipy.spatial.KDTree query_pairs(r=0.01mm)',
      output: 'Unified graph nodes with Euclidean coincidence'
    },
    {
      name: 'Geometry',
      tag: 'GRAPH MATH',
      desc: 'Constructs planar graph and computes cycle basis to differentiate outer perimeter from inner holes.',
      input: 'Undirected geometric network graph G = (V, E)',
      transform: 'networkx.cycle_basis + Shapely Polygon orientation',
      output: '1 Outer boundary polygon + 3 Interior hole loops'
    },
    {
      name: 'Manufacturing Metrics',
      tag: 'OUTPUT',
      desc: 'Calculates physical CNC/laser cutting parameters: pierce points, total cut length, and machine feed time.',
      input: 'Classified closed boundary loops & hole polygons',
      transform: 'Euclidean distance summation + lead-in offset',
      output: 'Cut Length: 842.6mm | Pierces: 4 | Bounding Box: 240x120mm'
    }
  ];

  return (
    <div className="os-app-container">
      {/* Subnav Tabs */}
      <div className="os-app-tabs">
        <button 
          className={`os-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          <Layers size={14} />
          <span>Transformation Pipeline</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'tree' ? 'active' : ''}`}
          onClick={() => setActiveTab('tree')}
        >
          <Folder size={14} />
          <span>Package Architecture</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          <CheckCircle2 size={14} />
          <span>Unit Test Runner (4/4)</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Package size={14} />
          <span>Extraction Roadmap</span>
        </button>
      </div>

      <div className="os-app-scroll-content">
        {/* Flagship Artifact Header */}
        <div className="os-hero-card" style={{ marginBottom: '1.25rem' }}>
          <div className="os-card-badge-row">
            <span className="badge badge-emerald">LIVE ENGINEERING ARTIFACT</span>
            <span className="badge badge-blue">v0.1.0-alpha · MIT LICENSE</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.4rem 0' }}>
            dxf-contour-extractor
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Extracted Python library for AutoCAD DXF planar cycle extraction, KD-Tree vertex snapping, and laser/CNC cutting perimeter calculations. Extracted from the ForgeIQ core processing engine.
          </p>
        </div>

        {activeTab === 'pipeline' && (
          <div className="os-tab-pane">
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#60a5fa', marginBottom: '0.25rem' }}>
                // CAD DATA TRANSFORMATION PIPELINE
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', margin: 0 }}>
                From Unstructured Vectors to Manufacturing Metrics
              </h3>
            </div>

            {/* VISUAL PIPELINE REPRESENTATION */}
            <div className="os-pipeline-visual-container">
              {pipelineStages.map((stage, idx) => {
                const isSelected = selectedStage === idx;
                const isLast = idx === pipelineStages.length - 1;
                return (
                  <React.Fragment key={stage.name}>
                    <div 
                      className={`os-pipeline-step-node ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedStage(idx)}
                    >
                      <div className="os-pipeline-step-num">STEP 0{idx + 1}</div>
                      <div className="os-pipeline-step-name">{stage.name}</div>
                      <div className="os-pipeline-step-tag">{stage.tag}</div>
                    </div>
                    {!isLast && (
                      <div className="os-pipeline-arrow-wrap">
                        <ArrowRight className="os-pipeline-arrow-h" size={16} />
                        <ArrowDown className="os-pipeline-arrow-v" size={16} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* PIPELINE STAGE INSPECTOR CARD */}
            <div className="os-card" style={{ padding: '1.25rem', marginTop: '1.25rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: '#080c16' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-blue">STAGE 0{selectedStage + 1}</span>
                  <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>{pipelineStages[selectedStage].name} Inspection</strong>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                  CLICK ANY STAGE ABOVE TO INSPECT
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1rem' }}>
                {pipelineStages[selectedStage].desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                <div className="os-inspect-box">
                  <div className="os-inspect-lbl">INPUT PAYLOAD</div>
                  <div className="os-inspect-val">{pipelineStages[selectedStage].input}</div>
                </div>
                <div className="os-inspect-box">
                  <div className="os-inspect-lbl">TRANSFORMATION ALGORITHM</div>
                  <div className="os-inspect-val" style={{ color: '#93c5fd' }}>{pipelineStages[selectedStage].transform}</div>
                </div>
                <div className="os-inspect-box">
                  <div className="os-inspect-lbl">OUTPUT PAYLOAD</div>
                  <div className="os-inspect-val" style={{ color: '#34d399' }}>{pipelineStages[selectedStage].output}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => openWindow('cad-viewer')}
              >
                <Layers size={13} />
                <span>Test KD-Tree Snapper in CAD Visualizer</span>
              </button>
              <Link href="/opensource" className="btn btn-secondary btn-sm">
                <span>View Standalone Open Source Hub</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'tree' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
              Extracted Package Directory Tree
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Clean standalone Python library structure configured with Hatchling packaging and zero proprietary dependencies.
            </p>

            <div className="os-code-box" style={{ background: '#050811' }}>
              <pre className="os-code-content" style={{ fontSize: '0.825rem', lineHeight: 1.6 }}>
{`packages/dxf-contour-extractor/
├── pyproject.toml              # Hatchling packaging (Python >=3.9, ezdxf, scipy, networkx)
├── README.md                   # Installation, mathematical explanation, and examples
├── LICENSE                     # MIT Open-Source License
├── src/
│   └── dxf_contour_extractor/
│       ├── __init__.py         # Public exports (DXFContourExtractor, ExtractedContour)
│       ├── parser.py           # ezdxf header & entity filter (LINE, ARC, LWPOLYLINE)
│       ├── snapper.py          # scipy.spatial.KDTree 0.01mm vertex clustering
│       ├── topology.py         # networkx.cycle_basis extraction & cycle orientation
│       └── metrics.py          # Pierces, total cut length (mm), and sheet bounding box
├── tests/
│   ├── __init__.py
│   └── test_extractor.py       # 4 standalone unit tests (all passing in 0.001s)
└── examples/
    ├── sample_bracket.dxf      # Test CAD drawing fixture
    └── parse_sample_part.py    # Standalone demo script`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
              Standalone Package Unit Tests (4/4 Passing)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Run directly via Python's standard unittest runner without requiring an active database or external services.
            </p>

            <div className="os-code-box">
              <div className="os-code-header">
                <span>$ python3 -m unittest discover -s packages/dxf-contour-extractor/tests</span>
              </div>
              <pre className="os-code-content" style={{ color: '#34d399', fontSize: '0.825rem' }}>
{`....
----------------------------------------------------------------------
Ran 4 tests in 0.001s

OK
• test_package_import ......................................... PASSED
• test_dxf_parser_header_extraction .......................... PASSED
• test_kdtree_vertex_snapping_tolerance ...................... PASSED
• test_cycle_basis_hole_and_boundary_classification .......... PASSED`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="os-tab-pane">
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
              Decoupling & Extraction Roadmap
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Honest roadmap of reusable components being factored out of ForgeIQ. No fabricated stars or unverified contributors.
            </p>

            <div className="os-roadmap-table">
              <div className="roadmap-row">
                <span className="badge badge-emerald">Extracted (v0.1.0)</span>
                <strong>dxf-contour-extractor</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Clean hatchling packaging, 4 unit tests, MIT license</span>
              </div>
              <div className="roadmap-row">
                <span className="badge badge-amber">Planned</span>
                <strong>ai-provider-sdk</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Decoupling proprietary prompts into generic Pydantic adapter</span>
              </div>
              <div className="roadmap-row">
                <span className="badge badge-amber">Planned</span>
                <strong>mfg-retrieval-bench</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>120-query synthetic RFQ benchmark suite serialization</span>
              </div>
            </div>
          </div>
        )}

        {/* External Links Bar */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Repository: Forge-IQ / packages / dxf-contour-extractor
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a 
              href="https://github.com/bhuvanabcs24-maker/Forge-IQ" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <span>GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
            <Link href="/opensource" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
              <span>Full Open Source Page</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
