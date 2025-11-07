
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function PrivacyPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('privacy.title')}</h1>
      <div className="prose max-w-none mt-4">
        <p>{t('privacy.p1')}</p>
        <p>{t('privacy.p2')}</p>
      </div>
    </section>
  );
}
