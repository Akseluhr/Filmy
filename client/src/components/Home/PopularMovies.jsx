import React from 'react'
import MovieCardGrid from './../Global/MovieCardGrid'

const PopularMovies = () => {
  return (
    <>
      <div className='popularMovies'>
        <h4>Popular movies</h4>
        <MovieCardGrid length={6} />
      </div>
    </>
  )
}

export default PopularMovies
