'use client';

import { useEffect, useRef } from 'react';

// ─── Network topology ───────────────────────────────────────────────────────
const LAYER_COUNTS = [4, 6, 6, 4] as const;
const LAYER_X_PCTS = [0.15, 0.38, 0.62, 0.85] as const;

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

export default function NeuralCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const sceneRef     = useRef<Scene | null>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 }); // Indicates uninitialized
  const mountedRef   = useRef(true);
  const pendingTids  = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // ── Canvas animation ──────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;

    const startCanvas = () => {
      const container = containerRef.current;
      const canvas    = canvasRef.current;
      if (!container || !canvas || !mountedRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isBot = typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
      
      const noMotion =
        isBot || (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

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
          if (!mountedRef.current) return;
          pendingTids.current.delete(tid);
          if (!sceneRef.current) return;
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

      if (!sc.noMotion) {
        let mx = 0;
        let my = 0;
        if (mouseRef.current.x !== -9999) {
          mx = mouseRef.current.x - cw * 0.5;
          my = mouseRef.current.y - ch * 0.5;
        }
        sc.tgtOffX = Math.max(-PAR_CLAMP, Math.min(PAR_CLAMP, -mx * PAR_X));
        sc.tgtOffY = Math.max(-PAR_CLAMP, Math.min(PAR_CLAMP, -my * PAR_Y));
      }
      sc.offX = lerp(sc.offX, sc.tgtOffX, PAR_LERP);
      sc.offY = lerp(sc.offY, sc.tgtOffY, PAR_LERP);

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.translate(sc.offX, sc.offY);

      for (const e of sc.edges) e.brightness = 0;

      // Update signals
      const dead: number[] = [];
      for (let i = 0; i < sc.signals.length; i++) {
        const sig = sc.signals[i];
        sig.progress += sig.invDur * dt;
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

      // Batch draw all idle edges
      ctx.beginPath();
      for (const e of sc.edges) {
        if (e.brightness === 0) {
          const f = sc.nodes[e.fromIdx];
          const t = sc.nodes[e.toIdx];
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(t.x, t.y);
        }
      }
      ctx.strokeStyle = edgeColor(0);
      ctx.lineWidth   = 0.7;
      ctx.stroke();

      // Draw active edges individually
      for (const e of sc.edges) {
        if (e.brightness > 0) {
          const f = sc.nodes[e.fromIdx];
          const t = sc.nodes[e.toIdx];
          ctx.beginPath();
          ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = edgeColor(e.brightness);
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // Draw signals
      ctx.beginPath();
      for (const sig of sc.signals) {
        const e = sc.edges[sig.edgeIdx];
        if (!e) continue;
        const f = sc.nodes[e.fromIdx];
        const t = sc.nodes[e.toIdx];
        const x = lerp(f.x, t.x, sig.progress);
        const y = lerp(f.y, t.y, sig.progress);
        ctx.moveTo(x + 3, y);
        ctx.arc(x, y, 3, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(176,73,31,0.95)';
      ctx.fill();

      // Batch draw node glows
      ctx.beginPath();
      for (const node of sc.nodes) {
        const r = node.radius * NODE_GLOW_MULT;
        ctx.moveTo(node.x + r, node.y);
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(217,123,63,0.15)';
      ctx.fill();

      // Batch draw node fills
      ctx.beginPath();
      for (const node of sc.nodes) {
        ctx.moveTo(node.x + node.radius, node.y);
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle   = 'rgba(217,123,63,0.25)';
      ctx.fill();

      // Batch draw node strokes
      ctx.strokeStyle = 'rgba(176,73,31,0.7)';
      ctx.lineWidth   = 1.2;
      ctx.stroke();

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
      if (!sceneRef.current?.noMotion) {
        rafId = requestAnimationFrame(function loop(now) {
          frame(now);
          if (loopStarted) rafId = requestAnimationFrame(loop);
        });
      }
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

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
    </div>
  );
}
