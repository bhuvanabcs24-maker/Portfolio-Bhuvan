'use client';

import React, { useState } from 'react';
import { 
  User, FileText, Layers, Bot, Calculator, Factory, Cpu, Activity, Truck,
  ChevronDown, ChevronRight
} from 'lucide-react';
import MobileBottomSheet from './MobileBottomSheet';

interface PipelineNode {
  id: string;
  step: string;
  label: string;
  displayTitle: string;
  category: string;
  sublabel: string;
  icon: React.ReactNode;
  purpose: string;
  input: string;
  process: string;
  output: string;
  technology: string[];
  status: string;
  statusType: 'online' | 'deterministic' | 'guarded' | 'verified';
  evidenceMetric: string;
}

const STATUS_COLORS: Record<string, string> = {
  online: '#10b981',
  deterministic: '#f59e0b',
  guarded: '#a855f7',
  verified: '#06b6d4',
};

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'buyer', step: '01', label: 'BUYER', displayTitle: 'BUYER INTERFACE',
    category: 'CLIENT INGESTION', sublabel: 'RFQ Ingestion & Spec Configuration',
    icon: <User size={16} />,
    purpose: 'Allows enterprise buyers to initiate RFQs, upload CAD assets, configure batch quantities, and set delivery SLA constraints.',
    input: 'Customer RFQ parameters, CAD file (DXF/STEP), quantities (10–5,000 pcs), delivery deadlines.',
    process: 'Multi-part payload validation, customer session authentication via Supabase JWT, virus scanning, AWS S3 presigned upload.',
    output: 'Validated RFQ document entity with unique UUID and partitioned file storage path.',
    technology: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase Auth'],
    status: 'ONLINE', statusType: 'online',
    evidenceMetric: 'JWT Session Verification · <80ms Auth Check',
  },
  {
    id: 'requirement', step: '02', label: 'REQUIREMENT', displayTitle: 'REQUIREMENT ENGINE',
    category: 'SCHEMA NORMALIZATION', sublabel: 'Specification Validation & Schema Guard',
    icon: <FileText size={16} />,
    purpose: 'Normalizes raw customer requirements: alloy specs (AL6061-T6, SS304), surface treatments (Anodizing, Powder Coating), DIN ISO tolerances.',
    input: 'Raw JSON payload with user notes, material dropdown selection, and custom tolerance callouts.',
    process: 'Pydantic v2 strict schema parsing, DIN ISO 2768 medium tolerance assignment, surface treatment mapping.',
    output: 'Immutable, strongly typed NormalizedRFQRequirements model ready for geometry evaluation.',
    technology: ['FastAPI', 'Pydantic v2', 'PostgreSQL', 'JSONB'],
    status: 'SCHEMA GUARDED', statusType: 'guarded',
    evidenceMetric: '100% Type-Safe Ingestion · Zero Unchecked Types',
  },
  {
    id: 'cad', step: '03', label: 'CAD', displayTitle: 'CAD PARSER',
    category: 'DETERMINISTIC EXTRACTION', sublabel: 'Deterministic Geometry Extraction',
    icon: <Layers size={16} />,
    purpose: 'Deterministic geometry extraction: parses 2D DXF vector streams, clusters vertices using KD-Tree (0.01mm tolerance), resolves cycle bases for outer loops and inner cutouts.',
    input: 'Raw 2D DXF vector streams, LINE/POLYLINE/ARC/CIRCLE CAD entities.',
    process: 'KD-Tree spatial vertex clustering (0.01mm), NetworkX undirected graph construction, minimum cycle basis extraction.',
    output: 'Structured manufacturing features: outer perimeter (mm), inner holes count, bounding box, theoretical part mass.',
    technology: ['Python', 'ezdxf', 'NetworkX', 'scipy.spatial'],
    status: 'DETERMINISTIC', statusType: 'deterministic',
    evidenceMetric: '0.01mm Vertex Snapping · 0% LLM Spatial Hallucination',
  },
  {
    id: 'ai', step: '04', label: 'AI', displayTitle: 'AI UNDERSTANDING',
    category: 'ADVISORY & REASONING', sublabel: 'Unstructured Text & Machinability Insights',
    icon: <Bot size={16} />,
    purpose: 'Processes unstructured customer drawing notes. Identifies non-standard finishing requests and recommends margin adjustments without touching core geometry math.',
    input: 'Drawing title block text, technical notes, non-standard finish strings.',
    process: 'LiteLLM provider abstraction with Gemini 2.5 Flash, cached few-shot prompt injection, strict Pydantic JSON output validation.',
    output: 'Structured machine shop advisories, special handling flags, secondary operation multipliers.',
    technology: ['Gemini 2.5 Flash', 'LiteLLM', 'Pydantic Schema', 'Prompt Caching'],
    status: 'GUARDRAILED', statusType: 'guarded',
    evidenceMetric: 'Strict JSON Schema Out · Zero Geometric Inference',
  },
  {
    id: 'rfq', step: '05', label: 'RFQ', displayTitle: 'RFQ / PRICING ENGINE',
    category: 'FINANCIAL OPTIMIZATION', sublabel: 'Deterministic Cost Model',
    icon: <Calculator size={16} />,
    purpose: 'Merges deterministic CAD geometry metrics with live raw-stock indices and supplier machining rates to generate 96.9% accurate quotes.',
    input: 'CAD feature metrics, material volume, hourly machine rate, setup time, tooling wear factor.',
    process: 'Laser cutting time physics model: T_cut = Sum(L_i / V_i) + (N_pierce × T_pierce). Volume discounting and margin optimization.',
    output: 'Bill of Materials (BOM), unit price tiers (1, 10, 100, 1000), breakdown of raw material vs laser time vs finishing.',
    technology: ['Python', 'NumPy', 'PostgreSQL', 'AsyncIO'],
    status: 'DETERMINISTIC', statusType: 'deterministic',
    evidenceMetric: '96.9% Benchmark Accuracy · 14ms Calc Latency',
  },
  {
    id: 'quote', step: '06', label: 'QUOTATION', displayTitle: 'MANUFACTURER DISPATCH',
    category: 'SUPPLY NETWORK', sublabel: 'Supplier Matching & Capacity Allocation',
    icon: <Factory size={16} />,
    purpose: 'Matches verified purchase orders with audited manufacturing partners based on machine envelope, ISO 9001 certifications, material inventory, and utilization.',
    input: 'Finalized quotation, required CNC bed size, tolerance class, delivery date.',
    process: 'Constraint satisfaction matching engine with SQL window functions and pgvector similarity for past on-time delivery records.',
    output: 'Ranked supplier allocation proposal, auto-generated purchase order, encrypted CAD package download token.',
    technology: ['PostgreSQL', 'pgvector', 'SQLAlchemy 2.0', 'Supabase RLS'],
    status: 'NETWORK VERIFIED', statusType: 'verified',
    evidenceMetric: 'Multi-Tenant RBAC · Supplier Zero-Knowledge Encryption',
  },
  {
    id: 'production', step: '07', label: 'PRODUCTION', displayTitle: 'PRODUCTION EXECUTION',
    category: 'SHOP FLOOR TELEMATICS', sublabel: 'CAM Nesting & Machine Execution',
    icon: <Cpu size={16} />,
    purpose: 'Tracks digital manufacturing execution: automated sheet nesting efficiency, CNC G-code verification, laser cutting runtime, and deburring quality inspection checkpoints.',
    input: 'Confirmed fabrication order, nesting layout parameters, machine operator check-in scans.',
    process: 'Shop-floor milestone ingestion via webhook, automated scrap rate calculation, quality tolerance verification.',
    output: 'Production telemetry event stream, material yield metrics, inspection compliance report.',
    technology: ['FastAPI Webhooks', 'PostgreSQL JSONB', 'Pydantic v2'],
    status: 'MONITORED', statusType: 'online',
    evidenceMetric: 'Automated Scrap Telemetry · Real-Time Yield Calculation',
  },
  {
    id: 'tracking', step: '08', label: 'TRACKING', displayTitle: 'TRACKING TELEMATICS',
    category: 'LIFECYCLE TELEMETRY', sublabel: '9-Stage Finite State Machine',
    icon: <Activity size={16} />,
    purpose: 'Enforces an immutable 9-stage order state machine: DRAFT → RFQ_SUBMITTED → CAD_PROCESSED → QUOTED → ORDERED → IN_PRODUCTION → QC_INSPECTION → SHIPPED → DELIVERED.',
    input: 'Order state transition triggers, QC photos, courier tracking numbers.',
    process: 'FSM validation: enforces valid transition graphs, prevents backward illegal state jumps, logs audit trails with millisecond timestamps.',
    output: 'Real-time WebSocket event broadcast to buyer dashboard and supplier portal.',
    technology: ['WebSockets', 'FastAPI Async', 'PostgreSQL Triggers'],
    status: 'FSM ENFORCED', statusType: 'deterministic',
    evidenceMetric: 'Deterministic State Machine · Zero Invalid Transitions',
  },
];

