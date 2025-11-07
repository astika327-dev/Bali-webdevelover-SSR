import Link from 'next/link';
import { site } from '../content/config';
import { Locale } from '../i18n-config';

export default function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t mt-16 bg-background text-foreground">
      <div className="container py-10 flex flex-col items-center text-center text-sm gap-4">
        <div>
          <div className="font-semibold text-lg">{site.company}</div>
          <p className="text-muted-foreground mt-1">{site.location}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link href={`/${lang}/services`}>Services</Link>
          <Link href={`/${lang}/portfolio`}>Portfolio</Link>
          <Link href={`/${lang}/about`}>About</Link>
          <Link href={`/${lang}/blog`}>Blog</Link>
          <Link href={`/${lang}/contact`}>Contact</Link>
          <Link href={`/${lang}/privacy`}>Privacy</Link>
          <Link href={`/${lang}/terms`}>Terms</Link>
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
  );
}
