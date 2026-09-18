import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, Cpu, Database, Search, FileCode2, Layers, RefreshCw, BarChart2 } from 'lucide-react';

export const metadata = {
  title: 'AI Evaluation Lab: Measurement & Failure Handling | Bhuvan A B',
  description: 'Rigorous 8-pillar measurement framework, failure mode analyses, and deterministic mitigation strategies for AI in physical systems by Bhuvan A B.',
};

const MATURITY_STEPS = [
  {
    step: '01',
    title: 'Dataset Curation',
    desc: 'Curating test fixtures: 2D DXF vector geometry files, synthetic CAD stress files, and raw multi-part specification notes.',
    status: 'Active · Partially Published',
    badgeClass: 'badge-emerald',
  },
  {
    step: '02',
    title: 'Offline Evaluation',
    desc: 'Benchmarking extraction precision and deterministic geometry extraction against verified ground-truth CAD geometry calculations.',
    status: 'In Progress · Strict Pydantic Gates',
    badgeClass: 'badge-blue',
  },
  {
    step: '03',
    title: 'Automated Regression',
    desc: 'Automating 33 Pytest unit/integration tests and 14 Playwright E2E browser tests in CI using deterministic Mock AI Provider.',
    status: 'Active · 47 Tests Passing',
    badgeClass: 'badge-emerald',
  },
  {
    step: '04',
    title: 'Production Telemetry',
    desc: 'OpenTelemetry tracing, token usage analytics, and automated LLM response drift tracking under live traffic.',
    status: 'Planned · Tracing Roadmap',
    badgeClass: 'badge-amber',
  },
];

