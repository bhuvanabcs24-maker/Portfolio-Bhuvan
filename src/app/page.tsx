import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ArrowRight, 
  Code2, 
  Mail, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Award, 
  ShieldCheck,
  Terminal,
  BrainCircuit
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import ProjectCard from '@/components/ProjectCard';
import MetricCard from '@/components/MetricCard';

export default function HomePage() {
  const { personal, skills, problemSolving, aiLearning, projects, achievements } = PORTFOLIO_DATA;

  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ maxWidth: '850px' }}>
            {/* Status Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }} />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#93c5fd' }}>
                BMS College of Engineering (BMSCE) · Expected June 2028 · CGPA: 8.08
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Hi, I&apos;m <span style={{ color: '#60a5fa' }}>{personal.name}</span>.
              <br />
              <span style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Building reliable backend systems & applied AI software.
              </span>
            </h1>

            {/* Positioning Statement */}
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Computer Science & Engineering student at BMSCE focused on <strong>backend engineering</strong>, <strong>full-stack development</strong>, <strong>applied AI</strong>, and <strong>rigorous problem solving</strong>. Builder of deterministic CAD geometry engines, secure REST APIs, and clinical wait-time management systems.
            </p>

            {/* Call to Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.6rem' }}
              >
                <FileText size={18} />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                href="/projects"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.6rem' }}
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/forgeiq-case-study"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.6rem' }}
              >
                <span>5.5x Optimization Case Study</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}
              >
                <Code2 size={16} />
                <span>LeetCode (100+ Solved)</span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}
              >
                <Mail size={16} />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Engineering Metrics Row */}
      <section style={{
        padding: '2.5rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Resume-Verified Engineering Metrics
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={13} />
              <span>Evidence-Backed</span>
            </span>
          </div>

          <div className="metric-grid">
            <MetricCard
              label="Pricing Accuracy"
              value="96.9%"
              detail="Tested on production CAD benchmark models"
              variant="blue"
              badge="ForgeIQ"
            />
            <MetricCard
              label="Secure REST Endpoints"
              value="40+"
              detail="FastAPI with JWT auth & rate limiting"
              variant="default"
              badge="Architecture"
            />
            <MetricCard
              label="LeetCode Problems Solved"
              value="100+"
              detail="Arrays, Trees, Graphs, Dynamic Programming"
              variant="default"
              badge="Core CS"
            />
            <MetricCard
              label="Throughput Gain"
              value="5.5x"
              detail="Load tested from 860 to 4,589 req/s"
              variant="emerald"
              badge="Optimization"
            />
            <MetricCard
              label="Verified Test Suite"
              value="33 + 14"
              detail="33 Pytest unit tests & 14 Playwright E2E"
              variant="default"
              badge="Reliability"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
                Engineering Work
              </div>
              <h2>Featured Projects</h2>
              <p style={{ marginTop: '0.5rem', maxWidth: '600px' }}>
                End-to-end software implementations designed for manufacturing intelligence and clinical operational workflows.
              </p>
            </div>
            <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#60a5fa', fontWeight: 600 }}>
              <span>View All Technical Details</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="badge badge-emerald" style={{ marginBottom: '0.65rem' }}>
              Skills & Foundation
            </div>
            <h2>Core Technical Competencies</h2>
            <p style={{ marginTop: '0.5rem', maxWidth: '650px' }}>
              Strictly aligned with demonstrated coursework at BMSCE and project implementations. No arbitrary percentage bars.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {/* Languages */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Terminal size={20} color="#60a5fa" />
                <h3 style={{ fontSize: '1.15rem' }}>Languages</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.languages.map((lang) => (
                  <span key={lang} className="font-mono" style={{
                    fontSize: '0.825rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Core CS */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Layers size={20} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem' }}>Core CS</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.coreCS.map((c) => (
                  <span key={c} style={{
                    fontSize: '0.825rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Web & Tools */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Cpu size={20} color="#a855f7" />
                <h3 style={{ fontSize: '1.15rem' }}>Web & Tools</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.webAndTools.map((tool) => (
                  <span key={tool} style={{
                    fontSize: '0.825rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Applied AI */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <BrainCircuit size={20} color="#f59e0b" />
                <h3 style={{ fontSize: '1.15rem' }}>AI / ML (Applied)</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.appliedAI.map((ai) => (
                  <span key={ai} style={{
                    fontSize: '0.825rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}>
                    {ai}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solving & AI Learning Tracks */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* LeetCode Card */}
            <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div className="badge badge-blue">Algorithmic Problem Solving</div>
                  <Code2 size={20} color="#60a5fa" />
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {problemSolving.solvedCount}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                  Problems Solved on LeetCode
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Focusing on core algorithmic patterns and edge-case handling across key topics:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {problemSolving.topics.map((t) => (
                    <span key={t} style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      color: '#93c5fd',
                      fontWeight: 600,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={problemSolving.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-start', gap: '0.4rem' }}
              >
                <span>View LeetCode Profile</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* AI Learning Tracks Card */}
            <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div className="badge badge-purple">Applied AI Foundations</div>
                  <BrainCircuit size={20} color="#d8b4fe" />
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  10 Tracks
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                  AI Learning Badges & Tracks
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {aiLearning.summary}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {aiLearning.tracks.map((track) => (
                    <div key={track.name} style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.8rem',
                    }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{track.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{track.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/notes"
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-start', gap: '0.4rem' }}
              >
                <span>Read Technical Notes</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Community Highlights */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="badge badge-amber" style={{ marginBottom: '0.65rem' }}>
              Recognition & Service
            </div>
            <h2>Scholarship & Leadership</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* FFE Scholarship */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Award size={20} color="#f59e0b" />
                <h3 style={{ fontSize: '1.15rem' }}>FFE Scholarship</h3>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '0.4rem' }}>
                Foundation for Excellence · Awarded Dec 2024
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Awarded the prestigious Foundation for Excellence (FFE) merit-cum-means scholarship in recognition of academic excellence and commitment to engineering.
              </p>
            </div>

            {/* Rotaract BMSCE */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem' }}>Rotaract Club of BMSCE</h3>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '0.4rem' }}>
                Member & Social Services Volunteer · 2024–Present
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Actively participating in student community welfare initiatives and college social outreach programs.
              </p>
            </div>

            {/* Health & Education Initiatives */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="#60a5fa" />
                <h3 style={{ fontSize: '1.15rem' }}>Community Outreach</h3>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '0.4rem' }}>
                Drug Free Karnataka & UTASV
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Volunteered for youth health awareness (Drug Free Karnataka, July 2025) and student education initiative drives (UTASV, April–May 2025).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Fast Track CTA */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(16, 185, 129, 0.08))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '0.75rem' }}>
                Looking for an engineering intern or junior engineer?
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                I am actively seeking software engineering internship opportunities where I can apply my experience in backend systems, REST APIs, Python/FastAPI, Next.js, and core problem solving.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.45rem' }}
              >
                <FileText size={16} />
                <span>Download Resume (PDF)</span>
              </a>
              <Link href="/contact" className="btn btn-secondary">
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
