'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SocioHubLogo } from '@/components/SocioHubLogo';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Bot,
  Star,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Command,
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  collapsed: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, collapsed }) => {
  const router = useRouter();
  const { settings, updateSettings, favorites, setIsCommandPaletteOpen } = useApp();

  const toggleTheme = () => {
    updateSettings({
      theme: settings.theme === 'dark' ? 'light' : 'dark',
    });
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 transition-all duration-300 ease-in-out border-b border-white/10 bg-slate-950/70 backdrop-blur-xl ${
        collapsed ? 'left-0 md:left-20' : 'left-0 md:left-64'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Section (Mobile brand + Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 border border-white/5"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="md:hidden">
            <SocioHubLogo size="sm" clickable />
          </div>
        </div>

        {/* Center: Global Search Bar Trigger */}
        <div className="flex-1 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm bg-slate-900/70 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/10 hover:border-violet-500/40 transition-all duration-200 shadow-inner group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm">
                Search apps, categories, AI tools...
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 flex-shrink-0">
              <Command size={11} />
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assistant Quick Launcher */}
          <Link
            href="/assistant"
            className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-md shadow-violet-950/50 transition-all hover:scale-[1.02]"
          >
            <Sparkles size={13} className="text-cyan-200 animate-spin-slow" />
            <span>AI Assistant</span>
          </Link>

          {/* Favorites shortcut */}
          <Link
            href="/favorites"
            className="relative p-2 rounded-xl text-slate-300 hover:text-amber-400 bg-slate-900/60 hover:bg-slate-900 border border-white/5 transition-colors"
            title="Favorites"
          >
            <Star size={18} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 bg-slate-900/60 hover:bg-slate-900 border border-white/5 transition-colors"
            title={settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile / Settings Avatar */}
          <Link
            href="/settings"
            className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-white/10"
            title="Profile & Settings"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20 shadow-sm">
              {settings.userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-semibold text-slate-200 block leading-tight">
                {settings.userName}
              </span>
              <span className="text-[10px] text-cyan-400 block leading-tight">
                {settings.userTitle}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

