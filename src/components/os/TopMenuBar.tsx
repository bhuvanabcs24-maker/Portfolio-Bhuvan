'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from './OSContext';
import { 
  Command, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Monitor, 
  BookOpen,
  Search,
  X,
  Zap,
  Package,
  User,
  Mail,
  FileDown
} from 'lucide-react';

export default function TopMenuBar() {
  const { 
    mode, 
    toggleMode, 
    activeWindowId, 
    windows, 
    toggleCommandPalette, 
    openWindow,
    exitWorkspace
  } = useOS();
  const [timeStr, setTimeStr] = useState('');
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Bengaluru Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata timezone
      const timeFormatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTimeStr(`${timeFormatter.format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeWin = activeWindowId ? windows[activeWindowId] : null;

  return (
    <header className="os-topbar">
      {/* Left Menu Items */}
      <div className="os-topbar-left">
        <div className="os-brand" onClick={() => setSystemMenuOpen(!systemMenuOpen)}>
          <span className="os-apple-icon"></span>
          <span className="os-brand-name">BHUVAN.OS</span>
          <span className="os-kernel-badge">v2.4</span>
        </div>

        {/* System Dropdown */}
        {systemMenuOpen && (
          <div className="os-dropdown-menu" onMouseLeave={() => setSystemMenuOpen(false)}>
            <div className="os-dropdown-item" onClick={() => { openWindow('profile'); setSystemMenuOpen(false); }}>
              <Cpu size={14} />
              <span>About This Engineer (Profile)</span>
            </div>
            <div className="os-dropdown-item" onClick={() => { openWindow('forgeiq'); setSystemMenuOpen(false); }}>
              <ShieldCheck size={14} />
              <span>ForgeIQ Flagship</span>
            </div>
            <div className="os-dropdown-item" onClick={() => { openWindow('system'); setSystemMenuOpen(false); }}>
              <Terminal size={14} />
              <span>System & Shell Diagnostics</span>
            </div>
            <div className="os-dropdown-divider" />
            <div className="os-dropdown-item" onClick={() => { toggleMode(); setSystemMenuOpen(false); }}>
              <BookOpen size={14} />
              <span>Switch to {mode === 'os' ? 'Editorial Mode' : 'OS Desktop Mode'}</span>
            </div>
            <div className="os-dropdown-divider" />
            <div className="os-dropdown-item" onClick={() => { exitWorkspace(); setSystemMenuOpen(false); }}>
              <span style={{ color: '#ef4444' }}>⎋</span>
              <span style={{ color: '#ef4444' }}>Lock Screen / Exit Workspace</span>
            </div>
          </div>
        )}

        {/* Current Active Window Name */}
        <div className="os-current-app">
          {activeWin ? activeWin.title : 'Engineering Workspace'}
        </div>

        {/* Compact System Modules Launcher Bar */}
        <div className="os-topbar-modules-bar">
          {[
            { code: 'SYS', id: 'system' as const },
            { code: 'FORGEIQ', id: 'forgeiq' as const },
            { code: 'LAB', id: 'lab' as const },
            { code: 'OSS', id: 'opensource' as const },
            { code: 'NOTES', id: 'notes' as const },
            { code: 'PROFILE', id: 'profile' as const },
          ].map((m) => (
            <button
              key={m.code}
              className={`os-topbar-mod-btn ${activeWindowId === m.id ? 'active' : ''}`}
              onClick={() => openWindow(m.id)}
              title={`Open ${m.code} Module`}
            >
              [{m.code}]
            </button>
          ))}
        </div>
      </div>

      {/* Right Telematics & Controls */}
      <div className="os-topbar-right">
        {/* Automated Test Telematics Pill */}
        <div className="os-status-pill" title="47 Automated Tests (Pytest + Playwright)">
          <span className="os-status-dot" />
          <span className="os-status-text">47/47 Tests Passing</span>
        </div>

        {/* Mode Switcher Toggle */}
        <button 
          className="os-mode-toggle-btn"
          onClick={toggleMode}
          title={mode === 'os' ? "Switch to standard document view" : "Switch to interactive operating system"}
        >
          {mode === 'os' ? (
            <>
              <FileText size={13} />
              <span>Editorial Mode</span>
            </>
          ) : (
            <>
              <Monitor size={13} />
              <span>OS Desktop Mode</span>
            </>
          )}
        </button>

        {/* Command Palette Trigger */}
        <button 
          className="os-cmd-k-btn"
          onClick={toggleCommandPalette}
          title="Search systems & decisions (Cmd+K)"
        >
          <Command size={12} />
          <span>K</span>
        </button>

        {/* Mobile Controls: [ MENU ] + [ ⌘K ] */}
        <div className="os-mobile-header-controls">
          <button
            className="os-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open System Menu"
          >
            [ MENU ]
          </button>

          <button 
            className="os-cmd-k-btn mobile"
            onClick={toggleCommandPalette}
            title="Search systems (Cmd+K)"
            aria-label="Open Search Command Palette"
          >
            <Search size={12} />
            <span>⌘K</span>
          </button>
        </div>

        {/* Real-time Bengaluru Clock */}
        <div className="os-clock">
          {timeStr || '12:00:00 IST'}
        </div>
      </div>

      {/* Full-screen Mobile System Panels Launcher Drawer */}
      {mobileMenuOpen && (
        <div className="os-mobile-drawer-overlay" role="dialog" aria-label="System Menu">
          <div className="os-mobile-drawer">
            <div className="os-mobile-drawer-head">
              <div className="os-mobile-drawer-title">
                <span className="os-brand-name">BHUVAN.OS</span>
                <span className="os-status-dot-sm" />
                <span className="os-online-text">ONLINE</span>
              </div>
              <button 
                className="os-mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={16} />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Search-First Navigation Trigger */}
            <div 
              className="os-mobile-drawer-search"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleCommandPalette();
              }}
              role="button"
              tabIndex={0}
              aria-label="Open Command Palette Search"
            >
              <Search size={14} color="#38bdf8" />
              <span>&gt; Search Bhuvan.OS (Cmd+K)</span>
            </div>

            {/* Modules as Full-Screen System Panel Launchers */}
            <div className="os-mobile-modules-list">
              <div className="os-mobile-sec-label">SYSTEM MODULES</div>
              {[
                { id: 'system', code: '01 SYS', label: 'SYSTEM', desc: 'Shell, Diagnostics & Telemetry', icon: <Terminal size={18} /> },
                { id: 'forgeiq', code: '02 FORGEIQ', label: 'FORGEIQ', desc: 'AI Manufacturing Intelligence Flagship', icon: <Zap size={18} /> },
                { id: 'lab', code: '03 LAB', label: 'ENGINEERING LAB', desc: '10 ADRs, AI Eval & System Patterns', icon: <Cpu size={18} /> },
                { id: 'opensource', code: '04 OSS', label: 'OPEN SOURCE', desc: 'dxf-contour-extractor Pipeline', icon: <Package size={18} /> },
                { id: 'notes', code: '05 NOTES', label: 'NOTES', desc: 'Engineering Systems Writing', icon: <BookOpen size={18} /> },
                { id: 'profile', code: '06 PROFILE', label: 'PROFILE', desc: 'Bhuvan A B · BMSCE 2028', icon: <User size={18} /> },
                { id: 'contact', code: '07 CONTACT', label: 'CONTACT', desc: 'Minimal Communication Terminal', icon: <Mail size={18} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  className="os-mobile-module-row"
                  onClick={() => {
                    openWindow(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="os-mobile-mod-icon">{item.icon}</div>
                  <div className="os-mobile-mod-text">
                    <div className="os-mobile-mod-head">
                      <span className="os-mobile-mod-code">{item.code}</span>
                      <span className="os-mobile-mod-name">{item.label}</span>
                    </div>
                    <div className="os-mobile-mod-desc">{item.desc}</div>
                  </div>
                  <span className="os-system-btn-bracket">[OPEN]</span>
                </button>
              ))}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="os-mobile-module-row resume"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="os-mobile-mod-icon"><FileDown size={18} /></div>
                <div className="os-mobile-mod-text">
                  <div className="os-mobile-mod-head">
                    <span className="os-mobile-mod-code">DOC</span>
                    <span className="os-mobile-mod-name">RESUME.PDF</span>
                  </div>
                  <div className="os-mobile-mod-desc">Download Official Verified PDF</div>
                </div>
                <span className="os-system-btn-bracket">[VIEW]</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
