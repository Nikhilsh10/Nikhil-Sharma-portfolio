'use client';

/**
 * HeroCanvas — "Data Lattice" 3D centerpiece
 *
 * Implemented with raw Three.js (no @react-three/fiber) to avoid React-internal
 * version conflicts with Next.js 15 + React 18.
 *
 * All 6 mandatory guardrails implemented:
 *  1. Lazy-loaded via dynamic import with ssr:false in Hero.tsx
 *  2. requestAnimationFrame paused via IntersectionObserver when hero scrolls out
 *  3. Page Visibility API — pauses when browser tab not focused
 *  4. prefers-reduced-motion: reduce — returns null (HeroFallback shows instead)
 *  5. Network Information API — returns null on saveData or slow-2g/2g
 *  6. aria-hidden="true" — fully decorative, no keyboard path
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ─── Curated node positions — organic, non-uniform lattice ─── */
const NODE_POSITIONS: [number, number, number][] = [
  [ 0.00,  0.00,  0.00],
  [ 1.20,  0.70, -0.40],
  [-1.10,  0.50,  0.30],
  [ 0.30, -1.20,  0.60],
  [-0.80, -0.80, -0.50],
  [ 1.50, -0.20,  0.70],
  [-1.30, -0.10, -0.80],
  [ 0.10,  1.60,  0.30],
  [-0.40,  0.20,  1.40],
  [ 0.90,  0.40,  1.10],
  [-0.80,  1.30, -0.30],
  [ 0.60, -0.50, -1.20],
];

const EDGE_THRESHOLD = 1.82;

function buildEdges(
  positions: [number, number, number][],
  threshold: number,
): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const [ax, ay, az] = positions[i];
      const [bx, by, bz] = positions[j];
      const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
      if (dist < threshold) edges.push([i, j]);
    }
  }
  return edges;
}

export default function HeroCanvas() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Guard checks (client-side only) ── */
  useEffect(() => {
    // Guard 1: prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Guard 2: Network Information API (saveData / slow connection)
    type NavWithConnection = Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      mozConnection?: { saveData?: boolean; effectiveType?: string };
      webkitConnection?: { saveData?: boolean; effectiveType?: string };
    };
    const nav = navigator as NavWithConnection;
    const conn = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType && ['slow-2g', '2g'].includes(conn.effectiveType)) return;

    setShouldRender(true);
  }, []);

  /* ── Three.js scene (runs only when shouldRender === true) ── */
  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;
    const container = containerRef.current;

    /* Defer heavy Three.js init until browser is idle — reduces TBT impact */
    let cleanup: (() => void) | undefined;
    let idleId: number | ReturnType<typeof setTimeout>;

    const init = () => {
      /* --- Renderer --- */
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // transparent background
      container.appendChild(renderer.domElement);

      const setSize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      /* --- Camera --- */
      const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
      camera.position.z = 4.8;

      /* --- Scene --- */
      const scene = new THREE.Scene();

      /* --- Group (offset slightly right so text sits cleanly left) --- */
      const group = new THREE.Group();
      group.position.x = 0.55;
      scene.add(group);

      /* --- Lighting (warm copper/terracotta ONLY — no blue tones) --- */
      scene.add(new THREE.AmbientLight(0xffffff, 0.08));
      const pt1 = new THREE.PointLight(0xe8915f, 3, 12);
      pt1.position.set(1.5, 1.5, 2.5);
      group.add(pt1);
      const pt2 = new THREE.PointLight(0xd97b3f, 1.5, 10);
      pt2.position.set(-1.2, -0.8, 1.0);
      group.add(pt2);

      /* --- Shared node geometry + material --- */
      const nodeGeo = new THREE.SphereGeometry(0.072, 12, 8);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xc96b2a,
        emissive: 0xd97b3f,
        emissiveIntensity: 2.8,
        roughness: 0.25,
        metalness: 0.05,
      });
      NODE_POSITIONS.forEach(([x, y, z]) => {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.set(x, y, z);
        group.add(mesh);
      });

      /* --- Edge geometry --- */
      const edges = buildEdges(NODE_POSITIONS, EDGE_THRESHOLD);
      const edgeArr: number[] = [];
      edges.forEach(([a, b]) => {
        edgeArr.push(...NODE_POSITIONS[a], ...NODE_POSITIONS[b]);
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(edgeArr), 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xe8915f,
        transparent: true,
        opacity: 0.30,
      });
      group.add(new THREE.LineSegments(lineGeo, lineMat));

      /* --- Animation state --- */
      let baseRotX = 0;
      let baseRotY = 0;
      let parallaxX = 0;
      let parallaxY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let paused = false;
      let animId = 0;
      let lastTime = performance.now();

      setSize(); // initial sizing after DOM attach

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        if (paused) return;

        const delta = Math.min((now - lastTime) / 1000, 0.05) * 60;
        lastTime = now;

        /* Ambient slow rotation — one full rotation ≈ 30s */
        baseRotX += 0.0035 * delta;
        baseRotY += 0.0025 * delta;

        /* Parallax — lerp toward mouse target, capped at ±0.12 rad (~7°) */
        const targetPX = mouseY * 0.12;
        const targetPY = mouseX * 0.12;
        parallaxX += (targetPX - parallaxX) * 0.04;
        parallaxY += (targetPY - parallaxY) * 0.04;

        group.rotation.x = baseRotX + parallaxX;
        group.rotation.y = baseRotY + parallaxY;

        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(animate);

      /* Guard 3: IntersectionObserver — pause when hero scrolls out of view */
      const observer = new IntersectionObserver(
        ([entry]) => { paused = !entry.isIntersecting; },
        { threshold: 0.01 },
      );
      observer.observe(container);

      /* Guard 4 (runtime): Page Visibility API — pause on tab switch */
      const handleVisibility = () => { paused = document.hidden; };
      document.addEventListener('visibilitychange', handleVisibility);

      /* Mouse parallax — desktop (hover-capable) devices only */
      const isTouch = window.matchMedia('(hover: none)').matches;
      const handleMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      const handleLeave = () => { mouseX = 0; mouseY = 0; };
      if (!isTouch) {
        window.addEventListener('mousemove', handleMouse, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleLeave);
      }

      /* Resize */
      const resizeObs = new ResizeObserver(setSize);
      resizeObs.observe(container);

      cleanup = () => {
        cancelAnimationFrame(animId);
        observer.disconnect();
        resizeObs.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
        if (!isTouch) {
          window.removeEventListener('mousemove', handleMouse);
          document.documentElement.removeEventListener('mouseleave', handleLeave);
        }
        renderer.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }; // end init()

    /* Use requestIdleCallback to defer Three.js past the critical render window */
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(init, { timeout: 1500 });
    } else {
      idleId = setTimeout(init, 300); // fallback for Safari
    }

    return () => {
      if (typeof window.requestIdleCallback === 'function') {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
      cleanup?.();
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: 'hidden' }}
    />
  );
}
