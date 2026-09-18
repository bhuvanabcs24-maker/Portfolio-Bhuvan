'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Code2, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function ContactPage() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '0.65rem' }}>
            Get In Touch
          </div>
          <h1>Contact &amp; Connect</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.65 }}>
            I am actively seeking software engineering internships and technical roles where I can contribute to backend systems, applied AI software, and full-stack applications.
          </p>
        </div>

        {/* Primary Contact Card */}
        <div className="card-elevated" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Direct Email
          </h2>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(8, 12, 20, 0.7)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={22} color="#60a5fa" />
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {personal.email}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Official BMSCE Institutional Email
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={copyEmail}
                className="btn btn-sm btn-secondary"
                style={{ gap: '0.4rem' }}
                aria-label="Copy email address"
              >
                {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <a
                href={`mailto:${personal.email}`}
                className="btn btn-sm btn-primary"
                style={{ gap: '0.4rem' }}
              >
                <Mail size={14} />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <GraduationCap size={16} color="#60a5fa" />
              <span>{personal.college}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={16} color="#10b981" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Verified Profiles &amp; Code
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {/* GitHub */}
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <GithubIcon size={24} color="#ffffff" />
              <ExternalLink size={15} color="var(--text-muted)" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
              GitHub
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Explore repositories including ForgeIQ and QWait Estimator.
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <LinkedinIcon size={24} color="#60a5fa" />
              <ExternalLink size={15} color="var(--text-muted)" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
              LinkedIn
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Connect with me professionally and follow my engineering journey.
            </p>
          </a>

          {/* LeetCode */}
          <a
            href={personal.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Code2 size={24} color="#fbbf24" />
              <ExternalLink size={15} color="var(--text-muted)" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
              LeetCode
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              100+ algorithmic problems solved across key data structures.
            </p>
          </a>
        </div>

        {/* Resume Download CTA */}
        <div style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(59, 130, 246, 0.07)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>Official One-Page Resume</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Direct PDF download of my verified resume (Expected June 2028, CGPA 8.08).
            </p>
          </div>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ gap: '0.5rem' }}
          >
            <FileText size={16} />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
