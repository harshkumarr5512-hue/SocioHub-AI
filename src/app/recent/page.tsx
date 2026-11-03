'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AppIcon } from '@/components/AppIcon';
import {
  History,
  Trash2,
  ExternalLink,
  Star,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function RecentAppsPage() {
  const { recentApps, clearRecents, getAppById, openApp, isFavorite, toggleFavorite } = useApp();

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your recently opened application history?')) {
      clearRecents();
    }
  };

  const formatExactDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <History size={13} />
            <span>Activity History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Recently Opened Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Chronological log of applications launched during your active sessions
          </p>
        </div>

        {recentApps.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-colors self-start sm:self-auto"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {recentApps.length > 0 ? (
        <div className="space-y-3">
          {recentApps.map((item, index) => {
            const app = getAppById(item.id);
            if (!app) return null;
            const favorited = isFavorite(app.id);

            return (
              <div
                key={`${item.id}-${item.openedAt}-${index}`}
                onClick={() => openApp(app)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-interactive border border-white/5 bg-slate-900/60 hover:bg-slate-900/90 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
                    <AppIcon id={app.id} size={32} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors text-base truncate">
                        {app.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {app.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate max-w-lg mt-0.5">
                      {app.description}
                    </p>
                  </div>
                </div>

                {/* Right metadata & actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock size={13} className="text-emerald-400" />
                    <span>{formatRelativeTime(item.openedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(app.id, e);
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        favorited
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-slate-400 hover:text-white bg-slate-800'
                      }`}
                      title={favorited ? 'Starred' : 'Add to Favorites'}
                    >
                      <Star size={15} fill={favorited ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openApp(app, e);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-sm"
                    >
                      <span>Quick Open</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 rounded-3xl glass-panel text-center border border-white/5 px-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-950/40">
            <History size={32} />
          </div>
          <h2 className="text-lg font-bold text-white">No Recent History Found</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            As you launch platforms from the Dashboard or All Applications launcher, your activity
            will automatically be organized here for swift re-access.
          </p>
          <Link
            href="/apps"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-950/50"
          >
            <span>Launch an Application</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

