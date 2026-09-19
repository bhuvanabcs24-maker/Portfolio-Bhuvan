'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, 
  Zap, 
  Cpu, 
  Package, 
  BookOpen, 
  User, 
  FileText, 
  Command, 
  ExternalLink,
  Search
} from 'lucide-react';
import { useOS } from './os/OSContext';

export default function Navbar() {
  const pathname = usePathname();
  const { toggleCommandPalette, mode, toggleMode, theme, cycleTheme, availableThemes } = useOS();

  const currentTheme = availableThemes.find(t => t.id === theme) || availableThemes[0];

  const systemModules = [
    { code: 'SYS', label: 'SYS', href: '/', id: 'system' },
    { code: 'FORGEIQ', label: 'FORGEIQ', href: '/forgeiq-case-study', id: 'forgeiq' },
    { code: 'LAB', label: 'LAB', href: '/engineering', id: 'lab' },
    { code: 'OSS', label: 'OSS', href: '/opensource', id: 'opensource' },
    { code: 'NOTES', label: 'NOTES', href: '/writing', id: 'notes' },
    { code: 'PROFILE', label: 'PROFILE', href: '/about', id: 'profile' }
  ];

  return (
    <header className="os-system-navbar">
      <div className="os-system-navbar-inner">
        {/* Left: Brand + Status Indicator */}
        <div className="os-system-nav-left">
          <Link href="/" className="os-system-brand">
            <span className="os-system-brand-text">BHUVAN</span>
          </Link>
          <div className="os-system-online-indicator">
            <span className="os-status-dot-sm" />
            <span className="os-online-text">ONLINE</span>
          </div>
        </div>

        {/* Center: Compact System Bar Navigation [SYS] [FORGEIQ] [LAB] [OSS] [NOTES] [PROFILE] */}
        <nav className="os-system-modules-nav" aria-label="System Modules">
          {systemModules.map((mod) => {
            const isActive = pathname === mod.href || (mod.href !== '/' && pathname.startsWith(mod.href));
            return (
              <Link
                key={mod.code}
                href={mod.href}
                className={`os-system-nav-btn ${isActive ? 'active' : ''}`}
                title={`Module ${mod.code}`}
              >
                <span className="os-system-btn-bracket">[</span>
                <span className="os-system-btn-label">{mod.code}</span>
                <span className="os-system-btn-bracket">]</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Switcher, Workspace Mode, Cmd+K Search, Resume */}
        <div className="os-system-nav-right">
          {/* Theme Switcher Button */}
          <button
            className="os-theme-toggle-btn"
            onClick={cycleTheme}
            title={`Current Theme: ${currentTheme.name}. Click to cycle themes.`}
            aria-label="Change Color Theme"
          >
            <span className="os-theme-icon">{currentTheme.icon}</span>
            <span className="os-theme-name">{currentTheme.name.split(' ')[0]}</span>
          </button>

          {/* Workspace Launcher Button */}
          <button
            className="os-system-mode-btn"
            onClick={toggleMode}
            title={mode === 'os' ? "Switch to Editorial Reading Mode" : "Launch Interactive Workspace"}
          >
            <Command size={13} />
            <span className="os-mode-btn-text">{mode === 'os' ? 'Editorial' : 'Workspace'}</span>
          </button>

          <button
            className="os-system-cmd-launcher-btn"
            onClick={toggleCommandPalette}
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <Search size={13} className="os-cmd-search-icon" />
            <span className="os-cmd-launcher-text">Search</span>
            <kbd className="os-system-kbd">⌘K</kbd>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="os-system-resume-btn"
            title="View Official Resume (PDF)"
          >
            <FileText size={13} />
            <span className="os-resume-btn-text">Resume</span>
          </a>
        </div>
      </div>

      {/* Mobile Compact Command Launcher Bar */}
      <div className="os-mobile-launcher-bar">
        <div className="os-mobile-modules-scroll">
          {systemModules.map((mod) => {
            const isActive = pathname === mod.href || (mod.href !== '/' && pathname.startsWith(mod.href));
            return (
              <Link
                key={mod.code}
                href={mod.href}
                className={`os-mobile-mod-pill ${isActive ? 'active' : ''}`}
              >
                [{mod.code}]
              </Link>
            );
          })}
        </div>

        <button
          className="os-mobile-cmd-btn"
          onClick={toggleCommandPalette}
          aria-label="Open Command Palette"
        >
          <Command size={14} />
          <span>⌘K</span>
        </button>
      </div>
    </header>
  );
}
