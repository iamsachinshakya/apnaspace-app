import React from "react";

export type PaginationProps = {
  /** Number of items currently shown */
  currentCount: number;

  /** Total number of items */
  totalCount: number;

  /** Current page number */
  page: number;

  /** Total number of pages */
  totalPages: number;

  /** Called when page changes */
  onPageChange: (page: number) => void;

  /** Optional search query text */
  searchQuery?: string;

  /** Label for the entity (users, posts, comments, etc.) */
  entityLabel?: string;

  /** Maximum page buttons to show */
  maxPageButtons?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentCount,
  totalCount,
  page,
  totalPages,
  onPageChange,
  searchQuery,
  entityLabel = "items",
  maxPageButtons = 5,
}) => {
  const pages = Array.from(
    { length: Math.min(totalPages, maxPageButtons) },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
      <p className="text-sm text-gray-400">
        Showing {currentCount} of {totalCount} {entityLabel}
        {searchQuery && (
          <span className="ml-1">for &quot;{searchQuery}&quot;</span>
        )}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-lg transition-all text-sm ${
              page === pageNum
                ? "bg-cyan-500 text-white"
                : "bg-gray-700/50 hover:bg-gray-700"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
