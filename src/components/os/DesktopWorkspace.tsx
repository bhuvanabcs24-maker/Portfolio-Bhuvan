'use client';

import React from 'react';
import { useOS, AppId } from './OSContext';
import TopMenuBar from './TopMenuBar';
import Dock from './Dock';
import WindowFrame from './WindowFrame';
import CommandPalette from './CommandPalette';
import EngineeringCanvasBackground from './EngineeringCanvasBackground';

// App content components
import ForgeIQApp from './apps/ForgeIQApp';
import TerminalApp from './TerminalApp';
import CadTopologyCanvas from './CadTopologyCanvas';
import ArchitectureApp from './apps/ArchitectureApp';
import AIEvalApp from './apps/AIEvalApp';
import PatternsApp from './apps/PatternsApp';
import LearningsApp from './apps/LearningsApp';
import OpenSourceApp from './apps/OpenSourceApp';
import WritingApp from './apps/WritingApp';
import LeetCodeApp from './apps/LeetCodeApp';
import AboutApp from './apps/AboutApp';
import ContactApp from './apps/ContactApp';

import { 
  Zap, 
  Terminal, 
  Layers, 
  FileText, 
  Activity, 
  Cpu, 
  AlertCircle, 
  Package, 
  BookOpen, 
  Code2, 
  User, 
  Mail,
  FileDown
} from 'lucide-react';

interface DesktopIcon {
  id?: AppId;
  title: string;
  icon: React.ReactNode;
  color: string;
  isExternal?: boolean;
  href?: string;
}

export default function DesktopWorkspace() {
  const { openWindow } = useOS();

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'forgeiq',
      title: 'ForgeIQ.app',
      icon: <Zap size={28} />,
      color: '#3b82f6'
    },
    {
      id: 'terminal',
      title: 'Terminal.app',
      icon: <Terminal size={28} />,
      color: '#10b981'
    },
    {
      id: 'cad-viewer',
      title: 'CAD_Viewer.app',
      icon: <Layers size={28} />,
      color: '#a855f7'
    },
    {
      id: 'adrs',
      title: 'ADRs_10.app',
      icon: <FileText size={28} />,
      color: '#60a5fa'
    },
    {
      id: 'eval-lab',
      title: 'AI_Eval_Lab.app',
      icon: <Activity size={28} />,
      color: '#ec4899'
    },
    {
      id: 'patterns',
      title: 'Patterns.app',
      icon: <Cpu size={28} />,
      color: '#f59e0b'
    },
    {
      id: 'learnings',
      title: 'Learnings.app',
      icon: <AlertCircle size={28} />,
      color: '#ef4444'
    },
    {
      id: 'opensource',
      title: 'OpenSource.app',
      icon: <Package size={28} />,
      color: '#06b6d4'
    },
    {
      id: 'writing',
      title: 'Notes.app',
      icon: <BookOpen size={28} />,
      color: '#8b5cf6'
    },
    {
      id: 'leetcode',
      title: 'LeetCode_100+.app',
      icon: <Code2 size={28} />,
      color: '#f97316'
    },
    {
      id: 'about',
      title: 'About_BMSCE.app',
      icon: <User size={28} />,
      color: '#94a3b8'
    },
    {
      id: 'contact',
      title: 'Contact.app',
      icon: <Mail size={28} />,
      color: '#14b8a6'
    },
    {
      title: 'Resume.pdf',
      icon: <FileDown size={28} />,
      color: '#e2e8f0',
      isExternal: true,
      href: '/resume.pdf'
    }
  ];

  return (
    <div className="os-desktop-environment">
      {/* 1. Top Operating System Status Bar */}
      <TopMenuBar />

      {/* 2. Background Interactive Canvas */}
      <EngineeringCanvasBackground />

      {/* 3. Desktop Shortcut Icons Grid */}
      <div className="os-desktop-icons-grid">
        {desktopIcons.map((d, i) => {
          if (d.isExternal && d.href) {
            return (
              <a 
                key={i}
                href={d.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="os-desktop-icon"
              >
                <div className="os-icon-graphic" style={{ color: d.color, background: `${d.color}15`, borderColor: `${d.color}35` }}>
                  {d.icon}
                </div>
                <span className="os-icon-label">{d.title}</span>
              </a>
            );
          }

          return (
            <button
              key={i}
              className="os-desktop-icon"
              onDoubleClick={() => d.id && openWindow(d.id)}
              onClick={() => d.id && openWindow(d.id)}
            >
              <div className="os-icon-graphic" style={{ color: d.color, background: `${d.color}15`, borderColor: `${d.color}35` }}>
                {d.icon}
              </div>
              <span className="os-icon-label">{d.title}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Draggable, Resizable Floating Windows */}
      <WindowFrame id="forgeiq" externalLink="/forgeiq-case-study">
        <ForgeIQApp />
      </WindowFrame>

      <WindowFrame id="terminal">
        <TerminalApp />
      </WindowFrame>

      <WindowFrame id="cad-viewer">
        <CadTopologyCanvas />
      </WindowFrame>

      <WindowFrame id="adrs" externalLink="/engineering/decisions">
        <ArchitectureApp />
      </WindowFrame>

      <WindowFrame id="eval-lab" externalLink="/engineering/evaluation">
        <AIEvalApp />
      </WindowFrame>

      <WindowFrame id="patterns" externalLink="/engineering/patterns">
        <PatternsApp />
      </WindowFrame>

      <WindowFrame id="learnings" externalLink="/engineering/learnings">
        <LearningsApp />
      </WindowFrame>

      <WindowFrame id="opensource" externalLink="/opensource">
        <OpenSourceApp />
      </WindowFrame>

      <WindowFrame id="writing" externalLink="/writing">
        <WritingApp />
      </WindowFrame>

      <WindowFrame id="leetcode" externalLink="https://leetcode.com/u/BHUVANab2006/">
        <LeetCodeApp />
      </WindowFrame>

      <WindowFrame id="about" externalLink="/about">
        <AboutApp />
      </WindowFrame>

      <WindowFrame id="contact" externalLink="/contact">
        <ContactApp />
      </WindowFrame>

      {/* 5. Bottom Interactive System Dock */}
      <Dock />

      {/* 6. Spotlight Command Palette */}
      <CommandPalette />
    </div>
  );
}
