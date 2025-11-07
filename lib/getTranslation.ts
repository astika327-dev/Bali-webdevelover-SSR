import 'server-only';
import fs from 'fs';
import path from 'path';
import { Locale } from '@/i18n-config';

// Cache the dictionaries in memory
const dictionaries: Record<Locale, any> = {
  en: null,
  id: null,
};

const loadDictionary = (locale: Locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale];
  }
  const filePath = path.join(process.cwd(), `public/locales/${locale}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  dictionaries[locale] = JSON.parse(fileContent);
  return dictionaries[locale];
};


/**
 * Returns a translation function `t` for the given language.
 * This function handles nested keys (e.g., "hero.title").
 * @param {Locale} lang - The language code ('en' or 'id').
 * @returns {function(string): string} A function that takes a key and returns the translation.
 */
export const getTranslation = (lang: Locale) => {
  const dictionary = loadDictionary(lang);

  return (key: string): string => {
    // Traverse nested keys (e.g., "hero.title")
    const keys = key.split('.');
    let result = dictionary;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // If key not found, return the key itself as a fallback
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };
};
