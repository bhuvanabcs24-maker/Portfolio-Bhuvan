'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, Database, Server, Cpu, Layers, CheckCircle2, ChevronDown } from 'lucide-react';

interface DecisionRecord {
  id: string;
  number: string;
  title: string;
  summary: string;
  category: string;
  primaryCategory: string;
  status: string;
  forgeiqLink: string;
  context: string;
  problem: string;
  optionsConsidered: string[];
  chosenApproach: string;
  why: string;
  tradeOffs: string;
  currentStatus: string;
  reconsider: string;
}

const DECISIONS: DecisionRecord[] = [
  {
    id: 'adr-01',
    number: 'ADR-01',
    title: 'Use PostgreSQL for Core Manufacturing Relational Ledger',
    summary: 'Chose PostgreSQL over document stores (MongoDB) for transactional consistency across orders, quotations, and multi-tenant manufacturing stages.',
    category: 'database architecture',
    primaryCategory: 'Database',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#database-retrieval',
    context: 'ForgeIQ manages enterprise manufacturing workflows spanning industrial buyers, approved manufacturing factories, parts inventory, parametric quotes, and immutable order stage progressions.',
    problem: 'Quotation generation, inventory reservation, and 9-stage order state machines require multi-entity ACID guarantees. If an order transition succeeds but quotation totals or inventory deductions fail, the physical machine-shop floor is exposed to catastrophic double-booking or incorrect machining runs.',
    optionsConsidered: [
      'MongoDB / Document Database: Schemaless flexibility allows nesting arbitrary CAD drawing metadata easily inside order documents.',
      'PostgreSQL Relational DBMS: Strict schema modeling, foreign key integrity, row-level locks, and native support for transactional multi-table updates.',
      'MySQL: Traditional relational alternative with ACID guarantees.'
    ],
    chosenApproach: 'PostgreSQL (hosted on Neon Cloud and Supabase) with JSONB columns for semi-structured CAD feature annotations.',
    why: 'Financial quotations, RFQ bids, and production status updates require multi-table ACID transactions. PostgreSQL provides mature foreign key constraints, composite B-Tree indexes, and the unique ability to mount the pgvector extension within the exact same database boundary.',
    tradeOffs: 'Requires structured schema management and explicit migration scripts (DDL) as requirements evolve, unlike schemaless document stores that allow ad-hoc document modifications.',
    currentStatus: 'Implemented as primary relational storage with 40+ endpoints performing scoped relational queries.',
    reconsider: 'For semi-structured CAD feature lists with hundreds of arbitrary geometric attributes, storing them in PostgreSQL JSONB with GIN indexing proved significantly cleaner than migrating to a separate document database.'
  },
  {
    id: 'adr-02',
    number: 'ADR-02',
    title: 'FastAPI with Multi-Process Pool for Asynchronous Backend & Geometry Math',
    summary: 'Selected FastAPI for native ASGI async I/O while offloading intensive CPU-bound CAD vector math to a secondary ProcessPoolExecutor to protect the event loop.',
    category: 'backend architecture',
    primaryCategory: 'Backend',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#backend-architecture',
    context: 'The backend needs to serve concurrent client traffic, handle multipart DXF/PDF file uploads, validate request payloads, and calculate computationally heavy polygon contours from CAD files.',
    problem: "Python's scientific ecosystem (ezdxf, numpy) is essential for CAD parsing, but running CPU-bound polygon vector math inside standard Python async event loops blocks all incoming HTTP requests under concurrent load.",
    optionsConsidered: [
      'Flask (WSGI): Simple and mature, but lacks native async/await concurrency and requires manual schema serialization libraries.',
      'Django REST Framework: Comprehensive built-in ORM and admin tooling, but heavyweight with unnecessary ORM bloat for a lean microservice API.',
      'Express.js / Node.js: High-speed asynchronous I/O, but severely lacks mature native CAD/DXF vector parsing packages equivalent to Python ezdxf.',
      'FastAPI (ASGI): Native Python async concurrency, automated OpenAPI 3.1 generation, and high-performance Pydantic v2 validation.'
    ],
    chosenApproach: 'FastAPI running on Uvicorn ASGI with a dedicated Python ProcessPoolExecutor worker pool for CPU-bound CAD parsing operations.',
    why: "FastAPI delivers the fastest async request throughput in the Python ecosystem, automatic OpenAPI 3.1 contract generation, and native integration with ezdxf. Offloading CAD parsing to a ProcessPoolExecutor completely bypasses Python's Global Interpreter Lock (GIL), resulting in a verified 5.5x throughput improvement (860 to 4,589 req/s).",
    tradeOffs: 'Inter-process communication (IPC) serialization overhead between FastAPI and worker processes; memory footprint increases slightly with multiple worker processes.',
    currentStatus: 'Implemented and verified across 40+ endpoints and load test benchmarks.',
    reconsider: 'If CAD file complexity expands from 2D DXF profiles to complex multi-megabyte 3D STEP assemblies, consider compiling the geometry extraction engine into a Rust worker binary communicating via gRPC.'
  },
  {
    id: 'adr-03',
    number: 'ADR-03',
    title: 'Next.js App Router Architecture with Strict TypeScript Contracts',
    summary: 'Adopted Next.js App Router with TypeScript to combine server-side layout rendering with rich client-side interactive portals.',
    category: 'architecture backend',
    primaryCategory: 'Architecture',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#system-architecture',
    context: 'ForgeIQ requires a modern web frontend serving both prospective industrial buyers (requiring fast initial loads, SEO, and clear navigation) and authenticated shop-floor operators (requiring live status steppers and CAD viewer canvases).',
    problem: 'Pure client-rendered SPAs (Vite + React) suffer from slow initial time-to-interactive, zero server-side SEO capabilities, and layout shifting during auth state hydration.',
    optionsConsidered: [
      'Client-Only SPA (Vite + React): Lightweight dev server, but leaves landing pages invisible to search engine crawlers and requires extra routing boilerplate.',
      'Next.js App Router (TypeScript + Tailwind CSS): Unified server/client component architecture, built-in layout persistence, and server-side metadata generation.',
      'Traditional Multi-Page SSR (Django/Jinja2 Templates): Server-rendered HTML, but cumbersome for building rich interactive state steppers and client-side DXF canvas viewers.'
    ],
    chosenApproach: "Next.js App Router (TypeScript, Tailwind CSS) with React Server Components for static marketing views and client components ('use client') for interactive portals.",
    why: 'Enables zero-bundle-size server layouts while isolating interactive JavaScript to stateful client components. TypeScript interfaces directly match backend FastAPI Pydantic request/response schemas.',
    tradeOffs: 'Mental overhead managing the server/client boundary; React hydration payload is heavier than zero-JS static HTML.',
    currentStatus: 'Implemented and deployed live on Vercel.',
    reconsider: 'For lightweight static portfolio documentation, vanilla HTML and CSS deliver superior sub-200ms first contentful paint and zero framework fragility.'
  },
  {
    id: 'adr-04',
    number: 'ADR-04',
    title: 'Supabase Authentication with Scoped JWT Claims',
    summary: 'Integrated Supabase Auth to handle secure user sessions, email verification, and JWT claims without maintaining custom cryptography servers.',
    category: 'security backend',
    primaryCategory: 'Security',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#backend-architecture',
    context: 'The platform requires secure authentication separating two primary roles: enterprise buyers and manufacturing factory operators/administrators.',
    problem: 'Hand-rolling authentication (password hashing, salted tokens, email verification flows, session rotation, and CSRF protection) introduces high security vulnerability risks and distracts from core manufacturing domain logic.',
    optionsConsidered: [
      'Custom Auth: Python Passlib + bcrypt and hand-rolled JWT minting in FastAPI.',
      'Auth0 / Okta: Enterprise-grade identity provider, but expensive tier limits and complex custom claim injection.',
      'Supabase Auth: Built on GoTrue, native PostgreSQL integration, developer-friendly client SDKs, and straightforward JWT claim customization.'
    ],
    chosenApproach: "Supabase Auth on the frontend, with FastAPI verifying JWT bearer tokens against Supabase's public cryptographic keys using PyJWT.",
    why: "Provides audited authentication infrastructure (email confirmation, token refresh rotation, password reset flows) while allowing FastAPI to remain completely stateless. Backend dependencies decode role claims (role: 'buyer' or 'manufacturer_admin') directly from the cryptographically signed JWT.",
    tradeOffs: 'Vendor coupling to Supabase Auth API availability; token expiration synchronization between client sessions and FastAPI backend verification requires careful middleware error handling.',
    currentStatus: 'Implemented for user login, signup, and protected API routes.',
    reconsider: 'Wrap the token verification logic in a generic AuthProvider interface so the platform can switch to self-hosted Keycloak or Zitadel for air-gapped on-premise factory installations.'
  },
  {
    id: 'adr-05',
    number: 'ADR-05',
    title: 'Serverless PostgreSQL via Neon with Database Branching',
    summary: 'Employed Neon Serverless PostgreSQL for compute autoscaling, instant staging database branching, and automated storage management.',
    category: 'infrastructure database',
    primaryCategory: 'Infrastructure',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#database-retrieval',
    context: 'Development and staging environments experience bursty, intermittent traffic patterns where maintaining provisioned 24/7 database instances wastes resources.',
    problem: 'Traditional cloud database instances (such as AWS RDS) charge continuous hourly fees for idle compute and make running isolated schema migration test branches costly and tedious.',
    optionsConsidered: [
      'AWS RDS PostgreSQL: Industry benchmark for production databases, but expensive minimum costs for multi-AZ staging clusters.',
      'Self-hosted Docker PostgreSQL on EC2/VPS: Cheap, but requires manual OS patching, backup management, and storage volume provisioning.',
      'Neon Serverless PostgreSQL: Compute scales to zero when inactive; instant copy-on-write database branching allows isolated CI/CD schema testing.'
    ],
    chosenApproach: 'Neon Serverless PostgreSQL connected via connection pooling (pgbouncer).',
    why: 'Eliminates idle compute costs during development and prototype stages. Instant database branching allows running automated Playwright test suites against an exact copy of the schema without polluting staging data.',
    tradeOffs: 'Cold-start latency (1–2 seconds) when resuming compute from zero sleep if connection pooling or keep-alive pings are not configured.',
    currentStatus: 'Implemented as the primary cloud database backend.',
    reconsider: 'For high-throughput continuous load test runs, temporarily set minimum compute units above zero to prevent cold-start latency spikes.'
  },
  {
    id: 'adr-06',
    number: 'ADR-06',
    title: 'Unified Vector Embeddings via PostgreSQL pgvector',
    summary: 'Adopted pgvector inside PostgreSQL to co-locate vector similarity matching with relational business entities in a single ACID boundary.',
    category: 'database ai',
    primaryCategory: 'Database',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#database-retrieval',
    context: 'Matching buyer RFQ manufacturing requirements against factory equipment profiles requires high-dimensional vector similarity search.',
    problem: 'Introducing an external dedicated vector database (Pinecone, Qdrant) requires building custom dual-write pipelines, managing distributed transaction failures, and paying for multiple managed database services.',
    optionsConsidered: [
      'Pinecone / Qdrant (Standalone Vector DB): Specialized in-memory vector index performance, but creates distributed sync complexity and separate billing.',
      'PostgreSQL with pgvector extension: High-dimensional vector indexing (HNSW / IVFFlat) directly inside PostgreSQL relational tables.',
      'In-memory Faiss on FastAPI Worker: Fast search, but non-persistent, loses state on process restarts, and cannot be joined with SQL queries.'
    ],
    chosenApproach: 'PostgreSQL with the pgvector extension using HNSW cosine distance indexing (<=>).',
    why: 'Allows querying vector similarity and relational filters in a single atomic SQL statement (e.g., matching capability vectors while filtering WHERE factory.active = true AND factory.min_bed_x >= 1500). Guarantees zero data drift between vector embeddings and relational records.',
    tradeOffs: 'HNSW index building uses significant PostgreSQL shared memory buffer; at massive hundred-million-scale vectors, specialized distributed vector DBs offer higher index ingestion throughput.',
    currentStatus: 'Implemented and powering RFQ-to-manufacturer matching.',
    reconsider: 'At enterprise catalog scale (<100,000 factory machinery profiles), pgvector is optimal. If ForgeIQ later indexes millions of individual CAD component geometry vectors, partition embeddings across dedicated tables or evaluate Qdrant clusters.'
  },
  {
    id: 'adr-07',
    number: 'ADR-07',
    title: 'Semantic Vector Retrieval for Equipment & Process Matching',
    summary: 'Implemented 1536-dimensional semantic vector embeddings to match natural language buyer specifications to manufacturing capabilities.',
    category: 'ai database',
    primaryCategory: 'AI',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#ai-architecture',
    context: "Buyers frequently describe manufacturing needs using varying industrial jargon (e.g., 'precision sheet metal enclosure with tight bend radius' vs 'CNC brake forming').",
    problem: 'Exact keyword search fails when buyers and factory equipment catalogs use synonymous but non-identical terminology, causing capable factories to be omitted from RFQ distribution.',
    optionsConsidered: [
      'Pure Keyword SQL Match: Strict string equality; fails on synonyms and descriptive specifications.',
      'Semantic Vector Retrieval: Embedding buyer text and factory descriptions into 1536-dimensional vector space.',
      'Rule-Based Keyword Taxonomy: Manually curated synonym dictionaries; rigid and labor-intensive to maintain across hundreds of machine tools.'
    ],
    chosenApproach: 'Semantic vector similarity queries using cosine distance (<=>) over precomputed capability embeddings.',
    why: 'Discovers functional capability matches based on semantic context rather than brittle keyword overlap, significantly improving supplier discovery rates.',
    tradeOffs: "Vector models have no concept of physical dimension thresholds and occasionally score incompatible materials as 'close' (e.g., treating SS304 and SS316L as interchangeable based on text semantics).",
    currentStatus: 'Implemented; always paired with deterministic physical constraint pre-filters.',
    reconsider: 'Never use pure semantic retrieval in isolation for physical manufacturing; always filter first by physical machine bed size, laser wattage, and alloy grade before applying semantic ranking.'
  },
  {
    id: 'adr-08',
    number: 'ADR-08',
    title: 'Hybrid Keyword Retrieval via PostgreSQL Full-Text Search',
    summary: 'Combined PostgreSQL tsvector full-text search with vector similarity to guarantee exact metallurgical alloy and tolerance code filtering.',
    category: 'database ai',
    primaryCategory: 'Database',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#database-retrieval',
    context: 'Manufacturing procurement requires non-negotiable compliance with exact material codes (e.g., AISI-316L, AL6061-T6, DIN EN 10025-2).',
    problem: 'Semantic embeddings fail on alphanumeric part designations where a single character change represents a totally different metallurgy with distinct corrosion resistance and price.',
    optionsConsidered: [
      'Semantic Vector Search Alone: High risk of hallucinated equivalence between distinct alloy codes.',
      'Dedicated Elasticsearch / OpenSearch Cluster: Mature BM25 search, but introduces heavy Java-based infrastructure overhead.',
      'PostgreSQL tsvector / tsquery: Built-in GIN-indexed full-text search directly inside PostgreSQL.'
    ],
    chosenApproach: 'PostgreSQL tsvector full-text search executing exact lexeme matching for alloy codes, combined with pgvector cosine similarity ranking.',
    why: 'Delivers the precision of boolean keyword search for metallurgical codes without spinning up an external Elasticsearch cluster. Zero external synchronization overhead.',
    tradeOffs: 'Requires maintaining GIN indexes and building SQL trigger functions to regenerate tsvector columns on material catalog updates.',
    currentStatus: 'Implemented for alloy validation and standard part lookup.',
    reconsider: 'Implement Reciprocal Rank Fusion (RRF) directly in PostgreSQL to combine BM25 text rank and vector cosine distance with formal mathematical weighting.'
  },
  {
    id: 'adr-09',
    number: 'ADR-09',
    title: 'Pluggable AI Provider Abstraction Interface (Factory Pattern)',
    summary: 'Engineered an abstract BaseAIProvider with Mock, Gemini, and OpenAI implementations to decouple application code from proprietary LLM SDKs.',
    category: 'ai architecture',
    primaryCategory: 'AI',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#ai-architecture',
    context: 'The platform utilizes Large Language Models for parsing unstructured buyer notes, title block extraction, and drafting RFQ summaries.',
    problem: 'Hardcoding Google Gemini or OpenAI SDK calls directly into FastAPI route handlers introduces vendor lock-in, causes automated CI test flakiness due to cloud rate limits, and burns API tokens on repetitive unit tests.',
    optionsConsidered: [
      'Direct SDK Integration: Quick to implement, but binds the entire codebase to a single vendor API syntax.',
      'Heavy LLM Frameworks (LangChain / LlamaIndex): Provides multi-provider switching, but adds massive dependency bloat, frequent breaking releases, and debugging opacity.',
      'Custom BaseAIProvider Interface: Lightweight abstract class defining strict parse_requirements() and generate_summary() contracts.'
    ],
    chosenApproach: 'Custom BaseAIProvider interface with MockAIProvider (for offline testing), GeminiProvider (production cloud), and OpenAIProvider (alternative).',
    why: 'Allows 33 Pytest unit tests and 14 Playwright tests to execute offline in seconds with zero API costs using MockAIProvider. Production environments switch between Gemini and OpenAI via a single environment variable with zero code modifications.',
    tradeOffs: 'Requires maintaining internal response mapping classes whenever a provider changes its upstream JSON payload structure.',
    currentStatus: 'Implemented and tested across 47 automated tests.',
    reconsider: 'Adopt Pydantic-based structured generation libraries (e.g. Instructor) within the provider implementations to automate schema retry logic on malformed responses.'
  },
  {
    id: 'adr-10',
    number: 'ADR-10',
    title: 'Playwright for End-to-End Browser Workflow Verification',
    summary: 'Selected Playwright for comprehensive multi-context browser testing across buyer quote submissions, shop-floor status updates, and file uploads.',
    category: 'testing',
    primaryCategory: 'Testing',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#testing-reliability',
    context: 'Manufacturing workflows involve multi-step asynchronous interactions: buyer signs in, uploads a DXF CAD file, waits for parametric quote calculation, and watches status updates in the customer portal.',
    problem: 'Pure backend API unit tests cannot detect client-side state bugs, broken file drag-and-drop handlers, or synchronization failures across disparate user roles.',
    optionsConsidered: [
      'Cypress: Popular frontend testing tool, but traditionally struggled with multi-tab or multi-user context testing across buyer and manufacturer personas.',
      'Selenium WebDriver: Mature and reliable, but requires explicit wait configurations and exhibits higher test run flakiness.',
      'Playwright: Native auto-waiting, fast headless Chromium execution, and first-class support for isolated browser contexts in a single test run.'
    ],
    chosenApproach: 'Playwright test suite (14 E2E tests) testing full user flows from multi-part upload to quote generation and stage progression.',
    why: 'Built-in smart auto-waiting eliminates arbitrary sleep timers. Multi-context isolation allows testing a buyer submitting an RFQ in one browser session and a manufacturer updating order status in a concurrent session.',
    tradeOffs: 'Requires spinning up both frontend and backend testing servers in CI, resulting in longer pipeline runtimes than headless unit tests.',
    currentStatus: '14 automated Playwright tests passing in CI/CD pipeline.',
    reconsider: 'Add visual regression snapshot testing for CAD preview canvas renders to catch minor vector rendering regressions across browser engines.'
  },
  {
    id: 'adr-11',
    number: 'ADR-11',
    title: 'Strict REST API Design with OpenAPI 3.1 & Pydantic v2 Contracts',
    summary: 'Standardized 40+ endpoints on REST with Pydantic v2 schemas to enforce bidirectional type safety between Python and TypeScript clients.',
    category: 'backend architecture',
    primaryCategory: 'Backend',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#backend-architecture',
    context: 'The platform exposes 40+ modular endpoints covering authentication, RFQ submission, CAD parsing, quotation calculation, order lifecycle, and inventory management.',
    problem: 'Dynamic or loosely typed API interfaces result in subtle runtime bugs where client assumptions about field names, nullability, or number precision clash with backend models.',
    optionsConsidered: [
      'GraphQL: Flexible client querying, but complex caching, lack of standard multipart file upload ergonomics, and unnecessary resolver overhead.',
      'gRPC / Protocol Buffers: High performance, but poor web browser ergonomics requiring complex gRPC-Web proxy layers.',
      'REST with FastAPI + Pydantic v2: Standard HTTP verbs, strict schema validation compiled in Rust, and automated OpenAPI 3.1 JSON export.'
    ],
    chosenApproach: 'REST with FastAPI routers organized by domain module, validated by strict Pydantic v2 schemas.',
    why: 'Standard HTTP semantics match browser file uploads and third-party webhook contracts (Razorpay, WhatsApp). Interactive Swagger documentation (/docs) provides instant manual testing, while Pydantic v2 provides microsecond-level request parsing.',
    tradeOffs: 'REST endpoints can result in multiple roundtrips for deeply nested composite data, which we resolved by building dedicated Common Table Expression (CTE) aggregation endpoints.',
    currentStatus: 'Implemented across 40+ endpoints.',
    reconsider: 'For real-time shop-floor laser cutting telemetry, augment REST with Server-Sent Events (SSE) to push instant machine cycle progress.'
  },
  {
    id: 'adr-12',
    number: 'ADR-12',
    title: 'Role-Based Access Control (RBAC) & Scoped Multi-Tenant Isolation',
    summary: 'Enforced tenant isolation and RBAC via JWT claims and declarative FastAPI dependency injection to prevent cross-tenant data leakage.',
    category: 'security backend',
    primaryCategory: 'Security',
    status: 'Implemented & Active',
    forgeiqLink: '/projects/forgeiq#backend-architecture',
    context: 'Competing manufacturing factories and enterprise buyers operate on the same shared application infrastructure.',
    problem: "A manufacturer must never access a competitor's confidential pricing bids, machine utilization rates, or another buyer's proprietary CAD drawings.",
    optionsConsidered: [
      'Physical Database per Tenant: Maximum isolation, but prohibitive maintenance overhead and high cost on serverless infrastructure.',
      'Schema per Tenant: PostgreSQL schemas per organization; complex migration tooling and connection pool limits.',
      'Shared Database with Mandatory Tenant ID Scoping: Enforced tenant_id foreign keys across all tables, validated on every query via JWT claims.'
    ],
    chosenApproach: 'Shared database with tenant ID scoping verified in FastAPI middleware and declarative dependencies (Depends(get_current_tenant)).',
    why: 'Highly cost-effective on Neon serverless PostgreSQL with central connection pooling. Declarative FastAPI dependencies reject unauthorized tenant requests before executing SQL queries.',
    tradeOffs: 'Requires engineering rigor to ensure every query contains WHERE tenant_id = :tenant_id; a missing WHERE clause could cause security exposure.',
    currentStatus: 'Implemented across all protected endpoints with distinct buyer and manufacturer roles.',
    reconsider: 'Add PostgreSQL Row-Level Security (RLS) policies as a second defense-in-depth layer directly inside the database engine to catch potential application bugs.'
  },
  {
    id: 'adr-13',
    number: 'ADR-13',
    title: 'Payment Abstraction via Cryptographically Signed Webhooks (Razorpay)',
    summary: 'Structured payment checkout around asynchronous, cryptographically verified Razorpay webhooks to guarantee idempotent order confirmation.',
    category: 'backend infrastructure',
    primaryCategory: 'Backend',
    status: 'Implemented & Staged',
    forgeiqLink: '/projects/forgeiq#solution',
    context: 'Industrial manufacturing orders involve significant capital commitments requiring secure online payment verification.',
    problem: "Relying on client-side redirect callbacks for payment verification is vulnerable to network disconnects and browser closing, leading to paid orders remaining in 'Pending' status.",
    optionsConsidered: [
      'Client-Side Redirect Confirmation: Fragile; fails if buyer closes browser tab before callback finishes.',
      'Asynchronous Server-to-Server Webhooks: Gateway notifies backend directly with cryptographically signed payload.',
      'Polling Gateway APIs: High server resource consumption and latency.'
    ],
    chosenApproach: 'Server-to-server Razorpay webhooks verified via HMAC-SHA256 signature verification (razorpay_signature).',
    why: "Ensures payment confirmation cannot be spoofed. An idempotent transaction ledger checks payment_id before updating order status to 'Order Confirmed', preventing duplicate order fulfillment.",
    tradeOffs: 'Local webhook testing requires tunneling tools (e.g. ngrok); webhook delivery latency requires frontend polling or optimistic UI updates while waiting for confirmation.',
    currentStatus: 'Implemented in staging checkout workflow; full automated invoice reconciliation planned.',
    reconsider: 'Create a unified PaymentGatewayProvider interface so international buyers can pay via Stripe while domestic buyers pay via Razorpay.'
  },
  {
    id: 'adr-14',
    number: 'ADR-14',
    title: 'Messaging Abstraction for Shop-Floor Alerts (WhatsApp Cloud API)',
    summary: 'Designed mobile milestone notification architecture using WhatsApp Cloud API templates to reach factory operators directly on shop floors.',
    category: 'backend infrastructure',
    primaryCategory: 'Backend',
    status: 'Staged / Concept',
    forgeiqLink: '/projects/forgeiq#solution',
    context: 'Indian machine-shop supervisors and machine operators work in noisy physical environments and rarely inspect desktop email during active shifts.',
    problem: "Email milestone alerts ('DXF Ready for Laser', 'Quality Inspection Passed') suffer from high latency and low open rates among factory shop-floor workers.",
    optionsConsidered: [
      'Email Alerts (SMTP / SES): Standard, but ignored during active shop-floor shifts.',
      'SMS Notifications (Twilio): Good deliverability, but text-only with zero rich formatting or interactive buttons.',
      'WhatsApp Cloud API: Pre-approved interactive templates with 90%+ immediate open rates and one-tap approval buttons.'
    ],
    chosenApproach: 'WhatsApp Cloud API template message generator with staged webhook handlers for incoming button responses.',
    why: 'Allows factory supervisors to approve quotation estimates and view job dispatch tracking directly on mobile devices without logging into the desktop portal.',
    tradeOffs: 'Requires Meta Business verification and pre-approval of template messages; per-conversation messaging costs.',
    currentStatus: 'Message payload generator staged; background message queue worker planned.',
    reconsider: 'Decouple WhatsApp message dispatching into an asynchronous background task queue (Celery + Redis) to avoid slowing down database state transitions.'
  }
];

