#!/usr/bin/env python3
"""
Generator for:
- opensource.html (root Open Source Hub)
- opensource/index.html (nested route Open Source Hub)
"""

import os

def generate_opensource_html(base_path="."):
    css_path = "css/style.css" if base_path == "." else "../css/style.css"
    favicon_path = "favicon.ico" if base_path == "." else "../favicon.ico"
    js_path = "js/main.js" if base_path == "." else "../js/main.js"
    home_link = "index.html" if base_path == "." else "../index.html"
    projects_link = "projects.html" if base_path == "." else "../projects.html"
    case_study_link = "forgeiq-case-study.html" if base_path == "." else "../forgeiq-case-study.html"
    engineering_link = "engineering.html" if base_path == "." else "../engineering.html"
    notes_link = "notes.html" if base_path == "." else "../notes.html"
    writing_cad_link = "writing-why-cad-understanding-is-difficult.html" if base_path == "." else "../writing-why-cad-understanding-is-difficult.html"
    about_link = "about.html" if base_path == "." else "../about.html"
    cert_link = "certifications.html" if base_path == "." else "../certifications.html"
    contact_link = "contact.html" if base_path == "." else "../contact.html"
    resume_link = "resume.pdf" if base_path == "." else "../resume.pdf"
    patterns_link = "engineering-patterns.html" if base_path == "." else "../engineering-patterns.html"
    evaluation_link = "engineering-evaluation.html" if base_path == "." else "../engineering-evaluation.html"
    decisions_link = "engineering-decisions.html" if base_path == "." else "../engineering-decisions.html"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Open Source & Modular Software | Bhuvan A B — Software Engineer</title>
  <meta name="description" content="Authentic open-source engineering packages and decoupling roadmaps extracted from ForgeIQ: dxf-contour-extractor for 2D CAD geometry and manufacturing automation.">
  <link rel="canonical" href="https://bhuvanab.dev/opensource">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://bhuvanab.dev/opensource">
  <meta property="og:title" content="Open Source & Modular Software | Bhuvan A B — Software Engineer">
  <meta property="og:description" content="Authentic open-source engineering packages and decoupling roadmaps extracted from ForgeIQ: dxf-contour-extractor for 2D CAD geometry and manufacturing automation.">
  <meta property="og:site_name" content="Bhuvan A B Portfolio">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Open Source & Modular Software | Bhuvan A B — Software Engineer">
  <meta name="twitter:description" content="Authentic open-source engineering packages and decoupling roadmaps extracted from ForgeIQ: dxf-contour-extractor for 2D CAD geometry and manufacturing automation.">

  <!-- Performance & Favicon -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" type="image/x-icon" href="{favicon_path}">
  <link rel="stylesheet" href="{css_path}">
