'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Package, CheckCircle2, Terminal } from 'lucide-react';
import { useOS } from '../OSContext';

export default function OpenSourceApp() {
  const { openWindow } = useOS();

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>
            Modular Architecture
          </div>
          <h2 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
            dxf-contour-extractor (v0.2.0-alpha)
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '0.2rem' }}>
            Extracted Python library for AutoCAD DXF planar cycle extraction, KD-Tree vertex snapping, and laser/CNC cutting perimeter calculations.
          </p>
        </div>

        {/* Code installation preview */}
        <div className="os-code-box">
          <div className="os-code-header">
            <span>Terminal Installation & Test Run</span>
          </div>
          <pre className="os-code-content">
{`# Run standalone package unit tests
python3 -m unittest discover -s packages/dxf-contour-extractor/tests

# Run bracket parsing demonstration
python3 packages/dxf-contour-extractor/examples/parse_sample_part.py`}
          </pre>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
            Decoupling & Extraction Roadmap
          </h3>
          <div className="os-roadmap-table">
            <div className="roadmap-row">
              <span className="badge badge-emerald">Extracted</span>
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

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => openWindow('cad-viewer')}
          >
            <span>Launch CAD Snapping Canvas</span>
          </button>
          <Link href="/opensource" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            <span>View Full Open Source Hub</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
