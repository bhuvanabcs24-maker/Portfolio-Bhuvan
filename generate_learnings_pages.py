#!/usr/bin/env python3
"""
Generator for:
- engineering-learnings.html
- engineering/learnings/index.html
Engineering Learnings Timeline detailing 6 genuine development stories from ForgeIQ.
"""

import os
import html

STORIES = [
    {
        "id": "story-01",
        "num": "01",
        "title": "Relational Query Compounding to Unified CTE Aggregation",
        "domain": "Backend / Database Architecture",
        "tag_cls": "pattern-tag-backend",
        "tried": "Initially fetched manufacturing order lifecycle details by issuing an initial SQL query for the order record, followed by separate queries inside loop handlers for line items, supplier bids, and status history logs.",
        "happened": "Under local concurrent load testing with 50 virtual users, response latency spiked sharply, database connection pool became saturated, and server throughput plateaued at 860 req/s.",
        "problem": "Issuing 12 independent SQL roundtrips per order check exhausted the serverless connection pool limit and caused extreme database connection contention under load.",
        "changed": "Refactored the data-fetching layer to use a single parameterized query utilizing PostgreSQL Common Table Expressions (CTEs) and JSON aggregation (json_agg), indexed with a composite B-Tree on (tenant_id, order_id, stage_timestamp).",
        "learned": "Never assume database ORMs optimize nested access automatically. Profiling with load generators early in development prevents connection starvation before architecture hardens."
    },
    {
        "id": "story-02",
        "num": "02",
        "title": "From Prompt-Based Geometry Pricing to Deterministic CAD Math",
        "domain": "AI Engineering / System Boundaries",
        "tag_cls": "pattern-tag-ai",
        "tried": "Fed raw geometric vertex coordinates and text representations of CAD boundary lines directly into the LLM system prompt, asking it to calculate part volume, surface area, and machining cycle hours.",
        "happened": "The model produced hallucinations with 20% to 50% variance across repeated calls for identical CAD files, frequently hallucinating circular cutouts and miscalculating bounding boxes.",
        "problem": "In physical manufacturing, raw bar stock and machining hours are expensive realities. A hallucinated dimension or volume produces unusable quotes that either cause financial loss or quote exorbitantly high.",
        "changed": "Stripped geometry calculation away from the LLM entirely. Built a deterministic Python geometry preprocessor using ezdxf and vector algorithms to compute bounding box, cutting perimeter, and volume. The LLM was restricted strictly to qualitative NLP tasks (machinability risk, surface finish advice) constrained by Pydantic schemas.",
        "learned": "LLMs are probabilistic sequence models, not geometric math engines. Transactional and physical calculations must always remain 100% deterministic; AI belongs where semantics and natural language add real leverage."
    },
    {
        "id": "story-03",
        "num": "03",
        "title": "From Live API Testing to Hermetic Mock Provider CI Test Harness",
        "domain": "Testing & Reliability / CI/CD",
        "tag_cls": "pattern-tag-testing",
        "tried": "Ran the initial Playwright and Pytest suites by calling live Google Gemini API endpoints directly using an API key stored in CI environment secrets.",
        "happened": "Test runs were slow (~2 minutes per run), frequently failed with HTTP 429 Rate Limit errors when multiple tests ran in parallel, and broke whenever external network latency surged.",
        "problem": "Flaky test suites erode confidence in automated testing. When CI fails due to external API rate limits rather than code regressions, developers start ignoring test failures.",
        "changed": "Designed and implemented the Pluggable AI Provider Factory with a MockAIProvider. In CI and local test environments, the test harness automatically routes to deterministic fixture replay, returning pre-validated JSON payloads in 0ms network latency. Live API integration is reserved for explicit staging smoke runs.",
        "learned": "Automated test suites must be hermetic and fast. Third-party cloud dependencies should always be isolated behind an abstraction barrier so that internal regression testing is deterministic, free, and instantaneous."
    },
    {
        "id": "story-04",
        "num": "04",
        "title": "From Naive Polyline Traversal to Graph-Based Vertex Snapping",
        "domain": "CAD Engineering / Algorithmic Robustness",
        "tag_cls": "pattern-tag-arch",
        "tried": "Computed sheet metal cutting perimeters and laser paths by simply summing the Euclidean lengths of consecutive LINE and POLYLINE entities in DXF files.",
        "happened": "Real-world CAD files from various CAD exporters often contained disconnected polyline segments, unclosed loops with micro-gaps (e.g. 0.005mm), and duplicate overlapping vertices, causing perimeter and area algorithms to crash or double-count.",
        "problem": "When the geometry parser fails to recognize closed cutting loops, the quotation engine cannot estimate internal pierce counts or sheet scrap percentages, rejecting valid engineering drawings with unhandled exceptions.",
        "changed": "Replaced naive entity traversal with a graph-based vertex snapping algorithm with a 0.01mm tolerance threshold. The algorithm builds a spatial adjacency graph, snaps endpoints within the tolerance window, and reconstructs closed outer boundaries and internal hole contours before computing area.",
        "learned": "Input data in physical engineering systems is rarely clean or well-formed. Algorithms must be designed with defensive tolerance thresholds and graph-based validation rather than assuming idealized geometric standards."
    },
    {
        "id": "story-05",
        "num": "05",
        "title": "From Blocking Async Handlers to Multi-Process Pool Offloading",
        "domain": "Backend / Concurrency Architecture",
        "tag_cls": "pattern-tag-backend",
        "tried": "Wrote CAD geometry parsing directly inside FastAPI async def route handlers, assuming that async would allow the server to handle other requests concurrently.",
        "happened": "When a user uploaded a 40MB 3D model, the server completely froze for 500ms to 1200ms. Concurrent dashboard requests, health check pings, and WebSocket pings timed out until the CAD calculation finished.",
        "problem": "Python's AsyncIO event loop is single-threaded. CPU-bound calculations in an async function monopolize the thread and block the event loop entirely, destroying concurrent I/O performance.",
        "changed": "Separated CPU computation from I/O by creating a singleton ProcessPoolExecutor. Heavy parsing functions were made pure and dispatched via asyncio.get_running_loop().run_in_executor(), running in isolated OS worker processes with a 5-second timeout guard.",
        "learned": "async does not equal parallel. AsyncIO is optimized for network and disk I/O; CPU-bound workloads must always be offloaded to worker processes or background task queues to keep the web event loop responsive."
    },
    {
        "id": "story-06",
        "num": "06",
        "title": "From Ephemeral Component State to Bookmarkable URL Query State",
        "domain": "Frontend Architecture / Navigation Semantics",
        "tag_cls": "pattern-tag-arch",
        "tried": "Initially tracked manufacturing order filtering (by status, date range, factory capability, and search keyword) inside local React component state (useState).",
        "happened": "Users could not bookmark filtered views, browser back/forward buttons reset all filters unexpectedly, and sharing a specific RFQ state with a colleague required manual re-selection of all filters.",
        "problem": "In B2B procurement and quotation workflows, buyers and factory managers need to link directly to specific filtered views (e.g. 'orders waiting for quality inspection'). Storing state in local memory broke basic web navigational semantics.",
        "changed": "Refactored filter and pagination state to be driven by URL search parameters (useSearchParams / HTML history API). Filter state is read from the URL query string on load and synchronized on change.",
        "learned": "The URL is the most reliable, shareable, and accessible state container in web applications. Any filter, pagination, or tab state that affects what the user sees belongs in the URL rather than transient component memory."
    }
]

