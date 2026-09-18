'use client';

import React, { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  label?: string;
}

export default function EngineeringCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create persistent system nodes
    const nodeLabels = [
      'FastAPI:40+',
      'KD-Tree:0.01mm',
      'PostgreSQL',
      'pgvector',
      'Celery:5.5x',
      'Redis:Queue',
      'ezdxf:Cycles',
      'Pydantic:v2',
      'Next.js:15',
      'Supabase:RLS',
      'Pytest:47'
    ];

    const nodesCount = 28;
    const nodes: Node[] = [];

    for (let i = 0; i < nodesCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        label: i < nodeLabels.length ? nodeLabels[i] : undefined
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle dark background fill
      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, width, height);

      // 2. Blueprint / Engineering isometric dot grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      const step = 36;
      for (let gx = 0; gx < width; gx += step) {
        for (let gy = 0; gy < height; gy += step) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Connect nodes with distance lines
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw nodes with mouse interaction
      nodes.forEach((node) => {
        // Move with velocity
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse repulsion physics
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const maxMouseDist = 120;

        if (mDist < maxMouseDist && mDist > 0) {
          const force = (1 - mDist / maxMouseDist) * 3;
          node.x += (mdx / mDist) * force;
          node.y += (mdy / mDist) * force;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.label ? 'rgba(96, 165, 250, 0.7)' : 'rgba(148, 163, 184, 0.4)';
        ctx.fill();

        // Node label
        if (node.label) {
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
          ctx.fillText(node.label, node.x + 6, node.y + 3);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="os-desktop-canvas"
      aria-hidden="true"
    />
  );
}
