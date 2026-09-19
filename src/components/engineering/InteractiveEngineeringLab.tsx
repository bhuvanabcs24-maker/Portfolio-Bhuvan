'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  GitBranch, 
  FileCode, 
  Sparkles,
  Activity,
  AlertCircle,
  Database,
  Search,
  BookOpen,
  Code2,
  Workflow,
  X,
  Maximize2,
  Sliders,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

// ==========================================
// 1. ARCHITECTURE DECISIONS (ADR-001 to ADR-014)
// ==========================================
export interface ADRItem {
  id: string;
  adrId: string; // e.g. "ADR-001"
  title: string;
  category: string;
  status: string;
  context: string;
  decision: string;
  rationale: string;
  tradeOff: string;
  forgeiqLink?: string;
}

const ADR_LIST: ADRItem[] = [
  {
    id: 'adr-01',
    adrId: 'ADR-001',
    title: 'PostgreSQL for Core Manufacturing Relational Ledger',
    category: 'Database Architecture',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Quotation generation, parts inventory, and 9-stage order state machines require multi-entity ACID transactions. If an order transition succeeds but quotation totals or inventory deductions fail, the machine-shop floor is exposed to double-booking or wrong machining runs.',
    decision: 'Adopt PostgreSQL with foreign key constraints, composite B-Tree indexes, and JSONB columns for semi-structured CAD feature annotations, while mounting pgvector in the same database boundary.',
    rationale: 'Financial quotations, RFQ bids, and production status updates demand ACID guarantees. Document databases (MongoDB) lacked multi-table constraints, while PostgreSQL provides transactional integrity and unified vector search.',
    tradeOff: 'Requires strict schema migrations (DDL) and connection pooling under load, unlike schemaless document stores that allow arbitrary ad-hoc document modifications.'
  },
  {
    id: 'adr-02',
    adrId: 'ADR-002',
    title: 'FastAPI ASGI with Multi-Process Pool for Asynchronous CAD Geometry Math',
    category: 'Backend Architecture',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'The backend serves concurrent client traffic, handles multipart DXF file uploads, and calculates CPU-intensive polygon geometry contours from engineering drawings.',
    decision: 'FastAPI running on Uvicorn ASGI with a dedicated Python ProcessPoolExecutor worker pool for CPU-bound CAD vector parsing operations.',
    rationale: "Python's AsyncIO event loop is single-threaded; CPU-bound polygon vector math blocks all incoming HTTP requests. Offloading heavy CAD parsing to worker processes bypasses the GIL, yielding a verified 5.5× throughput improvement (860 to 4,589 req/s).",
    tradeOff: 'Inter-process communication (IPC) serialization overhead between FastAPI and worker processes; slight memory footprint increase per worker process.'
  },
  {
    id: 'adr-03',
    adrId: 'ADR-003',
    title: 'Next.js App Router Architecture with Strict TypeScript Contracts',
    category: 'Frontend Architecture',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Platform serves both prospective industrial buyers (requiring fast initial load and SEO) and authenticated shop-floor operators (requiring live state steppers and interactive CAD viewer canvases).',
    decision: "Next.js App Router with React Server Components for marketing views and client components ('use client') for interactive portals, backed by TypeScript interfaces aligned with FastAPI Pydantic schemas.",
    rationale: 'Enables zero-bundle-size server layouts while isolating interactive JavaScript to stateful client components. TypeScript contracts directly match backend Pydantic models.',
    tradeOff: 'Mental overhead managing server/client boundary; React hydration payload is heavier than zero-JS static HTML.'
  },
  {
    id: 'adr-04',
    adrId: 'ADR-004',
    title: 'Supabase Authentication with Scoped JWT Claims & RBAC',
    category: 'Security & Auth',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Requires secure authentication separating two primary roles: enterprise buyers and manufacturing factory operators/administrators.',
    decision: "Supabase Auth on frontend with FastAPI verifying JWT bearer tokens against public cryptographic keys using PyJWT and extracting role claims ('buyer' or 'manufacturer_admin').",
    rationale: 'Provides audited authentication infrastructure (email confirmation, token refresh rotation, CSRF protection) while allowing FastAPI microservices to remain completely stateless.',
    tradeOff: 'Token expiration synchronization between client sessions and FastAPI backend verification requires careful middleware error handling.'
  },
  {
    id: 'adr-05',
    adrId: 'ADR-005',
    title: 'Deterministic CAD Parsing Over Probabilistic Generative AI',
    category: 'CAD / Systems',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Estimating laser cutting contours, sheet metal bending lengths, and raw stock pricing from vector drawings.',
    decision: 'Extract geometry deterministically via Python ezdxf and NetworkX graph cycle algorithms. Restrict LLMs exclusively to qualitative NLP tasks (extracting buyer notes and delivery instructions).',
    rationale: 'Generative AI models hallucinate geometric dimensions by 20% to 50%, which in physical sheet metal fabrication causes disastrous material waste or scrapped parts. Deterministic vector math has 0% hallucination.',
    tradeOff: 'Requires explicit algorithmic handling for malformed DXF entities (unclosed loops, spline approximations, micro-gaps) rather than fuzzy natural language interpretation.'
  },
  {
    id: 'adr-06',
    adrId: 'ADR-006',
    title: 'Pluggable AI Provider Factory with Hermetic Offline Mock CI Harness',
    category: 'AI & Testing',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Automated CI pipelines run on every git commit. Directly calling third-party cloud LLM APIs causes network latency, token costs, and HTTP 429 rate limit failures.',
    decision: 'Abstract AIProviderBase interface with concrete GeminiFlashProvider and MockAIProvider implementations resolved via a dynamic factory.',
    rationale: 'Enables the full 47-test suite (33 Pytest + 14 Playwright E2E) to execute deterministically in CI in ~12 seconds with 0 API cost and 0% network flakiness.',
    tradeOff: 'Requires maintaining ground-truth test fixtures and custom adapter classes rather than calling vendor SDKs directly.'
  },
  {
    id: 'adr-07',
    adrId: 'ADR-007',
    title: 'Hybrid Full-Text Search (tsvector) and pgvector Cosine Distance',
    category: 'Retrieval & AI',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Matching incoming RFQ requirements to factory equipment capabilities across technical specifications, bed dimensions, and alloy grades.',
    decision: 'Two-stage retrieval pipeline: PostgreSQL SQL boolean pre-filtering for physical machine capabilities, followed by pgvector 1536-dimensional cosine similarity ranking.',
    rationale: 'Pure vector similarity often confuses distinct alloys (e.g. SS304 vs SS316L) because their embedding vectors sit close in semantic space. Boolean pre-filters enforce hard physical machine limits before semantic ranking.',
    tradeOff: 'Requires managing dual index structures (GIN index for tsvector, HNSW index for vector embeddings).'
  },
  {
    id: 'adr-08',
    adrId: 'ADR-008',
    title: 'Finite State Machine for 9-Stage Production Tracking Pipeline',
    category: 'Pipeline Architecture',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Tracking manufacturing orders through RFQ, quotation, laser cutting, bending, QA, and dispatch.',
    decision: 'Explicit finite state machine enforcing strict transition rules, database row-level locking, and immutable transition audit logs.',
    rationale: 'Prevents invalid state jumps (e.g., dispatching an order before quality inspection sign-off) and provides unambiguous order tracking for both buyers and factory admins.',
    tradeOff: 'State transitions require synchronized validation checks and cannot be bypassed for ad-hoc status overrides without administrative audit overrides.'
  },
  {
    id: 'adr-09',
    adrId: 'ADR-009',
    title: 'Graph-Based Vertex Snapping for Real-World CAD Tolerance Handling',
    category: 'CAD Algorithms',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Real-world CAD drawings exported from diverse software packages frequently contain micro-gaps (0.005mm) or duplicate overlapping vertices.',
    decision: 'Graph-based vertex snapping with a 0.01mm tolerance threshold using NetworkX graph cycle detection to reconstruct closed outer contours.',
    rationale: 'Naive polyline summing crashes or double-counts perimeters when loops have tiny export gaps, causing quotes to fail unnecessarily.',
    tradeOff: 'Spatial graph construction adds O(V log V) spatial indexing overhead compared to simple sequential polyline iteration.'
  },
  {
    id: 'adr-10',
    adrId: 'ADR-010',
    title: 'Strict Pydantic v2 Contract Validation at API Boundaries',
    category: 'API Standards',
    status: 'IMPLEMENTED & ACTIVE',
    context: '40+ REST endpoints communicating between frontend client, AI parsing workers, and relational database.',
    decision: 'Mandatory Pydantic v2 schemas for all request payloads, query parameters, and response bodies with automated OpenAPI 3.1 schema generation.',
    rationale: 'Prevents runtime type errors, ensures consistent RFC 7807 problem details error responses, and enables automatic client SDK generation.',
    tradeOff: 'Strict schema validation rejects non-conforming client payloads that lax endpoints might otherwise partially accept.'
  },
  {
    id: 'adr-11',
    adrId: 'ADR-011',
    title: 'Unified CTE Data Aggregation for Query Compounding Mitigation',
    category: 'Database Optimization',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Order inspection endpoints were initially issuing 12 individual SQL queries per request inside loop handlers, saturating database pools at 860 req/s.',
    decision: 'Consolidate multiple relational queries into a single parameterized PostgreSQL query using Common Table Expressions (CTEs) and json_agg.',
    rationale: 'Eliminates N+1 query compounding and reduces round-trip database latency, contributing to the verified 5.5× throughput speedup under load.',
    tradeOff: 'Complex SQL queries are harder to debug than simple ORM model lookups and require thorough integration test coverage.'
  },
  {
    id: 'adr-12',
    adrId: 'ADR-012',
    title: 'Serverless PostgreSQL via Neon with Staging Database Branching',
    category: 'Infrastructure',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Managing test database instances for CI/CD runs and local development without paying for idle database compute.',
    decision: 'Adopt Neon Serverless PostgreSQL with copy-on-write instant database branching for automated ephemeral test environments.',
    rationale: 'Allows testing complex schema migrations against isolated branches in seconds without impacting production or staging data.',
    tradeOff: 'Cold start latency on initial query after compute scale-down (mitigated by setting a 5-minute compute scale-down window).'
  },
  {
    id: 'adr-13',
    adrId: 'ADR-013',
    title: 'Deterministic Mock Provider Verification in CI Over Live Cloud APIs',
    category: 'Testing Discipline',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'Executing automated regression tests on continuous integration runners without secrets exposure or network latency.',
    decision: 'Route all automated CI test jobs to MockAIProvider replaying verified ground-truth payloads with 0ms latency.',
    rationale: 'Ensures 100% predictable, reproducible test runs and eliminates CI failures caused by external vendor outages or rate limit spikes.',
    tradeOff: 'Requires periodic end-to-end smoke testing against real cloud APIs on staging to verify live upstream SDK compatibility.'
  },
  {
    id: 'adr-14',
    adrId: 'ADR-014',
    title: 'Decoupled Open-Source Core Library (dxf-contour-extractor)',
    category: 'Modularity',
    status: 'IMPLEMENTED & ACTIVE',
    context: 'CAD vector geometry extraction logic is valuable outside ForgeIQ for other engineering tools and research setups.',
    decision: 'Isolate CAD parsing and polygon extraction algorithms into a standalone, zero-database Python package with zero external network dependencies.',
    rationale: 'Enables external engineers to extract 2D DXF contours with a single pip install, keeping the core geometry algorithms independently testable.',
    tradeOff: 'Requires maintaining a clean API boundary with zero coupling to ForgeIQ database models or quotation pricing logic.'
  }
];

