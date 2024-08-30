import React from 'react'
import { useMediaQuery } from 'react-responsive'; //화면 크기 기반 조건부 렌더링
import "./MovieSlider.style.css"
import MovieCard from '../MovieCard/MovieCard'


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// npm install react-responsive 이거 쓰면 자동으로 react-responsive 라이브러리 사용 (화면 크기 기반 조건부 렌더링)

// 모바일 버전일때는 부트스트랩 캐럴셀 사용
import { Carousel as BootstrapCarousel } from 'react-bootstrap';


const MovieSlider = ({title, movies, responsive}) => {


    // 모바일 버전일때는  부트스트랩 캐럴셀 사용
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  return (
    <div>
        <h3>{title}</h3>

        {isMobile ? (
        <BootstrapCarousel>
          {movies.map((movie, index) => (
            <BootstrapCarousel.Item key={index}>
              <MovieCard movie={movie} />
            </BootstrapCarousel.Item>
          ))}
        </BootstrapCarousel>
      ) : (

        <Carousel
          infinite ={true}
          centerMode = {true}
          itemClass='movie-slider p-1'
          containerClass='carousel-container'
          responsive={responsive}
          >
          {movies.map((movie, index) => (<MovieCard movie={movie} key={index}/>))}
        </Carousel>
      )}
    </div>
  )
}

export default MovieSlider