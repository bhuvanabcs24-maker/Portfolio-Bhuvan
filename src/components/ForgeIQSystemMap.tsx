'use client';

import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Layers, 
  Bot, 
  Calculator, 
  Factory, 
  Cpu, 
  Activity, 
  Truck,
  CheckCircle,
  ArrowDown,
  Info,
  ShieldCheck,
  Terminal,
  ExternalLink
} from 'lucide-react';

export interface SystemNode {
  id: string;
  step: string;
  label: string;
  name: string;
  sublabel: string;
  icon: React.ReactNode;
  purpose: string;
  technology: string[];
  techStackDisplay: string;
  status: string;
  statusType: 'online' | 'deterministic' | 'guarded' | 'verified';
  evidenceMetric: string;
  repoReference: string;
}

export const FORGEIQ_SYSTEM_NODES: SystemNode[] = [
  {
    id: 'buyer',
    step: '01',
    label: 'Buyer',
    name: 'BUYER INTERFACE',
    sublabel: 'RFQ Ingestion & Spec Configuration',
    icon: <User size={18} />,
    purpose: 'Allows enterprise buyers to initiate RFQs, upload engineering 2D/3D CAD assets, configure batch quantities, and set delivery SLA constraints.',
    technology: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase Auth'],
    techStackDisplay: 'Next.js 15 • TypeScript • Supabase Auth',
    status: 'ONLINE',
    statusType: 'online',
    evidenceMetric: 'JWT Session Verification • <80ms Auth Check',
    repoReference: 'frontend/src/app/(auth)/login & /rfq'
  },
  {
    id: 'requirement',
    step: '02',
    label: 'Requirement',
    name: 'REQUIREMENT ENGINE',
    sublabel: 'Specification Validation & Schema Guard',
    icon: <FileText size={18} />,
    purpose: 'Normalizes raw customer requirements: alloy specifications (AL6061-T6, SS304, Mild Steel), surface treatments (Anodizing, Powder Coating), and DIN ISO tolerances.',
    technology: ['FastAPI', 'Pydantic v2', 'PostgreSQL', 'JSONB'],
    techStackDisplay: 'FastAPI • Pydantic v2 • PostgreSQL JSONB',
    status: 'SCHEMA GUARDED',
    statusType: 'guarded',
    evidenceMetric: '100% Type-Safe Ingestion • Zero Unchecked Types',
    repoReference: 'backend/schemas/rfq.py & backend/api/v1/endpoints/rfq.py'
  },
  {
    id: 'cad',
    step: '03',
    label: 'CAD',
    name: 'CAD PARSER',
    sublabel: 'Deterministic Geometry Extraction',
    icon: <Layers size={18} />,
    purpose: 'Deterministic geometry extraction: parses 2D DXF vector streams, clusters disconnected vertices using KD-Tree (0.01mm tolerance), resolves cycle bases for outer loops and inner cutouts, and calculates pierce count.',
    technology: ['Python', 'ezdxf', 'NetworkX', 'scipy.spatial'],
    techStackDisplay: 'Python • ezdxf • NetworkX • KD-Tree',
    status: 'DETERMINISTIC GROUND TRUTH',
    statusType: 'deterministic',
    evidenceMetric: '0.01mm Vertex Snapping • 0% LLM Spatial Hallucination',
    repoReference: 'backend/services/cad_preprocessor.py'
  },
  {
    id: 'ai-nlp',
    step: '04',
    label: 'AI / NLP',
    name: 'AI / NLP ADVISORY',
    sublabel: 'Unstructured Text & Machinability Insights',
    icon: <Bot size={18} />,
    purpose: 'Processes unstructured customer drawing notes and title blocks. Identifies non-standard finishing requests and recommends margin adjustments without touching core geometry math.',
    technology: ['Gemini 2.5 Flash', 'LiteLLM', 'Strict Pydantic Schema', 'Prompt Caching'],
    techStackDisplay: 'Gemini 2.5 Flash • LiteLLM • Pydantic Guardrails',
    status: 'GUARDRAILED',
    statusType: 'guarded',
    evidenceMetric: 'Strict JSON Schema Out • Zero Geometric Inference',
    repoReference: 'backend/ai/quotation_engine.py & /ai/prompts.py'
  },
  {
    id: 'quotation',
    step: '05',
    label: 'Quotation',
    name: 'QUOTATION ENGINE',
    sublabel: 'Parametric Physics & Cost Calculation',
    icon: <Calculator size={18} />,
    purpose: 'Calculates true manufacturing cost based on physics: laser cutting feed rate per alloy thickness, pierce delay penalties, raw sheet nesting scrap %, and machine amortized hourly rates.',
    technology: ['FastAPI', 'NumPy', 'ProcessPoolExecutor', 'PostgreSQL'],
    techStackDisplay: 'Python NumPy • FastAPI • ProcessPool',
    status: 'VERIFIED BENCHMARK',
    statusType: 'verified',
    evidenceMetric: '96.9% Pricing Model Accuracy • 5.5× Throughput Gain',
    repoReference: 'backend/services/pricing_calculator.py'
  },
  {
    id: 'manufacturer',
    step: '06',
    label: 'Manufacturer',
    name: 'MANUFACTURER DISPATCH',
    sublabel: 'Multi-Tenant Vendor Routing',
    icon: <Factory size={18} />,
    purpose: 'Routes qualified RFQs to certified machine shop partners based on bed size capacity, active laser cutting wattage, and historical delivery reliability metrics.',
    technology: ['FastAPI', 'Supabase RLS', 'PostgreSQL', 'Webhooks'],
    techStackDisplay: 'FastAPI • Supabase RLS • PostgreSQL Row Security',
    status: 'MULTI-TENANT RBAC',
    statusType: 'online',
    evidenceMetric: '40+ Secure REST Endpoints • Granular Row-Level Policies',
    repoReference: 'backend/api/v1/endpoints/vendors.py'
  },
  {
    id: 'production',
    step: '07',
    label: 'Production',
    name: 'PRODUCTION FSM',
    sublabel: '9-Stage Finite State Machine',
    icon: <Cpu size={18} />,
    purpose: 'Enforces shop-floor progression through strict state machine transitions (DRAFT → PARSED → ESTIMATED → SUBMITTED → QUOTED → ACCEPTED → MACHINING → INSPECTED → DELIVERED). Illegal state skips return HTTP 409.',
    technology: ['SQLAlchemy', 'Finite State Machine', 'Redis', 'Celery'],
    techStackDisplay: 'State Machine Invariants • SQLAlchemy • Redis',
    status: 'INVARIANT ENFORCED',
    statusType: 'guarded',
    evidenceMetric: 'Deterministic Invariant Logic • HTTP 409 on Invalid Skips',
    repoReference: 'backend/models/order_lifecycle.py'
  },
  {
    id: 'tracking',
    step: '08',
    label: 'Tracking',
    name: 'TRACKING & QUALITY',
    sublabel: 'Realtime Telemetry & CMM Verification',
    icon: <Activity size={18} />,
    purpose: 'Broadcasts machining milestones to buyer dashboard. Ingests CMM (Coordinate Measuring Machine) tolerance inspection reports prior to physical dispatch.',
    technology: ['WebSockets', 'Supabase Realtime', 'PostgreSQL Audit'],
    techStackDisplay: 'WebSockets • Supabase Realtime • Audit Log',
    status: 'REALTIME TELEMETRY',
    statusType: 'online',
    evidenceMetric: '<50ms WebSocket Broadcast • Verifiable Tolerance Log',
    repoReference: 'backend/api/v1/endpoints/telemetry.py'
  },
  {
    id: 'delivery',
    step: '09',
    label: 'Delivery',
    name: 'DELIVERY & ESCROW',
    sublabel: 'Final Settlement & Logistics Hand-off',
    icon: <Truck size={18} />,
    purpose: 'Validates carrier dispatch and delivery receipt. Triggers automated bill-of-lading generation and releases supplier milestone escrow funds upon tolerance signoff.',
    technology: ['Stripe / Escrow Webhooks', 'ReportLab PDF', 'Cloudflare R2'],
    techStackDisplay: 'Escrow Webhooks • ReportLab • Cloudflare R2',
    status: 'SETTLEMENT COMPLETE',
    statusType: 'verified',
    evidenceMetric: 'Automated Escrow Milestone Release • Signed PDF Archival',
    repoReference: 'backend/services/settlement.py'
  }
];

