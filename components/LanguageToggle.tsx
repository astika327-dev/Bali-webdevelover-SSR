'use client';

import { useLanguage } from '@/context/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'en'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'id'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageToggle;