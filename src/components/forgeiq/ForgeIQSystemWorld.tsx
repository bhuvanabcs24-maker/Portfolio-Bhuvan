'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Database,
  Server,
  Lock,
  Search,
  Maximize2,
  X,
  Play,
  RotateCcw,
  Sliders
} from 'lucide-react';
import ForgeIQSystemCore from '../os/ForgeIQSystemCore';

export interface PipelineNode {
  id: string;
  step: string;
  label: string;          // Used for automated test match: Buyer, Requirement, CAD, AI / NLP, Quotation, Manufacturer, Production, Tracking, Delivery
  displayTitle: string;   // Spatial visual title
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
  repoReference: string;
}

export const FORGEIQ_PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'buyer',
    step: '01',
    label: 'Buyer',
    displayTitle: 'BUYER INTERFACE',
    category: 'CLIENT INGESTION',
    sublabel: 'RFQ Ingestion & Spec Configuration',
    icon: <User size={18} />,
    purpose: 'Allows enterprise buyers to initiate RFQs, upload engineering 2D/3D CAD assets, configure batch quantities, and set delivery SLA constraints.',
    input: 'Customer RFQ parameters, CAD file (DXF/STEP), quantities (10–5,000 pcs), delivery deadlines.',
    process: 'Multi-part payload validation, customer session authentication via Supabase JWT, virus scanning, and AWS S3/Supabase storage presigned upload.',
    output: 'Validated RFQ document entity with unique UUID and partitioned file storage path.',
    technology: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase Auth'],
    status: 'ONLINE',
    statusType: 'online',
    evidenceMetric: 'JWT Session Verification • <80ms Auth Check',
    repoReference: 'frontend/src/app/(auth)/login & /rfq'
  },
  {
    id: 'requirement',
    step: '02',
    label: 'Requirement',
    displayTitle: 'REQUIREMENT ENGINE',
    category: 'SCHEMA NORMALIZATION',
    sublabel: 'Specification Validation & Schema Guard',
    icon: <FileText size={18} />,
    purpose: 'Normalizes raw customer requirements: alloy specifications (AL6061-T6, SS304, Mild Steel), surface treatments (Anodizing, Powder Coating), and DIN ISO tolerances.',
    input: 'Raw JSON payload with user notes, material dropdown selection, and custom tolerance callouts.',
    process: 'Pydantic v2 strict schema parsing, DIN ISO 2768 medium tolerance assignment, surface treatment mapping against capability table.',
    output: 'Immutable, strongly typed NormalizedRFQRequirements model ready for geometry evaluation.',
    technology: ['FastAPI', 'Pydantic v2', 'PostgreSQL', 'JSONB'],
    status: 'SCHEMA GUARDED',
    statusType: 'guarded',
    evidenceMetric: '100% Type-Safe Ingestion • Zero Unchecked Types',
    repoReference: 'backend/schemas/rfq.py & backend/api/v1/endpoints/rfq.py'
  },
  {
    id: 'cad',
    step: '03',
    label: 'CAD',
    displayTitle: 'DOCUMENT / CAD PARSER',
    category: 'DETERMINISTIC EXTRACTION',
    sublabel: 'Deterministic Geometry Extraction',
    icon: <Layers size={18} />,
    purpose: 'Deterministic geometry extraction: parses 2D DXF vector streams, clusters disconnected vertices using KD-Tree (0.01mm tolerance), resolves cycle bases for outer loops and inner cutouts, and calculates pierce count.',
    input: 'Raw 2D DXF vector streams, LINE/POLYLINE/ARC/CIRCLE CAD entities, coordinate tables.',
    process: 'KD-Tree spatial vertex clustering (0.01mm tolerance), NetworkX undirected graph construction, minimum cycle basis extraction for nested contours, pierce point identification.',
    output: 'Structured manufacturing features: outer cutting perimeter (mm), inner holes count, piercing operations, bounding box (X/Y), and theoretical part mass.',
    technology: ['Python', 'ezdxf', 'NetworkX', 'scipy.spatial'],
    status: 'DETERMINISTIC GROUND TRUTH',
    statusType: 'deterministic',
    evidenceMetric: '0.01mm Vertex Snapping • 0% LLM Spatial Hallucination',
    repoReference: 'backend/services/cad_preprocessor.py'
  },
  {
    id: 'ai-nlp',
    step: '04',
    label: 'AI / NLP',
    displayTitle: 'AI UNDERSTANDING',
    category: 'ADVISORY & REASONING',
    sublabel: 'Unstructured Text & Machinability Insights',
    icon: <Bot size={18} />,
    purpose: 'Processes unstructured customer drawing notes and title blocks. Identifies non-standard finishing requests and recommends margin adjustments without touching core geometry math.',
    input: 'Drawing title block text, technical notes, non-standard finish strings (e.g. "Mask bolt threads before hard anodize").',
    process: 'LiteLLM provider abstraction with Gemini 2.5 Flash, cached few-shot prompt injection, strict Pydantic JSON output validation with confidence score.',
    output: 'Structured machine shop advisories, special handling flags, and secondary operation multipliers.',
    technology: ['Gemini 2.5 Flash', 'LiteLLM', 'Strict Pydantic Schema', 'Prompt Caching'],
    status: 'GUARDRAILED',
    statusType: 'guarded',
    evidenceMetric: 'Strict JSON Schema Out • Zero Geometric Inference',
    repoReference: 'backend/ai/quotation_engine.py & /ai/prompts.py'
  },
  {
    id: 'quotation',
    step: '05',
    label: 'Quotation',
    displayTitle: 'RFQ / PRICING ENGINE',
    category: 'FINANCIAL OPTIMIZATION',
    sublabel: 'Deterministic Cost Model & Margin Engine',
    icon: <Calculator size={18} />,
    purpose: 'Merges deterministic CAD geometry metrics (cutting length, pierce count, material mass) with live raw-stock indices and supplier machining rates to generate 96.9% accurate quotes.',
    input: 'CAD feature metrics, material volume, hourly machine rate ($/hr), setup time, tooling wear factor, logistics distance.',
    process: 'Laser cutting time physics model: T_cut = Sum(L_i / V_i) + (N_pierce * T_pierce). Applies volume discounting and margin optimization formula.',
    output: 'Comprehensive Bill of Materials (BOM), unit price tiers (1, 10, 100, 1000), breakdown of raw material vs laser time vs finishing.',
    technology: ['Python', 'NumPy', 'PostgreSQL', 'AsyncIO'],
    status: 'DETERMINISTIC PRICING',
    statusType: 'deterministic',
    evidenceMetric: '96.9% Benchmark Accuracy • 14ms Calc Latency',
    repoReference: 'backend/services/pricing_calculator.py'
  },
  {
    id: 'manufacturer',
    step: '06',
    label: 'Manufacturer',
    displayTitle: 'MANUFACTURER DISPATCH',
    category: 'SUPPLY NETWORK',
    sublabel: 'Supplier Matching & Capacity Allocation',
    icon: <Factory size={18} />,
    purpose: 'Matches verified purchase orders with audited manufacturing partners based on machine envelope, ISO 9001 certifications, material inventory, and current shop-floor utilization.',
    input: 'Finalized quotation, required CNC bed size (e.g. 3000x1500mm), tolerance class, required delivery date.',
    process: 'Constraint satisfaction matching engine: queries supplier capability index with SQL window functions and pgvector similarity for past on-time delivery records.',
    output: 'Ranked supplier allocation proposal, auto-generated purchase order, and encrypted CAD package download token.',
    technology: ['PostgreSQL', 'pgvector', 'SQLAlchemy 2.0', 'Supabase RLS'],
    status: 'NETWORK VERIFIED',
    statusType: 'verified',
    evidenceMetric: 'Multi-Tenant RBAC • Supplier Zero-Knowledge Encryption',
    repoReference: 'backend/api/v1/endpoints/supplier_matching.py'
  },
  {
    id: 'production',
    step: '07',
    label: 'Production',
    displayTitle: 'PRODUCTION EXECUTION',
    category: 'SHOP FLOOR TELEMATICS',
    sublabel: 'CAM Nesting & Machine Execution',
    icon: <Cpu size={18} />,
    purpose: 'Tracks digital manufacturing execution: automated sheet nesting efficiency, CNC G-code verification, laser cutting runtime, and deburring quality inspection checkpoints.',
    input: 'Confirmed fabrication order, nesting layout parameters, machine operator check-in scans.',
    process: 'Shop-floor milestone ingestion via webhook, automated scrap rate calculation, quality tolerance verification against DIN ISO 2768.',
    output: 'Production telemetry event stream, material yield metrics, and inspection compliance report.',
    technology: ['FastAPI Webhooks', 'PostgreSQL JSONB', 'Pydantic v2'],
    status: 'MONITORED',
    statusType: 'online',
    evidenceMetric: 'Automated Scrap Telemetry • Real-Time Yield Calculation',
    repoReference: 'backend/services/order_state_machine.py'
  },
  {
    id: 'tracking',
    step: '08',
    label: 'Tracking',
    displayTitle: 'TRACKING TELEMATICS',
    category: 'LIFECYCLE TELEMETRY',
    sublabel: '9-Stage Finite State Machine',
    icon: <Activity size={18} />,
    purpose: 'Enforces an immutable 9-stage order state machine: DRAFT -> RFQ_SUBMITTED -> CAD_PROCESSED -> QUOTED -> ORDERED -> IN_PRODUCTION -> QC_INSPECTION -> SHIPPED -> DELIVERED.',
    input: 'Order state transition triggers, QC photos, courier tracking numbers (FedEx / BlueDart / DHL).',
    process: 'Finite State Machine (FSM) validation: enforces valid transition graphs, prevents backward illegal state jumps, logs audit trails with millisecond timestamps.',
    output: 'Real-time WebSocket event broadcast to buyer dashboard and supplier portal.',
    technology: ['WebSockets', 'FastAPI Async', 'PostgreSQL Triggers'],
    status: 'FSM ENFORCED',
    statusType: 'deterministic',
    evidenceMetric: 'Deterministic State Machine • Zero Invalid Transitions',
    repoReference: 'backend/services/order_fsm.py'
  },
  {
    id: 'delivery',
    step: '09',
    label: 'Delivery',
    displayTitle: 'DELIVERY & ESCROW',
    category: 'FULFILLMENT & ESCROW',
    sublabel: 'Escrow Settlement & QC Handover',
    icon: <Truck size={18} />,
    purpose: 'Handles proof of delivery, buyer inspection sign-off, warranty period countdown, and automated two-sided escrow fund release to manufacturing partners.',
    input: 'Digital signature / OTP proof of delivery, dimensional inspection acceptance, invoice verification.',
    process: 'Automated escrow balance disbursement via payment gateway integration, supplier performance rating calculation, order closure archiving.',
    output: 'Completed order certificate, tax invoice, and permanent audit archive.',
    technology: ['PostgreSQL', 'Next.js 15', 'TypeScript', 'Stripe/Razorpay Webhooks'],
    status: 'SETTLED',
    statusType: 'verified',
    evidenceMetric: 'Automated Escrow Handshake • Immutable Audit Trail',
    repoReference: 'backend/api/v1/endpoints/escrow.py'
  }
];

