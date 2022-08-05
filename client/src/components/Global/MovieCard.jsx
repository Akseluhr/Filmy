import { useEffect, useState } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import React from 'react'
import { fetchMovie } from '../../api/fetchMovie'
import placeholderImg from '../../assets/inception.jpg'

const MovieCard = (props) => {
  const [img, setImg] = useState(placeholderImg)
  const [title, setTitle] = useState('Movie Title (Year)')
  const [loading, setLoading] = useState(true)
  const id = 'tt0816692'

  const fetchData = async () => {
    // För att förhindra för många API-anrop
    if (props.idx !== 0) {
      setLoading(false)
      return
    }

    const data = await fetchMovie(id)
    setImg(data.image)
    setTitle(data.fullTitle)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <LinkContainer to={`/movie/${id}`}>
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
