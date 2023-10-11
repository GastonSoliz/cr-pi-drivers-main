import { useEffect } from "react";
import style from "./Pagination.module.css";

export default function Pagination({ page, total, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  const maxButtons = 9;
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(currentPage - Math.floor(maxButtons / 2), 0),
    Math.min(currentPage + Math.floor(maxButtons / 2), total)
  );

  // useEffect(() => {
  //   console.log(currentPage);
  // }, [currentPage]);

  //COMO FUNCIONA ESTO? CHATGPT

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
