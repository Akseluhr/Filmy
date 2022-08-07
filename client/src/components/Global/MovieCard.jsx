import { useEffect, useState } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import React from 'react'
import { fetchMovie } from '../../api/fetchMovie'
import { formatId } from './../../api/formatId'
import placeholderImg from '../../assets/inception.jpg'

const MovieCard = (props) => {
  const [img, setImg] = useState(placeholderImg)
  const [title, setTitle] = useState('Movie Title (Year)')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const id = formatId(props.id)
      const data = await fetchMovie(id)
      console.log(data)
      if (data === null) {
        setLoading(false)
        setError(true)
        return
      }

      setImg(data.image)
      setTitle(data.fullTitle)
      setLoading(false)
    }

    fetchData()
  }, [props.id, props.idx])

  return loading ? (
    <Loader loading={loading} />
  ) : error ? (
    <p>⚠️ Error</p>
  ) : (
    <LinkContainer to={`/movie/${props.id}`}>
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
