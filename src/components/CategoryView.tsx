'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppCategory, APPLICATIONS, CATEGORIES } from '@/data/apps';
import { AppCard } from '@/components/AppCard';
import {
  ArrowLeft,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface CategoryViewProps {
  categoryId: AppCategory;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categoryId }) => {
  const categoryInfo = CATEGORIES.find((c) => c.id === categoryId) || {
    id: categoryId,
    label: 'Category',
    description: 'Explore applications in this category.',
    color: 'from-violet-500 to-cyan-500',
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryApps = APPLICATIONS.filter((app) => app.category === categoryId);

  const filteredApps = categoryApps.filter((app) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Category Hero / Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 shadow-xl">
        <div
          className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${categoryInfo.color} opacity-15 rounded-full blur-3xl pointer-events-none`}
        />

        <div className="relative z-10 max-w-2xl">
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            <span>Back to All Applications</span>
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {categoryInfo.label}
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {categoryApps.length} Verified Apps
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${categoryInfo.label} apps...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950'
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
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApps.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'space-y-3'
          }
        >
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} layout={viewMode} />
          ))}
        </div>
      ) : (
        <div className="py-12 rounded-2xl glass-panel text-center border border-white/5">
          <p className="text-sm text-slate-300 font-semibold">No applications found</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-cyan-400 underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

