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
  const pageNumbers: number[] = [];

  for (let i: number = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  const maxButtons: number = 8;
  const visiblePageNumbers: number[] = pageNumbers.slice(
    Math.max(currentPage - Math.floor(maxButtons / 2), 0),
    Math.min(currentPage + Math.floor(maxButtons / 2), total)
  );

  return (
    <div className={style.paginationContainer}>
      {visiblePageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => page(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
