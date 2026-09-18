'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Activity, 
  Cpu, 
  AlertCircle, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight,
  Filter
} from 'lucide-react';
import ArchitectureApp from './ArchitectureApp';
import AIEvalApp from './AIEvalApp';
import PatternsApp from './PatternsApp';
import LearningsApp from './LearningsApp';

export default function EngineeringLabApp() {
  const [activeTab, setActiveTab] = useState<'adrs' | 'eval' | 'patterns' | 'learnings'>('adrs');

  return (
    <div className="os-app-container">
      {/* Tab Navigation */}
      <div className="os-app-tabs">
        <button 
          className={`os-tab-btn ${activeTab === 'adrs' ? 'active' : ''}`}
          onClick={() => setActiveTab('adrs')}
        >
          <FileText size={14} />
          <span>10 Architecture Decisions (ADRs)</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'eval' ? 'active' : ''}`}
          onClick={() => setActiveTab('eval')}
        >
          <Activity size={14} />
          <span>AI Evaluation Lab</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'patterns' ? 'active' : ''}`}
          onClick={() => setActiveTab('patterns')}
        >
          <Cpu size={14} />
          <span>Design Patterns (4)</span>
        </button>
        <button 
          className={`os-tab-btn ${activeTab === 'learnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('learnings')}
        >
          <AlertCircle size={14} />
          <span>Failure Retrospectives (4)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="os-app-scroll-content" style={{ padding: 0 }}>
        {activeTab === 'adrs' && <ArchitectureApp />}
        {activeTab === 'eval' && <AIEvalApp />}
        {activeTab === 'patterns' && <PatternsApp />}
        {activeTab === 'learnings' && <LearningsApp />}
      </div>
    </div>
  );
}