const CATEGORIES = [
  { label: 'All Decisions (14)', value: 'all' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'AI', value: 'ai' },
  { label: 'Database', value: 'database' },
  { label: 'Backend', value: 'backend' },
  { label: 'Testing', value: 'testing' },
  { label: 'Security', value: 'security' },
  { label: 'Infrastructure', value: 'infrastructure' },
];

export default function EngineeringDecisionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDecisions = DECISIONS.filter((d) => {
    if (selectedCategory === 'all') return true;
    return d.category.split(' ').includes(selectedCategory);
  });

  return (
    <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
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
          <Link href="/projects/forgeiq" style={{ fontSize: '0.85rem', color: '#60a5fa' }}>
            View ForgeIQ Case Study ↗
          </Link>
        </div>

        {/* Editorial Masthead */}
        <header style={{ marginBottom: '3rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
            Architectural Decision Records (ADRs)
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            Engineering Decisions &amp; Architectural Trade-Offs
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.5rem' }}>
            A rigorous, transparent log of real architectural choices across ForgeIQ and my systems. Every entry documents the exact problem constraint, alternatives evaluated, technical justification, accepted trade-offs, and what I would reconsider at greater scale.
          </p>
          <div style={{
            background: 'rgba(14, 21, 37, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <div><strong>Guiding Rule:</strong> Zero fake authority; decisions reflect genuine engineering constraints.</div>
            <div><strong>Primary System:</strong> ForgeIQ (Manufacturing Intelligence &amp; CAD Automation)</div>
          </div>
        </header>

        {/* Category Filter Bar */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Filter by Engineering Domain:
          </div>
          <div className="adr-filter-bar" role="toolbar" aria-label="Filter decisions by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`adr-filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Records List */}
        <div className="adr-list">
          {filteredDecisions.map((d) => (
            <article key={d.id} className="adr-card" id={d.id}>
              <div className="adr-header">
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', marginRight: '0.5rem' }}>
                    {d.number}
                  </span>
                  <h2 className="adr-title" style={{ display: 'inline' }}>{d.title}</h2>
                </div>
                <div className="adr-meta">
                  <span className="badge badge-blue">{d.primaryCategory}</span>
                  <span className="badge badge-emerald">{d.status}</span>
                </div>
              </div>

              <p className="adr-summary">{d.summary}</p>

              <details className="adr-disclosure" open>
                <summary>
                  <span>Architectural Specifications &amp; Trade-Offs</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>[ Click to Toggle ]</span>
                </summary>

                <div className="adr-details-body">
                  <div className="adr-spec-block">
                    <div className="adr-spec-label">Context:</div>
                    <div className="adr-spec-content"><p>{d.context}</p></div>
                  </div>

                  <div className="adr-spec-block">
                    <div className="adr-spec-label">Problem:</div>
                    <div className="adr-spec-content"><p>{d.problem}</p></div>
                  </div>

                  <div className="adr-spec-block">
                    <div className="adr-spec-label">Options Considered:</div>
                    <div className="adr-spec-content">
                      <ul>
                        {d.optionsConsidered.map((opt, i) => (
                          <li key={i}>{opt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="adr-spec-block" style={{ borderLeft: '3px solid #3b82f6' }}>
                    <div className="adr-spec-label" style={{ color: '#93c5fd' }}>Chosen Approach:</div>
                    <div className="adr-spec-content"><p><strong>{d.chosenApproach}</strong></p></div>
                  </div>

                  <div className="adr-spec-block">
                    <div className="adr-spec-label">Why:</div>
                    <div className="adr-spec-content"><p>{d.why}</p></div>
                  </div>

                  <div className="adr-spec-block" style={{ borderLeft: '3px solid #f59e0b' }}>
                    <div className="adr-spec-label" style={{ color: '#fcd34d' }}>Trade-Offs Accepted:</div>
                    <div className="adr-spec-content"><p>{d.tradeOffs}</p></div>
                  </div>

                  <div className="adr-spec-block">
                    <div className="adr-spec-label">Current Implementation Status:</div>
                    <div className="adr-spec-content"><p>{d.currentStatus}</p></div>
                  </div>

                  <div className="adr-spec-block" style={{ borderLeft: '3px solid #a855f7' }}>
                    <div className="adr-spec-label" style={{ color: '#d8b4fe' }}>What I Would Reconsider at Scale:</div>
                    <div className="adr-spec-content"><p>{d.reconsider}</p></div>
                  </div>

                  <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href={d.forgeiqLink} className="adr-footer-link">
                      <span>Open Related ForgeIQ Architecture Section</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="card-elevated" style={{
          marginTop: '4rem',
          padding: '2.25rem',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          background: 'linear-gradient(135deg, rgba(14, 22, 41, 0.95), rgba(15, 23, 42, 0.85))',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Inspect the Live Codebase</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '580px', lineHeight: 1.6 }}>
                Review how these decisions are implemented across 40+ FastAPI routers, ezdxf geometry parsing pipelines, Pydantic schemas, and Playwright suites in ForgeIQ.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhuvanabcs24-maker/Forge-IQ" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>View ForgeIQ on GitHub ↗</span>
              </a>
              <Link href="/projects/forgeiq" className="btn btn-secondary">
                <span>Read Flagship Case Study</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
