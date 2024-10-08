import React from 'react'
import {useUpComingMoviesQuery} from '../../../../hooks/useUpComingMovies'

import Spinner from 'react-bootstrap/Spinner'; // 로딩 스피너 컴포넌트 import
import Alert from 'react-bootstrap/Alert';


import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

import { responsive } from '../../../../constants/responsive';



const UpComingMovieSlide = () => {
    const {data, isLoading, isError, error } = useUpComingMoviesQuery()
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

        <MovieSlider title="Upcoming" movies={data.results} responsive={responsive}/>


    </div>
  )
}

export default UpComingMovieSlide