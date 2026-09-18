'use client';

import React from 'react';
import { useOS, AppId } from './OSContext';
import OSEntryScreen from './OSEntryScreen';
import TopMenuBar from './TopMenuBar';
import Dock from './Dock';
import WindowFrame from './WindowFrame';
import CommandPalette from './CommandPalette';
import EngineeringCanvasBackground from './EngineeringCanvasBackground';

import dynamic from 'next/dynamic';

const LoadingSkeleton = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '220px', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94a3b8' }}>
    <span className="os-status-dot-sm" />
    <span>Loading module environment...</span>
  </div>
);

// Lazy-loaded App content components (Minimal initial blocking JS)
const SystemApp = dynamic(() => import('./apps/SystemApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const ForgeIQApp = dynamic(() => import('./apps/ForgeIQApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const EngineeringLabApp = dynamic(() => import('./apps/EngineeringLabApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const OpenSourceApp = dynamic(() => import('./apps/OpenSourceApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const WritingApp = dynamic(() => import('./apps/WritingApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const ProfileApp = dynamic(() => import('./apps/ProfileApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const ContactApp = dynamic(() => import('./apps/ContactApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const QWaitApp = dynamic(() => import('./apps/QWaitApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const CertificationsApp = dynamic(() => import('./apps/CertificationsApp'), { ssr: false, loading: () => <LoadingSkeleton /> });

// Specialized helper tools (Lazy-loaded on demand)
const CadTopologyCanvas = dynamic(() => import('./CadTopologyCanvas'), { ssr: false, loading: () => <LoadingSkeleton /> });
const TerminalApp = dynamic(() => import('./TerminalApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const ArchitectureApp = dynamic(() => import('./apps/ArchitectureApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const AIEvalApp = dynamic(() => import('./apps/AIEvalApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const PatternsApp = dynamic(() => import('./apps/PatternsApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const LearningsApp = dynamic(() => import('./apps/LearningsApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const LeetCodeApp = dynamic(() => import('./apps/LeetCodeApp'), { ssr: false, loading: () => <LoadingSkeleton /> });
const AboutApp = dynamic(() => import('./apps/AboutApp'), { ssr: false, loading: () => <LoadingSkeleton /> });

import { 
  Terminal as TerminalIcon, 
  Zap, 
  Cpu, 
  Package, 
  BookOpen, 
  User, 
  Layers, 
  FileText, 
  Activity, 
  AlertCircle, 
  Code2, 
  Mail,
  FileDown,
  Clock,
  Award
} from 'lucide-react';

interface DesktopIcon {
  id?: AppId;
  label: string;
  moduleCode: string;
  icon: React.ReactNode;
  color: string;
  isExternal?: boolean;
  href?: string;
}

export default function DesktopWorkspace() {
  const { hasEnteredWorkspace, openWindow } = useOS();

  // If user has not yet entered workspace, render the technical Entry Screen
  if (!hasEnteredWorkspace) {
    return <OSEntryScreen />;
  }

  // The 6 Primary Application Modules
  const primaryDesktopIcons: DesktopIcon[] = [
    {
      id: 'system',
      moduleCode: '01',
      label: 'SYSTEM',
      icon: <TerminalIcon size={26} />,
      color: '#10b981'
    },
    {
      id: 'forgeiq',
      moduleCode: '02',
      label: 'FORGEIQ',
      icon: <Zap size={26} />,
      color: '#3b82f6'
    },
    {
      id: 'lab',
      moduleCode: '03',
      label: 'ENGINEERING LAB',
      icon: <Cpu size={26} />,
      color: '#a855f7'
    },
    {
      id: 'opensource',
      moduleCode: '04',
      label: 'OPEN SOURCE',
      icon: <Package size={26} />,
      color: '#06b6d4'
    },
    {
      id: 'notes',
      moduleCode: '05',
      label: 'NOTES',
      icon: <BookOpen size={26} />,
      color: '#f59e0b'
    },
    {
      id: 'profile',
      moduleCode: '06',
      label: 'PROFILE',
      icon: <User size={26} />,
      color: '#94a3b8'
    },
    {
      id: 'contact',
      moduleCode: '07',
      label: 'CONTACT',
      icon: <Mail size={26} />,
      color: '#14b8a6'
    },
    {
      id: 'qwait',
      moduleCode: '08',
      label: 'QWAIT',
      icon: <Clock size={26} />,
      color: '#38bdf8'
    },
    {
      id: 'certifications',
      moduleCode: '09',
      label: 'CERTS',
      icon: <Award size={26} />,
      color: '#10b981'
    },
    {
      moduleCode: 'DOC',
      label: 'RESUME.PDF',
      icon: <FileDown size={26} />,
      color: '#e2e8f0',
      isExternal: true,
      href: '/resume.pdf'
    }
  ];

  return (
    <div className="os-desktop-environment">
      {/* 1. Top Operating System Status Bar */}
      <TopMenuBar />

      {/* 2. Background Interactive Engineering Canvas */}
      <EngineeringCanvasBackground />

      {/* 3. Desktop Shortcut Icons Grid (The 6 Primary Modules) */}
      <div className="os-desktop-icons-grid">
        {primaryDesktopIcons.map((d, i) => {
          if (d.isExternal && d.href) {
            return (
              <a 
                key={i}
                href={d.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="os-desktop-icon"
                data-cursor="external"
              >
                <div className="os-icon-graphic" style={{ color: d.color, background: `${d.color}15`, borderColor: `${d.color}35` }}>
                  {d.icon}
                </div>
                <div className="os-icon-meta-label">
                  <span className="os-icon-mod-code">{d.moduleCode}</span>
                  <span className="os-icon-label">{d.label}</span>
                </div>
              </a>
            );
          }

          return (
            <button
              key={i}
              className="os-desktop-icon"
              data-cursor="open"
              onDoubleClick={() => d.id && openWindow(d.id)}
              onClick={() => d.id && openWindow(d.id)}
            >
              <div className="os-icon-graphic" style={{ color: d.color, background: `${d.color}15`, borderColor: `${d.color}35` }}>
                {d.icon}
              </div>
              <div className="os-icon-meta-label">
                <span className="os-icon-mod-code">{d.moduleCode}</span>
                <span className="os-icon-label">{d.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Draggable, Resizable Floating Windows for the 6 Primary Modules */}
      <WindowFrame id="system">
        <SystemApp />
      </WindowFrame>

      <WindowFrame id="forgeiq" externalLink="/forgeiq-case-study">
        <ForgeIQApp />
      </WindowFrame>

      <WindowFrame id="lab" externalLink="/engineering/decisions">
        <EngineeringLabApp />
      </WindowFrame>

      <WindowFrame id="opensource" externalLink="/opensource">
        <OpenSourceApp />
      </WindowFrame>

      <WindowFrame id="notes" externalLink="/writing">
        <WritingApp />
      </WindowFrame>

      <WindowFrame id="profile" externalLink="/about">
        <ProfileApp />
      </WindowFrame>

      {/* Specialized Tool Sub-windows (Launched via ForgeIQ, Lab, or Terminal) */}
      <WindowFrame id="cad-viewer">
        <CadTopologyCanvas />
      </WindowFrame>

      <WindowFrame id="terminal">
        <TerminalApp />
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

      <WindowFrame id="qwait" externalLink="https://github.com/bhuvanabcs24-maker/QueueEstimater">
        <QWaitApp />
      </WindowFrame>

      <WindowFrame id="certifications" externalLink="/certifications">
        <CertificationsApp />
      </WindowFrame>

      {/* 5. Bottom Interactive System Dock */}
      <Dock />

      {/* 6. Spotlight Command Palette */}
      <CommandPalette />
    </div>
  );
}
