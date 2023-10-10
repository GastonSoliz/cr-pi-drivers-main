export default function Pagination({ page, total }) {
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => page(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
