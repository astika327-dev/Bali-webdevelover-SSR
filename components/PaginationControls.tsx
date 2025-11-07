'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Locale } from '@/i18n-config';

interface PaginationControlsProps {
  totalCount: number;
  currentPage: number;
  limit: number;
  lang: Locale;
  pageText: string;
  ofText: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  totalCount,
  currentPage,
  limit,
  lang,
  pageText,
  ofText
 }) => {
  const totalPages = Math.ceil(totalCount / limit);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <Link href={`/${lang}/blog?page=${currentPage - 1}`} passHref>
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          disabled={isFirstPage}
        >
          {pageText} Sebelumnya
        </button>
      </Link>

      <span className="text-gray-600">
        {pageText} {currentPage} {ofText} {totalPages}
      </span>

      <Link href={`/${lang}/blog?page=${currentPage + 1}`} passHref>
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          disabled={isLastPage}
        >
          {pageText} Selanjutnya
        </button>
      </Link>
    </div>
  );
};

export default PaginationControls;
