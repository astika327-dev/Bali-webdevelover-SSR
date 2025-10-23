import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { supportedLangs } from './constants/langs';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid.
  if (!supportedLangs.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale as string, // Assert type to satisfy TypeScript
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
