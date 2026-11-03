'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ChatMessage, ChatMessageBubble } from '@/components/ChatMessageBubble';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  PlusCircle,
  Copy,
  AlertCircle,
  Check,
  Code,
  Mail,
  Share2,
  BookOpen,
  Lightbulb,
  Zap,
  Clock,
  Shield,
} from 'lucide-react';

const STORAGE_CHAT_KEY = 'sociohub_ai_chat_history_v1';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'assistant',
  content: `### Welcome to SOCIOHUB AI Assistant 🤖
"Your Digital World, Connected in One Place."

I am your personal intelligence engine. Here is how I can accelerate your day:
- **💻 Programming & Coding**: Write, refactor, and debug modern full-stack code.
- **✉️ Email & Communications**: Draft client pitches, follow-ups, and executive updates.
- **📱 Social Media & Content**: Brainstorm viral hooks, carousel copy, and hashtag sets.
- **🧠 Accelerated Learning**: Break down complex concepts into simple Feynman analogies.
- **💡 Idea Generation**: Explore high-impact startup business concepts and feature roadmaps.
- **⚡ Productivity**: Optimize timeboxing, Eisenhower matrix priorities, and checklists.

Select one of the quick suggestions below or type your query to get started!`,
  timestamp: Date.now(),
  isDemo: true,
};

const SUGGESTION_PROMPTS = [
  {
    icon: <Code size={14} className="text-violet-400" />,
    label: 'Write Next.js API Route',
    prompt: 'Write a secure Next.js App Router API route with rate-limiting, error handling, and TypeScript types.',
  },
  {
    icon: <Mail size={14} className="text-cyan-400" />,
    label: 'Draft Follow-up Email',
    prompt: 'Draft a polite but persuasive follow-up email to a prospective client who has not replied for 5 days.',
  },
  {
    icon: <Share2 size={14} className="text-pink-400" />,
    label: 'Viral Social Media Hooks',
    prompt: 'Give me 5 viral hooks and an outline for a tech creator carousel on Instagram and LinkedIn.',
  },
  {
    icon: <Lightbulb size={14} className="text-amber-400" />,
    label: 'Brainstorm Startup Ideas',
    prompt: 'Brainstorm 3 innovative AI-powered SaaS startup ideas in the productivity and digital workspace niche.',
  },
  {
    icon: <BookOpen size={14} className="text-emerald-400" />,
    label: 'Study Guide & Flashcards',
    prompt: 'Explain the core principles of Distributed Systems and create a 4-step memory mnemonic.',
  },
  {
    icon: <Zap size={14} className="text-rose-400" />,
    label: 'Daily Focus Schedule',
    prompt: 'Create a high-output Pomodoro daily schedule for a software developer balancing deep work and team syncs.',
  },
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialPromptFromUrl = searchParams.get('prompt');

  const { settings } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_CHAT_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
  }, []);

  // Save history on change
  const saveHistory = (newMessages: ChatMessage[]) => {
    try {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(newMessages));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle URL prompt if provided
  useEffect(() => {
    if (initialPromptFromUrl && initialPromptFromUrl.trim()) {
      handleSendMessage(initialPromptFromUrl.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPromptFromUrl]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading) return;

    setErrorMessage(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userApiKey: settings.apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'No response content returned.',
        timestamp: Date.now(),
        model: data.model,
        isDemo: data.isDemo,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveHistory(finalMessages);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setErrorMessage(
        'Unable to reach the assistant engine. Please try again or check your network connection.'
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    saveHistory([INITIAL_WELCOME_MESSAGE]);
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([INITIAL_WELCOME_MESSAGE]);
      localStorage.removeItem(STORAGE_CHAT_KEY);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto rounded-3xl glass-panel border border-violet-500/20 bg-slate-950/80 shadow-2xl overflow-hidden animate-fade-in">
      {/* Top Assistant Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/20">
            <Bot size={20} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">
                SOCIOHUB AI Assistant
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {settings.apiKey ? 'Connected Gemini' : 'Offline Intelligent Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Multi-discipline workspace intelligence with markdown & syntax formatting
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 transition-all shadow-sm"
            title="Start New Chat"
          >
            <PlusCircle size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">New Chat</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-rose-950/40 border border-white/5 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            userName={settings.userName}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 sm:gap-4 animate-fade-in">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20 flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="glass-panel border border-white/10 bg-slate-900/80 rounded-2xl p-4 text-xs text-slate-300 flex items-center gap-3 shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                SOCIOHUB AI is analyzing and synthesizing response...
              </span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestion Chips (shown when only 1-2 messages) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-white/5 bg-slate-950/40">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-2 px-1">
            Suggested Prompts
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTION_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-violet-500/30 text-xs text-slate-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Input Field */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/90 backdrop-blur-md flex-shrink-0">
        <div className="relative flex items-end gap-2 rounded-2xl bg-slate-950/90 border border-white/15 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 p-2 transition-all shadow-inner">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question or request... (Press Enter to send, Shift+Enter for new line)"
            className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-400 text-xs sm:text-sm px-2 py-1.5 resize-none focus:outline-none max-h-32"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
              inputValue.trim() && !isLoading
                ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-900/40 hover:scale-105 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            title="Send Message"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Shield size={11} className="text-emerald-400" />
            <span>Secure Server-side AI Processing</span>
          </span>
          <span className="hidden sm:inline">
            Enter to send • Shift + Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-2 text-cyan-400">
            <Bot size={24} className="animate-spin" />
            <span className="text-sm font-semibold">Loading SOCIOHUB AI Assistant...</span>
          </div>
        </div>
      }
    >
      <AssistantContent />
    </Suspense>
  );
}

