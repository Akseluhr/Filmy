import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import placeholderImg from '../../assets/inception.jpg'

const ActiveSearch = () => {
  const movieId = 'tt0816692'
  return (
    <div className='activeSearch'>
      <div className='activeSearchMovie'>
        <LinkContainer to={`/movie/${movieId}`}>
          <img
            src={placeholderImg}
            alt='Active search image'
            className='activeSearchImg'
          />
        </LinkContainer>
        <div>
          <p>Showing recommendations for:</p>
          <LinkContainer to={`/movie/${movieId}`}>
            <h5>Movie Title (Year)</h5>
          </LinkContainer>
        </div>
      </div>
    </div>
  )
}

export default ActiveSearch