// ==========================================
// 2. AI EVALUATION CONSOLE (Real Measurements Only!)
// ==========================================
export interface EvalDimension {
  id: string;
  num: string;
  name: string;
  input: string;
  model: string;
  output: string;
  validation: string;
  failureCase: string;
  measuredMetric: string;
  status: 'VERIFIED BENCHMARK' | 'NOT YET MEASURED' | 'TEST PASSING';
}

const EVAL_DIMENSIONS: EvalDimension[] = [
  {
    id: 'eval-pricing',
    num: 'EVAL-01',
    name: 'Parametric Quotation Accuracy',
    input: 'Production shop-floor benchmark CAD drawings, sheet metal thickness (1.5mm - 6.0mm), cutting perimeters, and piercing counts.',
    model: 'Deterministic parametric pricing engine (laser travel speed + piercing wear + sheet scrap yield formulas).',
    output: 'Part quotation total breakdown ($/part, cutting time in seconds, material scrap factor).',
    validation: 'Comparison against historical manufacturing production quotes across benchmark parts.',
    failureCase: 'Input drawing missing thickness annotation or material alloy specification.',
    measuredMetric: '96.9% Verified Benchmark Accuracy',
    status: 'VERIFIED BENCHMARK'
  },
  {
    id: 'eval-schema',
    num: 'EVAL-02',
    name: 'Structured JSON Output Compliance',
    input: 'Unstructured customer RFQ notes, metallurgical abbreviations, delivery requirements, and file metadata.',
    model: 'Gemini 2.5 Flash with response_mime_type="application/json" & Mock AI Provider in test harness.',
    output: 'Structured Pydantic model (material: AlloyEnum, thickness_mm: float, surface_treatment: Optional[str]).',
    validation: 'Pydantic v2 strict type validation with regex wrapper stripping for markdown code blocks.',
    failureCase: 'LLM returning markdown backticks (```json ... ```) or omitting required numerical fields.',
    measuredMetric: '100% Validated in Automated CI Test Suite',
    status: 'TEST PASSING'
  },
  {
    id: 'eval-cad-geometry',
    num: 'EVAL-03',
    name: 'CAD Geometry Extraction Correctness',
    input: 'Raw 2D DXF vector drawing files with polyline loops, inner circular holes, and bend lines.',
    model: 'Deterministic Python parser (ezdxf + NetworkX spatial cycle extraction).',
    output: 'Exact polygon coordinate loops, bounding box dimensions (X/Y mm), cutting path length, inner pierce count.',
    validation: 'Spatial topology graph cycle validation and vertex snapping within 0.01mm tolerance threshold.',
    failureCase: 'Unclosed polylines with micro-gaps (e.g. 0.005mm) or duplicate overlapping vertices from legacy CAD exporters.',
    measuredMetric: '100% Deterministic (Zero Generative Hallucination)',
    status: 'VERIFIED BENCHMARK'
  },
  {
    id: 'eval-retrieval',
    num: 'EVAL-04',
    name: 'Semantic RFQ to Factory Retrieval Quality',
    input: 'RFQ manufacturing requirements: machine bed size, laser wattage, certified alloy processing.',
    model: 'Two-stage hybrid search: PostgreSQL tsvector full-text search + pgvector 1536-dim embeddings.',
    output: 'Ranked list of qualified factory profiles with match scores.',
    validation: 'Relational SQL boolean pre-filtering for hard physical machine constraints prior to cosine similarity ranking.',
    failureCase: 'Vector similarity scoring two distinct stainless steel grades (SS304 vs SS316L) as near-identical due to text proximity.',
    measuredMetric: 'NOT YET MEASURED (Offline evaluation against historical machine-shop bid acceptances planned)',
    status: 'NOT YET MEASURED'
  },
  {
    id: 'eval-throughput',
    num: 'EVAL-05',
    name: 'Concurrent Request Throughput & Latency Budget',
    input: '50 concurrent virtual users generating order inspection, CAD parsing, and quotation check requests.',
    model: 'FastAPI async ASGI + ProcessPoolExecutor worker pool + PostgreSQL CTE query aggregation.',
    output: 'HTTP response latency and requests per second under load.',
    validation: 'Locust load-testing test harness with automated 95th percentile latency assertion.',
    failureCase: 'Event loop thread starvation when CPU-bound polygon vector math runs on main thread.',
    measuredMetric: '5.5× Throughput Improvement (860 → 4,589 req/s)',
    status: 'VERIFIED BENCHMARK'
  },
  {
    id: 'eval-test-coverage',
    num: 'EVAL-06',
    name: 'Automated Regression Reliability',
    input: 'End-to-end user workflows: buyer auth, drawing upload, quote generation, and order stage progression.',
    model: 'Hermetic test suite combining unit, integration, and browser automation test runners.',
    output: 'Pass/fail test report and execution time in seconds.',
    validation: '33 Pytest unit/integration tests + 14 Playwright E2E browser tests.',
    failureCase: 'Flaky network requests to external APIs causing false test failures in continuous integration.',
    measuredMetric: '47/47 Automated Tests Passing (33 Pytest + 14 Playwright)',
    status: 'TEST PASSING'
  },
  {
    id: 'eval-domain-drift',
    num: 'EVAL-07',
    name: 'Production Drift & Token Telemetry',
    input: 'Live production RFQ intake streams across varying industrial manufacturing sectors.',
    model: 'OpenTelemetry collector tracing model latency, token consumption, and response drift.',
    output: 'Telemetry dashboards and drift alerts.',
    validation: 'Weekly divergence tracking against human-annotated ground-truth RFQ specifications.',
    failureCase: 'Model behavior drift on newly coined proprietary trade alloy designations.',
    measuredMetric: 'NOT YET MEASURED (Telemetry collector scheduled for production deployment phase)',
    status: 'NOT YET MEASURED'
  }
];

