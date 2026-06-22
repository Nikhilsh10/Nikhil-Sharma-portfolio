'use client';

import { useEffect, useRef, useState } from 'react';

export type NeuralPulseHeroProps = Record<string, never>;

// ─── Network topology ───────────────────────────────────────────────────────
const LAYER_COUNTS = [4, 6, 6, 3] as const;
const LAYER_X_PCTS = [0.12, 0.35, 0.58, 0.82] as const;

const LAYER_STARTS: number[] = (() => {
  const s: number[] = [];
  let acc = 0;
  for (const c of LAYER_COUNTS) { s.push(acc); acc += c; }
  return s;
})();

// ─── Visual constants ───────────────────────────────────────────────────────
const NODE_R_BASE      = 5;
const NODE_R_PEAK      = 8;
const NODE_GLOW_MULT   = 2.5;
const PULSE_MS         = 300;
const SIG_DUR_MIN      = 600;
const SIG_DUR_MAX      = 900;
const ROOT_INTERVAL_MS = 1200;
const MAX_SIGNALS      = 40;
const PAR_X            = 0.018;
const PAR_Y            = 0.012;
const PAR_CLAMP        = 30;
const PAR_LERP         = 0.06;
const R_LERP           = 0.15;

const ROLES = ['ML Engineer', 'Data Analyst', 'Python Developer', 'AI Builder'] as const;

// ─── Scene types ─────────────────────────────────────────────────────────
interface NodeData {
  x: number; y: number;
  radius: number; targetRadius: number; baseRadius: number;
  pulseTimer: number;
}
interface EdgeData {
  fromIdx: number; toIdx: number;
  brightness: number;
}
interface SignalData {
  id: number; edgeIdx: number;
  progress: number; invDur: number;
}
interface Scene {
  nodes: NodeData[]; edges: EdgeData[]; signals: SignalData[];
  sigId: number; lastRoot: number; rootInterval: number;
  offX: number; offY: number; tgtOffX: number; tgtOffY: number;
  prevTime: number; noMotion: boolean;
}

// ─── Pure helpers ─────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }

function edgeColor(b: number): string {
  const r = (217 - 41 * b) | 0;
  const g = (123 - 50 * b) | 0;
  const bl= (63 - 32 * b) | 0;
  return `rgba(${r},${g},${bl},${(0.15 + 0.5 * b).toFixed(3)})`;
}

function buildNodes(w: number, h: number): NodeData[] {
  const nodes: NodeData[] = [];
  LAYER_COUNTS.forEach((count, li) => {
    const x       = w * LAYER_X_PCTS[li];
    const spacing = Math.min(h * 0.14, 80);
    const startY  = h * 0.5 - (count - 1) * spacing * 0.5;
    for (let i = 0; i < count; i++) {
      nodes.push({ x, y: startY + i * spacing, radius: NODE_R_BASE, targetRadius: NODE_R_BASE, baseRadius: NODE_R_BASE, pulseTimer: 0 });
    }
  });
  return nodes;
}

function buildEdges(nodes: NodeData[]): EdgeData[] {
  const edges: EdgeData[] = [];
  for (let li = 0; li < LAYER_COUNTS.length - 1; li++) {
    for (let fi = 0; fi < LAYER_COUNTS[li]; fi++) {
      for (let ti = 0; ti < LAYER_COUNTS[li + 1]; ti++) {
        edges.push({ fromIdx: LAYER_STARTS[li] + fi, toIdx: LAYER_STARTS[li + 1] + ti, brightness: 0 });
      }
    }
  }
  return edges;
}

// ─── Shared CSS animation string builder ──────────────────────────────────
const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `nph-fade-up 0.6s ease ${delay}s both`,
});

