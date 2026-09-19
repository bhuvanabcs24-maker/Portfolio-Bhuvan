'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export default function MobileBottomSheet({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = '82vh',
}: MobileBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="mb-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="mb-sheet"
        style={{ maxHeight }}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Detail Panel'}
      >
        {/* Drag Handle */}
        <div className="mb-handle-bar" />

        {/* Header */}
        {title && (
          <div className="mb-sheet-header">
            <span className="mb-sheet-title">{title}</span>
            <button
              className="mb-sheet-close"
              onClick={onClose}
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="mb-sheet-body">
          {children}
        </div>
      </div>
    </>
  );
}
