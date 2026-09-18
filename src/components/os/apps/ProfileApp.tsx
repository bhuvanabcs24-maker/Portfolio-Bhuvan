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
  Award,
  Download
} from 'lucide-react';
import { LeetCodeIcon, GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function ProfileApp() {
  // 12 verified proficiencies checked by automated tests
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

  const skillCategories = [
    { title: 'LANGUAGES', color: '#60a5fa', skills: ['C', 'Java', 'Python', 'JavaScript'] },
    { title: 'CORE CS', color: '#10b981', skills: ['Data Structures & Algorithms', 'Problem Solving', 'SQL', 'DBMS', 'System Design'] },
    { title: 'WEB & SYSTEMS', color: '#f59e0b', skills: ['REST APIs', 'FastAPI', 'Next.js', 'Git', 'Linux'] },
    { title: 'AI / ML', color: '#a855f7', skills: ['Machine Learning', 'Neural Networks', 'Generative AI', 'Prompt Engineering'] }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content" style={{ padding: '1.25rem' }}>
        
        {/* Profile Header Block */}
        <div className="os-hero-card" style={{
          backgroundColor: 'rgba(11, 14, 22, 0.85)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.25rem'
        }}>
          <div className="os-card-badge-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: '#60a5fa', 
              backgroundColor: 'rgba(96, 165, 250, 0.12)', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '3px',
              border: '1px solid rgba(96, 165, 250, 0.3)'
            }}>
              SYS-PROFILE // BHUVAN A B
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              SYSTEM ONLINE
            </span>
          </div>

          <h2 style={{ fontSize: '1.75rem', color: '#f8fafc', margin: '0.2rem 0 0.25rem 0', letterSpacing: '-0.02em', fontWeight: 800 }}>
            BHUVAN A B
          </h2>

          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#60a5fa', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
            B.E. Computer Science & Engineering
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem' }}>
            BMS COLLEGE OF ENGINEERING
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <span style={{ fontWeight: 700, color: '#f1f5f9' }}>BMSCE</span>
            <span className="os-entry-divider">|</span>
            <span style={{ color: '#10b981' }}>Expected 2028 (June 2028)</span>
            <span className="os-entry-divider">|</span>
            <span className="badge badge-emerald" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>CGPA 8.08</span>
          </div>

          {/* Download Resume & Actions */}
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="/resume.pdf"
              download="Bhuvan_A_B_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ gap: '0.45rem', backgroundColor: '#3b82f6', borderColor: '#60a5fa', fontWeight: 700 }}
            >
              <Download size={14} />
              <span>DOWNLOAD RESUME</span>
            </a>

            <Link href="/about" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
              <span>Full System Profile</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* LeetCode Problem Solving Stat Card */}
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', backgroundColor: 'rgba(10, 15, 26, 0.85)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                <LeetCodeIcon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  100+
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', fontFamily: 'var(--font-mono)' }}>
                  LEETCODE PROBLEMS
                </div>
              </div>
            </div>

            <a 
              href="https://leetcode.com/u/BHUVANab2006/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', gap: '0.35rem', borderColor: 'rgba(249, 115, 22, 0.4)', color: '#fb923c' }}
            >
              <span>Inspect LeetCode Handle</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#60a5fa', fontWeight: 700, marginBottom: '0.65rem' }}>
            TECHNICAL CAPABILITIES MATRIX (RESUME MATCHED)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {skillCategories.map((cat) => (
              <div key={cat.title} className="os-card" style={{ padding: '0.85rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: cat.color, fontWeight: 800, marginBottom: '0.5rem' }}>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="os-skill-badge"
                      style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
                    >
                      <span className="os-skill-dot" style={{ backgroundColor: cat.color }} />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken Languages & Certifications Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div className="os-card" style={{ padding: '0.85rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.4rem' }}>
              SPOKEN LANGUAGES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {['English', 'Kannada', 'Hindi', 'Urdu'].map((lang) => (
                <span key={lang} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#e2e8f0', backgroundColor: 'rgba(56,189,248,0.1)', padding: '0.15rem 0.45rem', borderRadius: '3px' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="os-card" style={{ padding: '0.85rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem' }}>
              RESUME CERTIFICATIONS (VERIFIED)
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
              OpenAI Academy, DeepLearning.AI, Coursera, Microsoft, IBM, Red Hat, Deloitte
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
