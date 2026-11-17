'use client';

/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from 'react';
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Plus,
  X,
  Minus,
  Square,
  MoreVertical,
  Star,
  ArrowUpRight,
} from 'lucide-react';

export const SCREEN_PX_W = 1280;
export const SCREEN_PX_H = 800;

const VercelIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2L24 22H0z" />
  </svg>
);

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: string;
  iconBg: string;
  iconFg: string;
  iconNode: ReactNode;
  url: string;
};

const experiences: Experience[] = [
  {
    company: 'Vercel',
    role: 'AI Software Engineer',
    period: '2025 — Present',
    location: 'Remote',
    summary:
      'Building the AI layer on top of the world’s fastest frontend cloud.',
    highlights: [
      'Shipped the AI SDK v5 release',
      'Tooling for multi-step agents & streaming UIs',
    ],
    stack: ['TypeScript', 'AI SDK', 'Next.js', 'Edge'],
    accent: '#ffffff',
    iconBg: '#000',
    iconFg: '#fff',
    iconNode: <VercelIcon size={18} />,
    url: 'https://vercel.com',
  },
  {
    company: 'bolt.new',
    role: 'Senior Software Engineer',
    period: '2022 — 2025',
    location: 'StackBlitz',
    summary:
      'Took an idea and helped scale it into one of the fastest-growing AI products of the year.',
    highlights: [
      'Grew ARR from $600K → $40M+ in 5 months',
      'Built prompt-to-app pipeline on WebContainers',
    ],
    stack: ['WebContainers', 'React', 'Node.js', 'LLMs'],
    accent: '#f5c542',
    iconBg: '#0B0B0B',
    iconFg: '#f5c542',
    iconNode: (
      <img src="/bolt.svg" alt="bolt.new" style={{ width: 42, height: 42 }} />
    ),
    url: 'https://bolt.new',
  },
  {
    company: 'gqty',
    role: 'Founder',
    period: '2019 — 2022',
    location: 'Open Source',
    summary:
      'A no-query GraphQL client that feels like plain JavaScript.',
    highlights: [
      'Pioneered a proxy-based GraphQL fetching model'
    ],
    stack: ['GraphQL', 'React', 'Proxies', 'Codegen'],
    accent: '#e535ab',
    iconBg: '#0B0B0B',
    iconFg: '#e535ab',
    iconNode: (
      <img src="/gqty.ico" alt="gqty" style={{ width: 28, height: 28 }} />
    ),
    url: 'https://gqty.dev',
  },
  {
    company: 'StackBlitz',
    role: 'Founding Engineer',
    period: '2018 — 2020',
    location: 'San Francisco',
    summary:
      'Built a Node.js runtime that runs entirely inside the browser.',
    highlights: [
      'Patented in-browser TCP over service workers',
      'Laid the groundwork for WebContainers',
    ],
    stack: ['Node.js', 'Service Workers', 'Systems', 'Rust'],
    accent: '#1389fd',
    iconBg: '#0B0B0B',
    iconFg: '#1389fd',
    iconNode: (
      <img
        src="/stackblitz.svg"
        alt="StackBlitz"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    ),
    url: 'https://stackblitz.com',
  },
  {
    company: 'WidgetBot.io',
    role: 'Founder',
    period: '2016 — 2019',
    location: 'Bootstrapped',
    summary:
      'Pixel-perfect Discord chat embedded on any website.',
    highlights: [
      'Reverse-engineered Discord’s private API',
      'Used by thousands of communities',
    ],
    stack: ['React', 'WebSockets', 'Reverse eng.'],
    accent: '#d97757',
    iconBg: '#0B0B0B',
    iconFg: '#d97757',
    iconNode: (
      <img src="/widgetbot.svg" alt="WidgetBot" style={{ width: 28, height: 28 }} />
    ),
    url: 'https://widgetbot.io',
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '24px 26px',
        borderRadius: 16,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}
    >
      {/* Accent strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 3,
          background: exp.accent,
          opacity: 0.85,
        }}
      />

      {/* Subtle corner glow */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 200,
          height: 200,
          background: exp.accent,
          opacity: 0.08,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: 12,
            background: exp.iconBg,
            color: exp.iconFg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {exp.iconNode}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#F5F5F5',
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {exp.company}
            </h3>
            <ArrowUpRight size={14} color="rgba(255,255,255,0.35)" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 6,
              fontSize: 13,
              color: 'rgba(245,245,245,0.55)',
            }}
          >
            <span>{exp.role}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span>{exp.location}</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'rgba(245,245,245,0.5)',
            whiteSpace: 'nowrap',
            paddingTop: 4,
          }}
        >
          {exp.period}
        </div>
      </div>

      {/* Summary */}
      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.55,
          color: 'rgba(245,245,245,0.82)',
        }}
      >
        {exp.summary}
      </p>

      {/* Highlights */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {exp.highlights.map((h, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: 'rgba(245,245,245,0.62)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: exp.accent,
                marginTop: 8,
              }}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {exp.stack.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 10.5,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              letterSpacing: '0.06em',
              color: 'rgba(245,245,245,0.55)',
              padding: '3px 8px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Index */}
      <span
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          fontSize: 10,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.18)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  );
}

