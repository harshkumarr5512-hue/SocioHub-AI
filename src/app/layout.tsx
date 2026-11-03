import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'SOCIOHUB AI - Your Digital World, Connected in One Place',
  description:
    'SOCIOHUB AI is the all-in-one centralized digital launchpad connecting social media, communication, productivity, development, and next-generation AI tools with a built-in AI Assistant.',
  keywords: [
    'SOCIOHUB AI',
    'Application Launcher',
    'Digital World',
    'AI Assistant',
    'Social Media Hub',
    'Productivity Hub',
    'AI Tools Dashboard',
  ],
  authors: [{ name: 'SOCIOHUB AI Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100">
        <AppProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      </body>
    </html>
  );
}

