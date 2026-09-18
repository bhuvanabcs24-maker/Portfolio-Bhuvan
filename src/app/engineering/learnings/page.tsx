'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Layers, 
  Code2, 
  Sparkles,
  ArrowDown
} from 'lucide-react';

interface LearningStory {
  id: string;
  number: string;
  title: string;
  domain: string;
  tagClass: string;
  tried: string;
  happened: string;
  problem: string;
  changed: string;
  learned: string;
}

interface ApproachShift {
  number: string;
  title: string;
  fromText: string;
  toText: string;
}

const STORIES: LearningStory[] = [
  {
    id: 'story-01',
    number: '01',
    title: 'Relational Query Compounding to Unified CTE Aggregation',
    domain: 'Backend / Database Architecture',
    tagClass: 'pattern-tag-backend',
    tried: 'Initially fetched manufacturing order lifecycle details by issuing an initial SQL query for the order record, followed by separate queries inside loop handlers for line items, supplier bids, and status history logs.',
    happened: 'Under local concurrent load testing with 50 virtual users, response latency spiked sharply, database connection pool became saturated, and server throughput plateaued at 860 req/s.',
    problem: 'Issuing 12 independent SQL roundtrips per order check exhausted the serverless connection pool limit and caused extreme database connection contention under load.',
    changed: 'Refactored the data-fetching layer to use a single parameterized query utilizing PostgreSQL Common Table Expressions (CTEs) and JSON aggregation (json_agg), indexed with a composite B-Tree on (tenant_id, order_id, stage_timestamp).',
    learned: 'Never assume database ORMs optimize nested access automatically. Profiling with load generators early in development prevents connection starvation before architecture hardens.'
  },
  {
    id: 'story-02',
    number: '02',
    title: 'From Prompt-Based Geometry Pricing to Deterministic CAD Math',
    domain: 'AI Engineering / System Boundaries',
    tagClass: 'pattern-tag-ai',
    tried: 'Fed raw geometric vertex coordinates and text representations of CAD boundary lines directly into the LLM system prompt, asking it to calculate part volume, surface area, and machining cycle hours.',
    happened: 'The model produced hallucinations with 20% to 50% variance across repeated calls for identical CAD files, frequently hallucinating circular cutouts and miscalculating bounding boxes.',
    problem: 'In physical manufacturing, raw bar stock and machining hours are expensive realities. A hallucinated dimension or volume produces unusable quotes that either cause financial loss or quote exorbitantly high.',
    changed: 'Stripped geometry calculation away from the LLM entirely. Built a deterministic Python geometry preprocessor using ezdxf and vector algorithms to compute bounding box, cutting perimeter, and volume. The LLM was restricted strictly to qualitative NLP tasks (machinability risk, surface finish advice) constrained by Pydantic schemas.',
    learned: 'LLMs are probabilistic sequence models, not geometric math engines. Transactional and physical calculations must always remain 100% deterministic; AI belongs where semantics and natural language add real leverage.'
  },
  {
    id: 'story-03',
    number: '03',
    title: 'From Live API Testing to Hermetic Mock Provider CI Test Harness',
    domain: 'Testing & Reliability / CI/CD',
    tagClass: 'pattern-tag-testing',
    tried: 'Ran the initial Playwright and Pytest suites by calling live Google Gemini API endpoints directly using an API key stored in CI environment secrets.',
    happened: 'Test runs were slow (~2 minutes per run), frequently failed with HTTP 429 Rate Limit errors when multiple tests ran in parallel, and broke whenever external network latency surged.',
    problem: 'Flaky test suites erode confidence in automated testing. When CI fails due to external API rate limits rather than code regressions, developers start ignoring test failures.',
    changed: 'Designed and implemented the Pluggable AI Provider Factory with a MockAIProvider. In CI and local test environments, the test harness automatically routes to deterministic fixture replay, returning pre-validated JSON payloads in 0ms network latency. Live API integration is reserved for explicit staging smoke runs.',
    learned: 'Automated test suites must be hermetic and fast. Third-party cloud dependencies should always be isolated behind an abstraction barrier so that internal regression testing is deterministic, free, and instantaneous.'
  },
  {
    id: 'story-04',
    number: '04',
    title: 'From Naive Polyline Traversal to Graph-Based Vertex Snapping',
    domain: 'CAD Engineering / Algorithmic Robustness',
    tagClass: 'pattern-tag-arch',
    tried: 'Computed sheet metal cutting perimeters and laser paths by simply summing the Euclidean lengths of consecutive LINE and POLYLINE entities in DXF files.',
    happened: 'Real-world CAD files from various CAD exporters often contained disconnected polyline segments, unclosed loops with micro-gaps (e.g. 0.005mm), and duplicate overlapping vertices, causing perimeter and area algorithms to crash or double-count.',
    problem: 'When the geometry parser fails to recognize closed cutting loops, the quotation engine cannot estimate internal pierce counts or sheet scrap percentages, rejecting valid engineering drawings with unhandled exceptions.',
    changed: 'Replaced naive entity traversal with a graph-based vertex snapping algorithm with a 0.01mm tolerance threshold. The algorithm builds a spatial adjacency graph, snaps endpoints within the tolerance window, and reconstructs closed outer boundaries and internal hole contours before computing area.',
    learned: 'Input data in physical engineering systems is rarely clean or well-formed. Algorithms must be designed with defensive tolerance thresholds and graph-based validation rather than assuming idealized geometric standards.'
  },
  {
    id: 'story-05',
    number: '05',
    title: 'From Blocking Async Handlers to Multi-Process Pool Offloading',
    domain: 'Backend / Concurrency Architecture',
    tagClass: 'pattern-tag-backend',
    tried: 'Wrote CAD geometry parsing directly inside FastAPI async def route handlers, assuming that async would allow the server to handle other requests concurrently.',
    happened: 'When a user uploaded a 40MB 3D model, the server completely froze for 500ms to 1200ms. Concurrent dashboard requests, health check pings, and WebSocket pings timed out until the CAD calculation finished.',
    problem: 'Python\'s AsyncIO event loop is single-threaded. CPU-bound calculations in an async function monopolize the thread and block the event loop entirely, destroying concurrent I/O performance.',
    changed: 'Separated CPU computation from I/O by creating a singleton ProcessPoolExecutor. Heavy parsing functions were made pure and dispatched via asyncio.get_running_loop().run_in_executor(), running in isolated OS worker processes with a 5-second timeout guard.',
    learned: 'async does not equal parallel. AsyncIO is optimized for network and disk I/O; CPU-bound workloads must always be offloaded to worker processes or background task queues to keep the web event loop responsive.'
  },
  {
    id: 'story-06',
    number: '06',
    title: 'From Ephemeral Component State to Bookmarkable URL Query State',
    domain: 'Frontend Architecture / Navigation Semantics',
    tagClass: 'pattern-tag-arch',
    tried: 'Initially tracked manufacturing order filtering (by status, date range, factory capability, and search keyword) inside local React component state (useState).',
    happened: 'Users could not bookmark filtered views, browser back/forward buttons reset all filters unexpectedly, and sharing a specific RFQ state with a colleague required manual re-selection of all filters.',
    problem: 'In B2B procurement and quotation workflows, buyers and factory managers need to link directly to specific filtered views (e.g. "orders waiting for quality inspection"). Storing state in local memory broke basic web navigational semantics.',
    changed: 'Refactored filter and pagination state to be driven by URL search parameters (useSearchParams / HTML history API). Filter state is read from the URL query string on load and synchronized on change.',
    learned: 'The URL is the most reliable, shareable, and accessible state container in web applications. Any filter, pagination, or tab state that affects what the user sees belongs in the URL rather than transient component memory.'
  }
];

