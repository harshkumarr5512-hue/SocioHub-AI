import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'Development Hub - SOCIOHUB AI',
  description: 'Code repositories, Q&A, and online IDEs with GitHub, Stack Overflow, CodePen, and Replit.',
};

export default function DevelopmentPage() {
  return <CategoryView categoryId="development" />;
}

