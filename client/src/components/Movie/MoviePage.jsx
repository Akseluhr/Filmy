import { useEffect, useState } from 'react'

import Badge from 'react-bootstrap/Badge'
import React from 'react'
import placeholderImg from '../../assets/inception.jpg'
import { useParams } from 'react-router-dom'

const axios = require('axios').default

const MoviePage = (props) => {
  const scale = 30
  const width = 27 * scale
  const height = 40 * scale

  const apiKey = 'k_yzqb0jra'
  const { id } = useParams()

  const [image, setImage] = useState(placeholderImg)
  const [fullTitle, setFullTitle] = useState()
  const [plot, setPlot] = useState()
  const [genreList, setGenreList] = useState([])
  const [stars, setStars] = useState()
  const [directors, setDirectors] = useState()
  const [writers, setWriters] = useState()
  const [imDbRating, setImDbRating] = useState()

  const getMovie = async () => {
    const response = await axios.get(
      `https://imdb-api.com/en/API/Title/${apiKey}/${id}`
    )
    const data = response.data
    console.log(data)
    setImage(data.image)
    setFullTitle(data.fullTitle)
    setPlot(data.plot)
    setGenreList(data.genreList)
    setStars(data.stars)
    setDirectors(data.directors)
    setWriters(data.writers)
    setImDbRating(data.imDbRating)
  }

  useEffect(() => {
    getMovie()
  }, [])

  return (
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
