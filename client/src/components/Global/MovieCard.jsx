import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'

const MovieCard = () => {
  const movieId = 'tt0816692'

  return (
    <LinkContainer to={`/movie/${movieId}`}>
      <div className='movieCard'>
        <img
          src='https://picsum.photos/270/400'
          alt='Movie'
          className='movieImg'
        />
        <div className='movieInfo'>
          <h6>Movie Title (Year)</h6>
        </div>
      </div>
    </LinkContainer>
  )
}

export default MovieCard
