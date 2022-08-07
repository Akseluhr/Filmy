import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import placeholderImg from '../../assets/inception.jpg'

const ActiveSearch = () => {
  return (
    <div className='activeSearch'>
      <div className='activeSearchMovie'>
        <LinkContainer to={`/movie`}>
          <img src={placeholderImg} alt='movie' className='activeSearchImg' />
        </LinkContainer>
        <div>
          <p>Showing recommendations for:</p>
          <LinkContainer to={`/movie`}>
            <h5>Movie Title (Year)</h5>
          </LinkContainer>
        </div>
      </div>
    </div>
  )
}

export default ActiveSearch
