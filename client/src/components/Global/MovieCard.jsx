import React from 'react'

const MovieCard = () => {
  return (
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
  )
}

export default MovieCard