// ==========================================
// 3. REUSABLE ENGINEERING PATTERNS
// ==========================================
export interface ReusablePattern {
  id: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  architecturePoints: string[];
  tradeOffs: { overhead: string; gain: string };
  codeSnippet: string;
}

const PATTERNS_LIST: ReusablePattern[] = [
  {
    id: 'pat-ai-factory',
    name: 'AI Provider Abstraction & Factory',
    category: 'Architecture / Testing',
    problem: 'Directly coupling API endpoints to proprietary cloud AI SDKs causes vendor lock-in, unmockable test suites, rate-limit failures (HTTP 429) during CI runs, and makes local offline development impossible.',
    solution: 'Decouple core business logic through an abstract provider contract (AIProviderBase), a dynamic factory dispatcher, and an offline mock provider (MockAIProvider) that replays verified ground-truth JSON payloads with 0ms latency.',
    architecturePoints: [
      'Abstract Provider Contract (AIProviderBase) with standardized async methods',
      'Dynamic Factory (get_ai_provider()) resolving provider from environment variables',
      'Hermetic Mock Provider for instantaneous, zero-cost CI test execution',
      'Production Gemini Provider for multimodal inference with strict Pydantic JSON schemas'
    ],
    tradeOffs: {
      overhead: 'Introduces an extra interface layer; vendor-specific proprietary features require adapter methods.',
      gain: '47 automated tests run in ~12 seconds with 0 API cost and zero network flakiness; changing providers takes <40 lines of code.'
    },
    codeSnippet: `class AIProviderBase(ABC):
    @abstractmethod
    async def extract_structured_data(
        self, prompt: str, schema: Type[T], raw_content: Optional[bytes] = None
    ) -> T: ...

def get_ai_provider() -> AIProviderBase:
    provider = os.getenv("AI_PROVIDER", "mock").lower()
    if provider == "gemini":
        return GeminiFlashProvider()
    return MockAIProvider()`
  },
  {
    id: 'pat-rbac',
    name: 'Multi-Tenant RBAC & Cryptographic JWT Claims',
    category: 'Security / Systems',
    problem: 'Hand-rolling session cryptography is dangerous, but relying on third-party identity providers without strict microservice authorization allows unauthorized tenant data leakage across manufacturing borders.',
    solution: 'Stateless backend authorization where FastAPI middleware cryptographically verifies Supabase JWTs, extracts tenant and role claims (buyer vs manufacturer_admin), and enforces PostgreSQL Row-Level Security.',
    architecturePoints: [
      'Stateless JWT Bearer token verification using public cryptographic keys',
      'FastAPI Depends() dependency injection for role-gated endpoint access',
      'PostgreSQL Row-Level Security (RLS) ensuring strict cross-tenant data isolation',
      'Audit logging of all administrative operations to append-only database tables'
    ],
    tradeOffs: {
      overhead: 'Requires token validation middleware on all private API endpoints.',
      gain: 'Complete tenant isolation with zero session state stored in API server memory.'
    },
    codeSnippet: `async def require_role(role: str, user=Depends(get_current_user)):
    if user.get("role") != role:
        raise HTTPException(status_code=403, detail="Forbidden: Insufficient role permissions")
    return user`
  },
  {
    id: 'pat-retrieval-pipeline',
    name: 'Two-Stage Hybrid Retrieval Pipeline',
    category: 'Search & Applied AI',
    problem: 'Vector cosine similarity measures semantic proximity, not hard engineering constraints. In physical manufacturing, scoring an incompatible machine bed or wrong alloy as a match causes operational failure.',
    solution: 'Two-stage retrieval pipeline combining deterministic PostgreSQL SQL boolean pre-filtering for physical machine capabilities with pgvector 1536-dimensional cosine distance ranking.',
    architecturePoints: [
      'Stage 1: Boolean SQL filter on hard constraints (laser wattage, bed size X/Y, material class)',
      'Stage 2: Semantic vector ranking using pgvector cosine distance on unstructured capabilities',
      'Combined query execution in a single database transaction via composite indexing'
    ],
    tradeOffs: {
      overhead: 'Requires managing both relational B-Tree indexes and pgvector HNSW vector indexes.',
      gain: 'Eliminates operationally illegal recommendations while retaining semantic search flexibility.'
    },
    codeSnippet: `SELECT id, name, 1 - (embedding <=> :query_vec) AS similarity
FROM factory_profiles
WHERE max_thickness_mm >= :req_thickness
  AND :req_alloy = ANY(supported_alloys)
ORDER BY embedding <=> :query_vec ASC
LIMIT 10;`
  },
  {
    id: 'pat-testing-arch',
    name: 'Hermetic Multi-Tier Testing Architecture',
    category: 'Reliability & CI/CD',
    problem: 'Without systematic automated verification, complex multi-stage workflows develop subtle regressions during refactoring, and flaky end-to-end tests destroy developer trust in continuous integration.',
    solution: 'Three-tiered testing pyramid: 33 Pytest unit/integration tests validating CAD geometry extraction and quotation formulas, 14 Playwright E2E tests validating browser portals, and Locust load testing for latency budgets.',
    architecturePoints: [
      'Unit & Integration (33 tests): Direct verification of CAD parser loops and pricing formulas',
      'Browser E2E (14 tests): Full browser interaction testing of auth, file upload, and state steppers',
      'Load Testing: Concurrency benchmarking under 50 virtual users ensuring <500ms response budgets',
      'Mock AI Provider: Guarantees 0ms external latency and zero API expenses during CI regression'
    ],
    tradeOffs: {
      overhead: 'Requires maintaining realistic test fixtures and Playwright page object models.',
      gain: '47/47 passing tests provide complete confidence during aggressive performance optimization.'
    },
    codeSnippet: `def test_cad_parsing_inner_piercing_count():
    parser = CADGeometryParser("tests/fixtures/bracket_sample.dxf")
    features = parser.extract_2d_features()
    assert features.pierce_count == 4
    assert round(features.bounding_box_x, 2) == 180.00`
  }
];

