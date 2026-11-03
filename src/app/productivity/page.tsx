import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'Productivity Hub - SOCIOHUB AI',
  description: 'Organize files, spreadsheets, notes, and roadmaps with Google Drive, Docs, Sheets, Calendar, Notion, Word, and Excel.',
};

export default function ProductivityPage() {
  return <CategoryView categoryId="productivity" />;
}

