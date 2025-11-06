'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Route } from 'next';
import { site } from '../content/config';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/' as Route, label: 'Home' },
    { href: '/about' as Route, label: 'About' },
    { href: '/services' as Route, label: 'Services' },
    { href: '/portfolio' as Route, label: 'Portfolio' },
    { href: '/blog' as Route, label: 'Blog' },
    { href: '/tensorflow' as Route, label: 'TensorFlow' },
    { href: '/contact' as Route, label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b dark:border-neutral-800">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight dark:text-white">
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
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
