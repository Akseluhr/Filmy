import React from 'react'
import MovieCard from '../Global/MovieCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MovieCardGrid = () => {
  return (
    <>
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className='g-4'>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx}>
            <MovieCard />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MovieCardGrid
