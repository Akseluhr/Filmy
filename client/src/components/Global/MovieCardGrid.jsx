import Col from 'react-bootstrap/Col'
import MovieCard from './MovieCard'
import React from 'react'
import Row from 'react-bootstrap/Row'

const MovieCardGrid = (props) => {
  const movieId = 'tt0816692'

  return (
    <div className='popularMoviesGrid'>
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className='g-4'>
        {Array.from({ length: props.length }).map((_, idx) => (
          <Col key={idx}>
            <MovieCard idx={idx} movieId={movieId} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MovieCardGrid
