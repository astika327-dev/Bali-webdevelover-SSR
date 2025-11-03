'use client';

import Link from 'next/link';
import { FC } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({ currentPage, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <Link href={`/blog?page=${currentPage - 1}`} passHref>
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          disabled={isFirstPage}
        >
          Previous
        </button>
      </Link>

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Link href={`/blog?page=${currentPage + 1}`} passHref>
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          disabled={isLastPage}
        >
          Next
        </button>
      </Link>
    </div>
  );
};

export default PaginationControls;
