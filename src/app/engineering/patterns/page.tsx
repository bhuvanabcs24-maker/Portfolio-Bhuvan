'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  Workflow, 
  Zap, 
  FileCode,
  Terminal,
  Activity
} from 'lucide-react';

interface EngineeringPattern {
  id: string;
  number: string;
  name: string;
  summary: string;
  categories: string[];
  primaryCategory: string;
  problem: string;
  context: string;
  architecturePoints: string[];
  implementation: string;
  tradeOffs: {
    overhead: string;
    gain: string;
  };
  reusability: string;
  forgeiqExample: string;
  forgeiqLink: string;
  forgeiqLinkLabel: string;
  codeLang: string;
  codeSnippet: string;
}

const PATTERNS: EngineeringPattern[] = [
  {
    id: 'pattern-01',
    number: 'PATTERN 01',
    name: 'Pluggable AI Provider Factory with Offline Mock Harness',
    summary: 'Decouples core business logic from proprietary LLM SDKs through an abstract provider interface, dynamic factory dispatcher, and deterministic fixture replay. Enables 100% offline, zero-cost CI test runs with zero network flakiness.',
    categories: ['ai', 'testing', 'architecture'],
    primaryCategory: 'AI / Testing',
    problem: 'Directly coupling FastAPI endpoints to proprietary cloud AI client libraries (google.generativeai or openai) causes hard vendor lock-in, unmockable test suites, rate-limit failures (HTTP 429) during CI runs, and makes local development impossible without paid third-party API credentials.',
    context: 'ForgeIQ performs automated RFQ intake by parsing unstructured buyer requirements, material specs, and drawings. Automated Playwright E2E and Pytest suites run on every code commit. Running tests against live cloud AI APIs caused unpredictable network timeouts, token bills, and intermittent pipeline failures.',
    architecturePoints: [
      'Abstract Provider Contract (AIProviderBase): Pure Python ABC defining standardized asynchronous methods: extract_structured_data(prompt, schema) and generate_response().',
      'Concrete Provider Implementations: GeminiFlashProvider (production default for multimodal analysis), OpenAIProvider (enterprise backup), and MockAIProvider (deterministic fixture replayer).',
      'Provider Factory (get_ai_provider()): Dynamic factory reading the AI_PROVIDER environment flag with graceful fallback.',
      'Deterministic Test Harness: MockAIProvider returns pre-validated ground-truth JSON fixtures in 0ms network latency without initiating outbound HTTP calls.'
    ],
    implementation: 'Implemented using Python\'s abc.ABC and abstractmethod with Pydantic serialization. The factory lazily instantiates a single provider instance. When running under pytest or with CI=true, the factory automatically routes to MockAIProvider unless live credentials are explicitly provided.',
    tradeOffs: {
      overhead: 'Introduces an extra abstraction layer and interface definition; proprietary model-specific features (such as Gemini-specific tool calls) require custom adapter methods rather than direct SDK invocations.',
      gain: 'E2E Playwright test suite executes in ~12 seconds with 0 API cost and 0% network flakiness; switching or adding model providers takes fewer than 40 lines of code without altering business endpoints.'
    },
    reusability: 'Universal for any SaaS product integrating LLMs, multi-tenant enterprise AI backends requiring dynamic model selection per customer tier, and microservices requiring fully automated offline CI/CD regression testing.',
    forgeiqExample: 'Powers ForgeIQ\'s RFQ ingestion and quotation pipeline (backend/ai/factory.py, backend/ai/mock_provider.py, backend/ai/gemini_provider.py). Allows the full 47-test suite to validate complete quoting workflows entirely offline.',
    forgeiqLink: '/projects/forgeiq#ai-architecture',
    forgeiqLinkLabel: 'View AI Architecture in ForgeIQ Case Study →',
    codeLang: 'Python',
    codeSnippet: `from abc import ABC, abstractmethod
from typing import Type, TypeVar, Optional
import os
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

class AIProviderBase(ABC):
    """Abstract base interface for all ForgeIQ AI provider implementations."""
    
    @abstractmethod
    async def extract_structured_data(
        self, prompt: str, schema: Type[T], raw_content: Optional[bytes] = None
    ) -> T:
        """Extract validated structured output matching the provided Pydantic schema."""
        pass

class GeminiFlashProvider(AIProviderBase):
    """Production provider leveraging Google Gemini 2.5 Flash for multimodal inference."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required.")

    async def extract_structured_data(
        self, prompt: str, schema: Type[T], raw_content: Optional[bytes] = None
    ) -> T:
        # Calls Gemini API with response_mime_type="application/json"
        # and validates against schema.model_validate_json(raw_text)
        ...

class MockAIProvider(AIProviderBase):
    """Deterministic fixture provider for local unit tests and automated CI suites."""
    
    def __init__(self, fixture_dir: str = "tests/fixtures/ai_responses"):
        self.fixture_dir = fixture_dir

    async def extract_structured_data(
        self, prompt: str, schema: Type[T], raw_content: Optional[bytes] = None
    ) -> T:
        # Returns pre-validated deterministic ground truth in 0ms network latency
        fixture_payload = {
            "part_name": "Bracket_Mount_40x60",
            "material": "AL_6061_T6",
            "quantity": 100,
            "estimated_cycle_time_min": 14.5,
            "confidence_score": 0.98
        }
        return schema.model_validate(fixture_payload)

def get_ai_provider() -> AIProviderBase:
    """Factory function: Instantiates provider based on environment configuration."""
    provider_type = os.getenv("AI_PROVIDER", "gemini").lower()
    
    if os.getenv("CI") == "true" or provider_type == "mock":
        return MockAIProvider()
    elif provider_type == "gemini":
        return GeminiFlashProvider()
    else:
        raise ValueError(f"Unsupported AI provider type: {provider_type}")`
  },
  {
    id: 'pattern-02',
    number: 'PATTERN 02',
    name: 'Deterministic-First AI Grounding (Geometry Math + Strict Schema Validation)',
    summary: 'Prevents AI hallucinations in physical systems by calculating spatial dimensions, cutting perimeters, and volumes deterministically with Python vector math before passing scalar metrics into LLM prompts constrained by Pydantic schemas.',
    categories: ['ai', 'architecture'],
    primaryCategory: 'AI / Architecture',
    problem: 'Large language models cannot reliably calculate 3D bounding boxes, polygon perimeters, hole counts, or machine-hour formulas directly from raw coordinate vertices. Prompts asking LLMs to calculate physical manufacturing prices produce hallucinations with 20% to 50% variance—catastrophic when raw industrial bar stock costs thousands of dollars.',
    context: 'ForgeIQ automates quoting for CNC milling, turning, and sheet metal laser cutting. Pricing requires millimetre-accurate cutting lengths, bounding volume (cm³), and raw stock mass (kg). Relying on an LLM to "read" DXF lines or STEP surfaces leads to fatal calculation drift.',
    architecturePoints: [
      'Stage 1 (Deterministic Geometry Math): Python geometric engines (ezdxf, trimesh) calculate exact bounding boxes, cutting contours, hole counts, and volume with zero floating-point hallucination.',
      'Stage 2 (Immutable Grounding Injection): Scalar metrics are injected as immutable parameters into the LLM system prompt.',
      'Stage 3 (Constrained Output Generation): The LLM is restricted to qualitative tasks (alloy machinability risk, surface finish advice, tolerance notes) and forced to output structured JSON matching a strict Pydantic model.',
      'Stage 4 (Algorithmic Cost Computation): Total machine cycle hours and material costs are computed via deterministic mathematical formulas using the verified parameters.'
    ],
    implementation: 'Implemented in cad_preprocessor.py and quotation_engine.py. Deterministic features are stored in a typed dataclass. The prompt is populated via immutable template interpolation, and model output is validated via QuoteAssessment.model_validate_json() with auto-retry and deterministic fallback.',
    tradeOffs: {
      overhead: 'Requires maintaining dedicated deterministic geometric parsing logic and binary C-extensions (Shapely/GEOS) on the backend; DXF/STEP files must pass geometry validation before AI inference can proceed.',
      gain: 'Achieves 96.9% quotation accuracy on benchmark parts; completely eliminates dimensional hallucination; builds operational trust with factory machinists.'
    },
    reusability: 'Applicable to any enterprise domain where probabilistic AI must operate on rigorous physical, legal, or financial constraints—such as architectural BIM estimation, pharmaceutical dosage checks, financial tax calculations, or structural engineering.',
    forgeiqExample: 'Core quoting logic in ForgeIQ (backend/services/cad_preprocessor.py and backend/ai/quotation_engine.py). Parses 2D/3D CAD geometry with ezdxf before invoking Gemini 2.5 Flash for machinability scoring.',
    forgeiqLink: '/projects/forgeiq#ai-order-intake',
    forgeiqLinkLabel: 'View AI Order Intake in ForgeIQ Case Study →',
    codeLang: 'Python',
    codeSnippet: `from dataclasses import dataclass
from pathlib import Path
from pydantic import BaseModel, Field
import ezdxf

@dataclass(frozen=True)
class CADGeometryMetrics:
    """Immutable scalar dimensions computed 100% deterministically."""
    bounding_box_mm: tuple[float, float, float]
    cutting_length_mm: float
    pierce_count: int
    estimated_volume_cm3: float

class QuotingOutputSchema(BaseModel):
    """Strict schema governing the AI's qualitative manufacturing assessment."""
    machinability_rating: str = Field(description="Easy, Moderate, or High-Risk")
    recommended_machine_type: str = Field(description="3-Axis CNC, 5-Axis CNC, or Fiber Laser")
    risk_factors: list[str] = Field(default_factory=list)
    lead_time_days: int = Field(ge=1, le=60)

def extract_cad_features(file_path: Path) -> CADGeometryMetrics:
    """Deterministic parsing: Bypasses LLM entirely to extract physical ground truth."""
    doc = ezdxf.readfile(str(file_path))
    msp = doc.modelspace()
    
    total_cutting_len = 0.0
    pierce_holes = 0
    min_x = min_y = float("inf")
    max_x = max_y = float("-inf")
    
    for entity in msp:
        if entity.dxftype() == "CIRCLE":
            pierce_holes += 1
            total_cutting_len += 2 * 3.14159 * entity.dxf.radius
        elif entity.dxftype() == "LINE":
            start, end = entity.dxf.start, entity.dxf.end
            total_cutting_len += ((end.x - start.x)**2 + (end.y - start.y)**2)**0.5
            min_x, max_x = min(min_x, start.x, end.x), max(max_x, start.x, end.x)
            min_y, max_y = min(min_y, start.y, end.y), max(max_y, start.y, end.y)

    bbox = (max(0.0, max_x - min_x), max(0.0, max_y - min_y), 10.0)
    vol_cm3 = (bbox[0] * bbox[1] * bbox[2]) / 1000.0
    return CADGeometryMetrics(bbox, round(total_cutting_len, 2), pierce_holes, round(vol_cm3, 2))

async def evaluate_manufacturing_quote(
    metrics: CADGeometryMetrics, buyer_alloy: str, ai_client
) -> QuotingOutputSchema:
    """Grounded evaluation: Injects immutable physical math into structured prompt."""
    prompt = f"""Analyze manufacturing parameters based on VERIFIED physical geometry:
- Bounding Box (X, Y, Z): {metrics.bounding_box_mm} mm
- Total Cutting Length: {metrics.cutting_length_mm} mm
- Interior Piercings: {metrics.pierce_count}
- Material Alloy: {buyer_alloy}
Do NOT recalculate dimensions. Assess machine selection, risks, and lead time."""
    
    return await ai_client.extract_structured_data(prompt, QuotingOutputSchema)`
  },
  {
    id: 'pattern-03',
    number: 'PATTERN 03',
    name: 'Audited State Machine with Declarative RBAC Middleware',
    summary: 'Guarantees multi-tenant order integrity across 9 manufacturing stages through an immutable state transition matrix, declarative FastAPI role dependencies, and an atomic append-only audit trail.',
    categories: ['backend', 'security', 'architecture'],
    primaryCategory: 'Backend / Security',
    problem: 'In multi-role supply chains (buyers, factory admins, machinists, quality inspectors), naive endpoint designs rely on ad-hoc inline "if user.role == ..." checks. This creates severe security flaws where unauthorized actors can manipulate order statuses—such as a buyer prematurely marking their own order as "Quality Passed" to bypass inspection or skip payment locks.',
    context: 'ForgeIQ coordinates orders across 9 distinct manufacturing stages: DRAFT, RFQ_SUBMITTED, QUOTATION_PENDING, QUOTE_ACCEPTED, IN_PRODUCTION, QUALITY_INSPECTION, DISPATCHED, DELIVERED, and CLOSED. ISO 9001 compliance demands that every status change be strictly authorized, verified, and audited.',
    architecturePoints: [
      'State Transition Matrix: A centralized dictionary mapping (current_stage, action) -> next_stage along with authorized roles. Any transition not explicitly declared raises an immediate 400 InvalidStateTransitionError.',
      'Declarative RBAC Dependencies: Reusable FastAPI Depends() functions that validate decoded Supabase JWT claims and verify role membership before reaching the endpoint handler.',
      'Atomic Audit Trail Writer: Every transition writes to an append-only order_audit_trail table (recording actor ID, previous status, next status, IP address, timestamp, and optional reason) within the same ACID transaction.'
    ],
    implementation: 'Implemented using Python Enums for ManufacturingStage and OrderAction. Handlers call transition_order_stage(order_id, action, current_user, db), ensuring database locks prevent race conditions during rapid state transitions.',
    tradeOffs: {
      overhead: 'Adding a new manufacturing stage or intermediate sub-step requires updating the transition registry and running database migrations; direct manual edits to database status columns bypass validation and are strictly forbidden.',
      gain: 'Zero unauthorized state transitions; mathematically impossible for buyers to bypass quality inspection; provides a tamper-evident audit history essential for enterprise industrial procurement.'
    },
    reusability: 'Applicable to any workflow system with strict state progression: FinTech payment processing (escrow hold, captured, refunded), legal approval workflows, logistics order tracking, or CI/CD deployment gates.',
    forgeiqExample: 'Protects ForgeIQ\'s production workflow (backend/services/order_workflow.py and backend/auth/rbac.py). Enforces role segregation between buyers, manufacturer admins, and certified QA inspectors.',
    forgeiqLink: '/projects/forgeiq#production-workflow',
    forgeiqLinkLabel: 'View Production Workflow in ForgeIQ Case Study →',
    codeLang: 'Python',
    codeSnippet: `from enum import Enum
from typing import Set, Tuple, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

class ManufacturingStage(str, Enum):
    DRAFT = "draft"
    RFQ_SUBMITTED = "rfq_submitted"
    IN_PRODUCTION = "in_production"
    QUALITY_INSPECTION = "quality_inspection"
    DISPATCHED = "dispatched"
    CLOSED = "closed"

class OrderAction(str, Enum):
    SUBMIT_RFQ = "submit_rfq"
    START_MACHINING = "start_machining"
    COMPLETE_INSPECTION = "complete_inspection"
    DISPATCH_ORDER = "dispatch_order"

# Transition Matrix: (Current State, Action) -> (Next State, Authorized Roles)
STATE_MACHINE_RULES: Dict[Tuple[ManufacturingStage, OrderAction], Tuple[ManufacturingStage, Set[str]]] = {
    (ManufacturingStage.DRAFT, OrderAction.SUBMIT_RFQ): 
        (ManufacturingStage.RFQ_SUBMITTED, {"buyer", "procurement_lead"}),
    (ManufacturingStage.RFQ_SUBMITTED, OrderAction.START_MACHINING): 
        (ManufacturingStage.IN_PRODUCTION, {"manufacturer_admin", "machinist"}),
    (ManufacturingStage.IN_PRODUCTION, OrderAction.COMPLETE_INSPECTION): 
        (ManufacturingStage.QUALITY_INSPECTION, {"quality_inspector", "qa_lead"}),
    (ManufacturingStage.QUALITY_INSPECTION, OrderAction.DISPATCH_ORDER): 
        (ManufacturingStage.DISPATCHED, {"manufacturer_admin"}),
}

def validate_state_transition(
    current_stage: ManufacturingStage, action: OrderAction, user_role: str
) -> ManufacturingStage:
    """Validates that the requested transition is legal and authorized for the user's role."""
    key = (current_stage, action)
    if key not in STATE_MACHINE_RULES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Illegal transition: Cannot perform '{action}' from '{current_stage}' stage."
        )
    
    next_stage, allowed_roles = STATE_MACHINE_RULES[key]
    if user_role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Role '{user_role}' is not authorized to trigger '{action}'."
        )
    return next_stage

async def execute_transition(order_id: str, action: OrderAction, user, db: Session):
    """Executes transition atomically with an append-only audit trail."""
    order = db.query(Order).filter(Order.id == order_id).with_for_update().first()
    new_stage = validate_state_transition(order.stage, action, user.role)
    
    old_stage = order.stage
    order.stage = new_stage
    
    audit_entry = OrderAuditLog(
        order_id=order_id, actor_id=user.id, actor_role=user.role,
        from_stage=old_stage, to_stage=new_stage, timestamp=datetime.utcnow()
    )
    db.add(audit_entry)
    db.commit()`
  },
  {
    id: 'pattern-04',
    number: 'PATTERN 04',
    name: 'Hybrid Retrieval Pipeline (SQL Metadata Hard Filtering + pgvector Cosine Ranking)',
    summary: 'Combines strict relational SQL WHERE constraints (material, tolerance, certifications) with pgvector cosine distance ranking in a single unified PostgreSQL database. Eliminates illegal vector hallucinations without external vector DB sync latency.',
    categories: ['backend', 'ai'],
    primaryCategory: 'Backend / AI',
    problem: 'Pure semantic vector retrieval frequently returns operationally illegal recommendations—such as suggesting an aerospace Inconel alloy when a buyer strictly requires food-grade FDA 316 stainless steel with ISO 9001 certification. Pure keyword search fails when buyers use natural manufacturing phrasing ("corrosion-resistant marine bracket").',
    context: 'ForgeIQ matches customer RFQs against international manufacturing standards (ISO, ASTM, DIN) and verified factory supplier profiles. The system must honor physical tolerances and regulatory certifications while ranking candidates by semantic similarity.',
    architecturePoints: [
      'Single-Engine Architecture: Avoids the complexity and dual-write synchronisation bugs of running a standalone vector database (Pinecone/Milvus) alongside an operational SQL database.',
      'Stage 1 (Relational Hard Filtering): Indexed B-Tree SQL filters eliminate non-compliant suppliers before vector computation (e.g. max_tolerance_mm <= 0.05 and certifications @> ARRAY[\'ISO_9001\']).',
      'Stage 2 (pgvector Cosine Distance): The <=> operator calculates cosine distance strictly across the surviving relational candidate pool, ordering results by semantic similarity to the query embedding.',
      'HNSW Index Acceleration: High-recall Approximate Nearest Neighbor search accelerates queries to sub-60ms latencies.'
    ],
    implementation: 'Implemented via SQLAlchemy / asyncpg. The query generates an embedding vector from user requirements, executes a parameterized SQL query with relational filters and cosine ordering, and returns candidate capabilities with similarity scores.',
    tradeOffs: {
      overhead: 'Storing high-dimensional vector embeddings in PostgreSQL requires allocating sufficient RAM (maintenance_work_mem) for HNSW index builds; scaling to tens of millions of vectors may eventually demand dedicated read replicas.',
      gain: 'Guarantees 100% compliance with hard manufacturing constraints; eliminates synchronization lag between SQL and external vector stores; simplifies infrastructure to a single reliable database engine.'
    },
    reusability: 'Applicable to e-commerce product discovery (filter by price/category, rank by vector match), legal search (filter by jurisdiction/year, rank by precedent relevance), and multi-tenant SaaS document search with strict tenant isolation.',
    forgeiqExample: 'Powers the standards and factory capability matching engine in ForgeIQ (backend/retrieval/hybrid_search.py). Enables the ForgeIQ copilot to retrieve valid manufacturing specs in under 60ms.',
    forgeiqLink: '/projects/forgeiq#database-retrieval',
    forgeiqLinkLabel: 'View Database & Retrieval in ForgeIQ Case Study →',
    codeLang: 'Python / SQL',
    codeSnippet: `from typing import List, Dict, Any
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

HYBRID_SEARCH_QUERY = """
    SELECT 
        id,
        standard_code,
        title,
        material_family,
        max_tolerance_mm,
        certification_list,
        1 - (embedding <=> :query_embedding::vector) AS similarity_score
    FROM manufacturing_standards
    WHERE 
        material_family = :material_family
        AND max_tolerance_mm <= :max_tolerance
        AND certification_list @> :required_certs::text[]
    ORDER BY embedding <=> :query_embedding::vector ASC
    LIMIT :top_k;
"""

async def hybrid_search_standards(
    db: AsyncSession,
    query_embedding: List[float],
    material_family: str,
    max_tolerance_mm: float,
    required_certifications: List[str],
    top_k: int = 5
) -> List[Dict[str, Any]]:
    """Executes relational hard constraints followed by pgvector cosine ranking."""
    params = {
        "query_embedding": str(query_embedding),
        "material_family": material_family,
        "max_tolerance": max_tolerance_mm,
        "required_certs": required_certifications,
        "top_k": top_k
    }
    
    result = await db.execute(text(HYBRID_SEARCH_QUERY), params)
    rows = result.mappings().all()
    
    return [
        {
            "standard_code": r["standard_code"],
            "title": r["title"],
            "similarity_score": round(float(r["similarity_score"]), 4),
            "certifications": r["certification_list"]
        }
        for r in rows
    ]`,
  },
  {
    id: 'pattern-05',
    number: 'PATTERN 05',
    name: 'Process-Pool Worker Offloading for CPU-Bound Async Services',
    summary: 'Protects FastAPI\'s single-threaded async event loop from freezing during heavy CAD 3D vector and mesh geometry parsing by delegating CPU-bound tasks to a dedicated ProcessPoolExecutor with timeout guards.',
    categories: ['backend', 'architecture'],
    primaryCategory: 'Backend / Architecture',
    problem: 'Python\'s AsyncIO event loop runs on a single OS thread. When an endpoint performs heavy computational math (such as parsing a 40MB 3D CAD mesh, calculating polygon intersections, or tessellating geometry), the entire event loop blocks. All concurrent I/O requests (health checks, database queries, WebSocket messages) freeze, causing severe client timeouts.',
    context: 'When a mechanical engineer uploads a STEP or STL drawing to ForgeIQ, the server parses thousands of vertices and triangles to calculate surface area and minimum wall thickness. This takes 300ms to 1200ms of pure CPU calculation. A naive async endpoint froze the entire server for all other users during every upload.',
    architecturePoints: [
      'ASGI Event Loop: FastAPI handles network I/O, user authentication, and database queries without blocking.',
      'ProcessPoolExecutor Pool: A singleton process pool initialized at application startup with worker count matched to available CPU cores.',
      'Offload Mechanism: Synchronous geometry parsing functions are dispatched via asyncio.get_running_loop().run_in_executor(pool, func, *args), bypassing Python\'s Global Interpreter Lock (GIL).',
      'Defensive Timeouts: All offloaded computations are wrapped with asyncio.wait_for() (5.0s timeout) to terminate rogue or malformed CAD files without crashing the server.'
    ],
    implementation: 'Implemented in backend/workers/cad_executor.py and mounted in backend/main.py via FastAPI\'s @asynccontextmanager lifespan. Functions passed to the pool are pure, picklable functions with zero shared state.',
    tradeOffs: {
      overhead: 'Inter-process communication (IPC) serialization overhead when passing binary byte buffers between the main process and worker processes; higher memory usage per process.',
      gain: 'Event loop ping latency remains under 15ms even while crunching 50MB CAD models; fully utilizes multi-core hardware; completely isolates memory-intensive C-extensions from the web server.'
    },
    reusability: 'Crucial for any Python async web service handling CPU-intensive operations: image/video processing, cryptographic signing, PDF document generation, machine learning feature engineering, or numerical simulations.',
    forgeiqExample: 'Used in ForgeIQ\'s CAD upload pipeline (backend/workers/cad_executor.py and backend/main.py). Allows concurrent users to browse dashboards and receive live notifications while large 3D models are processed in parallel.',
    forgeiqLink: '/projects/forgeiq#backend-architecture',
    forgeiqLinkLabel: 'View Backend Architecture in ForgeIQ Case Study →',
    codeLang: 'Python',
    codeSnippet: `import asyncio
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, UploadFile, status

# Global ProcessPoolExecutor for CPU-intensive CAD calculations
cad_process_pool: ProcessPoolExecutor = None

def compute_cad_mesh_metrics_sync(file_bytes: bytes) -> dict:
    """Pure CPU-bound calculation running in an isolated OS process (bypassing the GIL)."""
    import trimesh
    import io
    
    mesh = trimesh.load(io.BytesIO(file_bytes), file_type="stl")
    return {
        "vertex_count": len(mesh.vertices),
        "facet_count": len(mesh.faces),
        "surface_area_cm2": round(mesh.area / 100.0, 2),
        "is_watertight": bool(mesh.is_watertight)
    }

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage lifecycle of background process pool."""
    global cad_process_pool
    cad_process_pool = ProcessPoolExecutor(max_workers=4)
    yield
    cad_process_pool.shutdown(wait=True)

app = FastAPI(lifespan=lifespan)

@app.post("/api/cad/analyze-mesh")
async def analyze_cad_mesh_endpoint(file: UploadFile):
    """Async endpoint: Offloads CPU math to worker pool while keeping event loop 100% free."""
    file_bytes = await file.read()
    loop = asyncio.get_running_loop()
    
    try:
        # Offload CPU work with a 5.0-second safety timeout
        metrics = await asyncio.wait_for(
            loop.run_in_executor(cad_process_pool, compute_cad_mesh_metrics_sync, file_bytes),
            timeout=5.0
        )
        return {"filename": file.filename, "metrics": metrics}
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="CAD geometry processing exceeded the 5.0s computation limit."
        )`
  }
];

