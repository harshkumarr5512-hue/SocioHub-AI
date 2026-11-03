import React from 'react';
import Link from 'next/link';
import { SocioHubLogo } from '@/components/SocioHubLogo';
import {
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  Layers,
  Cpu,
  Lock,
  ExternalLink,
  Command,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About SOCIOHUB AI - Your Digital World, Connected in One Place',
  description:
    'Learn about SOCIOHUB AI, our mission to unify your digital world, our security principles, and platform architecture.',
};

export default function AboutPage() {
  const securityPillars = [
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: 'Verified Official Endpoints',
      description:
        'All application launchers direct users exclusively to verified, official platform URLs (e.g. instagram.com, github.com, chatgpt.com) using secure browser sandboxing.',
    },
    {
      icon: <Lock className="text-cyan-400" size={24} />,
      title: 'Zero Third-Party Password Collection',
      description:
        'SOCIOHUB AI never asks for, intercepts, or stores your external passwords or credentials. You authenticate directly on the respective official provider websites.',
    },
    {
      icon: <Cpu className="text-violet-400" size={24} />,
      title: 'Protected Server-side AI Routes',
      description:
        'AI interactions are routed through secure server-side API endpoints, shielding API keys from client inspection and supporting graceful offline intelligence.',
    },
  ];

  const features = [
    'Unified 28+ App Directory spanning Social, Comms, Entertainment, Dev & AI',
    'Interactive SOCIOHUB AI Assistant handling coding, writing, and problem solving',
    'Global Command Palette with instant keyboard navigation (Ctrl + K)',
    'Persistent Starred Favorites and chronological Recently Opened tracker',
    'Responsive futuristic glassmorphic UI optimized for phones, tablets & desktops',
    'Offline Intelligent Engine fallback with domain-specific synthesis',
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-fade-in">
      {/* Brand Hero */}
      <section className="text-center py-8 space-y-4">
        <div className="inline-block">
          <SocioHubLogo size="xl" showTagline={false} clickable={false} />
        </div>
        <p className="text-base sm:text-lg font-medium text-cyan-300 tracking-wide">
          "Your Digital World, Connected in One Place."
        </p>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
          SOCIOHUB AI is engineered to eliminate the chaos of 50 fragmented browser tabs and
          disjointed workflows. By synthesizing curated platform access, smart search, and an
          integrated AI assistant, SOCIOHUB AI acts as your primary digital command center.
        </p>
      </section>

      {/* Feature Highlights Grid */}
      <section className="p-6 sm:p-8 rounded-3xl glass-panel border border-violet-500/20 bg-slate-900/60 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
            Core Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Built for Speed, Focus & Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/5"
            >
              <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-200 leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Integrity Principles */}
      <section className="space-y-6">
        <div className="text-left">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Privacy & Safety First
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Security & External Applications Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How SOCIOHUB AI protects your data, authentication boundaries, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {securityPillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className="p-5 rounded-2xl glass-panel border border-white/10 bg-slate-900/70 space-y-3"
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 w-fit">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-sm text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Keyboard Shortcuts Table */}
      <section className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2">
          <Command size={18} className="text-cyan-400" />
          <h2 className="text-base font-bold text-white">Keyboard Navigation & Shortcuts</h2>
        </div>

        <div className="divide-y divide-white/5 text-xs text-slate-300">
          <div className="py-2.5 flex items-center justify-between">
            <span>Open Global Command Search</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 font-mono border border-slate-700">
              Ctrl + K / Cmd + K
            </kbd>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span>Close Command Search / Modals</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
              Escape
            </kbd>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span>Send Message in AI Assistant</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
              Enter
            </kbd>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span>New line in AI Assistant</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
              Shift + Enter
            </kbd>
          </div>
        </div>
      </section>

      {/* Tech Stack Specs */}
      <section className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-white text-base">Modern Production Tech Stack</h3>
          <p className="text-xs text-slate-400 mt-1">
            Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons, and LocalStorage.
          </p>
        </div>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-violet-950/50 flex-shrink-0"
        >
          <span>Return to Dashboard</span>
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}

