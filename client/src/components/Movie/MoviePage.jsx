import { INITIAL_STATE, STATES, reducer } from '../../services/reducer'
import React, { useReducer } from 'react'

import Badge from 'react-bootstrap/Badge'
import Error from '../Global/Error'
import Loader from '../Global/Loader'
import { fetchMovie } from '../../api/fetchMovie'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MoviePage = () => {
  const { id } = useParams()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovie(id)

      if (data === null) {
        dispatch({ type: STATES.ERROR })
        return
      }

      dispatch({ type: STATES.SUCCESS, payload: data })
    }

    fetchData()
  }, [id])

  return state.loading ? (
    <Loader loading />
  ) : state.error ? (
    <Error />
  ) : (
    <div className='moviePage'>
      <div className='imgContainer'>
        <img src={state.data.image} alt='movie' />
      </div>
      <div className='movieText'>
        <h2>{state.data.fullTitle}</h2>
        <p>{state.data.plot}</p>
        <h5>
          {state.data.genreList.map((genre, idx) => (
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
          {state.data.stars}
        </p>
        <p>
          <b>Director(s): </b>
          {state.data.directors}
        </p>
        <p>
          <b>Writer(s): </b>
          {state.data.writers}
        </p>
        <p>
          <b>IMDb rating: </b>
          <Badge pill bg='warning' text='dark'>
            {state.data.imDbRating}/10
          </Badge>
        </p>
      </div>
    </div>
  )
}

export default MoviePage
