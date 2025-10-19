'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Route } from 'next';          // <-- ini kuncinya
import { site } from '../content/config';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Pastikan setiap href dikenali sebagai Route
  const links: Array<{ href: Route; label: string }> = [
    { href: '/' as Route, label: 'Home' },
    { href: '/services' as Route, label: 'Services' },
    { href: '/portfolio' as Route, label: 'Portfolio' },
    { href: '/about' as Route, label: 'About' },
    { href: '/blog' as Route, label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Image
            src="/icon.png"         // atau /logo.svg
            alt={`${site.company} logo`}
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span>{site.company}</span>
        </Link>


        {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map(l => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
            >
              Start a Project
            </Link>
          </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-[var(--brown)] text-[var(--brown)] bg-[var(--cream)] hover:bg-[var(--tan)] transition"
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
        <div id="primary-nav" className="md:hidden border-t bg-white">
          <nav className="container py-3 flex flex-col gap-3 text-sm">
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
            <Link
              href={'/contact' as Route}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-full bg-black text-white text-center"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
