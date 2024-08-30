import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom'








const MovieCard = ({movie}) => {

const navigate = useNavigate()
const {data: genreData} = useMovieGenreQuery()
// console.log("ggg", genreData)


// const { data: genreData, isLoading, isError } = useMovieGenreQuery();

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (isError) {
//   return <div>Error loading genres</div>;
// }

// console.log("Genre data:", genreData);


const handleCardClick = () => {
  // 카드를 클릭하면 영화 ID를 기반으로 상세 페이지로 이동
  navigate(`/movies/${movie.id}`);
};

const showGenre =( genreIdList) => {
  if (!genreData) return []
  const genreNameList = genreIdList.map((id) => {
    const genreObj = genreData.find((genre)=>genre.id ===id )
    return genreObj.name
  })

  return genreNameList
}



  return (
    <div 
    onClick={handleCardClick} // 카드 클릭 시 handleCardClick 함수 호출
    style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")"}} 
    className='movie-card'>
        
        
        <div className='overlay'> 

            <h1>{movie.title}</h1>

            {/* 장르 */}
            {showGenre(movie.genre_ids).map((id)=>(<Badge bg="danger">{id}</Badge>))}

            <div className='ovverlay-2'>
                {/* 영화 평점 */}
                <div>{movie.vote_average}</div>

                {/* 인기도 */}
                <div>{movie.popularity}</div>

                {/* 성인? */}
                <div>{movie.adult?"over18" : "under18"}</div>
            </div>



        </div>
        MovieCard
    </div>
  )
}

export default MovieCard