SHIFTS = [
    {
        "num": "SHIFT 01",
        "title": "From Assumption to Empirical Profiling",
        "from_txt": "Assuming bottlenecks based on architectural intuition (e.g., assuming CAD parsing was the primary slowdown).",
        "to_txt": "Benchmarking with real load generators (Locust / k6) to uncover real resource contention like N+1 database queries."
    },
    {
        "num": "SHIFT 02",
        "title": "From 'AI for Everything' to Deterministic Boundaries",
        "from_txt": "Attempting to prompt LLMs to calculate physical geometries, pricing formulas, and strict validation checks.",
        "to_txt": "Restricting LLMs strictly to qualitative NLP while enforcing 100% deterministic Python math for dimensions and costs."
    },
    {
        "num": "SHIFT 03",
        "title": "From Fragile Local Tests to Hermetic CI Automation",
        "from_txt": "Running tests against live cloud AI APIs and external databases with shared state and rate limits.",
        "to_txt": "Decoupling dependencies behind a Mock Provider interface, ensuring 47 test suites run in seconds with zero token cost."
    },
    {
        "num": "SHIFT 04",
        "title": "From Idealized Formats to Defensive Input Tolerances",
        "from_txt": "Expecting external CAD files or buyer notes to follow strict specifications without anomalies.",
        "to_txt": "Engineering graph-based tolerance snapping, magic-byte format validation, and defensive schema fallbacks."
    }
]

