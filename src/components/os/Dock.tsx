'use client';

import React from 'react';
import { useOS, AppId } from './OSContext';
import { 
  Terminal as TerminalIcon, 
  Zap, 
  Cpu, 
  Package, 
  BookOpen, 
  User, 
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
      id: 'system',
      title: '01 SYSTEM (Shell & Telemetry)',
      icon: <TerminalIcon size={22} />,
      color: '#10b981'
    },
    {
      id: 'forgeiq',
      title: '02 FORGEIQ (Flagship Platform)',
      icon: <Zap size={22} />,
      color: '#3b82f6'
    },
    {
      id: 'lab',
      title: '03 ENGINEERING LAB (ADRs & Eval)',
      icon: <Cpu size={22} />,
      color: '#a855f7'
    },
    {
      id: 'opensource',
      title: '04 OPEN SOURCE (dxf-contour-extractor)',
      icon: <Package size={22} />,
      color: '#06b6d4'
    },
    {
      id: 'notes',
      title: '05 NOTES (Technical Writing)',
      icon: <BookOpen size={22} />,
      color: '#f59e0b'
    },
    {
      id: 'profile',
      title: '06 PROFILE (Bhuvan A B · BMSCE)',
      icon: <User size={22} />,
      color: '#94a3b8'
    },
    {
      title: 'Resume (PDF Document)',
      icon: <FileDown size={22} />,
      isExternal: true,
      href: '/resume.pdf',
      color: '#e2e8f0'
    }
  ];

  return (
    <nav className="os-dock-container" aria-label="System Dock">
      <div className="os-dock">
        {dockItems.map((item, index) => {
          if (item.isExternal && item.href) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="os-dock-item"
                title={item.title}
              >
                <div 
                  className="os-dock-icon-wrapper" 
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <span className="os-dock-tooltip">{item.title}</span>
              </a>
            );
          }

          const win = item.id ? windows[item.id] : null;
          const isOpen = win?.isOpen && !win?.isMinimized;
          const isActive = item.id && activeWindowId === item.id && isOpen;

          return (
            <button
              key={index}
              className={`os-dock-item ${isActive ? 'active' : ''}`}
              onClick={() => item.id && openWindow(item.id)}
              title={item.title}
            >
              <div 
                className="os-dock-icon-wrapper" 
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              
              {/* Active Indicator Dot under running app */}
              {isOpen && <span className="os-dock-running-dot" />}
              
              {/* Tooltip Label */}
              <span className="os-dock-tooltip">{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
