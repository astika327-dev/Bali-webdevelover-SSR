"use client";

import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Copy, Send } from 'lucide-react';
import { site } from '@/content/config';

type SocialShareButtonsProps = {
  title: string;
  slug: string;
};

const SocialShareButtons = ({ title, slug }: SocialShareButtonsProps) => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client-side where `window` is available.
    const currentUrl = `${window.location.origin}/blog/${slug}`;
    setUrl(currentUrl);
  }, [slug]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyToClipboard = (text: string, platform: string = 'link') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnInstagram = async () => {
    const shareData = {
      title: title,
      text: title,
      url: url,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copy if user cancels share dialog
        copyToClipboard(url, 'instagram');
      }
    } else {
      copyToClipboard(url, 'instagram');
    }
  };

  const openPopup = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#166eDb]',
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1a91da]',
    },
    {
        name: 'WhatsApp',
        icon: <Send size={24} />, // Using Send icon as WhatsApp is not in lucide-react
        url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        color: 'bg-[#25D366] hover:bg-[#20b958]',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      action: shareOnInstagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90',
    },
  ];

  return (
    <>
      {/* Desktop: Floating Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => (platform.action ? platform.action() : openPopup(platform.url))}
            aria-label={`Share on ${platform.name}`}
            className={`p-3 rounded-full text-white transition-transform transform hover:scale-110 ${platform.color}`}
          >
            {platform.icon}
          </button>
        ))}
        <button
          onClick={() => copyToClipboard(url)}
          aria-label="Copy link"
          className="p-3 rounded-full text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-transform transform hover:scale-110"
        >
          <Copy size={24} />
        </button>
        {copied && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg">
            Link disalin!
          </div>
        )}
      </div>

      {/* Mobile: Static Bar below article */}
      <div className="flex flex-col items-center justify-center gap-4 mt-12 md:hidden">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Bagikan Artikel Ini</h3>
        <div className="flex items-center justify-center gap-3">
            {socialPlatforms.map((platform) => (
            <button
                key={platform.name}
                onClick={() => (platform.action ? platform.action() : openPopup(platform.url))}
                aria-label={`Share on ${platform.name}`}
                className={`p-3 rounded-full text-white transition-transform transform hover:scale-110 ${platform.color}`}
            >
                {platform.icon}
            </button>
            ))}
            <button
                onClick={() => copyToClipboard(url)}
                aria-label="Copy link"
                className="p-3 rounded-full text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-transform transform hover:scale-110"
            >
                <Copy size={24} />
            </button>
        </div>
        {copied && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Link berhasil disalin ke clipboard!
            </div>
        )}
      </div>
    </>
  );
};

export default SocialShareButtons;
