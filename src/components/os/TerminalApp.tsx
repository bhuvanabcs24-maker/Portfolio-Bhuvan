'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOS, AppId } from './OSContext';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string | React.ReactNode;
}

export default function TerminalApp() {
  const { openWindow, toggleMode } = useOS();
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: 'system',
      content: 'BHUVAN.OS v2.4.0 (x86_64-darwin24.0) — Engineering Workspace Shell'
    },
    {
      type: 'system',
      content: 'Type "help" to see available system commands, or "forgeiq" to inspect the flagship.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    // Add input line
    const newLines: TerminalLine[] = [
      ...history,
      { type: 'input', content: raw }
    ];

    const tokens = raw.toLowerCase().split(' ');
    const cmd = tokens[0];
    const arg = tokens[1];

    switch (cmd) {
      case 'help':
        newLines.push({
          type: 'output',
          content: (
            <div className="term-help-grid">
              <div><strong className="term-cyan">forgeiq</strong> — Inspect flagship CAD & pricing architecture</div>
              <div><strong className="term-cyan">cad</strong> — Open interactive CAD geometry & KD-Tree visualizer</div>
              <div><strong className="term-cyan">adrs</strong> — View 10 Architectural Decision Records</div>
              <div><strong className="term-cyan">eval</strong> — View AI Evaluation Lab (96.9% pricing benchmark)</div>
              <div><strong className="term-cyan">patterns</strong> — Inspect 4 production design patterns</div>
              <div><strong className="term-cyan">learnings</strong> — Read 4 failure & bottleneck retrospectives</div>
              <div><strong className="term-cyan">opensource</strong> — Inspect dxf-contour-extractor package</div>
              <div><strong className="term-cyan">leetcode</strong> — View LeetCode 100+ problem telemetry</div>
              <div><strong className="term-cyan">whoami</strong> — Display candidate background & academic profile</div>
              <div><strong className="term-cyan">status</strong> — Check system status & automated test metrics</div>
              <div><strong className="term-cyan">bench</strong> — Run simulated real-time quotation load test</div>
              <div><strong className="term-cyan">mode</strong> — Toggle between OS Desktop and Editorial Paper mode</div>
              <div><strong className="term-cyan">resume</strong> — Download official Resume (PDF)</div>
              <div><strong className="term-cyan">clear</strong> — Clear terminal screen</div>
            </div>
          )
        });
        break;

      case 'whoami':
        newLines.push({
          type: 'output',
          content: (
            <div>
              <p><strong className="term-green">Bhuvan A B</strong> — Software Engineer (BMSCE Bengaluru, Expected June 2028)</p>
              <p>Current CGPA: <strong>8.08 / 10</strong></p>
              <p>Core Focus: Backend Architecture, Deterministic Computational Geometry, Applied AI, and Algorithmic Problem Solving.</p>
              <p>Email: <a href="mailto:bhuvanab.cs24@bmsce.ac.in" className="term-link">bhuvanab.cs24@bmsce.ac.in</a></p>
            </div>
          )
        });
        break;

      case 'status':
        newLines.push({
          type: 'success',
          content: (
            <div>
              <p>✓ KERNEL STATUS: OK (ONLINE)</p>
              <p>✓ AUTOMATED TESTS: 47/47 passing (Pytest + Playwright)</p>
              <p>✓ PRICING ACCURACY BENCHMARK: 96.9% verified against synthetic RFQ ground-truth</p>
              <p>✓ CONCURRENCY OPTIMIZATION: 5.5x gain under heavy Celery DXF load</p>
              <p>✓ LEETCODE: 100+ problems solved across Trees, Graphs, DP</p>
            </div>
          )
        });
        break;

      case 'forgeiq':
        openWindow('forgeiq');
        newLines.push({
          type: 'success',
          content: 'Launched ForgeIQ window: 40+ REST API Endpoints, 9-stage order tracking, and deterministic CAD contour extraction.'
        });
        break;

      case 'cad':
        openWindow('cad-viewer');
        newLines.push({
          type: 'success',
          content: 'Launched CAD Topology & KD-Tree Snapping Visualizer.'
        });
        break;

      case 'adrs':
        openWindow('adrs');
        newLines.push({
          type: 'success',
          content: 'Opened Architecture Decisions (10 ADRs): PostgreSQL vs MongoDB, FastAPI vs Express, pgvector, etc.'
        });
        break;

      case 'eval':
        openWindow('eval-lab');
        newLines.push({
          type: 'success',
          content: 'Opened AI Evaluation Lab: 96.9% pricing benchmark, RAG precision tests, and JSON schema guardrails.'
        });
        break;

      case 'patterns':
        openWindow('patterns');
        newLines.push({
          type: 'success',
          content: 'Opened Production Design Patterns: AI Provider Abstraction, CAD Guardrails, State Machine, RBAC.'
        });
        break;

      case 'learnings':
        openWindow('learnings');
        newLines.push({
          type: 'success',
          content: 'Opened Engineering Learnings: Celery worker starvation, vector search tuning, schema migrations.'
        });
        break;

      case 'opensource':
      case 'dxf':
        openWindow('opensource');
        newLines.push({
          type: 'success',
          content: 'Opened Open Source Hub: dxf-contour-extractor Python library and extraction roadmap.'
        });
        break;

      case 'leetcode':
        openWindow('leetcode');
        newLines.push({
          type: 'success',
          content: 'Opened LeetCode telemetry: 100+ verified problems solved across core algorithmic paradigms.'
        });
        break;

      case 'bench':
        newLines.push({
          type: 'system',
          content: 'Executing synthetic load test benchmark (concurrency: 50 workers, 1000 requests)...'
        });
        setTimeout(() => {
          setHistory((h) => [
            ...h,
            {
              type: 'success',
              content: (
                <div>
                  <p>── BENCHMARK RUNNER RESULTS ──────────────────────────────</p>
                  <p>Total Requests: 1,000 | Concurrency: 50 workers</p>
                  <p>Initial Implementation (Sync Celery): 860 req/sec (12 timeouts)</p>
                  <p>Optimized Implementation (Multiprocessing Pool): <strong>4,589 req/sec (0 timeouts)</strong></p>
                  <p>Throughput Multiplier: <strong className="term-green">5.5x Concurrency Improvement</strong></p>
                  <p>p95 Latency: <strong>41.2 ms</strong> | p99 Latency: <strong>68.4 ms</strong></p>
                  <p>───────────────────────────────────────────────────────────</p>
                </div>
              )
            }
          ]);
        }, 600);
        break;

      case 'mode':
        toggleMode();
        newLines.push({
          type: 'success',
          content: 'Display mode toggled.'
        });
        break;

      case 'resume':
      case 'cat':
        if (arg === 'resume' || arg === 'resume.pdf' || cmd === 'resume') {
          window.open('/resume.pdf', '_blank');
          newLines.push({
            type: 'success',
            content: 'Opening resume.pdf in a new tab...'
          });
        } else {
          newLines.push({
            type: 'error',
            content: `cat: ${arg || ''}: No such file or directory. Try 'cat resume.pdf'`
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newLines.push({
          type: 'error',
          content: `bhuvan-sh: command not found: ${cmd}. Type "help" for a list of commands.`
        });
        break;
    }

    setHistory(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'whoami', 'status', 'forgeiq', 'cad', 'adrs', 'eval', 'patterns', 'learnings', 'opensource', 'leetcode', 'bench', 'mode', 'resume', 'clear'];
      const match = available.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="os-terminal-wrapper" onClick={() => inputRef.current?.focus()}>
      <div className="os-terminal-body">
        {history.map((line, idx) => (
          <div key={idx} className={`term-line term-${line.type}`}>
            {line.type === 'input' && (
              <span className="term-prompt">bhuvan@bmsce-macbook ~ % </span>
            )}
            <span className="term-content">{line.content}</span>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="term-input-row">
          <span className="term-prompt">bhuvan@bmsce-macbook ~ % </span>
          <input
            ref={inputRef}
            type="text"
            className="term-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
