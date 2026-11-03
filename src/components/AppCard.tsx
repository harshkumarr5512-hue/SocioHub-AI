'use client';

import React, { useState } from 'react';
import { AppItem } from '@/data/apps';
import { AppIcon } from '@/components/AppIcon';
import { useApp } from '@/context/AppContext';
import { ExternalLink, Star, Sparkles, Check } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  layout?: 'grid' | 'compact' | 'list';
}

export const AppCard: React.FC<AppCardProps> = ({ app, layout = 'grid' }) => {
  const { isFavorite, toggleFavorite, openApp } = useApp();
  const favorited = isFavorite(app.id);
  const [justCopied, setJustCopied] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openApp(app, e);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(app.id, e);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={handleOpen}
        className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl glass-panel-interactive cursor-pointer border border-white/5 hover:border-violet-500/40 bg-slate-900/60 transition-all duration-300"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <AppIcon id={app.id} size={36} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 group-hover:text-cyan-400 text-sm sm:text-base transition-colors truncate">
                {app.name}
              </h3>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 hidden sm:inline-block">
                {app.categoryLabel}
              </span>
              {app.popular && (
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded text-amber-400 bg-amber-950/40 border border-amber-600/30 flex items-center gap-1">
                  <Sparkles size={10} /> Popular
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate max-w-md sm:max-w-lg">
              {app.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleToggleFav}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-lg transition-colors ${
              favorited
                ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                : 'text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700'
            }`}
          >
            <Star size={16} fill={favorited ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={handleOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 transition-all shadow-sm"
          >
            <span>Open</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    );
  }

  // Grid layout (Standard Premium Card)
  return (
    <div
      onClick={handleOpen}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl glass-panel-interactive cursor-pointer border border-white/5 hover:border-violet-500/40 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(139,92,246,0.3)]"
    >
      {/* Subtle top accent gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
      />

      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="relative p-2.5 rounded-xl bg-slate-950/80 border border-white/10 group-hover:border-cyan-500/30 transition-transform duration-300 group-hover:scale-110 shadow-md">
            <AppIcon id={app.id} size={32} />
          </div>

          <div className="flex items-center gap-1.5">
            {app.popular && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-amber-300 bg-amber-950/50 border border-amber-500/30 flex items-center gap-1">
                <Sparkles size={10} /> Popular
              </span>
            )}
            <button
              onClick={handleToggleFav}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-2 rounded-xl transition-all duration-200 ${
                favorited
                  ? 'text-amber-400 bg-amber-400/15 hover:bg-amber-400/25 ring-1 ring-amber-400/40'
                  : 'text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-700/60'
              }`}
            >
              <Star size={16} fill={favorited ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              {app.name}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              {app.categoryLabel}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {app.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1 overflow-hidden">
          {app.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/40"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all duration-200 shadow-sm"
        >
          <span>Open App</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};

