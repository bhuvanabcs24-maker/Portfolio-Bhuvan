'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function ContactApp() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>
            Recruiter & Peer Channel
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>
            Get in Touch with Bhuvan
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Available for software engineering internships, systems architecture discussions, and technical collaboration.
          </p>
        </div>

        {/* Quick Contact Badges */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <a 
            href="mailto:bhuvanab.cs24@bmsce.ac.in" 
            className="os-contact-chip"
          >
            <Mail size={14} color="#60a5fa" />
            <span>bhuvanab.cs24@bmsce.ac.in</span>
          </a>
          <a 
            href="https://github.com/bhuvanabcs24-maker" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="os-contact-chip"
          >
            <GithubIcon size={14} color="#34d399" />
            <span>GitHub Profile</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/bhuvan-a-b-4805a2330/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="os-contact-chip"
          >
            <LinkedinIcon size={14} color="#a855f7" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="os-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            <CheckCircle2 size={32} color="#34d399" style={{ margin: '0 auto 0.5rem' }} />
            <h4 style={{ color: '#f1f5f9', fontSize: '1rem' }}>Message Dispatched</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Thank you for reaching out! You can also email directly at <strong style={{ color: '#60a5fa' }}>bhuvanab.cs24@bmsce.ac.in</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
                Your Name / Company
              </label>
              <input 
                type="text" 
                required
                className="os-input"
                placeholder="e.g. Alex (Engineering Manager)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
                Your Email
              </label>
              <input 
                type="email" 
                required
                className="os-input"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
                Message
              </label>
              <textarea 
                rows={3} 
                required
                className="os-input"
                placeholder="Hi Bhuvan, saw your ForgeIQ case study and wanted to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', gap: '0.4rem', marginTop: '0.25rem' }}>
              <Send size={13} />
              <span>Send Dispatch</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