def build_story_html(story):
    return f"""
          <!-- Story {story['num']}: {story['title']} -->
          <div class="timeline-story" id="{story['id']}">
            <div class="timeline-marker">
              <div class="timeline-marker-inner"></div>
            </div>

            <article class="timeline-card">
              <div class="timeline-header">
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.775rem; font-weight: 700; color: #60a5fa; margin-bottom: 0.35rem; letter-spacing: 0.06em;">
                    STORY {story['num']} · {story['domain'].upper()}
                  </div>
                  <h2 class="timeline-title">{story['title']}</h2>
                </div>
                <div class="timeline-meta">
                  <span class="pattern-tag {story['tag_cls']}">{story['domain']}</span>
                </div>
              </div>

              <!-- 5-Step Flow -->
              <div class="learning-flow">
                <!-- What I Tried -->
                <div class="flow-node flow-node-tried">
                  <div class="flow-label">
                    <span>What I Tried:</span>
                  </div>
                  <p class="flow-text">{story['tried']}</p>
                </div>

                <div class="flow-arrow-down">↓</div>

                <!-- What Happened -->
                <div class="flow-node flow-node-happened">
                  <div class="flow-label">
                    <span>What Happened:</span>
                  </div>
                  <p class="flow-text">{story['happened']}</p>
                </div>

                <div class="flow-arrow-down">↓</div>

                <!-- Why It Was a Problem -->
                <div class="flow-node flow-node-problem">
                  <div class="flow-label">
                    <span>Why It Was a Problem:</span>
                  </div>
                  <p class="flow-text">{story['problem']}</p>
                </div>

                <div class="flow-arrow-down">↓</div>

                <!-- What I Changed -->
                <div class="flow-node flow-node-changed">
                  <div class="flow-label">
                    <span>What I Changed:</span>
                  </div>
                  <p class="flow-text">{story['changed']}</p>
                </div>

                <div class="flow-arrow-down">↓</div>

                <!-- What I Learned -->
                <div class="flow-node flow-node-learned">
                  <div class="flow-label">
                    <span>What I Learned:</span>
                  </div>
                  <p class="flow-text">{story['learned']}</p>
                </div>
              </div>
            </article>
          </div>
"""

def generate_page(is_nested=False):
    asset_prefix = "../../" if is_nested else ""
    canonical_url = "https://bhuvanab.dev/engineering/learnings"
    
    home_link = f"{asset_prefix}index.html"
    projects_link = f"{asset_prefix}projects.html"
    case_study_link = f"{asset_prefix}forgeiq-case-study.html"
    engineering_link = f"{asset_prefix}engineering.html"
    notes_link = f"{asset_prefix}notes.html"
    about_link = f"{asset_prefix}about.html"
    certifications_link = f"{asset_prefix}certifications.html"
    contact_link = f"{asset_prefix}contact.html"
    resume_link = f"{asset_prefix}resume.pdf"
    decisions_link = f"{asset_prefix}engineering/decisions/index.html" if is_nested else "engineering/decisions/index.html"
    eval_link = f"{asset_prefix}engineering/evaluation/index.html" if is_nested else "engineering/evaluation/index.html"
    patterns_link = f"{asset_prefix}engineering/patterns/index.html" if is_nested else "engineering/patterns/index.html"

    stories_html = "\n".join(build_story_html(s) for s in STORIES)

    shifts_html = "\n".join(f"""
            <div class="approach-shift-card">
              <div class="shift-header">{s['num']}</div>
              <h3 class="shift-title">{s['title']}</h3>
              <div class="shift-diff">
                <div class="shift-from"><strong>Before:</strong> {s['from_txt']}</div>
                <div class="shift-to"><strong>Now:</strong> {s['to_txt']}</div>
              </div>
            </div>
""" for s in SHIFTS)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Learnings &amp; Iteration | Bhuvan A B</title>
  <meta name="description" content="Genuine engineering iteration stories and technical retrospectives from building ForgeIQ: What I tried, what happened, why it was a problem, what I changed, and what I learned.">
  <link rel="canonical" href="{canonical_url}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:title" content="Engineering Learnings &amp; Iteration | Bhuvan A B">
  <meta property="og:description" content="Genuine technical iteration stories from building ForgeIQ. What I tried, what happened, why it was a problem, what I changed, and what I learned.">
  <meta property="og:site_name" content="Bhuvan A B Portfolio">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Engineering Learnings &amp; Iteration | Bhuvan A B">
  <meta name="twitter:description" content="Technical retrospectives and honest engineering learnings across databases, AI grounding, test harnesses, and concurrency.">

  <!-- Performance & Favicon -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" type="image/x-icon" href="{asset_prefix}favicon.ico">
  <link rel="stylesheet" href="{asset_prefix}css/style.css">
