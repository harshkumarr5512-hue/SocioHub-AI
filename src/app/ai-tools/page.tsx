import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'AI Tools Launcher - SOCIOHUB AI',
  description: 'Access the world’s leading AI models: ChatGPT, Google Gemini, Claude, Perplexity, and DeepSeek from one unified platform.',
};

export default function AiToolsPage() {
  return <CategoryView categoryId="ai-tools" />;
}

