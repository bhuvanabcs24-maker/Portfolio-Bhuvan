'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function WritingApp() {
  const articles = [
    {
      title: 'Why CAD Understanding Is Difficult for Manufacturing Automation',
      status: 'Published',
      category: 'Manufacturing Technology',
      readTime: '8 min read',
      slug: 'why-cad-understanding-is-difficult',
      summary: 'An engineering analysis of geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF files requires graph math rather than generative AI vision models.'
    },
    {
      title: 'Designing AI Systems That Fail Safely in Industrial Pipelines',
      status: 'Draft',
      category: 'AI Engineering',
      readTime: '6 min read',
      slug: '#',
      summary: 'Deterministic boundaries, fallback providers, and structured Pydantic schema validation when integrating LLMs into operations.'
    },
    {
      title: 'Evaluating RAG Beyond Simple Vector Cosine Accuracy',
      status: 'Draft',
      category: 'Vector & Search',
      readTime: '7 min read',
      slug: '#',
      summary: 'Why unfiltered semantic similarity breaks on industrial metadata and how pre-filtering restores retrieval precision.'
    }
  ];

  return (
    <div className="os-app-container">
      <div className="os-app-scroll-content">
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>
            Engineering Notes
          </div>
          <h2 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>
            Technical Writing Hub
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '0.2rem' }}>
            In-depth analyses documenting real domain hurdles, computational geometry, and reliable software system design.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {articles.map((art, idx) => (
            <div key={idx} className="os-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span className={`badge ${art.status === 'Published' ? 'badge-emerald' : 'badge-gray'}`}>
                    {art.status}
                  </span>
                  <span className="badge badge-blue">{art.category}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{art.readTime}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>
                {art.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {art.summary}
              </p>

              {art.status === 'Published' ? (
                <Link href={`/writing/${art.slug}`} className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', fontSize: '0.75rem', gap: '0.4rem' }}>
                  <span>Read Note</span>
                  <ExternalLink size={12} />
                </Link>
              ) : (
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>Draft in progress</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/writing" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            <span>Browse All 5 Technical Notes</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