const PILLARS = [
  {
    id: 'pillar-input-quality',
    num: '01',
    title: 'Input Quality & File Pre-Validation',
    summary: 'Validating multi-format incoming files before exposing downstream microservices or LLM tokens to malformed data.',
    dataset: 'Internal repository test fixtures of clean 2D DXF drawings, unclosed polygon loops, corrupt binary headers, and technical PDFs.',
    metric: 'Pre-ingestion validation rate (% of files correctly classified as processable vs malformed before queueing).',
    baseline: 'Unvalidated ingestion: raw file passes directly to processing threads, causing unhandled parser crashes and wasted API calls.',
    currentSystem: 'Deterministic pre-validation via ezdxf header inspection and graph-based vertex snapping with a 0.01mm tolerance threshold.',
    failureCases: 'Corrupted binary DXFs, unsupported CAD entity types (e.g. 3D Spline meshes in 2D sheets), and password-protected PDF drawings.',
    mitigation: 'Fast-fail HTTP 422 validation response with clear error payloads detailing missing layers or vertex errors before background queueing.',
  },
  {
    id: 'pillar-extraction-correctness',
    num: '02',
    title: 'Extraction Correctness (Domain Specifications)',
    summary: 'Evaluating accuracy when extracting unstructured buyer notes into standardized metallurgical codes and physical parameters.',
    dataset: 'Dataset not yet published (Curated benchmark of 50 annotated industrial technical drawings currently in development).',
    metric: 'Field-level extraction accuracy (Alloy designation, plate thickness, surface finish, and tolerance standards).',
    baseline: 'Unstructured LLM text prompt asking for JSON: yields high variance in key naming and missing units.',
    currentSystem: 'Pydantic v2 strict schema validation with enum constraints and regex pattern matching enforced on LLM provider outputs.',
    failureCases: "Ambiguous material abbreviations (e.g. 'SS' without specifying SS304 vs SS316; imperial fractions '1/8 inch' mixed with metric mm).",
    mitigation: 'Strict Pydantic field validators reject ambiguous terms; system injects an interactive clarification prompt to the buyer.',
  },
  {
    id: 'pillar-retrieval-relevance',
    num: '03',
    title: 'Retrieval Relevance (Factory Matching)',
    summary: 'Measuring semantic retrieval precision when matching incoming RFQs to qualified factory equipment capabilities.',
    dataset: 'Synthetic factory capability catalog with machine bed dimensions, laser wattage ratings, and supported alloy classes.',
    metric: 'Retrieval Quality (MRR / NDCG@10) — Benchmark planned (Offline evaluation against historical machine-shop bid acceptances planned).',
    baseline: 'Naive keyword matching (SQL LIKE %...%): completely fails when buyers and factory catalogs use synonymous terms.',
    currentSystem: 'Hybrid retrieval: PostgreSQL tsvector full-text search for exact alloy grade matches combined with pgvector 1536-dim cosine similarity.',
    failureCases: 'Vector embeddings scoring two distinct stainless steel grades (SS304 vs SS316L) as near-identical due to semantic text proximity.',
    mitigation: 'Mandatory relational SQL boolean pre-filtering for hard physical constraints (laser wattage, bed dimensions) before vector similarity ranking.',
  },
  {
    id: 'pillar-structured-output',
    num: '04',
    title: 'Structured Output Correctness',
    summary: 'Ensuring 100% parseable, type-safe data serialization from LLMs into downstream database transactions.',
    dataset: 'Mock AI Provider test payloads executed across 33 Pytest unit test suites.',
    metric: 'JSON Schema Compliance Rate (% of responses parseable into Pydantic models without deserialization error).',
    baseline: '72% compliance in early prototypes using raw text prompts due to markdown backtick wrapping and trailing commas.',
    currentSystem: '100% schema compliance in automated CI test harness via strict schema parsing and regex wrapper stripping.',
    failureCases: 'LLM truncating JSON mid-response on token limits, outputting markdown blocks (```json ... ```), or emitting null for required fields.',
    mitigation: 'Regex-based markdown extractor strips formatting prior to deserialization; Pydantic model validation automatically catches missing fields.',
  },
  {
    id: 'pillar-hallucination-handling',
    num: '05',
    title: 'Hallucination & Error Handling',
    summary: 'Strict architectural boundary separation to prevent probabilistic models from generating physical manufacturing dimensions.',
    dataset: 'Complex geometric CAD test files containing interior cutouts, circular piercing points, and non-rectangular outer boundaries.',
    metric: 'Geometric perimeter and area error margin.',
    baseline: 'Multimodal vision LLMs prompted to estimate part dimensions from image renders: error margins frequently exceeded 15%–40%.',
    currentSystem: 'Zero geometric hallucination: CAD parsing is 100% deterministic (ezdxf vector contour math). AI is restricted strictly to unstructured text.',
    failureCases: "LLM inventing non-existent tolerance constraints not present in the buyer's original RFQ submission.",
    mitigation: 'Domain-grounded prompts provide pre-calculated bounding box bounds as immutable context; system injects standard ISO 2768-m fallback.',
  },
  {
    id: 'pillar-edge-cases',
    num: '06',
    title: 'Edge-Case Robustness',
    summary: 'Stress-testing algorithmic logic against non-standard geometries, zero-area entities, and hostile user inputs.',
    dataset: 'Curated edge-case test suite: zero-area polylines, concentric circular cutouts, non-manifold geometry, non-ASCII buyer text notes.',
    metric: 'Unhandled exception rate (HTTP 500 errors during intake).',
    baseline: 'Unhandled Python runtime crashes when encountering zero-length vectors, unclosed loops, or division by zero.',
    currentSystem: '33 automated Pytest test fixtures validating boundary limits, zero division guards, and negative coordinate transformations.',
    failureCases: 'Concentric circular piercings sharing identical centers; CAD drawings with 25,000+ tiny line fragments from rasterized scans.',
    mitigation: 'Maximum entity limits (max 25,000 vector entities per file) and bounding-box validation guards reject anomalous geometries early.',
  },
  {
    id: 'pillar-regression-testing',
    num: '07',
    title: 'Automated Regression Testing',
    summary: 'Continuous CI verification preventing algorithmic regressions across releases and refactorings.',
    dataset: 'Full repository automated test harness comprising 33 Pytest unit/integration tests and 14 Playwright E2E browser tests.',
    metric: 'Test suite pass rate across git commits.',
    baseline: 'Manual ad-hoc verification: regressions in quotation pricing went undetected until manual spot-checks.',
    currentSystem: '100% automated regression pass rate (47/47 passing tests) running on every commit via GitHub Actions CI pipeline.',
    failureCases: 'Upstream dependency upgrades (e.g. minor ezdxf updates) altering polygon arc interpolation calculations.',
    mitigation: 'Strict dependency version pinning in package-lock.json and requirements.txt combined with automated CI pull-request blockers.',
  },
  {
    id: 'pillar-latency-cost',
    num: '08',
    title: 'Latency Profiling & Token Cost Governance',
    summary: 'Empirical measurement of throughput, event-loop blocking, and API cost sustainability under concurrent load.',
    dataset: '50 concurrent client load test simulation targeting FastAPI microservice endpoints.',
    metric: 'Peak throughput (req/s), token expenditure per quote, and p95 request latency.',
    baseline: '860 req/s under load due to in-thread CPU geometry calculation blocking FastAPI async event loop.',
    currentSystem: '4,589 req/s (5.5x throughput gain) via ProcessPoolExecutor geometry worker offloading; zero token cost in CI via MockAIProvider.',
    failureCases: 'Sudden cloud provider 429 rate limit throttling during bulk RFQ upload batches; token cost explosion on large prompt payloads.',
    mitigation: 'Token budgeting with maximum input context truncation; client-side exponential backoff with jitter; offline mock provider in CI.',
  },
];