const SHIFTS: ApproachShift[] = [
  {
    number: 'SHIFT 01',
    title: 'From Assumption to Empirical Profiling',
    fromText: 'Assuming bottlenecks based on architectural intuition (e.g., assuming CAD parsing was the primary slowdown).',
    toText: 'Benchmarking with real load generators (Locust / k6) to uncover real resource contention like N+1 database queries.'
  },
  {
    number: 'SHIFT 02',
    title: 'From "AI for Everything" to Deterministic Boundaries',
    fromText: 'Attempting to prompt LLMs to calculate physical geometries, pricing formulas, and strict validation checks.',
    toText: 'Restricting LLMs strictly to qualitative NLP while enforcing 100% deterministic Python math for dimensions and costs.'
  },
  {
    number: 'SHIFT 03',
    title: 'From Fragile Local Tests to Hermetic CI Automation',
    fromText: 'Running tests against live cloud AI APIs and external databases with shared state and rate limits.',
    toText: 'Decoupling dependencies behind a Mock Provider interface, ensuring 47 test suites run in seconds with zero token cost.'
  },
  {
    number: 'SHIFT 04',
    title: 'From Idealized Formats to Defensive Input Tolerances',
    fromText: 'Expecting external CAD files or buyer notes to follow strict specifications without anomalies.',
    toText: 'Engineering graph-based tolerance snapping, magic-byte format validation, and defensive schema fallbacks.'
  }
];

