import { useEffect, useState } from 'react'

import Badge from 'react-bootstrap/Badge'
import Error from '../Global/Error'
import Loader from '../Global/Loader'
import React from 'react'
import { fetchMovie } from '../../api/fetchMovie'
import { useParams } from 'react-router-dom'

const MoviePage = () => {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [error, setError] = useState(false)

  const [image, setImage] = useState()
  const [fullTitle, setFullTitle] = useState()
  const [plot, setPlot] = useState()
  const [genreList, setGenreList] = useState([])
  const [stars, setStars] = useState()
  const [directors, setDirectors] = useState()
  const [writers, setWriters] = useState()
  const [imDbRating, setImDbRating] = useState()

  const fetchData = async () => {
    const data = await fetchMovie(id)

    if (data === 'error') setError(true)

    setImage(data.image)
    setFullTitle(data.fullTitle)
    setPlot(data.plot)
    setGenreList(data.genreList)
    setStars(data.stars)
    setDirectors(data.directors)
    setWriters(data.writers)
    setImDbRating(data.imDbRating)

    setLoading(!loading)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return loading ? (
    <Loader loading={loading} />
  ) : error ? (
    <Error />
  ) : (
    <div className='moviePage'>
      <div className='imgContainer'>
        <img src={image} alt='movie' />
      </div>
      <div className='movieText'>
        <h2>{fullTitle}</h2>
        <p>{plot}</p>
        <h5>
          {genreList.map((genre, idx) => (
            <span key={idx}>
              <Badge pill bg='secondary'>
                {genre.value}
              </Badge>{' '}
            </span>
          ))}
        </h5>
        <br />
        <p>
          <b>Actors: </b>
          {stars}
        </p>
        <p>
          <b>Director(s): </b>
          {directors}
        </p>
        <p>
          <b>Writer(s): </b>
          {writers}
        </p>
        <p>
          <b>IMDb rating: </b>
          <Badge pill bg='warning' text='dark'>
            {imDbRating}/10
          </Badge>
        </p>
      </div>
    </div>
  )
}

export default MoviePage