</head>
<body>

  <!-- Site Header & Navigation -->
  <header class="site-header">
    <div class="container nav-container">
      <a href="{home_link}" class="nav-brand">
        <div class="brand-icon">B</div>
        <div>
          <span style="font-weight: 700; font-size: 1rem; color: var(--text-primary); display: block;">Bhuvan A B</span>
          <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">BMSCE · Expected 2028</span>
        </div>
      </a>

      <nav class="nav-links">
        <a href="{home_link}">Home</a>
        <a href="{projects_link}">Projects</a>
        <a href="{case_study_link}">ForgeIQ Case Study</a>
        <a href="{engineering_link}">Engineering</a>
        <a href="opensource.html" class="active">Open Source</a>
        <a href="{notes_link}">Writing / Notes</a>
        <a href="{about_link}">About</a>
        <a href="{cert_link}">Certifications</a>
        <a href="{contact_link}">Contact</a>
        <a href="{resume_link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="margin-left: 0.5rem; gap: 0.4rem;">
          <span>Resume</span>
        </a>
      </nav>

      <button class="mobile-toggle" aria-label="Toggle navigation menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>

    <div class="mobile-menu">
      <a href="{home_link}">Home</a>
      <a href="{projects_link}">Projects</a>
      <a href="{case_study_link}">ForgeIQ Case Study</a>
      <a href="{engineering_link}">Engineering</a>
      <a href="opensource.html" style="color: var(--text-accent); font-weight: 600;">Open Source</a>
      <a href="{notes_link}">Writing / Notes</a>
      <a href="{about_link}">About</a>
      <a href="{cert_link}">Certifications</a>
      <a href="{contact_link}">Contact</a>
      <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
        <a href="{resume_link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;">
          Download Resume (PDF)
        </a>
      </div>
    </div>
  </header>

  <main>
    <div class="section" style="padding-top: 3.5rem; min-height: 100vh;">
      <div class="container">
        
        <!-- Navigation Breadcrumb -->
        <div style="margin-bottom: 2.5rem;">
          <a href="{engineering_link}" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; color: var(--text-muted); transition: color 0.2s ease;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg> Back to Engineering Hub
          </a>
        </div>

        <!-- Header / Hero -->
        <div style="max-width: 900px; margin-bottom: 3.5rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
            <span class="badge badge-emerald">Open Source & Modular Software</span>
            <span class="os-badge-extracted">1 Extracted Package</span>
            <span class="os-badge-roadmap">3 Roadmap Candidates</span>
          </div>
          <h1 style="font-size: 2.75rem; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 1.25rem;">
            Modular Engineering & Open Source
          </h1>
          <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            Engineering work creates the greatest leverage when complex domain algorithms are decoupled from proprietary business logic and published as clean, standalone software primitives.
          </p>

          <!-- Credibility Callout -->
          <div style="background: rgba(8, 12, 22, 0.75); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" style="flex-shrink: 0; margin-top: 0.15rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <div style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 0.2rem;">
                Strict Anti-Fabrication & Credibility Policy
              </strong>
              I do not claim thousands of stars, enterprise production deployments, or artificial community sizes. The packages below represent genuine modular extractions from ForgeIQ, published under permissive open-source licenses to benefit other engineers working in CAD and manufacturing automation.
            </div>
          </div>
        </div>

        <!-- FEATURED EXTRACTED PACKAGE -->
        <div class="os-showcase-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div>
              <div style="display: flex; alignItems: center; gap: 0.65rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
                <span class="os-badge-extracted">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg> Extracted Package
                </span>
                <span class="badge badge-blue">v0.2.0-alpha</span>
                <span class="badge badge-purple">MIT License</span>
                <span class="badge badge-emerald">Python 3.9+</span>
              </div>
              <h2 style="font-size: 2rem; letter-spacing: -0.02em; margin-bottom: 0.35rem; color: var(--text-primary);">
                dxf-contour-extractor
              </h2>
              <p style="font-size: 1.05rem; color: #93c5fd; font-weight: 500;">
                Deterministic 2D DXF polyline loop reconstruction, vertex snapping, and laser/CNC manufacturing metrics extractor.
              </p>
            </div>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="https://github.com/bhuvanabcs24-maker/Forge-IQ/tree/main/backend/services" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> View on GitHub
              </a>
              <a href="{writing_cad_link}" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <span>Read Technical Note</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem;">
                ForgeIQ Relationship
              </div>
              <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5;">
                Extracted directly from <code style="font-family: var(--font-mono); color: #60a5fa;">backend/services/cad_preprocessor.py</code>. Decoupled from FastAPI, PostgreSQL, and LLM orchestration into an independent geometry library.
              </div>
            </div>

            <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem;">
                Core Problem Solved
              </div>
              <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5;">
                Resolves AutoCAD DXF drafting micro-gaps (0.002mm - 0.008mm) that break naive coordinate equality, extracting closed polygon loops and piercing counts without floating-point hallucination.
              </div>
            </div>

            <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem;">
                Key Dependencies
              </div>
              <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5;">
                <span class="tech-tag tech-tag-blue" style="margin-right: 0.4rem;">ezdxf</span>
                <span class="tech-tag tech-tag-blue" style="margin-right: 0.4rem;">networkx</span>
                <span class="tech-tag tech-tag-blue" style="margin-right: 0.4rem;">scipy</span>
                <span class="tech-tag tech-tag-blue">dataclasses</span>
              </div>
            </div>
          </div>

          <!-- Architecture ASCII Flow -->
          <div style="margin-bottom: 2rem;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.04em;">
              Deterministic Algorithm Pipeline
            </div>
            <pre style="background: #070a13; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.25rem; font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.5; color: #93c5fd; overflow-x: auto; margin: 0;">Raw .DXF File ────► Entity Extraction (ezdxf)
                         │ (LINE, ARC, LWPOLYLINE, CIRCLE)
                         ▼
                   Spatial Vertex Snapping (scipy.spatial.KDTree)
                         │ (0.01mm clustering merges drafting micro-gaps)
                         ▼
                   Planar Multigraph Construction (networkx)
                         │ (Minimal cycle basis extraction via nx.cycle_basis)
                         ▼
                   Boundary & Hole Separation (Shoelace 2D Formula)
                         │ Largest Closed Loop = Sheet Outer Boundary
                         │ Interior Loops & Circles = Pierced Cutout Holes
                         ▼
                   Manufacturing Metrics (Perimeter mm, Pierces, Scrap Ratio)</pre>
          </div>

          <!-- Interactive Code & Documentation Tabs -->
          <div>
            <div class="os-tabs-nav">
              <button class="os-tab-btn active" data-tab="quickstart">Installation & Quickstart</button>
              <button class="os-tab-btn" data-tab="code">Python Usage Example</button>
              <button class="os-tab-btn" data-tab="config">Tolerances & Config</button>
              <button class="os-tab-btn" data-tab="structure">Package Structure & Tests</button>
            </div>

            <!-- TAB 1: QUICKSTART -->
            <div id="tab-quickstart" class="os-tab-content" style="background: #090d1a; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.75rem;">
                Local Development Installation
              </h4>
              <pre style="background: #05070f; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #34d399; overflow-x: auto; margin-bottom: 1.25rem;"># 1. Clone the repository
