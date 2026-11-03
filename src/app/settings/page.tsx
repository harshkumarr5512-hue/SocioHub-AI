'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Settings,
  Moon,
  Sun,
  User,
  Key,
  Trash2,
  Check,
  RotateCcw,
  Shield,
  Palette,
  ExternalLink,
  Info,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
    clearFavorites,
    clearRecents,
    favorites,
    recentApps,
  } = useApp();

  const [userName, setUserName] = useState(settings.userName);
  const [userTitle, setUserTitle] = useState(settings.userTitle);
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      userName: userName.trim() || 'Explorer',
      userTitle: userTitle.trim() || 'Digital Architect',
      apiKey: apiKey.trim(),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleThemeChange = (theme: 'dark' | 'light') => {
    updateSettings({ theme });
  };

  const handleResetAll = () => {
    if (
      confirm(
        'Are you sure you want to reset all preferences, favorites, and history to factory defaults?'
      )
    ) {
      clearFavorites();
      clearRecents();
      updateSettings({
        userName: 'Cyber Explorer',
        userTitle: 'Digital Architect',
        theme: 'dark',
        accentColor: 'cyan',
        openInNewTab: true,
        apiKey: '',
        viewMode: 'grid',
      });
      setUserName('Cyber Explorer');
      setUserTitle('Digital Architect');
      setApiKey('');
      alert('SOCIOHUB AI has been reset to defaults.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
          <Settings size={13} />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Settings & Customization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your SOCIOHUB AI experience, themes, profile, and AI model parameters
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Theme Preferences */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-900/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Theme & Appearance</h2>
              <p className="text-xs text-slate-400">
                Choose between dark futuristic cyberpunk or clean high-contrast mode
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`p-4 rounded-2xl flex items-center gap-3.5 border transition-all text-left ${
                settings.theme === 'dark'
                  ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40 text-white'
                  : 'border-white/5 bg-slate-950/50 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-white/10">
                <Moon size={20} />
              </div>
              <div>
                <span className="font-semibold text-sm block">Dark Theme (Default)</span>
                <span className="text-[11px] text-slate-400">Futuristic SaaS with neon gradient accents</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`p-4 rounded-2xl flex items-center gap-3.5 border transition-all text-left ${
                settings.theme === 'light'
                  ? 'border-cyan-500 bg-cyan-50 text-slate-900 ring-1 ring-cyan-400'
                  : 'border-white/5 bg-slate-950/50 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 border border-white/10">
                <Sun size={20} />
              </div>
              <div>
                <span className="font-semibold text-sm block">Light Theme</span>
                <span className="text-[11px] text-slate-400">High contrast modern enterprise styling</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Profile Settings */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-900/60 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Profile Identity</h2>
              <p className="text-xs text-slate-400">
                Personalize your greeting and workspace signature
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                placeholder="e.g. Alex Morgan"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={userTitle}
                onChange={(e) => setUserTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                placeholder="e.g. Senior Product Engineer"
              />
            </div>
          </div>

          {/* 3. AI API Configuration */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">
                Google Gemini API Key (Optional)
              </label>
              <span className="text-[10px] font-mono text-cyan-400">
                {apiKey ? 'Custom Key Set' : 'Using Offline Engine Mode'}
              </span>
            </div>

            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" size={16} />
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank to use built-in Offline Intelligent Engine)"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed flex items-center gap-1.5">
              <Shield size={12} className="text-emerald-400 flex-shrink-0" />
              <span>
                Your API key is transmitted only to the secure backend server route and is never
                exposed to external third parties.
              </span>
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saveSuccess ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold animate-fade-in">
                <Check size={14} /> Preferences saved successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs transition-all shadow-md shadow-violet-950/50"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* 4. Data Management */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-900/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Trash2 size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data & Storage Management</h2>
              <p className="text-xs text-slate-400">
                Manage your local storage cache, favorites list, and recent launch history
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (confirm('Clear all your favorite applications?')) {
                  clearFavorites();
                  alert('Favorites cleared.');
                }
              }}
              className="p-3 rounded-2xl bg-slate-950/60 hover:bg-rose-950/30 border border-white/5 hover:border-rose-500/30 text-left transition-colors"
            >
              <span className="font-semibold text-xs text-rose-300 block mb-1">
                Clear Favorites ({favorites.length})
              </span>
              <span className="text-[11px] text-slate-400 block">
                Removes all starred bookmarks
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Clear your recently opened app history?')) {
                  clearRecents();
                  alert('Recent history cleared.');
                }
              }}
              className="p-3 rounded-2xl bg-slate-950/60 hover:bg-rose-950/30 border border-white/5 hover:border-rose-500/30 text-left transition-colors"
            >
              <span className="font-semibold text-xs text-rose-300 block mb-1">
                Clear Recents ({recentApps.length})
              </span>
              <span className="text-[11px] text-slate-400 block">
                Clears activity history
              </span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              className="p-3 rounded-2xl bg-slate-950/60 hover:bg-rose-950/30 border border-white/5 hover:border-rose-500/30 text-left transition-colors"
            >
              <span className="font-semibold text-xs text-rose-300 block mb-1 flex items-center gap-1">
                <RotateCcw size={12} /> Reset to Defaults
              </span>
              <span className="text-[11px] text-slate-400 block">
                Revert all settings
              </span>
            </button>
          </div>
        </div>

        {/* 5. About Platform Card */}
        <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
              <Info size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                SOCIOHUB AI v1.0.0
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                "Your Digital World, Connected in One Place."
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-3.5 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 transition-colors"
          >
            <span>Read Platform Vision & Security</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

