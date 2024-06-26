import style from "./Pagination.module.css";
import React from "react";

interface PaginationProps {
  page: (pageNumber: number) => void;
  total: number;
  currentPage: number;
}

export default function Pagination({
  page,
  total,
  currentPage,
}: PaginationProps) {
  const getPageNumbers = (): number[] => {
    const totalPageNumbers: number = 5;
    const totalButtonsToShow: number = Math.min(totalPageNumbers, total);

    const halfButtonsToShow: number = Math.floor(totalButtonsToShow / 2);
    let startPage: number = Math.max(1, currentPage - halfButtonsToShow);
    let endPage: number = Math.min(total, currentPage + halfButtonsToShow);

    if (currentPage - halfButtonsToShow <= 0) {
      endPage = totalButtonsToShow;
    }

    if (currentPage + halfButtonsToShow > total) {
      startPage = total - totalButtonsToShow + 1;
    }

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const visiblePageNumbers: number[] = getPageNumbers();

  return (
    <div className="d-flex justify-content-center gap-2  m-4 ">
      {currentPage > 1 && (
        <button
          onClick={() => page(currentPage - 1)}
          className="btn btn-outline-primary btn-sm"
        >
          {"<"}
        </button>
      )}
      {visiblePageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => page(pageNumber)}
          className={`btn btn-outline-primary btn-sm ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < total && (
        <button
          onClick={() => page(currentPage + 1)}
          className="btn btn-outline-primary btn-sm"
        >
          {">"}
        </button>
      )}
    </div>
  );
}