git clone https://github.com/bhuvanabcs24-maker/Forge-IQ.git
cd Forge-IQ/packages/dxf-contour-extractor

# 2. Install in editable development mode
pip install -e .

# 3. Run the automated test suite
python -m unittest discover -s tests</pre>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                <strong style="color: var(--text-secondary);">Status:</strong> Active standalone package in <code style="font-family: var(--font-mono); color: #60a5fa;">packages/dxf-contour-extractor/</code> with passing unit tests and zero external network dependencies.
              </div>
            </div>

            <!-- TAB 2: CODE -->
            <div id="tab-code" class="os-tab-content" style="display: none; background: #090d1a; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.75rem;">
                Extracting Boundary Geometry & Laser Pierces
              </h4>
              <pre style="background: #05070f; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; font-family: var(--font-mono); font-size: 0.825rem; color: #93c5fd; overflow-x: auto; margin: 0;">from dxf_contour_extractor import DXFContourExtractor

# Initialize extractor with a 0.01mm tolerance window for drafting micro-gaps
extractor = DXFContourExtractor(snap_tolerance_mm=0.01)

# Process a DXF drawing directly
result = extractor.extract_from_file("industrial_bracket.dxf")

print(f"Total Cutting Perimeter: {{result.total_cutting_perimeter_mm:.2f}} mm")
print(f"Laser Pierce Count:      {{result.pierce_count}} (1 outer + {{len(result.holes)}} internal)")
print(f"Stock Bounding Box:      {{result.bounding_box.width_mm:.1f}} x {{result.bounding_box.height_mm:.1f}} mm")
print(f"Raw Scrap Ratio:         {{result.scrap_ratio:.1%}}")

