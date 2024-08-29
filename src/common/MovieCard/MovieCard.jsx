import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'

const MovieCard = ({movie}) => {
  return (
    <div 
    style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")"}} className='movie-card'>
        
        
        <div className='overlay'> 

            <h1>{movie.title}</h1>

            {/* 장르 */}
            {movie.genre_ids.map((id)=>(<Badge bg="danger">{id}</Badge>))}

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