export default function MobileForgeIQPipeline() {
  const [activeNode, setActiveNode] = useState<PipelineNode | null>(null);

  const statusColor = (type: string) => STATUS_COLORS[type] ?? '#64748b';

  return (
    <div className="mb-forgeiq-pipeline">
      {/* Header */}
      <div className="mb-forgeiq-header">
        <div className="mb-forgeiq-title-row">
          <span className="mb-forgeiq-badge">SYS_02</span>
          <h2 className="mb-forgeiq-title">FORGEIQ</h2>
        </div>
        <p className="mb-forgeiq-subtitle">AUTONOMOUS AI MANUFACTURING & COMMERCE OS</p>
        <div className="mb-forgeiq-metrics">
          <span className="mb-forgeiq-metric">96.9% AI Accuracy</span>
          <span className="mb-forgeiq-divider">·</span>
          <span className="mb-forgeiq-metric">109/109 Pytest</span>
          <span className="mb-forgeiq-divider">·</span>
          <span className="mb-forgeiq-metric">5.5× Throughput</span>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mb-pipeline-container" role="list" aria-label="ForgeIQ manufacturing pipeline">
        {PIPELINE_NODES.map((node, idx) => (
          <div key={node.id} className="mb-pipeline-step" role="listitem">
            {/* Node card */}
            <button
              className="mb-pipeline-node"
              onClick={() => setActiveNode(node)}
              aria-label={`View details for step ${node.step}: ${node.label}`}
              aria-expanded={activeNode?.id === node.id}
            >
              {/* Step indicator */}
              <div className="mb-pipeline-step-indicator">
                <span
                  className="mb-pipeline-step-dot"
                  style={{ background: statusColor(node.statusType) }}
                  aria-hidden="true"
                />
                <span className="mb-pipeline-step-num">{node.step}</span>
              </div>

              {/* Node content */}
              <div className="mb-pipeline-node-content">
                <div className="mb-pipeline-node-header">
                  <span className="mb-pipeline-node-icon" aria-hidden="true">{node.icon}</span>
                  <span className="mb-pipeline-node-label">{node.label}</span>
                  <span
                    className="mb-pipeline-node-status"
                    style={{ color: statusColor(node.statusType) }}
                  >
                    {node.status}
                  </span>
                </div>
                <div className="mb-pipeline-node-sublabel">{node.sublabel}</div>
                <div className="mb-pipeline-node-metric">{node.evidenceMetric}</div>
              </div>

              {/* Expand arrow */}
              <ChevronRight size={16} className="mb-pipeline-arrow" aria-hidden="true" />
            </button>

            {/* Connector line (except last) */}
            {idx < PIPELINE_NODES.length - 1 && (
              <div className="mb-pipeline-connector" aria-hidden="true">
                <div className="mb-pipeline-connector-line" />
                <ChevronDown size={12} className="mb-pipeline-connector-arrow" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stack summary */}
      <div className="mb-forgeiq-stack">
        <div className="mb-forgeiq-stack-label">CORE STACK</div>
        <div className="mb-forgeiq-stack-tags">
          {['Python', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'ezdxf', 'NetworkX', 'pgvector', 'Gemini 2.5'].map(t => (
            <span key={t} className="mb-stack-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom sheet detail */}
      <MobileBottomSheet
        isOpen={!!activeNode}
        onClose={() => setActiveNode(null)}
        title={activeNode ? `${activeNode.step} — ${activeNode.displayTitle}` : ''}
        maxHeight="88vh"
      >
        {activeNode && (
          <div className="mb-node-detail">
            <div className="mb-node-detail-category">
              <span style={{ color: statusColor(activeNode.statusType) }}>●</span>
              {' '}{activeNode.category} · <strong style={{ color: statusColor(activeNode.statusType) }}>{activeNode.status}</strong>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">PURPOSE</div>
              <p className="mb-node-detail-text">{activeNode.purpose}</p>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">INPUT</div>
              <p className="mb-node-detail-text">{activeNode.input}</p>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">PROCESS</div>
              <p className="mb-node-detail-text">{activeNode.process}</p>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">OUTPUT</div>
              <p className="mb-node-detail-text">{activeNode.output}</p>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">EVIDENCE</div>
              <div className="mb-node-detail-metric">{activeNode.evidenceMetric}</div>
            </div>

            <div className="mb-node-detail-section">
              <div className="mb-node-detail-label">TECHNOLOGY</div>
              <div className="mb-node-tech-tags">
                {activeNode.technology.map(t => (
                  <span key={t} className="mb-stack-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </MobileBottomSheet>
    </div>
  );
}