const FAILURE_CASES = [
  {
    title: 'Ambiguous Requirements',
    example: "Buyer submits RFQ stating: 'Need strong steel bracket for industrial machine' without defining alloy grade, yield strength, or plate thickness.",
    impact: 'Quotation engine cannot calculate raw material mass, machine cycle time, or sheet nesting efficiency without definitive parameters.',
    mitigation: "Requirement Gap Detector: The system parses the submission against a mandatory parameter checklist (Alloy, Thickness, Quantity, Tolerances). If missing, the quotation remains in 'Draft' and triggers an interactive clarification wizard for the buyer.",
  },
  {
    title: 'Incomplete Documents & Missing Units',
    example: '2D DXF vector drawing uploaded without specifying measurement units (Inches vs Millimeters) or drawing scale factor (1:1 vs 1:10).',
    impact: 'A 100mm bracket parsed as 100 inches yields a 25.4x cost calculation error; parts exceed physical laser cutting bed limits.',
    mitigation: "Heuristic Unit Detector: The geometry parser checks calculated bounding box dimensions against standard sheet metal inventory sizes. Bounding boxes exceeding 3000mm or under 5mm automatically trigger a unit confirmation modal prompting the buyer to select 'Inches' or 'Millimeters'.",
  },
  {
    title: 'Poor-Quality Scans & Blurred Blueprints',
    example: 'Buyer uploads a 100 DPI mobile photograph or degraded raster scan of a paper engineering drawing with blurred title block text.',
    impact: "OCR models hallucinate tolerance numbers (e.g. reading '±0.1 mm' as '±0.7 mm') or miss critical deburring notes.",
    mitigation: 'Confidence-Gated Intake: Image thresholding algorithms measure edge contrast and character confidence. If OCR extraction confidence falls below 85%, automatic quotation is disabled and the job is flagged for human engineer review.',
  },
  {
    title: 'Unsupported CAD File Formats',
    example: 'Buyer uploads a proprietary binary DWG file, pre-R12 ASCII DXF, or 3D STL mesh with non-manifold surface normals.',
    impact: 'Vector parser fails to decode entity tables, resulting in 500 server crashes or zero calculated cutting perimeter.',
    mitigation: 'Magic Byte & Header Inspection: FastAPI file upload handler validates file signatures before accepting payloads. Binary DWGs are immediately rejected with an export guide instructing the user to save as standard ASCII DXF (AutoCAD R2000+).',
  },
  {
    title: 'Conflicting Technical Requirements',
    example: "Buyer notes specify: 'Must be welded stainless steel with food-grade finish', but uploaded drawing title block specifies 'Aluminum 6061-T6'.",
    impact: 'Alloy selection and welding operations are physically contradictory, leading to wrong material procurement.',
    mitigation: 'Cross-Validation Conflict Rules: A deterministic rule engine compares extracted title block metadata against natural language prompt notes. Detected contradictions immediately halt quote generation and output a red-flag alert to the buyer.',
  },
  {
    title: 'Semantic Retrieval Mismatches',
    example: 'High vector cosine similarity score returned for a precision aerospace machine shop whose laser cutting bed is physically too small for a 2.5m structural sheet part.',
    impact: 'An unqualified factory receives an RFQ they physically cannot manufacture, wasting bidding time.',
    mitigation: 'Relational Hard Constraints Pre-Filter: Machine bed dimensions (X, Y), sheet thickness limits, and laser wattage are enforced as non-negotiable SQL boolean filters (WHERE bed_x >= part_x AND bed_y >= part_y) prior to running vector similarity ranking.',
  },
  {
    title: 'Malformed Structured Output from LLMs',
    example: 'Cloud LLM experiences token truncation or returns JSON wrapped in markdown formatting blocks (```json ... ```) with trailing commas.',
    impact: 'JSON deserialization exceptions crash downstream database insert queries or lead to corrupted order state records.',
    mitigation: 'Defensive Deserialization Pipeline: A regex pre-processor strips markdown wrapping; Pydantic v2 handles type coercion; on unrecoverable syntax errors, the system triggers an automatic single retry with temperature=0.0.',
  },
];

