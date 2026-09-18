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
  BookOpen
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

        {/* Real-time Bengaluru Clock */}
        <div className="os-clock">
          {timeStr || '12:00:00 IST'}
        </div>
      </div>
    </header>
  );
}
