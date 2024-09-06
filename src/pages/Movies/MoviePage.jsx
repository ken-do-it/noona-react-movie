import { React, useState, useEffect } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovies.js';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard.jsx';
import Pagination from 'react-bootstrap/Pagination';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1); // 페이지 상태
  const keyword = query.get("q"); // 검색어 가져오기

  useEffect(() => {
    setPage(1); // 검색어가 변경되면 페이지를 1로 초기화
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  // 페이지 클릭 핸들러
  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  // 맨 앞으로 가기 핸들러
  const handleFirstPage = () => {
    setPage(1);
  };

  // 맨 뒤로 가기 핸들러
  const handleLastPage = () => {
    setPage(data?.total_pages);
  };

  // 한번에 보여줄 페이지의 범위 계산
  const pageRange = 10; // 한 번에 10개의 페이지만 표시
  const startPage = Math.max(1, page - Math.floor(pageRange / 2));
  const endPage = Math.min(startPage + pageRange - 1, data?.total_pages);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!keyword || data?.results.length === 0) {
    return (
      <Container>
        <Row>
          <Col className="text-center my-5">
            <h3>검색 결과가 없습니다</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} xs={12}>필터</Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => 
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              )}
            </Row>

            {/* 페이지네이션 */}
            <Pagination className="pagination">
              <Pagination.First onClick={handleFirstPage}  disabled={page === 1}/>
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

              <Pagination.Next onClick={() => handlePageClick(page + 1)} disabled={page === data?.total_pages} />
              <Pagination.Last onClick={handleLastPage}  disabled={page === data?.total_pages} />
            </Pagination>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