// ==========================================
// 4. AUTHENTIC ENGINEERING LEARNINGS
// ==========================================
export interface LearningStory {
  id: string;
  number: string;
  title: string;
  domain: string;
  whatWasTried: string;
  whatHappened: string;
  theProblem: string;
  architecturalChange: string;
  engineeringTakeaway: string;
}

const LEARNING_STORIES: LearningStory[] = [
  {
    id: 'story-01',
    number: '01',
    title: 'Relational Query Compounding to Unified CTE Aggregation',
    domain: 'Database & Concurrency',
    whatWasTried: 'Initially fetched order lifecycle details by issuing an initial SQL query for the order record, followed by loop queries for line items, bids, and status history logs.',
    whatHappened: 'Under local concurrent load testing with 50 virtual users, response latency spiked sharply, connection pools became saturated, and throughput plateaued at 860 req/s.',
    theProblem: 'Issuing 12 independent SQL roundtrips per order check exhausted the serverless database connection pool limit and caused extreme query contention.',
    architecturalChange: 'Refactored data fetching into a single parameterized query utilizing PostgreSQL Common Table Expressions (CTEs) and json_agg, indexed with a composite B-Tree on (tenant_id, order_id, stage_timestamp).',
    engineeringTakeaway: 'Never assume database ORMs optimize nested access automatically. Profiling with load generators early in development prevents connection starvation before architecture hardens (achieved 5.5× throughput speedup).'
  },
  {
    id: 'story-02',
    number: '02',
    title: 'From Prompt-Based Geometry Pricing to Deterministic CAD Math',
    domain: 'AI Engineering & Boundaries',
    whatWasTried: 'Fed raw vertex coordinates and text descriptions of CAD boundary lines directly into an LLM prompt, asking it to calculate part volume, surface area, and machining hours.',
    whatHappened: 'The model produced 20% to 50% variance across repeated calls for identical CAD files, frequently hallucinating circular cutouts and miscalculating bounding boxes.',
    theProblem: 'In physical manufacturing, raw bar stock and machine hours are expensive realities. A hallucinated dimension produces unusable quotes that either cause financial loss or quote exorbitantly high.',
    architecturalChange: 'Stripped geometry calculation away from the LLM entirely. Built a deterministic Python geometry preprocessor using ezdxf and vector math. The LLM was restricted strictly to qualitative NLP tasks constrained by Pydantic schemas.',
    engineeringTakeaway: 'LLMs are probabilistic sequence models, not geometric math engines. Transactional and physical calculations must always remain 100% deterministic; AI belongs where semantics and natural language add real leverage.'
  },
  {
    id: 'story-03',
    number: '03',
    title: 'From Live API Testing to Hermetic Mock Provider CI Harness',
    domain: 'Testing & CI/CD',
    whatWasTried: 'Ran initial Playwright and Pytest suites by calling live Google Gemini API endpoints directly using an API key stored in CI environment secrets.',
    whatHappened: 'Test runs were slow (~2 minutes per run), frequently failed with HTTP 429 Rate Limit errors when multiple tests ran in parallel, and broke whenever external network latency surged.',
    theProblem: 'Flaky test suites erode confidence in automated testing. When CI fails due to external API rate limits rather than code regressions, developers start ignoring test failures.',
    architecturalChange: 'Designed the Pluggable AI Provider Factory with MockAIProvider. In CI and local test environments, the harness automatically replays pre-validated JSON fixtures in 0ms network latency without outbound HTTP calls.',
    engineeringTakeaway: 'Automated test suites must be hermetic and fast. Third-party cloud dependencies should always be isolated behind an abstraction barrier so that internal regression testing is deterministic, free, and instantaneous.'
  },
  {
    id: 'story-04',
    number: '04',
    title: 'From Naive Polyline Traversal to Graph-Based Vertex Snapping',
    domain: 'CAD Algorithmic Robustness',
    whatWasTried: 'Computed sheet metal cutting perimeters by summing the Euclidean lengths of consecutive LINE and POLYLINE entities in DXF files.',
    whatHappened: 'Real-world CAD files from various CAD exporters contained disconnected polyline segments, unclosed loops with micro-gaps (e.g. 0.005mm), and duplicate overlapping vertices, causing perimeter and area algorithms to crash.',
    theProblem: 'When the geometry parser fails to recognize closed cutting loops, the quotation engine cannot estimate internal pierce counts or sheet scrap percentages, rejecting valid engineering drawings.',
    architecturalChange: 'Replaced naive traversal with a graph-based vertex snapping algorithm with a 0.01mm tolerance threshold using NetworkX to construct an adjacency graph and detect true polygon cycles.',
    engineeringTakeaway: 'Input data in physical engineering systems is rarely clean or well-formed. Algorithms must be designed with defensive tolerance thresholds and graph-based validation rather than assuming idealized geometric standards.'
  },
  {
    id: 'story-05',
    number: '05',
    title: 'From Blocking Async Handlers to Multi-Process Pool Offloading',
    domain: 'Concurrency & Event Loops',
    whatWasTried: 'Wrote CAD geometry parsing directly inside FastAPI async def route handlers, assuming that async would allow the server to handle other requests concurrently.',
    whatHappened: 'When an uploaded CAD drawing contained dense polygon contours, the server completely froze for 500ms to 1200ms. Concurrent dashboard requests and health check pings timed out until the calculation finished.',
    theProblem: "Python's AsyncIO event loop is single-threaded. CPU-bound calculations in an async function monopolize the thread and block the event loop entirely, destroying concurrent I/O performance.",
    architecturalChange: 'Separated CPU computation from I/O by creating a singleton ProcessPoolExecutor. Heavy parsing functions were made pure and dispatched via run_in_executor(), running in isolated OS worker processes with a 5-second timeout guard.',
    engineeringTakeaway: 'Async does not equal parallel. Never run heavy CPU-bound algorithms inside the async event loop; offload them to dedicated worker processes or background task queues.'
  }
];

