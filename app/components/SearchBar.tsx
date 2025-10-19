"use client";

import { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Cari artikel berdasarkan judul..."
        className="w-full rounded-full border border-gray-300 bg-white py-3 pl-5 pr-12 text-gray-700 shadow-sm focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 transition-colors"
        style={{borderColor: '#D2B48C'}}
      />
      <svg 
        className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
  );
}