export default function MacScreen() {
  const time = '12:34 PM';
  const date = 'Mon Apr 25';

  return (
    <div
      style={{
        width: SCREEN_PX_W,
        height: SCREEN_PX_H,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
        color: '#E8ECF4',
        background: '#000',
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 220,
          height: 34,
          background: '#000',
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#1a1a1d',
            boxShadow: 'inset 0 0 2px rgba(255,255,255,0.15)',
          }}
        />
      </div>

      {/* Menu bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 28,
          background: 'rgba(15, 15, 15, 0.85)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          fontSize: 13,
          color: 'rgba(235,238,245,0.95)',
          gap: 18,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          zIndex: 25,
        }}
      >
        <span style={{ fontWeight: 700 }}>&#63743;</span>
        <span style={{ fontWeight: 600 }}>Chrome</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>History</span>
        <span>Bookmarks</span>
        <span>Window</span>
        <span>Help</span>
        <div style={{ flex: 1 }} />
        <span style={{ opacity: 0.85 }}>{date}</span>
        <span style={{ opacity: 0.85 }}>{time}</span>
      </div>

      {/* Chrome window */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            background: '#202020',
            paddingTop: 8,
            paddingLeft: 12,
            gap: 2,
            height: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#2f2f2f',
              padding: '8px 14px',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              minWidth: 220,
              maxWidth: 240,
              fontSize: 12,
              color: '#E5E5E5',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: '#171717',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97757',
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              S
            </div>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sam Denty — Experience
            </span>
            <X size={12} color="#A3A3A3" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              minWidth: 180,
              fontSize: 12,
              color: '#A3A3A3',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 3, background: '#262626' }} />
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              GitHub
            </span>
          </div>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              padding: 8,
              color: '#A3A3A3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Plus size={14} />
          </button>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 8, paddingBottom: 6 }}>
            <button style={{ background: 'transparent', border: 'none', padding: 6, color: '#A3A3A3' }}>
              <Minus size={14} />
            </button>
            <button style={{ background: 'transparent', border: 'none', padding: 6, color: '#A3A3A3' }}>
              <Square size={12} />
            </button>
            <button style={{ background: 'transparent', border: 'none', padding: 6, color: '#A3A3A3' }}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Address bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#2f2f2f',
            padding: '8px 14px',
            height: 44,
          }}
        >
          <button style={{ background: 'transparent', border: 'none', padding: 4, color: '#A3A3A3' }}>
            <ChevronLeft size={18} />
          </button>
          <button style={{ background: 'transparent', border: 'none', padding: 4, color: '#A3A3A3' }}>
            <ChevronRight size={18} />
          </button>
          <button style={{ background: 'transparent', border: 'none', padding: 4, color: '#A3A3A3' }}>
            <RotateCw size={16} />
          </button>

          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#3a3a3a',
              borderRadius: 9999,
              padding: '6px 14px',
              fontSize: 12,
              color: '#D4D4D4',
              marginLeft: 6,
            }}
          >
            <Lock size={12} color="#A3A3A3" />
            <span style={{ color: '#A3A3A3' }}>samdenty.io/work</span>
            <div style={{ flex: 1 }} />
            <Star size={14} color="#A3A3A3" />
          </div>

          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              background: '#d97757',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              marginLeft: 6,
            }}
          >
            S
          </div>
          <button style={{ background: 'transparent', border: 'none', padding: 4, color: '#A3A3A3' }}>
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Page content */}
        <div
          style={{
            flex: 1,
            background:
              'radial-gradient(ellipse at top, rgba(217,119,87,0.06) 0%, transparent 55%), #070707',
            color: '#F5F5F5',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            padding: '36px 32px',
          }}
        >
          <div style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Page header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 11,
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    color: 'rgba(217,119,87,0.85)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 18,
                      height: 1,
                      background: '#d97757',
                    }}
                  />
                  Chapter 01 — Work
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: 'Fraunces, Georgia, serif',
                    fontWeight: 300,
                    fontSize: 44,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: '#fafaf9',
                  }}
                >
                  A decade of{' '}
                  <span style={{ fontStyle: 'italic', color: '#d97757' }}>building</span>.
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: 'rgba(245,245,245,0.55)',
                    maxWidth: 620,
                    lineHeight: 1.55,
                  }}
                >
                  From reverse-engineering Discord at 14 to shipping AI tooling used by
                  millions. Here&apos;s the trail.
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 18,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>Years</span>
                  <span style={{ fontSize: 22, color: '#fafaf9', letterSpacing: '-0.02em' }}>10+</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>Companies</span>
                  <span style={{ fontSize: 22, color: '#fafaf9', letterSpacing: '-0.02em' }}>05</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>Shipped</span>
                  <span style={{ fontSize: 22, color: '#fafaf9', letterSpacing: '-0.02em' }}>∞</span>
                </div>
              </div>
            </div>

            {/* Grid of experiences */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gridAutoRows: '1fr',
                gap: 14,
              }}
            >
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
