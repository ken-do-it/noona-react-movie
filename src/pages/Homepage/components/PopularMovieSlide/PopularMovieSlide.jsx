import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'

import Spinner from 'react-bootstrap/Spinner'; // 로딩 스피너 컴포넌트 import
import Alert from 'react-bootstrap/Alert';



// import 'react-multi-carousel/lib/styles.css';

import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

import { responsive } from '../../../../constants/responsive';




const PopularMovieSlide = () => {

    const {data, isLoading, isError, error } = usePopularMoviesQuery()
    // console.log("Fetched data:", data);


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

        <MovieSlider title="Popular Movies" movies={data.results} responsive={responsive}/>


    </div>
  )
}

export default PopularMovieSlide