'use client';

import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string | null;
  color?: string;
  isSpecial?: boolean;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const pathname = usePathname();
  const { favorites, recentApps } = useApp();

  const navSections: NavSection[] = [
    {
      group: 'MAIN CONTROL',
      items: [
        {
          name: 'Dashboard',
          href: '/',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          name: 'All Applications',
          href: '/apps',
          icon: Grid,
          badge: '28',
        },
        {
          name: 'AI Assistant',
          href: '/assistant',
          icon: Bot,
          badge: 'AI Core',
          isSpecial: true,
        },
      ],
    },
    {
      group: 'APPLICATION HUBS',
      items: [
        {
          name: 'Social Media',
          href: '/social-media',
          icon: Share2,
          badge: '9',
          color: 'text-pink-400',
        },
        {
          name: 'Communication',
          href: '/communication',
          icon: MessageSquare,
          badge: '6',
          color: 'text-blue-400',
        },
        {
          name: 'Entertainment',
          href: '/entertainment',
          icon: Tv,
          badge: '4',
          color: 'text-rose-400',
        },
        {
          name: 'Productivity',
          href: '/productivity',
          icon: Briefcase,
          badge: '7',
          color: 'text-emerald-400',
        },
        {
          name: 'Development',
          href: '/development',
          icon: Code2,
          badge: '4',
          color: 'text-violet-400',
        },
        {
          name: 'AI Tools',
          href: '/ai-tools',
          icon: Sparkles,
          badge: '5',
          color: 'text-cyan-400',
        },
      ],
    },
    {
      group: 'PERSONAL & SYSTEM',
      items: [
        {
          name: 'Favorites',
          href: '/favorites',
          icon: Star,
          badge: favorites.length > 0 ? `${favorites.length}` : null,
          color: 'text-amber-400',
        },
        {
          name: 'Recently Opened',
          href: '/recent',
          icon: History,
          badge: recentApps.length > 0 ? `${recentApps.length}` : null,
          color: 'text-emerald-400',
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: Settings,
          badge: null,
        },
        {
          name: 'About',
          href: '/about',
          icon: Info,
          badge: null,
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out hidden md:flex flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <div className="overflow-hidden">
          {collapsed ? (
            <SocioHubLogo size="sm" clickable />
          ) : (
            <SocioHubLogo size="md" clickable />
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-white/5 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {!collapsed && (
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 block mb-2">
                {section.group}
              </span>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-cyan-500/10 border border-violet-500/40 shadow-sm shadow-purple-900/30'
                        : item.isSpecial
                        ? 'text-cyan-300 hover:text-white bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                    } ${collapsed ? 'justify-center px-0' : ''}`}
                    title={collapsed ? item.name : undefined}
                  >
                    {/* Active glowing indicator pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />
                    )}

                    <Icon
                      size={18}
                      className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? 'text-cyan-400'
                          : item.color || (item.isSpecial ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200')
                      }`}
                    />

                    {!collapsed && (
                      <div className="flex items-center justify-between w-full min-w-0">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              item.isSpecial
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                : isActive
                                ? 'bg-violet-950 text-cyan-300 border border-violet-500/40'
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      {!collapsed ? (
        <div className="p-3 border-t border-white/5">
          <Link
            href="/assistant"
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-violet-950/70 via-slate-900/80 to-cyan-950/60 border border-violet-500/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-md"
          >
            <div className="relative p-2 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Bot size={16} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                  AI Assistant
                </span>
                <span className="text-[9px] font-mono text-emerald-400">ONLINE</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Ready to assist your workflows
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="p-3 border-t border-white/5 flex justify-center">
          <Link
            href="/assistant"
            title="SOCIOHUB AI Assistant"
            className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform"
          >
            <Bot size={18} />
          </Link>
        </div>
      )}
    </aside>
  );
};

