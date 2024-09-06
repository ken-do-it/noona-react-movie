// MoviePagination.jsx
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './MoviePage.style.css'

const MoviePagination = ({ page, handleFirstPage, handleLastPage, handlePageClick, totalPages, endPage, startPage }) => {
  return (
    <Pagination className="pagination">
      <Pagination.First onClick={handleFirstPage} disabled={page === 1}/>
      <Pagination.Prev onClick={() => handlePageClick(page - 1)} disabled={page === 1} />

      {/* 페이지 번호 동적 생성 (한 번에 10페이지만 보여줌) */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={pageNum === page}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handlePageClick(page + 1)} disabled={page === totalPages} />
      <Pagination.Last onClick={handleLastPage} disabled={page === totalPages} />
    </Pagination>
  );
};

export default MoviePagination;
