'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Send, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function ContactApp() {
  const [copied, setCopied] = useState<string | null>(null);
  const [termInput, setTermInput] = useState('');
  const [termOutput, setTermOutput] = useState<string | null>(null);

  const { email, socials } = PORTFOLIO_DATA.personal;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (cmd === 'email' || cmd === 'mail') {
      window.location.href = `mailto:${email}`;
      setTermOutput(`Launching mail client -> mailto:${email}`);
    } else if (cmd === 'linkedin' || cmd === 'in') {
      window.open(socials.linkedin, '_blank');
      setTermOutput(`Opening LinkedIn profile in external browser.`);
    } else if (cmd === 'github' || cmd === 'gh') {
      window.open(socials.github, '_blank');
      setTermOutput(`Opening GitHub profile in external browser.`);
    } else if (cmd === 'leetcode' || cmd === 'lc') {
      window.open(socials.leetcode, '_blank');
      setTermOutput(`Opening LeetCode profile in external browser.`);
    } else if (cmd === 'help') {
      setTermOutput('Available commands: email, linkedin, github, leetcode, clear');
    } else if (cmd === 'clear') {
      setTermOutput(null);
    } else {
      setTermOutput(`Unknown command '${cmd}'. Type: email, linkedin, github, leetcode, or help.`);
    }
    setTermInput('');
  };

  const channels = [
    {
      id: 'email',
      name: 'EMAIL',
      val: email,
      desc: 'Direct primary inbox for engineering roles & technical discussions',
      icon: <Mail size={18} color="#60a5fa" />,
      color: '#60a5fa',
      actionType: 'email',
      href: `mailto:${email}`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      val: 'bhuvan-a-b',
      desc: 'Professional engineering network, updates, & endorsements',
      icon: <LinkedinIcon size={18} color="#a855f7" />,
      color: '#a855f7',
      actionType: 'link',
      href: socials.linkedin
    },
    {
      id: 'github',
      name: 'GitHub',
      val: 'bhuvanabcs24-maker',
      desc: 'Open-source repositories, system architecture & test code',
      icon: <GithubIcon size={18} color="#34d399" />,
      color: '#34d399',
      actionType: 'link',
      href: socials.github
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      val: 'BHUVANab2006 (100+ Solved)',
      desc: 'Algorithmic problem solving across Trees, Graphs, DP & Hash Tables',
      icon: <LeetCodeIcon size={18} color="#f97316" />,
      color: '#f97316',
      actionType: 'link',
      href: socials.leetcode
    }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        {/* Terminal Header */}
        <div className="os-hero-card" style={{ marginBottom: '1.25rem' }}>
          <div className="os-card-badge-row">
            <span className="badge badge-emerald">COMMUNICATION TERMINAL</span>
            <span className="badge badge-blue">DIRECT DISPATCH // NO MIDDLEWARE</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.4rem 0' }}>
            Direct Contact Dispatcher
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Minimal, zero-overhead communication channels. Directly reach Bhuvan A B for software engineering opportunities, internships, and technical collaboration.
          </p>
        </div>

        {/* Channels List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {channels.map((ch) => (
            <div 
              key={ch.id} 
              className="os-contact-channel-row"
              style={{ borderColor: `${ch.color}25` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div 
                  className="os-contact-channel-icon"
                  style={{ background: `${ch.color}15`, color: ch.color, borderColor: `${ch.color}35` }}
                >
                  {ch.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>{ch.name}</strong>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: ch.color }}>
                      {ch.val}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    {ch.desc}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {ch.actionType === 'email' ? (
                  <>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => copyToClipboard(email, 'email')}
                      title="Copy email address"
                      style={{ fontSize: '0.75rem', gap: '0.35rem' }}
                    >
                      {copied === 'email' ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                      <span>{copied === 'email' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <a
                      href={ch.href}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.75rem', gap: '0.35rem' }}
                    >
                      <span>Send Mail</span>
                      <ArrowRight size={12} />
                    </a>
                  </>
                ) : (
                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', gap: '0.35rem' }}
                  >
                    <span>Open {ch.name}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Quick Dispatch Console */}
        <div className="os-card" style={{ padding: '0.85rem 1rem', background: '#050811', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b' }}>
              // QUICK COMMAND LAUNCHER
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#34d399' }}>
              ● DISPATCH ONLINE
            </span>
          </div>

          <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#10b981', fontSize: '0.85rem' }}>&gt;</span>
            <input 
              type="text"
              className="os-term-inline-input"
              placeholder="type 'email', 'linkedin', 'github', or 'leetcode' and press Enter..."
              value={termInput}
              onChange={(e) => setTermInput(e.target.value)}
            />
          </form>

          {termOutput && (
            <div style={{ marginTop: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#93c5fd' }}>
              {termOutput}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
