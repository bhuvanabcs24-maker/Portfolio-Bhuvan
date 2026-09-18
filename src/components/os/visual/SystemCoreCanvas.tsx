'use client';

import React, { useEffect, useRef } from 'react';

interface SystemCoreCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  isPrimary?: boolean;
}

interface Edge {
  from: number;
  to: number;
  pulseProgress: number;
  pulseSpeed: number;
}

/**
 * SystemCoreCanvas
 * Interactive topological engineering system visualization:
 * - Deterministic geometric nodes, connecting transmission vectors, and data packet pulses.
 * - Subtle cursor parallax tracking.
 * - Pure HTML5 Canvas 2D, zero dependencies, lightweight and responsive.
 */
export default function SystemCoreCanvas({ className = '', style }: SystemCoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, relativeX));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, relativeY));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Engineering system topology nodes (normalized 0..1 coordinates)
    const baseNodes: Node[] = [
      { id: 'CORE', x: 0.5, y: 0.5, label: 'SYSTEM_CORE', isPrimary: true },
      { id: 'CAD', x: 0.22, y: 0.32, label: 'CAD_ENGINE' },
      { id: 'AI', x: 0.78, y: 0.28, label: 'AI_INFERENCE' },
      { id: 'GRAPH', x: 0.28, y: 0.72, label: 'TOPOLOGY_G' },
      { id: 'FAST', x: 0.74, y: 0.75, label: 'CONCUR_POOL' },
      { id: 'PGVEC', x: 0.5, y: 0.16, label: 'PGVECTOR' },
      { id: 'ESCROW', x: 0.5, y: 0.86, label: 'PROD_PIPELINE' },
    ];

    const edges: Edge[] = [
      { from: 0, to: 1, pulseProgress: 0.1, pulseSpeed: 0.007 },
      { from: 0, to: 2, pulseProgress: 0.4, pulseSpeed: 0.009 },
      { from: 0, to: 3, pulseProgress: 0.7, pulseSpeed: 0.006 },
      { from: 0, to: 4, pulseProgress: 0.2, pulseSpeed: 0.008 },
      { from: 0, to: 5, pulseProgress: 0.5, pulseSpeed: 0.01 },
      { from: 0, to: 6, pulseProgress: 0.8, pulseSpeed: 0.007 },
      { from: 1, to: 3, pulseProgress: 0.3, pulseSpeed: 0.005 },
      { from: 2, to: 4, pulseProgress: 0.6, pulseSpeed: 0.006 },
      { from: 5, to: 2, pulseProgress: 0.15, pulseSpeed: 0.008 },
    ];

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Parallax damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const offsetX = mouseRef.current.x * 12;
      const offsetY = mouseRef.current.y * 12;

      ctx.clearRect(0, 0, width, height);

      // Coordinate axes crosshair in background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 + offsetX * 0.3, 0);
      ctx.lineTo(width / 2 + offsetX * 0.3, height);
      ctx.moveTo(0, height / 2 + offsetY * 0.3);
      ctx.lineTo(width, height / 2 + offsetY * 0.3);
      ctx.stroke();

      // Resolve absolute positions with parallax
      const computedNodes = baseNodes.map((n) => {
        const depth = n.isPrimary ? 1.4 : 1.0;
        return {
          ...n,
          absX: n.x * width + offsetX * depth,
          absY: n.y * height + offsetY * depth,
        };
      });

      // Draw transmission vectors (edges)
      edges.forEach((edge) => {
        const p1 = computedNodes[edge.from];
        const p2 = computedNodes[edge.to];
        if (!p1 || !p2) return;

        // Base line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(p1.absX, p1.absY);
        ctx.lineTo(p2.absX, p2.absY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated data packet pulse
        edge.pulseProgress = (edge.pulseProgress + edge.pulseSpeed) % 1;
        const packetX = p1.absX + (p2.absX - p1.absX) * edge.pulseProgress;
        const packetY = p1.absY + (p2.absY - p1.absY) * edge.pulseProgress;

        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      computedNodes.forEach((node) => {
        const isPrimary = node.isPrimary;
        const radius = isPrimary ? 5 : 3.5;

        // Outer halo
        if (isPrimary) {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.absX, node.absY, 14, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner node body
        ctx.fillStyle = isPrimary ? '#f59e0b' : '#0e1014';
        ctx.strokeStyle = isPrimary ? '#f59e0b' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.absX, node.absY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Technical Node Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = isPrimary ? '#f59e0b' : 'rgba(148, 163, 184, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, node.absX, node.absY + (isPrimary ? 18 : 8));
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`os-system-core-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
