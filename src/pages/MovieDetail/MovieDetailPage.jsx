import React from 'react'
import { useParams } from 'react-router-dom';
import {useMovieDetailPageQuery} from '../../hooks/useMovieDetailPage'
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';




const MovieDetailPage = () => {

  // const [query,setQuery] = useMovieDetailParams()

  const { id } = useParams(); // URL 파라미터에서 영화 ID 가져오기
  const { data, isLoading, isError, error } = useMovieDetailPageQuery(id
);

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

  const movie = data?.data; // API 응답에서 영화 데이터 추출




  return (
    <div>
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
        </Col>


      </Row>
    </Container>
    </div>
  )
}

export default MovieDetailPage