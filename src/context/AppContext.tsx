'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppItem, APPLICATIONS } from '@/data/apps';

export interface RecentItem {
  id: string;
  openedAt: number;
}

export interface UserSettings {
  userName: string;
  userTitle: string;
  theme: 'dark' | 'light';
  accentColor: 'cyan' | 'purple' | 'blue' | 'emerald';
  openInNewTab: boolean;
  apiKey: string;
  viewMode: 'grid' | 'compact' | 'list';
}

interface AppContextType {
  favorites: string[];
  recentApps: RecentItem[];
  settings: UserSettings;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, e?: React.MouseEvent) => void;
  openApp: (app: AppItem, e?: React.MouseEvent) => void;
  clearFavorites: () => void;
  clearRecents: () => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  getAppById: (id: string) => AppItem | undefined;
}

const DEFAULT_SETTINGS: UserSettings = {
  userName: 'Cyber Explorer',
  userTitle: 'Digital Architect',
  theme: 'dark',
  accentColor: 'cyan',
  openInNewTab: true,
  apiKey: '',
  viewMode: 'grid',
};

// Default starter favorites so new users immediately see a gorgeous populated dashboard
const DEFAULT_FAVORITES: string[] = [
  'chatgpt',
  'gemini',
  'github',
  'youtube',
  'spotify',
  'notion',
  'whatsapp',
  'x-twitter',
];

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FAVORITES: 'sociohub_favorites_v1',
  RECENTS: 'sociohub_recents_v1',
  SETTINGS: 'sociohub_settings_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);
  const [recentApps, setRecentApps] = useState<RecentItem[]>([]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      } else {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(DEFAULT_FAVORITES));
      }

      const storedRecents = localStorage.getItem(STORAGE_KEYS.RECENTS);
      if (storedRecents) {
        setRecentApps(JSON.parse(storedRecents));
      } else {
        // Initialize with realistic initial recent apps
        const initialRecents: RecentItem[] = [
          { id: 'gemini', openedAt: Date.now() - 1000 * 60 * 12 },
          { id: 'github', openedAt: Date.now() - 1000 * 60 * 45 },
          { id: 'chatgpt', openedAt: Date.now() - 1000 * 60 * 120 },
        ];
        setRecentApps(initialRecents);
        localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(initialRecents));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) });
      }
    } catch (e) {
      console.error('Failed to load local storage data', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Update HTML class for theme
  useEffect(() => {
    if (!isHydrated) return;
    const root = document.documentElement;
    if (settings.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [settings.theme, isHydrated]);

  // Sync favorites
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [id, ...prev];
      }
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      } catch (err) {
        console.error('Storage write error', err);
      }
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Open App handler
  const openApp = (app: AppItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Add to recents (unshift, max 20, deduplicate previous entries of the same app)
    setRecentApps((prev) => {
      const filtered = prev.filter((item) => item.id !== app.id);
      const updated = [{ id: app.id, openedAt: Date.now() }, ...filtered].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(updated));
      } catch (err) {
        console.error('Storage write error', err);
      }
      return updated;
    });

    // Open official URL safely in new tab
    if (typeof window !== 'undefined') {
      window.open(app.officialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
    } catch (err) {
      console.error('Storage error', err);
    }
  };

  const clearRecents = () => {
    setRecentApps([]);
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify([]));
    } catch (err) {
      console.error('Storage error', err);
    }
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (err) {
        console.error('Storage error', err);
      }
      return updated;
    });
  };

  const getAppById = (id: string) => {
    return APPLICATIONS.find((app) => app.id === id);
  };

  // Keyboard shortcut listener for Ctrl+K command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  return (
    <AppContext.Provider
      value={{
        favorites,
        recentApps,
        settings,
        isFavorite,
        toggleFavorite,
        openApp,
        clearFavorites,
        clearRecents,
        updateSettings,
        searchQuery,
        setSearchQuery,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        getAppById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

