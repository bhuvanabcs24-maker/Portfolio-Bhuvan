'use client';

import React from 'react';
import { ExternalLink, Code2, CheckCircle2 } from 'lucide-react';

export default function LeetCodeApp() {
  const topics = [
    { name: 'Arrays & Two Pointers', level: 'Proficient', count: '35+' },
    { name: 'Trees & Binary Search', level: 'Proficient', count: '30+' },
    { name: 'Graphs & BFS/DFS', level: 'Proficient', count: '20+' },
    { name: 'Dynamic Programming', level: 'Active Focus', count: '15+' }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>
            Algorithmic Problem Solving
          </div>
          <h2 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
            LeetCode Telemetry: 100+ Problems Solved
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '0.2rem' }}>
            Consistent algorithmic practice focusing on optimal time/space complexity, data structure selection, and robust edge-case handling.
          </p>
        </div>

        {/* Big Metric Box */}
        <div className="os-metric-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.25rem', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                100+
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                Verified Problems Solved
              </div>
            </div>
            <a 
              href="https://leetcode.com/u/BHUVANab2006/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ background: '#d97706', borderColor: '#b45309', gap: '0.4rem' }}
            >
              <span>View LeetCode Profile (@BHUVANab2006)</span>
              <ExternalLink size={13} />
            </a>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
            No fake contest ratings or inflated rankings. Verified public profile.
          </div>
        </div>

        {/* Topic Breakdown */}
        <h3 style={{ fontSize: '0.95rem', color: '#93c5fd', marginBottom: '0.65rem' }}>
          Core Topic Breakdown
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {topics.map((t, i) => (
            <div key={i} className="os-card" style={{ padding: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f1f5f9' }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fbbf24' }}>{t.count}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: t.level === 'Proficient' ? '#34d399' : '#f59e0b' }}>
                {t.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
