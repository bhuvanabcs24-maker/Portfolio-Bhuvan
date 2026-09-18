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
import SpatialWorkspaceCanvas from './spatial/SpatialWorkspaceCanvas';

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

export default function DesktopWorkspace() {
  const { hasEnteredWorkspace } = useOS();

  // If user has not yet entered workspace, render the technical Entry Screen
  if (!hasEnteredWorkspace) {
    return <OSEntryScreen />;
  }

  return (
    <div className="os-desktop-environment">
      {/* 1. Top Operating System Status Bar */}
      <TopMenuBar />

      {/* 2. Background Interactive Engineering Canvas */}
      <EngineeringCanvasBackground />

      {/* 3. Spatial System Navigation Environment */}
      <SpatialWorkspaceCanvas />

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
