import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import placeholderImg from '../../assets/inception.jpg'

const ActiveSearch = (props) => {
  return (
    <div className='activeSearch'>
      <LinkContainer to={`/movie`}>
        <img src={placeholderImg} alt='movie' className='activeSearchImg' />
      </LinkContainer>
      <div>
        <p>Showing recommendations for:</p>
        <LinkContainer to={`/movie`}>
          <h5>{props.movieTitle}</h5>
        </LinkContainer>
      </div>
    </div>
  )
}

export default ActiveSearch
