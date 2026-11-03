'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { APPLICATIONS } from '@/data/apps';
import { AppCard } from '@/components/AppCard';
import {
  Star,
  Trash2,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, clearFavorites, getAppById } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const favoriteApps = favorites
    .map((id) => getAppById(id))
    .filter(Boolean) as typeof APPLICATIONS;

  const filteredFavorites = favoriteApps.filter((app) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.categoryLabel.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q)
    );
  });

  const handleClear = () => {
    if (confirm('Are you sure you want to remove all applications from your favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Star size={13} fill="currentColor" />
            <span>Personal Bookmarks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Favourite Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your customized personal collection of digital launch targets
          </p>
        </div>

        {/* Action controls */}
        {favoriteApps.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
            >
              <Trash2 size={13} />
              <span>Clear All</span>
            </button>

            <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {favoriteApps.length > 0 ? (
        <div className="space-y-6">
          {/* Search within favorites */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your favorites..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-amber-400 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Apps Cards */}
          {filteredFavorites.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                  : 'space-y-3'
              }
            >
              {filteredFavorites.map((app) => (
                <AppCard key={app.id} app={app} layout={viewMode} />
              ))}
            </div>
          ) : (
            <div className="py-12 rounded-2xl glass-panel text-center border border-white/5">
              <p className="text-sm text-slate-300">No matching favorites found</p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 rounded-3xl glass-panel text-center border border-white/5 px-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-950/40">
            <Star size={32} />
          </div>
          <h2 className="text-lg font-bold text-white">No Favorite Apps Yet</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Personalize your dashboard by starring the applications you use most often. They'll
            appear here and on your home dashboard for 1-click access.
          </p>
          <Link
            href="/apps"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-950/50"
          >
            <span>Explore All Applications</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

