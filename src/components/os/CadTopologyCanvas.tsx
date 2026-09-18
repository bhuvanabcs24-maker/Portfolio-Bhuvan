'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Play, ShieldAlert, CheckCircle2, Sliders } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Segment {
  start: Point;
  end: Point;
}

export default function CadTopologyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tolerance, setTolerance] = useState(12); // snapping pixel radius
  const [showSnapping, setShowSnapping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState({
    rawEntities: 14,
    microGapsDetected: 5,
    snappedNodes: 9,
    closedPolygons: 2,
    cuttingPerimeterMm: 482.4,
    laserPierces: 2
  });

  // Synthetic CAD geometry representing a manufacturing bracket with 1 outer boundary & 1 inner bolt hole
  // intentionally crafted with human drafting micro-gaps (3px to 10px gaps)
  const baseSegments: Segment[] = [
    // Outer boundary (rectangle-like bracket with chamfer)
    { start: { x: 80, y: 80 }, end: { x: 380, y: 80 } },
    { start: { x: 385, y: 84 }, end: { x: 460, y: 160 } }, // Micro-gap from (380,80)
    { start: { x: 460, y: 160 }, end: { x: 460, y: 320 } },
    { start: { x: 460, y: 320 }, end: { x: 80, y: 320 } },
    { start: { x: 76, y: 316 }, end: { x: 80, y: 80 } }, // Micro-gap at corner

    // Internal mounting slot (closed polygon with micro-gap)
    { start: { x: 160, y: 160 }, end: { x: 280, y: 160 } },
    { start: { x: 284, y: 163 }, end: { x: 280, y: 240 } }, // Micro-gap
    { start: { x: 280, y: 240 }, end: { x: 160, y: 240 } },
    { start: { x: 160, y: 240 }, end: { x: 160, y: 160 } },

    // Additional cross-rib indicator
    { start: { x: 340, y: 180 }, end: { x: 400, y: 180 } },
    { start: { x: 400, y: 180 }, end: { x: 400, y: 240 } },
    { start: { x: 400, y: 240 }, end: { x: 340, y: 240 } },
    { start: { x: 340, y: 240 }, end: { x: 340, y: 180 } }
  ];

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Clear background
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, width, height);

    // Draw engineering millimeter grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Identify endpoints to show KD-Tree clustering
    const points: Point[] = [];
    baseSegments.forEach((seg) => {
      points.push(seg.start);
      points.push(seg.end);
    });

    // Draw raw segments
    baseSegments.forEach((seg) => {
      ctx.beginPath();
      ctx.moveTo(seg.start.x, seg.start.y);
      ctx.lineTo(seg.end.x, seg.end.y);
      ctx.strokeStyle = showSnapping ? '#3b82f6' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    // If snapping is enabled, draw KD-Tree clustering bubbles and snapped nodes
    if (showSnapping) {
      // Find pairs that are within tolerance
      const clustered: { p1: Point; p2: Point; mid: Point }[] = [];
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist <= tolerance) {
            clustered.push({
              p1: points[i],
              p2: points[j],
              mid: { x: (points[i].x + points[j].x) / 2, y: (points[i].y + points[j].y) / 2 }
            });
          }
        }
      }

      // Draw snapping radius halos
      clustered.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.mid.x, c.mid.y, tolerance, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Snapped unified coordinate
        ctx.beginPath();
        ctx.arc(c.mid.x, c.mid.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      });

      // Draw all endpoints
      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#93c5fd';
        ctx.fill();
      });
    } else {
      // Draw raw red disjoint vertices
      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
      });
    }
  };

  useEffect(() => {
    renderCanvas();
    window.addEventListener('resize', renderCanvas);
    return () => window.removeEventListener('resize', renderCanvas);
  }, [tolerance, showSnapping]);

  const runAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMetrics({
        rawEntities: 14,
        microGapsDetected: tolerance < 8 ? 0 : 5,
        snappedNodes: tolerance < 8 ? 14 : 9,
        closedPolygons: tolerance < 8 ? 0 : 3,
        cuttingPerimeterMm: tolerance < 8 ? 0 : 512.6,
        laserPierces: tolerance < 8 ? 0 : 3
      });
      renderCanvas();
    }, 400);
  };

  return (
    <div className="cad-viewer-container">
      {/* Top Controls Bar */}
      <div className="cad-controls-bar">
        <div className="cad-controls-left">
          <button 
            className={`btn btn-sm ${showSnapping ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowSnapping(!showSnapping)}
          >
            {showSnapping ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
            <span>{showSnapping ? 'KD-Tree Snapping Active' : 'Raw Disjoint Gaps'}</span>
          </button>

          <div className="cad-slider-group">
            <Sliders size={14} color="#94a3b8" />
            <span className="cad-slider-label">Snap Radius:</span>
            <input 
              type="range" 
              min="4" 
              max="24" 
              value={tolerance}
              onChange={(e) => setTolerance(Number(e.target.value))}
              className="cad-slider"
            />
            <span className="cad-slider-val">{tolerance}px (~0.0{(tolerance / 10).toFixed(1)}mm)</span>
          </div>
        </div>

        <button 
          className="btn btn-sm btn-secondary" 
          onClick={runAnalysis}
          disabled={isProcessing}
        >
          <RefreshCw size={13} className={isProcessing ? 'spin-icon' : ''} />
          <span>Re-evaluate Geometry</span>
        </button>
      </div>

      {/* Canvas Area */}
      <div className="cad-canvas-wrapper">
        <canvas ref={canvasRef} className="cad-canvas" />

        {/* Overlay Telematics Badge */}
        <div className="cad-canvas-badge">
          <div className="cad-badge-title">ezdxf + networkx geometry engine</div>
          <div className="cad-badge-sub">Simulating AutoCAD 2D drafting micro-gap unification</div>
        </div>
      </div>

      {/* Telematics Readout Matrix */}
      <div className="cad-telematics-grid">
        <div className="cad-telem-card">
          <div className="cad-telem-val" style={{ color: '#60a5fa' }}>{metrics.rawEntities}</div>
          <div className="cad-telem-lbl">Raw Entities</div>
        </div>
        <div className="cad-telem-card">
          <div className="cad-telem-val" style={{ color: '#f59e0b' }}>{metrics.microGapsDetected}</div>
          <div className="cad-telem-lbl">Micro-gaps Snapped</div>
        </div>
        <div className="cad-telem-card">
          <div className="cad-telem-val" style={{ color: '#34d399' }}>{metrics.closedPolygons}</div>
          <div className="cad-telem-lbl">Closed Polygons</div>
        </div>
        <div className="cad-telem-card">
          <div className="cad-telem-val" style={{ color: '#a855f7' }}>{metrics.cuttingPerimeterMm} mm</div>
          <div className="cad-telem-lbl">Total Cutting Length</div>
        </div>
        <div className="cad-telem-card">
          <div className="cad-telem-val" style={{ color: '#fbbf24' }}>{metrics.laserPierces}</div>
          <div className="cad-telem-lbl">Laser Pierces</div>
        </div>
      </div>
    </div>
  );
}
