#!/usr/bin/env python3
"""
Generator for index.html (Static HTML Homepage).
Strictly matches the 10-step recruiter hierarchy and narrative arc of src/app/page.tsx.
"""

import os

def generate_homepage_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bhuvan A B | Software Engineer — BMSCE Expected 2028</title>
  <meta name="description" content="Personal software engineering portfolio of Bhuvan A B, Computer Science student at BMSCE Bangalore (Expected 2028). Builder of ForgeIQ, QWait Estimator, and open-source CAD geometry systems.">
  <link rel="canonical" href="https://bhuvanab.dev/index.html">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://bhuvanab.dev/index.html">
  <meta property="og:title" content="Bhuvan A B | Software Engineer — BMSCE Expected 2028">
  <meta property="og:description" content="Personal software engineering portfolio of Bhuvan A B, Computer Science student at BMSCE Bangalore (Expected 2028). Builder of ForgeIQ, QWait Estimator, and open-source CAD geometry systems.">
  <meta property="og:site_name" content="Bhuvan A B Portfolio">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bhuvan A B | Software Engineer — BMSCE Expected 2028">
  <meta name="twitter:description" content="Personal software engineering portfolio of Bhuvan A B, Computer Science student at BMSCE Bangalore (Expected 2028). Builder of ForgeIQ, QWait Estimator, and open-source CAD geometry systems.">

  <!-- Performance & Favicon -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Site Header & Navigation -->
  <header class="site-header">
    <div class="container nav-container">
      <a href="index.html" class="nav-brand">
        <div class="brand-icon">B</div>
        <div>
          <span style="font-weight: 700; font-size: 1rem; color: var(--text-primary); display: block;">Bhuvan A B</span>
          <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">BMSCE · Expected 2028</span>
        </div>
      </a>

      <nav class="nav-links">
        <a href="index.html" class="active">Home</a>
        <a href="projects.html">Projects</a>
        <a href="forgeiq-case-study.html">ForgeIQ Case Study</a>
        <a href="engineering.html">Engineering</a>
        <a href="opensource.html">Open Source</a>
        <a href="writing.html">Writing / Notes</a>
        <a href="about.html">About</a>
        <a href="certifications.html">Certifications</a>
        <a href="contact.html">Contact</a>
        <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="margin-left: 0.5rem; gap: 0.4rem;">
          <span>Resume</span>
        </a>
      </nav>

      <button class="mobile-toggle" aria-label="Toggle navigation menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>

    <div class="mobile-menu">
      <a href="index.html" style="color: var(--text-accent); font-weight: 600;">Home</a>
      <a href="projects.html">Projects</a>
      <a href="forgeiq-case-study.html">ForgeIQ Case Study</a>
      <a href="engineering.html">Engineering</a>
      <a href="opensource.html">Open Source</a>
      <a href="writing.html">Writing / Notes</a>
      <a href="about.html">About</a>
      <a href="certifications.html">Certifications</a>
      <a href="contact.html">Contact</a>
      <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
        <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;">
          Download Resume (PDF)
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- =======================================================
         1. HERO SECTION — Recruiter-Optimized (15-Second Clarity)
         ======================================================= -->
    <section id="hero" class="section" style="padding-top: 4.5rem; padding-bottom: 3.5rem;">
      <div class="container">
        <div style="max-width: 900px;">
          <!-- Status Pill -->
          <div style="display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); margin-bottom: 1.5rem;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #10b981; box-shadow: 0 0 8px #10b981;"></span>
            <span style="font-size: 0.825rem; font-weight: 600; color: #93c5fd; font-family: var(--font-mono);">
              BMS College of Engineering (BMSCE) · Expected June 2028 · CGPA: 8.08
            </span>
          </div>

          <!-- Headline -->
          <h1 style="font-size: clamp(2.4rem, 5vw, 3.75rem); letter-spacing: -0.03em; margin-bottom: 0.75rem; line-height: 1.15;">
            Hi, I'm <span style="color: #60a5fa;">Bhuvan A B</span>.
            <br>
            <span style="font-size: clamp(1.6rem, 3.5vw, 2.5rem); font-weight: 700; color: var(--text-secondary);">
              Software Engineer building reliable backend systems & applied AI software.
            </span>
          </h1>

          <!-- Narrative Statement -->
          <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 2.25rem;">
            Computer Science student at BMSCE. Learned full-stack development, built practical systems, and became interested in production-oriented AI architectures. Builder of <strong>ForgeIQ</strong>—an AI manufacturing intelligence platform combining deterministic CAD geometry parsing, 40+ REST endpoints, and 47 automated tests. Deepening software engineering and AI systems craft.
          </p>

          <!-- 6 Primary Recruiter CTAs -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; align-items: center; margin-bottom: 2.5rem;">
            <a href="forgeiq-case-study.html" class="btn btn-primary" style="gap: 0.5rem; padding: 0.75rem 1.4rem;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>Explore ForgeIQ Flagship</span>
            </a>

            <a href="https://github.com/bhuvanabcs24-maker" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.75rem 1.3rem;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <span>GitHub</span>
            </a>

            <a href="https://www.linkedin.com/in/bhuvan-a-b-4805a2330/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.75rem 1.3rem;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>

            <a href="https://leetcode.com/u/BHUVANab2006/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.75rem 1.3rem; color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span>LeetCode (100+ Solved)</span>
            </a>

            <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.75rem 1.3rem;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              <span>Resume (PDF)</span>
            </a>

            <a href="contact.html" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.75rem 1.3rem;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              <span>Contact</span>
            </a>
          </div>

          <!-- Credibility Micro-Bar -->
          <div style="display: flex; flex-wrap: wrap; gap: 1.75rem; align-items: center; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Zero Fabricated Claims</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>47 Automated Tests (Pytest + Playwright)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>96.9% Verified Pricing Benchmark</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         2. ENGINEERING POSITIONING — Narrative Arc
         ======================================================= -->
    <section id="positioning" class="section-tight" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 2.5rem;">
          <div class="badge badge-blue" style="margin-bottom: 0.65rem;">
            Engineering Mindset
          </div>
          <h2 style="font-size: 2rem; letter-spacing: -0.02em; margin-bottom: 0.75rem;">
            How I Approach Software Engineering
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.65;">
            I treat software systems as rigorous engineering artifacts rather than rapid prototype wrappers. My work prioritizes deterministic algorithms for ground truth, defense-in-depth error containment, and measurable system performance.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem;">
          <div class="card" style="background: rgba(14, 20, 34, 0.6);">
            <div style="font-size: 0.8rem; font-weight: 700; color: #60a5fa; margin-bottom: 0.4rem;">01 / ACADEMIC FOUNDATIONS</div>
            <h3 style="font-size: 1.1rem; marginBottom: 0.5rem;">Core CS & Data Structures</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              Undergraduate study at BMSCE (CGPA: 8.08). Strong emphasis on Data Structures, Object-Oriented Design in C & Java, Relational Databases, and SQL querying.
            </p>
          </div>

          <div class="card" style="background: rgba(14, 20, 34, 0.6);">
            <div style="font-size: 0.8rem; font-weight: 700; color: #a855f7; margin-bottom: 0.4rem;">02 / PRACTICAL FULL-STACK</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Real-World Applications</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              Built QWait Estimator—a zero-friction clinic queue telematics application utilizing Next.js, Supabase, and dynamic QR check-ins to solve waiting room congestion.
            </p>
          </div>

          <div class="card" style="background: rgba(14, 20, 34, 0.6);">
            <div style="font-size: 0.8rem; font-weight: 700; color: #10b981; margin-bottom: 0.4rem;">03 / SYSTEMS & APPLIED AI</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">ForgeIQ Architecture</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              Engineered deterministic CAD feature parsing, 40+ FastAPI endpoints, and an end-to-end 9-stage order tracking pipeline. Optimized throughput 5.5x under load.
            </p>
          </div>

          <div class="card" style="background: rgba(14, 20, 34, 0.6);">
            <div style="font-size: 0.8rem; font-weight: 700; color: #fbbf24; margin-bottom: 0.4rem;">04 / DEEPENING CRAFT</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Rigor & Open Software</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              100+ LeetCode algorithmic problems solved, standalone open-source geometry extractions (<code style="font-family: var(--font-mono); color: #60a5fa;">dxf-contour-extractor</code>), and technical deep-dives.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         3. FORGEIQ FLAGSHIP CENTERPIECE
         ======================================================= -->
    <section id="forgeiq" class="section">
      <div class="container">
        <div class="card-elevated" style="padding: 3rem; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #3b82f6, #10b981);"></div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.75rem;">
            <div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.65rem;">
                <span class="badge badge-emerald">Flagship Engineering Centerpiece</span>
                <span class="badge badge-blue">Manufacturing Intelligence</span>
              </div>
              <h2 style="font-size: 2.5rem; letter-spacing: -0.03em; margin-bottom: 0.35rem;">
                ForgeIQ
              </h2>
              <p style="font-size: 1.15rem; color: #93c5fd; font-weight: 600;">
                Automated CAD Geometry Parsing & Production Quotation Platform
              </p>
            </div>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="https://github.com/bhuvanabcs24-maker/Forge-IQ" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="gap: 0.4rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                <span>View Repository</span>
              </a>
              <a href="https://forge-iq-gold.vercel.app" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="gap: 0.4rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>Live Demo</span>
              </a>
              <a href="forgeiq-case-study.html" class="btn btn-primary btn-sm" style="gap: 0.4rem;">
                <span>5.5x Optimization Case Study</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <!-- Problem / Solution Banner -->
          <div style="padding: 1.25rem 1.5rem; border-radius: var(--radius-md); background: rgba(8, 12, 22, 0.7); border: 1px solid var(--border-subtle); margin-bottom: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <div>
              <strong style="color: #f87171; display: block; fontSize: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.25rem;">
                The Problem
              </strong>
              <p style="font-size: 0.925rem; color: var(--text-secondary); margin: 0; line-height: 1.55;">
                Manual sheet metal quotation takes hours of manual CAD polyline inspection, human drafting error calculations, and frequent pricing discrepancies across suppliers.
              </p>
            </div>
            <div>
              <strong style="color: #34d399; display: block; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.25rem;">
                The Engineering Solution
              </strong>
              <p style="font-size: 0.925rem; color: var(--text-secondary); margin: 0; line-height: 1.55;">
                Automated geometry extraction recovering closed boundaries from unlinked DXF primitives with spatial KD-Tree vertex snapping, coupled to parametric pricing formulas and a 9-stage tracking pipeline.
              </p>
            </div>
          </div>

          <!-- 5 Evidence Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 1.5rem; border-radius: var(--radius-md); background: rgba(8, 12, 20, 0.75); border: 1px solid var(--border-subtle); margin-bottom: 2.5rem;">
            <div>
              <div style="font-size: 1.85rem; font-weight: 800; font-family: var(--font-mono); color: #60a5fa;">96.9%</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">Pricing Accuracy</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Production benchmark test</div>
            </div>
            <div>
              <div style="font-size: 1.85rem; font-weight: 800; font-family: var(--font-mono); color: #60a5fa;">40+</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">REST Endpoints</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">FastAPI & JWT auth</div>
            </div>
            <div>
              <div style="font-size: 1.85rem; font-weight: 800; font-family: var(--font-mono); color: #60a5fa;">9 Stages</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">Production Pipeline</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">RFQ → Cut → Dispatched</div>
            </div>
            <div>
              <div style="font-size: 1.85rem; font-weight: 800; font-family: var(--font-mono); color: #34d399;">5.5x</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">Throughput Gain</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">860 → 4,589 req/s load test</div>
            </div>
            <div>
              <div style="font-size: 1.85rem; font-weight: 800; font-family: var(--font-mono); color: #60a5fa;">33 + 14</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">Automated Tests</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">33 Pytest + 14 Playwright</div>
            </div>
          </div>

          <!-- 4 Core Pillars -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(14, 20, 34, 0.5); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 1rem; color: #93c5fd; margin-bottom: 0.4rem;">1. CAD Feature Extraction Engine</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
                Deterministic extraction of 2D DXF contours, outer perimeters, holes, and bend allowances using <code style="font-family: var(--font-mono); color: #60a5fa;">ezdxf</code> and KD-Tree vertex snapping. Avoids LLM numerical hallucination.
              </p>
            </div>

            <div style="background: rgba(14, 20, 34, 0.5); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 1rem; color: #93c5fd; margin-bottom: 0.4rem;">2. Secure REST API (40+ Endpoints)</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
                Engineered modular FastAPI microservices backed by PostgreSQL. Implemented JWT role-based access control, tenant isolation, strict Pydantic validation, and structured error handlers.
              </p>
            </div>

            <div style="background: rgba(14, 20, 34, 0.5); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 1rem; color: #93c5fd; margin-bottom: 0.4rem;">3. Parametric Quotation Automation</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
                Parametric pricing calculations combining piercing counts, cutting tool travel, raw sheet utilization, and surface finishing rules. Achieved verified 96.9% accuracy on benchmark parts.
              </p>
            </div>

            <div style="background: rgba(14, 20, 34, 0.5); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 1rem; color: #93c5fd; margin-bottom: 0.4rem;">4. 9-Stage Order State Machine</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
                End-to-end multi-state tracking following physical manufacturing progress: RFQ → Quoted → Confirmed → Material allocated → Laser cut → Formed → Inspected → Dispatched.
              </p>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
            <span style="font-size: 0.85rem; color: var(--text-muted);">
              Detailed technical post-mortem: 5.5x throughput gain, architecture, database schemas, and lessons.
            </span>
            <a href="forgeiq-case-study.html" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #60a5fa; font-weight: 600; font-size: 0.9rem;">
              <span>Read Full Flagship Case Study</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         4. SELECTED PROJECTS
         ======================================================= -->
    <section id="projects" class="section" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-subtle);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem;">
          <div>
            <div class="badge badge-blue" style="margin-bottom: 0.65rem;">
              Applied Implementations
            </div>
            <h2 style="font-size: 2rem; letter-spacing: -0.02em;">Selected Projects</h2>
            <p style="margin-top: 0.5rem; max-width: 600px; color: var(--text-secondary);">
              Authentic software systems built and tested with verifiable codebases and automated test harnesses.
            </p>
          </div>
          <a href="projects.html" style="display: inline-flex; align-items: center; gap: 0.45rem; color: #60a5fa; font-weight: 600;">
            <span>View All Technical Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <!-- Project 1: ForgeIQ -->
          <div class="card-elevated" style="padding: 2.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <span class="badge badge-emerald" style="margin-bottom: 0.5rem;">Project #1 · Flagship Systems & Applied AI</span>
                <h3 style="font-size: 1.75rem; letter-spacing: -0.02em;">ForgeIQ</h3>
                <p style="font-size: 1rem; color: var(--text-accent); font-weight: 600; margin-top: 0.2rem;">
                  AI-Powered Manufacturing Intelligence Platform
                </p>
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <a href="https://github.com/bhuvanabcs24-maker/Forge-IQ" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">GitHub</a>
                <a href="https://forge-iq-gold.vercel.app" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Demo</a>
                <a href="forgeiq-case-study.html" class="btn btn-primary btn-sm">Case Study →</a>
              </div>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
              Deterministic CAD feature parsing and manufacturing quotation engine. Resolves human drafting micro-gaps with spatial KD-Tree vertex snapping, calculating cutting perimeters and laser pierce counts across 40+ REST API endpoints.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span class="tech-tag tech-tag-blue">Python</span>
              <span class="tech-tag tech-tag-blue">FastAPI</span>
              <span class="tech-tag tech-tag-blue">Next.js</span>
              <span class="tech-tag tech-tag-blue">PostgreSQL</span>
              <span class="tech-tag tech-tag-blue">ezdxf</span>
              <span class="tech-tag tech-tag-blue">networkx</span>
              <span class="tech-tag tech-tag-blue">Playwright</span>
            </div>
          </div>

          <!-- Project 2: QWait Estimator -->
          <div class="card-elevated" style="padding: 2.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <span class="badge badge-purple" style="margin-bottom: 0.5rem;">Project #2 · Full-Stack Web Application</span>
                <h3 style="font-size: 1.75rem; letter-spacing: -0.02em;">QWait Estimator</h3>
                <p style="font-size: 1rem; color: #d8b4fe; font-weight: 600; margin-top: 0.2rem;">
                  Queue & Wait-Time Management Platform
                </p>
              </div>
              <div>
                <a href="https://github.com/bhuvanabcs24-maker/QueueEstimater" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">GitHub Repository</a>
              </div>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
              Zero-friction patient check-in system for medical clinics. Dynamic on-site QR codes allow patients to track their position in browser without app downloads, backed by doctor operational dashboards and clinic floor navigation.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span class="tech-tag tech-tag-purple">Next.js</span>
              <span class="tech-tag tech-tag-purple">TypeScript</span>
              <span class="tech-tag tech-tag-purple">Supabase</span>
              <span class="tech-tag tech-tag-purple">QR Check-in</span>
              <span class="tech-tag tech-tag-purple">Live Telematics</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         5. ENGINEERING CAPABILITIES — 6 Deep-Dive Artifact Hubs
         ======================================================= -->
    <section id="capabilities" class="section">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 3rem;">
          <div class="badge badge-purple" style="margin-bottom: 0.65rem;">
            Deep Engineering Systems
          </div>
          <h2 style="font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 0.75rem;">
            Engineering Capabilities & Artifacts
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.65;">
            Dedicated technical sections documenting architectural trade-offs, evaluation benchmarks, reusable design patterns, iteration failures, modular open-source packages, and technical notes.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
          
          <!-- 1. ADRs -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-amber">14 Records</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Architecture</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                Architectural Decisions (ADRs)
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                14 structured records analyzing real system trade-offs: PostgreSQL vs MongoDB, FastAPI concurrency, pgvector hybrid search, and deterministic geometry boundaries.
              </p>
            </div>
            <a href="engineering/decisions/index.html" class="btn btn-secondary btn-sm" style="align-self: flex-start;">
              <span>Browse 14 ADRs →</span>
            </a>
          </div>

          <!-- 2. Eval Lab -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-purple">8-Pillar Framework</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">AI Systems</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                AI Evaluation Lab
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Measurement framework covering 7 physical failure modes, hallucination containment, schema enforcement, MRR@5 retrieval metrics, and latency/cost trade-offs.
              </p>
            </div>
            <a href="engineering/evaluation/index.html" class="btn btn-secondary btn-sm" style="align-self: flex-start; color: #d8b4fe; border-color: rgba(168, 85, 247, 0.4);">
              <span>Open Evaluation Lab →</span>
            </a>
          </div>

          <!-- 3. Patterns -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-emerald">5 Reusable Patterns</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Handbook</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                Engineering Patterns
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Architectural handbook of 5 genuine patterns: AI Provider Factory, Deterministic Grounding, RBAC State Machine, Hybrid Search, and Heavy Worker Offload.
              </p>
            </div>
            <a href="engineering/patterns/index.html" class="btn btn-secondary btn-sm" style="align-self: flex-start; color: #6ee7b7; border-color: rgba(52, 211, 153, 0.4);">
              <span>Explore Patterns →</span>
            </a>
          </div>

          <!-- 4. Learnings -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-amber">6 Retrospectives</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Iteration Stories</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                Engineering Learnings
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Honest retrospective: 6 stories detailing what was tried, what broke, why it was a problem, and the architectural shifts implemented in response.
              </p>
            </div>
            <a href="engineering/learnings/index.html" class="btn btn-secondary btn-sm" style="align-self: flex-start; color: #fcd34d; border-color: rgba(245, 158, 11, 0.4);">
              <span>Read 6 Stories →</span>
            </a>
          </div>

          <!-- 5. Open Source -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-emerald">Extracted Package</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Modularity</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                Open Source Hub
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Standalone Python package <code style="font-family: var(--font-mono); color: #34d399;">dxf-contour-extractor</code> (KD-Tree vertex snapping & cycle basis loop extraction) plus 3 decoupling roadmaps.
              </p>
            </div>
            <a href="opensource.html" class="btn btn-secondary btn-sm" style="align-self: flex-start; color: #34d399; border-color: rgba(16, 185, 129, 0.4);">
              <span>Explore Packages →</span>
            </a>
          </div>

          <!-- 6. Writing -->
          <div class="card-elevated" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-blue">Writing Hub</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Technical Notes</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--text-primary);">
                Technical Writing
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Technical writing hub with 6 topic filters and deep dives on CAD geometry parsing traps, safe AI system design, and manufacturing state orchestration.
              </p>
            </div>
            <a href="writing.html" class="btn btn-secondary btn-sm" style="align-self: flex-start; color: #60a5fa; border-color: rgba(96, 165, 250, 0.4);">
              <span>Read Technical Notes →</span>
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- =======================================================
         6. CAREER & LEARNING TIMELINE (2024–2027)
         ======================================================= -->
    <section id="timeline" class="section" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 3rem;">
          <div class="badge badge-amber" style="margin-bottom: 0.65rem;">
            Growth & Trajectory
          </div>
          <h2 style="font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 0.75rem;">
            Career & Learning Timeline
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.65;">
            A transparent view of how my skills evolved from core computer science foundations into full-stack systems, applied AI, and production engineering.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          
          <!-- 2024 -->
          <div class="card" style="background: rgba(14, 21, 37, 0.7); border: 1px solid var(--border-medium); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; color: #60a5fa; margin-bottom: 0.65rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>2024</span>
              </div>
              <h3 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                Foundations & Full-Stack Experimentation
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Explored fundamental computer science principles, core data structures in C and Java, and modern web application development with React and JavaScript.
              </p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
              <span class="tech-tag" style="font-size: 0.75rem;">Core CS</span>
              <span class="tech-tag" style="font-size: 0.75rem;">Data Structures</span>
              <span class="tech-tag" style="font-size: 0.75rem;">JavaScript</span>
              <span class="tech-tag" style="font-size: 0.75rem;">C & Java</span>
            </div>
          </div>

          <!-- 2025 -->
          <div class="card" style="background: rgba(14, 21, 37, 0.7); border: 1px solid var(--border-medium); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; color: #60a5fa; margin-bottom: 0.65rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>2025</span>
              </div>
              <h3 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                Backend + Databases + AI Exploration
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Deepened backend systems engineering: relational modeling with PostgreSQL, high-performance async APIs with FastAPI, and early experiments with LLM prompting and vector retrieval.
              </p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
              <span class="tech-tag" style="font-size: 0.75rem;">FastAPI</span>
              <span class="tech-tag" style="font-size: 0.75rem;">PostgreSQL</span>
              <span class="tech-tag" style="font-size: 0.75rem;">Relational Modeling</span>
              <span class="tech-tag" style="font-size: 0.75rem;">LLM APIs</span>
            </div>
          </div>

          <!-- 2026 -->
          <div class="card" style="background: rgba(14, 21, 37, 0.7); border: 1px solid var(--border-medium); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; color: #34d399; margin-bottom: 0.65rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>2026</span>
              </div>
              <h3 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                ForgeIQ + Production AI Engineering
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Architected and engineered ForgeIQ: combining deterministic CAD computational geometry with LLM intelligence, 40+ REST endpoints, 47 automated tests, and 5.5x throughput optimization.
              </p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
              <span class="tech-tag" style="font-size: 0.75rem;">ForgeIQ</span>
              <span class="tech-tag" style="font-size: 0.75rem;">CAD Geometry</span>
              <span class="tech-tag" style="font-size: 0.75rem;">Systems Architecture</span>
              <span class="tech-tag" style="font-size: 0.75rem;">47 Tests</span>
            </div>
          </div>

          <!-- 2027 -->
          <div class="card" style="background: rgba(14, 21, 37, 0.7); border: 1px solid var(--border-medium); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; color: #60a5fa; margin-bottom: 0.65rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>2027</span>
              </div>
              <h3 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                Interview Prep + Deeper Systems/AI
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                Deepening algorithmic problem solving (100+ LeetCode problems solved), distributed system design patterns, concurrency models, and resilient AI system architectures.
              </p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
              <span class="tech-tag" style="font-size: 0.75rem;">LeetCode 100+</span>
              <span class="tech-tag" style="font-size: 0.75rem;">System Design</span>
              <span class="tech-tag" style="font-size: 0.75rem;">Distributed Systems</span>
              <span class="tech-tag" style="font-size: 0.75rem;">Applied AI</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =======================================================
         7. FEATURED TECHNICAL WRITING NOTE
         ======================================================= -->
    <section id="writing" class="section">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
          <div>
            <div class="badge badge-blue" style="margin-bottom: 0.5rem;">
              Technical Writing Note
            </div>
            <h2 style="font-size: 2rem; letter-spacing: -0.02em;">Featured Article</h2>
          </div>
          <a href="writing.html" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #60a5fa; fontWeight: 600; font-size: 0.9rem;">
            <span>View All 5 Notes in Writing Hub</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div class="card-elevated" style="padding: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span class="badge badge-emerald">Published Note</span>
              <span class="tech-tag tech-tag-blue">Manufacturing Technology</span>
              <span class="tech-tag tech-tag-blue">AI Engineering</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">12 min read · September 2026</span>
          </div>

          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">
            Why CAD Understanding Is Difficult for Manufacturing Automation
          </h3>
          <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">
            Geometric tolerance traps, unclosed polyline loops, and why parsing 2D DXF files requires graph math rather than generative AI. Explores KD-Tree vertex snapping to bridge drafting micro-gaps and deterministic piercing calculations.
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Related component: <code style="font-family: var(--font-mono); color: #60a5fa;">backend/services/cad_preprocessor.py</code>
            </div>
            <a href="writing/why-cad-understanding-is-difficult/index.html" class="btn btn-primary btn-sm" style="gap: 0.4rem;">
              <span>Read Full Note</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         8. FEATURED ENGINEERING LEARNING STORY
         ======================================================= -->
    <section id="learnings" class="section" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-subtle);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
          <div>
            <div class="badge badge-amber" style="margin-bottom: 0.5rem;">
              Iteration & System Retrospective
            </div>
            <h2 style="font-size: 2rem; letter-spacing: -0.02em;">Featured Engineering Learning</h2>
          </div>
          <a href="engineering/learnings/index.html" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #f59e0b; font-weight: 600; font-size: 0.9rem;">
            <span>View All 6 Retrospective Stories</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div class="card-elevated" style="padding: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; gap: 0.5rem;">
              <span class="badge badge-amber">Story #1 · Concurrency Architecture</span>
              <span class="badge badge-emerald">5.5x Throughput</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">FastAPI & ProcessPoolExecutor</span>
          </div>

          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--text-primary);">
            Moving Heavy CAD Geometry Math from Async Event Loops to Dedicated Worker Pools
          </h3>
          <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">
            <strong>What Happened:</strong> Under load testing, heavy 3D STEP B-Rep parsing blocked Python's single-threaded async event loop, causing API throughput to collapse at 860 req/s with latency spikes exceeding 3,000ms.
            <br>
            <strong>What Changed:</strong> Decoupled CPU-bound boundary math into a <code style="font-family: var(--font-mono); color: #60a5fa;">ProcessPoolExecutor</code> with worker timeouts. Event loop stayed non-blocking, scaling throughput to <strong>4,589 req/s (5.5x gain)</strong>.
          </p>

          <a href="engineering/learnings/index.html#story-1" class="btn btn-secondary btn-sm" style="gap: 0.4rem; color: #fcd34d; border-color: rgba(245, 158, 11, 0.4);">
            <span>Inspect Full Iteration Story</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- =======================================================
         9. LEETCODE & PROBLEM SOLVING + SOCIAL PROOF
         ======================================================= -->
    <section id="leetcode" class="section">
      <div class="container">
        <div class="card-elevated" style="padding: 2.5rem; background: linear-gradient(135deg, rgba(14, 21, 37, 0.8), rgba(20, 16, 41, 0.85));">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div>
              <div class="badge badge-amber" style="margin-bottom: 0.5rem;">
                Algorithmic Problem Solving
              </div>
              <h2 style="font-size: 2rem; letter-spacing: -0.02em; margin-bottom: 0.4rem;">
                100+ Problems Solved on LeetCode
              </h2>
              <p style="color: var(--text-secondary); max-width: 650px; line-height: 1.6;">
                Continuous practice across core algorithmic paradigms and data structures: Arrays, Two Pointers, Sliding Window, Trees, Graphs, and Dynamic Programming.
              </p>
            </div>

            <a href="https://leetcode.com/u/BHUVANab2006/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="gap: 0.5rem; background-color: #d97706; border-color: #b45309;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span>Verify LeetCode Profile</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            <span class="tech-tag tech-tag-purple" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Arrays</span>
            <span class="tech-tag tech-tag-purple" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Trees</span>
            <span class="tech-tag tech-tag-purple" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Graphs</span>
            <span class="tech-tag tech-tag-purple" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Dynamic Programming</span>
            <span class="tech-tag tech-tag-blue" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Binary Search</span>
            <span class="tech-tag tech-tag-blue" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Hash Tables</span>
            <span class="tech-tag tech-tag-blue" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">Breadth-First Search</span>
          </div>

          <!-- Social Proof Channels Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
            <a href="https://github.com/bhuvanabcs24-maker" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.65rem; color: var(--text-primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">GitHub</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">github.com/bhuvanabcs24-maker</div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/bhuvan-a-b-4805a2330/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.65rem; color: var(--text-primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">LinkedIn</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">linkedin.com/in/bhuvan-a-b...</div>
              </div>
            </a>

            <a href="resume.pdf" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.65rem; color: var(--text-primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">Resume</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">PDF (Verified Source of Truth)</div>
              </div>
            </a>

            <a href="mailto:bhuvanab.cs24@bmsce.ac.in" style="display: flex; align-items: center; gap: 0.65rem; color: var(--text-primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">Email</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">bhuvanab.cs24@bmsce.ac.in</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =======================================================
         10. RECRUITER CONTACT SECTION
         ======================================================= -->
    <section id="contact" class="section" style="padding-bottom: 6rem;">
      <div class="container">
        <div style="max-width: 750px; margin: 0 auto; text-align: center; padding: 3rem 2rem; border-radius: var(--radius-lg); background: rgba(14, 21, 37, 0.5); border: 1px solid var(--border-medium);">
          <div class="badge badge-blue" style="margin-bottom: 0.75rem;">
            Let's Connect
          </div>
          <h2 style="font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 0.75rem;">
            Interested in discussing software engineering or systems architecture?
          </h2>
          <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.65; margin-bottom: 2rem;">
            I am open to software engineering internships and collaborative engineering discussions. Feel free to explore my code repositories or reach out directly.
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="mailto:bhuvanab.cs24@bmsce.ac.in" class="btn btn-primary" style="gap: 0.5rem; padding: 0.8rem 1.8rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              <span>Send Email (bhuvanab.cs24@bmsce.ac.in)</span>
            </a>
            <a href="contact.html" class="btn btn-secondary" style="gap: 0.5rem; padding: 0.8rem 1.8rem;">
              <span>Contact Page</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem;">
            <div class="brand-icon" style="width: 1.75rem; height: 1.75rem; font-size: 0.85rem;">B</div>
            <span style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">Bhuvan A B</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.5;">
            Computer Science &amp; Engineering Student<br>
            <strong style="color: var(--text-primary);">BMS College of Engineering (BMSCE)</strong>
          </p>
          <p style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
            Expected June 2028 · CGPA: 8.08 / 10
          </p>
        </div>

        <div>
          <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 1rem;">Navigation</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
            <a href="index.html" style="color: var(--text-secondary);">Home</a>
            <a href="projects.html" style="color: var(--text-secondary);">Projects</a>
            <a href="forgeiq-case-study.html" style="color: var(--text-secondary);">ForgeIQ Case Study</a>
            <a href="engineering.html" style="color: var(--text-secondary);">Engineering</a>
            <a href="opensource.html" style="color: var(--text-secondary);">Open Source</a>
            <a href="writing.html" style="color: var(--text-secondary);">Writing / Notes</a>
            <a href="about.html" style="color: var(--text-secondary);">About</a>
            <a href="certifications.html" style="color: var(--text-secondary);">Certifications</a>
            <a href="contact.html" style="color: var(--text-secondary);">Contact</a>
          </div>
        </div>

        <div>
          <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 1rem;">Verification</h4>
          <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1rem;">
            All metrics, endpoints, and credentials on this portfolio are verified against authentic repository codebases and resume records.
          </p>
          <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="width: 100%;">
            View Official Resume (PDF)
          </a>
        </div>

        <div>
          <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 1rem;">Connect</h4>
          <div style="display: flex; flex-direction: column; gap: 0.55rem; font-size: 0.875rem;">
            <a href="https://github.com/bhuvanabcs24-maker" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary);">github.com/bhuvanabcs24-maker</a>
            <a href="https://www.linkedin.com/in/bhuvan-a-b-4805a2330/" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary);">LinkedIn Profile</a>
            <a href="https://leetcode.com/u/BHUVANab2006/" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary);">LeetCode Profile</a>
            <a href="mailto:bhuvanab.cs24@bmsce.ac.in" style="color: var(--text-secondary);">bhuvanab.cs24@bmsce.ac.in</a>
          </div>
        </div>
      </div>

      <div style="padding-top: 1.75rem; border-top: 1px solid var(--border-subtle); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; font-size: 0.8rem; color: var(--text-muted);">
        <div>© 2026 Bhuvan A B · Software Engineering Portfolio</div>
        <div>Expected June 2028 · BMS College of Engineering, Bengaluru</div>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
"""

def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    index_path = os.path.join(repo_root, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(generate_homepage_html())
    print(f"Generated {index_path} ({os.path.getsize(index_path)} bytes)")

if __name__ == "__main__":
    main()
