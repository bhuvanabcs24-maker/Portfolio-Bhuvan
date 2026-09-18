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
  X,
  User,
  CornerDownLeft
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Modules' | 'Engineering' | 'External Links';
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

  const { socials } = PORTFOLIO_DATA.personal;

  const items: PaletteItem[] = [
    {
      id: 'cmd-forgeiq',
      title: 'Open ForgeIQ',
      category: 'Modules',
      description: 'AI-powered manufacturing intelligence flagship platform',
      icon: <Zap size={16} color="#3b82f6" />,
      action: () => { openWindow('forgeiq'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-eng-lab',
      title: 'Open Engineering Lab',
      category: 'Modules',
      description: '10 ADRs, 8-dimension AI eval, 4 design patterns, 4 retrospectives',
      icon: <Cpu size={16} color="#a855f7" />,
      action: () => { openWindow('lab'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-adrs',
      title: 'Open Architecture Decisions',
      category: 'Engineering',
      description: '10 Architecture Decision Records (ADRs)',
      icon: <FileText size={16} color="#60a5fa" />,
      action: () => { openWindow('adrs'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-eval',
      title: 'Open AI Evaluation',
      category: 'Engineering',
      description: '8-dimension verification framework & test benchmarks',
      icon: <Activity size={16} color="#ec4899" />,
      action: () => { openWindow('eval-lab'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-patterns',
      title: 'Open Design Patterns',
      category: 'Engineering',
      description: '4 production system patterns (Provider Abstraction, Guardrails, FSM, RBAC)',
      icon: <Cpu size={16} color="#f59e0b" />,
      action: () => { openWindow('patterns'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-learnings',
      title: 'Open Engineering Learnings',
      category: 'Engineering',
      description: '4 failure retrospectives & root-cause mitigations',
      icon: <Activity size={16} color="#ef4444" />,
      action: () => { openWindow('learnings'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-opensource',
      title: 'Open Open Source',
      category: 'Modules',
      description: 'dxf-contour-extractor live pipeline & package architecture',
      icon: <Package size={16} color="#06b6d4" />,
      action: () => { openWindow('opensource'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-notes',
      title: 'Open Notes',
      category: 'Modules',
      description: 'IDE technical writing workspace across 5 core topics',
      icon: <BookOpen size={16} color="#8b5cf6" />,
      action: () => { openWindow('notes'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-profile',
      title: 'Open Profile',
      category: 'Modules',
      description: 'Bhuvan A B — BMSCE (Expected 2028, CGPA 8.08), Skills, LeetCode 100+',
      icon: <User size={16} color="#94a3b8" />,
      action: () => { openWindow('profile'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-resume',
      title: 'Open Resume',
      category: 'External Links',
      description: 'Download official resume (PDF)',
      icon: <ExternalLink size={16} color="#e2e8f0" />,
      action: () => { window.open('/resume.pdf', '_blank'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-github',
      title: 'Open GitHub',
      category: 'External Links',
      description: 'https://github.com/bhuvanabcs24-maker',
      icon: <GithubIcon size={16} color="#34d399" />,
      action: () => { window.open(socials.github, '_blank'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-linkedin',
      title: 'Open LinkedIn',
      category: 'External Links',
      description: 'https://www.linkedin.com/in/bhuvan-a-b-4805a2330/',
      icon: <LinkedinIcon size={16} color="#38bdf8" />,
      action: () => { window.open(socials.linkedin, '_blank'); setCommandPaletteOpen(false); }
    },
    {
      id: 'cmd-leetcode',
      title: 'Open LeetCode',
      category: 'External Links',
      description: 'https://leetcode.com/u/BHUVANab2006/ (100+ Solved)',
      icon: <LeetCodeIcon size={16} color="#f97316" />,
      action: () => { window.open(socials.leetcode, '_blank'); setCommandPaletteOpen(false); }
    }
  ];

  // Filter items based on query
  const filteredItems = items.filter(item => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [commandPaletteOpen]);

  // Global Keyboard Listener: ⌘K / Ctrl+K and arrow keys inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }

      if (!commandPaletteOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, filteredItems, selectedIndex, setCommandPaletteOpen]);

  if (!commandPaletteOpen) {
    return null;
  }

  return (
    <div className="os-palette-backdrop" onClick={() => setCommandPaletteOpen(false)}>
      <div 
        className="os-palette-modal" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Header Input */}
        <div className="os-palette-header">
          <Search size={18} className="os-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="os-palette-input"
            placeholder="> Search Bhuvan.OS"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button 
            className="os-palette-close-btn" 
            onClick={() => setCommandPaletteOpen(false)}
            aria-label="Close Command Palette"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="os-palette-results">
          {filteredItems.length === 0 ? (
            <div className="os-palette-empty">
              <span>No commands matching &ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`os-palette-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="os-palette-item-icon">
                    {item.icon}
                  </div>
                  <div className="os-palette-item-info">
                    <div className="os-palette-item-title-row">
                      <span className="os-palette-item-title">{item.title}</span>
                      <span className="os-palette-item-category">{item.category}</span>
                    </div>
                    <span className="os-palette-item-desc">{item.description}</span>
                  </div>
                  {isSelected && (
                    <span className="os-palette-item-enter">
                      <CornerDownLeft size={13} />
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="os-palette-footer">
          <div className="os-palette-hint">
            <kbd className="os-kbd">↑</kbd>
            <kbd className="os-kbd">↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="os-palette-hint">
            <kbd className="os-kbd">↵</kbd>
            <span>Select</span>
          </div>
          <div className="os-palette-hint">
            <kbd className="os-kbd">ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
