import { getTranslation } from '@/lib/getTranslation';

export default function PrivacyPage() {
  const t = getTranslation('id');

  const getText = (key: string): string => {
    return t[key] || key;
  };

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{getText('privacy.title')}</h1>
      <div className="prose max-w-none mt-4">
        <p>{getText('privacy.p1')}</p>
        <p>{getText('privacy.p2')}</p>
      </div>
    </section>
  );
}
