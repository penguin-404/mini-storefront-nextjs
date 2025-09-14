import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md text-gray-700 bg-white disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md text-gray-700 bg-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;