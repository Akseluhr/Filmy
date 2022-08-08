import MovieCardGrid from '../Global/MovieCardGrid'
import React from 'react'

const Results = (props) => {
  return (
    <div className='results'>
      <MovieCardGrid movies={props.recommendations} />
    </div>
  )
}

export default Results
