'use client';

import { useEffect, useRef } from 'react';

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

export default function TubesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs: Orb[] = [
      { x: 0.22, y: 0.35, vx: 0.00005, vy: 0.00007, r: 520, color: 'rgba(217, 119, 87, 0.22)' },
      { x: 0.78, y: 0.62, vx: -0.00006, vy: 0.00004, r: 600, color: 'rgba(120, 90, 70, 0.18)' },
      { x: 0.55, y: 0.15, vx: 0.00004, vy: -0.00003, r: 480, color: 'rgba(217, 119, 87, 0.10)' },
      { x: 0.15, y: 0.85, vx: -0.00003, vy: -0.00005, r: 560, color: 'rgba(90, 70, 60, 0.16)' },
    ];

    const mouse = { x: 0.5, y: 0.5, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    let t = 0;
    const render = () => {
      t += 1;

      // Base
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Soft vignette gradient behind orbs
      const bg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.8
      );
      bg.addColorStop(0, 'rgba(30, 22, 18, 0.9)');
      bg.addColorStop(1, 'rgba(10, 10, 10, 1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Orbs — additive blend
      ctx.globalCompositeOperation = 'lighter';
      for (const orb of orbs) {
        // Float
        orb.x += orb.vx + Math.sin(t * 0.001 + orb.r) * 0.00004;
        orb.y += orb.vy + Math.cos(t * 0.0012 + orb.r) * 0.00004;

        // Gentle mouse parallax
        let px = orb.x;
        let py = orb.y;
        if (mouse.active) {
          px += (mouse.x - 0.5) * 0.04;
          py += (mouse.y - 0.5) * 0.04;
        }

        // Wrap
        if (orb.x < -0.2) orb.x = 1.2;
        if (orb.x > 1.2) orb.x = -0.2;
        if (orb.y < -0.2) orb.y = 1.2;
        if (orb.y > 1.2) orb.y = -0.2;

        const cx = px * width;
        const cy = py * height;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = 'source-over';

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      const offset = (t * 0.15) % gridSize;
      ctx.beginPath();
      for (let x = -offset; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -offset; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Vignette on top
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Film grain
      if (t % 2 === 0) {
        const grainAlpha = 0.025;
        ctx.save();
        ctx.globalAlpha = grainAlpha;
        const grainCount = Math.floor((width * height) / 6000);
        ctx.fillStyle = '#fff';
        for (let i = 0; i < grainCount; i++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.fillRect(gx, gy, 1, 1);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#0a0a0a',
      }}
    />
  );
}
