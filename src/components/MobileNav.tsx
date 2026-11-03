'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SocioHubLogo } from '@/components/SocioHubLogo';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  Grid,
  Share2,
  MessageSquare,
  Tv,
  Briefcase,
  Code2,
  Bot,
  Star,
  History,
  Settings,
  Info,
  X,
  Sparkles,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileNavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  isSpecial?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { favorites, recentApps } = useApp();

  const navLinks: MobileNavItem[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'All Applications', href: '/apps', icon: Grid, badge: '28' },
    { name: 'AI Assistant', href: '/assistant', icon: Bot, isSpecial: true },
    { name: 'Social Media', href: '/social-media', icon: Share2, badge: '9' },
    { name: 'Communication', href: '/communication', icon: MessageSquare, badge: '6' },
    { name: 'Entertainment', href: '/entertainment', icon: Tv, badge: '4' },
    { name: 'Productivity', href: '/productivity', icon: Briefcase, badge: '7' },
    { name: 'Development', href: '/development', icon: Code2, badge: '4' },
    { name: 'AI Tools', href: '/ai-tools', icon: Sparkles, badge: '5' },
    { name: 'Favorites', href: '/favorites', icon: Star, badge: favorites.length > 0 ? `${favorites.length}` : undefined },
    { name: 'Recently Opened', href: '/recent', icon: History, badge: recentApps.length > 0 ? `${recentApps.length}` : undefined },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'About SOCIOHUB AI', href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md md:hidden transition-opacity"
        />
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-slate-950 border-r border-white/10 p-5 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <SocioHubLogo size="sm" clickable />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/5"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-140px)] space-y-1 pr-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-gradient-to-r from-violet-600/30 to-cyan-500/10 border border-cyan-500/40 font-semibold'
                      : item.isSpecial
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive || item.isSpecial ? 'text-cyan-400' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-400">
            SOCIOHUB AI • Your Digital World
          </p>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 h-16 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 md:hidden flex items-center justify-around px-2">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
            pathname === '/' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Home</span>
        </Link>

        <Link
          href="/apps"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
            pathname === '/apps' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid size={18} />
          <span>Apps</span>
        </Link>

        {/* Center Floating AI Assistant Button */}
        <Link
          href="/assistant"
          className="relative -top-4 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 ring-4 ring-slate-950">
            <Bot size={22} />
          </div>
          <span className="text-[10px] font-bold text-cyan-300 mt-1">AI Assistant</span>
        </Link>

        <Link
          href="/favorites"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
            pathname === '/favorites' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Star size={18} />
          <span>Favorites</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
            pathname === '/settings' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </nav>
    </>
  );
};

