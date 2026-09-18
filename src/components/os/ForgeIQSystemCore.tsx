'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

interface Edge {
  p1: number;
  p2: number;
  flowProgress: number;
  speed: number;
}

export default function ForgeIQSystemCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      setIsSupported(false);
      return;
    }

    if (!ctx) {
      setIsSupported(false);
      return;
    }

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    // 3D Geometry Vertices: Representing CAD topology & System Core
    const baseVertices: Point3D[] = [
      { x: -100, y: -50, z: -50, label: 'Buyer' },
      { x: -40, y: -70, z: 20, label: 'Requirement' },
      { x: 0, y: -40, z: -70, label: 'CAD Parser' },
      { x: 50, y: -60, z: 30, label: 'AI/NLP' },
      { x: 100, y: -20, z: -40, label: 'Quotation' },
      { x: 80, y: 40, z: 50, label: 'Manufacturer' },
      { x: 20, y: 70, z: -30, label: 'Production' },
      { x: -50, y: 50, z: 40, label: 'Tracking' },
      { x: -90, y: 20, z: -20, label: 'Delivery' },
      // Core anchor vertex (Ground Truth Engine)
      { x: 0, y: 0, z: 0, label: '0.01mm KD-Tree' }
    ];

    // Edges connecting vertices
    const edges: Edge[] = [
      { p1: 0, p2: 1, flowProgress: 0.1, speed: 0.008 },
      { p1: 1, p2: 2, flowProgress: 0.3, speed: 0.009 },
      { p1: 2, p2: 3, flowProgress: 0.5, speed: 0.007 },
      { p1: 3, p2: 4, flowProgress: 0.7, speed: 0.010 },
      { p1: 4, p2: 5, flowProgress: 0.2, speed: 0.008 },
      { p1: 5, p2: 6, flowProgress: 0.4, speed: 0.009 },
      { p1: 6, p2: 7, flowProgress: 0.6, speed: 0.007 },
      { p1: 7, p2: 8, flowProgress: 0.8, speed: 0.008 },
      { p1: 8, p2: 0, flowProgress: 0.0, speed: 0.006 },
      // Spokes into Core anchor (vertex 9)
      { p1: 2, p2: 9, flowProgress: 0.2, speed: 0.012 },
      { p1: 4, p2: 9, flowProgress: 0.5, speed: 0.011 },
      { p1: 6, p2: 9, flowProgress: 0.8, speed: 0.010 }
    ];

    let angleX = 0.2;
    let angleY = 0.3;
    let targetAngleX = 0.2;
    let targetAngleY = 0.3;

    // Mouse movement interactive tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = nx * 0.8;
      targetAngleX = -ny * 0.5;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const fov = 320;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      if (!prefersReducedMotion) {
        angleY += (targetAngleY - angleY) * 0.05 + 0.003; // Gentle slow rotation
        angleX += (targetAngleX - angleX) * 0.05;
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Project 3D vertices to 2D
      const projected = baseVertices.map((v) => {
        // Rotate Y
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        // Rotate X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2 + 180);
        return {
          px: width / 2 + x1 * scale,
          py: height / 2 + y2 * scale,
          scale,
          label: v.label,
          z: z2
        };
      });

      // 1. Draw connecting 3D wireframe edges
      for (const edge of edges) {
        const p1 = projected[edge.p1];
        const p2 = projected[edge.p2];

        // Draw structural wireframe line
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animate dynamic data-flow packet pulse along the edge
        if (!prefersReducedMotion) {
          edge.flowProgress = (edge.flowProgress + edge.speed) % 1;
        }
        const pulseX = p1.px + (p2.px - p1.px) * edge.flowProgress;
        const pulseY = p1.py + (p2.py - p1.py) * edge.flowProgress;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 2. Draw 3D nodes sorted by depth (back to front)
      const sortedNodes = [...projected].sort((a, b) => a.z - b.z);

      for (const node of sortedNodes) {
        const isCore = node.label === '0.01mm KD-Tree';
        const nodeRadius = isCore ? 4.5 * node.scale : 3 * node.scale;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.px, node.py, nodeRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = isCore 
          ? 'rgba(16, 185, 129, 0.12)' 
          : 'rgba(56, 189, 248, 0.12)';
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.px, node.py, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isCore ? '#10b981' : '#38bdf8';
        ctx.fill();

        // Node label
        if (node.label && node.scale > 0.8) {
          ctx.font = '9px var(--font-mono)';
          ctx.fillStyle = isCore ? '#34d399' : '#94a3b8';
          ctx.fillText(node.label, node.px + 7, node.py + 3);
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="os-core-fallback" aria-label="ForgeIQ System Core Geometry">
        <span className="os-badge-mono">GEOMETRY CORE // 0.01mm KD-Tree Spatial Ground Truth</span>
      </div>
    );
  }

  return (
    <div className="os-system-core-container" aria-label="3D ForgeIQ System Core Visualization">
      <div className="os-system-core-badge">
        <span className="os-status-dot-sm" />
        <span>3D TOPOLOGY CORE // 10 NODES • 12 CONSTRAINTS</span>
      </div>
      <canvas 
        ref={canvasRef} 
        className="os-system-core-canvas"
        role="img"
        aria-label="3D interactive mesh demonstrating CAD topology parsing and data flow"
      />
    </div>
  );
}
