'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { APPLICATIONS, AppItem } from '@/data/apps';
import { AppIcon } from '@/components/AppIcon';
import {
  Search,
  Bot,
  Star,
  ExternalLink,
  History,
  LayoutGrid,
  Settings,
  HelpCircle,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    openApp,
    isFavorite,
    recentApps,
    getAppById,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Filter applications
  const filteredApps = APPLICATIONS.filter((app) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      app.name.toLowerCase().includes(q) ||
      app.categoryLabel.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  // Quick action items
  const quickActions = [
    {
      id: 'action-ai',
      title: 'Open SOCIOHUB AI Assistant',
      category: 'AI Assistant',
      icon: <Bot className="text-cyan-400" size={18} />,
      onClick: () => {
        setIsCommandPaletteOpen(false);
        router.push('/assistant');
      },
    },
    {
      id: 'action-favorites',
      title: 'View Starred Favorites',
      category: 'Navigation',
      icon: <Star className="text-amber-400" size={18} />,
      onClick: () => {
        setIsCommandPaletteOpen(false);
        router.push('/favorites');
      },
    },
    {
      id: 'action-apps',
      title: 'Explore All Applications Launcher',
      category: 'Navigation',
      icon: <LayoutGrid className="text-violet-400" size={18} />,
      onClick: () => {
        setIsCommandPaletteOpen(false);
        router.push('/apps');
      },
    },
    {
      id: 'action-recent',
      title: 'View Recently Opened Apps',
      category: 'Navigation',
      icon: <History className="text-emerald-400" size={18} />,
      onClick: () => {
        setIsCommandPaletteOpen(false);
        router.push('/recent');
      },
    },
    {
      id: 'action-settings',
      title: 'System & Theme Preferences',
      category: 'System',
      icon: <Settings className="text-slate-400" size={18} />,
      onClick: () => {
        setIsCommandPaletteOpen(false);
        router.push('/settings');
      },
    },
  ];

  const filteredActions = quickActions.filter((a) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });

  const totalResults = filteredApps.length + filteredActions.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (totalResults || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults) % (totalResults || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex < filteredApps.length) {
        const selectedApp = filteredApps[selectedIndex];
        if (selectedApp) {
          setIsCommandPaletteOpen(false);
          openApp(selectedApp);
        }
      } else {
        const actionIdx = selectedIndex - filteredApps.length;
        const selectedAction = filteredActions[actionIdx];
        if (selectedAction) {
          selectedAction.onClick();
        }
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl glass-panel border border-violet-500/30 bg-slate-900/95 shadow-2xl shadow-purple-950/60 overflow-hidden text-slate-100"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-950/40">
          <Search className="text-cyan-400 mr-3 flex-shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search applications, categories, AI tools or command shortcuts..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ESC to close
            </span>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
          {/* Applications Section */}
          {filteredApps.length > 0 && (
            <div className="p-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 block mb-1">
                Applications ({filteredApps.length})
              </span>
              <div className="space-y-1">
                {filteredApps.map((app, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        openApp(app);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border border-cyan-500/40'
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <AppIcon id={app.id} size={28} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white truncate">
                              {app.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {app.categoryLabel}
                            </span>
                            {isFavorite(app.id) && (
                              <Star size={12} className="text-amber-400" fill="currentColor" />
                            )}
                          </div>
                          <span className="text-xs text-slate-400 truncate block">
                            {app.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-cyan-400 font-medium">
                        <span>Launch</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions & Navigation */}
          {filteredActions.length > 0 && (
            <div className="p-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 block mb-1">
                Quick Navigation & Commands
              </span>
              <div className="space-y-1">
                {filteredActions.map((action, actionIdx) => {
                  const globalIdx = filteredApps.length + actionIdx;
                  const isSelected = selectedIndex === globalIdx;
                  return (
                    <div
                      key={action.id}
                      onClick={action.onClick}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border border-cyan-500/40'
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                          {action.icon}
                        </div>
                        <div>
                          <span className="font-medium text-sm text-white block">
                            {action.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {action.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-400" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {totalResults === 0 && (
            <div className="py-12 px-4 text-center">
              <Bot className="mx-auto text-slate-600 mb-3" size={36} />
              <p className="text-sm font-semibold text-slate-300">
                No matching applications or commands found
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for "ChatGPT", "WhatsApp", "GitHub", "Social", or ask the SOCIOHUB AI Assistant!
              </p>
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  router.push('/assistant');
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles size={14} />
                Ask SOCIOHUB AI Assistant
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">Enter</kbd> to launch
            </span>
          </div>
          <span>SOCIOHUB AI Control Engine</span>
        </div>
      </div>
    </div>
  );
};

