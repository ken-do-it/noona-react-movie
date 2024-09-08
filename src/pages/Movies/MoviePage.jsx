import React, { useState, useEffect } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovies.js';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard.jsx';
import MovieFilter from './MovieFilter';
import MoviePagination from './MoviePagination';
import './MoviePage.style.css';
import { useMediaQuery } from 'react-responsive'; // 화면 크기 기반 조건부 렌더링

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1); // 페이지 상태
  const [sortOrder, setSortOrder] = useState('default'); // 정렬 상태
  const [genre, setGenre] = useState(''); // 장르 필터 상태
  const keyword = query.get("q") || ""; // 검색어 가져오기 (없을 경우 빈 문자열)
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' }); // 모바일 여부

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
  const pageRange = 5;
  const startPage = Math.max(1, page - Math.floor(pageRange / 2));
  const endPage = Math.min(startPage + pageRange - 1, data?.total_pages);

  // 인기순 정렬 핸들러
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // 장르 필터 핸들러
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  // 영화 데이터를 정렬
  const sortedMovies = () => {
    if (!data?.results) return [];
    let movies = [...data.results];
    if (sortOrder === 'popularity_desc') {
      movies.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOrder === 'popularity_asc') {
      movies.sort((a, b) => a.popularity - b.popularity);
    }
    if (genre) {
      movies = movies.filter((movie) => movie.genre_ids.includes(parseInt(genre)));
    }
    return movies;
  };

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

  if (!data?.results.length) {
    return (
      <Container>
        <Row>
          <Col className="text-center my-5">
            <h3>No results found</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="movie-page-container">
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            <MovieFilter
              sortOrder={sortOrder}
              handleSortOrderChange={handleSortOrderChange}
              genre={genre}
              handleGenreChange={handleGenreChange}
            />
          </Col>
          <Col lg={8} xs={12}>
            <Row className={isMobile ? 'mobile-movie-list' : ''}>
              {sortedMovies().map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            {!isMobile && (
              <MoviePagination
                page={page}
                handleFirstPage={handleFirstPage}
                handleLastPage={handleLastPage}
                handlePageClick={handlePageClick}
                totalPages={data?.total_pages}
                endPage={endPage}
                startPage={startPage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
