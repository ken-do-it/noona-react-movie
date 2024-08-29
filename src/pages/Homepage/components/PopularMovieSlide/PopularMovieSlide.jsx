import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'

import Spinner from 'react-bootstrap/Spinner'; // 로딩 스피너 컴포넌트 import
import Alert from 'react-bootstrap/Alert';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';




const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      //slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
     // slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
     // slidesToSlide: 1 // optional, default to 1.
    }
  };



const PopularMovieSlide = () => {

    const {data, isLoading, isError, error } = usePopularMoviesQuery()
    console.log("Fetched data:", data);


    if (isLoading) {
        return (
            <div  className ="loading-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    if (isError){
       return <Alert variant="danger">{error.message}</Alert>
    }

  return (
    <div>
        <h3>Popular Movies</h3>

        <Carousel
          infinite ={true}
          centerMode = {true}
          itemClass='movie-slider p-1'
          containerClass='carousel-container'
          responsive={responsive}
          >
          {data.results.map((movie, index) => (<MovieCard movie={movie} key={index}/>))}
        </Carousel>


    </div>
  )
}

export default PopularMovieSlide