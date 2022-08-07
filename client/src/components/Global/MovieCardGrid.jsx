import Col from 'react-bootstrap/Col'
import MovieCard from './MovieCard'
import React from 'react'
import Row from 'react-bootstrap/Row'

const MovieCardGrid = (props) => {
  return (
    <div className='popularMoviesGrid'>
      <Row xs={2} sm={4} lg={6} className='g-4'>
        {props.movies.map((movie, idx) => (
          <Col key={idx}>
            <MovieCard idx={idx} id={movie.imdbId} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MovieCardGrid
