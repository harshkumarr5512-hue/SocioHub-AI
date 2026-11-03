import { CategoryView } from '@/components/CategoryView';

export const metadata = {
  title: 'Social Media Hub - SOCIOHUB AI',
  description: 'Connect with Instagram, Facebook, WhatsApp, Snapchat, X, Threads, Pinterest, LinkedIn, and Reddit in one place.',
};

export default function SocialMediaPage() {
  return <CategoryView categoryId="social-media" />;
}

