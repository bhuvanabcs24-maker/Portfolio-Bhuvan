'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppId = 
  | 'forgeiq'
  | 'terminal'
  | 'cad-viewer'
  | 'adrs'
  | 'eval-lab'
  | 'patterns'
  | 'learnings'
  | 'opensource'
  | 'writing'
  | 'leetcode'
  | 'about'
  | 'contact';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface OSContextType {
  mode: 'os' | 'editorial';
  setMode: (mode: 'os' | 'editorial') => void;
  toggleMode: () => void;
  windows: Record<AppId, WindowState>;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
  updateSize: (id: AppId, size: { width: number; height: number }) => void;
  activeWindowId: AppId | null;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
}

const DEFAULT_WINDOWS: Record<AppId, WindowState> = {
  forgeiq: {
    id: 'forgeiq',
    title: 'ForgeIQ — CAD & Quotation Platform',
    icon: 'Zap',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 40, y: 50 },
    size: { width: 780, height: 560 }
  },
  terminal: {
    id: 'terminal',
    title: 'bhuvan-sh (zsh) — v2.4.0',
    icon: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 480, y: 140 },
    size: { width: 620, height: 420 }
  },
  'cad-viewer': {
    id: 'cad-viewer',
    title: 'CAD Topology & KD-Tree Snapping Visualizer',
    icon: 'Layers',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 120, y: 70 },
    size: { width: 720, height: 520 }
  },
  adrs: {
    id: 'adrs',
    title: 'Architecture Decisions (10 ADRs)',
    icon: 'FileText',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 80, y: 60 },
    size: { width: 760, height: 540 }
  },
  'eval-lab': {
    id: 'eval-lab',
    title: 'AI Evaluation Lab & Benchmarks',
    icon: 'Activity',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 100, y: 80 },
    size: { width: 740, height: 540 }
  },
  patterns: {
    id: 'patterns',
    title: 'Production Design Patterns',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 140, y: 90 },
    size: { width: 740, height: 520 }
  },
  learnings: {
    id: 'learnings',
    title: 'Engineering Learnings & Failures',
    icon: 'AlertCircle',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 160, y: 100 },
    size: { width: 720, height: 500 }
  },
  opensource: {
    id: 'opensource',
    title: 'Open Source — dxf-contour-extractor',
    icon: 'Package',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 110, y: 80 },
    size: { width: 740, height: 520 }
  },
  writing: {
    id: 'writing',
    title: 'Technical Writing & Notes',
    icon: 'BookOpen',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 130, y: 70 },
    size: { width: 740, height: 520 }
  },
  leetcode: {
    id: 'leetcode',
    title: 'LeetCode Problem Solving (100+)',
    icon: 'Code2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 200, y: 110 },
    size: { width: 680, height: 480 }
  },
  about: {
    id: 'about',
    title: 'About Bhuvan A B — BMSCE',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 150, y: 90 },
    size: { width: 680, height: 500 }
  },
  contact: {
    id: 'contact',
    title: 'Recruiter Contact Dispatcher',
    icon: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 220, y: 130 },
    size: { width: 600, height: 460 }
  }
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<'os' | 'editorial'>('os');
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(DEFAULT_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>('terminal');
  const [highestZIndex, setHighestZIndex] = useState(12);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Restore preferred mode from localStorage if available
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('bhuvan_os_mode');
      if (savedMode === 'editorial' || savedMode === 'os') {
        setModeState(savedMode);
      }
    } catch {
      // Ignore localstorage errors
    }
  }, []);

  const setMode = (newMode: 'os' | 'editorial') => {
    setModeState(newMode);
    try {
      localStorage.setItem('bhuvan_os_mode', newMode);
    } catch {}
  };

  const toggleMode = () => {
    setMode(mode === 'os' ? 'editorial' : 'os');
  };

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const focusWindow = (id: AppId) => {
    setHighestZIndex((prev) => prev + 1);
    setWindows((w) => {
      const currentHighest = Object.values(w).reduce((max, win) => Math.max(max, win.zIndex), 10);
      const newZ = currentHighest + 1;
      return {
        ...w,
        [id]: {
          ...w[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZ
        }
      };
    });
    setActiveWindowId(id);
  };

  const openWindow = (id: AppId) => {
    focusWindow(id);
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
    focusWindow(id);
  };

  const updatePosition = (id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos
      }
    }));
  };

  const updateSize = (id: AppId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size: size
      }
    }));
  };

  const toggleCommandPalette = () => {
    setCommandPaletteOpen((prev) => !prev);
  };

  return (
    <OSContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updatePosition,
        updateSize,
        activeWindowId,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toggleCommandPalette
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
