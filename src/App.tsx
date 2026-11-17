'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';

const MacBook = dynamic(() => import('./components/MacBook'), { ssr: false });
const TubesBackground = dynamic(() => import('./components/TubesBackground'), {
  ssr: false,
});

const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const StrokeIcon = ({ size = 15, children }: { size?: number; children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <StrokeIcon size={size}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </StrokeIcon>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <StrokeIcon size={size}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </StrokeIcon>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <StrokeIcon size={size}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </StrokeIcon>
);

const TikTokIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12V9.01a6.27 6.27 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.76 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
  </svg>
);

type DockButtonProps = {
  href: string;
  children: React.ReactNode;
  label: string;
  index: number;
  mouseX: MotionValue<number | null>;
};

const BASE_SIZE = 38;
const MAX_SIZE = 58;
const INFLUENCE = 100;

function DockButton({ href, children, label, index, mouseX }: DockButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    if (val === null || !ref.current) return INFLUENCE * 2;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const sizeTransform = useTransform(
    distance,
    [-INFLUENCE, 0, INFLUENCE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE]
  );

  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 220, damping: 18 });
  const iconScale = useTransform(size, [BASE_SIZE, MAX_SIZE], [1, MAX_SIZE / BASE_SIZE]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: size,
        height: size,
        boxShadow:
          '0 10px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
      className="relative flex items-center justify-center rounded-full bg-[#141311]/80 backdrop-blur-sm text-stone-200 hover:text-white hover:bg-[#1f1d1a] transition-colors border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d97757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span style={{ scale: iconScale }} className="flex items-center justify-center">
        {children}
      </motion.span>
    </motion.a>
  );
}

const marqueeItems = [
  'TypeScript',
  'React',
  'Node.js',
  'WebContainers',
  'GraphQL',
  'Rust',
  'Three.js',
  'AI SDK',
  'Postgres',
  'Edge Functions',
];

function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function App() {
  const birthDate = new Date(2002, 10, 21);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  const mouseX = useMotionValue<number | null>(null);
  const typed = useTypewriter([
    'interfaces',
    'developer tools',
    'runtimes',
    'AI products',
  ]);

  const socials = [
    { href: 'https://x.com/samdenty', icon: <XIcon size={14} />, label: 'X' },
    { href: 'https://github.com/samdenty', icon: <GithubIcon size={15} />, label: 'GitHub' },
    { href: 'https://linkedin.com/in/samdenty', icon: <LinkedinIcon size={15} />, label: 'LinkedIn' },
    { href: 'https://instagram.com/sam.denty', icon: <InstagramIcon size={15} />, label: 'Instagram' },
    { href: 'https://www.tiktok.com/@sam.denty', icon: <TikTokIcon size={15} />, label: 'TikTok' },
    { href: 'mailto:samddenty@gmail.com', icon: <Mail size={15} />, label: 'Email' },
  ];

  return (
    <div className="relative w-full min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-[#0a0a0a] text-stone-100">
      <TubesBackground />

      {/* Top nav */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-10 pt-6 flex items-center justify-between pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="font-mono text-[11px] tracking-[0.22em] text-stone-400 uppercase">
          SD <span className="text-stone-600">/</span> Portfolio
        </div>
      </motion.div>

      {/* Left: content */}
      <header className="relative z-10 w-full lg:w-[46%] lg:max-w-[640px] lg:flex-shrink-0 max-w-3xl mx-auto lg:mx-0 px-6 sm:px-10 lg:pl-14 lg:pr-8 pt-24 lg:pt-28 pb-10 flex flex-col gap-8 lg:justify-center lg:h-screen lg:overflow-y-auto scroll-area">
        {/* Hero */}
        <div className="flex flex-col gap-6">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="https://github.com/samdenty.png"
              alt="Sam Denty"
              width={56}
              height={56}
              className="rounded-full object-cover ring-1 ring-white/10"
              style={{
                boxShadow: '0 14px 28px rgba(0,0,0,0.55), 0 0 0 4px rgba(217,119,87,0.08)',
              }}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 240, damping: 20 }}
            />
            <div className="flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone-500">
                Sam Denty
              </span>
              <div className="flex items-center gap-1.5 text-stone-400 text-[13px] mt-0.5">
                <MapPin size={12} strokeWidth={2} className="text-[#d97757]" />
                <span>Ireland</span>
                <span className="text-stone-700">·</span>
                <span>{age}</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="font-serif-display text-[44px] sm:text-[56px] lg:text-[64px] leading-[0.98] font-light text-stone-50"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            I build
            <br />
            <span className="italic text-[#d97757] cursor-blink">{typed || '\u00A0'}</span>
          </motion.h1>

          <motion.p
            className="max-w-lg text-[15px] leading-[1.65] text-stone-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Software engineer focused on runtimes, devtools and the seams between
            humans and machines.
          </motion.p>
        </div>

        {/* Strava */}
        <motion.section
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-500">
              Off the keyboard
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-stone-700 to-transparent" />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/5 bg-[#0f0e0c]">
            <iframe
              src="https://strava-widget.com/embed/98712875?theme=dark"
              frameBorder="0"
              className="w-full h-[200px]"
              title="Strava activity"
            />
          </div>
        </motion.section>

        {/* Tech marquee */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="marquee-track flex gap-8 whitespace-nowrap font-mono text-[11px] tracking-[0.18em] uppercase text-stone-600">
            {[...marqueeItems, ...marqueeItems].map((w, i) => (
              <span key={i} className="flex items-center gap-8">
                {w}
                <span className="text-[#d97757]">+</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex items-center justify-between gap-4 pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div
            className="flex items-center gap-3"
            style={{ minHeight: MAX_SIZE + 4 }}
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(null)}
          >
            {socials.map((s, i) => (
              <DockButton
                key={s.href}
                href={s.href}
                label={s.label}
                index={i}
                mouseX={mouseX}
              >
                {s.icon}
              </DockButton>
            ))}
          </div>
          <a
            href="mailto:samddenty@gmail.com"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-stone-400 hover:text-[#d97757] transition-colors"
          >
            Say hi
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </header>

      {/* Right: 3D MacBook */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-auto lg:flex-1 lg:min-h-0">
        <MacBook />
        <motion.div
          className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-stone-500 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <span className="h-px w-8 bg-stone-700" />
          Drag to orbit
        </motion.div>
      </div>
    </div>
  );
}
