import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'Communication Hub - SOCIOHUB AI',
  description: 'Instant messaging, video conferencing, and enterprise collaboration with Telegram, Discord, Messenger, Gmail, Google Meet, and Teams.',
};

export default function CommunicationPage() {
  return <CategoryView categoryId="communication" />;
}

