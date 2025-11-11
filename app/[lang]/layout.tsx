import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"

import '../globals.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Providers } from '../providers';
import { getTranslation } from '../../lib/getTranslation';
import { Locale, i18n } from '../../i18n-config';
import PageTransition from '../../components/PageTransition';
import AiChatWidgetLoader from '../components/AiChatWidgetLoader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
});

// Statically generate routes for all languages
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(lang);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('site.title'),
      template: `%s | ${t('site.name')}`,
    },
    description: t('site.blurb'),
    openGraph: {
      title: t('site.title'),
      description: t('site.blurb'),
      url: `${baseUrl}/${lang}`,
      siteName: t('site.name'),
      images: [
        {
          url: '/ogimg.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('site.title'),
      description: t('site.blurb'),
      images: ['/ogimg.png'],
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

/* ==================
   Root Layout
   ================== */
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${instrument.variable} bg-background font-sans text-foreground`}>
        <Providers>
          <Navbar lang={params.lang} />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer lang={params.lang} />
          <AiChatWidgetLoader />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
