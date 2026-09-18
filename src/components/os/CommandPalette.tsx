'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS, AppId } from './OSContext';
import { 
  Search, 
  Terminal, 
  Zap, 
  FileText, 
  Activity, 
  Cpu, 
  Package, 
  BookOpen, 
  Code2, 
  Mail, 
  ExternalLink,
  X
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    openWindow, 
    toggleMode 
  } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    {
      id: 'app-forgeiq',
      title: 'ForgeIQ Flagship Platform',
      category: 'Applications',
      description: 'Open 40+ endpoint CAD & pricing architecture showcase',
      icon: <Zap size={16} color="#3b82f6" />,
      action: () => { openWindow('forgeiq'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-terminal',
      title: 'Launch bhuvan-sh (zsh)',
      category: 'Applications',
      description: 'Open interactive engineering terminal',
      icon: <Terminal size={16} color="#10b981" />,
      action: () => { openWindow('terminal'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-cad',
      title: 'CAD Topology Visualizer',
      category: 'Applications',
      description: 'Interactive KD-Tree vertex snapping & polygon cycle canvas',
      icon: <Activity size={16} color="#a855f7" />,
      action: () => { openWindow('cad-viewer'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-adrs',
      title: 'Architecture Decisions (10 ADRs)',
      category: 'Architecture',
      description: 'PostgreSQL vs Mongo, FastAPI vs Express, pgvector, etc.',
      icon: <FileText size={16} color="#60a5fa" />,
      action: () => { openWindow('adrs'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-eval',
      title: 'AI Evaluation Lab',
      category: 'Engineering',
      description: '96.9% pricing benchmark, RAG precision, & JSON schema guardrails',
      icon: <Activity size={16} color="#ec4899" />,
      action: () => { openWindow('eval-lab'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-patterns',
      title: 'Production Design Patterns',
      category: 'Architecture',
      description: 'AI Provider Abstraction, CAD Guardrails, State Machine, RBAC',
      icon: <Cpu size={16} color="#f59e0b" />,
      action: () => { openWindow('patterns'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-learnings',
      title: 'Engineering Failures & Retrospectives',
      category: 'Engineering',
      description: '5.5x Celery concurrency gain, vector search tuning, schema migrations',
      icon: <Activity size={16} color="#ef4444" />,
      action: () => { openWindow('learnings'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-opensource',
      title: 'Open Source — dxf-contour-extractor',
      category: 'Open Source',
      description: 'Standalone Python package + extraction roadmap',
      icon: <Package size={16} color="#06b6d4" />,
      action: () => { openWindow('opensource'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-writing',
      title: 'Why CAD Understanding Is Difficult',
      category: 'Technical Notes',
      description: 'Published essay on geometry parsing vs vision AI models',
      icon: <BookOpen size={16} color="#8b5cf6" />,
      action: () => { openWindow('writing'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-leetcode',
      title: 'LeetCode Telemetry (100+ Solved)',
      category: 'Problem Solving',
      description: 'Algorithmic practice across trees, graphs, DP, arrays',
      icon: <Code2 size={16} color="#f97316" />,
      action: () => { openWindow('leetcode'); setCommandPaletteOpen(false); }
    },
    {
      id: 'sys-mode',
      title: 'Switch Display Mode',
      category: 'System',
      description: 'Toggle between OS Desktop Mode and Editorial Document Mode',
      icon: <FileText size={16} color="#94a3b8" />,
      action: () => { toggleMode(); setCommandPaletteOpen(false); }
    },
    {
      id: 'ext-resume',
      title: 'Download Official Resume (PDF)',
      category: 'External',
      description: 'Bhuvan A B — B.E. Computer Science, BMSCE (CGPA: 8.08)',
      icon: <ExternalLink size={16} color="#e2e8f0" />,
      action: () => { window.open('/resume.pdf', '_blank'); setCommandPaletteOpen(false); }
    },
    {
      id: 'app-contact',
      title: 'Contact Bhuvan (Recruiter Channel)',
      category: 'Contact',
      description: 'Direct recruiter email & outreach form',
      icon: <Mail size={16} color="#14b8a6" />,
      action: () => { openWindow('contact'); setCommandPaletteOpen(false); }
    }
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="os-palette-backdrop" onClick={() => setCommandPaletteOpen(false)}>
      <div className="os-palette-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="os-palette-input-row">
          <Search size={18} className="os-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="os-palette-input"
            placeholder="Search systems, ADRs, benchmarks, commands... (ESC to close)"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="os-palette-close-btn"
            onClick={() => setCommandPaletteOpen(false)}
            aria-label="Close spotlight"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="os-palette-results">
          {filteredItems.length === 0 ? (
            <div className="os-palette-empty">No results found for "{query}"</div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`os-palette-item ${idx === selectedIndex ? 'palette-item-selected' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="palette-item-icon-wrapper">
                  {item.icon}
                </div>
                <div className="palette-item-info">
                  <div className="palette-item-title-row">
                    <span className="palette-item-title">{item.title}</span>
                    <span className="palette-item-category">{item.category}</span>
                  </div>
                  <div className="palette-item-desc">{item.description}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut hints */}
        <div className="os-palette-footer">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span><strong>↵</strong> to select</span>
          <span><strong>ESC</strong> to dismiss</span>
        </div>
      </div>
    </div>
  );
}
