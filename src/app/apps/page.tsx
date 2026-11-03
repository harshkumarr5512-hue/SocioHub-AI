'use client';

import React, { useState, useMemo } from 'react';
import { APPLICATIONS, CATEGORIES, AppCategory } from '@/data/apps';
import { AppCard } from '@/components/AppCard';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  X,
} from 'lucide-react';

export default function AllAppsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'popular'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & sort logic
  const filteredApps = useMemo(() => {
    return APPLICATIONS.filter((app) => {
      const matchesCat =
        selectedCategory === 'all' || app.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <LayoutGrid size={13} />
            <span>Application Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            All Applications Launcher
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access and launch any verified platform from your centralized digital workstation
          </p>
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300">
            <span className="text-cyan-400 font-bold">{filteredApps.length}</span> of {APPLICATIONS.length} Apps
          </div>

          <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
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
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, description, or #tag..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 border border-white/10 px-3 py-2 rounded-xl">
              <ArrowUpDown size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Featured First</option>
                <option value="name" className="bg-slate-900">Name (A-Z)</option>
                <option value="popular" className="bg-slate-900">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-950/40'
                : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
            }`}
          >
            All Platforms ({APPLICATIONS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = APPLICATIONS.filter((a) => a.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-950/40'
                    : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications Grid / List */}
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
        <div className="py-16 rounded-3xl glass-panel text-center border border-white/5 px-4">
          <Sparkles className="mx-auto text-slate-600 mb-3" size={36} />
          <h3 className="text-base font-bold text-slate-200">
            No applications match your criteria
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your query or resetting category filters to show all apps.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/40 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

