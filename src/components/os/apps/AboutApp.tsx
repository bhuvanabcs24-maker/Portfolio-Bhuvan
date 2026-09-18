'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, GraduationCap, Award, FileText } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>
            Academic Profile & Foundations
          </div>
          <h2 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
            Bhuvan A B
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 600, marginTop: '0.1rem' }}>
            B.E. in Computer Science & Engineering · BMS College of Engineering (BMSCE), Bengaluru
          </p>
        </div>

        {/* Education Detail Card */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc' }}>BMS College of Engineering (BMSCE)</h3>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Expected Graduation: June 2028</div>
            </div>
            <span className="badge badge-emerald">CGPA: 8.08 / 10</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '0.5rem' }}>
            Strong foundation in core Data Structures & Algorithms, Relational Database Systems (SQL), Object-Oriented Software Design in C/Java, Operating Systems, and Distributed Computing paradigms.
          </p>
        </div>

        {/* Narrative */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
            Engineering Focus
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
            I build practical, production-oriented systems with deterministic foundations. Rather than generating superficial AI wrapper prototypes, my projects (like ForgeIQ and QWait Estimator) combine robust REST API contracts, automated testing (47 automated tests), and applied AI architectures designed to prevent physical and operational failure.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <FileText size={13} />
            <span>Download Resume (PDF)</span>
          </a>
          <Link href="/about" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            <span>Full Background & Achievements</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
