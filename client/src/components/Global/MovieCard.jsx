import { useEffect, useState } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import React from 'react'
import placeholderImg from '../../assets/inception.jpg'

const axios = require('axios').default

const MovieCard = (props) => {
  const [img, setImg] = useState(placeholderImg)
  const [title, setTitle] = useState('Movie Title (Year)')
  const apiKey = 'k_yzqb0jra'
  const movieId = 'tt0816692'
  const [loading, setLoading] = useState(true)

  const getMovie = async () => {
    if (props.idx !== 0) {
      // För att förhindra för många API-anrop
      setLoading(false)
      return
    }

    const response = await axios.get(
      `https://imdb-api.com/en/API/Title/${apiKey}/${props.movieId}`
    )
    console.log(response.data)
    setImg(response.data.image)
    setTitle(response.data.fullTitle)
    setLoading(false)
  }

  useEffect(() => {
    getMovie()
  }, [])

  return loading ? (
    <Loader loading={loading} />
  ) : (
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
