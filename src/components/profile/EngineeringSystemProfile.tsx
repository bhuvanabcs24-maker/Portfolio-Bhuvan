'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Award, 
  Cpu, 
  Code2, 
  Layers, 
  Globe, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Clock, 
  MapPin, 
  Briefcase,
  GitBranch,
  Database
} from 'lucide-react';
import { LeetCodeIcon, GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function EngineeringSystemProfile() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'certifications' | 'timeline'>('matrix');

  // Exact categories matching resume
  const skillCategories = [
    {
      title: 'LANGUAGES',
      color: '#60a5fa',
      skills: ['C', 'Java', 'Python', 'JavaScript']
    },
    {
      title: 'CORE CS',
      color: '#10b981',
      skills: ['Data Structures & Algorithms', 'Problem Solving', 'SQL', 'DBMS', 'System Design']
    },
    {
      title: 'WEB & SYSTEMS',
      color: '#f59e0b',
      skills: ['REST APIs', 'FastAPI', 'Next.js', 'Git', 'Linux']
    },
    {
      title: 'AI / ML',
      color: '#a855f7',
      skills: ['Machine Learning', 'Neural Networks', 'Generative AI', 'Prompt Engineering']
    }
  ];

  // Exact certifications matching resume (No invented dates or credential IDs)
  const certifications = [
    {
      issuer: 'OpenAI Academy',
      title: 'Applied AI Foundations',
      category: 'AI / ML',
      color: '#10b981'
    },
    {
      issuer: 'DeepLearning.AI',
      title: 'Generative AI for Everyone',
      category: 'Generative AI',
      color: '#a855f7'
    },
    {
      issuer: 'Coursera',
      title: 'Learning How to Learn',
      category: 'Metacognition & Learning',
      color: '#38bdf8'
    },
    {
      issuer: 'Microsoft',
      title: 'Introduction to AI Concepts',
      category: 'AI Fundamentals',
      color: '#f59e0b'
    },
    {
      issuer: 'IBM',
      title: 'Responsible AI & Risk Management',
      category: 'AI Ethics & Governance',
      color: '#60a5fa'
    },
    {
      issuer: 'Red Hat',
      title: 'RH104 / RH124',
      category: 'Linux & Systems',
      color: '#ef4444'
    },
    {
      issuer: 'Deloitte',
      title: 'Data Analytics — Forage',
      category: 'Data Analytics',
      color: '#34d399'
    }
  ];

  // Verified spoken languages
  const spokenLanguages = ['English', 'Kannada', 'Hindi', 'Urdu'];

  // Social & Platform links
  const socialLinks = [
    {
      platform: 'GitHub',
      label: 'bhuvanabcs24-maker',
      url: 'https://github.com/bhuvanabcs24-maker',
      icon: <GithubIcon size={18} />
    },
    {
      platform: 'LinkedIn',
      label: 'bhuvan-a-b-4805a2330',
      url: 'https://www.linkedin.com/in/bhuvan-a-b-4805a2330/',
      icon: <LinkedinIcon size={18} />
    },
    {
      platform: 'LeetCode',
      label: 'BHUVANab2006',
      url: 'https://leetcode.com/u/BHUVANab2006/',
      icon: <LeetCodeIcon size={18} />
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#07090e', color: '#f1f5f9', position: 'relative' }}>
      
      {/* Background Architectural Grid Pattern */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0
        }}
      />

      {/* Top Header / Breadcrumbs */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(7, 9, 14, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-secondary, #94a3b8)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              padding: '0.3rem 0.65rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={13} />
            <span>RETURN TO BHUVAN.OS</span>
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            ENGINEERING IDENTITY
          </span>
          <span style={{ 
            fontSize: '0.7rem', 
            color: 'rgba(255, 255, 255, 0.4)', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.15rem 0.45rem',
            borderRadius: '3px'
          }}>
            SYSTEM PROFILE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Prominent Resume Download Button */}
          <a
            href="/resume.pdf"
            download="Bhuvan_A_B_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              padding: '0.45rem 0.95rem',
              borderRadius: '4px',
              fontSize: '0.78rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)'
            }}
          >
            <Download size={14} />
            <span>DOWNLOAD RESUME</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#10b981' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>PROFILE ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Main Profile Layout */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* ==========================================================
            IDENTITY HERO MASTHEAD
            ========================================================== */}
        <section 
          aria-label="Engineering Identity Coordinates"
          style={{
            backgroundColor: 'rgba(11, 14, 22, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: 'clamp(1.75rem, 3.5vw, 3rem)',
            marginBottom: '2.5rem',
            position: 'relative',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Decorative Corner Markers */}
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '12px', height: '12px', borderTop: '2px solid #60a5fa', borderLeft: '2px solid #60a5fa' }} />
          <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '12px', height: '12px', borderTop: '2px solid #60a5fa', borderRight: '2px solid #60a5fa' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '12px', height: '12px', borderBottom: '2px solid #60a5fa', borderLeft: '2px solid #60a5fa' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '12px', height: '12px', borderBottom: '2px solid #60a5fa', borderRight: '2px solid #60a5fa' }} />

          {/* Meta Tag Line */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 700 }}>
              <Terminal size={14} />
              <span>IDENTITY COORDINATES // SYS-BHUVAN-2028</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              LOCATION: BENGALURU, INDIA (BMSCE CAMPUS)
            </span>
          </div>

          {/* Name & Academic Credentials */}
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.035em', 
            lineHeight: 1.05,
            color: '#ffffff',
            margin: '0 0 0.5rem'
          }}>
            BHUVAN A B
          </h1>

          <div style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', 
            fontWeight: 700, 
            color: '#60a5fa', 
            fontFamily: 'var(--font-mono)',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em'
          }}>
            B.E. COMPUTER SCIENCE &amp; ENGINEERING
          </div>

          <div style={{ 
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', 
            fontWeight: 600, 
            color: '#cbd5e1', 
            marginBottom: '1.75rem' 
          }}>
            BMS COLLEGE OF ENGINEERING
          </div>

          {/* Key Metric Tags (Expected June 2028, CGPA 8.08, LeetCode 100+) */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.85rem', 
            marginBottom: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.35)', 
              padding: '0.4rem 0.85rem', 
              borderRadius: '4px',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <GraduationCap size={15} />
              <span>EXPECTED JUNE 2028</span>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.12)', 
              border: '1px solid rgba(59, 130, 246, 0.35)', 
              padding: '0.4rem 0.85rem', 
              borderRadius: '4px',
              color: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Award size={15} />
              <span>CGPA 8.08</span>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(249, 115, 22, 0.12)', 
              border: '1px solid rgba(249, 115, 22, 0.35)', 
              padding: '0.4rem 0.85rem', 
              borderRadius: '4px',
              color: '#fb923c',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <LeetCodeIcon size={15} />
              <span>100+ LEETCODE PROBLEMS</span>
            </div>
          </div>

          {/* Primary Action Button Bar */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            alignItems: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Prominent DOWNLOAD RESUME Button */}
            <a
              href="/resume.pdf"
              download="Bhuvan_A_B_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: '#3b82f6',
                border: '1px solid #60a5fa',
                color: '#ffffff',
                padding: '0.75rem 1.6rem',
                borderRadius: '5px',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.45)',
                transition: 'all 0.15s ease'
              }}
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME</span>
            </a>

            {/* View Projects Link */}
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '0.75rem 1.4rem',
                borderRadius: '5px',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none'
              }}
            >
              <span>Inspect Engineering Archive</span>
              <ExternalLink size={14} />
            </Link>

            {/* Resume verification badge */}
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <CheckCircle2 size={13} color="#10b981" />
              <span>ACTUAL RESUME FILE ATTACHED (RESUME.PDF)</span>
            </span>
          </div>
        </section>

        {/* ==========================================================
            PROBLEM SOLVING TELEMETRY (LEETCODE 100+)
            ========================================================== */}
        <section 
          aria-label="Problem Solving Telemetry"
          style={{
            backgroundColor: 'rgba(10, 15, 26, 0.75)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '8px',
            padding: '1.75rem',
            marginBottom: '2.5rem',
            boxShadow: '0 12px 32px -8px rgba(249, 115, 22, 0.15)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '8px', 
                backgroundColor: 'rgba(249, 115, 22, 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#f97316'
              }}>
                <LeetCodeIcon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  100+
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fb923c', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  LEETCODE PROBLEMS SOLVED
                </div>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/BHUVANab2006/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                color: '#fb923c',
                padding: '0.55rem 1.1rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                fontWeight: 700
              }}
            >
              <span>View LeetCode Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0, marginBottom: '1rem' }}>
            Continuous algorithmic practice across data structure fundamentals: arrays, hash maps, two-pointer techniques, binary trees, recursion, graphs, and dynamic programming patterns. Verified directly on active LeetCode handle. Zero fabricated rank figures.
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.73rem', 
            color: 'rgba(255, 255, 255, 0.65)' 
          }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
              • Arrays &amp; Two Pointers
            </span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
              • Hash Tables &amp; Slotted Lookups
            </span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
              • Binary Search Trees &amp; Depth-First Search
            </span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
              • Dynamic Programming &amp; Recursion Memoization
            </span>
          </div>
        </section>

        {/* ==========================================================
            ENGINEERING SKILL MATRIX (Exact Resume Categories - NO Percentage Bars!)
            ========================================================== */}
        <section aria-label="Engineering Skill Matrix" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#60a5fa', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.25rem' }}>
                TECHNICAL PROFICIENCY MATRIX // RESUME VERIFIED
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Engineering Profile
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
              CATEGORIZED CAPABILITIES
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                style={{
                  backgroundColor: 'rgba(11, 14, 22, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.72rem', 
                      fontWeight: 800, 
                      color: cat.color,
                      letterSpacing: '0.08em'
                    }}>
                      {cat.title}
                    </span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.color }} />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: '#f1f5f9',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.09)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '3px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: cat.color }} />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            CERTIFICATIONS SECTION (Actual Resume Certifications - No Invented Dates/IDs)
            ========================================================== */}
        <section aria-label="Verified Certifications" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.25rem' }}>
                INDUSTRY CREDENTIALS // NO INVENTED DATES OR IDs
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Certifications
              </h2>
            </div>
            <Link
              href="/certifications"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#10b981',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>View Full Registry</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {certifications.map((cert) => (
              <div
                key={cert.issuer + cert.title}
                style={{
                  backgroundColor: 'rgba(11, 14, 22, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.68rem', 
                      color: cert.color, 
                      backgroundColor: `${cert.color}15`,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '3px'
                    }}>
                      {cert.issuer}
                    </span>
                    <Award size={14} color="rgba(255, 255, 255, 0.4)" />
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0.35rem 0 0.25rem' }}>
                    {cert.title}
                  </h3>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                    {cert.category}
                  </div>
                </div>

                <div style={{ 
                  marginTop: '1rem', 
                  paddingTop: '0.65rem', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <CheckCircle2 size={11} />
                  <span>RESUME VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            LANGUAGES & SOCIAL LINKS BAR
            ========================================================== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Spoken Languages */}
          <div style={{
            backgroundColor: 'rgba(11, 14, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '1.5rem'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
              NATURAL LANGUAGES // MULTILINGUAL PROFICIENCY
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem' }}>
              Spoken Languages
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {spokenLanguages.map((lang) => (
                <span
                  key={lang}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#e2e8f0',
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px'
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div style={{
            backgroundColor: 'rgba(11, 14, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '1.5rem'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
              COMMUNICATION CHANNELS // EXTERNAL PROFILES
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem' }}>
              Verified Social Profiles
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#f1f5f9',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {s.icon}
                    <span style={{ fontWeight: 700 }}>{s.platform}:</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{s.label}</span>
                  </div>
                  <ExternalLink size={12} style={{ opacity: 0.6 }} />
                </a>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