export default function EngineeringLearningsPage() {
  return (
    <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/engineering" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} />
            <span>Back to Engineering Principles</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/decisions" style={{ fontSize: '0.85rem', color: '#60a5fa' }}>
            14 Decisions (ADRs) ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/patterns" style={{ fontSize: '0.85rem', color: '#34d399' }}>
            Engineering Patterns ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/evaluation" style={{ fontSize: '0.85rem', color: '#c084fc' }}>
            AI Evaluation Lab ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/projects/forgeiq" style={{ fontSize: '0.85rem', color: '#f59e0b' }}>
            ForgeIQ Case Study ↗
          </Link>
        </div>

        {/* Masthead */}
        <header style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
            Honest Engineering Retrospective
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            Engineering Learnings: Iteration, Constraints &amp; Evolution
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.5rem' }}>
            Real software engineering is not about writing pristine code on the first attempt—it is about systematic iteration when an initial approach reaches its operational limit. Here are six documented technical turning points from building <strong>ForgeIQ</strong>, tracing exactly what was tried, what broke, why it mattered, and what changed.
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
            <div><strong>Integrity Standard:</strong> Zero fabricated outages, fake user interviews, or artificial drama.</div>
            <div><strong>Scope:</strong> Documented development and architectural iterations across ForgeIQ.</div>
          </div>
        </header>

        {/* Timeline Stories Track */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60a5fa', marginBottom: '0.5rem' }}>
            Chronological Technical Stories
          </div>
          
          <div className="timeline-track">
            {STORIES.map((story) => (
              <div key={story.id} className="timeline-story" id={story.id}>
                <div className="timeline-marker">
                  <div className="timeline-marker-inner"></div>
                </div>

                <article className="timeline-card">
                  <div className="timeline-header">
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        color: '#60a5fa',
                        marginBottom: '0.35rem',
                        letterSpacing: '0.06em'
                      }}>
                        STORY {story.number} · {story.domain.toUpperCase()}
                      </div>
                      <h2 className="timeline-title">{story.title}</h2>
                    </div>
                    <div className="timeline-meta">
                      <span className={`pattern-tag ${story.tagClass}`}>{story.domain}</span>
                    </div>
                  </div>

                  {/* 5-Step Flow */}
                  <div className="learning-flow">
                    {/* What I Tried */}
                    <div className="flow-node flow-node-tried">
                      <div className="flow-label">
                        <span>What I Tried:</span>
                      </div>
                      <p className="flow-text">{story.tried}</p>
                    </div>

                    <div className="flow-arrow-down">↓</div>

                    {/* What Happened */}
                    <div className="flow-node flow-node-happened">
                      <div className="flow-label">
                        <span>What Happened:</span>
                      </div>
                      <p className="flow-text">{story.happened}</p>
                    </div>

                    <div className="flow-arrow-down">↓</div>

                    {/* Why It Was a Problem */}
                    <div className="flow-node flow-node-problem">
                      <div className="flow-label">
                        <span>Why It Was a Problem:</span>
                      </div>
                      <p className="flow-text">{story.problem}</p>
                    </div>

                    <div className="flow-arrow-down">↓</div>

                    {/* What I Changed */}
                    <div className="flow-node flow-node-changed">
                      <div className="flow-label">
                        <span>What I Changed:</span>
                      </div>
                      <p className="flow-text">{story.changed}</p>
                    </div>

                    <div className="flow-arrow-down">↓</div>

                    {/* What I Learned */}
                    <div className="flow-node flow-node-learned">
                      <div className="flow-label">
                        <span>What I Learned:</span>
                      </div>
                      <p className="flow-text">{story.learned}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* Concluding Section: What Changed in My Engineering Approach? */}
        <section style={{ marginTop: '4.5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            Core Evolution
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25, marginBottom: '1rem' }}>
            What Changed in My Engineering Approach?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '840px', marginBottom: '2rem' }}>
            Building and refactoring a complex manufacturing intelligence platform reshaped how I think about system design, verification, and technical trade-offs. The progression from an enthusiastic developer to a production-oriented engineer centers on four core mindset shifts:
          </p>

          <div className="approach-shift-grid">
            {SHIFTS.map((shift) => (
              <div key={shift.number} className="approach-shift-card">
                <div className="shift-header">{shift.number}</div>
                <h3 className="shift-title">{shift.title}</h3>
                <div className="shift-diff">
                  <div className="shift-from">
                    <strong>Before:</strong> {shift.fromText}
                  </div>
                  <div className="shift-to">
                    <strong>Now:</strong> {shift.toText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="card-elevated" style={{
          marginTop: '4rem',
          padding: '2.5rem',
          textAlign: 'center',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.85))'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.65rem' }}>Explore Related Engineering Artifacts</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
            Inspect the underlying architectural choices, failure mode benchmarks, and reusable design patterns that evolved from these learnings.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/engineering/patterns" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>Explore 5 Engineering Patterns →</span>
            </Link>
            <Link href="/engineering/decisions" className="btn btn-secondary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>Inspect 14 Architectural Decisions (ADRs) →</span>
            </Link>
            <Link href="/engineering/evaluation" className="btn btn-secondary" style={{ padding: '0.65rem 1.35rem', color: '#d8b4fe', borderColor: 'rgba(168, 85, 247, 0.4)' }}>
              <span>AI Evaluation Lab →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