# Inspect individual holes for tooling selection
for i, hole in enumerate(result.holes, 1):
    print(f"  Hole #{{i}}: Center=({{hole.center.x:.1f}}, {{hole.center.y:.1f}}) mm, Dia={{hole.diameter_mm:.1f}} mm")</pre>
            </div>

            <!-- TAB 3: CONFIG -->
            <div id="tab-config" class="os-tab-content" style="display: none; background: #090d1a; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 1rem;">
                Extractor Configuration Parameters
              </h4>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border-medium); text-align: left; color: var(--text-muted);">
                      <th style="padding: 0.5rem 0.75rem;">Parameter</th>
                      <th style="padding: 0.5rem 0.75rem;">Type</th>
                      <th style="padding: 0.5rem 0.75rem;">Default</th>
                      <th style="padding: 0.5rem 0.75rem;">Engineering Purpose</th>
                    </tr>
                  </thead>
                  <tbody style="color: var(--text-secondary);">
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono); color: #60a5fa;">snap_tolerance_mm</td>
                      <td style="padding: 0.65rem 0.75rem;">float</td>
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono);">0.01</td>
                      <td style="padding: 0.65rem 0.75rem;">Spatial radius for KD-Tree vertex clustering to bridge micro-gaps.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono); color: #60a5fa;">arc_segments</td>
                      <td style="padding: 0.65rem 0.75rem;">int</td>
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono);">16</td>
                      <td style="padding: 0.65rem 0.75rem;">Number of linear chords used when discretizing circular arcs.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono); color: #60a5fa;">ignore_paper_space</td>
                      <td style="padding: 0.65rem 0.75rem;">bool</td>
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono);">True</td>
                      <td style="padding: 0.65rem 0.75rem;">Ignores title blocks, revision tables, and borders in paper layouts.</td>
                    </tr>
                    <tr>
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono); color: #60a5fa;">min_hole_diameter_mm</td>
                      <td style="padding: 0.65rem 0.75rem;">float</td>
                      <td style="padding: 0.65rem 0.75rem; font-family: var(--font-mono);">0.5</td>
                      <td style="padding: 0.65rem 0.75rem;">Filters microscopic drafting specks below CNC laser kerf limit.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 4: STRUCTURE -->
            <div id="tab-structure" class="os-tab-content" style="display: none; background: #090d1a; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.75rem;">
                Repository Structure & Verification
              </h4>
              <pre style="background: #05070f; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: #94a3b8; overflow-x: auto; margin-bottom: 1rem;">packages/dxf-contour-extractor/
