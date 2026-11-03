# SOCIOHUB AI
> **"Your Digital World, Connected in One Place."**

A premium-quality, futuristic, all-in-one digital command center and application launcher with a built-in AI Assistant. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

---

## 🚀 Key Features

### 1. 🌐 Centralized Application Launcher (28+ Platforms)
- **Social Media**: Instagram, Facebook, WhatsApp, Snapchat, X (Twitter), Threads, Pinterest, LinkedIn, Reddit
- **Communication**: Telegram, Discord, Messenger, Gmail, Google Meet, Microsoft Teams
- **Entertainment**: YouTube, Spotify, Netflix, Twitch
- **Productivity**: Google Drive, Google Docs, Google Sheets, Google Calendar, Notion, Microsoft Word, Microsoft Excel
- **Development**: GitHub, Stack Overflow, CodePen, Replit
- **AI Tools**: ChatGPT, Google Gemini, Claude, Perplexity, DeepSeek

### 2. 🤖 Built-in SOCIOHUB AI Assistant
- Dedicated chat interface with conversation history and copy-to-clipboard functionality
- Syntax-highlighted code blocks with 1-click code copying
- Dual mode:
  - **Live Gemini API**: Seamlessly connects via secure server-side routes when `GEMINI_API_KEY` is provided
  - **Intelligent Offline Engine (Demo Mode)**: Specialized domain handlers for coding, study assistance, email drafting, social media content, and productivity
- Fast pre-configured prompts for common developer, creator, and productivity tasks

### 3. 🔍 Smart Global Search (Command Palette)
- Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>) anywhere to open the instant search modal
- Search apps by name, description, category, or #tags
- Instant keyboard navigation (<kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>)

### 4. ⭐ Favorites & 🕒 Recent Apps Systems
- Star any application to pin it to your favorites bar
- Automatic tracking of opened apps with relative time ago indicators
- Dedicated `/favorites` and `/recent` management pages
- Fully persisted in `localStorage`

### 5. 🎨 Futuristic Glassmorphism UI
- Deep dark cyber theme with purple, blue, and cyan neon glow accents
- Responsive collapsible sidebar on desktop and laptop
- Touch-friendly bottom navigation bar and mobile drawer for phones and tablets
- Light mode and Dark mode toggles in Settings

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS, PostCSS, Custom Cyber CSS
- **Icons**: Lucide React + Custom Vector SVG Brand Logos
- **Storage**: Browser LocalStorage
- **Backend API**: Next.js Server-side Route Handlers (`/api/chat`)

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## 🔐 Security & Privacy Standard
- **Safe External Navigation**: All platforms open their verified official websites in new browser tabs with `noopener, noreferrer`.
- **Zero Third-Party Password Collection**: SOCIOHUB AI never asks for or stores third-party login credentials.
- **Server-Side API Security**: Custom API keys are never exposed in frontend code bundles.

