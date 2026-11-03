import React from 'react';
import Link from 'next/link';

interface SocioHubLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  clickable?: boolean;
  className?: string;
}

export const SocioHubLogo: React.FC<SocioHubLogoProps> = ({
  size = 'md',
  showTagline = false,
  clickable = true,
  className = '',
}) => {
  const iconSizes = {
    sm: { box: 28, stroke: 1.8, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { box: 36, stroke: 2, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { box: 44, stroke: 2.2, text: 'text-2xl', badge: 'text-xs px-2.5 py-1' },
    xl: { box: 56, stroke: 2.4, text: 'text-3xl', badge: 'text-xs px-3 py-1' },
  };

  const currentSize = iconSizes[size];

  const content = (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Brand Icon: Futuristic Neural-Hub Connectivity Symbol */}
      <div className="relative flex items-center justify-center">
        {/* Subtle pulsating back-glow */}
        <div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500"
        />

        <div
          style={{ width: currentSize.box, height: currentSize.box }}
          className="relative rounded-xl bg-slate-950/90 border border-white/20 p-1.5 flex items-center justify-center shadow-lg shadow-purple-950/50 backdrop-blur-xl"
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform transition duration-500 group-hover:rotate-6 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="socioHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="hubCenter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Neural Interconnect Rings */}
            <circle cx="20" cy="20" r="16" stroke="url(#socioHubGrad)" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6" />
            
            {/* Hexagonal Core Hub */}
            <path
              d="M20 7L31 13.5V26.5L20 33L9 26.5V13.5L20 7Z"
              stroke="url(#socioHubGrad)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Hub Nodes (Connectivity) */}
            <circle cx="20" cy="7" r="2.2" fill="#06b6d4" />
            <circle cx="31" cy="13.5" r="2.2" fill="#8b5cf6" />
            <circle cx="31" cy="26.5" r="2.2" fill="#ec4899" />
            <circle cx="20" cy="33" r="2.2" fill="#06b6d4" />
            <circle cx="9" cy="26.5" r="2.2" fill="#8b5cf6" />
            <circle cx="9" cy="13.5" r="2.2" fill="#ec4899" />

            {/* Neural AI Synapse Lines */}
            <line x1="20" y1="20" x2="20" y2="7" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />
            <line x1="20" y1="20" x2="31" y2="13.5" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />
            <line x1="20" y1="20" x2="31" y2="26.5" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />
            <line x1="20" y1="20" x2="20" y2="33" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />
            <line x1="20" y1="20" x2="9" y2="26.5" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />
            <line x1="20" y1="20" x2="9" y2="13.5" stroke="url(#socioHubGrad)" strokeWidth="1.2" opacity="0.8" />

            {/* Center AI Nucleus */}
            <circle cx="20" cy="20" r="4.5" fill="url(#hubCenter)" />
            <circle cx="20" cy="20" r="2.5" fill="#090b14" />
            <circle cx="20" cy="20" r="1.2" fill="#38bdf8" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight ${currentSize.text} text-white`}>
            SOCIO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500">HUB</span>
          </span>
          <span
            className={`font-mono font-bold tracking-wider rounded-md text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] ${currentSize.badge}`}
          >
            AI
          </span>
        </div>

        {showTagline && (
          <span className="text-[11px] font-medium tracking-wide text-slate-400 -mt-0.5">
            Your Digital World, Connected in One Place.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};

