import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies.js'
import { useSearchParams } from 'react-router-dom'
import { Spinner,Alert, Container, Row, Col } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard.jsx'
 



// 경로 2가지
// nav 바에서 클릭해서 온 경우 => popular movie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 페이지 바꿔주기
// 페이지 값이 바뀔때마다 useSearchMoive에 페이지 까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const keyword = query.get("q")

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword})

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
console.log("search Data", data)

  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} xs={12}>필터</Col>

          <Col lg={8} xs={12}>

          <Row>

          {data?.results.map((movie,index)=> 
          <Col key={index} lg={4} xs={12}>
          <MovieCard movie={movie}/>
          </Col>)}

          </Row>
          
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviePage