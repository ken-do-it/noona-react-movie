import React from 'react'

import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import UpComingMovieSlide from './components/UpComingMovieSlide/UpComingMovieSlide'


// 1. 배너 => popular 영화를 들고 와서 첫번째 아이템 보여주자 
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie 


  



const Homepage = () => {


  return (
    <div>
      <Banner />
      <PopularMovieSlide  />
      <TopRatedMovieSlide />
      <UpComingMovieSlide />
    </div>
  )
}

export default Homepage