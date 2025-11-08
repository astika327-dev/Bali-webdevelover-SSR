'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Route } from 'next';
import { site } from '../content/config';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Locale } from '../i18n-config';

// Karena ini adalah komponen klien, kita tidak bisa menggunakan getTranslation di sini.
// Kita akan meneruskan terjemahan dari komponen server.
// Namun, untuk Navbar, lebih mudah untuk melakukan hardcode pada beberapa label kunci
// atau membuat komponen terpisah untuk tautan navigasi.
// Untuk saat ini, kita akan menggunakan pendekatan campuran.

export default function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);

  // Terjemahan untuk label navigasi bisa dikelola di sini atau diteruskan
  const navTranslations: Record<string, Record<Locale, string>> = {
    home: { en: 'Home', id: 'Beranda' },
    about: { en: 'About', id: 'Tentang' },
    services: { en: 'Services', id: 'Layanan' },
    portfolio: { en: 'Portfolio', id: 'Portofolio' },
    blog: { en: 'Blog', id: 'Blog' },
    tensorflow: { en: 'TensorFlow', id: 'TensorFlow' },
    contact: { en: 'Contact', id: 'Kontak' },
  };

  const links = [
    { href: `/${lang}` as Route, label: navTranslations.home[lang] },
    { href: `/${lang}/about` as Route, label: navTranslations.about[lang] },
    { href: `/${lang}/services` as Route, label: navTranslations.services[lang] },
    { href: `/${lang}/portfolio` as Route, label: navTranslations.portfolio[lang] },
    { href: `/${lang}/blog` as Route, label: navTranslations.blog[lang] },
    { href: `/${lang}/tensorflow` as Route, label: navTranslations.tensorflow[lang] },
    { href: `/${lang}/contact` as Route, label: navTranslations.contact[lang] },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b dark:border-neutral-800">
      <div className="container flex items-center justify-between py-3">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-semibold tracking-tight dark:text-white">
          <Image
            src="/icon.png"
            alt={`${site.company} logo`}
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span>{site.company}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm dark:text-neutral-200">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link-underline">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          aria-controls="primary-nav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="primary-nav" className="md:hidden border-t dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <nav className="container py-3 flex flex-col gap-3 text-sm dark:text-neutral-200">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
