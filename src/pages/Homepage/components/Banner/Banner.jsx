import React, { useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieTrailer from '../../../MovieDetail/MovieTrailer';
import './Banner.style.css';
import { Spinner, Alert, Button } from 'react-bootstrap';

const Banner = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { data, isLoading, isError, error } = usePopularMoviesQuery();
 

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

  

  const handleTrailerShow = (id) => {
    setSelectedMovieId(id);
    setShowTrailer(true);
  };

  const handleTrailerClose = () => {
    setShowTrailer(false);
    setSelectedMovieId(null);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path})`,
        }}
        className="banner"
      >
        <div className="text-white banner-text-area">
          <h1>{data?.results[0].title}</h1>
          <p>{data?.results[0].overview}</p>

          {/* 예고편 버튼 */}
          <Button
            variant="light px-3 py-2"
            onClick={() => handleTrailerShow(data?.results[0].id)}
          >
            <span className="fs-5">▶</span> 재생
          </Button>
        </div>
      </div>

      {/* MovieTrailer 모달 */}
      {selectedMovieId && (
        <MovieTrailer
          show={showTrailer}
          handleClose={handleTrailerClose}
          id={selectedMovieId}
        />
      )}
    </div>
  );
};

export default Banner;