├── pyproject.toml              # Modern hatchling packaging metadata
├── LICENSE                     # Permissive MIT License
├── README.md                   # Complete documentation & usage guide
├── CONTRIBUTING.md             # Contributor guidelines & code style
├── .github/
│   └── ISSUE_TEMPLATE/         # Bug report & feature request templates
├── src/
│   └── dxf_contour_extractor/
│       ├── __init__.py         # Public exports & versioning
│       └── extractor.py        # Core KD-Tree & NetworkX geometry pipeline
├── tests/
│   └── test_extractor.py       # 4 unit tests (snapping, loops, holes, empty)
└── examples/
    └── parse_sample_part.py    # Runnable synthetic bracket demonstration</pre>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: #34d399; font-size: 0.85rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg> 4/4 Unit tests passing (0.001s execution time)
              </div>
            </div>
          </div>
        </div>

        <!-- OPEN SOURCE EXTRACTION ROADMAP -->
        <div style="margin-top: 5rem; margin-bottom: 4rem;">
          <div style="max-width: 800px; margin-bottom: 2.5rem;">
            <div class="badge badge-purple" style="margin-bottom: 0.65rem;">Decoupling Strategy</div>
            <h2 style="font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 0.75rem;">
              Open Source Extraction Roadmap
            </h2>
            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.65;">
              Not every component in an application should be extracted prematurely. Packaging software before its boundaries stabilize creates maintenance overhead and fragile abstractions. Below is the honest decoupling roadmap for candidate components in ForgeIQ.
            </p>
          </div>

          <div class="os-roadmap-grid">

            <!-- CANDIDATE 1 -->
            <div class="os-roadmap-card">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="os-badge-roadmap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Roadmap Candidate #1
                  </span>
                  <span class="badge badge-blue">Python</span>
                </div>
                <h3 style="font-size: 1.35rem; color: var(--text-primary); margin-bottom: 0.5rem;">
                  ai-provider-sdk
                </h3>
                <p style="font-size: 0.875rem; color: #93c5fd; font-weight: 500; margin-bottom: 1rem;">
                  Multi-Model LLM Fallback & Defensive Schema Validation
                </p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                  Provides a unified interface across Google Gemini, Anthropic Claude, and OpenAI with automatic temperature-zero retries and strict Pydantic JSON response parsing.
                </p>

                <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 1.25rem;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.3rem;">
                    Current Status in ForgeIQ
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
                    Operational prototype in <code style="font-family: var(--font-mono); color: #60a5fa;">backend/ai/quotation_engine.py</code>. Tightly coupled to ForgeIQ's quotation schemas.
                  </div>
                </div>

                <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">
                  Extraction Work Remaining:
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">1</div>
                  <div style="color: var(--text-secondary);">Decouple manufacturing-specific quotation prompts from provider dispatch logic.</div>
                </div>
                <div className="os-roadmap-step">
                  <div class="os-roadmap-step-icon">2</div>
                  <div style="color: var(--text-secondary);">Create generic schema-agnostic validation hooks accepting arbitrary Pydantic models.</div>
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">3</div>
                  <div style="color: var(--text-secondary);">Add mock offline LLM provider fixtures for deterministic unit testing.</div>
                </div>
              </div>

              <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Target: Standalone PyPI library</span>
                <a href="{patterns_link}#pattern-1" style="font-size: 0.8rem; color: #60a5fa; display: inline-flex; align-items: center; gap: 0.25rem;">
                  View Pattern <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            <!-- CANDIDATE 2 -->
            <div class="os-roadmap-card">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="os-badge-roadmap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Roadmap Candidate #2
                  </span>
                  <span class="badge badge-purple">Python / SQL</span>
                </div>
                <h3 style="font-size: 1.35rem; color: var(--text-primary); margin-bottom: 0.5rem;">
                  mfg-retrieval-bench
                </h3>
                <p style="font-size: 0.875rem; color: #d8b4fe; font-weight: 500; margin-bottom: 1rem;">
                  Manufacturing RFQ Hybrid Search Evaluation Suite
                </p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                  A specialized evaluation harness calculating Mean Reciprocal Rank (MRR@5) and NDCG@5 for technical procurement queries combining lexical SQL filters and vector distance.
                </p>

                <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 1.25rem;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.3rem;">
                    Current Status in ForgeIQ
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
                    Implemented as internal evaluation scripts in <code style="font-family: var(--font-mono); color: #d8b4fe;">backend/retrieval/hybrid_search.py</code>.
                  </div>
                </div>

                <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">
                  Extraction Work Remaining:
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">1</div>
                  <div style="color: var(--text-secondary);">Serialize 120-query synthetic RFQ benchmark dataset into portable JSONL files.</div>
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">2</div>
                  <div style="color: var(--text-secondary);">Decouple evaluation logic from active PostgreSQL instance via SQLite vector mock.</div>
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">3</div>
                  <div style="color: var(--text-secondary);">Publish CLI reporting tool with regression diff comparisons across prompt versions.</div>
                </div>
              </div>

              <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Target: Benchmark CLI Tool</span>
                <a href="{evaluation_link}" style="font-size: 0.8rem; color: #d8b4fe; display: inline-flex; align-items: center; gap: 0.25rem;">
                  View Eval Lab <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            <!-- CANDIDATE 3 -->
            <div class="os-roadmap-card">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="os-badge-roadmap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Roadmap Candidate #3
                  </span>
                  <span class="badge badge-emerald">TypeScript / Python</span>
                </div>
                <h3 style="font-size: 1.35rem; color: var(--text-primary); margin-bottom: 0.5rem;">
                  mfg-workflow-engine
                </h3>
                <p style="font-size: 0.875rem; color: #6ee7b7; font-weight: 500; margin-bottom: 1rem;">
                  9-Stage Industrial Production State Machine
                </p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                  Finite state machine managing multi-party physical order lifecycles (RFQ → Quoted → Confirmed → Laser Cut → Dispatched) with rollback prevention and immutable audit logging.
                </p>

                <div style="background: rgba(8, 12, 22, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 1.25rem;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.3rem;">
                    Current Status in ForgeIQ
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
                    Operational in <code style="font-family: var(--font-mono); color: #6ee7b7;">backend/services/order_workflow.py</code>. Coupled to Supabase auth tables and database triggers.
                  </div>
                </div>

                <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">
                  Extraction Work Remaining:
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">1</div>
                  <div style="color: var(--text-secondary);">Extract transition graph rules into declarative JSON / YAML state definitions.</div>
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">2</div>
                  <div style="color: var(--text-secondary);">Build pluggable storage interface supporting in-memory, SQLite, and PostgreSQL.</div>
                </div>
                <div class="os-roadmap-step">
                  <div class="os-roadmap-step-icon">3</div>
                  <div style="color: var(--text-secondary);">Isolate webhook event dispatching from proprietary buyer notification queues.</div>
                </div>
              </div>

              <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Target: Framework-Agnostic Engine</span>
                <a href="{decisions_link}" style="font-size: 0.8rem; color: #6ee7b7; display: inline-flex; align-items: center; gap: 0.25rem;">
                  View Architecture <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- OPEN SOURCE PHILOSOPHY & PRINCIPLES -->
        <div style="background: rgba(14, 21, 37, 0.5); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 2.5rem; margin-bottom: 4rem;">
          <h3 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 1.25rem;">
            My Open Source Engineering Philosophy
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
            <div>
              <h4 style="font-size: 1.05rem; color: #93c5fd; margin-bottom: 0.5rem;">
                1. Solve Real Engineering Traps
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Open-source software is only useful if it solves problems that standard libraries neglect. Rather than creating generic wrappers, my focus is on tricky domain bottlenecks like CAD micro-gaps, LLM schema containment, and physical production state machines.
              </p>
            </div>

            <div>
              <h4 style="font-size: 1.05rem; color: #93c5fd; margin-bottom: 0.5rem;">
                2. No Inflated Adoption Claims
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Engineering credibility requires transparency. I do not invent download counts, pretend to have enterprise customers, or manufacture false community momentum. Every package reflects its true development status and exact test verification.
              </p>
            </div>

            <div>
              <h4 style="font-size: 1.05rem; color: #93c5fd; margin-bottom: 0.5rem;">
                3. Determinism Over Guesswork
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                In physical engineering systems, non-deterministic bugs result in scrapped material or machine collisions. Geometry and pricing packages must remain strictly reproducible, keeping probabilistic AI models safely behind typed boundaries.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Navigation -->
        <div class="article-footer-nav" style="margin-top: 2rem;">
          <a href="{notes_link}" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg> Technical Writing Hub
          </a>
          <a href="{case_study_link}" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>Explore ForgeIQ Case Study</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </div>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; font-size: 0.85rem; color: var(--text-muted);">
        <div>© 2026 Bhuvan A B · BMSCE Bangalore</div>
        <div>Expected June 2028 · CGPA: 8.08</div>
      </div>
    </div>
  </footer>

  <script src="{js_path}"></script>
  <script>
    // Tab switching logic for Open Source page
    document.querySelectorAll('.os-tab-btn').forEach(function(btn) {{
      btn.addEventListener('click', function() {{
        var tabName = btn.getAttribute('data-tab');
        document.querySelectorAll('.os-tab-btn').forEach(function(b) {{ b.classList.remove('active'); }});
        document.querySelectorAll('.os-tab-content').forEach(function(c) {{ c.style.display = 'none'; }});
        btn.classList.add('active');
        var target = document.getElementById('tab-' + tabName);
        if (target) target.style.display = 'block';
      }});
    }});
  </script>
</body>
</html>
"""

def main():
    # 1. Generate root opensource.html
    root_html = generate_opensource_html(".")
    with open("opensource.html", "w", encoding="utf-8") as f:
        f.write(root_html)
    print("Generated opensource.html")

    # 2. Generate nested opensource/index.html
    os.makedirs("opensource", exist_ok=True)
    nested_html = generate_opensource_html("..")
    with open("opensource/index.html", "w", encoding="utf-8") as f:
        f.write(nested_html)
    print("Generated opensource/index.html")

if __name__ == "__main__":
    main()
