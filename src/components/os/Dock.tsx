'use client';

import React from 'react';
import { useOS, AppId } from './OSContext';
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

interface DockItem {
  id?: AppId;
  title: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  href?: string;
  color: string;
}

export default function Dock() {
  const { windows, openWindow, activeWindowId } = useOS();

  const dockItems: DockItem[] = [
    {
      id: 'forgeiq',
      title: 'ForgeIQ Flagship',
      icon: <Zap size={22} />,
      color: '#3b82f6'
    },
    {
      id: 'terminal',
      title: 'bhuvan-sh (zsh)',
      icon: <Terminal size={22} />,
      color: '#10b981'
    },
    {
      id: 'cad-viewer',
      title: 'CAD Topology Visualizer',
      icon: <Layers size={22} />,
      color: '#a855f7'
    },
    {
      id: 'adrs',
      title: 'Architecture ADRs (10)',
      icon: <FileText size={22} />,
      color: '#60a5fa'
    },
    {
      id: 'eval-lab',
      title: 'AI Evaluation Lab',
      icon: <Activity size={22} />,
      color: '#ec4899'
    },
    {
      id: 'patterns',
      title: 'Design Patterns',
      icon: <Cpu size={22} />,
      color: '#f59e0b'
    },
    {
      id: 'learnings',
      title: 'Engineering Learnings',
      icon: <AlertCircle size={22} />,
      color: '#ef4444'
    },
    {
      id: 'opensource',
      title: 'Open Source Packages',
      icon: <Package size={22} />,
      color: '#06b6d4'
    },
    {
      id: 'writing',
      title: 'Technical Notes',
      icon: <BookOpen size={22} />,
      color: '#8b5cf6'
    },
    {
      id: 'leetcode',
      title: 'LeetCode (100+ Solved)',
      icon: <Code2 size={22} />,
      color: '#f97316'
    },
    {
      id: 'about',
      title: 'About BMSCE',
      icon: <User size={22} />,
      color: '#64748b'
    },
    {
      id: 'contact',
      title: 'Recruiter Contact',
      icon: <Mail size={22} />,
      color: '#14b8a6'
    },
    {
      title: 'Resume (PDF)',
      icon: <FileDown size={22} />,
      isExternal: true,
      href: '/resume.pdf',
      color: '#e2e8f0'
    }
  ];

  return (
    <div className="os-dock-container">
      <div className="os-dock">
        {dockItems.map((item, idx) => {
          if (item.isExternal && item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="os-dock-item"
                data-tooltip={item.title}
                style={{ color: item.color }}
              >
                <div className="os-dock-icon-wrapper" style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}>
                  {item.icon}
                </div>
              </a>
            );
          }

          const isOpen = item.id ? windows[item.id]?.isOpen : false;
          const isActive = item.id === activeWindowId && isOpen;

          return (
            <button
              key={idx}
              className={`os-dock-item ${isActive ? 'dock-item-active' : ''}`}
              data-tooltip={item.title}
              onClick={() => {
                if (item.id) {
                  openWindow(item.id);
                }
              }}
              style={{ color: item.color }}
            >
              <div className="os-dock-icon-wrapper" style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}>
                {item.icon}
              </div>
              {isOpen && <span className="os-dock-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
