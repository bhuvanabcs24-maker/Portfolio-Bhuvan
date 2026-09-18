'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/forgeiq-case-study', label: 'ForgeIQ Case Study' },
    { href: '/engineering', label: 'Engineering' },
    { href: '/opensource', label: 'Open Source' },
    { href: '/writing', label: 'Writing / Notes' },
    { href: '/about', label: 'About' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(8, 12, 20, 0.85)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.25rem',
      }}>
        {/* Brand / Name */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '2.1rem',
            height: '2.1rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #2563eb, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.95rem',
            letterSpacing: '-0.02em',
          }}>
            B
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              BMSCE · Expected 2028
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.25rem',
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-accent)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.4rem 0.2rem',
                  transition: 'color 0.15s ease',
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent-blue)',
                    borderRadius: '2px',
                  }} />
                )}
              </Link>
            );
          })}

          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary"
            style={{ marginLeft: '0.5rem', gap: '0.4rem' }}
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'flex',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-nav-btn"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div style={{
          padding: '1.25rem 1.5rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.5rem 0',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-accent)' : 'var(--text-primary)',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', gap: '0.4rem' }}
            >
              <FileText size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
