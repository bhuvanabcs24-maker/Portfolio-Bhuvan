'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Code2, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Database,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { LeetCodeIcon, GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function ProfileApp() {
  const skillsList = [
    'Java',
    'Python',
    'C',
    'JavaScript',
    'FastAPI',
    'Next.js',
    'SQL',
    'DBMS',
    'System Design',
    'Generative AI',
    'Machine Learning',
    'Neural Networks'
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        {/* Profile Header Block */}
        <div className="os-hero-card" style={{ marginBottom: '1.25rem' }}>
          <div className="os-card-badge-row">
            <span className="badge badge-blue">ENGINEER PROFILE</span>
            <span className="badge badge-emerald">ACADEMIC EXCELLENCE</span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', margin: '0.4rem 0 0.2rem 0', letterSpacing: '-0.02em' }}>
            BHUVAN A B
          </h2>

          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#60a5fa', marginBottom: '0.25rem' }}>
            B.E. Computer Science & Engineering
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: '#cbd5e1' }}>
            <span style={{ fontWeight: 700, color: '#f1f5f9' }}>BMSCE</span>
            <span className="os-entry-divider">|</span>
            <span>Expected 2028</span>
            <span className="os-entry-divider">|</span>
            <span className="badge badge-emerald" style={{ fontFamily: 'var(--font-mono)' }}>CGPA 8.08</span>
          </div>
        </div>

        {/* Academic Details & Foundation */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={16} color="#3b82f6" />
              <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>Academic Institution</strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>Bengaluru, Karnataka</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
            Undergraduate student in Computer Science & Engineering at <strong>B.M.S. College of Engineering (BMSCE)</strong>. Strong academic foundation in core Data Structures & Algorithms, Relational Database Management Systems (DBMS), Operating Systems, and Distributed Computing.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} color="#60a5fa" />
              <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>Technical Skills</strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
              12 VERIFIED PROFICIENCIES
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skillsList.map((skill) => (
              <span 
                key={skill}
                className="os-skill-badge"
              >
                <span className="os-skill-dot" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* LeetCode Problem Solving Stat Card */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: '#0a0f1d', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                <LeetCodeIcon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  100+
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f97316' }}>
                  LeetCode
                </div>
              </div>
            </div>

            <a 
              href="https://leetcode.com/u/BHUVANab2006/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', gap: '0.35rem', borderColor: 'rgba(249, 115, 22, 0.4)' }}
            >
              <span>View LeetCode Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.775rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            <span>• Hash Tables & Two Pointers</span>
            <span>• Binary Trees & Graphs</span>
            <span>• Dynamic Programming & Recursion</span>
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <FileText size={13} />
            <span>Download Verified Resume (PDF)</span>
          </a>
          <Link href="/about" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            <span>Full Academic Background</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