// Interactive CAD Demo Geometry Entities
interface CadEntity {
  id: string;
  name: string;
  type: string;
  geometry: string;
  pierce: number;
  highlightColor: string;
}

const DEMO_CAD_ENTITIES: CadEntity[] = [
  {
    id: 'feat-outer',
    name: 'OUTER_CONTOUR_01',
    type: 'POLYLINE_CLOSED',
    geometry: 'Closed outer loop • Perimeter: 480.0mm • 4 chamfers • Bounding Box: 160 x 100mm',
    pierce: 1,
    highlightColor: '#f59e0b'
  },
  {
    id: 'feat-bore',
    name: 'CENTER_BORE_02',
    type: 'CIRCLE_BORE',
    geometry: 'Radius: 24.0mm • Center: (80.0, 50.0) • Circumference: 150.8mm • Piercing: Lead-in arc',
    pierce: 1,
    highlightColor: '#06b6d4'
  },
  {
    id: 'feat-bolt-1',
    name: 'BOLT_HOLE_M8_A',
    type: 'CIRCLE',
    geometry: 'Diameter: 8.5mm • Center: (25.0, 25.0) • Tolerance: ±0.05mm',
    pierce: 1,
    highlightColor: '#10b981'
  },
  {
    id: 'feat-bolt-2',
    name: 'BOLT_HOLE_M8_B',
    type: 'CIRCLE',
    geometry: 'Diameter: 8.5mm • Center: (135.0, 25.0) • Tolerance: ±0.05mm',
    pierce: 1,
    highlightColor: '#10b981'
  },
  {
    id: 'feat-bolt-3',
    name: 'BOLT_HOLE_M8_C',
    type: 'CIRCLE',
    geometry: 'Diameter: 8.5mm • Center: (25.0, 75.0) • Tolerance: ±0.05mm',
    pierce: 1,
    highlightColor: '#10b981'
  },
  {
    id: 'feat-bolt-4',
    name: 'BOLT_HOLE_M8_D',
    type: 'CIRCLE',
    geometry: 'Diameter: 8.5mm • Center: (135.0, 75.0) • Tolerance: ±0.05mm',
    pierce: 1,
    highlightColor: '#10b981'
  },
  {
    id: 'feat-slot',
    name: 'COOLING_SLOT_03',
    type: 'SLOT_CONTOUR',
    geometry: 'Dimensions: 40.0 x 10.0mm • Corner Radius: 5.0mm • Lead-in pierce',
    pierce: 1,
    highlightColor: '#a855f7'
  }
];

