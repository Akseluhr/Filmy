import MovieCardGrid from '../Global/MovieCardGrid'
import React from 'react'

const Results = (props) => {
  return (
    <div className='results'>
      <MovieCardGrid length={6} movies={props.recommendations} />
    </div>
  )
}

export default Results
