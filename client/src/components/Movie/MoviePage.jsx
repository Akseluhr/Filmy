import Badge from 'react-bootstrap/Badge'
import React from 'react'
import ReactStars from 'react-rating-stars-component'

const MoviePage = () => {
  const scale = 30
  const width = 27 * scale
  const height = 40 * scale

  return (
    <div className='moviePage'>
      <div className='imgContainer'>
        <img src={`https://picsum.photos/${width}/${height}`} alt='movie' />
      </div>
      <div className='movieText'>
        <h2>Movie Title (Year)</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          officiis laudantium tempora omnis consequatur fuga nesciunt debitis
          perspiciatis itaque beatae delectus nulla aperiam, nostrum veritatis.
        </p>
        <h5>
          <Badge pill bg='secondary'>
            Genre
          </Badge>{' '}
          <Badge pill bg='secondary'>
            Genre
          </Badge>
        </h5>
        <br />
        <p>
          <b>Actors: </b>Firstname Lastname, Firstname Lastname, Firstname
          Lastname
        </p>
        <p>
          <b>Director(s): </b>Firstname Lastname
        </p>
        <p>
          <b>Writer(s): </b>Firstname Lastname
        </p>
        <ReactStars count={5} size={32} activeColor='#ffd700' />
      </div>
    </div>
  )
}

export default MoviePage
