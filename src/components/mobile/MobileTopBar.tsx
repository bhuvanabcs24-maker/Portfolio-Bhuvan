'use client';

import React, { useState } from 'react';
import { useOS } from '@/components/os/OSContext';
import {
  Search,
  Menu,
  Zap,
  Cpu,
  Package,
  BookOpen,
  User,
  Mail,
  Terminal,
  FileDown,
  X,
  Command,
} from 'lucide-react';

export default function MobileTopBar() {
  const { toggleCommandPalette, exitWorkspace } = useOS();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const modules = [
    { id: 'forgeiq', code: '02', label: 'FORGEIQ', desc: 'AI Manufacturing Intelligence', icon: <Zap size={20} aria-hidden="true" /> },
    { id: 'lab', code: '03', label: 'ENGINEERING LAB', desc: '10 ADRs · AI Eval · Patterns', icon: <Cpu size={20} aria-hidden="true" /> },
    { id: 'opensource', code: '04', label: 'OPEN SOURCE', desc: 'dxf-contour-extractor', icon: <Package size={20} aria-hidden="true" /> },
    { id: 'notes', code: '05', label: 'NOTES', desc: 'Engineering Writing', icon: <BookOpen size={20} aria-hidden="true" /> },
    { id: 'profile', code: '06', label: 'PROFILE', desc: 'Bhuvan A B · BMSCE 2028', icon: <User size={20} aria-hidden="true" /> },
    { id: 'contact', code: '07', label: 'CONTACT', desc: 'Communication Terminal', icon: <Mail size={20} aria-hidden="true" /> },
    { id: 'system', code: '01', label: 'SYSTEM', desc: 'Shell & Diagnostics', icon: <Terminal size={20} aria-hidden="true" /> },
  ];

  const handleScroll = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(`mb-section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="mb-topbar" role="banner">
        {/* Brand */}
        <div className="mb-topbar-brand">
          <span className="mb-topbar-logo">BHUVAN</span>
          <span className="mb-topbar-status" aria-label="System online">
            <span className="mb-topbar-dot" aria-hidden="true" />
            <span>ONLINE</span>
          </span>
        </div>

        {/* Controls */}
        <div className="mb-topbar-controls">
          <button
            className="mb-topbar-btn"
            onClick={toggleCommandPalette}
            aria-label="Open Command Palette"
            title="Search (⌘K)"
          >
            <Command size={16} aria-hidden="true" />
            <span>⌘K</span>
          </button>

          <button
            className="mb-topbar-btn mb-topbar-menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Navigation Bottom Drawer */}
      {drawerOpen && (
        <>
          <div
            className="mb-nav-backdrop"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="mb-nav-drawer"
            role="navigation"
            aria-label="System modules"
          >
            {/* Drawer handle */}
            <div className="mb-handle-bar" aria-hidden="true" />

            {/* Drawer header */}
            <div className="mb-nav-drawer-head">
              <div className="mb-nav-drawer-brand">
                <span className="mb-topbar-logo">BHUVAN</span>
                <span className="mb-topbar-status">
                  <span className="mb-topbar-dot" aria-hidden="true" />
                  <span>ONLINE</span>
                </span>
              </div>
              <button
                className="mb-nav-drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Command palette shortcut */}
            <button
              className="mb-nav-search-row"
              onClick={() => { setDrawerOpen(false); toggleCommandPalette(); }}
              aria-label="Open command palette"
            >
              <Search size={15} aria-hidden="true" />
              <span>Search BHUVAN</span>
              <span className="mb-nav-key-pill">⌘K</span>
            </button>

            {/* Module list */}
            <div className="mb-nav-modules" role="list">
              <div className="mb-nav-section-label">SYSTEM MODULES</div>
              {modules.map((m) => (
                <button
                  key={m.id}
                  className="mb-nav-module-row"
                  onClick={() => handleScroll(m.id)}
                  role="listitem"
                  aria-label={`Navigate to ${m.label}`}
                >
                  <span className="mb-nav-mod-icon">{m.icon}</span>
                  <span className="mb-nav-mod-text">
                    <span className="mb-nav-mod-code">{m.code}</span>
                    <span className="mb-nav-mod-label">{m.label}</span>
                    <span className="mb-nav-mod-desc">{m.desc}</span>
                  </span>
                  <span className="mb-nav-mod-arrow">›</span>
                </button>
              ))}

              {/* Resume */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-nav-module-row mb-nav-resume-row"
                aria-label="Download resume PDF"
              >
                <span className="mb-nav-mod-icon"><FileDown size={20} aria-hidden="true" /></span>
                <span className="mb-nav-mod-text">
                  <span className="mb-nav-mod-code">DOC</span>
                  <span className="mb-nav-mod-label">RESUME.PDF</span>
                  <span className="mb-nav-mod-desc">Download verified PDF</span>
                </span>
                <span className="mb-nav-mod-arrow">↗</span>
              </a>
            </div>

            {/* Exit */}
            <button
              className="mb-nav-exit-btn"
              onClick={() => { setDrawerOpen(false); exitWorkspace(); }}
            >
              ⎋ EXIT WORKSPACE
            </button>
          </nav>
        </>
      )}
    </>
  );
}