</head>
<body>

  <!-- Site Header & Navigation -->
  <header class="header">
    <div class="header-inner">
      <a href="{home_link}" class="header-logo" aria-label="Bhuvan A B Home">
        <span class="logo-name">Bhuvan A B</span>
        <span class="logo-role">Software &amp; AI Systems Engineer</span>
      </a>

      <nav class="nav" aria-label="Main Navigation">
        <a href="{home_link}">Home</a>
        <a href="{projects_link}">Projects</a>
        <a href="{case_study_link}">ForgeIQ Case Study</a>
        <a href="{engineering_link}" style="color: var(--text-accent); font-weight: 600;">Engineering</a>
        <a href="{notes_link}">Writing</a>
        <a href="{about_link}">About</a>
        <a href="{contact_link}">Contact</a>
      </nav>

      <div class="header-actions">
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle visual theme" title="Toggle theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
        <a href="{resume_link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary resume-btn">
          <span>Resume</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </a>
        <button class="mobile-toggle" aria-label="Open menu" aria-expanded="false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <div class="mobile-menu">
      <a href="{home_link}">Home</a>
      <a href="{projects_link}">Projects</a>
      <a href="{case_study_link}">ForgeIQ Case Study</a>
      <a href="{engineering_link}" style="color: var(--text-accent); font-weight: 600;">Engineering</a>
      <a href="{notes_link}">Writing / Notes</a>
      <a href="{about_link}">About</a>
      <a href="{certifications_link}">Certifications</a>
      <a href="{contact_link}">Contact</a>
      <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
        <a href="{resume_link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;">
          Download Resume (PDF)
        </a>
      </div>
    </div>
  </header>

  <main>
    <div class="section" style="padding-top: 3.5rem; padding-bottom: 6rem;">
      <div class="container" style="max-width: 960px;">
        
        <!-- Breadcrumb & Back Links -->
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
          <a href="{engineering_link}" style="display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.85rem; color: var(--text-muted);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Engineering Principles</span>
          </a>
          <span style="color: var(--text-dim);">·</span>
          <a href="{decisions_link}" style="font-size: 0.85rem; color: #60a5fa;">
            14 Decisions (ADRs) ↗
          </a>
          <span style="color: var(--text-dim);">·</span>
          <a href="{patterns_link}" style="font-size: 0.85rem; color: #34d399;">
            Engineering Patterns ↗
          </a>
          <span style="color: var(--text-dim);">·</span>
          <a href="{eval_link}" style="font-size: 0.85rem; color: #c084fc;">
            AI Evaluation Lab ↗
          </a>
          <span style="color: var(--text-dim);">·</span>
          <a href="{case_study_link}" style="font-size: 0.85rem; color: #f59e0b;">
            ForgeIQ Case Study ↗
          </a>
        </div>

        <!-- Masthead -->
        <header style="margin-bottom: 3.5rem;">
          <div class="badge badge-amber" style="margin-bottom: 0.85rem;">Honest Engineering Retrospective</div>
          <h1 style="font-size: clamp(2.2rem, 4.5vw, 3.25rem); line-height: 1.15; margin-bottom: 0.85rem;">
            Engineering Learnings: Iteration, Constraints &amp; Evolution
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7; max-width: 860px; margin-bottom: 1.5rem;">
            Real software engineering is not about writing pristine code on the first attempt—it is about systematic iteration when an initial approach reaches its operational limit. Here are six documented technical turning points from building <strong>ForgeIQ</strong>, tracing exactly what was tried, what broke, why it mattered, and what changed.
          </p>
          <div style="background: rgba(14, 21, 37, 0.65); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 0.95rem 1.25rem; font-size: 0.825rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
            <div><strong>Integrity Standard:</strong> Zero fabricated outages, fake user interviews, or artificial drama.</div>
            <div><strong>Scope:</strong> Documented development and architectural iterations across ForgeIQ.</div>
          </div>
        </header>

        <!-- Timeline Section -->
        <section style="margin-bottom: 4rem;">
          <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #60a5fa; margin-bottom: 0.5rem;">
            Chronological Technical Stories
          </div>
          <div class="timeline-track">
{stories_html}
          </div>
        </section>

        <!-- Concluding Section: What Changed in My Engineering Approach? -->
        <section style="margin-top: 4.5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
          <div class="badge badge-emerald" style="margin-bottom: 0.85rem;">Core Evolution</div>
          <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.4rem); line-height: 1.25; margin-bottom: 1rem;">
            What Changed in My Engineering Approach?
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; max-width: 840px; margin-bottom: 2rem;">
            Building and refactoring a complex manufacturing intelligence platform reshaped how I think about system design, verification, and technical trade-offs. The progression from an enthusiastic developer to a production-oriented engineer centers on four core mindset shifts:
          </p>

          <div class="approach-shift-grid">
{shifts_html}
          </div>
        </section>

        <!-- Footer CTA -->
        <div class="card-elevated" style="margin-top: 4rem; padding: 2.5rem; text-align: center; border: 1px solid rgba(96, 165, 250, 0.35); background: linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.85));">
          <h2 style="font-size: 1.5rem; margin-bottom: 0.65rem;">Explore Related Engineering Artifacts</h2>
          <p style="color: var(--text-secondary); max-width: 620px; margin: 0 auto 1.5rem; line-height: 1.6; font-size: 0.95rem;">
            Inspect the underlying architectural choices, failure mode benchmarks, and reusable design patterns that evolved from these learnings.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="{patterns_link}" class="btn btn-primary" style="padding: 0.65rem 1.35rem;">
              <span>Explore 5 Engineering Patterns →</span>
            </a>
            <a href="{decisions_link}" class="btn btn-secondary" style="padding: 0.65rem 1.35rem;">
              <span>Inspect 14 Architectural Decisions (ADRs) →</span>
            </a>
            <a href="{eval_link}" class="btn btn-secondary" style="padding: 0.65rem 1.35rem; color: #d8b4fe; border-color: rgba(168, 85, 247, 0.4);">
              <span>AI Evaluation Lab →</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </main>

  <!-- Site Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-copy">
        &copy; 2026 Bhuvan A B. Crafted with precision for software engineering excellence.
      </div>
      <div class="footer-links">
        <a href="https://github.com/bhuvanabcs24-maker" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/bhuvan-a-b-4805a2330/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://leetcode.com/u/BHUVANab2006/" target="_blank" rel="noopener noreferrer">LeetCode</a>
        <a href="{home_link}#contact">Contact</a>
      </div>
    </div>
  </footer>

  <script src="{asset_prefix}js/main.js"></script>
</body>
</html>
"""
    return html_content

def main():
    root_path = "/Users/bhuvanab/Portfolio/engineering-learnings.html"
    with open(root_path, "w", encoding="utf-8") as f:
        f.write(generate_page(is_nested=False))
    print(f"Generated {root_path} ({os.path.getsize(root_path)} bytes)")

    nested_dir = "/Users/bhuvanab/Portfolio/engineering/learnings"
    os.makedirs(nested_dir, exist_ok=True)
    nested_path = os.path.join(nested_dir, "index.html")
    with open(nested_path, "w", encoding="utf-8") as f:
        f.write(generate_page(is_nested=True))
    print(f"Generated {nested_path} ({os.path.getsize(nested_path)} bytes)")

if __name__ == "__main__":
    main()
