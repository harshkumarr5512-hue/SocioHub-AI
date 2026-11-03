'use client';

import React, { useState } from 'react';
import { Copy, Check, Bot, User, Sparkles } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  model?: string;
  isDemo?: boolean;
}

interface ChatMessageBubbleProps {
  message: ChatMessage;
  userName?: string;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  userName = 'You',
}) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format simple markdown into styled elements
  const renderFormattedContent = (content: string) => {
    // Check if message has code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const firstLine = lines[0].trim();
        const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
        const language = hasLang ? firstLine : 'code';
        const code = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

        return (
          <div
            key={index}
            className="my-3 rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg text-left"
          >
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-white/10 text-[11px] font-mono text-slate-400">
              <span className="uppercase tracking-wider text-cyan-400">{language}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy code'}</span>
              </button>
            </div>
            <pre className="p-3.5 text-xs font-mono text-cyan-100 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format text lines
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-1.5">
          {lines.map((line, lIdx) => {
            if (!line.trim()) return <div key={lIdx} className="h-2" />;

            // Header 3
            if (line.startsWith('### ')) {
              return (
                <h4 key={lIdx} className="text-sm font-bold text-cyan-300 mt-2 mb-1">
                  {line.replace('### ', '')}
                </h4>
              );
            }
            // Header 4
            if (line.startsWith('#### ')) {
              return (
                <h5 key={lIdx} className="text-xs font-bold text-violet-300 mt-1 mb-0.5">
                  {line.replace('#### ', '')}
                </h5>
              );
            }
            // Bullet item
            if (line.startsWith('- ') || line.startsWith('* ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1">
                  <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                  <span>{formatInlineMarkdown(line.slice(2))}</span>
                </div>
              );
            }
            // Numbered list
            if (/^\d+\.\s/.test(line)) {
              const num = line.match(/^(\d+\.)\s/)?.[1];
              const rest = line.replace(/^\d+\.\s/, '');
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1">
                  <span className="font-mono text-xs text-violet-400 flex-shrink-0">{num}</span>
                  <span>{formatInlineMarkdown(rest)}</span>
                </div>
              );
            }
            // Blockquote
            if (line.startsWith('> ')) {
              return (
                <blockquote
                  key={lIdx}
                  className="pl-3 border-l-2 border-cyan-500/50 italic text-slate-300 my-1 text-xs"
                >
                  {formatInlineMarkdown(line.replace('> ', ''))}
                </blockquote>
              );
            }

            return <p key={lIdx}>{formatInlineMarkdown(line)}</p>;
          })}
        </div>
      );
    });
  };

  // Helper for inline bold, italic, and code
  const formatInlineMarkdown = (text: string) => {
    // Bold **text**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((chunk, i) => {
      if (chunk.startsWith('**') && chunk.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-white">
            {chunk.slice(2, -2)}
          </strong>
        );
      }
      if (chunk.startsWith('`') && chunk.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded text-[11px] font-mono text-cyan-300 bg-slate-900 border border-white/10"
          >
            {chunk.slice(1, -1)}
          </code>
        );
      }
      return chunk;
    });
  };

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${
        isAssistant ? 'justify-start' : 'justify-end'
      } group`}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="relative p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20 flex-shrink-0 ring-1 ring-white/20">
          <Bot size={18} />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
        </div>
      )}

      {/* Message Content Container */}
      <div
        className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-4 sm:p-5 relative ${
          isAssistant
            ? 'glass-panel border border-white/10 bg-slate-900/80 text-slate-200 shadow-md'
            : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white shadow-lg shadow-violet-950/40 rounded-tr-none'
        }`}
      >
        {/* Header bar within bubble */}
        <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-white/10 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">
              {isAssistant ? 'SOCIOHUB AI' : userName}
            </span>

            {isAssistant && message.isDemo && (
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-950/60 text-amber-300 border border-amber-500/30">
                Demo Engine
              </span>
            )}

            {isAssistant && !message.isDemo && (
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles size={9} /> Live Gemini
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400 group-hover:opacity-100 transition-opacity">
            <span>{formatTimestamp(message.timestamp)}</span>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Copy message"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        {/* Message Body */}
        <div className="text-xs sm:text-sm leading-relaxed overflow-hidden">
          {renderFormattedContent(message.content)}
        </div>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20 shadow-sm flex-shrink-0">
          <User size={16} />
        </div>
      )}
    </div>
  );
};

