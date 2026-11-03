import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are the official SOCIOHUB AI Assistant — a high-performance, futuristic, and helpful intelligence built directly into the SOCIOHUB AI platform ("Your Digital World, Connected in One Place").

Your mission is to empower users across their entire digital workflow:
1. General knowledge and everyday questions
2. Programming & coding (provide clean, modern, well-commented code snippets, debugging assistance, architecture advice)
3. Study and learning assistance (explain complex topics simply, offer study plans, memory mnemonics)
4. Email & professional writing (draft formal or conversational emails, follow-ups, pitches)
5. Content generation (articles, video scripts, blog outlines, hooks)
6. Text summarization (clear TL;DR, key takeaways, action items)
7. Idea generation & brainstorming (innovative startup ideas, marketing angles, design concepts)
8. Productivity optimization (timeboxing, Eisenhower matrix, task prioritization)
9. Social media strategies (viral captions, hashtag ideas, engagement prompts for Instagram, X, LinkedIn, YouTube, TikTok)
10. Everyday problem solving (practical, logical step-by-step resolutions)

Formatting guidelines:
- Use clean Markdown with bolding, lists, and tables when helpful.
- For code, always specify the language in markdown code blocks (\`\`\`typescript, \`\`\`python, etc.).
- Keep answers structured, insightful, and directly actionable.`;

// Intelligent Demo Mode fallback engine
function generateIntelligentDemoResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  // 1. Programming & Coding
  if (
    query.includes('code') ||
    query.includes('function') ||
    query.includes('javascript') ||
    query.includes('typescript') ||
    query.includes('python') ||
    query.includes('react') ||
    query.includes('bug') ||
    query.includes('api') ||
    query.includes('sql')
  ) {
    return [
      '### ⚡ SOCIOHUB AI Code Solution',
      '',
      'Here is a clean, modern implementation tailored to your request:',
      '',
      '```typescript',
      '/**',
      ' * SOCIOHUB AI Optimized Task Handler',
      ' * Demonstrates clean architecture, error handling & async flow',
      ' */',
      'export async function executeConnectedTask<T>(',
      '  taskName: string,',
      '  payload: T',
      '): Promise<{ success: boolean; data?: T; error?: string }> {',
      '  try {',
      "    console.log('[SOCIOHUB Engine] Executing task: ' + taskName);",
      '    ',
      '    // Simulate resilient operation with safety boundaries',
      '    const result = await new Promise<T>((resolve) =>',
      '      setTimeout(() => resolve(payload), 250)',
      '    );',
      '',
      '    return {',
      '      success: true,',
      '      data: result,',
      '    };',
      '  } catch (err: any) {',
      "    console.error('[SOCIOHUB Error] Task failed: ' + (err?.message || 'Error'));",
      '    return {',
      '      success: false,',
      "      error: err?.message || 'Unknown operational failure',",
      '    };',
      '  }',
      '}',
      '```',
      '',
      '#### Key Highlights & Best Practices:',
      '- **Type Safety**: Fully typed with generic parameters `<T>` for flexibility across modules.',
      '- **Defensive Error Handling**: Catches exceptions and returns standardized `{ success, data, error }` envelopes without uncaught crashes.',
      '- **Asynchronous Flow**: Uses modern async/await promises suitable for Next.js App Router and server actions.',
      '',
      "*Need modifications for a specific framework, database query, or library? Tell me what you'd like to adjust!*",
    ].join('\n');
  }

  // 2. Email Writing
  if (
    query.includes('email') ||
    query.includes('letter') ||
    query.includes('pitch') ||
    query.includes('write to') ||
    query.includes('reach out')
  ) {
    return `### ✉️ Professional Email Draft

Here is a polished, high-conversion email draft ready for your review:

---

**Subject:** Collaboration Opportunity: Accelerating [Project/Initiative Name] with [Your Company]

**Hi [Recipient's First Name],**

I hope your week is off to a great start.

I’ve been following [Recipient Company/Team]’s recent work on [mention specific milestone or project], and I was thoroughly impressed by your approach to [specific detail]. 

At [Your Company/Team], we recently built a streamlined solution that helps teams like yours to:
- **Save 40%+ operational overhead** across daily application workflows
- **Consolidate multi-tool fragmentation** into a unified dashboard
- **Accelerate turnaround time** with integrated AI acceleration

I’d love to share a quick 10-minute preview of how this could fit into your current roadmap. Do you have 10 minutes this **Thursday at 2:00 PM EST** or **Friday at 11:00 AM EST** for a quick chat?

Looking forward to connecting!

Best regards,

**[Your Name]**  
[Your Title] | [Your Company]  
[Phone Number] | [LinkedIn/Portfolio Link]

---

💡 **Pro-Tip:** If you need a more informal or internal tone (e.g. updating an executive or manager), let me know and I'll adapt it!`;
  }

  // 3. Social Media Content
  if (
    query.includes('social media') ||
    query.includes('instagram') ||
    query.includes('tweet') ||
    query.includes('x post') ||
    query.includes('caption') ||
    query.includes('linkedin post') ||
    query.includes('viral')
  ) {
    return `### 📱 Multi-Platform Social Media Strategy

Here are 3 tailored post concepts optimized for high engagement:

#### 1. 💼 LinkedIn (Thought Leadership & Authority)
> **Hook:** The biggest productivity killer isn't lack of time. It's context switching.
>
> An average knowledge worker loses **2.5 hours every single day** jumping between 15 open browser tabs, chat apps, and project boards.
>
> Here’s how high-output builders fix it:
> 1. Centralize your core tech stack into a single launchpad
> 2. Group communication windows into scheduled time blocks
> 3. Leverage AI directly where your work lives
>
> What's the one app you couldn't live without this week? Let me know in the comments below! 👇
>
> #Productivity #FutureOfWork #TechStack #SaaS #Leadership

---

#### 2. 🐦 X (Twitter) (Punchy & Viral Thread Hook)
> 99% of people use their digital tools wrong.
> 
> They let 40 browser tabs dictate their attention.
> 
> Here is a minimal 3-step setup to 10x your focus today: 🧵👇
> 
> 1/ Pick 1 centralized command center (like SOCIOHUB AI).  
> 2/ Pin your top 5 daily drivers.  
> 3/ Close everything else until sprint end.  
> 
> Retweet if your browser currently has more than 10 tabs open right now. 🔁

---

#### 3. 📸 Instagram (Visual Carousel Outline)
- **Slide 1 (Cover):** "How I Saved 10 Hours Every Week (Without Working Overtime)"
- **Slide 2:** The Problem: Tab overload & notification burnout
- **Slide 3:** The Solution: The All-in-One Digital Hub
- **Slide 4:** 5 AI tools every creator needs in 2026
- **Slide 5:** Save this post & share it with a friend who has 100 tabs open!

*Would you like me to generate specific captions, hashtags, or custom copy for a product launch?*`;
  }

  // 4. Study / Learning Assistance
  if (
    query.includes('study') ||
    query.includes('learn') ||
    query.includes('explain') ||
    query.includes('concept') ||
    query.includes('exam') ||
    query.includes('summary')
  ) {
    return `### 🧠 Accelerated Learning Breakdown

Here is a structured conceptual breakdown using the **Feynman Learning Technique**:

#### 1. The Core Idea (In Plain English)
Think of the concept as a network of nodes: each complex mechanism is just a collection of simple rules working in harmony. Once you understand the foundation, the advanced features naturally click into place.

#### 2. Key Building Blocks
- **Principle A (The Anchor):** The foundational premise that never changes.
- **Principle B (The Conduit):** How information, state, or energy transitions from one step to the next.
- **Principle C (The Resolution):** The final outcome or return value.

#### 3. Memory Mnemonic
> **"C-A-R-E"**:
> - **C**onceptualize the goal
> - **A**nalyze the inputs
> - **R**un the process
> - **E**valuate the output

#### 4. Quick Self-Test Question
*Can you explain this concept in 2 sentences to a 10-year-old without using technical jargon?* If you can, you have mastered it!

Feel free to paste the exact topic or text you want broken down into flashcards or practice questions!`;
  }

  // 5. Idea Generation & Brainstorming
  if (
    query.includes('idea') ||
    query.includes('brainstorm') ||
    query.includes('startup') ||
    query.includes('creative') ||
    query.includes('suggest')
  ) {
    return `### 💡 High-Impact Brainstorming & Concept Angles

Here are 3 unique, high-potential concept frameworks for your exploration:

| Angle | Core Premise | Competitive Moat | Target Audience |
| :--- | :--- | :--- | :--- |
| **A. The Aggregator** | Unified dashboard eliminating multi-tool friction | Low learning curve, zero vendor lock-in | Freelancers, remote teams, creators |
| **B. The Autonomous Agent** | AI agent that performs workflows across linked platforms | Proprietary context memory & automation | Busy founders, project leads |
| **C. The Micro-Utility** | Laser-focused tool that does one task 10x faster | Extreme simplicity, instant gratification | Developers & visual designers |

#### Recommended Next Steps:
1. **Validate Demand**: Create a 1-page waitlist landing page and gauge click-through rates.
2. **Rapid Prototype**: Build an MVP in 48 hours using Next.js, Tailwind CSS, and local storage.
3. **Iterate with Users**: Collect feedback from 10 active daily users before expanding features.

*Which of these angles resonates most with your vision? Let's drill down into details!*`;
  }

  // Default General Assistant Response
  return `### 🤖 SOCIOHUB AI Assistant Response

Hello! I am your built-in SOCIOHUB AI intelligence, designed to assist you across all digital workflows.

Regarding your question: **"${userQuery}"**

Here is a direct, structured overview:

1. **Clarity & Context**: Having your tools, social feeds, and workflows unified in SOCIOHUB AI eliminates context switching and cognitive fatigue.
2. **Actionable Steps**:
   - Categorize your top digital targets using the **Favorites** launcher.
   - Utilize dedicated hotkeys (Ctrl + K) to instantly access any platform or tool.
   - Employ AI-assisted workflows for rapid drafting, coding, and problem solving.
3. **Next Recommended Action**:
   - You can ask me to write code snippets, summarize lengthy documents, draft emails, or analyze strategic problems anytime.

*Tip: You can connect your Google Gemini API Key in the Settings page to activate real-time multimodal live API intelligence, or continue using this built-in SOCIOHUB Offline Engine.*

How else can I assist you right now?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userApiKey } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages array provided' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1];
    const userPrompt = lastUserMessage?.content || '';

    // Check for API Key in priority order:
    // 1. User supplied custom key from settings
    // 2. Server-side environment variable GEMINI_API_KEY
    const apiKey = (userApiKey && userApiKey.trim() !== '') 
      ? userApiKey.trim() 
      : process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Build Gemini API payload
        const geminiContents = messages.map((m: Message) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: geminiContents,
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        });

        if (apiResponse.ok) {
          const data = await apiResponse.json();
          const generatedText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'No response content received from Gemini model.';

          return NextResponse.json({
            response: generatedText,
            isDemo: false,
            model: 'Gemini 2.0 Flash (Live API)',
          });
        } else {
          console.warn('Gemini API call returned non-200, falling back to demo engine');
        }
      } catch (geminiError) {
        console.error('Error invoking Gemini live API:', geminiError);
        // Seamlessly fall through to demo mode
      }
    }

    // Demo Mode (Intelligent Offline Engine)
    const demoResponse = generateIntelligentDemoResponse(userPrompt);

    return NextResponse.json({
      response: demoResponse,
      isDemo: true,
      model: 'SOCIOHUB AI Intelligent Engine (Demo Mode)',
    });
  } catch (error: any) {
    console.error('API Chat Route Internal Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error processing request',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

