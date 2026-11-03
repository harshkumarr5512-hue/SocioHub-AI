'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { APPLICATIONS, CATEGORIES } from '@/data/apps';
import { AppCard } from '@/components/AppCard';
import { AppIcon } from '@/components/AppIcon';
import {
  Search,
  Bot,
  Sparkles,
  ArrowRight,
  Star,
  History,
  Grid,
  Zap,
  ShieldCheck,
  TrendingUp,
  Compass,
  Layers,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const {
    favorites,
    recentApps,
    getAppById,
    setIsCommandPaletteOpen,
    openApp,
    settings,
  } = useApp();

  const [aiQuickPrompt, setAiQuickPrompt] = useState('');

  // Favorite apps objects
  const favoriteAppsList = favorites
    .map((id) => getAppById(id))
    .filter(Boolean) as typeof APPLICATIONS;

  // Recently opened apps objects
  const recentAppsList = recentApps
    .map((item) => ({
      app: getAppById(item.id),
      openedAt: item.openedAt,
    }))
    .filter((item) => item.app !== undefined)
    .slice(0, 6);

  // Popular apps
  const popularAppsList = APPLICATIONS.filter((app) => app.popular).slice(0, 8);

  const handleAiQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuickPrompt.trim()) return;
    router.push(`/assistant?prompt=${encodeURIComponent(aiQuickPrompt.trim())}`);
  };

  // Format relative time
  const formatTimeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 1. Hero / Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 glass-panel border border-violet-500/20 bg-gradient-to-br from-slate-900/90 via-violet-950/40 to-slate-900/90 shadow-2xl shadow-purple-950/40">
        {/* Futuristic glowing backdrop lines */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Sparkles size={12} className="animate-pulse" />
            <span>SOCIOHUB AI Control Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500">
              Your Digital World
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Your single unified launchpad for social media, communication, productivity,
            development environments, and next-generation AI intelligence.
          </p>

          {/* Quick AI Assistant Ask Bar */}
          <form
            onSubmit={handleAiQuickSubmit}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl"
          >
            <div className="relative flex-1">
              <Bot className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
              <input
                type="text"
                value={aiQuickPrompt}
                onChange={(e) => setAiQuickPrompt(e.target.value)}
                placeholder="Ask SOCIOHUB AI to write code, draft an email, or brainstorm ideas..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-900/40 hover:scale-[1.02]"
            >
              <span>Ask AI</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Stat Highlights */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Grid size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">28+</div>
                <div className="text-[11px] text-slate-400">Curated Apps</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Layers size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">6</div>
                <div className="text-[11px] text-slate-400">Active Hubs</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Star size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{favorites.length}</div>
                <div className="text-[11px] text-slate-400">Favorite Apps</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-300">100%</div>
                <div className="text-[11px] text-slate-400">Safe Links</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Favourite Apps Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Star size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Favourite Apps
              </h2>
              <p className="text-xs text-slate-400">
                Quick access to your hand-picked everyday drivers
              </p>
            </div>
          </div>

          <Link
            href="/favorites"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All ({favorites.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {favoriteAppsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteAppsList.slice(0, 8).map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl glass-panel p-8 text-center border border-white/5">
            <Star className="mx-auto text-slate-600 mb-2" size={32} />
            <p className="text-sm font-semibold text-slate-300">No favorites pinned yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Click the star icon on any application to add it here.
            </p>
            <Link
              href="/apps"
              className="mt-3 inline-block px-4 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30"
            >
              Browse Applications
            </Link>
          </div>
        )}
      </section>

      {/* 3. Recently Opened Apps Section */}
      {recentAppsList.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <History size={18} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Recently Opened
                </h2>
                <p className="text-xs text-slate-400">
                  Pick up right where you left off
                </p>
              </div>
            </div>

            <Link
              href="/recent"
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View History</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {recentAppsList.map(({ app, openedAt }) => {
              if (!app) return null;
              return (
                <div
                  key={app.id}
                  onClick={() => openApp(app)}
                  className="group relative p-3 rounded-2xl glass-panel-interactive border border-white/5 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer flex flex-col items-center text-center transition-all duration-200"
                >
                  <div className="p-2 rounded-xl bg-slate-950 border border-white/10 group-hover:scale-110 transition-transform mb-2">
                    <AppIcon id={app.id} size={28} />
                  </div>
                  <span className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300 truncate w-full">
                    {app.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {formatTimeAgo(openedAt)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Application Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Compass size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Application Categories
              </h2>
              <p className="text-xs text-slate-400">
                Explore specialized digital suites and workspaces
              </p>
            </div>
          </div>

          <Link
            href="/apps"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>All Apps Launcher</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const catApps = APPLICATIONS.filter((a) => a.category === cat.id);
            return (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className="group p-5 rounded-2xl glass-panel-interactive border border-white/5 bg-slate-900/60 hover:bg-slate-900/90 transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity pointer-events-none`}
                />

                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                    <Grid size={22} className="text-cyan-400 group-hover:text-cyan-300" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {catApps.length} Apps
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>

                {/* Micro app preview icons */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center -space-x-1.5">
                    {catApps.slice(0, 5).map((a) => (
                      <div
                        key={a.id}
                        className="w-6 h-6 rounded-lg bg-slate-950 border border-white/10 p-0.5 flex items-center justify-center"
                      >
                        <AppIcon id={a.id} size={16} />
                      </div>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Popular Apps Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Popular Applications
              </h2>
              <p className="text-xs text-slate-400">
                Trending platforms frequently launched by members worldwide
              </p>
            </div>
          </div>

          <Link
            href="/apps"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularAppsList.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* 6. AI Assistant Promotion Banner */}
      <section className="rounded-3xl p-6 sm:p-8 glass-panel border border-cyan-500/30 bg-gradient-to-r from-violet-950/60 via-slate-900 to-cyan-950/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/30 flex-shrink-0">
            <Bot size={28} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono mb-2">
              <Sparkles size={10} />
              <span>SOCIOHUB NEURAL AGENT</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Accelerate Your Workflow with Built-in AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Write code snippets, generate social media hooks, solve complex problems, and draft
              emails without ever leaving SOCIOHUB AI.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
          <Link
            href="/assistant"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40 transition-all hover:scale-[1.02]"
          >
            <Bot size={15} />
            <span>Launch AI Assistant</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

