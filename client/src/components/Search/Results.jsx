import React from 'react'
import { useParams } from 'react-router-dom'
import MovieCardGrid from '../Global/MovieCardGrid'

const Results = () => {
  const { query } = useParams()

  return (
    <div className='results'>
      <p>
        Showing results for{' '}
        <span style={{ fontStyle: 'italic' }}>{query}:</span>
      </p>
      <MovieCardGrid length={12} />
    </div>
  )
}

export default Results