export default function ForgeIQSystemWorld() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('cad');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'status' | 'cad-lab' | 'ai-pipeline' | 'architecture'>('map');
  
  // Modals & Panels
  const [showInspectorModal, setShowInspectorModal] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [selectedEvidenceMetric, setSelectedEvidenceMetric] = useState<string | null>(null);
  
  // CAD Lab Feature Inspection
  const [hoveredCadEntity, setHoveredCadEntity] = useState<CadEntity | null>(DEMO_CAD_ENTITIES[0]);

  // Animated Data Packet Simulation
  const [activePacketStep, setActivePacketStep] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePacketStep((prev) => (prev + 1) % FORGEIQ_PIPELINE_NODES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const activeNode = FORGEIQ_PIPELINE_NODES.find((n) => n.id === selectedNodeId) || FORGEIQ_PIPELINE_NODES[2];

  return (
    <div className="forgeiq-system-world-container" id="forgeiq-system-map">
      {/* 1. Technical Header & Telemetry Bar */}
      <header className="forgeiq-world-header">
        <div className="forgeiq-world-brand-block">
          <div className="forgeiq-world-tag">
            <span>FORGEIQ</span>
            <span className="forgeiq-tag-dot" />
            <span>MANUFACTURING INTELLIGENCE SYSTEM</span>
          </div>
          <div className="forgeiq-world-status-tag">
            <span className="forgeiq-pulse-dot" />
            <span className="forgeiq-status-text">SYSTEM ONLINE ●</span>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="forgeiq-world-header-actions">
          <button 
            className="forgeiq-action-pill"
            onClick={() => setShowWhyModal(true)}
            data-cursor="pointer"
            title="Why PostgreSQL? Why FastAPI? Why deterministic CAD?"
          >
            <HelpCircle size={13} color="#f59e0b" />
            <span>WHY? // ARCHITECTURE</span>
          </button>

          <button 
            className="forgeiq-action-pill highlight"
            onClick={() => setShowInspectorModal(true)}
            data-cursor="pointer"
            title="Inspect Full-Stack System Architecture"
          >
            <Maximize2 size={13} />
            <span>[ INSPECT SYSTEM ]</span>
          </button>

          <Link 
            id="forgeiq-case-study-cta"
            href="/forgeiq-case-study" 
            className="forgeiq-action-pill cta"
            data-cursor="external"
            title="Read Complete Case Study"
          >
            <span>FULL CASE STUDY</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* 2. Primary Navigation Subtabs */}
      <nav className="forgeiq-world-subtabs os-app-tabs">
        <button 
          className={`forgeiq-subtab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Activity size={13} />
          <span>Interactive System Map (Buyer ↓ Delivery)</span>
        </button>
        <button 
          className={`forgeiq-subtab-btn ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <Cpu size={13} />
          <span>Flagship Status & Evidence</span>
        </button>
        <button 
          className={`forgeiq-subtab-btn ${activeTab === 'cad-lab' ? 'active' : ''}`}
          onClick={() => setActiveTab('cad-lab')}
        >
          <Layers size={13} />
          <span>CAD Lab (Deterministic Snapper)</span>
        </button>
        <button 
          className={`forgeiq-subtab-btn ${activeTab === 'ai-pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-pipeline')}
        >
          <Bot size={13} />
          <span>Visual AI Pipeline</span>
        </button>
        <button 
          className={`forgeiq-subtab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Server size={13} />
          <span>Deterministic Geometry Engine</span>
        </button>
      </nav>

      {/* 3. Main Dynamic Content Area */}
      <div className="forgeiq-world-body">
        {/* =========================================================================
            TAB 1: CENTRAL SPATIAL PIPELINE (The Most Important Visual)
           ========================================================================= */}
        {activeTab === 'map' && (
          <div className="forgeiq-spatial-flow-section">
            {/* Top Operational Status Rail */}
            <div className="forgeiq-telemetry-strip">
              <div className="forgeiq-strip-item">
                <span className="strip-label">ARCHITECTURE:</span>
                <span className="strip-val">DETERMINISTIC CAD + LITELLM AI + FASTAPI</span>
              </div>
              <div className="forgeiq-strip-divider">|</div>
              <div className="forgeiq-strip-item">
                <span className="strip-label">DATA PACKET IN FLIGHT:</span>
                <span className="strip-val active-packet">
                  [ RFQ_{FORGEIQ_PIPELINE_NODES[activePacketStep].step} → {FORGEIQ_PIPELINE_NODES[activePacketStep].label.toUpperCase()} ]
                </span>
              </div>
              <div className="forgeiq-strip-divider">|</div>
              <div className="forgeiq-strip-item">
                <span className="strip-label">ACCURACY:</span>
                <span className="strip-val">96.9% VERIFIED</span>
              </div>
            </div>

            {/* Spatial Flow Layout (Desktop: Horizontal Spatial Network, Mobile: Vertical Pipeline) */}
            <div className="forgeiq-flow-grid">
              {FORGEIQ_PIPELINE_NODES.map((node, index) => {
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isPacketActive = activePacketStep === index;

                return (
                  <div
                    key={node.id}
                    data-node-id={node.id}
                    className={`forgeiq-flow-node ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${isPacketActive ? 'packet-active' : ''}`}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    data-cursor="pointer"
                  >
                    {/* Corner Crosshairs */}
                    <div className="forgeiq-node-corner-tl" />
                    <div className="forgeiq-node-corner-br" />

                    {/* Step Index & Status Dot */}
                    <div className="forgeiq-node-meta-top">
                      <span className="forgeiq-node-step">{node.step}</span>
                      <span className={`forgeiq-node-status-dot status-${node.statusType}`} />
                    </div>

                    {/* Node Icon */}
                    <div className="forgeiq-node-icon-wrapper">
                      {node.icon}
                    </div>

                    {/* Labels - Tested by Selenium with .forgeiq-node-label */}
                    <div className="forgeiq-node-label">{node.label}</div>
                    <div className="forgeiq-node-sublabel">{node.sublabel}</div>

                    {/* Active Packet Indicator */}
                    {isPacketActive && (
                      <div className="forgeiq-packet-beacon">
                        <span className="beacon-ping" />
                        <span className="beacon-text">RFQ IN TRANSIT</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Technical Node Inspector Panel */}
            <div className="forgeiq-node-inspector-card">
              <div className="inspector-card-header">
                <div>
                  <div className="inspector-meta-row">
                    <span className="inspector-step-code">NODE [{activeNode.step}/09]</span>
                    <span className="forgeiq-inspector-status-badge">
                      {activeNode.status}
                    </span>
                  </div>
                  <h3 className="forgeiq-inspector-name">{activeNode.displayTitle}</h3>
                  <div className="inspector-category-tag">{activeNode.category}</div>
                </div>

                <div className="inspector-tech-stack-group">
                  <span className="tech-stack-label">VERIFIED STACK:</span>
                  <div className="tech-tag-list">
                    {activeNode.technology.map((tech, i) => (
                      <span key={i} className="forgeiq-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purpose Readout (Asserted by Selenium) */}
              <div className="forgeiq-inspector-purpose">
                {activeNode.purpose}
              </div>

              {/* Input / Process / Output Specification Required by Part 4 */}
              <div className="inspector-io-grid">
                <div className="inspector-io-col">
                  <span className="io-title">INPUT:</span>
                  <p className="io-desc">{activeNode.input}</p>
                </div>
                <div className="inspector-io-col">
                  <span className="io-title">PROCESS:</span>
                  <p className="io-desc">{activeNode.process}</p>
                </div>
                <div className="inspector-io-col">
                  <span className="io-title">OUTPUT:</span>
                  <p className="io-desc">{activeNode.output}</p>
                </div>
              </div>

              {/* Footnote Evidence */}
              <div className="inspector-footer-bar">
                <div className="inspector-evidence-text">
                  <strong>EVIDENCE:</strong> {activeNode.evidenceMetric}
                </div>
                <div className="inspector-repo-ref">
                  <code>{activeNode.repoReference}</code>
                </div>
              </div>
            </div>

            {/* Floating Engineering Evidence Dashboard */}
            <div className="forgeiq-floating-evidence-panel">
              <div className="evidence-panel-header">
                <span className="evidence-panel-title">ENGINEERING EVIDENCE (VERIFIED RESUME METRICS)</span>
                <span className="evidence-panel-hint">Click metric for detailed verification</span>
              </div>

              <div className="evidence-metrics-row">
                <div 
                  className="evidence-card"
                  onClick={() => setSelectedEvidenceMetric('api')}
                  data-cursor="pointer"
                >
                  <div className="evidence-card-category">API</div>
                  <div className="evidence-metric-number">40+</div>
                  <div className="evidence-metric-unit">endpoints</div>
                  <div className="evidence-metric-sub">FastAPI REST & OpenAPI 3.1 Contract</div>
                </div>

                <div 
                  className="evidence-card"
                  onClick={() => setSelectedEvidenceMetric('pricing')}
                  data-cursor="pointer"
                >
                  <div className="evidence-card-category">PRICING</div>
                  <div className="evidence-metric-number">96.9%</div>
                  <div className="evidence-metric-unit">accuracy</div>
                  <div className="evidence-metric-sub">On production benchmark models</div>
                </div>

                <div 
                  className="evidence-card"
                  onClick={() => setSelectedEvidenceMetric('pytest')}
                  data-cursor="pointer"
                >
                  <div className="evidence-card-category">TESTS</div>
                  <div className="evidence-metric-number">33/33</div>
                  <div className="evidence-metric-unit">pytest</div>
                  <div className="evidence-metric-sub">Geometry fixtures & KD-Tree snapping</div>
                </div>

                <div 
                  className="evidence-card"
                  onClick={() => setSelectedEvidenceMetric('e2e')}
                  data-cursor="pointer"
                >
                  <div className="evidence-card-category">E2E</div>
                  <div className="evidence-metric-number">14</div>
                  <div className="evidence-metric-unit">Playwright tests</div>
                  <div className="evidence-metric-sub">Full browser purchase lifecycle</div>
                </div>

                <div 
                  className="evidence-card"
                  onClick={() => setSelectedEvidenceMetric('throughput')}
                  data-cursor="pointer"
                >
                  <div className="evidence-card-category">LOAD TEST</div>
                  <div className="evidence-metric-number">5.5×</div>
                  <div className="evidence-metric-unit">throughput improvement</div>
                  <div className="evidence-metric-sub">860 → 4,589 req/s under load test</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: FLAGSHIP STATUS & EVIDENCE (Compatibility Tab)
           ========================================================================= */}
        {activeTab === 'status' && (
          <div className="os-tab-pane">
            {/* 4 ONLINE Status Metric Cards */}
            <div className="os-status-banner-grid">
              <div className="os-status-metric-card">
                <span className="os-status-metric-label">CAD ENGINE</span>
                <span className="os-status-metric-val">ONLINE</span>
              </div>
              <div className="os-status-metric-card">
                <span className="os-status-metric-label">AI PIPELINE</span>
                <span className="os-status-metric-val">ONLINE</span>
              </div>
              <div className="os-status-metric-card">
                <span className="os-status-metric-label">API</span>
                <span className="os-status-metric-val">ONLINE</span>
              </div>
              <div className="os-status-metric-card">
                <span className="os-status-metric-label">DATABASE</span>
                <span className="os-status-metric-val">ONLINE</span>
              </div>
            </div>

            {/* Verified Production Stat Boxes */}
            <div className="os-verified-stats-row" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="os-stat-box">
                <div className="os-stat-lbl">TEST SUITE</div>
                <div className="os-stat-num">33/33</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--os-text-body)' }}>Passing Pytest Unit & Integration</div>
              </div>
              <div className="os-stat-box">
                <div className="os-stat-lbl">E2E</div>
                <div className="os-stat-num">14 TESTS</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--os-text-body)' }}>Playwright Browser Test Suite</div>
              </div>
              <div className="os-stat-box">
                <div className="os-stat-lbl">THROUGHPUT</div>
                <div className="os-stat-num">5.5× IMPROVEMENT</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--os-text-body)' }}>860 → 4,589 req/s with pgvector</div>
              </div>
              <div className="os-stat-box">
                <div className="os-stat-lbl">PRICING MODEL ACCURACY</div>
                <div className="os-stat-num">96.9%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--os-text-body)' }}>Deterministic Manufacturing Formula</div>
              </div>
            </div>

            {/* Evidence Dashboard Grid */}
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--os-accent)', marginBottom: '1rem' }}>
                AUDITED EVIDENCE REPOSITORIES
              </h4>
              <div className="evidence-metrics-row">
                <div className="evidence-card">
                  <div className="evidence-card-category">API</div>
                  <div className="evidence-metric-number">40+</div>
                  <div className="evidence-metric-unit">endpoints</div>
                </div>
                <div className="evidence-card">
                  <div className="evidence-card-category">TESTS</div>
                  <div className="evidence-metric-number">33/33</div>
                  <div className="evidence-metric-unit">pytest</div>
                </div>
                <div className="evidence-card">
                  <div className="evidence-card-category">E2E</div>
                  <div className="evidence-metric-number">14</div>
                  <div className="evidence-metric-unit">Playwright tests</div>
                </div>
                <div className="evidence-card">
                  <div className="evidence-card-category">PRICING</div>
                  <div className="evidence-metric-number">96.9%</div>
                  <div className="evidence-metric-unit">accuracy</div>
                </div>
                <div className="evidence-card">
                  <div className="evidence-card-category">LOAD TEST</div>
                  <div className="evidence-metric-number">5.5×</div>
                  <div className="evidence-metric-unit">throughput improvement</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: INTERACTIVE CAD LAB (Demo Geometry with Feature Inspection)
           ========================================================================= */}
        {activeTab === 'cad-lab' && (
          <div className="forgeiq-cad-lab-layout">
            <div className="cad-lab-viewport-col">
              {/* Demo Geometry Banner Required by Part 4 */}
              <div className="cad-demo-notice-bar">
                <span className="notice-badge">DEMO GEOMETRY</span>
                <span className="notice-text">
                  Synthetic test bracket visualizing deterministic lines, polylines, arcs, circles, and closed contours. No confidential client blueprints are displayed.
                </span>
              </div>

              {/* Interactive CAD Canvas Simulation */}
              <div className="cad-interactive-canvas-frame">
                <svg 
                  className="cad-svg-canvas"
                  viewBox="0 0 480 320" 
                  width="100%" 
                  height="100%"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="480" height="320" fill="url(#cadGrid)" />

                  {/* 1. Outer Polyline Closed Contour with Chamfers */}
                  <path
                    d="M 60 50 L 380 50 L 420 90 L 420 230 L 380 270 L 60 270 L 40 250 L 40 70 Z"
                    fill="rgba(59, 130, 246, 0.03)"
                    stroke={hoveredCadEntity?.id === 'feat-outer' ? '#f59e0b' : '#3b82f6'}
                    strokeWidth={hoveredCadEntity?.id === 'feat-outer' ? 3 : 2}
                    className="cad-vector-element"
                    onMouseEnter={() => setHoveredCadEntity(DEMO_CAD_ENTITIES[0])}
                  />

                  {/* Pierce indicator for outer contour */}
                  <circle cx="60" cy="50" r="3" fill="#ef4444" />
                  <text x="65" y="45" fill="#ef4444" fontSize="8" fontFamily="var(--font-mono)">PIERCE_01</text>

                  {/* 2. Center Precision Spindle Bore (Circle) */}
                  <circle
                    cx="230"
                    cy="160"
                    r="48"
                    fill="rgba(6, 182, 212, 0.04)"
                    stroke={hoveredCadEntity?.id === 'feat-bore' ? '#f59e0b' : '#06b6d4'}
                    strokeWidth={hoveredCadEntity?.id === 'feat-bore' ? 3 : 2}
                    className="cad-vector-element"
                    onMouseEnter={() => setHoveredCadEntity(DEMO_CAD_ENTITIES[1])}
                  />
                  <circle cx="230" cy="112" r="2.5" fill="#ef4444" />
                  <text x="235" y="112" fill="#ef4444" fontSize="8" fontFamily="var(--font-mono)">PIERCE_02</text>

                  {/* 3. 4 Corner Bolt Holes (Circles) */}
                  {[
                    { cx: 90, cy: 90, ent: DEMO_CAD_ENTITIES[2] },
                    { cx: 370, cy: 90, ent: DEMO_CAD_ENTITIES[3] },
                    { cx: 90, cy: 230, ent: DEMO_CAD_ENTITIES[4] },
                    { cx: 370, cy: 230, ent: DEMO_CAD_ENTITIES[5] }
                  ].map((bolt, i) => (
                    <circle
                      key={i}
                      cx={bolt.cx}
                      cy={bolt.cy}
                      r="12"
                      fill="rgba(16, 185, 129, 0.05)"
                      stroke={hoveredCadEntity?.id === bolt.ent.id ? '#f59e0b' : '#10b981'}
                      strokeWidth={hoveredCadEntity?.id === bolt.ent.id ? 3 : 2}
                      className="cad-vector-element"
                      onMouseEnter={() => setHoveredCadEntity(bolt.ent)}
                    />
                  ))}

                  {/* 4. Internal Cooling Slot */}
                  <rect
                    x="190"
                    y="240"
                    width="80"
                    height="16"
                    rx="8"
                    fill="rgba(168, 85, 247, 0.05)"
                    stroke={hoveredCadEntity?.id === 'feat-slot' ? '#f59e0b' : '#a855f7'}
                    strokeWidth={hoveredCadEntity?.id === 'feat-slot' ? 3 : 2}
                    className="cad-vector-element"
                    onMouseEnter={() => setHoveredCadEntity(DEMO_CAD_ENTITIES[6])}
                  />
                </svg>

                {/* Legend / Overlay */}
                <div className="cad-canvas-telemetry-badge">
                  <span>KD-TREE 0.01mm SNAPPED</span>
                  <span>•</span>
                  <span>7 CLOSED LOOPS</span>
                  <span>•</span>
                  <span>7 PIERCES</span>
                </div>
              </div>

              {/* Feature List Strip */}
              <div className="cad-features-chip-list">
                {DEMO_CAD_ENTITIES.map((ent) => (
                  <button
                    key={ent.id}
                    className={`cad-feature-chip ${hoveredCadEntity?.id === ent.id ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredCadEntity(ent)}
                    onClick={() => setHoveredCadEntity(ent)}
                  >
                    <span className="chip-type-dot" style={{ backgroundColor: ent.highlightColor }} />
                    <span className="chip-name">{ent.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Side Inspection Panel Required by Part 4: FEATURE, TYPE, GEOMETRY */}
            <aside className="cad-feature-inspector-aside">
              <div className="inspector-aside-header">
                <span className="aside-eyebrow">FEATURE INSPECTION</span>
                <h4 className="aside-title">{hoveredCadEntity?.name}</h4>
              </div>

              <div className="aside-data-group">
                <span className="aside-data-label">FEATURE:</span>
                <span className="aside-data-val">{hoveredCadEntity?.name}</span>
              </div>

              <div className="aside-data-group">
                <span className="aside-data-label">TYPE:</span>
                <span className="aside-data-val mono">{hoveredCadEntity?.type}</span>
              </div>

              <div className="aside-data-group">
                <span className="aside-data-label">GEOMETRY:</span>
                <p className="aside-data-desc">{hoveredCadEntity?.geometry}</p>
              </div>

              <div className="aside-data-group">
                <span className="aside-data-label">LASER PIERCE COUNT:</span>
                <span className="aside-data-val mono">{hoveredCadEntity?.pierce} Pierce Operation</span>
              </div>

              <div className="aside-data-group">
                <span className="aside-data-label">PARSING METHOD:</span>
                <span className="aside-data-val">NetworkX Cycle Basis G(V, E)</span>
              </div>

              <div className="aside-footer-note">
                <strong>ZERO HALLUCINATION GUARANTEE:</strong> Geometry calculated using deterministic Euclidean graph math in Python, completely isolating spatial reasoning from LLM tokens.
              </div>
            </aside>
          </div>
        )}

        {/* =========================================================================
            TAB 4: VISUAL AI PIPELINE (Document -> Pydantic Validation)
           ========================================================================= */}
        {activeTab === 'ai-pipeline' && (
          <div className="forgeiq-ai-pipeline-layout">
            <div className="ai-pipeline-header-block">
              <h3 className="ai-pipeline-title">GUARDRAILED AI ADVISORY PIPELINE</h3>
              <p className="ai-pipeline-subtitle">
                How ForgeIQ applies LLM reasoning strictly to unstructured title-block text and surface finish notes, while isolating all geometric pricing math in deterministic code.
              </p>
            </div>

            <div className="ai-pipeline-flow-container">
              {[
                {
                  step: '01',
                  title: 'INPUT',
                  subtitle: 'Engineering Drawing & Notes',
                  desc: 'Unstructured customer title blocks, notes ("Hard anodize Type III"), and drawing metadata.',
                  tech: 'PDF / OCR / Text Stream'
                },
                {
                  step: '02',
                  title: 'DOCUMENT UNDERSTANDING',
                  subtitle: 'Section Classification',
                  desc: 'Separates drawing title block, revision table, and notes into structured text partitions.',
                  tech: 'Pydantic Regex & Layout Parser'
                },
                {
                  step: '03',
                  title: 'REQUIREMENT EXTRACTION',
                  subtitle: 'Entity Extraction',
                  desc: 'Extracts alloy callout (AL6061-T6), surface treatment (MIL-A-8625 Type II), and DIN ISO 2768 tolerances.',
                  tech: 'FastAPI Schemas'
                },
                {
                  step: '04',
                  title: 'RETRIEVAL',
                  subtitle: 'Supplier Capability Index',
                  desc: 'Queries pgvector database using cosine similarity against audited supplier machining capabilities.',
                  tech: 'PostgreSQL pgvector (1536-dim)'
                },
                {
                  step: '05',
                  title: 'AI PROVIDER',
                  subtitle: 'Provider Abstraction',
                  desc: 'Routes prompt to Gemini 2.5 Flash with cached system context and LiteLLM fallback safety.',
                  tech: 'LiteLLM + Gemini 2.5 Flash'
                },
                {
                  step: '06',
                  title: 'STRUCTURED OUTPUT',
                  subtitle: 'Strict Pydantic JSON',
                  desc: 'Forces JSON output conforming strictly to Pydantic models. Zero free-form chat generation.',
                  tech: 'Pydantic v2 BaseModels'
                },
                {
                  step: '07',
                  title: 'VALIDATION',
                  subtitle: 'Feasibility Guardrail',
                  desc: 'Deterministic rules check minimum wall thickness, thread pitch feasibility, and margin safety thresholds.',
                  tech: 'Automated Feasibility Engine'
                }
              ].map((stage, i) => (
                <div key={i} className="ai-pipeline-card">
                  <div className="stage-step-tag">STAGE {stage.step}</div>
                  <h4 className="stage-title">{stage.title}</h4>
                  <div className="stage-subtitle">{stage.subtitle}</div>
                  <p className="stage-desc">{stage.desc}</p>
                  <div className="stage-tech-tag">{stage.tech}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: DETERMINISTIC GEOMETRY ENGINE (3D System Core)
           ========================================================================= */}
        {activeTab === 'architecture' && (
          <div className="os-tab-pane">
            <div className="os-system-core-container">
              <ForgeIQSystemCore />
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--os-text-body)' }}>
                <span>CAD TOPOLOGY ENGINE // </span>
                <span style={{ color: 'var(--os-accent)' }}>REAL-TIME DATA FLOW</span>
              </div>
              <button 
                className="forgeiq-action-pill"
                onClick={() => setShowInspectorModal(true)}
              >
                <Maximize2 size={13} />
                <span>INSPECT SYSTEM ARCHITECTURE</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL 1: ARCHITECTURE INSPECTOR ([ INSPECT SYSTEM ])
         ========================================================================= */}
      {showInspectorModal && (
        <div className="forgeiq-modal-overlay" onClick={() => setShowInspectorModal(false)}>
          <div className="forgeiq-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <div>
                <span className="modal-eyebrow">SYSTEM ARCHITECTURE INSPECTION</span>
                <h3 className="modal-title">ForgeIQ Full-Stack Engineering Blueprint</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setShowInspectorModal(false)}
                aria-label="Close Architecture Inspector"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-card-body">
              <div className="arch-inspector-grid">
                {[
                  {
                    title: 'FRONTEND',
                    tech: 'Next.js 15 / React 19 / TypeScript',
                    desc: 'Zero Tailwind bloat. Built with custom Vanilla CSS design tokens, SVG vector engines, and WebGL topology visualizers for 60fps rendering.',
                    files: 'frontend/src/app, frontend/src/components'
                  },
                  {
                    title: 'BACKEND',
                    tech: 'FastAPI / Python 3.12 / AsyncIO',
                    desc: '40+ REST API endpoints documented via OpenAPI 3.1. Asynchronous execution handles CPU-bound CAD parsing via worker thread pools.',
                    files: 'backend/api/v1, backend/services'
                  },
                  {
                    title: 'DATABASE',
                    tech: 'PostgreSQL 16 / pgvector / JSONB',
                    desc: 'Relational ACID schema for orders and financial quotations combined with JSONB for flexible RFQ specifications and pgvector for semantic retrieval.',
                    files: 'backend/models, supabase/migrations'
                  },
                  {
                    title: 'AI',
                    tech: 'Provider Abstraction (LiteLLM + Gemini 2.5 Flash)',
                    desc: 'Abstracted LLM interface preventing vendor lock-in. Prompt caching reduces LLM cost by 78% on repetitive title block extractions.',
                    files: 'backend/ai/quotation_engine.py'
                  },
                  {
                    title: 'RETRIEVAL',
                    tech: 'Hybrid Cosine + Metadata Index',
                    desc: '1536-dimensional embeddings for manufacturer capabilities combined with exact SQL filters for CNC machine envelope constraints.',
                    files: 'backend/services/supplier_matching.py'
                  },
                  {
                    title: 'AUTH',
                    tech: 'Supabase JWT + Multi-Tenant RBAC',
                    desc: 'Stateless JWT tokens verified at API boundaries. Row Level Security (RLS) guarantees suppliers only see RFQs dispatched to them.',
                    files: 'backend/core/security.py'
                  },
                  {
                    title: 'TESTING',
                    tech: '33 Pytest Tests + 14 Playwright E2E Tests',
                    desc: 'Automated CI/CD validation covering KD-Tree 0.01mm vertex snapping, pricing formula accuracy, and browser purchase lifecycle.',
                    files: 'backend/tests, e2e/order_lifecycle.spec.ts'
                  }
                ].map((item, i) => (
                  <div key={i} className="arch-item-card">
                    <div className="arch-item-top">
                      <span className="arch-item-title">{item.title}</span>
                      <span className="arch-item-tech">{item.tech}</span>
                    </div>
                    <p className="arch-item-desc">{item.desc}</p>
                    <div className="arch-item-files">
                      <code>{item.files}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-card-footer">
              <Link 
                href="/engineering" 
                className="btn btn-primary"
                onClick={() => setShowInspectorModal(false)}
              >
                <span>Explore Full Engineering Lab</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: WHY? ENGINEERING DECISIONS MODAL
         ========================================================================= */}
      {showWhyModal && (
        <div className="forgeiq-modal-overlay" onClick={() => setShowWhyModal(false)}>
          <div className="forgeiq-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <div>
                <span className="modal-eyebrow">DECISION LOGIC & TRADE-OFFS</span>
                <h3 className="modal-title">Why These Specific Engineering Decisions?</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setShowWhyModal(false)}
                aria-label="Close Why Modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-card-body">
              <div className="why-decisions-list">
                <div className="why-card">
                  <h4 className="why-title">Why PostgreSQL?</h4>
                  <p className="why-body">
                    Manufacturing orders involve financial quotes, escrow payouts, and immutable status histories. PostgreSQL delivers ACID transactions for financial integrity while the <code>pgvector</code> extension consolidates vector search and relational data into a single database, eliminating the operational overhead of a separate vector DB.
                  </p>
                </div>

                <div className="why-card">
                  <h4 className="why-title">Why FastAPI?</h4>
                  <p className="why-body">
                    CAD geometry computation relies heavily on Python scientific ecosystem (<code>ezdxf</code>, <code>NetworkX</code>, <code>scipy</code>). FastAPI delivers native async execution, automatic OpenAPI 3.1 schema generation, and strict Pydantic v2 serialization with sub-15ms overhead.
                  </p>
                </div>

                <div className="why-card">
                  <h4 className="why-title">Why Deterministic CAD Parsing?</h4>
                  <p className="why-body">
                    Large Language Models are probabilistic and frequently hallucinate spatial dimensions, miscounting vertices and fabricating piercing coordinates. Manufacturing demands 0.01mm precision. Geometry extraction is handled 100% deterministically in Python graph algorithms; AI is restricted purely to unstructured title-block text notes.
                  </p>
                </div>

                <div className="why-card">
                  <h4 className="why-title">Why Provider Abstraction?</h4>
                  <p className="why-body">
                    Direct vendor SDKs create brittle dependencies. The provider abstraction layer decouples ForgeIQ from any single LLM vendor, allowing dynamic fallback routing between Gemini 2.5 Flash, Anthropic, and local Ollama instances without code changes.
                  </p>
                </div>

                <div className="why-card">
                  <h4 className="why-title">Why E2E Testing with Playwright?</h4>
                  <p className="why-body">
                    Manufacturing workflows span multi-tenant user personas: buyer RFQ submission, supplier quotation, CAM inspection, and escrow settlement. Unit tests alone cannot verify cross-system race conditions or session handoffs. Playwright validates the end-to-end browser ordering lifecycle.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-card-footer">
              <Link 
                href="/engineering/decisions" 
                className="btn btn-primary"
                onClick={() => setShowWhyModal(false)}
              >
                <span>Read All 10 Architecture Decision Records (ADRs) ↗</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: EVIDENCE METRIC DRILLDOWN MODAL
         ========================================================================= */}
      {selectedEvidenceMetric && (
        <div className="forgeiq-modal-overlay" onClick={() => setSelectedEvidenceMetric(null)}>
          <div className="forgeiq-modal-card metric-drilldown" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <div>
                <span className="modal-eyebrow">VERIFIED RESUME EVIDENCE</span>
                <h3 className="modal-title">
                  {selectedEvidenceMetric === 'api' && '40+ REST API Endpoints'}
                  {selectedEvidenceMetric === 'pricing' && '96.9% Pricing Model Accuracy'}
                  {selectedEvidenceMetric === 'pytest' && '33/33 Pytest Tests Passing'}
                  {selectedEvidenceMetric === 'e2e' && '14 Playwright E2E Tests'}
                  {selectedEvidenceMetric === 'throughput' && '5.5× Throughput Optimization'}
                </h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedEvidenceMetric(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-card-body">
              {selectedEvidenceMetric === 'api' && (
                <div>
                  <p style={{ color: 'var(--os-text-body)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Documented under OpenAPI 3.1 with strict Pydantic v2 schemas. Spans RFQ submission, CAD geometry ingestion, supplier matching, automated pricing, and WebSocket order tracking.
                  </p>
                  <pre className="code-block" style={{ fontSize: '0.75rem', padding: '0.85rem' }}>
{`POST /api/v1/rfq/upload-cad
POST /api/v1/pricing/calculate-bom
GET  /api/v1/suppliers/matched-vendors
POST /api/v1/orders/fsm-transition
WS   /api/v1/telemetry/live-order-stream`}
                  </pre>
                </div>
              )}

              {selectedEvidenceMetric === 'pricing' && (
                <div>
                  <p style={{ color: 'var(--os-text-body)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Validated across 12 benchmark sheet-metal geometries against real-world shop floor invoices. Achieved 96.9% Pearson correlation with final supplier bids.
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '4px' }}>
                    <code>Cost = (Material_Mass * Raw_Kg_Price) + (Cutting_Perimeter / Laser_Speed * Machine_Rate) + (Pierces * Pierce_Fee) + Surface_Finish_Fixed</code>
                  </div>
                </div>
              )}

              {selectedEvidenceMetric === 'pytest' && (
                <div>
                  <p style={{ color: 'var(--os-text-body)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    33 unit and integration tests covering vertex snapping, KD-Tree clustering tolerance, cycle basis loop resolution, and Pydantic validation failures.
                  </p>
                  <pre className="code-block" style={{ fontSize: '0.75rem', padding: '0.85rem' }}>
{`backend/tests/test_cad_preprocessor.py ........ [ 24%]
backend/tests/test_pricing_engine.py   ........ [ 48%]
backend/tests/test_order_fsm.py        ........ [ 72%]
backend/tests/test_supplier_match.py   ......... [100%]
33 passed in 1.42s`}
                  </pre>
                </div>
              )}

              {selectedEvidenceMetric === 'e2e' && (
                <div>
                  <p style={{ color: 'var(--os-text-body)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    14 Playwright browser end-to-end tests validating multi-tenant buyer uploads, supplier quotation bidding, and full escrow release checkout in headless Chromium.
                  </p>
                  <pre className="code-block" style={{ fontSize: '0.75rem', padding: '0.85rem' }}>
{`✓ e2e/order_lifecycle.spec.ts:18:3 › Buyer creates RFQ (1.2s)
✓ e2e/order_lifecycle.spec.ts:42:3 › CAD preprocessor renders contours (890ms)
✓ e2e/order_lifecycle.spec.ts:68:3 › Supplier accepts purchase order (1.1s)
14 passed (12.4s)`}
                  </pre>
                </div>
              )}

              {selectedEvidenceMetric === 'throughput' && (
                <div>
                  <p style={{ color: 'var(--os-text-body)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Load-tested with Locust: tuning connection pooling and consolidating vector indexes in PostgreSQL increased throughput from 860 req/s to 4,589 req/s (5.5× gain).
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '4px' }}>
                    <code>BASELINE: 860 req/s @ 95ms latency → OPTIMIZED: 4,589 req/s @ 17ms latency (5.5x throughput improvement)</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
