'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useOS, AppId } from './OSContext';
import { 
  X, 
  Minus, 
  Square, 
  Copy,
  ExternalLink
} from 'lucide-react';

interface WindowFrameProps {
  id: AppId;
  children: ReactNode;
  externalLink?: string;
}

export default function WindowFrame({ id, children, externalLink }: WindowFrameProps) {
  const { 
    windows, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updatePosition,
    activeWindowId
  } = useOS();

  const win = windows[id];
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = Math.max(10, Math.min(window.innerWidth - 100, e.clientX - dragOffsetRef.current.x));
      const newY = Math.max(36, Math.min(window.innerHeight - 100, e.clientY - dragOffsetRef.current.y));
      
      updatePosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, updatePosition]);

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag from titlebar and not from buttons
    if ((e.target as HTMLElement).closest('.window-controls') || 
        (e.target as HTMLElement).closest('.window-action-btn')) {
      return;
    }
    focusWindow(id);
    if (win.isMaximized) return;

    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    };
  };

  // Window Style calculations
  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        top: '38px',
        left: '0',
        width: '100vw',
        height: 'calc(100vh - 38px - 72px)',
        zIndex: win.zIndex,
        borderRadius: 0
      }
    : {
        position: 'absolute',
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex
      };

  return (
    <div
      ref={windowRef}
      data-window-id={id}
      className={`window-frame ${isActive ? 'window-active' : 'window-inactive'} ${win.isMaximized ? 'window-maximized' : ''}`}
      style={style}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
      >
        {/* Mac-style Traffic Light Controls */}
        <div className="window-controls">
          <button 
            className="traffic-light traffic-red" 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            aria-label="Close window"
            title="Close"
          >
            <X size={8} />
          </button>
          <button 
            className="traffic-light traffic-yellow" 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            aria-label="Minimize window"
            title="Minimize"
          >
            <Minus size={8} />
          </button>
          <button 
            className="traffic-light traffic-green" 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            aria-label="Maximize window"
            title={win.isMaximized ? "Restore" : "Maximize"}
          >
            {win.isMaximized ? <Copy size={8} /> : <Square size={7} />}
          </button>
        </div>

        {/* Process Title */}
        <div className="window-title">
          <span>{win.title}</span>
        </div>

        {/* Action icons on right */}
        <div className="window-right-actions">
          {externalLink && (
            <a 
              href={externalLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="window-action-btn"
              title="Open full page"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}
