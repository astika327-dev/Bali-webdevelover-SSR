"use client";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onFilter: (category: string) => void;
}

export default function FilterTabs({ categories, activeCategory, onFilter }: FilterTabsProps) {
  // Gabungkan 'All' dengan kategori unik dari artikel
  const allTabs = ['All', ...categories];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {allTabs.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200
            ${activeCategory === category
              ? 'bg-amber-800 text-white shadow-md' // Style untuk tab yang aktif
              : 'bg-white text-gray-700 hover:bg-gray-100 border' // Style untuk tab non-aktif
            }`}
          style={activeCategory === category ? {backgroundColor: '#8B4513'} : {}}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