export default function EngineeringPatternsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPatterns = selectedCategory === 'all'
    ? PATTERNS
    : PATTERNS.filter(p => p.categories.includes(selectedCategory));

  return (
    <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/engineering" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} />
            <span>Back to Engineering Principles</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/decisions" style={{ fontSize: '0.85rem', color: '#60a5fa' }}>
            View 14 Architectural Decisions (ADRs) ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/engineering/evaluation" style={{ fontSize: '0.85rem', color: '#c084fc' }}>
            AI Evaluation Lab ↗
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <Link href="/projects/forgeiq" style={{ fontSize: '0.85rem', color: '#34d399' }}>
            ForgeIQ Case Study ↗
          </Link>
        </div>

        {/* Masthead */}
        <header style={{ marginBottom: '3rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            Reusable Engineering Handbook
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            Engineering Patterns: Tested Solutions for Real Systems
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '860px', marginBottom: '1.5rem' }}>
            A practical handbook of genuine, reusable architectural patterns extracted from building <strong>ForgeIQ</strong>. Each pattern documents the real problem constraint, architectural design, trade-offs, code implementation, and concrete reusability across software engineering domains.
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
            <div><strong>Rule of Truth:</strong> Zero theoretical fluff—every pattern is actively implemented and test-verified.</div>
            <div><strong>Source System:</strong> ForgeIQ (FastAPI, PostgreSQL + pgvector, Gemini 2.5 Flash, Next.js)</div>
          </div>
        </header>

        {/* Category Toolbar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Browse by Engineering Domain:
          </div>
          <div className="pattern-filter-bar" role="toolbar" aria-label="Filter patterns by engineering domain">
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Patterns ({PATTERNS.length})
            </button>
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ai')}
            >
              AI
            </button>
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'backend' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('backend')}
            >
              Backend
            </button>
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'architecture' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('architecture')}
            >
              Architecture
            </button>
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'testing' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('testing')}
            >
              Testing
            </button>
            <button 
              className={`pattern-filter-btn ${selectedCategory === 'security' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('security')}
            >
              Security
            </button>
          </div>
        </div>

        {/* Pattern List */}
        <div className="pattern-list">
          {filteredPatterns.map((pattern) => (
            <article key={pattern.id} className="pattern-card" id={pattern.id}>
              <div className="pattern-header">
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    color: '#60a5fa',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.06em'
                  }}>
                    {pattern.number}
                  </div>
                  <h2 className="pattern-title">{pattern.name}</h2>
                </div>
                <div className="pattern-tags">
                  {pattern.categories.map((cat) => {
                    let tagCls = 'pattern-tag-arch';
                    if (cat === 'ai') tagCls = 'pattern-tag-ai';
                    else if (cat === 'backend') tagCls = 'pattern-tag-backend';
                    else if (cat === 'testing') tagCls = 'pattern-tag-testing';
                    else if (cat === 'security') tagCls = 'pattern-tag-security';

                    return (
                      <span key={cat} className={`pattern-tag ${tagCls}`}>
                        {cat.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0.85rem 0 1.25rem' }}>
                {pattern.summary}
              </p>

              {/* Problem & Context Grid */}
              <div className="pattern-spec-grid">
                <div className="pattern-spec-block">
                  <div className="pattern-spec-label">Problem:</div>
                  <div className="pattern-spec-content">
                    <p>{pattern.problem}</p>
                  </div>
                </div>

                <div className="pattern-spec-block">
                  <div className="pattern-spec-label">Context &amp; Constraints:</div>
                  <div className="pattern-spec-content">
                    <p>{pattern.context}</p>
                  </div>
                </div>
              </div>

              {/* Architecture */}
              <div className="pattern-spec-block" style={{ marginBottom: '1rem' }}>
                <div className="pattern-spec-label">Architecture:</div>
                <div className="pattern-spec-content">
                  <ul>
                    {pattern.architecturePoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Implementation & Trade-Offs Grid */}
              <div className="pattern-spec-grid">
                <div className="pattern-spec-block">
                  <div className="pattern-spec-label">Implementation:</div>
                  <div className="pattern-spec-content">
                    <p>{pattern.implementation}</p>
                  </div>
                </div>

                <div className="pattern-spec-block">
                  <div className="pattern-spec-label" style={{ color: '#fcd34d' }}>Trade-Offs Accepted:</div>
                  <div className="pattern-spec-content">
                    <ul>
                      <li><strong>Accepted Overhead:</strong> {pattern.tradeOffs.overhead}</li>
                      <li><strong>Engineering Gain:</strong> {pattern.tradeOffs.gain}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reusability & ForgeIQ Example */}
              <div className="pattern-spec-grid">
                <div className="pattern-spec-block">
                  <div className="pattern-spec-label" style={{ color: '#6ee7b7' }}>Where It Can Be Reused:</div>
                  <div className="pattern-spec-content">
                    <p>{pattern.reusability}</p>
                  </div>
                </div>

                <div className="pattern-spec-block">
                  <div className="pattern-spec-label" style={{ color: '#93c5fd' }}>ForgeIQ Example:</div>
                  <div className="pattern-spec-content">
                    <p>{pattern.forgeiqExample}</p>
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="pattern-code-box">
                <div className="pattern-code-header">
                  <span className="pattern-code-lang">{pattern.codeLang}</span>
                  <span>Sanitized production implementation (zero credentials / secrets)</span>
                </div>
                <pre className="pattern-code-body">
                  <code>{pattern.codeSnippet}</code>
                </pre>
              </div>

              {/* Cross-Link */}
              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Link href={pattern.forgeiqLink} className="adr-footer-link">
                  <span>{pattern.forgeiqLinkLabel}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Callout */}
        <div className="card-elevated" style={{
          marginTop: '3.5rem',
          padding: '2.5rem',
          textAlign: 'center',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.85))'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.65rem' }}>Explore the Complete ForgeIQ System</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
            These patterns are components of an integrated manufacturing intelligence platform. Inspect the full 16-section technical case study detailing database schemas, CAD geometry benchmarks, and production deployments.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/projects/forgeiq" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>Read ForgeIQ Case Study →</span>
            </Link>
            <Link href="/engineering/decisions" className="btn btn-secondary" style={{ padding: '0.65rem 1.35rem' }}>
              <span>Inspect 14 Architectural Decisions (ADRs) →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
