import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'Entertainment Hub - SOCIOHUB AI',
  description: 'Stream music, films, and livestreams with YouTube, Spotify, Netflix, and Twitch from SOCIOHUB AI.',
};

export default function EntertainmentPage() {
  return <CategoryView categoryId="entertainment" />;
}