interface ForgeIQSystemMapProps {
  compact?: boolean;
}

export default function ForgeIQSystemMap({ compact = false }: ForgeIQSystemMapProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>('cad');
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);

  const selectedNode = FORGEIQ_SYSTEM_NODES.find(
    (n) => n.id === (pinnedNodeId || activeNodeId)
  ) || FORGEIQ_SYSTEM_NODES[2]; // Default to CAD

  const handleNodeClick = (id: string) => {
    if (pinnedNodeId === id) {
      setPinnedNodeId(null);
    } else {
      setPinnedNodeId(id);
      setActiveNodeId(id);
    }
  };

  return (
    <div className="forgeiq-system-map-container" id="forgeiq-system-map">
      {/* Header telemetry info */}
      <div className="forgeiq-map-header">
        <div className="forgeiq-map-badge-row">
          <span className="os-badge-mono">SYSTEM TOPOLOGY MAP</span>
          <span className="os-badge-emerald">● 9 VERIFIED NODES</span>
          {pinnedNodeId && (
            <span className="os-badge-cyan">INSPECTOR PINNED: {selectedNode.label.toUpperCase()}</span>
          )}
        </div>
        <h3 className="forgeiq-map-title">
          ForgeIQ Order & Geometry Pipeline
        </h3>
        <p className="forgeiq-map-subtitle">
          Interactive topological flow from Buyer RFQ ingestion to final Escrow Delivery. Hover or click any node to inspect purpose, verified tech stack, and live status.
        </p>
      </div>

      <div className="forgeiq-map-layout">
        {/* Left / Top: Interactive Pipeline Flow (Buyer ↓ Requirement ↓ CAD ...) */}
        <div className="forgeiq-pipeline-flow" role="tablist" aria-label="ForgeIQ System Flow">
          {FORGEIQ_SYSTEM_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isLast = index === FORGEIQ_SYSTEM_NODES.length - 1;

            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  className={`forgeiq-flow-node ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => !pinnedNodeId && setActiveNodeId(node.id)}
                  onFocus={() => !pinnedNodeId && setActiveNodeId(node.id)}
                  onClick={() => handleNodeClick(node.id)}
                  data-node-id={node.id}
                >
                  {/* Step Badge */}
                  <span className="forgeiq-node-step">{node.step}</span>

                  {/* Icon */}
                  <div className="forgeiq-node-icon-wrap">
                    {node.icon}
                  </div>

                  {/* Node Label */}
                  <div className="forgeiq-node-meta">
                    <span className="forgeiq-node-label">{node.label}</span>
                    <span className="forgeiq-node-sub">{node.name}</span>
                  </div>

                  {/* Status Indicator */}
                  <span className={`forgeiq-node-status-dot ${node.statusType}`} />
                </button>

                {/* Downward Connector Arrow */}
                {!isLast && (
                  <div className="forgeiq-connector-wrapper" aria-hidden="true">
                    <div className="forgeiq-connector-line" />
                    <ArrowDown size={14} className="forgeiq-connector-arrow" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right / Bottom: Live Node Inspector Panel */}
        <div className="forgeiq-inspector-panel">
          <div className="forgeiq-inspector-card">
            {/* Inspector Titlebar */}
            <div className="forgeiq-inspector-head">
              <div className="forgeiq-inspector-head-left">
                <span className="forgeiq-inspector-step">NODE [{selectedNode.step}/09]</span>
                <h4 className="forgeiq-inspector-name">{selectedNode.name}</h4>
              </div>
              <div className={`forgeiq-inspector-status-badge ${selectedNode.statusType}`}>
                <span className="os-status-dot-sm" />
                <span>{selectedNode.status}</span>
              </div>
            </div>

            {/* Sublabel / Role */}
            <div className="forgeiq-inspector-role">
              {selectedNode.sublabel}
            </div>

            {/* Section 1: PURPOSE */}
            <div className="forgeiq-inspector-section">
              <div className="forgeiq-inspector-section-label">
                <Info size={12} />
                <span>PURPOSE</span>
              </div>
              <p className="forgeiq-inspector-purpose">
                {selectedNode.purpose}
              </p>
            </div>

            {/* Section 2: TECHNOLOGY */}
            <div className="forgeiq-inspector-section">
              <div className="forgeiq-inspector-section-label">
                <Cpu size={12} />
                <span>TECHNOLOGY</span>
              </div>
              <div className="forgeiq-tech-tag-row">
                {selectedNode.technology.map((tech, idx) => (
                  <span key={idx} className="forgeiq-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 3: STATUS & EVIDENCE METRIC */}
            <div className="forgeiq-inspector-section">
              <div className="forgeiq-inspector-section-label">
                <ShieldCheck size={12} />
                <span>VERIFIED EVIDENCE METRIC</span>
              </div>
              <div className="forgeiq-evidence-metric-box">
                <span className="forgeiq-evidence-metric-text">
                  {selectedNode.evidenceMetric}
                </span>
              </div>
            </div>

            {/* Section 4: REPOSITORY REFERENCE */}
            <div className="forgeiq-inspector-footer">
              <div className="forgeiq-repo-ref">
                <Terminal size={12} />
                <span className="forgeiq-repo-code">{selectedNode.repoReference}</span>
              </div>
              <span className="forgeiq-interaction-hint">
                {pinnedNodeId ? 'Click node to unpin' : 'Click node to pin details'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
