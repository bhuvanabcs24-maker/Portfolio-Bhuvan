# Bhuvan A B — Software Engineering Portfolio & Systems Architecture

> **Computer Science & Engineering Student at BMS College of Engineering (BMSCE), Bengaluru**  
> Expected Graduation: June 2028 · Current CGPA: 8.08 / 10  
> Focused on Backend Engineering, Systems Architecture, Deterministic Computational Geometry, and Applied AI.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow?style=flat&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tests](https://img.shields.io/badge/Tests-47%20Automated%20(Pytest%20%2B%20Playwright)-success?style=flat)]()
[![LeetCode](https://img.shields.io/badge/LeetCode-100%2B%20Solved-orange?style=flat&logo=leetcode)](https://leetcode.com/u/BHUVANab2006/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🧭 Core Engineering Narrative

This portfolio documents an honest, evidence-based engineering progression:

$$\text{CS Student at BMSCE} \longrightarrow \text{Full-Stack Dev} \longrightarrow \text{Practical Systems} \longrightarrow \text{Applied AI} \longrightarrow \text{Built ForgeIQ} \longrightarrow \text{Systems/Testing Rigor} \longrightarrow \text{Deepening Core Craft}$$

### Anti-Hype Principles
- **No Speculative Claims**: Zero buzzwords or hiring predictions (*no "future staff engineer", "30+ LPA", "top 1%", or "guaranteed FAANG"*).
- **Evidence-First**: Every architectural decision, benchmark, and design pattern is tied to concrete code, automated tests, and reproducible benchmarks.
- **Verified LeetCode Metric**: **100+ problems solved** across Arrays, Two Pointers, Trees, Binary Search, Graphs, and Dynamic Programming at [leetcode.com/u/BHUVANab2006](https://leetcode.com/u/BHUVANab2006/).

---

## ⚡ Quick Links & Profiles

- **GitHub Profile**: [@bhuvanabcs24-maker](https://github.com/bhuvanabcs24-maker)
- **LinkedIn Profile**: [linkedin.com/in/bhuvan-a-b-4805a2330](https://www.linkedin.com/in/bhuvan-a-b-4805a2330/)
- **LeetCode Profile**: [@BHUVANab2006](https://leetcode.com/u/BHUVANab2006/)
- **ForgeIQ Flagship Repo**: [github.com/bhuvanabcs24-maker/Forge-IQ](https://github.com/bhuvanabcs24-maker/Forge-IQ)
- **QWait Estimator Repo**: [github.com/bhuvanabcs24-maker/QueueEstimater](https://github.com/bhuvanabcs24-maker/QueueEstimater)

---

## 🏗️ Flagship System: ForgeIQ

**ForgeIQ** is an AI-powered manufacturing intelligence platform combining deterministic CAD computational geometry, multi-agent cost estimation, and a 9-stage order tracking lifecycle.

```text
DXF Upload ──> KD-Tree Vertex Snapping ──> Cycle Basis Polygons ──> Deterministic Geometry (ezdxf)
                                                                             │
                                                                             ▼
Order Tracking (9 Stages) <── FastAPI (40+ Endpoints) <── Hybrid Pricing (Base Rate + LLM Advisor)
```

- **Deterministic Geometry vs. AI Hallucination**: Rather than relying on vision LLMs that hallucinate physical measurements, ForgeIQ uses spatial KD-Tree vertex snapping (`0.01 mm` tolerance) and graph cycle extraction (`networkx`) to extract ground-truth cutting perimeters, laser pierce points, and scrap factor ratios.
- **Backend Architecture**: Built with FastAPI, PostgreSQL (Neon) with `pgvector`, Celery, and Redis.
- **Concurrency Gain**: Load testing resolved background thread blocking by decoupling CPU-bound geometry parsing into dedicated multiprocessing pools with Redis rate limiting, achieving a **5.5x concurrency improvement**.
- **Automated Verification**: **47 automated tests** (Pytest backend boundary tests + Playwright end-to-end suites).

---

## 🏛️ Engineering Deep-Dive Hubs

The portfolio features 6 dedicated architectural hubs:

| Hub | Route | Content & Evidence |
| :--- | :--- | :--- |
| **Architecture Decisions** | `/engineering/decisions` | **10 Formal ADRs**: PostgreSQL vs MongoDB, FastAPI vs Express, Supabase Auth, Neon Serverless, pgvector, hybrid search, AI provider abstraction. |
| **AI Evaluation Lab** | `/engineering/evaluation` | **8-Dimension Evaluation Framework**: 96.9% pricing benchmark, pgvector RAG precision tests, JSON schema guardrails, and latency analysis. |
| **Design Patterns** | `/engineering/patterns` | **4 Production Patterns**: AI Provider Abstraction (Strategy/Adapter), Deterministic CAD Guardrails, Finite State Lifecycle (9 stages), Multi-Role RBAC. |
| **Engineering Learnings** | `/engineering/learnings` | **4 Retrospective Stories**: Celery worker starvation (5.5x gain), unindexed vector search latency, schema evolution, and Playwright race conditions. |
| **Open Source Hub** | `/opensource` | Extracted standalone library (`dxf-contour-extractor`) + honest 3-component decoupling roadmap. |
| **Technical Writing Hub** | `/writing` | 5 in-depth technical notes, featuring *"Why CAD Understanding Is Difficult for Manufacturing Automation"*. |

---

## 📦 Extracted Open-Source Package: `dxf-contour-extractor`

Located in [`packages/dxf-contour-extractor/`](./packages/dxf-contour-extractor/):

A standalone Python library extracted from ForgeIQ to parse AutoCAD DXF files into topological closed planar loops, computing manufacturing cutting lengths, laser pierce counts, and bounding geometry.

```bash
# Run standalone unit tests
python3 -m unittest discover -s packages/dxf-contour-extractor/tests

# Run sample bracket parsing demo
python3 packages/dxf-contour-extractor/examples/parse_sample_part.py
```

---

## 📂 Repository Structure

```text
Portfolio/
├── src/
│   ├── app/                                 # Next.js 15 App Router (20 static pages)
│   │   ├── page.tsx                         # 10-step hierarchical homepage
│   │   ├── about/                           # BMSCE education & background
│   │   ├── certifications/                  # Verified coursework
│   │   ├── contact/                         # Recruiter outreach form & details
│   │   ├── engineering/
│   │   │   ├── decisions/                   # 10 Architectural Decision Records (ADRs)
│   │   │   ├── evaluation/                  # AI Evaluation Lab
│   │   │   ├── learnings/                   # Bottleneck & failure retrospectives
│   │   │   └── patterns/                    # Reusable production design patterns
│   │   ├── forgeiq-case-study/              # Full ForgeIQ technical deep dive
│   │   ├── opensource/                      # Open Source Hub & extraction roadmap
│   │   ├── projects/                        # Detailed project catalog
│   │   └── writing/                         # Technical Writing Hub
│   │       └── why-cad-understanding-is-difficult/  # Published CAD analysis
│   ├── components/                          # Reusable UI components & Navigation
│   └── data/
│       └── portfolioData.ts                 # Single source of truth (typed data)
├── packages/
│   └── dxf-contour-extractor/               # Standalone Python open-source package
│       ├── pyproject.toml                   # Hatchling package metadata
│       ├── src/dxf_contour_extractor/       # Core KD-Tree & cycle extraction
│       ├── tests/                           # Unit test suite
│       └── examples/                        # Synthetic CAD demonstration
├── scripts/
│   ├── generators/                          # Static HTML generation engine
│   │   ├── generate_all.py                  # Master static generator
│   │   └── generate_homepage.py             # Synchronized homepage generator
│   └── tests/
│       ├── test_final_audit.py              # Selenium multi-viewport audit suite
│       └── test_opensource_system.py        # Tab & routing audit script
├── index.html                               # Synchronized root static HTML
├── package.json                             # Dependencies & scripts
└── tsconfig.json                            # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.17.0
- **npm** >= 9.0.0
- **Python** >= 3.9 (for the open-source package and test suites)

### Installation

```bash
# Clone the repository
git clone https://github.com/bhuvanabcs24-maker/Portfolio-Bhuvan.git
cd Portfolio-Bhuvan

# Install Node dependencies
npm install
```

### Running Locally

```bash
# Run Next.js development server
npm run dev
# Open http://localhost:3000

# Build Next.js static production bundle (20/20 routes)
npm run build
npm start
```

### Running Static Generation Engine

The repository supports 100% static HTML delivery without Node runtime:

```bash
# Regenerate all static HTML pages
python3 scripts/generators/generate_all.py

# Regenerate homepage
python3 scripts/generators/generate_homepage.py

# Serve locally
python3 -m http.server 3002
# Open http://localhost:3002
```

---

## 🧪 Automated Testing & Audit Suites

### 1. Python Unit Tests (DXF Extractor)
```bash
python3 -m unittest discover -s packages/dxf-contour-extractor/tests
```

### 2. Comprehensive Quality Audit (Selenium)
Runs automated end-to-end verification of all 10 homepage sections, 6 recruiter CTAs, multi-viewport layout (Desktop 1440x900, Tablet 768x1024, Mobile 375x812), anti-hype string scans, and 0 console errors:

```bash
python3 scripts/tests/test_final_audit.py
```

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
Code for ForgeIQ and QWait Estimator are linked to their respective open-source repositories.
