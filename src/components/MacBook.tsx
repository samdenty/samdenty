'use client';

import { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import MacScreen, { SCREEN_PX_W, SCREEN_PX_H } from './MacScreen';


function addKey(
  group: THREE.Group,
  mat: THREE.Material,
  x: number, y: number, z: number,
  w: number, h: number, d: number
) {
  const radius = Math.min(w, d) * 0.18;
  const geo = new RoundedBoxGeometry(w, h, d, 4, radius);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  group.add(mesh);
}

type KeySpec = {
  x: number; z: number; w: number; d: number;
  label?: string;
  topLabel?: string;
  icon?: IconType;
  small?: boolean;
};

type IconType =
  | 'brightDown' | 'brightUp' | 'mission' | 'launchpad' | 'mic' | 'moon'
  | 'rewind' | 'playpause' | 'forward' | 'mute' | 'volDown' | 'volUp' | 'power'
  | 'shift' | 'tab' | 'caps' | 'cmd' | 'opt' | 'ctrl' | 'fn' | 'return'
  | 'backspace' | 'arrUp' | 'arrDown' | 'arrLeft' | 'arrRight';

function buildKeyboard(group: THREE.Group, keyMat: THREE.Material): KeySpec[] {
  const specs: KeySpec[] = [];
  const keyH = 0.016;
  const keyY = 0.057;
  const gap = 0.022;
  const W_KB = 2.46;

  type RowKey = { units: number } & Partial<KeySpec>;

  const layoutRow = (z: number, depth: number, keys: RowKey[], small: boolean) => {
    const totalUnits = keys.reduce((a, k) => a + k.units, 0);
    const totalGap = (keys.length - 1) * gap;
    const u = (W_KB - totalGap) / totalUnits;
    let cursor = -W_KB / 2;
    keys.forEach(k => {
      const w = k.units * u;
      const x = cursor + w / 2;
      addKey(group, keyMat, x, keyY, z, w, keyH, depth);
      specs.push({
        x, z, w, d: depth,
        label: k.label, topLabel: k.topLabel, icon: k.icon,
        small,
      });
      cursor += w + gap;
    });
  };

  // Function row (14 small keys)
  layoutRow(-0.68, 0.075, [
    { units: 1, label: 'esc' },
    { units: 1, label: 'F1', icon: 'brightDown' },
    { units: 1, label: 'F2', icon: 'brightUp' },
    { units: 1, label: 'F3', icon: 'mission' },
    { units: 1, label: 'F4', icon: 'launchpad' },
    { units: 1, label: 'F5', icon: 'mic' },
    { units: 1, label: 'F6', icon: 'moon' },
    { units: 1, label: 'F7', icon: 'rewind' },
    { units: 1, label: 'F8', icon: 'playpause' },
    { units: 1, label: 'F9', icon: 'forward' },
    { units: 1, label: 'F10', icon: 'mute' },
    { units: 1, label: 'F11', icon: 'volDown' },
    { units: 1, label: 'F12', icon: 'volUp' },
    { units: 1, icon: 'power' },
  ], true);

  // Number row (14 keys)
  layoutRow(-0.51, 0.155, [
    { units: 1, label: '`', topLabel: '~' },
    { units: 1, label: '1', topLabel: '!' },
    { units: 1, label: '2', topLabel: '@' },
    { units: 1, label: '3', topLabel: '#' },
    { units: 1, label: '4', topLabel: '$' },
    { units: 1, label: '5', topLabel: '%' },
    { units: 1, label: '6', topLabel: '^' },
    { units: 1, label: '7', topLabel: '&' },
    { units: 1, label: '8', topLabel: '*' },
    { units: 1, label: '9', topLabel: '(' },
    { units: 1, label: '0', topLabel: ')' },
    { units: 1, label: '-', topLabel: '_' },
    { units: 1, label: '=', topLabel: '+' },
    { units: 1, icon: 'backspace' },
  ], false);

  // QWERTY row (13 keys: tab + 10 letters + 2 brackets)
  layoutRow(-0.34, 0.155, [
    { units: 1.5, icon: 'tab' },
    { units: 1, label: 'Q' }, { units: 1, label: 'W' },
    { units: 1, label: 'E' }, { units: 1, label: 'R' },
    { units: 1, label: 'T' }, { units: 1, label: 'Y' },
    { units: 1, label: 'U' }, { units: 1, label: 'I' },
    { units: 1, label: 'O' }, { units: 1, label: 'P' },
    { units: 1, label: '[', topLabel: '{' },
    { units: 1.5, label: ']', topLabel: '}' },
  ], false);

  // ASDF row (12 keys: caps + 9 letters + ; + return)
  layoutRow(-0.17, 0.155, [
    { units: 1.75, icon: 'caps' },
    { units: 1, label: 'A' }, { units: 1, label: 'S' },
    { units: 1, label: 'D' }, { units: 1, label: 'F' },
    { units: 1, label: 'G' }, { units: 1, label: 'H' },
    { units: 1, label: 'J' }, { units: 1, label: 'K' },
    { units: 1, label: 'L' },
    { units: 1, label: ';', topLabel: ':' },
    { units: 2.25, icon: 'return' },
  ], false);

  // ZXCV row (11 keys: shift + 10 + shift)
  layoutRow(0.0, 0.155, [
    { units: 2, icon: 'shift' },
    { units: 1, label: 'Z' }, { units: 1, label: 'X' },
    { units: 1, label: 'C' }, { units: 1, label: 'V' },
    { units: 1, label: 'B' }, { units: 1, label: 'N' },
    { units: 1, label: 'M' },
    { units: 1, label: ',', topLabel: '<' },
    { units: 1, label: '.', topLabel: '>' },
    { units: 2, icon: 'shift' },
  ], false);

  // Bottom row + arrow cluster (arrow up/down occupy a single column, half-height)
  // Layout: fn ctrl opt cmd SPACE cmd opt arrL [arrUD] arrR
  const bottomZ = 0.17;
  const bottomD = 0.155;
  const bottomKeys: RowKey[] = [
    { units: 1.05, label: 'fn' },
    { units: 1.05, label: 'control', topLabel: '\u2303' },
    { units: 1.05, label: 'option',  topLabel: '\u2325' },
    { units: 1.25, label: 'command', topLabel: '\u2318' },
    { units: 4.5 },
    { units: 1.25, label: 'command', topLabel: '\u2318' },
    { units: 1.05, label: 'option',  topLabel: '\u2325' },
    { units: 1, icon: 'arrLeft' },
    { units: 1 }, // placeholder column for arrUp/arrDown
    { units: 1, icon: 'arrRight' },
  ];

  const totalUnits = bottomKeys.reduce((a, k) => a + k.units, 0);
  const totalGap = (bottomKeys.length - 1) * gap;
  const u = (W_KB - totalGap) / totalUnits;
  let cursor = -W_KB / 2;
  bottomKeys.forEach((k, i) => {
    const w = k.units * u;
    const x = cursor + w / 2;
    if (i === 8) {
      // Arrow up/down stacked, half-height
      const halfD = (bottomD - 0.006) / 2;
      const upZ = bottomZ - (halfD / 2 + 0.003);
      const downZ = bottomZ + (halfD / 2 + 0.003);
      addKey(group, keyMat, x, keyY, upZ, w, keyH, halfD);
      specs.push({ x, z: upZ, w, d: halfD, icon: 'arrUp', small: true });
      addKey(group, keyMat, x, keyY, downZ, w, keyH, halfD);
      specs.push({ x, z: downZ, w, d: halfD, icon: 'arrDown', small: true });
    } else {
      addKey(group, keyMat, x, keyY, bottomZ, w, keyH, bottomD);
      specs.push({
        x, z: bottomZ, w, d: bottomD,
        label: k.label, topLabel: k.topLabel, icon: k.icon,
        small: true,
      });
    }
    cursor += w + gap;
  });

  return specs;
}

function drawIcon(ctx: CanvasRenderingContext2D, type: IconType, size: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(230,230,235,0.95)';
  ctx.fillStyle = 'rgba(230,230,235,0.95)';
  ctx.lineWidth = Math.max(1, size * 0.06);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const s = size;

  switch (type) {
    case 'brightDown':
    case 'brightUp': {
      const r = type === 'brightUp' ? s * 0.18 : s * 0.13;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
      const rays = 8;
      const inner = r + s * 0.06;
      const outer = r + s * 0.16;
      for (let i = 0; i < rays; i++) {
        const a = (i / rays) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.stroke();
      }
      break;
    }
    case 'mission': {
      const r = s * 0.06;
      const w = s * 0.22, h = s * 0.16;
      const positions: [number, number][] = [[-s*0.22, -s*0.12], [s*0.22, -s*0.12], [0, s*0.18]];
      positions.forEach(([px, py]) => {
        ctx.beginPath();
        roundedRectPath(ctx, px - w/2, py - h/2, w, h, r);
        ctx.stroke();
      });
      break;
    }
    case 'launchpad': {
      const dotR = s * 0.05;
      const gap = s * 0.16;
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
        ctx.beginPath();
        ctx.arc(i * gap, j * gap, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'mic': {
      const w = s * 0.18, h = s * 0.32;
      ctx.beginPath();
      roundedRectPath(ctx, -w/2, -h/2 - s*0.05, w, h, w/2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, s*0.1, s*0.18, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, s*0.28); ctx.lineTo(0, s*0.4);
      ctx.stroke();
      break;
    }
    case 'moon': {
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.28, 0.25 * Math.PI, 1.75 * Math.PI);
      ctx.arc(s * 0.1, 0, s * 0.26, 1.75 * Math.PI, 0.25 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'rewind': {
      drawTri(ctx, -s*0.08, 0, s*0.18, true);
      drawTri(ctx, s*0.10, 0, s*0.18, true);
      ctx.fillRect(-s*0.22, -s*0.18, s*0.04, s*0.36);
      break;
    }
    case 'forward': {
      drawTri(ctx, -s*0.10, 0, s*0.18, false);
      drawTri(ctx, s*0.08, 0, s*0.18, false);
      ctx.fillRect(s*0.18, -s*0.18, s*0.04, s*0.36);
      break;
    }
    case 'playpause': {
      drawTri(ctx, -s*0.16, 0, s*0.16, false);
      ctx.fillRect(s*0.06, -s*0.16, s*0.05, s*0.32);
      ctx.fillRect(s*0.16, -s*0.16, s*0.05, s*0.32);
      break;
    }
    case 'mute':
    case 'volDown':
    case 'volUp': {
      ctx.beginPath();
      ctx.moveTo(-s*0.25, -s*0.08);
      ctx.lineTo(-s*0.10, -s*0.08);
      ctx.lineTo(s*0.05, -s*0.22);
      ctx.lineTo(s*0.05, s*0.22);
      ctx.lineTo(-s*0.10, s*0.08);
      ctx.lineTo(-s*0.25, s*0.08);
      ctx.closePath();
      ctx.fill();
      if (type === 'volDown' || type === 'volUp') {
        ctx.beginPath();
        ctx.arc(s*0.10, 0, s*0.14, -Math.PI/3, Math.PI/3);
        ctx.stroke();
      }
      if (type === 'volUp') {
        ctx.beginPath();
        ctx.arc(s*0.10, 0, s*0.24, -Math.PI/3, Math.PI/3);
        ctx.stroke();
      }
      if (type === 'mute') {
        ctx.beginPath();
        ctx.moveTo(s*0.12, -s*0.12); ctx.lineTo(s*0.30, s*0.12);
        ctx.moveTo(s*0.30, -s*0.12); ctx.lineTo(s*0.12, s*0.12);
        ctx.stroke();
      }
      break;
    }
    case 'power': {
      ctx.beginPath();
      ctx.arc(0, s*0.04, s*0.22, 0.85 * Math.PI, 0.15 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s*0.22); ctx.lineTo(0, s*0.02);
      ctx.stroke();
      break;
    }
    case 'shift': {
      ctx.beginPath();
      ctx.moveTo(0, -s*0.22);
      ctx.lineTo(s*0.18, -s*0.04);
      ctx.lineTo(s*0.08, -s*0.04);
      ctx.lineTo(s*0.08, s*0.20);
      ctx.lineTo(-s*0.08, s*0.20);
      ctx.lineTo(-s*0.08, -s*0.04);
      ctx.lineTo(-s*0.18, -s*0.04);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'caps': {
      ctx.beginPath();
      ctx.moveTo(0, -s*0.24);
      ctx.lineTo(s*0.18, -s*0.04);
      ctx.lineTo(s*0.08, -s*0.04);
      ctx.lineTo(s*0.08, s*0.10);
      ctx.lineTo(-s*0.08, s*0.10);
      ctx.lineTo(-s*0.08, -s*0.04);
      ctx.lineTo(-s*0.18, -s*0.04);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(-s*0.10, s*0.16, s*0.20, s*0.06);
      break;
    }
    case 'tab': {
      ctx.beginPath();
      ctx.moveTo(-s*0.22, 0); ctx.lineTo(s*0.10, 0);
      ctx.moveTo(s*0.00, -s*0.10); ctx.lineTo(s*0.10, 0); ctx.lineTo(s*0.00, s*0.10);
      ctx.stroke();
      ctx.fillRect(s*0.14, -s*0.14, s*0.04, s*0.28);
      break;
    }
    case 'return': {
      ctx.beginPath();
      ctx.moveTo(s*0.20, -s*0.14);
      ctx.lineTo(s*0.20, s*0.02);
      ctx.lineTo(-s*0.18, s*0.02);
      ctx.moveTo(-s*0.10, -s*0.06);
      ctx.lineTo(-s*0.18, s*0.02);
      ctx.lineTo(-s*0.10, s*0.10);
      ctx.stroke();
      break;
    }
    case 'backspace': {
      ctx.beginPath();
      ctx.moveTo(-s*0.26, 0);
      ctx.lineTo(-s*0.10, -s*0.16);
      ctx.lineTo(s*0.22, -s*0.16);
      ctx.lineTo(s*0.22, s*0.16);
      ctx.lineTo(-s*0.10, s*0.16);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s*0.02, -s*0.08); ctx.lineTo(s*0.14, s*0.08);
      ctx.moveTo(s*0.14, -s*0.08); ctx.lineTo(-s*0.02, s*0.08);
      ctx.stroke();
      break;
    }
    case 'arrUp':    drawTri(ctx, 0, 0, s*0.20, false, 'up'); break;
    case 'arrDown':  drawTri(ctx, 0, 0, s*0.20, false, 'down'); break;
    case 'arrLeft':  drawTri(ctx, 0, 0, s*0.20, false, 'left'); break;
    case 'arrRight': drawTri(ctx, 0, 0, s*0.20, false, 'right'); break;
    default: break;
  }
  ctx.restore();
}

function drawTri(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, size: number,
  pointLeft: boolean, dir: 'up' | 'down' | 'left' | 'right' = 'right'
) {
  ctx.beginPath();
  if (pointLeft || dir === 'left') {
    ctx.moveTo(cx - size/2, cy);
    ctx.lineTo(cx + size/2, cy - size/2);
    ctx.lineTo(cx + size/2, cy + size/2);
  } else if (dir === 'up') {
    ctx.moveTo(cx, cy - size/2);
    ctx.lineTo(cx + size/2, cy + size/2);
    ctx.lineTo(cx - size/2, cy + size/2);
  } else if (dir === 'down') {
    ctx.moveTo(cx, cy + size/2);
    ctx.lineTo(cx + size/2, cy - size/2);
    ctx.lineTo(cx - size/2, cy - size/2);
  } else {
    ctx.moveTo(cx + size/2, cy);
    ctx.lineTo(cx - size/2, cy - size/2);
    ctx.lineTo(cx - size/2, cy + size/2);
  }
  ctx.closePath();
  ctx.fill();
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function createSpeakerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 896;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#8C8D91';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dotR = 2.6;
  const spacing = 8;
  ctx.fillStyle = '#1a1a1d';
  for (let row = 0; row * spacing < canvas.height + spacing; row++) {
    const offset = (row % 2) * (spacing / 2);
    for (let col = 0; col * spacing + offset < canvas.width + spacing; col++) {
      const x = col * spacing + offset + spacing / 2;
      const y = row * spacing + spacing / 2;
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function buildKeyboardLabels(specs: KeySpec[]): THREE.Mesh {
  const PLANE_W = 2.9;
  const PLANE_D = 1.55;
  const PLANE_CENTER_Z = -0.22;

  const PX_PER_UNIT = 480;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(PLANE_W * PX_PER_UNIT);
  canvas.height = Math.round(PLANE_D * PX_PER_UNIT);
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  specs.forEach(spec => {
    const cx = (spec.x + PLANE_W / 2) / PLANE_W * canvas.width;
    const cy = (spec.z - (PLANE_CENTER_Z - PLANE_D / 2)) / PLANE_D * canvas.height;
    const keyPxW = spec.w * PX_PER_UNIT;
    const keyPxH = spec.d * PX_PER_UNIT;

    ctx.save();
    ctx.translate(cx, cy);

    if (spec.icon) {
      const iconSize = Math.min(keyPxW, keyPxH) * (spec.small ? 0.7 : 0.55);
      const yOffset = spec.label ? keyPxH * 0.18 : 0;
      ctx.save();
      ctx.translate(0, yOffset);
      drawIcon(ctx, spec.icon, iconSize);
      ctx.restore();
    }

    if (spec.label) {
      const isSmall = !!spec.small;
      let fontSize = isSmall
        ? Math.min(keyPxH * 0.42, 22)
        : Math.min(keyPxH * 0.36, 32);
      const fontStr = (sz: number) =>
        `500 ${sz}px -apple-system, "SF Pro Display", "Helvetica Neue", sans-serif`;
      ctx.font = fontStr(fontSize);
      const maxW = keyPxW * 0.82;
      const measured = ctx.measureText(spec.label).width;
      if (measured > maxW) {
        fontSize = Math.max(8, fontSize * (maxW / measured));
        ctx.font = fontStr(fontSize);
      }
      const yPos = spec.icon ? -keyPxH * 0.22 : (spec.topLabel ? keyPxH * 0.16 : 0);
      ctx.fillStyle = 'rgba(232, 232, 238, 0.95)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(spec.label, 0, yPos);
    }

    if (spec.topLabel) {
      const fontSize = Math.min(keyPxH * 0.28, 22);
      ctx.font = `500 ${fontSize}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(220, 220, 230, 0.85)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(spec.topLabel, 0, -keyPxH * 0.24);
    }

    ctx.restore();
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_D), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0.066, PLANE_CENTER_Z);
  plane.renderOrder = 2;
  return plane;
}

export default function MacBook() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    mount.style.position = 'relative';

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    mount.appendChild(renderer.domElement);

    // CSS3D renderer for the React-rendered screen content
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(W, H);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.left = '0';
    cssRenderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(cssRenderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();

    // Gradient backdrop texture
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 1024; bgCanvas.height = 1024;
    const bgCtx = bgCanvas.getContext('2d')!;
    const bgGrad = bgCtx.createRadialGradient(512, 580, 80, 512, 580, 720);
    bgGrad.addColorStop(0, '#1A4D6E');
    bgGrad.addColorStop(0.35, '#0E2A44');
    bgGrad.addColorStop(0.7, '#08111E');
    bgGrad.addColorStop(1, '#03060B');
    bgCtx.fillStyle = bgGrad;
    bgCtx.fillRect(0, 0, 1024, 1024);

    // Neon teal stripe near horizon
    const stripe = bgCtx.createLinearGradient(0, 540, 0, 620);
    stripe.addColorStop(0, 'rgba(0,0,0,0)');
    stripe.addColorStop(0.5, 'rgba(40, 220, 200, 0.18)');
    stripe.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = stripe;
    bgCtx.fillRect(0, 540, 1024, 80);

    // Soft amber blob right
    const amber = bgCtx.createRadialGradient(820, 720, 20, 820, 720, 260);
    amber.addColorStop(0, 'rgba(255, 140, 60, 0.35)');
    amber.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = amber;
    bgCtx.fillRect(0, 0, 1024, 1024);

    // Soft cyan blob left
    const cyanBlob = bgCtx.createRadialGradient(180, 700, 20, 180, 700, 280);
    cyanBlob.addColorStop(0, 'rgba(60, 200, 255, 0.4)');
    cyanBlob.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = cyanBlob;
    bgCtx.fillRect(0, 0, 1024, 1024);

    const bgTex = new THREE.CanvasTexture(bgCanvas);
    bgTex.colorSpace = THREE.SRGBColorSpace;
    void bgTex;

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 4.4);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 0.6, 0);
    controls.maxPolarAngle = Math.PI * 0.75;
    if (isMobile) {
      controls.enabled = false;
    }
    controls.update();

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.55));

    const keyLight = new THREE.DirectionalLight(0xFFF1D6, 3.2);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Soft neutral fill from front
    const skyFill = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    skyFill.position.set(-2, 4, 6);
    scene.add(skyFill);

    // --- Materials ---
    const silverMat = new THREE.MeshStandardMaterial({
      color: '#8C8D91',
      roughness: 0.42,
      metalness: 0.55,
      envMapIntensity: 0.9,
    });

    const spaceGrayMat = new THREE.MeshStandardMaterial({
      color: '#2E2E32',
      roughness: 0.6,
      metalness: 0.2,
    });

    const bezelMat = new THREE.MeshBasicMaterial({
      color: '#000000',
    });

    const keyMat = new THREE.MeshStandardMaterial({
      color: '#252528',
      roughness: 0.55,
      metalness: 0.08,
    });

    const trackpadMat = new THREE.MeshStandardMaterial({
      color: '#6E6F73',
      roughness: 0.35,
      metalness: 0.45,
    });

    const bottomMat = new THREE.MeshStandardMaterial({
      color: '#111114',
      roughness: 0.5,
      metalness: 0.1,
    });

    // --- MacBook Group ---
    const macbookGroup = new THREE.Group();
    scene.add(macbookGroup);

    // === BASE ===
    const BASE_W = 3.2, BASE_H = 0.075, BASE_D = 2.05;
    const baseMesh = new THREE.Mesh(new RoundedBoxGeometry(BASE_W, BASE_H, BASE_D, 6, 0.06), silverMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    macbookGroup.add(baseMesh);

    // Base bottom plate (rubber-ish)
    const botPlate = new THREE.Mesh(
      new RoundedBoxGeometry(BASE_W - 0.08, 0.008, BASE_D - 0.08, 4, 0.04),
      bottomMat
    );
    botPlate.position.y = -BASE_H / 2 - 0.001;
    macbookGroup.add(botPlate);

    // Rubber feet (kept within base footprint, hidden underneath)
    [[-1.25, -0.85], [1.25, -0.85], [-1.25, 0.85], [1.25, 0.85]].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.008, 16),
        new THREE.MeshStandardMaterial({ color: '#0a0a0c', roughness: 0.9, metalness: 0 })
      );
      foot.position.set(fx, -BASE_H / 2 - 0.005, fz);
      macbookGroup.add(foot);
    });

    // Keyboard deck (dark inset hugging the keys)
    const DECK_W = 2.50, DECK_D = 1.00, DECK_Z = -0.235;
    const deckMesh = new THREE.Mesh(
      new RoundedBoxGeometry(DECK_W, 0.012, DECK_D, 4, 0.05),
      spaceGrayMat
    );
    deckMesh.position.set(0, BASE_H / 2 + 0.001, DECK_Z);
    macbookGroup.add(deckMesh);

    // Speaker grilles flanking the keyboard — unibody color with dark perforation pattern
    const speakerTex = createSpeakerTexture();
    const speakerMat = new THREE.MeshStandardMaterial({
      map: speakerTex,
      roughness: 0.55,
      metalness: 0.4,
    });
    const SPK_W = 0.24, SPK_D = 1.02;
    const SPK_X = DECK_W / 2 + SPK_W / 2 + 0.02;
    [-SPK_X, SPK_X].forEach(sx => {
      const speaker = new THREE.Mesh(
        new THREE.PlaneGeometry(SPK_W, SPK_D),
        speakerMat.clone()
      );
      speaker.rotation.x = -Math.PI / 2;
      speaker.position.set(sx, BASE_H / 2 + 0.0015, DECK_Z);
      macbookGroup.add(speaker);
    });

    // Build keys
    const keySpecs = buildKeyboard(macbookGroup, keyMat);
    macbookGroup.add(buildKeyboardLabels(keySpecs));

    // Trackpad (wide, MacBook Pro 16" proportions)
    const TP_W = 1.55, TP_D = 0.62;
    const TP_Z = 0.65;
    const trackpad = new THREE.Mesh(
      new RoundedBoxGeometry(TP_W, 0.005, TP_D, 4, 0.04),
      trackpadMat
    );
    trackpad.position.set(0, BASE_H / 2 + 0.003, TP_Z);
    macbookGroup.add(trackpad);


    // === LID GROUP (hinge at back edge, y = BASE_H/2) ===
    const LID_W = 3.2, LID_H = 0.042, LID_D = 2.05;
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, BASE_H / 2, -BASE_D / 2);
    macbookGroup.add(lidGroup);

    // Lid outer shell
    const lidMesh = new THREE.Mesh(new RoundedBoxGeometry(LID_W, LID_H, LID_D, 6, 0.05), silverMat);
    lidMesh.position.set(0, 0, LID_D / 2);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Glowing Apple logo on lid back
    const appleCanvas = document.createElement('canvas');
    appleCanvas.width = 512;
    appleCanvas.height = 512;
    const aCtx = appleCanvas.getContext('2d')!;
    aCtx.clearRect(0, 0, 512, 512);
    aCtx.translate(256, 256);
    aCtx.scale(1, 1);
    aCtx.fillStyle = '#ffffff';
    // Apple body (two overlapping rounded shapes with a bite)
    aCtx.beginPath();
    // Left lobe
    aCtx.moveTo(-10, -110);
    aCtx.bezierCurveTo(-80, -120, -150, -70, -150, 0);
    aCtx.bezierCurveTo(-150, 80, -100, 170, -50, 170);
    aCtx.bezierCurveTo(-20, 170, -10, 155, 0, 155);
    aCtx.bezierCurveTo(10, 155, 20, 170, 50, 170);
    aCtx.bezierCurveTo(100, 170, 150, 80, 150, 0);
    aCtx.bezierCurveTo(150, -70, 80, -120, 10, -110);
    aCtx.bezierCurveTo(40, -130, 70, -160, 60, -200);
    aCtx.bezierCurveTo(20, -195, -10, -160, -10, -110);
    aCtx.closePath();
    aCtx.fill();
    // Bite (cut out with composite)
    aCtx.globalCompositeOperation = 'destination-out';
    aCtx.beginPath();
    aCtx.arc(170, -40, 60, 0, Math.PI * 2);
    aCtx.fill();
    aCtx.globalCompositeOperation = 'source-over';
    // Leaf
    aCtx.beginPath();
    aCtx.ellipse(35, -185, 30, 14, -Math.PI / 4, 0, Math.PI * 2);
    aCtx.fill();
    aCtx.setTransform(1, 0, 0, 1, 0, 0);

    const appleTex = new THREE.CanvasTexture(appleCanvas);
    appleTex.colorSpace = THREE.SRGBColorSpace;
    appleTex.anisotropy = 8;

    const appleMat = new THREE.MeshStandardMaterial({
      alphaMap: appleTex,
      transparent: true,
      depthWrite: false,
      color: '#36363A',
      roughness: 0.22,
      metalness: 0.9,
    });
    const appleSize = 0.55;
    const appleMesh = new THREE.Mesh(new THREE.PlaneGeometry(appleSize, appleSize), appleMat);
    appleMesh.rotation.x = -Math.PI / 2;
    appleMesh.rotation.z = Math.PI;
    appleMesh.position.set(0, LID_H / 2 + 0.0015, LID_D / 2);
    lidGroup.add(appleMesh);

    // Lid inner face (dark bezel) — covers almost the entire inner face for a thin uniform border
    const bezelMesh = new THREE.Mesh(
      new RoundedBoxGeometry(LID_W - 0.02, LID_H * 0.3, LID_D - 0.02, 4, 0.04),
      bezelMat
    );
    bezelMesh.position.set(0, -LID_H / 2 - 0.003, LID_D / 2);
    lidGroup.add(bezelMesh);

    // Screen — React component rendered via CSS3DRenderer (uniform thin black border)
    const SCREEN_W = 3.14, SCREEN_D = 1.96;

    // Faint emissive backing so the screen contributes to scene lighting/glow
    const screenBacking = new THREE.Mesh(
      new THREE.PlaneGeometry(SCREEN_W, SCREEN_D),
      new THREE.MeshBasicMaterial({ color: '#0F2140' })
    );
    screenBacking.rotation.x = Math.PI / 2;
    screenBacking.position.set(0, -LID_H / 2 - 0.011, LID_D / 2);
    lidGroup.add(screenBacking);

    // React-rendered screen
    const screenDiv = document.createElement('div');
    screenDiv.style.width = `${SCREEN_PX_W}px`;
    screenDiv.style.height = `${SCREEN_PX_H}px`;
    screenDiv.style.backfaceVisibility = 'hidden';
    (screenDiv.style as CSSStyleDeclaration & { webkitBackfaceVisibility?: string }).webkitBackfaceVisibility = 'hidden';
    const screenRoot: Root = createRoot(screenDiv);
    screenRoot.render(<MacScreen />);

    const screenObject = new CSS3DObject(screenDiv);
    const screenScaleX = SCREEN_W / SCREEN_PX_W;
    const screenScaleY = SCREEN_D / SCREEN_PX_H;
    screenObject.scale.set(screenScaleX, screenScaleY, screenScaleX);
    screenObject.rotation.x = Math.PI / 2;
    screenObject.position.set(0, -LID_H / 2 - 0.013, LID_D / 2);
    lidGroup.add(screenObject);

    // Notch and camera live inside MacScreen (rendered via CSS3D so they layer above the screen content)

    // Hinge cylinders
    [-0.5, 0, 0.5].forEach(hx => {
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.12, 16),
        spaceGrayMat
      );
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(hx, 0, 0);
      lidGroup.add(hinge);
    });

    // No floor plane — the colorful animated background shines through behind and below the laptop.

// --- Animation ---
    const TARGET_LID_ANGLE = -Math.PI * 0.62;
    let lidAngle = 0;
    const startTime = performance.now();
    let rafId: number;

    const screenWorldPos = new THREE.Vector3();
    const screenWorldNormal = new THREE.Vector3();
    const camToScreen = new THREE.Vector3();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Lid opens over first ~2.5s with ease
      const openProgress = Math.min(1, t / 2.5);
      const eased = 1 - Math.pow(1 - openProgress, 3);
      lidAngle = TARGET_LID_ANGLE * eased;
      lidGroup.rotation.x = lidAngle;

      // Gentle y-axis sway after open (disabled on mobile)
      if (t > 1 && !isMobile) {
        macbookGroup.rotation.y = Math.sin(t * 0.25) * 0.35;
      }

      controls.update();

      // Hide the CSS3D screen when the camera is behind/below the lid (CSS3D can't be occluded by WebGL meshes).
      screenObject.getWorldPosition(screenWorldPos);
      screenObject.getWorldDirection(screenWorldNormal);
      camToScreen.copy(camera.position).sub(screenWorldPos).normalize();
      const facing = screenWorldNormal.dot(camToScreen);
      screenDiv.style.visibility = facing > 0.05 ? 'visible' : 'hidden';

      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      cssRenderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      queueMicrotask(() => screenRoot.unmount());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      mount.removeChild(cssRenderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none lg:pointer-events-auto"
      style={{ cursor: 'grab' }}
    />
  );
}