export default function AIEvaluationLabPage() {
  return (
    <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link
            href="/engineering"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Engineering Principles</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/decisions" style={{ fontSize: '0.85rem', color: '#60a5fa' }}>
            View 14 Architectural Decisions (ADRs) ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/projects/forgeiq" style={{ fontSize: '0.85rem', color: '#34d399' }}>
            ForgeIQ Flagship Case Study ↗
          </Link>
        </div>

        {/* Masthead */}
        <header style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.85rem' }}>
            Systematic Verification &amp; Evaluation Lab
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            AI Evaluation Lab: Measurement, Verification &amp; Failure Handling
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-accent)', fontWeight: 600, marginBottom: '1.25rem' }}>
            &quot;I don&apos;t treat AI output as automatically correct. I design systems to measure, validate, and handle failure.&quot;
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.5rem' }}>
            In physical systems like manufacturing and industrial commerce, probabilistic language model errors have physical consequences. A hallucinated dimension, misidentified alloy grade, or unhandled CAD topology failure ruins expensive sheet stock and damages machine tooling. This lab outlines the 8-pillar evaluation methodology engineered into ForgeIQ.
          </p>
          
          <div style={{
            background: 'rgba(14, 21, 37, 0.65)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <div><strong>Strict Standard:</strong> Zero fabricated accuracy numbers or artificial benchmark datasets.</div>
            <div><strong>Verification Anchor:</strong> 47 Automated Tests (33 Pytest + 14 Playwright) + ezdxf Geometry Math</div>
          </div>
        </header>

        {/* Evaluation Maturity Pipeline */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60a5fa', marginBottom: '0.5rem' }}>
            Development Lifecycle
          </div>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Evaluation Maturity Framework</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            How AI system evaluation progresses systematically from initial dataset curation to continuous production monitoring:
          </p>

          <div className="maturity-pipeline">
            {MATURITY_STEPS.map((m) => (
              <div key={m.step} className="maturity-node">
                <div className="maturity-step-num">Stage {m.step}</div>
                <div className="maturity-title">{m.title}</div>
                <div className="maturity-desc">{m.desc}</div>
                <div className="maturity-status">
                  <span className={`badge ${m.badgeClass}`}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8 Pillars */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#34d399', marginBottom: '0.5rem' }}>
            Rigorous Protocols
          </div>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>The 8-Pillar Evaluation Framework</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Every AI component is evaluated across 8 concrete engineering dimensions with explicit failure modes and verified mitigations:
          </p>

          <div className="eval-list">
            {PILLARS.map((p) => (
              <article key={p.id} className="eval-pillar-card" id={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa' }}>
                      Pillar {p.num}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>{p.title}</h3>
                  </div>
                  <span className="badge badge-blue">Evaluation Protocol</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {p.summary}
                </p>

                <div className="eval-grid">
                  <div className="eval-field">
                    <div className="eval-field-label">Dataset:</div>
                    <div className="eval-field-val"><p>{p.dataset}</p></div>
                  </div>

                  <div className="eval-field">
                    <div className="eval-field-label">Evaluation Metric:</div>
                    <div className="eval-field-val"><p>{p.metric}</p></div>
                  </div>

                  <div className="eval-field">
                    <div className="eval-field-label">Baseline Approach:</div>
                    <div className="eval-field-val"><p>{p.baseline}</p></div>
                  </div>

                  <div className="eval-field" style={{ borderLeft: '3px solid #3b82f6' }}>
                    <div className="eval-field-label" style={{ color: '#93c5fd' }}>Current System Architecture:</div>
                    <div className="eval-field-val"><p>{p.currentSystem}</p></div>
                  </div>

                  <div className="eval-field" style={{ borderLeft: '3px solid #f87171' }}>
                    <div className="eval-field-label" style={{ color: '#fca5a5' }}>Failure Cases Observed:</div>
                    <div className="eval-field-val"><p>{p.failureCases}</p></div>
                  </div>

                  <div className="eval-field" style={{ borderLeft: '3px solid #34d399' }}>
                    <div className="eval-field-label" style={{ color: '#6ee7b7' }}>Mitigation Strategy:</div>
                    <div className="eval-field-val"><p>{p.mitigation}</p></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Where AI Can Fail */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f87171', marginBottom: '0.5rem' }}>
            Vulnerability Analysis
          </div>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Where AI Can Fail in Physical Systems</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Production-ready software anticipates failure. Below are 7 concrete failure modes encountered in manufacturing automation, along with their implemented and planned mitigations:
          </p>

          <div className="failure-list">
            {FAILURE_CASES.map((fc, i) => (
              <div key={i} className="failure-card">
                <div className="failure-header">
                  <div className="failure-title">
                    <AlertTriangle size={18} color="#f87171" />
                    <span>{fc.title}</span>
                  </div>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    Failure Mode
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  <strong>Failure Scenario:</strong> {fc.example}
                </div>

                <div style={{ fontSize: '0.85rem', color: '#fca5a5', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  <strong>System Impact:</strong> {fc.impact}
                </div>

                <div style={{
                  background: 'rgba(10, 16, 30, 0.8)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1.15rem',
                  fontSize: '0.85rem',
                  color: '#d1fae5',
                  lineHeight: 1.6,
                }}>
                  <strong style={{ color: '#34d399' }}>Mitigation:</strong> {fc.mitigation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Codebase Verification Box */}
        <div className="card-elevated" style={{
          padding: '2.25rem',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          background: 'linear-gradient(135deg, rgba(14, 22, 41, 0.95), rgba(15, 23, 42, 0.85))',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Verified Test Harness</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Inspect the Automated Test Suite in ForgeIQ</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '580px', lineHeight: 1.6 }}>
                Review the 33 Pytest test fixtures, ezdxf contour geometry validation, Pydantic strict schemas, and 14 Playwright E2E browser tests in the live repository.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhuvanabcs24-maker/Forge-IQ" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>View Repository on GitHub ↗</span>
              </a>
              <Link href="/projects/forgeiq" className="btn btn-secondary">
                <span>Read ForgeIQ Case Study</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
