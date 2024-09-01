import {React, useState} from 'react';
import { useParams } from 'react-router-dom'; // useParams를 import하여 URL에서 ID를 가져옴
import { Spinner, Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { useMovieDetailPageQuery } from '../../hooks/useMovieDetailPage';
import Reviews from './Reviews';
import RecommendMovie from './RecommendMovie'
import MovieTrailer from './MovieTrailer';

const MovieDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 영화 ID를 가져옴

    // id가 올바르게 전달되고 있는지 확인
    console.log("Movie ID from URL params:", id);
    
  const { data, isLoading, isError, error } = useMovieDetailPageQuery(id); // ID를 훅에 전달

  const [showTrailer, setShowTrailer] = useState(false);

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

  const movie = data; // API 응답에서 영화 데이터 추출


  const handleTrailerShow = () => setShowTrailer(true);
  const handleTrailerClose = () => setShowTrailer(false);

  return (
    <Container>
      <Row>
        <Col md={4}>
          {/* 영화 포스터 */}
          <img 
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} 
            alt={movie.title} 
            className="img-fluid" 
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1> {/* 영화 제목 */}
          <h3>Genres: {movie.genres.map(genre => genre.name).join(', ')}</h3> {/* 영화 장르 */}
          <p>Popularity: {movie.popularity}</p> {/* 영화 인기도 */}
          <p>Overview: {movie.overview}</p> {/* 영화 줄거리 */}
          <p>Budget: ${movie.budget.toLocaleString()}</p> {/* 영화 예산, 숫자에 콤마 추가 */}
          <p>Release Date: {movie.release_date}</p> {/* 개봉일 */}

          <Button variant="primary" onClick={handleTrailerShow}>
            예고편 보기
          </Button>
        </Col>
      </Row>

      <RecommendMovie id={id}/>
      <Reviews id={id}/>

      <MovieTrailer show={showTrailer} handleClose={handleTrailerClose} />


    </Container>
  );
}

export default MovieDetailPage;
