"use client";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onFilter: (category: string) => void;
}

export default function FilterTabs({ categories, activeCategory, onFilter }: FilterTabsProps) {
  // Buat daftar kategori unik dan pastikan "All" tidak duplikat
  const uniqueCategories = [...new Set(categories)].filter(
    (category) => category.toLowerCase() !== 'all'
  );
  const allTabs = ['All', ...uniqueCategories];

  return (
    <div className="relative w-full">
      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2">
        {allTabs.map((category) => (
          <button
            key={category}
            onClick={() => onFilter(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200
              ${activeCategory === category
                ? 'bg-amber-800 text-white shadow-md'
                : 'border bg-white text-gray-700 hover:bg-gray-100'
              }`}
            style={activeCategory === category ? {backgroundColor: '#8B4513'} : {}}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-white dark:from-gray-900" />
    </div>
  );
}

