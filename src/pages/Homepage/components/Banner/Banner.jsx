import React, { useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import MovieTrailer from '../../../MovieDetail/MovieTrailer'
import './Banner.style.css'
import { Spinner, Alert, Button } from 'react-bootstrap';



const Banner = () => {
  const [modalShow, setModalShow] = useState(false)

    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    // console.log("ddd",data)
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

    const selectedMovie = data?.results[0]; // 선택된 영화를 가져옴

  return (
    <div>
      <div style={{
          backgroundImage : "url(" + `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}}`+  ")" }} className='banner' >

        <div className='text-white banner-text-area'> 
          <h1>{selectedMovie?.title}</h1>
          <p>{selectedMovie?.overview}</p>
          {/* <h1>{data?.results[0].title}</h1>
          <p>{data?.results[0].overview}</p> */}

          {/* 모달? */}
          <Button variant="light px-3 py-2" onClick = {()=>setModalShow(true)}>
            <span className='fs-5'>▶</span>재생
          </Button>
        </div>
      </div>

      <MovieTrailer 
      show={modalShow}
      handleClose={() => setModalShow(false)} // handleClose 함수 전달
      movie={selectedMovie?.id} // 선택된 영화를 전달
        />
    </div>
  )
}

export default Banner