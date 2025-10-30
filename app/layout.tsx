import './globals.css';
import { site } from '../content/config';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { Analytics } from "@vercel/analytics/next";
import { Providers } from './providers';
import { LanguageProvider } from '../context/LanguageContext';
import type { Metadata } from 'next';
import PageTransition from './components/PageTransition';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bali-webdevelover.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.company} — ${site.tagline}`,
  description: site.blurb,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${site.company} — ${site.tagline}`,
    description: site.blurb,
    url: siteUrl,
    siteName: site.company,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ogimg.png',
        width: 1200,
        height: 630,
        alt: 'Preview — Bali WebDevelover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.company} — ${site.tagline}`,
    description: site.blurb,
    images: ['/ogimg.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <Providers>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>

              <footer className="border-t mt-16 bg-background text-foreground">
                <div className="container py-10 flex flex-col items-center text-center text-sm gap-4">
                  <div>
                    <div className="font-semibold text-lg">{site.company}</div>
                    <p className="text-muted-foreground mt-1">{site.location}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 mt-2">
                    <Link href="/services">Services</Link>
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/terms">Terms</Link>
                  </div>
                </div>

                <div className="border-t border-border">
                  <div className="container py-6 text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                    © {new Date().getFullYear()} {site.company}. Independent boutique web studio based in Bali,
                    focused on building fast, elegant, and conversion-driven websites.
                    We believe a website should not only look professional but also work as a valuable asset
                    that drives measurable results for your company.
                  </div>
                </div>
              </footer>

            </div>
          </LanguageProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}