// ==========================================
// 5. TECHNICAL WRITING & ENGINEERING NOTES
// ==========================================
export interface TechNote {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  topic: 'AI' | 'CAD' | 'BACKEND' | 'SYSTEMS' | 'TESTING';
  readTime: string;
  status: 'PUBLISHED NOTE' | 'TECHNICAL NOTE';
  summary: string;
  codeSnippetPreview: string;
  fullLink?: string;
}

const TECH_NOTES: TechNote[] = [
  {
    id: 'note-cad-understanding',
    slug: 'why-cad-understanding-is-difficult',
    title: 'Why CAD Understanding Is Difficult for Manufacturing Automation',
    subtitle: 'Geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF and 3D STEP files requires graph math rather than generative AI.',
    topic: 'CAD',
    readTime: '9 min read',
    status: 'PUBLISHED NOTE',
    summary: 'When mechanical drawings are uploaded to an automated quotation system, they cannot be treated like images or raw text. This note explores why naive polyline traversal fails, how graph-based vertex snapping resolves micro-gaps, and why deterministic geometry algorithms must precede AI inference.',
    codeSnippetPreview: `// Vertex Snapping with 0.01mm Tolerance Threshold
def snap_endpoints(graph, tolerance=0.01):
    kdtree = KDTree([node for node in graph.nodes()])
    # Merge vertices within threshold into single spatial node`,
    fullLink: '/writing/why-cad-understanding-is-difficult'
  },
  {
    id: 'note-safe-ai',
    slug: 'designing-ai-systems-that-fail-safely',
    title: 'Designing AI Systems That Fail Safely',
    subtitle: 'Defensive Pydantic schema enforcement, temperature zero fallbacks, and multi-tier verification in physical software systems.',
    topic: 'AI',
    readTime: '7 min read',
    status: 'TECHNICAL NOTE',
    summary: 'When language models operate within systems that generate financial quotes or physical machining specifications, unhandled hallucinations cause real-world damage. This note outlines strategies for deterministic schema containment, JSON repair regexes, and circuit breakers.',
    codeSnippetPreview: `// Safe Schema Boundary Enforcement
class ExtractedRFQSchema(BaseModel):
    alloy: MetallurgicalAlloyEnum
    thickness_mm: PositiveFloat
    tolerance_standard: ISO2768Standard`
  },
  {
    id: 'note-mfg-workflow',
    slug: 'building-an-ai-powered-manufacturing-workflow',
    title: 'Building an AI-Powered Manufacturing Workflow',
    subtitle: 'Orchestrating a 9-stage production lifecycle between buyers, factory admins, and quality inspectors with append-only audit trails.',
    topic: 'SYSTEMS',
    readTime: '8 min read',
    status: 'TECHNICAL NOTE',
    summary: 'How ForgeIQ structures order states from RFQ intake to final CNC machining and quality dispatch. Discusses state transition validation, database locking under concurrency, and decoupling real-time event updates.',
    codeSnippetPreview: `// State Machine Transition Rule
ALLOWED_TRANSITIONS = {
    "RFQ_RECEIVED": ["CAD_PARSED", "REJECTED"],
    "CAD_PARSED": ["QUOTED"],
    "QUOTED": ["ORDER_CONFIRMED"],
    "ORDER_CONFIRMED": ["LASER_CUTTING"]
}`
  },
  {
    id: 'note-rag-evaluation',
    slug: 'evaluating-rag-beyond-retrieval-accuracy',
    title: 'Evaluating RAG Beyond Retrieval Accuracy',
    subtitle: 'Why high cosine similarity can retrieve operationally illegal recommendations, and how hybrid SQL metadata filters prevent hallucinated manufacturing standards.',
    topic: 'BACKEND',
    readTime: '6 min read',
    status: 'TECHNICAL NOTE',
    summary: 'Vector similarity measures semantic proximity, not regulatory compliance. Explores why combining relational WHERE clauses with pgvector cosine distance ranking is essential for aerospace, medical, and industrial standards retrieval.',
    codeSnippetPreview: `// Hybrid Pre-Filter + Vector Cosine Ranking
SELECT profile_id, (1 - (embedding <=> :query_vec)) AS score
FROM factory_capabilities
WHERE laser_wattage >= 4000 AND max_bed_x >= 3000
ORDER BY score DESC LIMIT 5;`
  },
  {
    id: 'note-tradeoffs',
    slug: 'engineering-trade-offs-behind-forgeiq',
    title: 'Engineering Trade-offs Behind ForgeIQ',
    subtitle: 'Why PostgreSQL over MongoDB, FastAPI over Node.js, and ProcessPoolExecutor over raw async event loops.',
    topic: 'TESTING',
    readTime: '7 min read',
    status: 'TECHNICAL NOTE',
    summary: 'An architectural retrospective analyzing why specific design decisions were chosen, which alternatives were rejected, and what performance benchmarks were achieved under load.',
    codeSnippetPreview: `// Benchmarking Concurrency Scaling
Baseline (Single Threaded): 860 req/s @ 95th latency 420ms
ProcessPoolExecutor:        4,589 req/s @ 95th latency 78ms`
  }
];

