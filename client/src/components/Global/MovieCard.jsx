import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const axios = require('axios').default

const MovieCard = (props) => {
  const [img, setImg] = useState('https://picsum.photos/270/400')
  const [title, setTitle] = useState('Movie Title (Year)')
  const apiKey = 'k_yzqb0jra'
  const movieId = 'tt0816692'

  const getMovie = async () => {
    if (props.idx !== 0) return // För att förhindra för många API-anrop

    const response = await axios.get(
      `https://imdb-api.com/en/API/Title/${apiKey}/${props.movieId}`
    )
    console.log(response)
    setImg(response.data.image)
    setTitle(response.data.fullTitle)
  }

  useEffect(() => {
    getMovie()
  }, [])

  return (
    <LinkContainer to={`/movie/${movieId}`}>
      <div className='movieCard'>
        <img src={img} alt='Movie' className='movieImg' />
        <div className='movieInfo'>
          <h6>{title}</h6>
        </div>
      </div>
    </LinkContainer>
  )
}

export default MovieCard
