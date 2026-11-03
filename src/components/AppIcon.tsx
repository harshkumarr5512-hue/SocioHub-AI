import React from 'react';
import {
  Globe,
  Share2,
  MessageSquare,
  Tv,
  Briefcase,
  Code2,
  Bot,
  Sparkles,
} from 'lucide-react';

interface AppIconProps {
  id: string;
  size?: number;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ id, size = 28, className = '' }) => {
  const pixelSize = `${size}px`;

  switch (id) {
    // --- SOCIAL MEDIA ---
    case 'instagram':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <radialGradient id="ig-grad" cx="20%" cy="105%" r="125%">
            <stop offset="0%" stopColor="#ffd600" />
            <stop offset="25%" stopColor="#ff0100" />
            <stop offset="50%" stopColor="#d800b9" />
            <stop offset="100%" stopColor="#7000ff" />
          </radialGradient>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
        </svg>
      );

    case 'facebook':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1877F2" />
          <path
            d="M16.5 12.5L17 8.5H13V6.2C13 5.1 13.5 4.5 15 4.5H17V1.1C16.6 1.05 15.3 1 13.8 1C10.7 1 8.8 2.9 8.8 6.4V8.5H5.5V12.5H8.8V23H13V12.5H16.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#25D366" />
          <path
            d="M19.1 4.9C17.2 3 14.7 2 12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.4 17L2.1 22L7.2 20.7C8.6 21.5 10.3 22 12 22C17.5 22 22 17.5 22 12C22 9.3 21 6.8 19.1 4.9ZM12 20.3C10.5 20.3 9 19.9 7.7 19.1L7.4 18.9L4.4 19.7L5.2 16.8L5 16.5C4.1 15.2 3.7 13.6 3.7 12C3.7 7.4 7.4 3.7 12 3.7C14.2 3.7 16.3 4.6 17.9 6.1C19.4 7.7 20.3 9.8 20.3 12C20.3 16.6 16.6 20.3 12 20.3ZM16.6 14.2C16.3 14.1 15.1 13.5 14.8 13.4C14.6 13.3 14.5 13.3 14.3 13.5C14.1 13.8 13.7 14.3 13.6 14.5C13.4 14.6 13.3 14.7 13.1 14.5C12.8 14.4 12 14.1 11 13.3C10.3 12.6 9.8 11.8 9.6 11.5C9.5 11.3 9.6 11.2 9.7 11.1C9.8 11 9.9 10.8 10.1 10.7C10.2 10.5 10.3 10.4 10.3 10.3C10.4 10.1 10.3 10 10.3 9.9C10.2 9.8 9.7 8.6 9.5 8.1C9.3 7.6 9.1 7.7 9 7.7C8.8 7.7 8.7 7.7 8.5 7.7C8.3 7.7 8.1 7.8 7.9 8C7.6 8.3 7 8.9 7 10.1C7 11.3 7.9 12.5 8 12.6C8.2 12.8 9.7 15.1 12 16.1C13.9 16.9 14.3 16.7 14.8 16.7C15.3 16.6 16.3 16 16.5 15.4C16.8 14.8 16.8 14.3 16.7 14.2C16.8 14.3 16.8 14.2 16.6 14.2Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'snapchat':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FFFC00" />
          <path
            d="M12 4.5C9.8 4.5 8 6.1 8 8.4C8 9.2 8.2 9.9 8.5 10.4C8.2 10.5 7.9 10.7 7.7 11.1C7.5 11.5 7.7 11.8 8.1 11.9C8.4 12 8.7 11.8 8.9 11.6C9.1 12.6 9.8 13.5 10.8 13.8C10.4 14.2 9.8 14.5 8.9 14.6C8.5 14.6 8.3 14.9 8.4 15.2C8.6 15.6 9.4 15.9 10.4 15.9C10.7 16.3 10.5 17 9.8 17.5C9.2 17.9 8.4 18.2 8.3 18.6C8.2 18.9 8.6 19.3 9.4 19.4C10.4 19.5 11.3 19.1 12 19.1C12.7 19.1 13.6 19.5 14.6 19.4C15.4 19.3 15.8 18.9 15.7 18.6C15.6 18.2 14.8 17.9 14.2 17.5C13.5 17 13.3 16.3 13.6 15.9C14.6 15.9 15.4 15.6 15.6 15.2C15.7 14.9 15.5 14.6 15.1 14.6C14.2 14.5 13.6 14.2 13.2 13.8C14.2 13.5 14.9 12.6 15.1 11.6C15.3 11.8 15.6 12 15.9 11.9C16.3 11.8 16.5 11.5 16.3 11.1C16.1 10.7 15.8 10.5 15.5 10.4C15.8 9.9 16 9.2 16 8.4C16 6.1 14.2 4.5 12 4.5Z"
            fill="#000000"
          />
        </svg>
      );

    case 'x-twitter':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path
            d="M17.5 4H19.9L14.7 9.9L20.8 18H16L12.2 13.1L7.9 18H5.5L11 11.7L5.2 4H10.1L13.6 8.6L17.5 4ZM16.7 16.6H18L9.4 5.3H8L16.7 16.6Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'threads':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#101010" />
          <path
            d="M15.3 11.5C15.2 9.3 13.8 8.1 11.9 8.1C9.7 8.1 8.2 9.8 8.2 12C8.2 14.2 9.6 15.9 12 15.9C13.4 15.9 14.5 15.2 15 14.2L16.4 15.1C15.5 16.5 13.9 17.5 12 17.5C8.8 17.5 6.6 15.1 6.6 12C6.6 8.9 8.9 6.5 12.1 6.5C15.1 6.5 16.9 8.4 17 11.5V12.1C17 13.9 16.2 14.9 14.7 14.9C13.7 14.9 13 14.3 13 13.3V10.7H11.7C10.7 10.7 9.9 11.3 9.9 12.2C9.9 13.1 10.6 13.7 11.6 13.7C12.4 13.7 13 13.3 13.3 12.8V12C13.3 11 13.8 10 14.8 10C15.4 10 15.7 10.4 15.7 11.2V11.5H15.3ZM11.6 12.3C11.3 12.3 11.1 12.1 11.1 11.8C11.1 11.5 11.3 11.3 11.6 11.3H12V12.2C11.9 12.3 11.8 12.3 11.6 12.3Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'pinterest':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#BD081C" />
          <path
            d="M12 3C7 3 3 7 3 12C3 15.8 5.4 19 8.8 20.3C8.7 19.5 8.5 18.2 8.7 17.3C8.9 16.5 10 11.8 10 11.8C10 11.8 9.7 11.2 9.7 10.3C9.7 8.9 10.5 7.8 11.6 7.8C12.5 7.8 12.9 8.5 12.9 9.3C12.9 10.2 12.3 11.6 12 12.8C11.8 13.8 12.5 14.6 13.5 14.6C15.3 14.6 16.7 12.7 16.7 10C16.7 7.5 15 5.8 12.4 5.8C9.3 5.8 7.5 8.1 7.5 10.5C7.5 11.4 7.8 12.4 8.3 13C8.4 13.1 8.4 13.2 8.4 13.4C8.3 13.8 8.1 14.6 8 14.8C7.9 15 7.7 15.1 7.5 15C6.1 14.4 5.2 12.3 5.2 10.6C5.2 7.1 7.7 4 12.7 4C16.7 4 19.8 6.8 19.8 10.5C19.8 14.4 17.3 17.5 13.8 17.5C12.6 17.5 11.5 16.9 11.1 16.1L10.3 19.2C10 20.4 9.1 21.9 8.5 22.8C9.6 23.1 10.8 23.3 12 23.3C17.5 23.3 22 18.8 22 13.3C22 7.8 17.5 3 12 3Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0A66C2" />
          <path
            d="M6.5 8.5H3.5V19.5H6.5V8.5ZM5 3.5C4 3.5 3.2 4.3 3.2 5.3C3.2 6.3 4 7.1 5 7.1C6 7.1 6.8 6.3 6.8 5.3C6.8 4.3 6 3.5 5 3.5ZM20.8 13.8C20.8 10.6 19.1 9.1 16.8 9.1C15 9.1 14.2 10.1 13.7 10.8V8.5H10.7C10.7 9.3 10.7 19.5 10.7 19.5H13.7V13.4C13.7 13.1 13.7 12.7 13.8 12.5C14.1 11.7 14.8 10.9 16 10.9C17.5 10.9 18.1 12.1 18.1 13.8V19.5H21.1V13.8H20.8Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'reddit':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FF4500" />
          <path
            d="M20.5 11.8C20.5 10.8 19.7 10 18.7 10C18.2 10 17.8 10.2 17.5 10.5C16.2 9.6 14.5 9 12.6 9L13.7 4L17.1 4.7C17.2 5.4 17.9 6 18.7 6C19.6 6 20.3 5.3 20.3 4.4C20.3 3.5 19.6 2.8 18.7 2.8C18 2.8 17.4 3.3 17.2 3.9L13.3 3.1C13.1 3.1 12.9 3.2 12.8 3.4L11.5 9C9.5 9 7.8 9.6 6.5 10.5C6.2 10.2 5.8 10 5.3 10C4.3 10 3.5 10.8 3.5 11.8C3.5 12.5 3.9 13.1 4.5 13.4C4.4 13.8 4.4 14.1 4.4 14.5C4.4 18.1 7.8 21 12 21C16.2 21 19.6 18.1 19.6 14.5C19.6 14.1 19.6 13.8 19.5 13.4C20.1 13.1 20.5 12.5 20.5 11.8ZM8.5 13.5C9.3 13.5 10 14.2 10 15C10 15.8 9.3 16.5 8.5 16.5C7.7 16.5 7 15.8 7 15C7 14.2 7.7 13.5 8.5 13.5ZM14.9 18.2C14.1 18.7 13.1 18.9 12 18.9C10.9 18.9 9.9 18.7 9.1 18.2C8.9 18.1 8.8 17.8 9 17.6C9.2 17.4 9.5 17.4 9.7 17.5C10.3 17.9 11.1 18.1 12 18.1C12.9 18.1 13.7 17.9 14.3 17.5C14.5 17.4 14.8 17.4 15 17.6C15.2 17.8 15.1 18.1 14.9 18.2ZM15.5 16.5C14.7 16.5 14 15.8 14 15C14 14.2 14.7 13.5 15.5 13.5C16.3 13.5 17 14.2 17 15C17 15.8 16.3 16.5 15.5 16.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // --- COMMUNICATION ---
    case 'telegram':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#26A5E4" />
          <path
            d="M5.2 11.7L18.1 6.8C18.7 6.6 19.2 7 19 7.6L16.8 17.1C16.7 17.6 16.3 17.8 15.9 17.5L12.7 15.1L11.2 16.6C11 16.8 10.8 17 10.4 17L10.6 13.9L16.2 8.9C16.4 8.7 16.2 8.6 15.9 8.8L9 13.1L6 12.2C5.3 12 5.3 11.5 6.1 11.2L5.2 11.7Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'discord':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#5865F2" />
          <path
            d="M17.5 5.5C16.3 4.9 15 4.5 13.7 4.3C13.5 4.6 13.3 5 13.2 5.4C11.8 5.2 10.4 5.2 9 5.4C8.9 5 8.7 4.6 8.5 4.3C7.2 4.5 5.9 4.9 4.7 5.5C2.5 8.8 1.9 12 2.2 15.1C3.6 16.2 5 16.8 6.3 17.2C6.6 16.8 6.9 16.3 7.2 15.8C6.7 15.6 6.3 15.4 5.8 15.1C5.9 15 6.1 14.9 6.2 14.8C9.5 16.3 13.1 16.3 16.4 14.8C16.5 14.9 16.7 15 16.8 15.1C16.4 15.4 15.9 15.6 15.4 15.8C15.7 16.3 16 16.8 16.3 17.2C17.6 16.8 19 16.2 20.4 15.1C20.8 11.4 19.7 8.3 17.5 5.5ZM8.5 13.3C7.6 13.3 6.9 12.5 6.9 11.5C6.9 10.5 7.6 9.7 8.5 9.7C9.4 9.7 10.1 10.5 10.1 11.5C10.1 12.5 9.4 13.3 8.5 13.3ZM14.1 13.3C13.2 13.3 12.5 12.5 12.5 11.5C12.5 10.5 13.2 9.7 14.1 9.7C15 9.7 15.7 10.5 15.7 11.5C15.7 12.5 15 13.3 14.1 13.3Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'messenger':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#00B2FF" />
          <path
            d="M12 3C7 3 3 6.8 3 11.6C3 14.3 4.3 16.7 6.4 18.2V21L9.1 19.5C10 19.8 11 20 12 20C17 20 21 16.2 21 11.4C21 6.8 17 3 12 3ZM13 13.8L10.8 11.4L6.6 13.8L11.2 9L13.4 11.4L17.4 9L13 13.8Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'gmail':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F8FAFC" />
          <path d="M4 18V8L12 14L20 8V18H4Z" fill="#EA4335" />
          <path d="M4 6.5C4 5.7 4.7 5 5.5 5H7L12 9L17 5H18.5C19.3 5 20 5.7 20 6.5V8L12 14L4 8V6.5Z" fill="#C5221F" />
          <path d="M4 8L12 14L10 15.5L4 11V8Z" fill="#4285F4" opacity="0.4" />
          <path d="M20 8L12 14L14 15.5L20 11V8Z" fill="#34A853" opacity="0.4" />
        </svg>
      );

    case 'google-meet':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#00897B" />
          <rect x="5" y="7" width="9" height="10" rx="2" fill="#FFFFFF" />
          <polygon points="15,10 19,7 19,17 15,14" fill="#FFFFFF" />
        </svg>
      );

    case 'ms-teams':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#6264A7" />
          <circle cx="15.5" cy="8.5" r="2" fill="#FFFFFF" opacity="0.8" />
          <path d="M13.5 12H17.5C18.3 12 19 12.7 19 13.5V16H13.5V12Z" fill="#FFFFFF" opacity="0.8" />
          <circle cx="9" cy="7.5" r="2.5" fill="#FFFFFF" />
          <path d="M6 12H12C12.8 12 13.5 12.7 13.5 13.5V18.5H4.5V13.5C4.5 12.7 5.2 12 6 12Z" fill="#FFFFFF" />
        </svg>
      );

    // --- ENTERTAINMENT ---
    case 'youtube':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path
            d="M20.5 7.5C20.3 6.6 19.6 5.9 18.7 5.7C17.1 5.3 12 5.3 12 5.3C12 5.3 6.9 5.3 5.3 5.7C4.4 5.9 3.7 6.6 3.5 7.5C3.1 9.1 3.1 12 3.1 12C3.1 12 3.1 14.9 3.5 16.5C3.7 17.4 4.4 18.1 5.3 18.3C6.9 18.7 12 18.7 12 18.7C12 18.7 17.1 18.7 18.7 18.3C19.6 18.1 20.3 17.4 20.5 16.5C20.9 14.9 20.9 12 20.9 12C20.9 12 20.9 9.1 20.5 7.5ZM10.2 15.1V8.9L15.6 12L10.2 15.1Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'spotify':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1DB954" />
          <path
            d="M17.8 15.6C17.5 16 17 16.1 16.6 15.9C13.8 14.2 10.3 13.8 6.2 14.7C5.7 14.8 5.3 14.5 5.2 14C5.1 13.5 5.4 13.1 5.9 13C10.4 12 14.3 12.4 17.5 14.4C17.9 14.6 18 15.1 17.8 15.6ZM19 12.8C18.6 13.4 17.8 13.6 17.2 13.2C14.2 11.3 9.6 10.7 6 11.8C5.3 12 4.6 11.6 4.4 10.9C4.2 10.2 4.6 9.5 5.3 9.3C9.5 8 14.7 8.7 18.2 10.9C18.8 11.2 19 12.1 19 12.8ZM19.2 9.8C15.4 7.6 9.1 7.4 5.4 8.5C4.8 8.7 4.2 8.3 4 7.7C3.8 7.1 4.2 6.5 4.8 6.3C9.1 5 16.1 5.2 20.5 7.8C21.1 8.1 21.3 8.9 20.9 9.5C20.6 10.1 19.8 10.2 19.2 9.8Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'netflix':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#141414" />
          <path d="M6 3.5H9V20.5H6V3.5Z" fill="#E50914" />
          <path d="M15 3.5H18V20.5H15V3.5Z" fill="#E50914" />
          <path d="M6 3.5L15 20.5H18L9 3.5H6Z" fill="#B81D24" />
        </svg>
      );

    case 'twitch':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#9146FF" />
          <path
            d="M5 4.5L3.5 8V18.5H7.5V21H10L12.5 18.5H15.5L20.5 13.5V4.5H5ZM18.5 12.5L15.5 15.5H12L9.5 18V15.5H7V6.5H18.5V12.5ZM15 9H13.5V13.5H15V9ZM10.5 9H9V13.5H10.5V9Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // --- PRODUCTIVITY ---
    case 'google-drive':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F8FAFC" />
          <polygon points="9.5,4 14.5,4 20,13.5 15,13.5" fill="#FFBA00" />
          <polygon points="4,13.5 9,4.5 14.5,14 9.5,23" fill="#00AC47" />
          <polygon points="9,20 19,20 22,14.5 12,14.5" fill="#0066DA" />
        </svg>
      );

    case 'google-docs':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#4285F4" />
          <rect x="6" y="5" width="12" height="14" rx="1.5" fill="#FFFFFF" />
          <line x1="8.5" y1="9" x2="15.5" y2="9" stroke="#4285F4" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="8.5" y1="12" x2="15.5" y2="12" stroke="#4285F4" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="8.5" y1="15" x2="12.5" y2="15" stroke="#4285F4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'google-sheets':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0F9D58" />
          <rect x="6" y="5" width="12" height="14" rx="1.5" fill="#FFFFFF" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="#0F9D58" strokeWidth="1.4" />
          <line x1="8.5" y1="10.5" x2="15.5" y2="10.5" stroke="#0F9D58" strokeWidth="1.4" />
          <line x1="8.5" y1="13.5" x2="15.5" y2="13.5" stroke="#0F9D58" strokeWidth="1.4" />
        </svg>
      );

    case 'google-calendar':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FFFFFF" />
          <path d="M5 8H19V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V8Z" fill="#4285F4" />
          <path d="M5 6C5 4.9 5.9 4 7 4H17C18.1 4 19 4.9 19 6V8H5V6Z" fill="#EA4335" />
          <text x="12" y="16" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">31</text>
        </svg>
      );

    case 'notion':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path
            d="M5.5 5.2L16 4.3C17.2 4.2 17.8 4.7 18.4 5.6L20 8.1V18.8C20 19.7 19.3 20.3 18.3 20.4L7.5 21C6.5 21.1 5.8 20.5 5.4 19.6L4 16.5V6.7C4 5.8 4.6 5.3 5.5 5.2ZM7.7 8.3V17.8H9.8V11.2L14.7 17.8H16.8V8.3H14.7V14.6L10 8.3H7.7Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'ms-word':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#185ABD" />
          <rect x="7" y="5" width="12" height="14" rx="1.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="4" y="7" width="8" height="10" rx="1.5" fill="#103F80" />
          <text x="8" y="14.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">W</text>
        </svg>
      );

    case 'ms-excel':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#107C41" />
          <rect x="7" y="5" width="12" height="14" rx="1.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="4" y="7" width="8" height="10" rx="1.5" fill="#0A4D28" />
          <text x="8" y="14.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">X</text>
        </svg>
      );

    // --- DEVELOPMENT ---
    case 'github':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#181717" />
          <path
            d="M12 4C7.6 4 4 7.6 4 12C4 15.5 6.3 18.5 9.5 19.6C9.9 19.7 10 19.4 10 19.2V17.8C7.8 18.3 7.3 16.8 7.3 16.8C6.9 15.9 6.4 15.6 6.4 15.6C5.7 15.1 6.5 15.1 6.5 15.1C7.3 15.2 7.7 16 7.7 16C8.4 17.2 9.5 16.9 10 16.7C10.1 16.2 10.3 15.8 10.5 15.5C8.7 15.3 6.8 14.6 6.8 11.5C6.8 10.6 7.1 9.9 7.7 9.3C7.6 9.1 7.3 8.2 7.8 7.2C7.8 7.2 8.5 7 10 8C10.7 7.8 11.4 7.7 12.1 7.7C12.8 7.7 13.5 7.8 14.2 8C15.7 7 16.4 7.2 16.4 7.2C16.9 8.2 16.6 9.1 16.5 9.3C17.1 9.9 17.4 10.6 17.4 11.5C17.4 14.6 15.5 15.3 13.7 15.5C14 15.8 14.2 16.3 14.2 17.1V19.2C14.2 19.4 14.3 19.7 14.7 19.6C17.9 18.5 20.2 15.5 20.2 12C20.2 7.6 16.5 4 12 4Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'stackoverflow':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F48024" />
          <path
            d="M17.5 18.5V14.5H19.5V20.5H4.5V14.5H6.5V18.5H17.5ZM8 16.5H16V14.5H8V16.5ZM8.3 12.1L15.9 13.7L16.3 11.8L8.7 10.2L8.3 12.1ZM9.6 7.9L16.4 11.4L17.3 9.6L10.5 6.1L9.6 7.9ZM12.2 4.1L17.7 9.4L19.1 8L13.6 2.7L12.2 4.1Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'codepen':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path
            d="M12 4.5L5 9.2V14.8L12 19.5L19 14.8V9.2L12 4.5ZM12 6.8L16.3 9.7L14 11.3L12 9.9L10 11.3L7.7 9.7L12 6.8ZM6.8 10.7L8.6 11.9L6.8 13.1V10.7ZM12 17.2L7.7 14.3L10 12.7L12 14.1L14 12.7L16.3 14.3L12 17.2ZM17.2 13.1L15.4 11.9L17.2 10.7V13.1Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'replit':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F26207" />
          <path
            d="M5.5 6.5H11.5V10.5H5.5V6.5ZM11.5 10.5H17.5V14.5H11.5V10.5ZM5.5 14.5H11.5V18.5H5.5V14.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // --- AI TOOLS ---
    case 'chatgpt':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#10A37F" />
          <path
            d="M18.8 9.5C18.6 7.6 17.2 6.1 15.3 5.8C15 5 14.3 4.4 13.5 4.1C11.6 3.4 9.5 4.2 8.6 5.9C7 6.2 5.8 7.6 5.8 9.3C5.8 9.8 6 10.3 6.2 10.7C5.7 11.8 5.8 13.1 6.5 14C7.2 15 8.4 15.6 9.7 15.6C10 16.4 10.7 17 11.5 17.3C13.4 18 15.5 17.2 16.4 15.5C18 15.2 19.2 13.8 19.2 12.1C19.2 11.2 18.8 10.3 18.2 9.7L18.8 9.5ZM12.7 16.4C12.3 16.6 11.8 16.6 11.4 16.4L13.8 12.3L15.4 13.2C15.6 14.6 14.3 16 12.7 16.4ZM7.4 12.3C7.2 11.5 7.6 10.7 8.3 10.3L11.5 12.1L10 14.7C8.6 14.4 7.6 13.4 7.4 12.3ZM8.3 7.8C9.2 7.3 10.3 7.5 10.8 8.4L13.2 12.5L11.6 13.4C10.5 12.6 8.9 11.6 8.3 7.8ZM16.6 11.7C16.8 12.5 16.4 13.3 15.7 13.7L12.5 11.9L14 9.3C15.4 9.6 16.4 10.6 16.6 11.7Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'gemini':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <path
            d="M12 3C12 7.97 7.97 12 3 12C7.97 12 12 16.03 12 21C12 16.03 16.03 12 21 12C16.03 12 12 7.97 12 3Z"
            fill="url(#gemini-grad)"
          />
          <defs>
            <linearGradient id="gemini-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" />
              <stop offset="0.5" stopColor="#9B72CF" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'claude':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#D97706" />
          <path
            d="M12.8 5.2L15.9 17.5H13.6L12.8 13.8H9.3L8.5 17.5H6.2L9.3 5.2H12.8ZM12.3 11.8L11.1 7.2L9.8 11.8H12.3ZM17.2 8.5C18.2 9.5 18.7 10.8 18.7 12.2C18.7 13.7 18.1 14.9 17.1 15.8L16.1 14.5C16.7 13.9 17 13.1 17 12.2C17 11.3 16.7 10.5 16.1 9.9L17.2 8.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'perplexity':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#132B32" />
          <path
            d="M12 4V9.5M12 14.5V20M6 8L12 12M18 8L12 12M6 16L12 12M18 16L12 12M6 8V16M18 8V16"
            stroke="#20B2AA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'deepseek':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1E2A4A" />
          <path
            d="M6 15C6 11.5 8.5 7 12 7C15.5 7 18 11.5 18 15C18 17.5 15.5 18.5 12 18.5C8.5 18.5 6 17.5 6 15Z"
            stroke="#4D6BFE"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="10" cy="13" r="1.5" fill="#4D6BFE" />
          <circle cx="14" cy="13" r="1.5" fill="#4D6BFE" />
          <path d="M11 16C11.5 16.5 12.5 16.5 13 16" stroke="#4D6BFE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: pixelSize, height: pixelSize }}
          className={`flex items-center justify-center rounded-lg bg-slate-800 text-white ${className}`}
        >
          <Globe size={size * 0.6} />
        </div>
      );
  }
};