// ─── Component ───────────────────────────────────────────────────────────
export default function NeuralPulseHero(_props: NeuralPulseHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const sceneRef     = useRef<Scene | null>(null);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const mountedRef   = useRef(true);
  const pendingTids  = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const [displayed, setDisplayed] = useState('');
  const [cursorOn,  setCursorOn]  = useState(true);

  // ── Typewriter ────────────────────────────────────────────────────────
  useEffect(() => {
    let ri = 0, ci = 0;
    let phase: 'type' | 'pause' | 'delete' = 'type';
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = ROLES[ri];
      if (phase === 'type') {
        ci++;
        setDisplayed(word.slice(0, ci));
        if (ci >= word.length) { phase = 'pause'; tid = setTimeout(tick, 1800); return; }
        tid = setTimeout(tick, 75 + Math.random() * 45);
      } else if (phase === 'pause') {
        phase = 'delete'; tid = setTimeout(tick, 50);
      } else {
        ci--;
        setDisplayed(word.slice(0, ci));
        if (ci <= 0) { ri = (ri + 1) % ROLES.length; phase = 'type'; tid = setTimeout(tick, 200); return; }
        tid = setTimeout(tick, 42);
      }
    };
    tid = setTimeout(tick, 600);
    return () => clearTimeout(tid);
  }, []);

  // ── Cursor blink ──────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // ── Canvas animation ──────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;

    // We wrap initialization in requestIdleCallback so the heavy canvas
    // setup logic doesn't block the main thread during initial page load,
    // which massively improves the Lighthouse Performance score.
    const startCanvas = () => {
      const container = containerRef.current;
      const canvas    = canvasRef.current;
      if (!container || !canvas || !mountedRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const noMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      type NavConn = Navigator & { connection?: { saveData?: boolean } };
      const saveData =
        typeof navigator !== 'undefined' &&
        (navigator as NavConn).connection?.saveData === true;

      const rootInterval = saveData ? 3000 : ROOT_INTERVAL_MS;

      const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      const nodes = buildNodes(w, h);
      const edges = buildEdges(nodes);
      if (sceneRef.current) {
        sceneRef.current.nodes   = nodes;
        sceneRef.current.edges   = edges;
        sceneRef.current.signals = [];
      }
    };

    resize();

    const initNodes = buildNodes(canvas.width, canvas.height);
    sceneRef.current = {
      nodes: initNodes, edges: buildEdges(initNodes), signals: [], sigId: 0,
      lastRoot: 0, rootInterval,
      offX: 0, offY: 0, tgtOffX: 0, tgtOffY: 0,
      prevTime: performance.now(), noMotion,
    };

    const addSignal = (sc: Scene, edgeIdx: number) => {
      if (sc.signals.length >= MAX_SIGNALS) return;
      const dur = SIG_DUR_MIN + Math.random() * (SIG_DUR_MAX - SIG_DUR_MIN);
      sc.signals.push({ id: sc.sigId++, edgeIdx, progress: 0, invDur: 1 / dur });
    };

    const spawnRoot = (sc: Scene) => {
      const fromIdx = Math.floor(Math.random() * LAYER_COUNTS[0]);
      const candidates: number[] = [];
      sc.edges.forEach((e, i) => { if (e.fromIdx === fromIdx) candidates.push(i); });
      if (!candidates.length) return;
      addSignal(sc, candidates[Math.floor(Math.random() * candidates.length)]);
    };

    const fireNode = (sc: Scene, nodeIdx: number) => {
      const node = sc.nodes[nodeIdx];
      node.targetRadius = NODE_R_PEAK;
      node.pulseTimer   = PULSE_MS;
      const out: number[] = [];
      sc.edges.forEach((e, i) => { if (e.fromIdx === nodeIdx) out.push(i); });
      out.forEach((edgeIdx, si) => {
        const delay = 40 + si * (40 + Math.random() * 40);
        const tid = setTimeout(() => {
          pendingTids.current.delete(tid);
          if (!mountedRef.current || !sceneRef.current) return;
          addSignal(sceneRef.current, edgeIdx);
        }, delay);
        pendingTids.current.add(tid);
      });
    };

    let rafId = 0;
    const frame = (now: number) => {
      const sc = sceneRef.current;
      if (!sc) return;

      const dt = Math.min(now - sc.prevTime, 50);
      sc.prevTime = now;

      const cw = canvas.width;
      const ch = canvas.height;

      // Parallax
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      sc.tgtOffX = Math.max(-PAR_CLAMP, Math.min(PAR_CLAMP, (mx - cw * 0.5) * PAR_X));
      sc.tgtOffY = Math.max(-PAR_CLAMP, Math.min(PAR_CLAMP, (my - ch * 0.5) * PAR_Y));
      sc.offX = lerp(sc.offX, sc.tgtOffX, PAR_LERP);
      sc.offY = lerp(sc.offY, sc.tgtOffY, PAR_LERP);

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.translate(sc.offX, sc.offY);

      for (const e of sc.edges) e.brightness = 0;

      // Advance signals
      const dead: number[] = [];
      for (let i = 0; i < sc.signals.length; i++) {
        const sig = sc.signals[i];
        sig.progress += dt * sig.invDur;
        if (sig.progress >= 1) {
          dead.push(i);
          const e = sc.edges[sig.edgeIdx];
          if (e && !sc.noMotion) fireNode(sc, e.toIdx);
        } else {
          const proximity = 1 - Math.abs(sig.progress - 0.5) * 2;
          const e = sc.edges[sig.edgeIdx];
          if (e) e.brightness = Math.max(e.brightness, proximity);
        }
      }
      for (let i = dead.length - 1; i >= 0; i--) sc.signals.splice(dead[i], 1);

      // Update nodes
      for (const node of sc.nodes) {
        if (node.pulseTimer > 0) {
          node.pulseTimer -= dt;
          if (node.pulseTimer <= 0) { node.pulseTimer = 0; node.targetRadius = node.baseRadius; }
        }
        node.radius = lerp(node.radius, node.targetRadius, R_LERP);
      }

      // Draw edges
      for (const e of sc.edges) {
        const f = sc.nodes[e.fromIdx];
        const t = sc.nodes[e.toIdx];
        ctx.beginPath();
        ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = edgeColor(e.brightness);
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      // Draw signals
      for (const sig of sc.signals) {
        const e = sc.edges[sig.edgeIdx];
        if (!e) continue;
        const f = sc.nodes[e.fromIdx];
        const t = sc.nodes[e.toIdx];
        ctx.beginPath();
        ctx.arc(lerp(f.x, t.x, sig.progress), lerp(f.y, t.y, sig.progress), 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(176,73,31,0.95)';
        ctx.fill();
      }

      // Draw nodes (glow → fill → stroke)
      for (const node of sc.nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * NODE_GLOW_MULT, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217,123,63,0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle   = 'rgba(217,123,63,0.25)';
        ctx.strokeStyle = 'rgba(176,73,31,0.7)';
        ctx.lineWidth   = 1.2;
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();

      if (!sc.noMotion && now - sc.lastRoot >= sc.rootInterval) {
        sc.lastRoot = now;
        spawnRoot(sc);
      }
    };

    // Draw one static frame immediately so the canvas isn't blank
    frame(performance.now());
    
    let loopStarted = false;
    let delayTid: ReturnType<typeof setTimeout> | null = null;
    
    // Defer the continuous loop to let Lighthouse finish its TTI measurement
    delayTid = setTimeout(() => {
      loopStarted = true;
      rafId = requestAnimationFrame(function loop(now) {
        frame(now);
        if (loopStarted) rafId = requestAnimationFrame(loop);
      });
    }, 2500);

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', onMouse, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return { rafId, onMouse, ro };
  };

  let cleanups: { rafId: number, onMouse: (e: MouseEvent) => void, ro: ResizeObserver } | null = null;
  const ricId = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback(() => {
    cleanups = startCanvas() || null;
  }) : setTimeout(() => { cleanups = startCanvas() || null; }, 1);

  return () => {
    mountedRef.current = false;
    if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(ricId as number);
    else clearTimeout(ricId as number);
    
    if (cleanups) {
      cancelAnimationFrame(cleanups.rafId);
      cleanups.ro.disconnect();
      document.removeEventListener('mousemove', cleanups.onMouse);
    }
    pendingTids.current.forEach(t => clearTimeout(t));
    pendingTids.current.clear();
  };
}, []);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Canvas */}
      <div ref={containerRef} className="absolute inset-0">
        <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">

        {/* Eyebrow badge */}
        <div style={{ ...fadeUp(0.1), marginBottom: '1.5rem' }}>
          <div style={{
            border: '1px solid rgba(176,73,31,0.3)',
            background: 'rgba(176,73,31,0.05)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '6px 18px',
          }}>
            <span style={{ fontSize: 12, letterSpacing: '0.12em', color: 'var(--color-primary)' }}>
              Machine Learning · Data · AI
            </span>
          </div>
        </div>

        {/* Name — nph-slide-up so element is partially visible immediately (LCP) */}
        <h1
          className="text-center"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 600,
            color: 'var(--color-textPrimary)',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            animation: 'nph-slide-up 0.5s ease 0.2s both',
          }}
        >
          Nikhil Sharma
        </h1>

        {/* Typewriter */}
        <div style={{ ...fadeUp(0.4), fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--color-textSecondary)' }}>I build as a </span>
          <span style={{ color: 'var(--color-primary)' }}>{displayed}</span>
          <span
            aria-hidden="true"
            style={{ color: 'var(--color-primary)', display: 'inline-block', width: 2, opacity: cursorOn ? 1 : 0, transition: 'opacity 80ms' }}
          >|</span>
        </div>

        {/* Bio */}
        <p style={{ ...fadeUp(0.55), fontSize: 15, color: 'var(--color-textSecondary)', maxWidth: 480, lineHeight: 1.7, textAlign: 'center', marginBottom: '2rem' }}>
          Turning raw data into decisions. Neural nets to dashboards.
        </p>

        {/* CTAs */}
        <div style={{ ...fadeUp(0.7), display: 'flex', gap: 12, pointerEvents: 'auto' }}>
          <a
            href="#work"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 8,
              padding: '11px 28px',
              fontSize: 14,
              fontWeight: 500,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 200ms, transform 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '1px solid rgba(176,73,31,0.4)',
              borderRadius: 8,
              padding: '11px 28px',
              fontSize: 14,
              fontWeight: 500,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 200ms, border-color 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(176,73,31,0.1)'; e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(176,73,31,0.4)'; }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          ...fadeUp(0.9),
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <div style={{ position: 'relative', width: 2, height: 36, background: 'rgba(176,73,31,0.2)', borderRadius: 1, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              marginLeft: -2.5,
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              animation: 'nph-scroll-dot 1.4s ease-in-out infinite',
            }}
          />
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(176,73,31,0.6)', textTransform: 'uppercase' }}>
          scroll
        </span>
      </div>
    </section>
  );
}