export default function InteractiveEngineeringLab() {
  const [activeModule, setActiveModule] = useState<'architecture' | 'evaluation' | 'patterns' | 'learnings' | 'writing'>('architecture');
  
  // Detail Inspection States
  const [selectedADR, setSelectedADR] = useState<ADRItem | null>(null);
  const [selectedEval, setSelectedEval] = useState<EvalDimension | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<ReusablePattern | null>(null);
  const [selectedLearning, setSelectedLearning] = useState<LearningStory | null>(null);
  const [selectedNote, setSelectedNote] = useState<TechNote | null>(null);

  // Hover states for preview
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Filter for Writing Notes
  const [writingTopicFilter, setWritingTopicFilter] = useState<'ALL' | 'AI' | 'CAD' | 'BACKEND' | 'SYSTEMS' | 'TESTING'>('ALL');

  // Keyboard accessibility: Escape closes any open inspection modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedADR(null);
        setSelectedEval(null);
        setSelectedPattern(null);
        setSelectedLearning(null);
        setSelectedNote(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredNotes = TECH_NOTES.filter(note => {
    if (writingTopicFilter === 'ALL') return true;
    return note.topic === writingTopicFilter;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#07090e', color: '#f1f5f9', position: 'relative' }}>
      
      {/* Background Architectural Grid Pattern */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0
        }}
      />

      {/* Top Header / Breadcrumbs */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(7, 9, 14, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-secondary, #94a3b8)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              padding: '0.3rem 0.65rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={13} />
            <span>RETURN TO OVERVIEW</span>
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            ENGINEERING LAB
          </span>
          <span style={{ 
            fontSize: '0.7rem', 
            color: 'rgba(255, 255, 255, 0.4)', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.15rem 0.45rem',
            borderRadius: '3px'
          }}>
            INTERACTIVE TECHNICAL LABORATORY
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem', color: '#10b981' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span>LAB ENVIRONMENT: ACTIVE</span>
        </div>
      </header>

      {/* Main Laboratory Workspace */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1360px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* Lab Title Block */}
        <div style={{ marginBottom: '3.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '2.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            letterSpacing: '0.12em', 
            color: '#38bdf8',
            marginBottom: '0.75rem',
            textTransform: 'uppercase'
          }}>
            <Terminal size={14} />
            <span>SYSTEM SPECIFICATION &amp; METHODOLOGY LABORATORY</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.035em', 
            lineHeight: 1.05,
            color: '#f8fafc',
            margin: '0.25rem 0 1rem'
          }}>
            ENGINEERING LAB
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', 
            color: 'var(--text-secondary, #94a3b8)', 
            maxWidth: '820px', 
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            An interactive workspace to inspect how I architect systems: architectural decision records, evaluation consoles with real measurements, reusable production patterns, authentic retrospectives, and technical laboratory notes.
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1.5rem', 
            marginTop: '1.75rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            color: 'rgba(255, 255, 255, 0.45)' 
          }}>
            <div>MODULES: <span style={{ color: '#f1f5f9', fontWeight: 600 }}>05 INSTRUMENTS</span></div>
            <div>ADRs: <span style={{ color: '#60a5fa', fontWeight: 600 }}>14 DOCUMENTED</span></div>
            <div>MEASUREMENTS: <span style={{ color: '#10b981', fontWeight: 600 }}>REAL BENCHMARKS ONLY</span></div>
          </div>
        </div>

        {/* 5 Instrument Selector Bar (Tabbed Workbench) */}
        <nav 
          aria-label="Engineering Lab Instrument Modules"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '0.75rem', 
            marginBottom: '3rem' 
          }}
        >
          {[
            { id: 'architecture', code: '01', title: 'ARCHITECTURE', desc: '14 Documented ADRs', color: '#60a5fa' },
            { id: 'evaluation', code: '02', title: 'AI EVALUATION', desc: 'Evaluation Console & Metrics', color: '#ec4899' },
            { id: 'patterns', code: '03', title: 'PATTERNS', desc: 'Reusable System Schematics', color: '#f59e0b' },
            { id: 'learnings', code: '04', title: 'LEARNINGS', desc: 'Engineering Retrospectives', color: '#10b981' },
            { id: 'writing', code: '05', title: 'WRITING', desc: 'Technical Documents & Notes', color: '#a855f7' }
          ].map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as any)}
                style={{
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.06)' : 'rgba(11, 14, 21, 0.75)',
                  border: isActive ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 8px 24px -6px ${item.color}33` : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: item.color, fontWeight: 700 }}>
                    INSTRUMENT {item.code}
                  </span>
                  {isActive && (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color }} />
                  )}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  {item.desc}
                </div>
              </button>
            );
          })}
        </nav>

        {/* ==========================================================
            MODULE 1: ARCHITECTURE (ADR-001 to ADR-014)
            ========================================================== */}
        {activeModule === 'architecture' && (
          <section aria-label="Architecture Decisions Module" style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#60a5fa', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.3rem' }}>
                  ARCHITECTURE OBSERVATORY // RECORDED DECISIONS
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Architectural Decision Records (ADRs)
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem', margin: 0 }}>
                  Every technical decision in the system is recorded with context, chosen approach, rationale, trade-offs, and implementation status.
                </p>
              </div>

              <Link
                href="/engineering/decisions"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  color: '#60a5fa',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none'
                }}
              >
                <span>Full ADR Registry</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* ADR Grid (Asymmetric & Instrument styled) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {ADR_LIST.map((adr) => {
                const isHovered = hoveredItem === adr.id;
                return (
                  <div
                    key={adr.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(adr.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedADR(adr)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedADR(adr);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(11, 14, 21, 0.85)',
                      border: isHovered ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isHovered ? '0 12px 30px -8px rgba(96, 165, 250, 0.25)' : 'none',
                      outline: 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          color: '#60a5fa',
                          backgroundColor: 'rgba(96, 165, 250, 0.12)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '3px',
                          border: '1px solid rgba(96, 165, 250, 0.3)'
                        }}>
                          {adr.adrId}
                        </span>

                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                          {adr.status}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                        {adr.title}
                      </h3>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.85rem' }}>
                        CATEGORY: {adr.category.toUpperCase()}
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.55, margin: 0 }}>
                        {adr.context.length > 140 ? `${adr.context.substring(0, 140)}...` : adr.context}
                      </p>
                    </div>

                    <div style={{ 
                      marginTop: '1.25rem', 
                      paddingTop: '0.85rem', 
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isHovered ? '#60a5fa' : 'rgba(255, 255, 255, 0.4)'
                    }}>
                      <span>OPEN DOCUMENT (CONTEXT / TRADE-OFF)</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            MODULE 2: AI EVALUATION CONSOLE (Real Measurements Only!)
            ========================================================== */}
        {activeModule === 'evaluation' && (
          <section aria-label="AI Evaluation Module" style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ec4899', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.3rem' }}>
                  EVALUATION CONSOLE // ZERO FABRICATED DATA
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  AI Measurement Framework
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem', margin: 0 }}>
                  Structured evaluation console inspecting: INPUT → MODEL → OUTPUT → VALIDATION → FAILURE CASE. Unmeasured metrics are explicitly labeled.
                </p>
              </div>

              <Link
                href="/engineering/evaluation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#f472b6',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none'
                }}
              >
                <span>Full Evaluation Lab</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Evaluation Console Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {EVAL_DIMENSIONS.map((dim) => {
                const isHovered = hoveredItem === dim.id;
                return (
                  <div
                    key={dim.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(dim.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedEval(dim)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedEval(dim);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(11, 14, 21, 0.85)',
                      border: isHovered ? '1px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '1.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      boxShadow: isHovered ? '0 12px 30px -8px rgba(236, 72, 153, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          color: '#ec4899',
                          backgroundColor: 'rgba(236, 72, 153, 0.12)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '3px',
                          border: '1px solid rgba(236, 72, 153, 0.3)'
                        }}>
                          {dim.num}
                        </span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                          {dim.name}
                        </h3>
                      </div>

                      {/* Measured Benchmark Badge */}
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '3px',
                        fontWeight: 700,
                        backgroundColor: dim.status === 'NOT YET MEASURED' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(16, 185, 129, 0.12)',
                        color: dim.status === 'NOT YET MEASURED' ? 'rgba(255, 255, 255, 0.5)' : '#10b981',
                        border: dim.status === 'NOT YET MEASURED' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        {dim.measuredMetric}
                      </span>
                    </div>

                    {/* Console 5 Sections: INPUT | MODEL | OUTPUT | VALIDATION | FAILURE CASE */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                      
                      {/* INPUT */}
                      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.35rem' }}>
                          [1] INPUT
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                          {dim.input}
                        </p>
                      </div>

                      {/* MODEL */}
                      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#a855f7', fontWeight: 700, marginBottom: '0.35rem' }}>
                          [2] MODEL
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                          {dim.model}
                        </p>
                      </div>

                      {/* OUTPUT */}
                      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10b981', fontWeight: 700, marginBottom: '0.35rem' }}>
                          [3] OUTPUT
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                          {dim.output}
                        </p>
                      </div>

                      {/* VALIDATION */}
                      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>
                          [4] VALIDATION
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                          {dim.validation}
                        </p>
                      </div>

                      {/* FAILURE CASE */}
                      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.35rem' }}>
                          [5] FAILURE CASE
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#fca5a5', lineHeight: 1.5, margin: 0 }}>
                          {dim.failureCase}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            MODULE 3: PATTERNS (Actual Reusable Engineering Patterns)
            ========================================================== */}
        {activeModule === 'patterns' && (
          <section aria-label="Engineering Patterns Module" style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f59e0b', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.3rem' }}>
                  REUSABLE ARCHITECTURE // SYSTEM SCHEMATICS
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Verified Reusable Engineering Patterns
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem', margin: 0 }}>
                  Production patterns extracted from active systems: AI Provider Abstraction, Multi-Tenant RBAC, Hybrid Search, and Testing Architecture.
                </p>
              </div>

              <Link
                href="/engineering/patterns"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#f59e0b',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none'
                }}
              >
                <span>Full Patterns Registry</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Patterns Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {PATTERNS_LIST.map((pat) => {
                const isHovered = hoveredItem === pat.id;
                return (
                  <div
                    key={pat.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(pat.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedPattern(pat)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPattern(pat);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(11, 14, 21, 0.85)',
                      border: isHovered ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '1.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      boxShadow: isHovered ? '0 12px 30px -8px rgba(245, 158, 11, 0.25)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: '#f59e0b',
                          backgroundColor: 'rgba(245, 158, 11, 0.12)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px'
                        }}>
                          {pat.category}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#10b981' }}>
                          VERIFIED IMPLEMENTATION
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                        {pat.name}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {pat.solution}
                      </p>

                      {/* Code Preview Box */}
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '4px',
                        padding: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.73rem',
                        color: '#cbd5e1',
                        overflowX: 'auto',
                        whiteSpace: 'pre',
                        lineHeight: 1.45,
                        marginBottom: '1rem'
                      }}>
                        {pat.codeSnippet}
                      </div>
                    </div>

                    <div style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isHovered ? '#f59e0b' : 'rgba(255, 255, 255, 0.4)'
                    }}>
                      <span>INSPECT FULL ARCHITECTURE &amp; TRADE-OFFS</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            MODULE 4: LEARNINGS (Real Engineering Lessons From Development)
            ========================================================== */}
        {activeModule === 'learnings' && (
          <section aria-label="Engineering Learnings Module" style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.3rem' }}>
                  SYSTEM RETROSPECTIVES // HONEST ENGINEERING
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Real Engineering Lessons
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem', margin: 0 }}>
                  Lessons learned during system development: what was tried, what happened under test, the underlying problem, and how architecture changed.
                </p>
              </div>

              <Link
                href="/engineering/learnings"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none'
                }}
              >
                <span>Full Learnings Log</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Retrospectives List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {LEARNING_STORIES.map((story) => {
                const isHovered = hoveredItem === story.id;
                return (
                  <div
                    key={story.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(story.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedLearning(story)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedLearning(story);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(11, 14, 21, 0.85)',
                      border: isHovered ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '1.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      boxShadow: isHovered ? '0 12px 30px -8px rgba(16, 185, 129, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: '#10b981',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '3px',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                          RETROSPECTIVE {story.number}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          // {story.domain}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: isHovered ? '#10b981' : 'rgba(255, 255, 255, 0.4)' }}>
                        CLICK TO INSPECT FULL LOG →
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
                      {story.title}
                    </h3>

                    {/* Side-by-side What was tried vs What happened */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ backgroundColor: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.35rem' }}>
                          INITIAL APPROACH TRIED
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                          {story.whatWasTried}
                        </p>
                      </div>

                      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.35rem' }}>
                          WHAT BROKE UNDER LOAD / TEST
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#fca5a5', lineHeight: 1.5, margin: 0 }}>
                          {story.whatHappened}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.06)',
                      padding: '0.85rem 1rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#d1fae5'
                    }}>
                      <strong style={{ color: '#10b981' }}>TAKEAWAY: </strong>
                      {story.engineeringTakeaway}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            MODULE 5: WRITING (Technical Notes as Documents)
            Topics: AI, CAD, Backend, Systems, Testing
            ========================================================== */}
        {activeModule === 'writing' && (
          <section aria-label="Technical Writing Module" style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a855f7', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.3rem' }}>
                  LABORATORY DOCUMENTATION // RESEARCH NOTES
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Technical Notes &amp; Documents
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem', margin: 0 }}>
                  Engineering research notes across CAD parsing, AI safety, manufacturing state workflows, and retrieval trade-offs.
                </p>
              </div>

              {/* Topic Filters */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {(['ALL', 'AI', 'CAD', 'BACKEND', 'SYSTEMS', 'TESTING'] as const).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setWritingTopicFilter(topic)}
                    style={{
                      backgroundColor: writingTopicFilter === topic ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: writingTopicFilter === topic ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: writingTopicFilter === topic ? '#d8b4fe' : 'rgba(255, 255, 255, 0.5)',
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Viewer Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {filteredNotes.map((note) => {
                const isHovered = hoveredItem === note.id;
                return (
                  <div
                    key={note.id}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredItem(note.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedNote(note)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedNote(note);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(11, 14, 21, 0.85)',
                      border: isHovered ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '1.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      boxShadow: isHovered ? '0 12px 30px -8px rgba(168, 85, 247, 0.25)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: '#c084fc',
                          backgroundColor: 'rgba(168, 85, 247, 0.12)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px',
                          border: '1px solid rgba(168, 85, 247, 0.25)'
                        }}>
                          TOPIC: {note.topic}
                        </span>

                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          {note.readTime}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                        {note.title}
                      </h3>

                      <p style={{ fontSize: '0.82rem', color: '#a855f7', fontWeight: 600, marginBottom: '0.85rem' }}>
                        {note.subtitle}
                      </p>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.55, margin: 0, marginBottom: '1.25rem' }}>
                        {note.summary}
                      </p>

                      {/* Code or Technical Snippet Preview */}
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '4px',
                        padding: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#cbd5e1',
                        whiteSpace: 'pre',
                        overflowX: 'auto',
                        lineHeight: 1.45
                      }}>
                        {note.codeSnippetPreview}
                      </div>
                    </div>

                    <div style={{
                      marginTop: '1.25rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isHovered ? '#a855f7' : 'rgba(255, 255, 255, 0.4)'
                    }}>
                      <span>READ TECHNICAL DOCUMENT</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      {/* ==========================================================
          DETAIL MODAL: ADR INSPECTION VIEW (CONTEXT, DECISION, RATIONALE, TRADE-OFF, STATUS)
          ========================================================== */}
      {selectedADR && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Architecture Decision Record ${selectedADR.adrId}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedADR(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #60a5fa',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(96, 165, 250, 0.25)',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: 800, fontSize: '0.82rem', backgroundColor: 'rgba(96, 165, 250, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                  {selectedADR.adrId}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>//</span>
                <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem' }}>
                  {selectedADR.category.toUpperCase()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedADR(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '0.35rem' }}
                aria-label="Close ADR specification"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem' }}>
                  {selectedADR.title}
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10b981' }}>
                  STATUS: {selectedADR.status}
                </div>
              </div>

              {/* CONTEXT */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.35rem' }}>
                  CONTEXT
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.65, margin: 0 }}>
                  {selectedADR.context}
                </p>
              </div>

              {/* DECISION */}
              <div style={{ backgroundColor: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.35rem' }}>
                  DECISION
                </div>
                <p style={{ fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.65, margin: 0 }}>
                  {selectedADR.decision}
                </p>
              </div>

              {/* RATIONALE */}
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginBottom: '0.35rem' }}>
                  RATIONALE
                </div>
                <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.65, margin: 0 }}>
                  {selectedADR.rationale}
                </p>
              </div>

              {/* TRADE-OFF */}
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>
                  TRADE-OFF
                </div>
                <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.65, margin: 0 }}>
                  {selectedADR.tradeOff}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Link
                  href="/engineering/decisions"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#60a5fa',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Browse all 14 ADRs in Registry</span>
                  <ArrowRight size={13} />
                </Link>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          DETAIL MODAL: NOTE INSPECTION VIEW
          ========================================================== */}
      {selectedNote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Technical Document: ${selectedNote.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedNote(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #a855f7',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(168, 85, 247, 0.25)',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#c084fc', fontWeight: 800, fontSize: '0.8rem', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                  NOTE // {selectedNote.topic}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                  {selectedNote.readTime}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '0.35rem' }}
                aria-label="Close document modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem', lineHeight: 1.25 }}>
                  {selectedNote.title}
                </h2>
                <div style={{ fontSize: '0.95rem', color: '#c084fc', fontWeight: 600 }}>
                  {selectedNote.subtitle}
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
                  RESEARCH SUMMARY
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.7, margin: 0 }}>
                  {selectedNote.summary}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a855f7', marginBottom: '0.5rem' }}>
                  ALGORITHM IMPLEMENTATION
                </div>
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5, overflowX: 'auto' }}>
                  {selectedNote.codeSnippetPreview}
                </pre>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                {selectedNote.fullLink ? (
                  <Link
                    href={selectedNote.fullLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#d8b4fe',
                      padding: '0.55rem 1rem',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <span>Read Full Published Note</span>
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                    UPCOMING EXTENDED RELEASE
                  </span>
                )}

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          DETAIL MODAL: REUSABLE PATTERN INSPECTION VIEW
          ========================================================== */}
      {selectedPattern && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Engineering Pattern: ${selectedPattern.name}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedPattern(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(245, 158, 11, 0.25)',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.8rem', backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                PATTERN // {selectedPattern.category.toUpperCase()}
              </span>

              <button
                type="button"
                onClick={() => setSelectedPattern(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '0.35rem' }}
                aria-label="Close pattern modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {selectedPattern.name}
              </h2>

              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.35rem' }}>
                  PROBLEM BEING SOLVED
                </div>
                <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.65, margin: 0 }}>
                  {selectedPattern.problem}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>
                  ARCHITECTURE &amp; SOLUTION
                </div>
                <p style={{ fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.65, margin: '0 0 1rem' }}>
                  {selectedPattern.solution}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {selectedPattern.architecturePoints.map((pt, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#f59e0b', marginBottom: '0.3rem' }}>
                    OVERHEAD
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                    {selectedPattern.tradeOffs.overhead}
                  </p>
                </div>

                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#10b981', marginBottom: '0.3rem' }}>
                    ENGINEERING GAIN
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#d1fae5', lineHeight: 1.5, margin: 0 }}>
                    {selectedPattern.tradeOffs.gain}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Link
                  href="/engineering/patterns"
                  style={{ color: '#f59e0b', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>View in Patterns Registry</span>
                  <ArrowRight size={13} />
                </Link>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          DETAIL MODAL: RETROSPECTIVE LEARNING INSPECTION VIEW
          ========================================================== */}
      {selectedLearning && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Retrospective: ${selectedLearning.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedLearning(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #10b981',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(16, 185, 129, 0.25)',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                RETROSPECTIVE {selectedLearning.number} // {selectedLearning.domain.toUpperCase()}
              </span>

              <button
                type="button"
                onClick={() => setSelectedLearning(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '0.35rem' }}
                aria-label="Close retrospective modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {selectedLearning.title}
              </h2>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.35rem' }}>
                  WHAT WAS TRIED
                </div>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                  {selectedLearning.whatWasTried}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.35rem' }}>
                  WHAT HAPPENED (FAILURE MODE UNDER LOAD)
                </div>
                <p style={{ fontSize: '0.92rem', color: '#fca5a5', lineHeight: 1.65, margin: 0 }}>
                  {selectedLearning.whatHappened}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>
                  THE UNDERLYING PROBLEM
                </div>
                <p style={{ fontSize: '0.92rem', color: '#fef08a', lineHeight: 1.65, margin: 0 }}>
                  {selectedLearning.theProblem}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginBottom: '0.35rem' }}>
                  ARCHITECTURAL CHANGE &amp; OUTCOME
                </div>
                <p style={{ fontSize: '0.92rem', color: '#d1fae5', lineHeight: 1.65, margin: 0 }}>
                  {selectedLearning.architecturalChange}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Link
                  href="/engineering/learnings"
                  style={{ color: '#10b981', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>View in Retrospectives Registry</span>
                  <ArrowRight size={13} />
                </Link>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          DETAIL MODAL: AI EVALUATION DIMENSION INSPECTION VIEW
          ========================================================== */}
      {selectedEval && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Evaluation Dimension: ${selectedEval.name}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(3, 5, 8, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setSelectedEval(null)}
        >
          <div
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #ec4899',
              borderRadius: '8px',
              boxShadow: '0 25px 60px -15px rgba(236, 72, 153, 0.25)',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(14, 18, 26, 0.95)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#ec4899', fontWeight: 800, fontSize: '0.8rem', backgroundColor: 'rgba(236, 72, 153, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                {selectedEval.num} // AI EVALUATION TELEMETRY
              </span>

              <button
                type="button"
                onClick={() => setSelectedEval(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '0.35rem' }}
                aria-label="Close eval modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.4rem' }}>
                  {selectedEval.name}
                </h2>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '3px',
                  fontWeight: 700,
                  backgroundColor: selectedEval.status === 'NOT YET MEASURED' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(16, 185, 129, 0.12)',
                  color: selectedEval.status === 'NOT YET MEASURED' ? 'rgba(255, 255, 255, 0.5)' : '#10b981',
                  border: selectedEval.status === 'NOT YET MEASURED' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  BENCHMARK: {selectedEval.measuredMetric}
                </span>
              </div>

              {/* 5 Core Telemetry Sections */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.25rem' }}>
                  [1] INPUT DATASET &amp; PRE-VALIDATION
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {selectedEval.input}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#a855f7', fontWeight: 700, marginBottom: '0.25rem' }}>
                  [2] MODEL &amp; REASONING PIPELINE
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {selectedEval.model}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#10b981', fontWeight: 700, marginBottom: '0.25rem' }}>
                  [3] OUTPUT SPECIFICATION
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {selectedEval.output}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700, marginBottom: '0.25rem' }}>
                  [4] VALIDATION &amp; GATING MECHANISM
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {selectedEval.validation}
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.25rem' }}>
                  [5] FAILURE CASE &amp; MITIGATION
                </div>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5', lineHeight: 1.55, margin: 0 }}>
                  {selectedEval.failureCase}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Link
                  href="/engineering/evaluation"
                  style={{ color: '#ec4899', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>View in Evaluation Lab</span>
                  <ArrowRight size={13} />
                </Link>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
