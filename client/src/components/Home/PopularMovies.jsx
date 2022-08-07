import MovieCardGrid from './../Global/MovieCardGrid'
import React from 'react'

const PopularMovies = () => {
  return (
    <>
      <div className='popularMovies'>
        <h4>Popular movies</h4>
        <MovieCardGrid movies={[]} />
      </div>
    </>
  )
}

export default PopularMovies
