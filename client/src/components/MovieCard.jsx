import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const MovieCard = () => {
  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img variant='top' src='https://picsum.photos/270/400' />
      <Card.Body>
        <Card.Title>Movie Title (Year)</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default MovieCard
